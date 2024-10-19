import apiRequest from '../utils/apiRequest';

export const DeleteSalaFilesService = async (photoName, deletePhoto, token) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/salas/${photoName}/${deletePhoto}`;

    return apiRequest({
        url,
        method: 'DELETE',
        headers: {
            authorization: token,
        },
    });
};

export const AddSalaFilesService = async ({ token, idSala, dataForm }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/salas/rider/${idSala}`;

    return apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};

// export const AddGrupoFotoService = async ({ token, idGrupo, dataForm }) => {
//     const url = `${import.meta.env.VITE_API_URL_BASE}/grupos/photos/${idGrupo}`;

//     return apiRequest({
//         url,
//         method: 'POST',
//         headers: {
//             authorization: token,
//         },
//         body: dataForm,
//     });
// };
