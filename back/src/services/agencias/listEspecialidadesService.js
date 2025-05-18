import getPool from '../../database/getPool.js';

const listEspecialidadesService = async () => {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT id, especialidad FROM agencias_especialidad'
    );
    return rows;
};

export default listEspecialidadesService;
