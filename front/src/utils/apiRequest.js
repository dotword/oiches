const apiRequest = async ({
    url,
    method = 'GET',
    headers = {},
    body = null,
}) => {
    try {
        const options = {
            method,
            headers,
        };

        if (body) {
            options.body = body;
        }

        const response = await fetch(url, options);

        // Verificar si es JSON
        const contentType = response.headers.get('Content-Type');
        const isJson = contentType && contentType.includes('application/json');

        let json;
        if (isJson) {
            json = await response.json();
        }

        // Errores segun la respuesta del servidor
        if (!response.ok) {
            const errorMessage =
                json?.message || response.statusText || 'Error en la solicitud';
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }

        return isJson ? json : response;
    } catch (error) {
        console.error('Hubo un error en la solicitud:', error);
        throw error; // Re-lanzar el error para que pueda ser manejado por el código que llama a la función
    }
};

export default apiRequest;
