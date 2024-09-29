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
        honorarios_to,
        media,
        pdf,
    } = entry;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return entry ? (
        <>
            <Header />
            <main className="p-4 mt-6 flex flex-col gap-6 mx-auto shadow-xl w-11/12 md:max-w-1200 md:px-24">
                <section className="flex flex-col items-center md:items-start gap-4 p-4">
                    {' '}
                    {/* flex-col para móvil, items-start en escritorio */}
                    <img
                        className="avatar-square"
                        src={
                            avatar
                                ? `${VITE_API_URL_BASE}/uploads/${avatar}`
                                : DefaultProfile
                        }
                        alt="Imagen de perfil del grupo"
                    />
                    <h2 className="text-2xl font-bold mt-2 text-center md:text-left">
                        {' '}
                        {/* Centramos en móvil, alineado a la izquierda en escritorio */}
                        {nombre}
                    </h2>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
                    {genero && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Géneros</span>
                            {genero.map((gen) => (
                                <div key={gen.generoId} className="text-black">
                                    {gen.generoName}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="border-t border-gray-300 pt-4">
                        <span className="font-semibold">Caché</span>
                        <p className="text-black">
                            {honorarios}€ - {honorarios_to}€
                        </p>
                    </div>

                    {provincia && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Provincia</span>
                            <p className="text-black">{provincia}</p>
                        </div>
                    )}

                    {currentUser && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Contacto</span>
                            <p className="text-black">{email}</p>
                        </div>
                    )}
                </section>

                <section>
                    <h3 className="font-semibold">Biografía</h3>
                    <p className="mb-6 mt-3 text-gray-600">
                        {biografia
                            ? biografia
                            : 'El grupo tiene que añadir la biografía.'}
                    </p>
                </section>

                {media.length > 0 && (
                    <section>
                        <h3 className="font-semibold">Videos</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6 place-items-center">
                        {fotos.length > 0 ? (
                            <>
                                {fotos.map((photo) => (
                                    <img
                                        key={photo.id}
                                        src={`${VITE_API_URL_BASE}/uploads/${photo.name}`}
                                        className="rounded-lg image-shadow max-h-80 object-cover"
                                        alt={nombre}
                                    />
                                ))}
                            </>
                        ) : (
                            <img
                                className="col-span-1 md:col-span-2 rounded-2xl"
                                src={Noimage}
                                alt="No image"
                            />
                        )}
                    </div>
                </section>

                {pdf.length > 0 && (
                    <section>
                        <h3 className="font-semibold">Rider</h3>
                        <iframe
                            className="my-6 w-full md:w-2/3 h-80 rounded-lg image-shadow"
                            src={`${VITE_API_URL_BASE}/uploads/${pdf[0].name}#zoom=90`}
                            title="PDF Viewer"
                        ></iframe>
                    </section>
                )}

                {comentarios.length > 0 && (
                    <section className="mb-10">
                        <h3 className="font-semibold text-lg">Comentarios</h3>

                        {comentarios.map((comentario) => (
                            <div
                                key={comentario.id}
                                className="my-6 p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        className="w-10 h-10 rounded-full object-cover"
                                        src={
                                            comentario.salaAvatar
                                                ? `${VITE_API_URL_BASE}/uploads/${comentario.salaAvatar}`
                                                : DefaultProfile
                                        }
                                        alt="Avatar sala"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm">
                                            {comentario.salaVotaNombre}
                                        </span>
                                        <p className="text-xs text-gray-500">
                                            {formatDate(
                                                comentario.createdAt.slice(
                                                    0,
                                                    10
                                                )
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <StarRating rating={comentario.voto} />
                                </div>

                                <p className="text-sm text-gray-700">
                                    {comentario.comentario}
                                </p>

                                <Link
                                    className="flex justify-end items-center gap-2 mt-3"
                                    to={`/sala/${comentario.salaVotaId}`}
                                >
                                    <img
                                        className="w-8 rounded-full"
                                        src={
                                            comentario.salaAvatar
                                                ? `${VITE_API_URL_BASE}/uploads/${comentario.salaAvatar}`
                                                : DefaultProfile
                                        }
                                        alt="Avatar sala"
                                    />
                                    <p className="italic text-sm text-gray-500">
                                        {comentario.salaVotaNombre}
                                    </p>
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
