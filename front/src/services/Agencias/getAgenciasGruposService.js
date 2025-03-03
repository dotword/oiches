import apiRequest from '../../utils/apiRequest';

const getAgenciasGruposService = async ({ token, filters = {}, idAgencia }) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const queryParamsObj = {};

    // Agregar solo los filtros que no estén vacíos
    if (filters.name) queryParamsObj.name = filters.name;
    if (filters.order) queryParamsObj.order = filters.order;
    if (filters.orderField) queryParamsObj.orderField = filters.orderField;

    // Crear los parámetros de consulta
    const queryParams = new URLSearchParams(queryParamsObj).toString();

    const url = `${VITE_API_URL_BASE}/agencia/roster/${idAgencia}?${queryParams}`;
    return apiRequest({
        url,
        headers: {
            authorization: token,
        },
    });
};

export default getAgenciasGruposService;
