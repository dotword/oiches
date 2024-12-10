import apiRequest from '../../utils/apiRequest';

const deleteSalaService = async (idSala, token) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/salas/delete/${idSala}`;

    return apiRequest({
        url,
        method: 'DELETE',
        headers: {
            authorization: token,
        },
    });
};

export default deleteSalaService;
