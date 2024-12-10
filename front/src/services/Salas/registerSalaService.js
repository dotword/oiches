import apiRequest from '../../utils/apiRequest';

const registerSalaService = async ({ token, userId, formData }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/users/salas/${userId}`;

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
