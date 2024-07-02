import pool from '../../database/getPool.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verifico el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;  

        // Actualizar contraseña en base de datos
        await pool.query('UPDATE Usuarios SET password = ? WHERE email = ?', [newPassword, email]);

        res.status(200).json({ message: 'Contraseña reestablecida correctamente'});

    } catch (error) {
        console.error('Error en validación de token', error);
       next(error);
    }
};