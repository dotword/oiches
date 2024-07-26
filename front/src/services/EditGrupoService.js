const EditGrupoService = async ({ token, idGrupo, dataForm }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/grupos/${idGrupo}/edit`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            token: token,
        },
        body: dataForm,
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export default EditGrupoService;
