// services/recoverPasswordService.jsx
export const recoverPasswordService = async ({ email }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
  
    const url = `${VITE_API_URL_BASE}/users/recover-password`;
  
    const data = {
      email
    };
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
  
    const json = await response.json();
  
    if (!response.ok) throw new Error(json.message);
  
    return json;
  };
  
  export default recoverPasswordService;
  