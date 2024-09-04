// export const EditGrupoService = async ({ token, idGrupo, dataForm }) => {
//     const url = `${import.meta.env.VITE_API_URL_BASE}/grupos/${idGrupo}/edit`;
//     const response = await fetch(url, {
//         method: 'PUT',
//         headers: {
//             authorization: token,
//         },
//         body: dataForm,
//     });

//     const json = await response.json();

//     if (!response.ok) throw new Error(json.message);

//     return json;
// };

// export const addGeneroGrupoService = async (dataForm, idGrupo, token) => {
//     // /grupos/generos/:idGrupo
//     const url = `${
//         import.meta.env.VITE_API_URL_BASE
//     }/grupos/generos/${idGrupo}`;

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

// export const DeleteGrupoGenerosService = async (
//     deleteGenres,
//     idGrupo,
//     token
// ) => {
//     const url = `${
//         import.meta.env.VITE_API_URL_BASE
//     }/grupos/generos/${idGrupo}`;

//     const response = await fetch(url, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             authorization: token,
//         },
//         body: JSON.stringify({ genreDelete: deleteGenres }),
//     });

//     if (!response.ok) throw new Error(json.message);

//     const json = await response.json();

//     return json;
// };

import apiRequest from '../utils/apiRequest';

export const EditGrupoService = async ({ token, idGrupo, dataForm }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/grupos/${idGrupo}/edit`;

    return apiRequest({
        url,
        method: 'PUT',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};

export const addGeneroGrupoService = async (dataForm, idGrupo, token) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/grupos/generos/${idGrupo}`;

    return apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};

export const DeleteGrupoGenerosService = async (
    deleteGenres,
    idGrupo,
    token
) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/grupos/generos/${idGrupo}`;

    return apiRequest({
        url,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
        },
        body: JSON.stringify({ genreDelete: deleteGenres }),
    });
};
