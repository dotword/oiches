import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useGrupo from '../hooks/useGrupo.jsx';
import Live from '../assets/Live.jpg';
import StarRating from './StartRating.jsx';
import Header from './Header.jsx';
import DefaultProfile from '../../public/DefaultProfile2.png';
import Noimage from '../../src/assets/noimage.png';
const GrupoDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const { idGrupo } = useParams();

    const { entry, error } = useGrupo(idGrupo);
    const {
        nombre,
        Provincia,
        Genero,
        avatar,
        biografia,
        comentarios,
        email,
        fotos,
        honorarios,
        media,
        pdf,
        photos,
        reservations,
        votes,
    } = entry;
    console.log(entry);
    return entry ? (
        <>
            <Header txt={nombre} />
            <main className="max-w-6xl mx-auto flex flex-col p-6 gap-6 shadow-xl m-4 rounded-3xl">
                <section className="flex flex-col place-items-center gap-6">
                    <img
                        className=" max-w-40"
                        src={avatar ? avatar : DefaultProfile}
                        alt="Imagen de perfil del grupo"
                    />
                    <h2 className="text-4xl self-start">{nombre}</h2>
                </section>
                <section className="grid grid-cols-2 gap-6 my-6">
                    <span>
                        Nombre del Grupo/Artista{' '}
                        <p className=" text-gray-400">{nombre}</p>
                    </span>
                    <span>
                        Genero<p className=" text-gray-400">{Genero}</p>
                    </span>
                </section>
                <section>
                    <h3 className="text-2xl">Biografia :</h3>
                    <p className="my-6">
                        {biografia
                            ? biografia
                            : 'El grupo tiene que añadir la biografia.'}
                    </p>
                </section>
                {media.length > 0 && (
                    <section>
                        <h3 className="text-2xl">Videos :</h3>
                        <div className="grid grid-cols-1 place-items-center gap-6 my-6 w-full lg:grid-cols-2">
                            {media.map((media) => {
                                return (
                                    <iframe
                                        className="w-full min-h-60 rounded-3xl"
                                        key={media.id}
                                        src={media.url}
                                        title="YouTube video player"
                                        frameBorder="1"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                );
                            })}
                        </div>
                    </section>
                )}
                {comentarios.length > 0 && (
                    <section>
                        <h3 className="text-2xl">Comentarios :</h3>

                        {comentarios.map((comentario) => {
                            console.log(comentario);
                            return (
                                <div
                                    key={comentario.id}
                                    className="my-6 border p-3 rounded-lg flex justify-between gap-20 max-w-fit"
                                >
                                    <span>
                                        {comentario.comentario}
                                        <p className="text-gray-400">
                                            {comentario.createdAt.slice(0, 10)}
                                        </p>
                                    </span>
                                    <Link
                                        className="flex place-items-center gap-2 hover:scale-105 transition-all"
                                        to={`/sala/${comentario.salaVotaId}`}
                                    >
                                        <img
                                            className="w-10"
                                            src={
                                                comentario.salaAvatar
                                                    ? comentario.salaAvatar
                                                    : DefaultProfile
                                            }
                                            alt=""
                                        />
                                        <p>{comentario.salaVotaNombre}</p>
                                    </Link>
                                </div>
                            );
                        })}
                    </section>
                )}
                <section>
                    <h3 className="text-2xl">Fotos:</h3>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 my-6 place-items-center">
                        {fotos.length > 0 ? (
                            <>
                                {fotos.map((photo) => (
                                    <img
                                        key={photo.id}
                                        src={`${VITE_API_URL_BASE}/uploads/${photo.name}`}
                                        className="rounded-3xl max-h-96 shadow-xl"
                                        alt=""
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                <img
                                    className="col-span-2 rounded-3xl"
                                    src={Noimage}
                                    alt="No image"
                                />
                            </>
                        )}
                    </div>
                </section>
            </main>
        </>
    ) : (
        <p>{error}</p>
    );
};

export default GrupoDetail;
