import apiRequest from '../../utils/apiRequest';

const FetchOldConciertosService = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL_BASE}/conciertos-old`;

        const data = await apiRequest({ url });

        return data;
    } catch (error) {
        console.error('Hubo un error al obtener los conciertos:', error);
        return { total: 0, rows: [] };
    }
};

export default FetchOldConciertosService;
