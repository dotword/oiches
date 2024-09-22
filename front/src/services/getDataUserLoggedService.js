import apiRequest from '../utils/apiRequest';

const getDataUserLoggedService = async ({ token }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/users`;

    const data = await apiRequest({
        url,
        headers: {
            authorization: token,
        },
    });

    return data.data.user[0];
};

export default getDataUserLoggedService;
