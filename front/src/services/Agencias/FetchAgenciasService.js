import apiRequest from '../../utils/apiRequest';

const FetchAgenciasService = async (filters = {}, page = 1, pageSize = 10) => {
    try {
        // Crear un nuevo objeto con los filtros que tienen valores
        const queryParamsObj = {
            page,
            limit: pageSize,
        };

        if (filters.nombre) queryParamsObj.nombre = filters.nombre;
        if (filters.provincia) queryParamsObj.provincia = filters.provincia;

        // Agregar lógica: Si 'Todos' está seleccionado, no se pasa el filtro de géneros
        if (filters.order) queryParamsObj.order = filters.order;

        const queryParams = new URLSearchParams(queryParamsObj).toString();
        const url = `${
            import.meta.env.VITE_API_URL_BASE
        }/agencias?${queryParams}`;
        const data = await apiRequest({ url });
        return data;
    } catch (error) {
        console.error('Hubo un error al obtener las agencias:', error);
        return { total: 0, rows: [] };
    }
};

export default FetchAgenciasService;
