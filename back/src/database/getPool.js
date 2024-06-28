import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let pool;
const getPool = async () => {
    try {
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DATABASE,
                timezone: 'Z',
            });
        }
        // Con el pool temporal creamos la base de datos si no existe.
        await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

        return await pool;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default getPool;
