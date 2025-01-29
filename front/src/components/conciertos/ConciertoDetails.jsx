import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import useConcierto from '../../hooks/useConcierto.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import Seo from '../SEO/Seo.jsx';
import MapShow from '../MapShow.jsx';
import TarjetaEvento from './TarjetaEvento.jsx';

const ConciertoDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { conciertoId } = useParams();
    const { concierto, isLoading, error } = useConcierto(conciertoId); // estado de carga y errores
    const { userLogged } = useAuth();
    const [formattedAddress, setFormattedAddress] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Estado del modal de imagen apertura y demas

    useEffect(() => {
        if (concierto?.direccion) {
            setFormattedAddress(concierto.direccion);
        }
    }, [concierto]);

    // Funciones utilitarias
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            dia: date.toLocaleDateString('es-ES', { day: '2-digit' }),
            mes: date.toLocaleDateString('es-ES', { month: 'long' }),
            anio: date.getFullYear(),
        };
    };

    const formatHour = (timeString) => {
        const [hours, minutes] = timeString?.split(':') || ['--', '--'];
        return `${hours}:${minutes}`;
    };

    const formatPrice = (priceString) =>
        priceString?.replace('.', ',') || 'No disponible';

    const limitText = (text, limit) =>
        text?.length > limit ? text.slice(0, limit) + '...' : text;

    if (isLoading) {
        return (
            <p className="text-center text-lg mt-10">Cargando concierto...</p>
        );
    }

    if (error || !concierto) {
        return (
            <p className="text-center text-lg text-red-600 mt-10">
                No se pudo cargar el concierto.
            </p>
        );
    }

    const {
        artista,
        sala,
        ciudad,
        provincia,
        direccion,
        fecha,
        hora,
        precio,
        genero,
        link,
        poster,
        biografiaGrupo,
        grupo_id,
        infoSala,
        sala_id,
    } = concierto;

    const formattedDate = fecha
        ? formatDate(fecha)
        : { dia: '--', mes: '--', anio: '--' };

    return (
        <>
            <Seo
                title={`Concierto de ${artista || 'Artista desconocido'} en ${
                    sala || 'Sala desconocida'
                }`}
                description={`Concierto de ${artista} en ${sala} (${ciudad}) el ${formattedDate.dia} de ${formattedDate.mes} de ${formattedDate.anio}.`}
                keywords={`conciertos, ${sala}, ${artista}, ${provincia}, ${ciudad}, música en vivo, eventos`}
                url={`https://oiches.com/concierto/${conciertoId}`}
                image={`${VITE_API_URL_BASE}/uploads/${poster}`}
            />

            <main className="p-2 mt-6 flex flex-col gap-6 mx-auto shadow-lg bg-white w-11/12 md:max-w-5xl rounded-xl">
                {/* Contenedor principal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Columna izquierda: Información */}
                    <div className="p-4 flex flex-col  justify-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            {artista} en concierto
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            ¡Disfruta de una noche mágica con {artista} en el
                            escenario de {sala}!
                        </p>

                        {/* Tarjeta de evento */}
                        <section className="mb-6 ">
                            <TarjetaEvento
                                fecha={formattedDate.dia}
                                mes={formattedDate.mes}
                                anio={formattedDate.anio}
                                titulo={artista || 'Evento'}
                                lugar={sala || 'Sala desconocida'}
                                precio={formatPrice(precio)}
                                hora={formatHour(hora)}
                                ciudad={ciudad || 'Ciudad desconocida'}
                                provincia={provincia || 'Provincia desconocida'}
                                link={link || '#'}
                            />
                        </section>

                        {/* Etiquetas de género musical*/}
                        <div className="flex flex-wrap gap-2">
                            {genero?.map((g, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    #{g.generoName || 'Desconocido'}
                                </span>
                            ))}
                        </div>
                    </div>
                    {/* Columna derecha: Imagen ampliable */}
                    <div
                        className="relative w-full bg-gray-900 rounded-xl overflow-hidden shadow-xl cursor-pointer"
                        onClick={() => setIsOpen(true)} // Abre el modal al hacer clic
                    >
                        <img
                            src={`${VITE_API_URL_BASE}/uploads/${poster}`}
                            alt={`Imagen del concierto de ${artista}`}
                            className="w-full h-[600px] object-cover rounded-xl"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Modal de imagen expandida y Genera  el fondo oscuro */}
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                        {/* Botón para cerrar */}
                        <button
                            className="absolute top-5 right-5 text-white text-3xl"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>

                        {/* Imagen en pantalla completa */}
                        <img
                            src={`${VITE_API_URL_BASE}/uploads/${poster}`}
                            alt="Póster del concierto expandido"
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />
                    </div>
                )}
                {/* Descripción del evento */}
                <section className="p-6">
                    <h2 className="text-2xl font-bold mb-4">{artista}</h2>
                    <p className="text-gray-700">
                        {biografiaGrupo
                            ? limitText(biografiaGrupo, 1000)
                            : 'Sin descripción disponible.'}
                    </p>
                    <a
                        href={`/grupo/${grupo_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 py-2 px-6 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700"
                    >
                        Ver más sobre {artista}
                    </a>
                </section>

                {/* Información de la sala */}
                <section className="p-6 bg-gray-50 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold mb-4">
                        Información de la sala
                    </h2>
                    <p className="text-gray-700 mb-2 font-bold">
                        Dirección:{' '}
                        {formattedAddress || direccion || 'No disponible'}
                    </p>
                    {infoSala ? (
                        <p className="text-gray-700">
                            {limitText(infoSala, 1000)}
                        </p>
                    ) : (
                        <p className="text-gray-500">
                            Información no disponible.
                        </p>
                    )}
                    <div className="mt-4">
                        <MapShow
                            direccion={direccion}
                            onAddressChange={setFormattedAddress}
                        />
                    </div>
                    <a
                        href={`/sala/${sala_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 py-2 px-6 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700"
                    >
                        Ver más sobre la sala
                    </a>
                </section>

                {/* Botón de edición */}
                {userLogged && userLogged.roles === 'admin' && (
                    <div className="text-right mt-6">
                        <a
                            href={`/concierto/${conciertoId}/edit`}
                            className="inline-flex items-center py-2 px-6 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700"
                        >
                            <FaPencilAlt
                                className="mr-2"
                                aria-label="Editar concierto"
                            />
                            Editar concierto
                        </a>
                    </div>
                )}
            </main>
        </>
    );
};

export default ConciertoDetail;
