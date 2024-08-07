import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useGrupo from '../hooks/useGrupo.jsx';
import StarRating from './StartRating.jsx';
import Header from './Header.jsx';
import DefaultProfile from '/DefaultProfile2.png';
import Noimage from '../../src/assets/noimage.png';
import useAuth from '../hooks/useAuth.jsx';
import Footer from './Footer.jsx';

const GrupoDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const { idGrupo } = useParams();
    const { currentUser } = useAuth();
    const { entry, error } = useGrupo(idGrupo);

    const {
        nombre,
        Provincia,
        genero,
        avatar,
        biografia,
        comentarios,
        email,
        fotos,
        honorarios,
        media,
        pdf,
    } = entry;

    return entry ? (
        <>
            <Header txt={nombre} />
            <main className="max-w-6xl mx-auto flex flex-col p-6 gap-6 m-4 rounded-3xl">
                <section className="flex flex-col lg:flex-row items-center gap-6">
                    <img
                        className="w-32 h-32 rounded-full"
                        src={
                            avatar
                                ? `${VITE_API_URL_BASE}/uploads/${avatar}`
                                : DefaultProfile
                        }
                        alt="Imagen de perfil del grupo"
                    />
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-6 my-6">
                    {genero && (
                        <span>
                            <span className="text-lg font-semibold">
                                Géneros
                            </span>
                            {genero.map((gen) => (
                                <div key={gen.generoId} className="text-black">
                                    {gen.generoName}
                                </div>
                            ))}
                        </span>
                    )}

                    {currentUser && (
                        <span>
                            <span className="text-lg font-semibold">
                                Contacto
                            </span>{' '}
                            <p className="text-black">{email}</p>
                        </span>
                    )}
                    {honorarios && (
                        <span>
                            <span className="text-lg font-semibold">Caché</span>{' '}
                            <p className="text-black">{honorarios}€</p>
                        </span>
                    )}
                    {Provincia && (
                        <span>
                            <span className="text-lg font-semibold">
                                Provincia
                            </span>{' '}
                            <p className="text-black">{Provincia}</p>
                        </span>
                    )}
                </section>
                <section>
                    <h3 className="text-lg font-semibold">Biografía</h3>
                    <p className="my-6">
                        {biografia
                            ? biografia
                            : 'El grupo tiene que añadir la biografía.'}
                    </p>
                </section>
                {pdf.length > 0 && (
                    <section>
                        <h3 className="text-lg font-semibold">Rider </h3>
                        <iframe
                            className="my-6 w-full lg:w-2/3 h-80 rounded-3xl"
                            src={`${VITE_API_URL_BASE}/uploads/${pdf[0].name}#zoom=90`}
                            frameBorder="0"
                            title="PDF Viewer"
                        ></iframe>
                    </section>
                )}
                {media.length > 0 && (
                    <section>
                        <h3 className="text-lg font-semibold">Videos</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
                            {media.map((media) => (
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
                            ))}
                        </div>
                    </section>
                )}

                {comentarios.length > 0 && (
                    <section>
                        <h3 className="text-lg font-semibold">Comentarios</h3>

                        {comentarios.map((comentario) => (
                            <div
                                key={comentario.id}
                                className="my-6 border p-3 rounded-3xl flex flex-col w-fit justify-between"
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
                                    <div>
                                        <StarRating rating={comentario.voto} />
                                    </div>
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
                        ))}
                    </section>
                )}
                <section>
                    <h3 className="text-lg font-semibold">Fotos</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6 place-items-center">
                        {fotos.length > 0 ? (
                            <>
                                {fotos.map((photo) => (
                                    <img
                                        key={photo.id}
                                        src={`${VITE_API_URL_BASE}/uploads/${photo.name}`}
                                        className="rounded-3xl max-h-80 shadow-xl"
                                        alt=""
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                <img
                                    className="col-span-1 lg:col-span-2 rounded-3xl"
                                    src={Noimage}
                                    alt="No image"
                                />
                            </>
                        )}
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    ) : (
        <p>{error}</p>
    );
};

export default GrupoDetail;
