import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import useConcierto from '../../hooks/useConcierto.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import Seo from '../SEO/Seo.jsx';
import TarjetaEvento from './TarjetaEvento.jsx';

const ConciertoDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { conciertoId } = useParams();
    const { concierto, isLoading, error } = useConcierto(conciertoId); // estado de carga y errores
    const { userLogged } = useAuth();
    const [isOpen, setIsOpen] = useState(false); // Estado del modal de imagen apertura y demas

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

    const formatPrice = (priceString) => priceString?.replace('.', ',') || '';

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
        title,
        artista,
        sala,
        ciudad,
        provincia,
        direccion,
        fecha,
        hora,
        precioAnticipada,
        otroTipoEntrada,
        precio,
        genero,
        link,
        poster,
        biografiaGrupo,
        description,
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
                title={`Concierto de ${
                    artista && artista.length > 0
                        ? `${artista} en ${sala}`
                        : title
                } `}
                description={`Concierto de ${
                    artista && artista.length > 0
                        ? `${artista} en ${sala}`
                        : title
                } (${ciudad}) el ${formattedDate.dia} de ${
                    formattedDate.mes
                } de ${formattedDate.anio}.`}
                keywords={`conciertos, ${sala}, ${
                    artista && artista.length > 0 && { artista }
                }, ${provincia}, ${ciudad}, música en vivo, eventos`}
                url={`https://oiches.com/concierto/${conciertoId}`}
                image={`${VITE_API_URL_BASE}/uploads/${poster}`}
                imageAlt="Imagen del concierto"
            />

            <main className="px-4 pb-16 mt-6 flex flex-col gap-6 mx-auto shadow-xl w-11/12 md:max-w-1200">
                {/* Contenedor principal */}
                <div className="grid-details">
                    {/* Columna izquierda: Información */}
                    <div className="py-4 flex flex-col  justify-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6 md:text-4xl">
                            {artista && artista.length > 0
                                ? `${artista} en concierto`
                                : title}
                        </h1>

                        {/* Tarjeta de evento */}
                        <section className="mb-6">
                            <TarjetaEvento
                                fecha={formattedDate.dia}
                                mes={formattedDate.mes}
                                anio={formattedDate.anio}
                                artista={artista || ''}
                                lugar={sala || ''}
                                precio={formatPrice(precio) || ''}
                                precioAnticipada={
                                    formatPrice(precioAnticipada) || ''
                                }
                                otroTipoEntrada={otroTipoEntrada || ''}
                                hora={formatHour(hora)}
                                ciudad={ciudad || ''}
                                provincia={provincia || ''}
                                link={link || '#'}
                            />
                        </section>

                        {/* Etiquetas de género musical*/}
                        {genero && genero.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {genero?.map((g, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm"
                                    >
                                        #{g.generoName}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Columna derecha: Imagen ampliable */}
                    <div
                        className="relative w-full rounded-xl overflow-hidden  cursor-pointer mt-8"
                        onClick={() => setIsOpen(true)} // Abre el modal al hacer clic
                    >
                        <img
                            src={`${VITE_API_URL_BASE}/uploads/${poster}`}
                            alt={`Imagen del concierto`}
                            className="w-full object-cover rounded-xl shadow-xl bg-gray-900 "
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Modal de imagen expandida y Genera  el fondo oscuro */}
                {isOpen && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-50"
                        onClick={() => setIsOpen(false)}
                    >
                        <div
                            className="max-w-full max-h-full p-5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-5 right-5 text-white text-3xl"
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </button>
                            <img
                                src={`${VITE_API_URL_BASE}/uploads/${poster}`}
                                alt="Póster del concierto expandido"
                                className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                            />
                        </div>
                    </div>
                )}

                {/* Descripción del grupo */}
                <section className="w-full max-w-900 mx-auto md:mb-8">
                    {artista && artista.length > 0 && (
                        <>
                            <h2 className="text-2xl font-bold mb-4">
                                {artista}
                            </h2>

                            <p className="text-gray-700">
                                {limitText(biografiaGrupo, 1000)}
                            </p>
                            <a
                                href={`/grupo/${grupo_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center mt-4 py-2 px-6 bg-purpleOiches rounded-lg text-white font-medium hover:bg-moradoOiches"
                            >
                                Más info
                            </a>
                        </>
                    )}
                    {description && description.length > 0 && (
                        <div
                            className="description-content"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    )}
                </section>

                {/* Información de la sala */}
                <section className="p-6 bg-gray-50 rounded-xl shadow-md w-full max-w-900 mx-auto">
                    <h2 className="text-2xl font-bold mb-4">{sala}</h2>
                    <p className="mb-2">
                        <span className="font-semibold">Dirección: </span>{' '}
                        {direccion}, {ciudad}, {provincia}
                    </p>
                    {infoSala && (
                        <p className="text-gray-700">
                            {limitText(infoSala, 1000)}
                        </p>
                    )}

                    <a
                        href={`/sala/${sala_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 py-2 px-6 bg-purpleOiches rounded-lg text-white font-medium hover:bg-moradoOiches"
                    >
                        Más info
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
