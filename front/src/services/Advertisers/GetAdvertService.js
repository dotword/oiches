import apiRequest from '../../utils/apiRequest';

const GetAdvertService = async (idAdvert) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/advert/${idAdvert}`;

    return apiRequest({ url });
};

export default GetAdvertService;
