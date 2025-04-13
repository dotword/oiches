import dotenv from 'dotenv';

dotenv.config();

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    PORT,
    JWT_SECRET,
    JWT_EXPIRATION,
    UPLOADS_DIR,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    URL_FRONT,
    PRERENDER_TOKEN,
} = process.env;

export {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    PORT,
    JWT_SECRET,
    JWT_EXPIRATION,
    UPLOADS_DIR,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    URL_FRONT,
    PRERENDER_TOKEN,
};
