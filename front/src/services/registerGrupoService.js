import apiRequest from '../utils/apiRequest';

const registerGrupoService = async ({ token, formData }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/users/grupo`;

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
