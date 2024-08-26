const getListSalasGrupoService = async (token) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const url = `${VITE_API_URL_BASE}/users/owner`;

    const response = await fetch(url, {
        headers: {
            authorization: token,
        },
        method: 'GET',
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export default getListSalasGrupoService;
