import apiRequest from '../../utils/apiRequest';

const FetchNoticeCategoriasService = async (setCategorias) => {
    try {
        const url = `${
            import.meta.env.VITE_API_URL_BASE
        }/categories-noticeboard`;

        // Utilizamos apiRequest para manejar la petición
        const data = await apiRequest({ url });
        console.log(data);

        // Establecer los géneros con los datos obtenidos
        setCategorias(data.categorias);
    } catch (error) {
        console.error('Hubo un error al obtener los géneros:', error);
    }
};

export default FetchNoticeCategoriasService;
