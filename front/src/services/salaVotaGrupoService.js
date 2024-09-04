// const salaVotaGrupoService = async ({ data, idReserva, token }) => {
//     const { VITE_API_URL_BASE } = import.meta.env;

//     const url = `${VITE_API_URL_BASE}/grupos/${idReserva}/votes`;

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             authorization: token,
//         },
//         body: data,
//     });

//     const json = await response.json();

//     if (!response.ok) throw new Error(json.message);

//     return json;
// };

// export default salaVotaGrupoService;

import apiRequest from '../utils/apiRequest';

const salaVotaGrupoService = async ({ data, idReserva, token }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/grupos/${idReserva}/votes`;

    return apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: data,
    });
};

export default salaVotaGrupoService;
