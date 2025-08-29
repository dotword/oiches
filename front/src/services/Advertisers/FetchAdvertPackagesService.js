import apiRequest from '../../utils/apiRequest';

const FetchAdvertPackagesService = async (setPackages) => {
    try {
        const url = `${import.meta.env.VITE_API_URL_BASE}/advert-packages`;

        // Usar apiRequest para hacer la solicitud
        const data = await apiRequest({ url });

        // Establecer las packages obtenidas
        setPackages(data.data.packages);
    } catch (error) {
        console.error('Hubo un error al obtener las tipos de anuncio.', error);
    }
};

export default FetchAdvertPackagesService;
