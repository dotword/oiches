import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import useSala from '../hooks/useSala.jsx';
import StarRating from './StartRating.jsx';
import Header from './Header.jsx';
import DefaultProfile from '/DefaultProfile2.png';
import Noimage from '../../src/assets/noimage.png';
import useAuth from '../hooks/useAuth.jsx';
import Footer from './Footer.jsx';
import Seo from '../components/SEO/Seo.jsx'; // Seo
import TextFormat from './TextFormato.jsx';
import MapComponent from './MapComponent.jsx';

const SalaDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { idSala } = useParams();
    const { entry, error } = useSala(idSala);
    const { currentUser } = useAuth();

    const [actualUser, setActualUser] = useState('');

    const {
        nombre,
        provincia,
        equipamiento,
        web,
        descripcion,
        condiciones,
        genero,
        direccion,
        ciudad,
        capacidad,
        usuarioAvatar,
        comentarios,
        email,
        fotos,
        pdf,
    } = entry || {}; // Desestructuración de `entry` (por si aún no está disponible)

    const wholeAddress = `${direccion}, ${ciudad}, ${provincia}`;
    console.log(genero);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) return;
            const response = await fetch(
                `${VITE_API_URL_BASE}/users/info/${currentUser.id}`
            );
            const data = await response.json();
            setActualUser(data[0]);
        };
        fetchData();
    }, [currentUser, VITE_API_URL_BASE]);

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
                <section className="flex flex-col items-center md:items-start gap-2 py-2">
                    {(usuarioAvatar || fotos.length > 0) && (
                        <img
                            className="avatar-square"
                            src={
                                usuarioAvatar
                                    ? `${VITE_API_URL_BASE}/uploads/${usuarioAvatar}`
                                    : `${VITE_API_URL_BASE}/uploads/${
                                          fotos.find((foto) => foto.main === 1)
                                              ?.name || fotos[0]?.name
                                      }`
                            }
                            alt="Imagen de perfil de la sala"
                        />
                    )}
                    <h2 className="text-3xl font-bold text-center mt-4 md:text-left">
                        {nombre}
                    </h2>
                    {direccion && <p className="text-black">{wholeAddress}</p>}
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {descripcion && (
                        <div className="border-t border-gray-300 pt-4 md:col-span-3 py-4">
                            <TextFormat text={descripcion} />
                        </div>
                    )}
                    {genero.length > 0 && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Géneros</span>
                            <ul className="flex flex-wrap mt-2">
                                {genero.map((gen, index) => (
                                    <li key={gen.generoId}>
                                        {gen.generoName}
                                        {index < genero.length - 1 && (
                                            <span>,&nbsp;</span>
                                        )}
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
                            <p>
                                <a
                                    href={`mailto:${email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    {email}
                                </a>
                            </p>
                        </div>
                    )}

                    {condiciones && (
                        <div className="md:col-span-3 border-t border-gray-300 pt-4">
                            <span className="font-semibold">Condiciones</span>
                            <TextFormat text={condiciones} />
                        </div>
                    )}

                    {pdf.length > 0 && (
                        <div className="md:col-span-3 border-t border-gray-300 pt-4">
                            <p className="font-semibold">Rider</p>
                            <iframe
                                className="my-4 w-full md:w-2/3 h-80 rounded-lg image-shadow"
                                src={`${VITE_API_URL_BASE}/uploads/${pdf[0].name}#zoom=90`}
                                title="PDF Viewer"
                            ></iframe>
                        </div>
                    )}

                    {equipamiento && (
                        <div className="md:col-span-3 border-t border-gray-300 pt-4">
                            <span className="font-semibold">Equipamiento</span>
                            <TextFormat text={equipamiento} />
                        </div>
                    )}
                </section>

                <section>
                    <h3 className="font-semibold">Fotos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 items-start">
                        {fotos.length > 0 ? (
                            fotos.map((photo) => (
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
                {actualUser.roles === 'admin' && (
                    <a
                        href={`/sala/${idSala}/edit`}
                        className="flex justify-end gap-4 mb-16"
                    >
                        {' '}
                        <FaPencilAlt className=" text-2xl" />
                        Editar
                    </a>
                )}
            </main>
            <Footer />
        </>
    ) : (
        <p>{error}</p>
    );
};

export default SalaDetail;
