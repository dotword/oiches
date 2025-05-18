import getPool from '../../database/getPool.js';

const selectConciertoByIdService = async (conciertoId) => {
    const pool = await getPool();

    // Consulta para obtener la sala y la información relacionada, incluyendo el avatar del usuario
    const [concert] = await pool.query(
        `
            SELECT
                conciertos.reservaId,
                conciertos.title,
                conciertos.fecha,
                conciertos.hora,
                conciertos.precioAnticipada,
                conciertos.otroTipoEntrada,
                conciertos.precio,
                conciertos.otroTipoEntrada,
                conciertos.link,
                conciertos.description,
                conciertos.salaLink,
                conciertos.poster,
                salas.id AS sala_id, 
                salas.nombre AS sala, 
                salas.descripcion AS infoSala, 
                salas.provincia AS sala_idProvincia,
                salas.ciudad AS ciudad, 
                salas.direccion AS direccion, 
                provincias.provincia AS provincia,
                grupos.id AS grupo_id,
                grupos.biografia AS biografiaGrupo, 
                grupos.nombre AS artista
            FROM conciertos
            LEFT JOIN 
                reservas ON reservas.id = conciertos.reservaId
            LEFT JOIN 
                grupos ON reservas.grupo_id = grupos.id
            LEFT JOIN salas ON 
                (salas.id = COALESCE(NULLIF(conciertos.salaLink, ''), reservas.sala_id))
            LEFT JOIN 
                provincias ON provincias.id = salas.provincia    
            WHERE conciertos.id = ?
        `,
        [conciertoId]
    );

    if (concert.length === 0) {
        return null;
    }

    // Obtenemos el array de los generos del grupo.
    const [genero] = await pool.query(
        `SELECT 
                generoId,
                (SELECT nombre FROM generos_musicales WHERE generos_musicales.id = generos_grupos.generoId) AS generoName
            FROM generos_grupos
            WHERE grupoId = ?`,
        [concert[0].grupo_id]
    );
    // Agregamos el array de los generos del grupo.
    concert[0].genero = genero;

    return {
        ...concert[0],
        genero,
    };
};

export default selectConciertoByIdService;
