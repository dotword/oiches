'use strict'

import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
dotenv.config()

const app = express()

const { PORT } = process.env
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hola desde Oiches!!')
})

app.use((req, res) => {
  res.status(404).send('Recurso no encontrado')
})

app.use((err, req, res, next) => {
  console.error(err)

  res.status(err.httpStatus || 500).send({
    status: 'error',
    message: err.message
  })
})

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`)
})
