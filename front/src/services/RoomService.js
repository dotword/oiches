export const getRoomService = async (roomId, token) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const url = `${VITE_API_URL_BASE}/salas/${roomId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: token,
        },
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export const saveRoomService = async ({
    token,
    idSala,
    nombre,
    direccion,
    provincia,
    generos,
    capacidad,
    descripcion,
    precios,
    condiciones,
    equipamiento,
    horaReservasStart,
    horaReservasEnd,
}) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const url = `${VITE_API_URL_BASE}/${
        idSala ? `salas/${idSala}/edit` : 'users/salas'
    }`;

    console.log('url ', url);

    const response = await fetch(url, {
        method: idSala ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: token,
        },
        body: JSON.stringify({
            nombre,
            direccion,
            provincia,
            generos,
            capacidad,
            descripcion,
            precios,
            condiciones,
            equipamiento,
            horaReservasStart,
            horaReservasEnd,
        }),
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export default { getRoomService, saveRoomService };
