import apiRequest from '../../utils/apiRequest';

const AdvertDetailsEditService = async ({ token, idAdvert, formData }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/edit-advert/${idAdvert}`;

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

export default AdvertDetailsEditService;

export const EditAdvertPhotoService = async ({ idAdvert, token, formData }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/edit-advert/poster/${idAdvert}`;

    return apiRequest({
        url,
        method: 'PUT',
        headers: {
            authorization: token,
        },
        body: formData,
    });
};
