import cron from 'node-cron';
import moment from 'moment-timezone';
import getPool from '../database/getPool.js';

const pool = await getPool();

const limpiarFechasAntiguasJob = async () => {
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

const limpiarReservasAntiguasJob = async () => {
    const today = moment().tz('Europe/Madrid').format('YYYY-MM-DD');
    try {
        const [result] = await pool.query(
            'DELETE FROM reservas WHERE confirmada != "1" AND fecha < ?',
            [today]
        );

        console.log(
            `[${new Date().toISOString()}] ${result.affectedRows} reservas eliminadas automáticamente.`
        );
    } catch (error) {
        console.error('Error al limpiar reservas antiguas:', error);
    }
};

// Configurar el job programado
export const startScheduledJobs = () => {
    cron.schedule(
        '0 0 * * *', // A las 00:00
        async () => {
            console.log(
                `[${new Date().toISOString()}] Iniciando trabajos programados.`
            );

            await limpiarFechasAntiguasJob();
            await limpiarReservasAntiguasJob();

            console.log(
                `[${new Date().toISOString()}] Trabajos programados completados.`
            );
        },
        {
            scheduled: true,
            timezone: 'Europe/Madrid',
        }
    );

    console.log('Jobs de limpieza programados a las 00:00.');
};
