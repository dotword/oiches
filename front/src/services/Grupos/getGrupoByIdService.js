import apiRequest from '../../utils/apiRequest';

const getGrupoByIdService = async (idGrupo) => {
    try {
        const url = `${import.meta.env.VITE_API_URL_BASE}/grupos/${idGrupo}`;

        const data = await apiRequest({ url });
        return data;
    } catch (error) {
        console.error('Hubo un error al obtener el grupo por ID:', error);
        return null;
    }
};

export default getGrupoByIdService;
