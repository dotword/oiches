import apiRequest from '../../utils/apiRequest';

const grupoVotaSalaService = async ({ data, idReserva, token }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/salas/${idReserva}/votes`;

    return apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: data,
    });
};

export default grupoVotaSalaService;
