import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getGrupoByIdService from '../services/getGrupoByIdService.js';
import {
    DeleteGrupoMediaService,
    AddGrupoMediaService,
} from '../services/GrupoMediaService.js';

export const AddGrupoMedia = () => {
    const { token } = useContext(AuthContext);
    const { idGrupo } = useParams();

    const [mediaName, setMediaName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataForm = new FormData();
            if (mediaName) {
                dataForm.append('mediaName', mediaName || '');
            }
            await AddGrupoMediaService({
                token,
                idGrupo,
                dataForm,
            });
            toast.success('Has modificado tu grupo con éxito');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="">
                <p className="font-semibold mb-2">Enlaza un video:</p>
                <input
                    type="url"
                    name="mediaName"
                    placeholder="Añade enlaces a tus videos"
                    value={mediaName}
                    onChange={(e) => {
                        e.target.value.includes('youtube.com/watch')
                            ? setMediaName(
                                  e.target.value.replace('watch?v=', 'embed/')
                              )
                            : setMediaName(e.target.value);
                    }}
                    className="form-input"
                />
            </div>

            <div className="my-12 max-w-80">
                <input
                    type="submit"
                    value="Guardar video"
                    className="btn-account max-w-44"
                />
            </div>
            <div>{error && <p>{error}</p>}</div>
        </form>
    );
};

export const DeleteGrupoMedia = () => {
    const { currentUser, token } = useContext(AuthContext);
    const { idGrupo } = useParams();

    const [mediaA, setMediaA] = useState([]);
    const [mediaB, setMediaB] = useState('');
    const [mediaC, setMediaC] = useState('');
    const [mediaD, setMediaD] = useState('');
    const [mediaDelete, setMediaDelete] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGrupoMedia = async () => {
            try {
                const { data } = await getGrupoByIdService(idGrupo);

                setMediaA(data.grupo.media[0] || '');
                setMediaB(data.grupo.media[1] || '');
                setMediaC(data.grupo.media[2] || '');
                setMediaD(data.grupo.media[3] || '');
            } catch (error) {
                setError(error.message);
                toast.error('Error al cargar los videos');
            }
        };

        fetchGrupoMedia();
    }, [idGrupo]);

    const handleClick = async (e) => {
        try {
            e.preventDefault();
            DeleteGrupoMediaService(mediaDelete, idGrupo, token);
            toast.success('Borraste el video');
        } catch (err) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    return currentUser ? (
        <>
            {mediaA && (
                <div className="mb-8">
                    <p className="font-semibold mb-2">Borrar videos:</p>
                    <div className="flex flex-col gap-3 mb-4">
                        <iframe
                            className="w-full min-h-60 rounded-3xl"
                            src={mediaA.url}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>

                        {mediaA.id === mediaDelete ? (
                            <button
                                id="buttonConfirm"
                                onClick={handleClick}
                                className="btn-account max-w-44"
                            >
                                Confirmar borrado
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setMediaDelete(mediaA.id);
                                }}
                                className="btn-account max-w-44"
                            >
                                Borrar Video
                            </button>
                        )}
                    </div>

                    {mediaB && (
                        <div className="flex flex-col gap-3 mb-4">
                            <iframe
                                className="w-full min-h-60 rounded-3xl"
                                src={mediaB.url}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>

                            {mediaB.id === mediaDelete ? (
                                <button
                                    id="buttonConfirm"
                                    onClick={handleClick}
                                    className="btn-account max-w-44"
                                >
                                    Confirmar borrado
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setMediaDelete(mediaB.id);
                                    }}
                                    className="btn-account max-w-44"
                                >
                                    Borrar Video
                                </button>
                            )}
                        </div>
                    )}

                    {mediaC && (
                        <div className="flex flex-col gap-3 mb-4">
                            <iframe
                                className="w-full min-h-60 rounded-3xl"
                                src={mediaC.url}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>

                            {mediaC.id === mediaDelete ? (
                                <button
                                    id="buttonConfirm"
                                    onClick={handleClick}
                                    className="btn-account max-w-44"
                                >
                                    Confirmar borrado
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setMediaDelete(mediaC.id);
                                    }}
                                    className="btn-account max-w-44"
                                >
                                    Borrar Video
                                </button>
                            )}
                        </div>
                    )}

                    {mediaD && (
                        <div className="flex flex-col gap-3 mb-4">
                            <iframe
                                className="w-full min-h-60 rounded-3xl"
                                src={mediaD.url}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>

                            {mediaD.id === mediaDelete ? (
                                <button
                                    id="buttonConfirm"
                                    onClick={handleClick}
                                    className="btn-account max-w-44"
                                >
                                    Confirmar borrado
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setMediaDelete(mediaD.id);
                                    }}
                                    className="btn-account max-w-44"
                                >
                                    Borrar Video
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    ) : (
        ''
    );
};
