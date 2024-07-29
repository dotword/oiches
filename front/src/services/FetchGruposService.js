const FetchGruposService = async (filters = {}) => {
    try {
        const query = new URLSearchParams(filters).toString();
        const url = `${import.meta.env.VITE_API_URL_BASE}/grupos?${query}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error al obtener los grupos');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un error al obtener las salas:', error);
        return [];
    }
};

export default FetchGruposService;
