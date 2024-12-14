import cron from 'node-cron';
import moment from 'moment-timezone';
import getPool from '../database/getPool.js';

const limpiarFechasAntiguasJob = async () => {
    const pool = await getPool();
    const today = moment().tz('Europe/Madrid').format('YYYY-MM-DD');

    try {
        const [result] = await pool.query(
            'DELETE FROM fechas_disponibles WHERE fecha_disponible < ?',
            [today]
        );

        console.log(
            `[${new Date().toISOString()}] ${result.affectedRows} fechas eliminadas automáticamente.`
        );
    } catch (error) {
        console.error('Error al limpiar fechas antiguas:', error);
    }
};

// Configurar el job programado
export const startScheduledJobs = () => {
    cron.schedule(
        '0 0 * * *', // A las 0:00 PM
        limpiarFechasAntiguasJob,
        {
            scheduled: true,
            timezone: 'Europe/Madrid',
        }
    );

    console.log('Job de limpieza de fechas antiguas programado a las 00:00');
};
