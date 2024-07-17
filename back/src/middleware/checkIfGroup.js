import getPool from '../database/getPool.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; // Reemplaza con tu secreto JWT

const checkIfGroup = async (req, res, next) => {
    try {
        const { token } = req.headers;

        const decoded = jwt.verify(token, JWT_SECRET);
        const { id } = decoded;

        const pool = await getPool();
        const [userResults] = await pool.query(
            'SELECT roles FROM Usuarios WHERE id = ?',
            [id]
        );

        if (userResults.length === 0 || userResults[0].roles !== 'grupo') {
            return res
                .status(403)
                .json({
                    message: 'Acceso denegado. No es un usuario de tipo grupo.',
                });
        }

        req.usuario_id = id;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default checkIfGroup;
