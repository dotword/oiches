// export const DeleteGrupoMediaService = async (mediaDelete, idGrupo, token) => {
//     const url = `${
//         import.meta.env.VITE_API_URL_BASE
//     }/grupos/media/${mediaDelete}/${idGrupo}`;

//     const response = await fetch(url, {
//         headers: {
//             authorization: token,
//         },
//         method: 'DELETE',
//     });

//     const json = await response.json();

//     if (!response.ok) throw new Error(json.message);

//     return json;
// };

// export const AddGrupoMediaService = async ({ token, idGrupo, dataForm }) => {
//     // '/grupos/media/:idGrupo'

//     const url = `${import.meta.env.VITE_API_URL_BASE}/grupos/media/${idGrupo}`;
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             authorization: token,
//         },
//         body: dataForm,
//     });

//     const json = await response.json();

//     if (!response.ok) throw new Error(json.message);

//     return json;
// };

import apiRequest from '../utils/apiRequest';

export const DeleteGrupoMediaService = async (mediaDelete, idGrupo, token) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/grupos/media/${mediaDelete}/${idGrupo}`;

    return apiRequest({
        url,
        method: 'DELETE',
        headers: {
            authorization: token,
        },
    });
};

export const AddGrupoMediaService = async ({ token, idGrupo, dataForm }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/grupos/media/${idGrupo}`;

    return apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};
