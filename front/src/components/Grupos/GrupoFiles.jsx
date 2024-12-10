import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/auth/auth.context.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getGrupoByIdService from '../../services/Grupos/getGrupoByIdService.js';
import {
    AddGrupoFilesService,
    DeleteGrupoFilesService,
    AddGrupoFotoService,
    SetMainGrupoPhotoService,
} from '../../services/Grupos/GrupoFilesService.js';

const urlUploads = `${import.meta.env.VITE_API_URL_BASE}/uploads`;

export const AddRiderForm = () => {
    const { idGrupo } = useParams();
    const { token } = useContext(AuthContext);

    const [rider, setRider] = useState(null);
    const [photoName, setPhotoName] = useState(null);
    const [deletePhoto, setDeletePhoto] = useState(null);
    const [riderError, setRiderError] = useState('');
    const [uploadedRider, setUploadedRider] = useState(null); // Para mostrar el PDF subido

    const fetchRider = useCallback(async () => {
        try {
            const { data } = await getGrupoByIdService(idGrupo);

            if (data.grupo.pdf && data.grupo.pdf.length > 0) {
                const riderData = data.grupo.pdf[0];
                setUploadedRider(`${urlUploads}/${riderData.name}`);
                setDeletePhoto(riderData.id);
                setPhotoName(riderData.name);
            } else {
                setUploadedRider(null);
                setDeletePhoto(null);
                setPhotoName(null);
            }
        } catch (error) {
            toast.error('Error al cargar el Rider');
        }
    }, [idGrupo]); // Dependencia de idGrupo

    useEffect(() => {
        fetchRider();
    }, [fetchRider]);

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

            // Si la subida fue exitosa, actualiza la previsualización y recarga el rider
            if (response.status === 'ok') {
                toast.success('Has subido el rider con éxito.');
                setRider(null); // Resetea el input
                setRiderError(''); // Limpiar el mensaje de error
                await fetchRider(); // Recargar el rider desde el backend
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
            await DeleteGrupoFilesService(
                photoName,
                deletePhoto,
                token,
                idGrupo
            );

            // Si la eliminación es exitosa, recargar el rider desde el backend
            toast.success('Rider borrado con éxito');
            await fetchRider(); // Recargar el rider para actualizar la UI
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleRiderSubmit}>
            <p className="font-semibold mb-2">Sube el Rider (.pdf)</p>
            <p className="text-xs mb-3">
                (*) El tamaño del archivo no debe exceder 3Mb
            </p>
            {/* Previsualización del Rider ya subido */}
            {uploadedRider && (
                <div className="sect-photo mb-4 flex justify-between max-w-2xl">
                    <embed
                        src={uploadedRider}
                        type="application/pdf"
                        height="300px"
                        className="w-2/3"
                    />
                    <button
                        type="button"
                        onClick={handleDeleteRider}
                        className="btn-account mt-3 bg-red-500 hover:bg-red-700 w-1/4 h-9 self-end"
                    >
                        Borrar Rider
                    </button>
                </div>
            )}

            {/* Input para subir un nuevo Rider */}
            {!uploadedRider && (
                <>
                    <div className="sect-photo">
                        <span className="border-photos w-80 max-w-2xl">
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
                    {rider && (
                        <div className="mt-3 max-w-80">
                            <input
                                type="submit"
                                value="Subir Rider"
                                className="btn-account max-w-44"
                            />
                        </div>
                    )}
                </>
            )}
        </form>
    );
};

