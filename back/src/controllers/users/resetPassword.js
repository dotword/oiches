import pool from '../../database/getPool.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { JWT_SECRET, JWT_EXPIRATION } from '../../../env.js';

dotenv.config();

export const requestPasswordReset = async (req, res, next) => {
    const { email } = req.body;

    try {
        // Verifico si el usuario está en la base de datos
        const [rows] = await pool.query('SELECT id FROM Usuarios WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Email no encontrado' });
        }

        // Genero un token
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

        // Configuro nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Email de recuperación
        const mailReset = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reestablecimiento de contraseña',
            text: `Pincha aquí para recuperar tu contraseña: ${process.env.RESET_PASSWORD_URL}/reset/${token}\n\n`  // Usa una variable de entorno para la URL base
        };

        // Enviar correo
        await transporter.sendMail(mailReset);
        res.status(200).json({ message: 'Link de reestablecimiento de contraseña enviado' });
    } catch (error) {
        console.error('Error en requestPasswordReset:', error);
        next(error);
    }
};

