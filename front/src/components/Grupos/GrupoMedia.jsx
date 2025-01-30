import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import getGrupoByIdService from '../../services/Grupos/getGrupoByIdService.js';
import {
    DeleteGrupoMediaService,
    AddGrupoMediaService,
} from '../../services/Grupos/GrupoMediaService.js';

export const AddGrupoMedia = () => {
    const { token } = useContext(AuthContext);
    const { idGrupo } = useParams();

    const [media, setMedia] = useState([]); // Videos ya subidos
    const [videoUrls, setVideoUrls] = useState([]); // Nuevos videos
    const [currentVideoUrl, setCurrentVideoUrl] = useState(''); // URL temporal

    // Obtener los videos existentes del backend cuando se monta el componente
    useEffect(() => {
        const fetchGrupoMedia = async () => {
            try {
                const { data } = await getGrupoByIdService(idGrupo);
                setMedia(data.grupo.media); // Cargar los videos ya subidos
            } catch (error) {
                toast.error(`Error al cargar los videos: ${error.message}`);
            }
        };

        fetchGrupoMedia();
    }, [idGrupo]);

    // Función para extraer el ID de YouTube de la URL
    const extractYouTubeId = (url) => {
        try {
            const urlObj = new URL(url);
            return urlObj.searchParams.get('v');
        } catch (e) {
            return null; // Manejo de casos donde el URL no es válido
        }
    };

    // Agregar un nuevo video a la lista temporal
    const handleAddVideo = async () => {
        const totalVideos = media.length + videoUrls.length;

        if (totalVideos >= 4) {
            toast.error('No puedes agregar más de 4 videos.');
            return;
        }

        const videoId = extractYouTubeId(currentVideoUrl);
        if (videoId && !videoUrls.some((video) => video.id === videoId)) {
            try {
                const dataForm = new FormData();
                dataForm.append('mediaName', videoId);

                // Añadir el video al backend
                await AddGrupoMediaService({
                    token,
                    idGrupo,
                    dataForm,
                });

                // Si todo va bien, actualizamos la lista visualmente
                setVideoUrls([
                    ...videoUrls,
                    { id: videoId, url: currentVideoUrl },
                ]);
                setCurrentVideoUrl(''); // Limpiar el input después de agregar
                toast.success('Video añadido con éxito');
            } catch (error) {
                toast.error(`Error al añadir el video: ${error.message}`);
            }
        } else {
            toast.error('URL no válida o ya agregada.');
        }
    };

    // Función para eliminar un video subido del backend
    const handleDeleteVideo = async (videoId) => {
        try {
            await DeleteGrupoMediaService(videoId, idGrupo, token);
            setMedia(media.filter((item) => item.id !== videoId)); // Actualizar la lista visual
            toast.success('Video eliminado con éxito');
        } catch (error) {
            toast.error(`Error al eliminar el video: ${error.message}`);
        }
    };

    // Eliminar un video nuevo antes de guardarlo
    const handleDeleteNewVideo = (videoId) => {
        setVideoUrls(videoUrls.filter((video) => video.id !== videoId));
        toast.success('Nuevo video eliminado con éxito');
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <p className="font-semibold mb-6">
                Enlaza videos de YouTube (hasta 4 videos):
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
                <input
                    type="url"
                    name="videoUrl"
                    placeholder="Añade enlaces a tus videos de YouTube"
                    value={currentVideoUrl} // Muestra la URL actual en el input
                    onChange={(e) => setCurrentVideoUrl(e.target.value)} // Actualiza la URL actual
                    className="form-input mt-0 max-w-96"
                />
                <button
                    type="button"
                    onClick={handleAddVideo}
                    className="btn-account min-w-32"
                >
                    Añadir video
                </button>
            </div>

            {/* Mostrar los videos ya subidos desde el backend */}
            {media.length > 0 && (
                <div className="mb-4">
                    <ul className="grid max-[600px]:grid-cols-1 grid-cols-2 gap-4 my-6 place-items-center">
                        {media.map((video, index) => (
                            <li key={index} className="w-full">
                                <LiteYouTubeEmbed
                                    id={video.url}
                                    title="Video subido"
                                    playlist={false}
                                />
                                <button
                                    onClick={() => handleDeleteVideo(video.id)}
                                    className="btn-account max-w-44 mt-3 bg-red-500 hover:bg-red-700"
                                >
                                    Borrar video
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Mostrar los videos añadidos en esta sesión */}
            {videoUrls.length > 0 && (
                <div className="mb-4">
                    <p className="font-semibold mb-4">
                        Nuevos videos añadidos:
                    </p>
                    <ul>
                        {videoUrls.map((video, index) => (
                            <li key={index} className="mb-4 max-w-80">
                                <LiteYouTubeEmbed
                                    id={video.id}
                                    title="Nuevo video"
                                    playlist={false}
                                />
                                <button
                                    onClick={() =>
                                        handleDeleteNewVideo(video.id)
                                    }
                                    className="btn-account max-w-44 mt-3 bg-red-500 hover:bg-red-700"
                                >
                                    Borrar video
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    );
};
