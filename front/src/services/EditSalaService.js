// export const EditSalaService = async ({ token, idSala, dataForm }) => {
//     const url = `${import.meta.env.VITE_API_URL_BASE}/salas/${idSala}/edit`;

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

// export const addGeneroSalaService = async (dataForm, idSala, token) => {
//     // /salas/generos/:idSala
//     const url = `${import.meta.env.VITE_API_URL_BASE}/salas/generos/${idSala}`;

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

// export const DeleteSalaGenerosService = async (deleteGenres, idSala, token) => {
//     const url = `${import.meta.env.VITE_API_URL_BASE}/salas/generos/${idSala}`;

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

export const EditSalaService = async ({ token, idSala, dataForm }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/salas/${idSala}/edit`;

    return apiRequest({
        url,
        method: 'PUT',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};

export const addGeneroSalaService = async (dataForm, idSala, token) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/salas/generos/${idSala}`;

    return apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};

export const DeleteSalaGenerosService = async (deleteGenres, idSala, token) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/salas/generos/${idSala}`;

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
