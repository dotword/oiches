import apiRequest from '../utils/apiRequest';

const AddSalaPhotosService = async (props) => {
    const idSala = props.idSala.idSala;
    const url = `${import.meta.env.VITE_API_URL_BASE}/salas/photos/${idSala}`;

    return apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: props.token,
        },
        body: props.formData,
    });
};

export default AddSalaPhotosService;

export const DeleteSalaPhotoService = async (photoName, deletePhoto, token) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/salas/${photoName}/${deletePhoto}`;

    return apiRequest({
        url,
        method: 'DELETE',
        headers: {
            authorization: token,
        },
    });
};
