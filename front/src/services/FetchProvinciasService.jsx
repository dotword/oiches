const FetchProvinciasService = async (setProvinces) => {
    try {
        const url = `${import.meta.env.VITE_API_URL_BASE}/provincias`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error en la solicitud de provincias');
        }
        const data = await response.json();
        setProvinces(data.data.provincias);
    } catch (error) {
        console.error('Hubo un error al obtener las provincias:', error);
    }
};

export default FetchProvinciasService;
