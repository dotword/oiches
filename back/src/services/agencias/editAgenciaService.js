import getPool from '../../database/getPool.js';
import { v4 as uuid } from 'uuid';

const editAgenciaService = async (idAgencia, updatedFields, especialidad) => {
    const pool = await getPool();

    // Actualizamos los campos de la tabla "agencias" si se proporcionan
    if (Object.keys(updatedFields).length !== 0) {
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(updatedFields)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        values.push(idAgencia);

        const query = `
            UPDATE agencias
            SET ${fields.join(', ')}
            WHERE id = ?
        `;
        await pool.query(query, values);
    }
    // Actualizamos las especialidades en la tabla intermedia "agencias_especialidades"
    // Primero, eliminamos las relaciones actuales de la agencia
    await pool.query(
        'DELETE FROM agencias_especialidades WHERE agencia_id = ?',
        [idAgencia]
    );

    // Luego, si se han enviado especialidades, las insertamos (permitiendo añadir, eliminar o cambiar)
    if (Array.isArray(especialidad) && especialidad.length > 0) {
        const values = especialidad.map((especialidadId) => [
            // Generamos un nuevo ID para la relación, puedes usar UUID o cualquier otro método
            // Aquí asumo que tienes la función o el método para generar un UUID, por ejemplo:
            uuid(),
            idAgencia,
            especialidadId,
        ]);

        // Inserción masiva en la tabla intermedia
        await pool.query(
            `INSERT INTO agencias_especialidades (id, agencia_id, especialidad_id) VALUES ?`,
            [values]
        );
    }
};

export default editAgenciaService;
