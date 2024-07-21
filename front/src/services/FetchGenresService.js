const FetchGenresService = async (setGenres) => {
    try {
        const url = `${import.meta.env.VITE_API_URL_BASE}/generos`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error en la solicitud de generos');
        }
        const data = await response.json();
        setGenres(data.data.genres);
    } catch (error) {
        console.error('Hubo un error al obtener los generos:', error);
    }
};

export default FetchGenresService;
