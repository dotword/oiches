const EditSalaService = async ({ token, idSala, dataForm }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/salas/${idSala}/edit`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export default EditSalaService;
