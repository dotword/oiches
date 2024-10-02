import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getGrupoByIdService from '../services/getGrupoByIdService.js';
import {
    AddGrupoFilesService,
    DeleteGrupoFilesService,
    AddGrupoFotoService,
} from '../services/GrupoFilesService.js';

const urlUploads = `${import.meta.env.VITE_API_URL_BASE}/uploads`;

export const AddRiderForm = () => {
    const { idGrupo } = useParams();
    const { token } = useContext(AuthContext);

    const [rider, setRider] = useState(null);
    const [deletePhoto, setDeletePhoto] = useState(null);
    const [photoName, setPhotoName] = useState(null);
    const [riderError, setRiderError] = useState('');
    const [uploadedRider, setUploadedRider] = useState(null); // Para mostrar el PDF subido

    // Cargar el rider existente desde el backend
    useEffect(() => {
        const fetchRider = async () => {
            try {
                const { data } = await getGrupoByIdService(idGrupo);

                // Verificar si hay un rider subido
                if (data.grupo.pdf && data.grupo.pdf.length > 0) {
                    const riderData = data.grupo.pdf[0];
                    setUploadedRider(`${urlUploads}/${riderData.name}`);
                    setDeletePhoto(riderData.id); // Guardar el ID del rider para la eliminación
                    setPhotoName(riderData.name); // Guardar el nombre del rider
                }
            } catch (error) {
                toast.error('Error al cargar el Rider');
            }
        };

        fetchRider();
    }, [idGrupo]);

    // Manejar el envío del rider
    const handleRiderSubmit = async (e) => {
        e.preventDefault();

        if (!rider) {
            setRiderError('Selecciona un rider en formato PDF.');
            return;
        }

        try {
            const dataForm = new FormData();
            dataForm.append('rider', rider);

            const response = await AddGrupoFilesService({
                token,
                idGrupo,
                dataForm,
            });

            // Si la subida fue exitosa, actualiza la previsualización
            if (response.status === 'ok') {
                toast.success('Has subido el rider con éxito.');
                setUploadedRider(URL.createObjectURL(rider));
                setRider(null); // Resetea el input
                setRiderError(''); // Limpiar el mensaje de error
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Manejar la selección de un rider (PDF)
    const handleRiderChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setRider(file);
            setRiderError('');
        } else {
            setRiderError('Solo se permiten archivos PDF para el rider.');
        }
    };

    // Manejar el borrado del rider
    const handleDeleteRider = async () => {
        try {
            // Asegúrate de tener el `photoName` y `deletePhoto` definidos correctamente.
            await DeleteGrupoFilesService(
                photoName,
                deletePhoto,
                token,
                idGrupo
            );

            // Si la eliminación es exitosa, actualiza el estado para reflejarlo en la UI.
            setUploadedRider(null); // Limpiar la vista del PDF
            setRider(null); // Limpiar el input
            setRiderError(''); // Limpiar el mensaje de error
            toast.success('Rider borrado con éxito');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleRiderSubmit}>
            <p className="font-semibold mb-2">Sube el Rider (.pdf)</p>

            {/* Previsualización del Rider ya subido */}
            {uploadedRider && (
                <div className="sect-photo mb-4">
                    <p className="font-semibold">Rider Actual:</p>
                    <embed
                        src={uploadedRider}
                        type="application/pdf"
                        width="100%"
                        height="400px"
                        className="border-photos w-full"
                    />
                    <button
                        type="button"
                        onClick={handleDeleteRider}
                        className="btn-account max-w-44 mt-3 bg-red-500 hover:bg-red-700"
                    >
                        Borrar Rider
                    </button>
                </div>
            )}

            {/* Input para subir un nuevo Rider */}
            {!uploadedRider && (
                <>
                    <div className="sect-photo">
                        <span className="border-photos w-80 md:w-full">
                            {rider ? (
                                <span className="text-xs p-1 overflow-hidden">
                                    {rider.name}
                                </span>
                            ) : (
                                <span>Sube tu Rider (PDF)</span>
                            )}

                            <input
                                type="file"
                                accept=".pdf"
                                className="absolute w-full h-full opacity-0 cursor-pointer"
                                onChange={handleRiderChange}
                            />
                        </span>
                        {riderError && (
                            <p className="text-red-500">{riderError}</p>
                        )}
                    </div>
                    <div className="mt-3 max-w-80">
                        <input
                            type="submit"
                            value="Subir Rider"
                            className="btn-account max-w-44"
                        />
                    </div>
                </>
            )}
        </form>
    );
};

export const AddFotosForm = () => {
    const { token } = useContext(AuthContext);
    const { idGrupo } = useParams();
    const [photos, setPhotos] = useState([]);
    const [photoPreviews, setPhotoPreviews] = useState([]);
    const [photoError, setPhotoError] = useState('');
    const [uploadedPhotos, setUploadedPhotos] = useState([]); // Para las fotos subidas desde la API

    // Manejar el envío de las fotos
    const handleFotosSubmit = async (e) => {
        e.preventDefault();

        if (photos.length === 0) {
            setPhotoError('Selecciona al menos una foto.');
            return;
        }
        if (photos.length > 4) {
            setPhotoError('No puedes subir más de 4 fotos.');
            return;
        }

        try {
            const dataForm = new FormData();
            photos.forEach((photo) => {
                dataForm.append('photo', photo);
            });

            // Aquí llamamos a la API para subir las fotos
            const response = await AddGrupoFotoService({
                token,
                idGrupo,
                dataForm,
            });

            // Asegúrate de que la API devuelva algo en response
            if (response.status === 'ok') {
                toast.success('Has subido las fotos con éxito.');

                const uploadedPhotos = response.photos;

                setPhotos([]); // Limpiamos las fotos seleccionadas
                setPhotoPreviews([]); // Limpiamos las previsualizaciones

                // Actualizamos el estado con las nuevas fotos subidas
                setUploadedPhotos((prevPhotos) => [
                    ...prevPhotos,
                    ...uploadedPhotos,
                ]);
            } else {
                toast.error('Hubo un problema al subir las fotos.');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Manejar la selección de fotos (máximo 4)
    const handlePhotoChange = (e) => {
        const selectedPhotos = Array.from(e.target.files);
        const totalPhotos = photos.length + selectedPhotos.length;

        if (totalPhotos > 4) {
            setPhotoError('No puedes subir más de 4 fotos.');
            return;
        }

        setPhotos((prevPhotos) => [...prevPhotos, ...selectedPhotos]);
        setPhotoPreviews((prevPreviews) => [
            ...prevPreviews,
            ...selectedPhotos.map((photo) => URL.createObjectURL(photo)),
        ]);
        setPhotoError('');
    };

    // Eliminar una foto seleccionada
    const removePhoto = (index) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
        setPhotoPreviews((prevPreviews) =>
            prevPreviews.filter((_, i) => i !== index)
        );
    };

    // Eliminar una foto subida
    const handleDeleteUploadedPhoto = async (photoUrl, index) => {
        try {
            // Llamada al servicio para eliminar la foto
            await DeleteGrupoFilesService(photoUrl, token, idGrupo);

            // Si la eliminación fue exitosa, actualiza el estado para reflejarlo en la UI
            setUploadedPhotos((prevPhotos) =>
                prevPhotos.filter((_, i) => i !== index)
            );
            toast.success('Foto eliminada con éxito');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleFotosSubmit}>
            <p className="font-semibold mb-2">Sube hasta 4 fotos</p>
            <div className="sect-photo">
                <span className="border-photos w-80 md:w-full">
                    {photos.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {photoPreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={preview}
                                        alt={`Foto ${index + 1}`}
                                        className="h-16 w-16 object-cover"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                                        onClick={() => removePhoto(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span>Sube tus fotos (máximo 4)</span>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="absolute w-full h-full opacity-0 cursor-pointer"
                        onChange={handlePhotoChange}
                    />
                </span>
                {photoError && <p className="text-red-500">{photoError}</p>}
            </div>

            {/* Mostrar las fotos ya subidas con opción para borrarlas */}
            {uploadedPhotos.length > 0 && (
                <div className="mt-4">
                    <p className="font-semibold mb-2">Fotos Subidas</p>
                    <div className="flex flex-wrap gap-2">
                        {uploadedPhotos.map((photoUrl, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={photoUrl}
                                    alt={`Foto subida ${index + 1}`}
                                    className="h-16 w-16 object-cover"
                                />
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                                    onClick={() =>
                                        handleDeleteUploadedPhoto(
                                            photoUrl,
                                            index
                                        )
                                    }
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-3 max-w-80">
                <input
                    type="submit"
                    value="Subir Fotos"
                    className="btn-account max-w-44"
                />
            </div>
        </form>
    );
};
