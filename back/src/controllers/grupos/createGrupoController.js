// src/controllers/grupos/createGrupoController.js

import { v4 as uuidv4 } from 'uuid';
import getPool from '../../database/getPool.js';

const createGrupoController = async (req, res) => {
    const { nombre, provincia, generos, honorarios, biografia, rider, email } =
        req.body;
    const usuario_id = req.userId; // Asumiendo que el ID del usuario viene del middleware de autenticación

    const pool = await getPool();

    try {
        // Verifica si el usuario ya tiene un grupo
        const [userGrupo] = await pool.query(
            'SELECT id FROM Grupos WHERE usuario_id = ?',
            [usuario_id]
        );

        if (userGrupo.length > 0) {
            return res
                .status(403)
                .json({ message: 'El usuario ya tiene un grupo creado' });
        }

        const newGrupoId = uuidv4();

        await pool.query(
            `INSERT INTO Grupos (id, nombre, provincia, generos, honorarios, biografia, usuario_id, rider, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                newGrupoId,
                nombre,
                provincia,
                generos,
                honorarios,
                biografia,
                usuario_id,
                rider,
                email,
            ]
        );

        res.status(201).json({
            message: 'Grupo creado exitosamente',
            grupoId: newGrupoId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el grupo' });
    }
};

export default createGrupoController;
