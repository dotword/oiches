import apiRequest from '../../utils/apiRequest';

const AdvertiserProfileCreationService = async ({
    token,
    userId,
    formData,
}) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/create-advertiser/${userId}`;

    const response = await apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: formData,
    });

    return response.data;
};

export default AdvertiserProfileCreationService;
