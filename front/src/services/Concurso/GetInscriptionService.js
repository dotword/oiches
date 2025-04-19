import apiRequest from '../../utils/apiRequest';

const GetInscriptionService = async ({ token, idGrupo }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/concurso/inscripcion/${idGrupo}`;

    const response = await apiRequest({
        url,
        headers: {
            Authorization: token,
        },
    });

    return response;
};

export default GetInscriptionService;
