const getSalaService = async (idSala) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const url = `${VITE_API_URL_BASE}/salas/${idSala}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export default getSalaService;
