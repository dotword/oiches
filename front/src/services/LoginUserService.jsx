const loginUserService = async ({ email, password }) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const url = `${VITE_API_URL_BASE}/login`;

    const dataLogin = {
        email,
        password
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataLogin)
    });

    const json = await response.json();

    if(!response.ok) throw new Error(json.message);
    
    return json;
};

export default loginUserService;