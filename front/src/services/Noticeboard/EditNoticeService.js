import apiRequest from '../../utils/apiRequest';

const EditNoticeService = async ({ token, idNotice, dataForm }) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/noticeboard/${idNotice}/edit`;

    return apiRequest({
        url,
        method: 'PUT',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};

export default EditNoticeService;
