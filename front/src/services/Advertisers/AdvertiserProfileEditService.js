import apiRequest from '../../utils/apiRequest';

const AdvertiserProfileEditService = async ({ token, userId, formData }) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/advertiser-details/${userId}/edit`;

    const response = await apiRequest({
        url,
        method: 'PUT',
        headers: {
            authorization: token,
        },
        body: formData,
    });

    return response.data;
};

export default AdvertiserProfileEditService;
