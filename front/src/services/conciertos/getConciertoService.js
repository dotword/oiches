import apiRequest from '../../utils/apiRequest';

const getConciertoService = async (conciertoId) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/concierto/${conciertoId}`;

    return apiRequest({ url });
};

export default getConciertoService;
