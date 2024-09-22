import getPool from "../../database/getPool.js";
import { v4 as uuid } from "uuid";

export const crearConversacionService = async (idUsuario, idUsuarioDestino) => {
  const pool = await getPool();
  const id = uuid();
  if (idUsuario === idUsuarioDestino) {
    throw new Error("No puedes enviarte mensajes a ti mismo");
  }
  if (!idUsuario || !idUsuarioDestino) {
    throw new Error("Faltan datos");
  }
  await pool.query(
    `INSERT INTO conversaciones (id,usuario1, usuario2) VALUES (?,?, ?)`,
    [id,idUsuario, idUsuarioDestino]
  );

  return {
    idUsuario,
    idUsuarioDestino,
  };
};