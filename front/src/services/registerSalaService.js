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
