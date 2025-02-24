import getPool from '../../database/getPool.js';

const editAgenciaService = async (idAgencia, updatedFields) => {
    const pool = await getPool();

    // Crear las partes de la consulta dinámicamente según los campos proporcionados
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(updatedFields)) {
        fields.push(`${key} = ?`);
        values.push(value);
    }

    if (fields.length !== 0) {
        values.push(idAgencia);

        const query = `
                UPDATE agencias
                 SET ${fields.join(', ')}
                WHERE id = ?
            `;

        await pool.query(query, values);
    }
};

export default editAgenciaService;
