import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
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
        provincia,
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
            <main className="p-4 mt-6 flex flex-col gap-6 mx-auto shadow-xl w-11/12 md:max-w-1200 md:px-24">
                <section className="flex flex-col mx-auto md:flex-row items-center gap-6">
                    <img
                        className="w-40 h-40 rounded-full object-cover"
                        src={
                            avatar
                                ? `${VITE_API_URL_BASE}/uploads/${avatar}`
                                : DefaultProfile
                        }
                        alt="Imagen de perfil del grupo"
                    />
                </section>
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
                    {genero && (
                        <span>
                            <span className="font-semibold">Géneros</span>
                            {genero.map((gen) => (
                                <div key={gen.generoId} className="text-black">
                                    {gen.generoName}
                                </div>
                            ))}
                        </span>
                    )}

                    <span>
                        <span className="font-semibold">Caché</span>{' '}
                        <p className="text-black">{honorarios}€</p>
                    </span>

                    {provincia && (
                        <span>
                            <span className="font-semibold">Provincia</span>{' '}
                            <p className="text-black">{provincia}</p>
                        </span>
                    )}
                    {currentUser && (
                        <span>
                            <span className="font-semibold">Contacto</span>{' '}
                            <p className="text-black">{email}</p>
                        </span>
                    )}
                </section>
                <section>
                    <h3 className="font-semibold">Biografía</h3>
                    <p className="mb-6 mt-3">
                        {biografia
                            ? biografia
                            : 'El grupo tiene que añadir la biografía.'}
                    </p>
                </section>

                {media.length > 0 && (
                    <section>
                        <h3 className="font-semibold">Videos</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                            {media.map((media) => (
                                <LiteYouTubeEmbed
                                    key={media.id}
                                    id={media.url}
                                    title="YouTube Video"
                                    playlist={false}
                                />
                            ))}
                        </div>
                    </section>
                )}
                <section>
                    <h3 className="font-semibold">Fotos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 place-items-center">
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
                                    className="col-span-1 md:col-span-2 rounded-3xl"
                                    src={Noimage}
                                    alt="No image"
                                />
                            </>
                        )}
                    </div>
                </section>
                {pdf.length > 0 && (
                    <section>
                        <h3 className="font-semibold">Rider </h3>
                        <iframe
                            className="my-6 w-full md:w-2/3 h-80 rounded-3xl"
                            src={`${VITE_API_URL_BASE}/uploads/${pdf[0].name}#zoom=90`}
                            title="PDF Viewer"
                        ></iframe>
                    </section>
                )}
                {comentarios.length > 0 && (
                    <section className="mb-10">
                        <h3 className="font-semibold">Comentarios</h3>

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
            </main>
            <Footer />
        </>
    ) : (
        <p>{error}</p>
    );
};

export default GrupoDetail;
