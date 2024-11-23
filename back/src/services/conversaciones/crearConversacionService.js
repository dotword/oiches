import getPool from '../../database/getPool.js';
import { v4 as uuid } from 'uuid';

export const crearConversacionService = async (idUsuario, idUsuarioDestino) => {
    const pool = await getPool();
    const id = uuid();

    // Validaciones
    if (idUsuario === idUsuarioDestino) {
        throw new Error('No puedes enviarte mensajes a ti mismo');
    }
    if (!idUsuario || !idUsuarioDestino) {
        throw new Error('Faltan datos');
    }

    // Insertar en la base de datos
    await pool.query(
        `INSERT INTO conversaciones (id, usuario1, usuario2) VALUES (?, ?, ?)`,
        [id, idUsuario, idUsuarioDestino]
    );

    // Obtener información de los usuarios
    const [usuario1Rows] = await pool.query(
        `SELECT username, avatar, email FROM usuarios WHERE id = ?`,
        [idUsuario]
    );
    const [usuario2Rows] = await pool.query(
        `SELECT username, avatar, email FROM usuarios WHERE id = ?`,
        [idUsuarioDestino]
    );

    // Asegúrate de que el formato de la respuesta sea correcto
    const usuario1 = usuario1Rows[0]; // Accede al primer elemento del array
    const usuario2 = usuario2Rows[0]; // Accede al primer elemento del array

    // Verifica que los usuarios se hayan encontrado
    if (!usuario1 || !usuario2) {
        throw new Error('No se encontró información de uno o ambos usuarios.');
    }

    return {
        conversacion_id: id,
        usuario1: idUsuario,
        usuario1_id: idUsuario,
        usuario1_username: usuario1.username,
        usuario1_avatar: usuario1.avatar,
        usuario2_id: idUsuarioDestino,
        usuario2_username: usuario2.username,
        usuario2_avatar: usuario2.avatar,
        idUsuarioDestino: idUsuarioDestino,
        usuario2: idUsuarioDestino,
    };
};
