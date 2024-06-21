"use strict";

import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

const { PORT } = process.env;

app.get("/", (req, res) => {
  res.send("Hola desde Oiches!!");
});

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
