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

export const AddGrupoPhotos = () => {
    const { token } = useContext(AuthContext);
    const { idGrupo } = useParams();
    const [photo, setPhoto] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);
    const [error, setError] = useState('');
    const [resp, setResp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!photo) {
            setResp('Selecciona una foto');
            return;
        }
        try {
            const dataForm = new FormData();
            dataForm.append('photo', photo);

            const response = await AddGrupoFotoService({
                token,
                idGrupo,
                dataForm,
            });
            setResp(response);
            toast.success('Has subido tu foto con éxito');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <p className="font-semibold mb-2">Subir fotos</p>
                <div className="sect-photo md:w-full">
                    <span className="border-photos w-80 md:w-full">
                        {previewFoto ? (
                            <img src={previewFoto} alt="Vista previa" />
                        ) : (
                            <span>Sube una foto</span>
                        )}

                        <input
                            type="file"
                            name="photoA"
                            className="absolute w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                                setPhoto(e.target.files[0]);
                                setPreviewFoto(
                                    URL.createObjectURL(e.target.files[0])
                                );
                            }}
                        />
                    </span>
                </div>
                {previewFoto ? (
                    <div className="mt-3 max-w-80">
                        <input
                            type="submit"
                            value="Subir fotos"
                            className="btn-account max-w-44"
                        />
                    </div>
                ) : (
                    ''
                )}

                <div>
                    {error && <p>{error}</p>}
                    {resp.status === 'ok' && <p>{resp.message}</p>}
                </div>
            </form>
        </>
    );
};

export const AddGrupoFiles = () => {
    const { token } = useContext(AuthContext);
    const { idGrupo } = useParams();
    const [rider, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataForm = new FormData();
            dataForm.append('rider', rider);

            await AddGrupoFilesService({
                token,
                idGrupo,
                dataForm,
            });

            toast.success('Has subido tu rider con éxito');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <p className="font-semibold mb-2">Sube el Rider (.pdf)</p>
            <div className="sect-photo">
                <span className="border-photos w-80 md:w-full">
                    {rider ? (
                        <span className="text-xs p-1 overflow-hidden">
                            {rider.name}
                        </span>
                    ) : (
                        <span>Sube tu archivo</span>
                    )}

                    <input
                        type="file"
                        name={rider}
                        className="absolute w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </span>
            </div>

            <div className="mt-3 max-w-80">
                <input
                    type="submit"
                    value="Guardar Rider"
                    className="btn-account max-w-44"
                />
            </div>
            <div>{error && <p>{error}</p>}</div>
        </form>
    );
};

export const DeleteGrupoFiles = () => {
    const { currentUser, token } = useContext(AuthContext);
    const { idGrupo } = useParams();

    const [rider, setRider] = useState([]);
    const [deletePhoto, setDeletePhoto] = useState(null);
    const [photoName, setPhotoName] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGrupoMedia = async () => {
            try {
                const { data } = await getGrupoByIdService(idGrupo);
                setRider(data.grupo.pdf[0] || '');
            } catch (error) {
                setError(error.message);
                toast.error('Error al cargar los archivos');
            }
        };

        fetchGrupoMedia();
    }, [idGrupo]);

    const handleClick = async (e) => {
        try {
            e.preventDefault();

            DeleteGrupoFilesService(photoName, deletePhoto, token);
            toast.success('Borrado con éxito');
        } catch (err) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    return currentUser && rider ? (
        <>
            <p className="font-semibold mb-2">Borra tu Rider:</p>
            <div className="sect-photo">
                <span className="border-photos w-80 md:w-full">
                    <embed
                        src={`${urlUploads}/${rider.name}`}
                        type="application/pdf"
                        width="100%"
                    />
                </span>
            </div>
            {deletePhoto === null ? (
                <button
                    id="buttonDelete"
                    onClick={() => {
                        setDeletePhoto(rider.id);
                        setPhotoName(rider.name);
                    }}
                    className="btn-account my-3"
                >
                    Borrar rider
                </button>
            ) : (
                <button
                    id="buttonConfirm"
                    onClick={handleClick}
                    className="btn-account my-3"
                >
                    Confirmar borrado
                </button>
            )}
        </>
    ) : (
        ''
    );
};

export const DeleteGrupoPhotos = () => {
    const { currentUser, token } = useContext(AuthContext);
    const { idGrupo } = useParams();
    const [photos, setPhotos] = useState([]);
    const [deletePhoto, setDeletePhoto] = useState('');
    const [photoName, setPhotoName] = useState('');

    useEffect(() => {
        const fetchGrupoPhotos = async () => {
            try {
                const { data } = await getGrupoByIdService(idGrupo);
                setPhotos(data.grupo.fotos);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchGrupoPhotos();
    }, [idGrupo]);

    const handleClick = async (e) => {
        try {
            e.preventDefault();
            await DeleteGrupoFilesService(photoName, deletePhoto, token);
            toast.success('Borrado con éxito');
            setPhotos(photos.filter((photo) => photo.id !== deletePhoto));
        } catch (err) {
            toast.error(err.message);
        }
    };

    const renderPhoto = (photo) => (
        <div key={photo.id} className="mb-6 md:w-full">
            <div className="sect-photo">
                <div className="border-photos w-full">
                    <img
                        src={`${urlUploads}/${photo.name}`}
                        alt="Vista previa"
                    />
                </div>
            </div>
            {photo.id === deletePhoto ? (
                <button
                    onClick={handleClick}
                    className="btn-account max-w-44 mt-3"
                >
                    Confirmar borrado
                </button>
            ) : (
                <button
                    onClick={() => {
                        setDeletePhoto(photo.id);
                        setPhotoName(photo.name);
                    }}
                    className="btn-account max-w-44 mt-3"
                >
                    Borrar foto
                </button>
            )}
        </div>
    );
    console.log('photos ', photos);
    return currentUser && photos.length > 0 ? (
        <div className="mb-6 flex flex-wrap gap-x-8">
            <p className="font-semibold mb-4 w-full">Borrar fotos:</p>
            {photos.map(renderPhoto)}
        </div>
    ) : (
        ''
    );
};
