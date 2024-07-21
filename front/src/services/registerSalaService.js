const registerSalaService = async ({
    token,
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
    const url = `${import.meta.env.VITE_API_URL_BASE}/users/salas`;

    const response = await fetch(url, {
        method: 'POST',
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

export default registerSalaService;
