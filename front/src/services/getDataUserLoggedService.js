const getDataUserLoggedService = async ({ token }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/users`;

    const response = await fetch(url, {
        headers: {
            authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json.data.user[0];
};

export default getDataUserLoggedService;
