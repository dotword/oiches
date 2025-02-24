import apiRequest from '../../utils/apiRequest';

const EditAgenciaService = async ({ token, idAgencia, dataForm }) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/agencia/${idAgencia}/edit`;

    return apiRequest({
        url,
        method: 'PUT',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};

export default EditAgenciaService;
