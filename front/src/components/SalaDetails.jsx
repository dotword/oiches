import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useSala from '../hooks/useSala.jsx';
import StarRating from './StartRating.jsx';
import Header from './Header.jsx';
import DefaultProfile from '/DefaultProfile2.png';
import Noimage from '../../src/assets/noimage.png';
import useAuth from '../hooks/useAuth.jsx';
import Footer from './Footer.jsx';
import { useEffect, useState } from 'react';

const SalaDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { idSala } = useParams();
    const [CurrentUser, setCurrentUser] = useState('');
    const { entry, error } = useSala(idSala);
    const { currentUser } = useAuth();
    
    const {
        nombre,
        provincia,
        equipamiento,
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
    } = entry;
    useEffect(() => {
        const fetchData = async () => {
            if(!currentUser) return
            const response = await fetch(`${VITE_API_URL_BASE}/users/info/${currentUser.id}`)
            const data = await response.json()
            setCurrentUser(data[0])
        }
        fetchData()
    },[currentUser])
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
                <section className="flex flex-col items-center md:items-start gap-6 p-4">
                {CurrentUser.roles === 'admin' &&
                <a href={`/sala/${idSala}/edit`}><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 576 512"><path fill="#000000" d="m402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6m156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8M460.1 174L402 115.9L216.2 301.8l-7.3 65.3l65.3-7.3zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1l30.9-30.9c4-4.2 4-10.8-.1-14.9"/></svg>
                </a>}
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
                            {genero.map((gen) => (
                                <div key={gen.generoId} className="text-black">
                                    {gen.generoName}
                                </div>
                            ))}
                        </div>
                    )}
                    {capacidad && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Aforo</span>{' '}
                            <p className="text-black">{capacidad}</p>
                        </div>
                    )}
                    <div className="border-t border-gray-300 pt-4">
                        <span className="font-semibold">Precio</span>{' '}
                        <p className="text-black">{precios}€</p>
                    </div>
                    {direccion && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Dirección</span>{' '}
                            <p className="text-black">{direccion}</p>
                        </div>
                    )}
                    {provincia && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Provincia</span>{' '}
                            <p className="text-black">{provincia}</p>
                        </div>
                    )}
                    {currentUser && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Contacto</span>{' '}
                            <p className="text-black">{email}</p>
                        </div>
                    )}
                    {equipamiento && (
                        <div className="md:col-span-3 border-t border-gray-300 pt-4">
                            <span className="font-semibold">Equipamiento</span>{' '}
                            <p className="text-black">{equipamiento}</p>
                        </div>
                    )}
                    {condiciones && (
                        <div className="md:col-span-3 border-t border-gray-300 pt-4">
                            <span className="font-semibold">Condiciones</span>{' '}
                            <p className="text-black">{condiciones}</p>
                        </div>
                    )}
                </section>

                <section>
                    <h3 className="font-semibold">Descripción</h3>
                    <p className="mb-6 mt-3 text-gray-600">
                        {descripcion
                            ? descripcion
                            : 'La Sala tiene que añadir la descripción.'}
                    </p>
                </section>

                <section>
                    <h3 className="font-semibold">Fotos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 place-items-center">
                        {photos.length > 0 ? (
                            photos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className="rounded-lg overflow-hidden shadow-lg"
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
