import apiRequest from '../utils/apiRequest';

const getListSalasGrupoService = async ({ token, idUserOwner }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/users/owner/${idUserOwner}`;

    return apiRequest({
        url,
        headers: {
            Authorization: token,
        },
    });
};

export default getListSalasGrupoService;
