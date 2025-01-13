import apiRequest from '../../utils/apiRequest';

const FetchConciertosService = async (
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
        if (filters.ciudad) queryParamsObj.ciudad = filters.ciudad;
        if (filters.provincia) queryParamsObj.provincia = filters.provincia;
        if (filters.generos) queryParamsObj.generos = filters.generos;
        if (filters.fecha) queryParamsObj.fecha = filters.fecha;
        if (filters.order) queryParamsObj.order = filters.order;

        // Crear los parámetros de consulta
        const queryParams = new URLSearchParams(queryParamsObj).toString();

        // Construir la URL con los parámetros de consulta
        const url = `${
            import.meta.env.VITE_API_URL_BASE
        }/conciertos?${queryParams}`;

        // Usar apiRequest para hacer la solicitud
        const data = await apiRequest({ url });

        return data;
    } catch (error) {
        console.error('Hubo un error al obtener los conciertos:', error);
        return { total: 0, rows: [] };
    }
};

export default FetchConciertosService;
