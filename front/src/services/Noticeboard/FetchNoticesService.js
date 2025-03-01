import apiRequest from '../../utils/apiRequest';

const FetchNoticesService = async (filters = {}, page = 1, pageSize = 10) => {
    try {
        // Crear un nuevo objeto con los filtros que tienen valores
        const queryParamsObj = {
            page,
            limit: pageSize,
        };

        if (filters.categoria) queryParamsObj.categoria = filters.categoria;
        if (filters.provincia) queryParamsObj.provincia = filters.provincia;

        // Agregar lógica: Si 'Todos' está seleccionado, no se pasa el filtro de géneros
        if (filters.generos && filters.generos !== 'Todos') {
            queryParamsObj.generos = filters.generos; // Aquí usamos singular para que coincida con la API
        }

        if (filters.order) queryParamsObj.order = filters.order;

        const queryParams = new URLSearchParams(queryParamsObj).toString();
        const url = `${
            import.meta.env.VITE_API_URL_BASE
        }/noticeboard?${queryParams}`;
        const data = await apiRequest({ url });

        return data;
    } catch (error) {
        console.error('Hubo un error al obtener los anuncios:', error);
        return { total: 0, rows: [] }; // Devolver el formato correcto incluso en caso de error
    }
};

export default FetchNoticesService;
