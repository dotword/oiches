import apiRequest from '../../utils/apiRequest';

const AdminPublishAdvertService = async ({ idAdvert, dataForm, token }) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/published-advert/${idAdvert}`;

    return apiRequest({
        url,
        method: 'PUT',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};

export default AdminPublishAdvertService;
