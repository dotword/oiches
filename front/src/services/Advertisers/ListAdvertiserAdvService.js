import apiRequest from '../../utils/apiRequest';

const ListAdvertiserAdvService = async (token, userId) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const url = `${VITE_API_URL_BASE}/advertiser-adList/user/${userId}`;
    return apiRequest({
        url,
        headers: {
            authorization: token,
        },
    });
};

export default ListAdvertiserAdvService;
