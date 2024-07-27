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
            <p className="font-semibold mb-2">Enlaza un video:</p>
            <input
                type="url"
                name="mediaName"
                placeholder="Añade enlaces a tus videos de YouTube"
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

            <div className="mt-3 max-w-80">
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

    const [media, setMedia] = useState([]);
    const [mediaDelete, setMediaDelete] = useState(null);

    useEffect(() => {
        const fetchGrupoMedia = async () => {
            try {
                const { data } = await getGrupoByIdService(idGrupo);
                setMedia(data.grupo.media);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchGrupoMedia();
    }, [idGrupo]);

    const handleClick = async (e) => {
        try {
            e.preventDefault();
            await DeleteGrupoMediaService(mediaDelete, idGrupo, token);
            setMedia(media.filter((item) => item.id !== mediaDelete));
            toast.success('Borraste el video');
        } catch (err) {
            toast.error(err.message);
        }
    };

    return currentUser ? (
        <>
            {media.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-x-8">
                    <p className="font-semibold mb-4 w-full">Borrar videos:</p>
                    {media.map((item, index) => (
                        <div key={index} className="md:w-5/12 mb-6">
                            <iframe
                                className="w-full min-h-48 rounded-3xl"
                                src={item.url}
                                title={`YouTube video player ${index}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                            {item.id === mediaDelete ? (
                                <button
                                    id="buttonConfirm"
                                    onClick={handleClick}
                                    className="btn-account max-w-44 mt-3"
                                >
                                    Confirmar borrado
                                </button>
                            ) : (
                                <button
                                    onClick={() => setMediaDelete(item.id)}
                                    className="btn-account max-w-44 mt-3"
                                >
                                    Borrar Video
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    ) : null;
};
