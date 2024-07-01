import express from 'express';
import path from 'path';

const UPLOADS_DIR = path.join(process.cwd(), 'src', 'uploads');

const staticFilesMiddleware = (app) => {
    app.use(express.static(UPLOADS_DIR));
};

export default staticFilesMiddleware;
