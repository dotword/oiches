import apiRequest from '../../utils/apiRequest';

const FetchAdvertCategoriesService = async (setCategories) => {
    try {
        const url = `${import.meta.env.VITE_API_URL_BASE}/advert-categories`;

        // Usar apiRequest para hacer la solicitud
        const data = await apiRequest({ url });

        // Establecer las categorias obtenidas
        setCategories(data.data.categories);
    } catch (error) {
        console.error('Hubo un error al obtener las categorias.', error);
    }
};

export default FetchAdvertCategoriesService;
