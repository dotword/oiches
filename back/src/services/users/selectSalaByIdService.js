import getPool from '../../database/getPool.js';

const selectSalaByIdService = async (idSala) => {
    const pool = await getPool();
    const [entry] = await pool.query(
        `
            SELECT 
                S.id,
                S.nombre,
                S.provincia,
                S.direccion,
                S.email,
                S.precios,
                S.capacidad,
                S.descripcion,
                S.equipamiento,
                S.condiciones
            FROM Salas S    
            WHERE S.id = ?
        `,
        [idSala]
    );
    // Obtenemos el array de fotos de la entrada.
    // const [photos] = await pool.query(
    //     `SELECT id, name FROM sala_media WHERE idSala = ?`,
    //     [idSala]
    // );

    // // Agregamos el array de fotos a la entrada.
    // entry[0].photos = photos;

    return {
        entry,
        // ...entry[0],
        // photos,
    };
};

export default selectSalaByIdService;
