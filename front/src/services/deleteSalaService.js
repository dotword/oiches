const deleteSalaService = async (idSala, token) => {
    // /salas/delete/:idSala

    const url = `${import.meta.env.VITE_API_URL_BASE}/salas/delete//${idSala}`;

    const response = await fetch(url, {
        headers: {
            authorization: token,
        },
        method: 'DELETE',
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export default deleteSalaService;
