export const DeleteGrupoMediaService = async (mediaDelete, idGrupo, token) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/grupos/media/${mediaDelete}/${idGrupo}`;

    const response = await fetch(url, {
        headers: {
            token: token,
        },
        method: 'DELETE',
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export const AddGrupoMediaService = async ({ token, idGrupo, dataForm }) => {
    // '/grupos/media/:idGrupo'

    const url = `${import.meta.env.VITE_API_URL_BASE}/grupos/media/${idGrupo}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            token: token,
        },
        body: dataForm,
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};