export const AddFotosForm = () => {
    const { idGrupo } = useParams();
    const { token } = useContext(AuthContext);
    const [fotos, setFotos] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [photoNames, setPhotoNames] = useState([]);
    const [deletePhotos, setDeletePhotos] = useState([]);
    const [mainPhotoId, setMainPhotoId] = useState(null);
    const [fotoErrors, setFotoErrors] = useState('');
    const [uploadedFotos, setUploadedFotos] = useState([]);

    // Función para cargar las fotos existentes desde el backend
    const fetchFotos = useCallback(async () => {
        try {
            const { data } = await getGrupoByIdService(idGrupo);

            // Verificar si hay fotos subidas
            if (data.grupo.fotos && data.grupo.fotos.length > 0) {
                const fotosData = data.grupo.fotos.slice(0, 4); // Limitar a 4 fotos
                const uploadedFotosUrls = fotosData.map(
                    (foto) => `${urlUploads}/${foto.name}`
                );
                const deleteIds = fotosData.map((foto) => foto.id);
                const names = fotosData.map((foto) => foto.name);

                // Establece la foto principal al cargar
                const mainPhoto = fotosData.find((foto) => foto.main);
                setMainPhotoId(mainPhoto ? mainPhoto.id : null);

                setUploadedFotos(uploadedFotosUrls); // URLs para previsualizar
                setDeletePhotos(deleteIds); // Guardar los IDs de las fotos para la eliminación
                setPhotoNames(names); // Guardar los nombres de las fotos
            } else {
                // Si no hay fotos, limpiar los valores
                setUploadedFotos([]);
                setDeletePhotos([]);
                setPhotoNames([]);
            }
        } catch (error) {
            toast.error('Error al cargar las fotos');
        }
    }, [idGrupo]);

    useEffect(() => {
        fetchFotos(); // Cargar las fotos al montar el componente
    }, [fetchFotos]);

    // Crear URLs temporales para las fotos seleccionadas
    useEffect(() => {
        if (fotos.length > 0) {
            const newPreviews = fotos.map((foto) => URL.createObjectURL(foto));
            setPreviews(newPreviews);
        }
    }, [fotos]);

    // Manejar el envío de las fotos
    const handleFotosSubmit = async (e) => {
        e.preventDefault();

        if (fotos.length === 0) {
            setFotoErrors('Selecciona al menos una foto.');
            return;
        }

        try {
            const dataForm = new FormData();
            fotos.forEach((foto) => {
                dataForm.append('foto', foto); // Enviar todas las fotos bajo el campo "foto"
            });

            const response = await AddGrupoFotoService({
                token,
                idGrupo,
                dataForm,
            });

            // Si la subida fue exitosa, actualiza la previsualización y recarga las fotos
            if (response.status === 'ok') {
                toast.success('Has subido las fotos con éxito.');
                setFotos([]); // Resetea el input
                setFotoErrors(''); // Limpiar el mensaje de error
                setPreviews([]); // Limpiar las previsualizaciones
                await fetchFotos(); // Recargar las fotos desde el backend
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Manejar la selección de múltiples fotos (imágenes)
    const handleFotosChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 4) {
            setFotoErrors('Solo puedes subir un máximo de 4 fotos.');
            return;
        }

        const validFiles = files.filter((file) =>
            file.type.startsWith('image/')
        );

        if (validFiles.length !== files.length) {
            setFotoErrors('Solo se permiten archivos de imagen.');
        } else {
            setFotos(validFiles); // Almacenar los archivos seleccionados
            setFotoErrors('');
        }
    };

    // Manejar el borrado de una foto
    const handleDeleteFoto = async (index) => {
        try {
            await DeleteGrupoFilesService(
                photoNames[index],
                deletePhotos[index],
                token,
                idGrupo
            );

            // Si la eliminación es exitosa, recargar las fotos desde el backend
            toast.success('Foto borrada con éxito');
            await fetchFotos(); // Recargar las fotos para actualizar la UI
        } catch (error) {
            toast.error(error.message);
        }
    };

    // función para manejar la selección de la foto principal
    const handleSetMainPhoto = async (index) => {
        const photoId = deletePhotos[index];
        try {
            const response = await SetMainGrupoPhotoService({
                token,
                idGrupo,
                photoId,
            });

            if (response.status === 'ok') {
                setMainPhotoId(photoId); // Actualiza el estado de la foto principal
                toast.success('Foto establecida como principal');
                await fetchFotos(); // Actualiza las fotos
            }
        } catch (error) {
            toast.error('Error al establecer la foto principal');
        }
    };

    return (
        <form onSubmit={handleFotosSubmit}>
            <p className="font-semibold mb-2">Sube hasta 4 fotos</p>
            <p className="text-xs mb-3">
                (*) El tamaño del archivo no debe exceder 3Mb
            </p>
            {/* Previsualización de las Fotos ya subidas */}
            {uploadedFotos.length > 0 && (
                <div className="grid max-[600px]:grid-cols-1 grid-cols-2 lg:grid-cols-4 gap-4 my-6 place-items-center">
                    {uploadedFotos.map((fotoUrl, index) => (
                        <div key={index} className="sect-photo w-full">
                            <img
                                src={fotoUrl}
                                alt="fotos grupo"
                                className="image-shadow"
                            />

                            <div>
                                <button
                                    type="button"
                                    onClick={() => handleSetMainPhoto(index)}
                                    className={`btn-account max-w-44 mt-3 mr-4 ${
                                        mainPhotoId === deletePhotos[index]
                                            ? 'bg-yellowOiches text-black'
                                            : ''
                                    }`}
                                    disabled={
                                        mainPhotoId === deletePhotos[index]
                                    }
                                >
                                    {mainPhotoId === deletePhotos[index]
                                        ? 'Principal'
                                        : 'Hacer principal'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteFoto(index)}
                                    className="btn-account max-w-44 mt-3 bg-red-500 hover:bg-red-700"
                                >
                                    Borrar foto
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Input para subir nuevas fotos */}
            {uploadedFotos.length < 4 && (
                <>
                    <div className="sect-photo">
                        <span className="border-photos w-auto max-w-72">
                            {fotos.length > 0 ? (
                                fotos.map((foto, index) => (
                                    <span
                                        key={index}
                                        className="text-xs p-1 overflow-hidden"
                                    >
                                        <img src={previews} />
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm p-1 overflow-hidden text-center">
                                    Sube tus fotos (.jpg, .jpeg, .png o .webp)
                                </span>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="absolute w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFotosChange}
                            />
                        </span>
                        {fotoErrors && (
                            <p className="text-red-500">{fotoErrors}</p>
                        )}
                    </div>
                    {fotos.length > 0 && (
                        <div className="mt-3 max-w-80">
                            <input
                                type="submit"
                                value="Subir fotos"
                                className="btn-account max-w-44"
                            />
                        </div>
                    )}
                </>
            )}
        </form>
    );
};
