import apiRequest from '../../utils/apiRequest';

const getAgenciaService = async (idAgencia) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/agencia/${idAgencia}`;

    return apiRequest({ url });
};

export default getAgenciaService;
