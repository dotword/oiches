const AddSalaPhotosService = async (props) => {
    const idSala = props.idSala.idSala;

    const url = `${import.meta.env.VITE_API_URL_BASE}/salas/photos/${idSala}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            token: props.token,
        },
        body: props.formData,
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export default AddSalaPhotosService;
