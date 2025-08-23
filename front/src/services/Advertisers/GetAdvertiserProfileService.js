import apiRequest from '../../utils/apiRequest';

const GetAdvertiserProfileService = async ({ userId, token }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/advertiser-details/${userId}`;

    const response = await apiRequest({
        url,
        method: 'GET',
        headers: {
            authorization: token,
        },
    });

    return response;
};

export default GetAdvertiserProfileService;
