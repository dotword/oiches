import apiRequest from '../../utils/apiRequest';

const FetchAllReservasService = async (
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
        if (filters.salaname) queryParamsObj.salaname = filters.salaname;
        if (filters.gruponame) queryParamsObj.gruponame = filters.gruponame;
        if (filters.confirm) queryParamsObj.confirm = filters.confirm;
        if (filters.order) queryParamsObj.order = filters.order;

        // Crear los parámetros de consulta
        const queryParams = new URLSearchParams(queryParamsObj).toString();

        // Construir la URL con los parámetros de consulta
        const url = `${
            import.meta.env.VITE_API_URL_BASE
        }/reservas/listar?${queryParams}`;

        // Usar apiRequest para hacer la solicitud
        const data = await apiRequest({
            url,
            headers: {
                authorization: token,
            },
        });

        return data;
    } catch (error) {
        console.error('Hubo un error al obtener los usuarios:', error);
        return { total: 0, rows: [] };
    }
};

export default FetchAllReservasService;
