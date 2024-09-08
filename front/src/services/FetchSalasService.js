// const FetchSalasService = async (filters = {}, page = 1, pageSize = 10) => {
//     try {
//         const queryParams = new URLSearchParams({
//             ...filters,
//             page,
//             pageSize,
//         }).toString();
//         const url = `${import.meta.env.VITE_API_URL_BASE}/salas?${queryParams}`;

//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Error al obtener las salas');
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Hubo un error al obtener las salas:', error);
//         return [];
//     }
// };

import apiRequest from '../utils/apiRequest';

const FetchSalasService = async (filters = {}, page = 1, pageSize = 10) => {
    try {
        // Crear los parámetros de la consulta
        const queryParams = new URLSearchParams({
            ...filters, // Incluye los filtros
            page, // Número de página
            limit: pageSize, // Tamaño de página
        }).toString();

        // MOntamos la URL para la solicitud
        const url = `${import.meta.env.VITE_API_URL_BASE}/salas?${queryParams}`;

        // Peticion a la API usando apiRequest
        const data = await apiRequest({ url });

        return data;
    } catch (error) {
        console.error('Hubo un error al obtener las salas:', error);
        return { total: 0, rows: [] }; // Devolver el formato correcto incluso en caso de error
    }
};

export default FetchSalasService;
