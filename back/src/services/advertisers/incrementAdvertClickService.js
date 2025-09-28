import getPool from '../../database/getPool.js';

const incrementAdvertClickService = async (classifiedId, options = {}) => {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        // Upsert atómico: crea fila si no existe o incrementa el contador
        const upsertSql = `
            INSERT INTO ad_classified_stats (classified_id, clicks)
            VALUES (?, 1)
            ON DUPLICATE KEY UPDATE clicks = clicks + 1, last_updated = NOW()
            `;
        await conn.query(upsertSql, [classifiedId]);

        // Opcional: guardar evento crudo para auditoría / detección de fraude
        if (options.logClick) {
            const insertEventSql = `
                INSERT INTO ad_classified_clicks (classified_id, user_id, ip, user_agent)
                VALUES (?, ?, ?, ?)
                `;
            const { userId = null, ip = null, userAgent = null } = options;
            await conn.query(insertEventSql, [
                classifiedId,
                userId,
                ip,
                userAgent,
            ]);
        }

        // Leer el contador actualizado
        const [rows] = await conn.query(
            'SELECT clicks FROM ad_classified_stats WHERE classified_id = ?',
            [classifiedId]
        );

        await conn.commit();

        return rows[0] ? rows[0].clicks : 0;
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

export default incrementAdvertClickService;
