import apiRequest from '../../utils/apiRequest';

const FetchAllPublishedAdvertisersService = async (
    filters = {},
    page = 1,
    pageSize = 25
) => {
    try {
        const params = new URLSearchParams();

        params.append('page', page);
        params.append('pageSize', pageSize);

        // Añadir filtros solo si tienen valor ('' será ignorado)
        Object.entries(filters).forEach(([key, value]) => {
            if (
                value !== undefined &&
                value !== null &&
                String(value).trim() !== ''
            ) {
                params.append(key, String(value).trim());
            }
        });

        // Construir la URL con los parámetros de consulta
        const url = `${
            import.meta.env.VITE_API_URL_BASE
        }/published-adverts?${params.toString()}`;

        // Usar apiRequest para hacer la solicitud
        const data = await apiRequest({
            url,
        });

        return data.adverts;
    } catch (error) {
        console.error('Hubo un error al obtener los anunciantes:', error);
        return { total: 0, rows: [] };
    }
};

export default FetchAllPublishedAdvertisersService;
