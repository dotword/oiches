import apiRequest from '../../utils/apiRequest';

const FetchListInscripcionesService = async (
    filters = {},
    page = 1,
    pageSize = 25
) => {
    try {
        // Crear un nuevo objeto con los filtros que tienen valores
        const queryParamsObj = {
            page,
            limit: pageSize,
        };

        // Agregar solo los filtros que no estén vacíos
        if (filters.name) queryParamsObj.name = filters.name;

        // Crear los parámetros de consulta
        const queryParams = new URLSearchParams(queryParamsObj).toString();

        // Construir la URL con los parámetros de consulta
        const url = `${
            import.meta.env.VITE_API_URL_BASE
        }/concurso/contest-list?${queryParams}`;

        // Usar apiRequest para hacer la solicitud
        const data = await apiRequest({
            url,
        });

        return data;
    } catch (error) {
        console.error('Hubo un error al obtener las inscripciones:', error);
        return { total: 0, rows: [] };
    }
};

export default FetchListInscripcionesService;
