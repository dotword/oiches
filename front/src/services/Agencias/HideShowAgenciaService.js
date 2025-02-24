import apiRequest from '../../utils/apiRequest';

const HideShowAgenciaService = async (idAgencia, token) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/agencia/hidde-agencia/${idAgencia}`;

    return apiRequest({
        url,
        method: 'PUT',
        headers: {
            authorization: token,
        },
    });
};

export default HideShowAgenciaService;
