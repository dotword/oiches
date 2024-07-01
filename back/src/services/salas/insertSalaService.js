import getPool from "../../database/getPool.js";

const insertSalaService = async (usuario_id,nombre,provincia,genero,capacidad,descripcion,precios,direccion,condiciones,equipamiento,email) => {

    const pool = await getPool();

    const [result] = await pool.query(
        `
            INSERT INTO salas (usuario_id,nombre,provincia,genero,capacidad,descripcion,precios,direccion,condiciones,equipamiento,email)
            VALUES (?,?,?,?,?,?,?,?,?,?,?)
        `,
        [usuario_id,nombre,provincia,genero,capacidad,descripcion,precios,direccion,condiciones,equipamiento,email]
    );

    const { salaId } = result;

    return salaId;
}

export default insertSalaService;