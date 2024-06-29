'use strict';

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './src/routes/index.js';
import getPool from './src/database/getPool.js';

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors());
/**Llamado a rutas */
app.post('/reservar-sala', async(req,res,next)=>{
  try {
    const pool =  await getPool()
    console.log(req.headers,req.body);
    res.sendStatus(200).json({
      message:req
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
})
app.use(routes);

app.use((req, res) => {
    res.status(404).send('Recurso no encontrado');
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});
