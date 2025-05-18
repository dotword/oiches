import apiRequest from '../../utils/apiRequest';

const GetAllUserNoticesService = async (token, userId) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const url = `${VITE_API_URL_BASE}/noticeboard/user/${userId}`;
    return apiRequest({
        url,
        headers: {
            authorization: token,
        },
    });
};

export default GetAllUserNoticesService;
