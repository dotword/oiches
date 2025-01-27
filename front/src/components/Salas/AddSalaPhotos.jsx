import { useState, useContext, useCallback, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import {
    AddSalaPhotosService,
    SetMainSalaPhotoService,
    DeleteSalaPhotoService,
} from '../../services/Salas/AddSalaPhotosService.js';
import getSalasServices from '../../services/Salas/getSalaService.js';

const urlUploads = `${import.meta.env.VITE_API_URL_BASE}/uploads`;

const AddSalaPhotos = ({ idSala }) => {
    const { currentUser, token } = useContext(AuthContext);
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
            const { data } = await getSalasServices(idSala);

            // Verificar si hay fotos subidas
            if (data.sala.fotos && data.sala.fotos.length > 0) {
                const fotosData = data.sala.fotos.slice(0, 4); // Limitar a 4 fotos
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
    }, [idSala]);

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

            const response = await AddSalaPhotosService({
                token,
                idSala,
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
            await DeleteSalaPhotoService(
                photoNames[index],
                deletePhotos[index],
                token,
                idSala
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
            const response = await SetMainSalaPhotoService({
                token,
                idSala,
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

    return currentUser ? (
        <form onSubmit={handleFotosSubmit} className="w-full">
            <p className="font-semibold mb-2">Sube hasta 4 fotos</p>
            <p className="text-xs mb-3">
                (*) El tamaño del archivo no debe exceder 3Mb.<br></br>
                Formatos: .jpg, .jpeg, .png o .webp
            </p>
            {/* Previsualización de las Fotos ya subidas */}
            {uploadedFotos.length > 0 && (
                <div className="flex flex-wrap gap-8 mb-8">
                    {uploadedFotos.map((fotoUrl, index) => (
                        <div key={index} className="sect-photo max-w-72">
                            <img
                                src={fotoUrl}
                                alt="fotos sala"
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
                                    Sube o arrastra una foto. <br></br> Después
                                    haz clic en &quot;Subir foto&quot;
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
                                value="Subir foto"
                                className="btn-account max-w-44"
                            />
                        </div>
                    )}
                </>
            )}
        </form>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AddSalaPhotos;
