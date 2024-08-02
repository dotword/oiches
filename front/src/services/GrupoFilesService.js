export const DeleteGrupoFilesService = async (
    photoName,
    deletePhoto,
    token
) => {
    // /grupos/:photoName/:deletePhoto
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/grupos/${photoName}/${deletePhoto}`;
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

export const AddGrupoFilesService = async ({ token, idGrupo, dataForm }) => {
    // /grupos/rider/:idGrupo
    const url = `${import.meta.env.VITE_API_URL_BASE}/grupos/rider/${idGrupo}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export const AddGrupoFotoService = async ({ token, idGrupo, dataForm }) => {
    // '/grupos/photos/:idGrupo'

    const url = `${import.meta.env.VITE_API_URL_BASE}/grupos/photos/${idGrupo}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};
