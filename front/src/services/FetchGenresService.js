import apiRequest from '../utils/apiRequest';

const FetchGenresService = async (setGenres) => {
    try {
        const url = `${import.meta.env.VITE_API_URL_BASE}/generos`;

        // Utilizamos apiRequest para manejar la petición
        const data = await apiRequest({ url });

        // Establecer los géneros con los datos obtenidos
        setGenres(data.data.genres);
    } catch (error) {
        console.error('Hubo un error al obtener los géneros:', error);
    }
};

export default FetchGenresService;
