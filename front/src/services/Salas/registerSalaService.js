import apiRequest from '../../utils/apiRequest';

const registerSalaService = async ({ token, userId, formData }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/users/salas/${userId}`;

    const response = await apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: formData,
    });

    return response.data;
};

export default registerSalaService;
