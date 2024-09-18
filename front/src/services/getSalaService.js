import apiRequest from '../utils/apiRequest';

const getSalasServices = async (idSala) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/salas/${idSala}`;

    return apiRequest({ url });
};

export default getSalasServices;
