import apiRequest from '../../utils/apiRequest';

const FetchAgenciaEspecialidadService = async (setEspecialidades) => {
    try {
        const url = `${
            import.meta.env.VITE_API_URL_BASE
        }/especialidadesAgencias`;

        // Usar apiRequest para hacer la solicitud
        const data = await apiRequest({ url });

        // Establecer las especialidades obtenidas
        setEspecialidades(data.data.especialidades);
    } catch (error) {
        console.error('Hubo un error al obtener las especialidades.', error);
    }
};

export default FetchAgenciaEspecialidadService;
