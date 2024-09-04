// const registerSalaService = async ({ token, formData }) => {
//     const url = `${import.meta.env.VITE_API_URL_BASE}/users/salas`;

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             authorization: token,
//         },
//         body: formData,
//     });

//     const json = await response.json();

//     if (!response.ok) throw new Error(json.message);

//     return json;
// };

// export default registerSalaService;

import apiRequest from '../utils/apiRequest';

const registerSalaService = async ({ token, formData }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/users/salas`;

    return apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: formData,
    });
};

export default registerSalaService;
