import apiRequest from '../../utils/apiRequest';

const FetchAllNoticesService = async (
    token,
    filters = {},
    page = 1,
    pageSize = 10
) => {
    try {
        // Crear un nuevo objeto con los filtros que tienen valores
        const queryParamsObj = {
            page,
            limit: pageSize,
        };

        // Agregar solo los filtros que no estén vacíos
        if (filters.estado) queryParamsObj.estado = filters.estado;
        if (filters.order) queryParamsObj.order = filters.order;
        if (filters.orderField) queryParamsObj.orderField = filters.orderField;

        // Crear los parámetros de consulta
        const queryParams = new URLSearchParams(queryParamsObj).toString();

        // Construir la URL con los parámetros de consulta
        const url = `${
            import.meta.env.VITE_API_URL_BASE
        }/dashboard/notices?${queryParams}`;

        // Usar apiRequest para hacer la solicitud
        const notices = await apiRequest({
            url,
            headers: {
                authorization: token,
            },
        });

        return notices;
    } catch (error) {
        console.error('Hubo un error al obtener las notices:', error);
        return { total: 0, rows: [] };
    }
};

export default FetchAllNoticesService;
