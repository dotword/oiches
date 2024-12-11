import apiRequest from '../../utils/apiRequest';

const getUserDataService = async ({ token, userId }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/users/account/${userId}`;

    const response = await apiRequest({
        url,
        headers: {
            authorization: token,
        },
    });

    return response.data.user[0];
};

export default getUserDataService;
