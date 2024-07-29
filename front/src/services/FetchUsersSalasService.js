const FetchUsersSalasService = async ({ token }) => {
    try {
        const url = `${import.meta.env.VITE_API_URL_BASE}/users/salas`;

        const response = await fetch(url, {
            headers: {
                token: token,
            },
        });

        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data.userSalas;
    } catch (error) {
        console.error('Hubo un error al obtener las salas:', error);
        return [];
    }
};

export default FetchUsersSalasService;
