import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import useSala from '../../hooks/useSala.jsx';
import StarRating from '../StartRating.jsx';
import DefaultProfile from '/DefaultProfile2.png';
import useAuth from '../../hooks/useAuth.jsx';
import Seo from '../SEO/Seo.jsx'; // Seo
import TextFormat from '../TextFormato.jsx';
import MapShow from '../MapShow.jsx';
import { IoChevronForward } from 'react-icons/io5';
import { IoChevronBack } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';

const SalaDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { idSala } = useParams();
    const { entry } = useSala(idSala);
    const { currentUser, token } = useAuth();
    const [actualUser, setActualUser] = useState('');
    const [formattedAddress, setFormattedAddress] = useState('');
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
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
        fotos,
        pdf,
        published,
    } = entry || {};

    const handleAddressChange = (newAddress) => {
        setFormattedAddress(newAddress);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `${VITE_API_URL_BASE}/salas?pageSize=300`
            );
            const data = await response.json();

            const sortedSalas = Array.isArray(data.result)
                ? data.result.sort(
                      (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
                  )
                : [];

            const currentIndex = sortedSalas.findIndex(
                (sala) => sala.id === idSala
            );
            if (currentIndex !== -1) {
                const previousSala =
                    currentIndex > 0 ? sortedSalas[currentIndex - 1] : null;
                const nextSala =
                    currentIndex < sortedSalas.length - 1
                        ? sortedSalas[currentIndex + 1]
                        : null;

                setPrevious(previousSala);
                setNext(nextSala);
            }
        };

        fetchData();
    }, [idSala, VITE_API_URL_BASE]);

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

    const handlePublish = async () => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/published-sala/${idSala}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                toast.success('Publicado con éxito');
            }
        } catch (error) {
            toast.error('Error al publicar');
        }
    };

    return published === 1 || actualUser.roles === 'admin' ? (
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

            <main className="p-4 mt-6 flex flex-col gap-6 mx-auto shadow-xl w-11/12 md:max-w-1200 md:px-24">
                <section className="mb-6">
                    {(usuarioAvatar || fotos.length > 0) && (
                        <img
                            className="w-40 h-40 rounded-full object-cover shadow-lg mx-auto md:ml-0"
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
                    <h2 className="text-3xl font-bold mt-6 text-left mb-2">
                        {nombre}
                    </h2>
                    <div className="flex flex-wrap gap-6">
                        {direccion && (
                            <>
                                <p className="text-black">
                                    {formattedAddress || direccion}
                                </p>
                                <p>
                                    <a
                                        className="font-semibold underline"
                                        href="#map"
                                    >
                                        Ver en mapa
                                    </a>
                                </p>
                            </>
                        )}

                        {actualUser.roles === 'grupo' && (
                            <p className="m-auto md:mr-0">
                                <Link
                                    to={`/sala/${idSala}/reservas`}
                                    className="bg-gradient-to-r from-purpleOiches to-moradoOiches text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                                >
                                    Quiero tocar aquí
                                </Link>
                            </p>
                        )}
                    </div>
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
                            <ul className="flex flex-wrap">
                                {genero.map((gen, index) => (
                                    <li key={gen.generoId} className="mb-0">
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
                {fotos.length > 0 && (
                    <section>
                        <h3 className="font-semibold">Fotos</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 items-start">
                            {fotos.map((photo) => (
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
                            ))}
                        </div>
                    </section>
                )}

                <section id="map" className="mt-8">
                    {direccion && (
                        <MapShow
                            direccion={direccion}
                            onAddressChange={handleAddressChange}
                        />
                    )}
                </section>
                {comentarios.length > 0 && (
                    <section className="mb-10">
                        <h3 className="font-semibold text-lg">Comentarios</h3>
                        {comentarios.map((comentario) => (
                            <div
                                key={comentario.id}
                                className="my-6 p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-4"
                            >
                                <Link
                                    className="flex items-center gap-4 mb-2"
                                    to={`/grupo/${comentario.grupoVotaId}`}
                                    target="_blank"
                                >
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
                                </Link>

                                <div className="flex flex-row gap-1">
                                    <StarRating rating={comentario.voto} />
                                </div>

                                <p className="text-sm text-gray-700">
                                    {comentario.comentario}
                                </p>
                            </div>
                        ))}
                    </section>
                )}

                <section className="flex justify-between mt-8 mb-16">
                    {previous && (
                        <Link
                            to={`/sala/${previous.id}`}
                            className="text-purpleOiches hover:text-white"
                        >
                            <button className="p-2 rounded-lg border border-purpleOiches hover:bg-purpleOiches flex items-end">
                                <IoChevronBack className=" border-purpleOiches hover:bg-purpleOiches text-xl" />{' '}
                                Anterior
                            </button>
                        </Link>
                    )}
                    {next && (
                        <Link
                            to={`/sala/${next.id}`}
                            className="text-purpleOiches hover:text-white "
                        >
                            <button className="p-2 rounded-lg border border-purpleOiches hover:bg-purpleOiches flex items-end">
                                Siguiente{' '}
                                <IoChevronForward className=" border-purpleOiches hover:bg-purpleOiches text-xl" />
                            </button>
                        </Link>
                    )}
                </section>

                {actualUser.roles === 'admin' && (
                    <>
                        {published === 0 && (
                            <button
                                className="btn-account max-w-44 min-w-32 bg-red-600"
                                onClick={handlePublish}
                            >
                                Publicar
                            </button>
                        )}
                        <a
                            href={`/sala/${idSala}/edit`}
                            className="flex justify-end gap-4 mb-16"
                        >
                            {' '}
                            <FaPencilAlt className=" text-2xl" />
                            Editar
                        </a>
                        <Toastify />
                    </>
                )}
            </main>
        </>
    ) : (
        <p className="text-center mt-12">La sala aún no está publicada</p>
    );
};

export default SalaDetail;
