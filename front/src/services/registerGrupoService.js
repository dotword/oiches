import apiRequest from '../utils/apiRequest';

const registerGrupoService = async ({ token, userId, formData }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/users/grupo/${userId}`;
    // '/users/grupo/:userId',
    return apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: formData,
    });
};

export default registerGrupoService;
