import getPool from '../../database/getPool.js';

const editSalaService = async (idSala, updatedFields) => {
    const pool = await getPool();

    // Crear las partes de la consulta dinámicamente según los campos proporcionados
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(updatedFields)) {
        fields.push(`${key} = ?`);
        values.push(value);
    }

    if (fields.length === 0) {
        throw new Error('No hay campos para actualizar');
    }

    values.push(idSala);

    const query = `
            UPDATE salas
             SET ${fields.join(', ')}
            WHERE id=?
        `;

    await pool.query(query, values);
};

export default editSalaService;
