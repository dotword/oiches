const FetchSalasService = async (filters = {}, page = 1, pageSize = 10) => {
    try {
        const queryParams = new URLSearchParams({
            ...filters,
            page,
            pageSize,
        }).toString();
        const url = `${import.meta.env.VITE_API_URL_BASE}/salas?${queryParams}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener las salas');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un error al obtener las salas:', error);
        return [];
    }
};

export default FetchSalasService;
