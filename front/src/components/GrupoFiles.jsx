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
            <form
                onSubmit={handleSubmit}
                className="md:flex md:flex-wrap justify-center"
            >
                <div className="sect-photo">
                    <span className="border-photos">
                        {previewFoto ? (
                            <img
                                src={previewFoto}
                                alt="Vista previa"
                                width={'200px'}
                            />
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
                    <div className="mt-2 w-full">
                        <input
                            type="submit"
                            value="Subir fotos"
                            className="btn-account"
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
    const [resp, setResp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rider) {
            setResp('Selecciona un archivo');
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
            setResp(response);
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
                <span className="border-photos w-full h-20">
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

            <div className="my-12 max-w-80">
                <input
                    type="submit"
                    value="Guardar Rider"
                    className="btn-account max-w-44"
                />
            </div>
            <div>{error && <p>{error}</p>}</div>
            {resp.status === 'ok' && <p>{resp.message}</p>}
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
            <div className="sect-photo">
                <span className="border-photos">
                    <span className="text-xs p-1 overflow-hidden">
                        {rider.name}
                    </span>
                </span>
            </div>
            {deletePhoto === null ? (
                <button
                    id="buttonDelete"
                    onClick={() => {
                        setDeletePhoto(rider.id);
                        setPhotoName(rider.name);
                    }}
                    className="btn-account my-4"
                >
                    Borrar rider
                </button>
            ) : (
                <button
                    id="buttonConfirm"
                    onClick={handleClick}
                    className="btn-account my-4"
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

    const urlUploads = `${import.meta.env.VITE_API_URL_BASE}/uploads`;

    const [photoA, setPhotoA] = useState(null);
    const [photoB, setPhotoB] = useState(null);
    const [photoC, setPhotoC] = useState(null);
    const [photoD, setPhotoD] = useState(null);
    const [deletePhoto, setDeletePhoto] = useState('');
    const [photoName, setPhotoName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGrupoPhotos = async () => {
            try {
                const { data } = await getGrupoByIdService(idGrupo);

                setPhotoA(data.grupo.fotos[0]);
                setPhotoB(data.grupo.fotos[1]);
                setPhotoC(data.grupo.fotos[2]);
                setPhotoD(data.grupo.fotos[3]);
            } catch (error) {
                setError(error.message);
                toast.error('Error al cargar las fotos');
            }
        };

        fetchGrupoPhotos();
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

    return currentUser ? (
        <div className="flex flex-wrap justify-center gap-6 mb-12">
            <p className="font-semibold mb-2">Borrar fotos:</p>
            {photoA ? (
                <div>
                    <div className="sect-photo ">
                        <div className="border-photos">
                            <img
                                src={`${urlUploads}/${photoA.name}`}
                                alt="Vista previa"
                                width={'200px'}
                            />
                        </div>
                    </div>
                    {photoA.id === deletePhoto ? (
                        <button
                            onClick={handleClick}
                            className="btn-account my-4"
                        >
                            Confirmar borrado
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setDeletePhoto(photoA.id);
                                setPhotoName(photoA.name);
                            }}
                            className="btn-account my-4"
                        >
                            Borrar foto
                        </button>
                    )}
                </div>
            ) : (
                ''
            )}

            {photoB ? (
                <div>
                    <div className="sect-photo">
                        <div className="border-photos">
                            <img
                                src={`${urlUploads}/${photoB.name}`}
                                alt="Vista previa"
                                width={'200px'}
                            />
                        </div>
                    </div>
                    {photoB.id === deletePhoto ? (
                        <button
                            onClick={handleClick}
                            className="btn-account my-4"
                        >
                            Confirmar borrado
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setDeletePhoto(photoB.id);
                                setPhotoName(photoB.name);
                            }}
                            className="btn-account my-4"
                        >
                            Borrar foto
                        </button>
                    )}
                </div>
            ) : (
                ''
            )}

            {photoC ? (
                <div>
                    <div className="sect-photo">
                        <div className="border-photos">
                            <img
                                src={`${urlUploads}/${photoC.name}`}
                                alt="Vista previa"
                                width={'200px'}
                            />
                        </div>
                    </div>
                    {photoC.id === deletePhoto ? (
                        <button
                            onClick={handleClick}
                            className="btn-account my-4"
                        >
                            Confirmar borrado
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setDeletePhoto(photoC.id);
                                setPhotoName(photoC.name);
                            }}
                            className="btn-account my-4"
                        >
                            Borrar foto
                        </button>
                    )}
                </div>
            ) : (
                ''
            )}

            {photoD ? (
                <div>
                    <div className="sect-photo">
                        <div className="border-photos">
                            <img
                                src={`${urlUploads}/${photoD.name}`}
                                alt="Vista previa"
                                width={'200px'}
                            />
                        </div>
                    </div>
                    {photoD.id === deletePhoto ? (
                        <button
                            onClick={handleClick}
                            className="btn-account my-4"
                        >
                            Confirmar borrado
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setDeletePhoto(photoD.id);
                                setPhotoName(photoD.name);
                            }}
                            className="btn-account my-4"
                        >
                            Borrar foto
                        </button>
                    )}
                </div>
            ) : (
                ''
            )}
        </div>
    ) : (
        ''
    );
};
