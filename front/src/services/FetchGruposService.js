// const FetchGruposService = async (filters = {}, page = 1, pageSize = 10) => {
//     try {
//         // Crear los parámetros de consulta, incluyendo filtros, página y tamaño de página
//         const queryParams = new URLSearchParams({
//             ...filters,
//             page,
//             pageSize
//         }).toString();

//         // Construir la URL con los parámetros de consulta
//         const url = `${import.meta.env.VITE_API_URL_BASE}/grupos?${queryParams}`;

//         // Hacer la solicitud a la API
//         const response = await fetch(url);

//         // Comprobar si la respuesta es exitosa
//         if (!response.ok) {
//             throw new Error('Error al obtener los grupos');
//         }

//         // Convertir la respuesta a JSON
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         // Manejar errores
//         console.error('Hubo un error al obtener los grupos:', error);
//         return [];
//     }
// };

// export default FetchGruposService;

import apiRequest from '../utils/apiRequest';

const FetchGruposService = async (filters = {}, page = 1, pageSize = 10) => {
    try {
        // Crear los parámetros de consulta, incluyendo filtros, página y tamaño de página
        const queryParams = new URLSearchParams({
            ...filters,
            page,
            pageSize,
        }).toString();

        // Construir la URL con los parámetros de consulta
        const url = `${
            import.meta.env.VITE_API_URL_BASE
        }/grupos?${queryParams}`;

        // Usar apiRequest para hacer la solicitud
        const data = await apiRequest({ url });

        return data;
    } catch (error) {
        // Manejar errores
        console.error('Hubo un error al obtener los grupos:', error);
        return [];
    }
};

export default FetchGruposService;
