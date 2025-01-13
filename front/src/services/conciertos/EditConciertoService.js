import apiRequest from '../../utils/apiRequest';

const EditConciertoService = async ({ token, conciertoId, dataForm }) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/concierto/${conciertoId}/edit`;

    return apiRequest({
        url,
        method: 'PUT',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};

export default EditConciertoService;
