const FetchGruposService = async (filters = {}) => {
    try {
        const query = new URLSearchParams(filters).toString();
        const url = `${import.meta.env.VITE_API_URL_BASE}/grupos?${query}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error al obtener los grupos');
        }

        const data = await response.json();
        console.log('Datos obtenidos:', data); // Añade este console.log para depuración
        return data;
    } catch (error) {
        console.error('Hubo un error al obtener los grupos:', error);
        return [];
    }
};

export default FetchGruposService;
