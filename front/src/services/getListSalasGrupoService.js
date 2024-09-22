import apiRequest from '../utils/apiRequest';

const getListSalasGrupoService = async (token) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/users/owner`;

    return apiRequest({
        url,
        headers: {
            authorization: token,
        },
    });
};

export default getListSalasGrupoService;
