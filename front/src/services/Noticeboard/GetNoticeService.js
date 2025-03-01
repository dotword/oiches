import apiRequest from '../../utils/apiRequest';

const GetNoticeService = async ({ idNotice, token }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/noticeboard/${idNotice}`;

    const response = await apiRequest({
        url,
        method: 'GET',
        headers: {
            authorization: token,
        },
    });

    return response;
};

export default GetNoticeService;
