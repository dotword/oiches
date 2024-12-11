import apiRequest from '../../utils/apiRequest';

const FetchGruposService = async (filters = {}, page = 1, pageSize = 10) => {
    try {
        // Crear un nuevo objeto con los filtros que tienen valores
        const queryParamsObj = {
            page,
            limit: pageSize,
        };

        // Agregar solo los filtros que no estén vacíos
        if (filters.nombre) queryParamsObj.nombre = filters.nombre;
        if (filters.provincia) queryParamsObj.provincia = filters.provincia;
        if (filters.generos) queryParamsObj.generos = filters.generos;
        if (filters.order) queryParamsObj.order = filters.order;

        // Crear los parámetros de consulta
        const queryParams = new URLSearchParams(queryParamsObj).toString();

        // Construir la URL con los parámetros de consulta
        const url = `${
            import.meta.env.VITE_API_URL_BASE
        }/grupos?${queryParams}`;

        // Usar apiRequest para hacer la solicitud
        const data = await apiRequest({ url });

        return data;
    } catch (error) {
        console.error('Hubo un error al obtener los músicos:', error);
        return { total: 0, rows: [] };
    }
};

export default FetchGruposService;
