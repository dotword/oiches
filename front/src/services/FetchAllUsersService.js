import apiRequest from '../utils/apiRequest';

const FetchAllUsersService = async (
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
        if (filters.username) queryParamsObj.username = filters.username;
        if (filters.active) queryParamsObj.active = filters.active;
        if (filters.roles) queryParamsObj.roles = filters.roles;
        if (filters.salaname) queryParamsObj.salaname = filters.salaname;
        if (filters.gruponame) queryParamsObj.gruponame = filters.gruponame;
        if (filters.provincia) queryParamsObj.provincia = filters.provincia;
        if (filters.order) queryParamsObj.order = filters.order;

        // Crear los parámetros de consulta
        const queryParams = new URLSearchParams(queryParamsObj).toString();

        // Construir la URL con los parámetros de consulta
        const url = `${
            import.meta.env.VITE_API_URL_BASE
        }/dashboard/users?${queryParams}`;

        // Usar apiRequest para hacer la solicitud
        const data = await apiRequest({
            url,
            headers: {
                authorization: token,
            },
        });

        // console.log(data.data.user.rows);
        return data;
    } catch (error) {
        console.error('Hubo un error al obtener los usuarios:', error);
        return { total: 0, rows: [] };
    }
};

export default FetchAllUsersService;
