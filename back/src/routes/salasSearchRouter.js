import express from 'express';
import getPool from '../database/getPool.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pool = await getPool();
        const { nombre, estilo, provincia, ciudad, ordenarPor } = req.query;
        let filtros = [];
        let valores = [];

        if (nombre) {
            filtros.push('nombre LIKE ?');
            valores.push(`%${nombre}%`);
        }
        if (estilo) {
            filtros.push('estilo LIKE ?');
            valores.push(`%${estilo}%`);
        }
        if (provincia) {
            filtros.push('provincia LIKE ?');
            valores.push(`%${provincia}%`);
        }
        if (ciudad) {
            filtros.push('ciudad LIKE ?');
            valores.push(`%${ciudad}%`);
        }

        let sql = 'SELECT * FROM Salas';
        if (filtros.length > 0) {
            sql += ' WHERE ' + filtros.join(' AND ');
        }

        if (ordenarPor) {
            const [campo, orden] = ordenarPor.split(':');
            sql += ` ORDER BY ${campo} ${orden.toUpperCase()}`;
        }

        const [rows] = await pool.query(sql, valores);

        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
