import apiRequest from '../utils/apiRequest';

export const DeleteGrupoFilesService = async (
    photoName,
    deletePhoto,
    token
) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/grupos/${photoName}/${deletePhoto}`;

    return apiRequest({
        url,
        method: 'DELETE',
        headers: {
            authorization: token,
        },
    });
};

export const AddGrupoFilesService = async ({ token, idGrupo, dataForm }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/grupos/rider/${idGrupo}`;

    return apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};

export const AddGrupoFotoService = async ({ token, idGrupo, dataForm }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/grupos/photos/${idGrupo}`;

    return apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};
