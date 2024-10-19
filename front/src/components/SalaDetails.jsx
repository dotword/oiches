import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useSala from '../hooks/useSala.jsx';
import StarRating from './StartRating.jsx';
import Header from './Header.jsx';
import DefaultProfile from '/DefaultProfile2.png';
import Noimage from '../../src/assets/noimage.png';
import useAuth from '../hooks/useAuth.jsx';
import Footer from './Footer.jsx';
import Seo from '../components/SEO/Seo.jsx'; // Seo

const SalaDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { idSala } = useParams();
    const { entry, error } = useSala(idSala);
    const { currentUser } = useAuth();

    const {
        nombre,
        provincia,
        equipamiento,
        web,
        descripcion,
        condiciones,
        genero,
        direccion,
        capacidad,
        usuarioAvatar,
        comentarios,
        email,
        precios,
        photos,
    } = entry || {}; // Desestructuración de `entry` (por si aún no está disponible)

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
            {/* Integración del componente Seo con datos dinámicos */}
            <Seo
                title={`${nombre} - Sala de Conciertos en ${provincia}`}
                description={`Descubre la sala ${nombre} en ${provincia}. Capacidad: ${capacidad} personas. Equipamiento: ${equipamiento}. Reserva tu evento hoy.`}
                keywords={`sala de conciertos, ${nombre}, ${provincia}, música en vivo, eventos`}
                url={`https://oiches.com/sala/${idSala}`}
                image={
                    usuarioAvatar
                        ? `${VITE_API_URL_BASE}/uploads/${usuarioAvatar}`
                        : DefaultProfile
                }
            />

            <Header />
            <main className="p-4 mt-6 flex flex-col gap-6 mx-auto shadow-xl w-11/12 md:max-w-1200 md:px-24">
                <section className="flex flex-col items-center md:items-start gap-6 p-4">
                    <img
                        className="w-32 h-32 rounded-full object-cover shadow-lg"
                        src={
                            usuarioAvatar
                                ? `${VITE_API_URL_BASE}/uploads/${usuarioAvatar}`
                                : DefaultProfile
                        }
                        alt="Imagen de perfil de la sala"
                    />
                    <h2 className="text-2xl font-bold text-center md:text-left">
                        {nombre}
                    </h2>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                    {genero && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Géneros</span>
                            <ul className="flex flex-wrap mt-2">
                                {genero.map((gen) => (
                                    <li
                                        key={gen.generoId}
                                        className="mr-3 leading-5"
                                    >
                                        {gen.generoName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {capacidad && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Aforo</span>
                            <p className="text-black">{capacidad}</p>
                        </div>
                    )}
                    {precios > 0 && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Precio</span>
                            <p className="text-black">{precios}€</p>
                        </div>
                    )}
                    {direccion && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Dirección</span>
                            <p className="text-black">{direccion}</p>
                        </div>
                    )}
                    {provincia && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Provincia</span>
                            <p className="text-black">{provincia}</p>
                        </div>
                    )}
                    {web && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Web</span>
                            <p>
                                <a
                                    href={web}
                                    target="_blank"
                                    className="underline"
                                >
                                    Web de {nombre}
                                </a>
                            </p>
                        </div>
                    )}
                    {currentUser && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Contacto</span>
                            <p className="text-black">{email}</p>
                        </div>
                    )}
                    {descripcion && (
                        <div className="md:col-span-3 border-t border-gray-300 pt-4">
                            <span className="font-semibold">Descripción</span>
                            <p style={{ whiteSpace: 'pre-line' }}>
                                {descripcion}
                            </p>
                        </div>
                    )}
                    {equipamiento && (
                        <div className="md:col-span-3 border-t border-gray-300 pt-4">
                            <span className="font-semibold">Equipamiento</span>
                            <p style={{ whiteSpace: 'pre-line' }}>
                                {equipamiento}
                            </p>
                        </div>
                    )}
                    {condiciones && (
                        <div className="md:col-span-3 border-t border-gray-300 pt-4">
                            <span className="font-semibold">Condiciones</span>
                            <p style={{ whiteSpace: 'pre-line' }}>
                                {condiciones}
                            </p>
                        </div>
                    )}
                </section>

                <section>
                    <h3 className="font-semibold">Fotos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 place-items-center">
                        {photos.length > 0 ? (
                            photos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className="rounded-lg overflow-hidden image-shadow"
                                >
                                    <img
                                        src={`${VITE_API_URL_BASE}/uploads/${photo.name}`}
                                        className="w-full h-full object-cover"
                                        alt="Foto de la sala"
                                    />
                                </div>
                            ))
                        ) : (
                            <img
                                className="col-span-1 md:col-span-2 rounded-3xl"
                                src={Noimage}
                                alt="No image"
                            />
                        )}
                    </div>
                </section>

                {comentarios.length > 0 && (
                    <section className="mb-10">
                        <h3 className="font-semibold text-lg">Comentarios</h3>
                        {comentarios.map((comentario) => (
                            <div
                                key={comentario.id}
                                className="my-6 p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-4"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <img
                                        className="w-10 h-10 rounded-full object-cover"
                                        src={
                                            comentario.grupoAvatar
                                                ? `${VITE_API_URL_BASE}/uploads/${comentario.grupoAvatar}`
                                                : DefaultProfile
                                        }
                                        alt="Avatar grupo"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm">
                                            {comentario.grupoVotaName}
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
                                    to={`/grupo/${comentario.grupoVotaId}`}
                                >
                                    <img
                                        className="w-8 rounded-full"
                                        src={
                                            comentario.grupoAvatar
                                                ? `${VITE_API_URL_BASE}/uploads/${comentario.grupoAvatar}`
                                                : DefaultProfile
                                        }
                                        alt="Avatar grupo"
                                    />
                                    <p className="italic text-sm text-gray-500">
                                        {comentario.grupoVotaName}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </section>
                )}

                {currentUser && (
                    <section>
                        <div className="flex justify-around mt-8 mb-12">
                            <Link
                                to={`/sala/${idSala}/reservas`}
                                className="p-4 shadow-lg rounded bg-purple-600 text-white hover:scale-105 transition-all"
                            >
                                Reservar
                            </Link>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    ) : (
        <p>{error}</p>
    );
};

export default SalaDetail;
