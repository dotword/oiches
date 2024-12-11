import apiRequest from '../../utils/apiRequest';

export const AddSalaPhotosService = async ({ token, idSala, dataForm }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/salas/photos/${idSala}`;

    return apiRequest({
        url,
        method: 'POST',
        headers: {
            authorization: token,
        },
        body: dataForm,
    });
};

export const SetMainSalaPhotoService = async ({ token, idSala, photoId }) => {
    const url = `${
        import.meta.env.VITE_API_URL_BASE
    }/salas/${idSala}/fotos/${photoId}/main`;

    return apiRequest({
        url,
        method: 'PUT',
        headers: {
            authorization: token,
        },
    });
};

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
