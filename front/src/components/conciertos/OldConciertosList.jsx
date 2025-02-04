import { useState, useEffect } from 'react';
import FetchOldConciertosService from '../../services/conciertos/FetchOldConciertosService.js';
import { FaArrowRight } from 'react-icons/fa';
import { BsClock, BsCalendar, BsGeoAlt } from 'react-icons/bs';
import { toast } from 'react-toastify';

const OldConciertosList = ({ Paginator }) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const [page, setPage] = useState(1);
    const pageSize = 12;
    const [total, setTotal] = useState(null);
    const [conciertos, setConciertos] = useState(null);

    useEffect(() => {
        const getEntry = async () => {
            try {
                const oldConciertos = await FetchOldConciertosService(
                    page,
                    pageSize
                );
                setTotal(oldConciertos.total);
                setConciertos(oldConciertos.rows);
            } catch (error) {
                toast.error('Error al cargar los conciertos');
            }
        };

        getEntry();
    }, [page]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const formatHour = (timeString) => {
        const [hours, minutes] = timeString?.split(':') || ['--', '--'];
        return `${hours}:${minutes}`;
    };

    return (
        conciertos &&
        conciertos.length > 0 && (
            <section className="bg-gray-100 pt-8 pb-16">
                <div className="w-11/12 mx-auto md:max-w-7xl">
                    <h2 className="font-semibold text-center first-line:text-2xl">
                        Conciertos pasados
                    </h2>
                    <div className="grupo-list-container mt-8">
                        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                            {conciertos.map((concierto) => (
                                <div
                                    className="bg-white rounded-lg shadow-lg mx-auto w-full max-w-80 overflow-hidden"
                                    key={`{${concierto.id}}`}
                                >
                                    <a
                                        className="relative flex h-32"
                                        href={`/concierto/${concierto.id}`}
                                    >
                                        <img
                                            src={`${VITE_API_URL_BASE}/uploads/${concierto.poster}`}
                                            alt={`Imagen del concierto de ${concierto.artista}`}
                                            className="concert-card-image h-32"
                                        />
                                    </a>

                                    {/* Contenedor de información */}
                                    <div className="p-4">
                                        <h2 className="text-lg font-bold">
                                            {concierto.artista}
                                        </h2>
                                        <p className="text-gray-600">
                                            {concierto.banda_invitada}
                                        </p>

                                        {/* Detalles del evento */}
                                        <div className="mt-3 space-y-2 text-gray-700">
                                            <div className="flex items-baseline gap-2">
                                                <BsCalendar className="text-gray-500 text-lg" />
                                                <span>
                                                    {formatDate(
                                                        concierto.fecha
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <BsClock className="text-gray-500 text-lg" />
                                                <span>
                                                    {formatHour(concierto.hora)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span>
                                                    <BsGeoAlt className="text-gray-500 text-lg" />
                                                </span>
                                                <span className="font-semibold">
                                                    {concierto.sala},{' '}
                                                    {concierto.ciudad}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Botón de acción */}
                                        <a
                                            className="mt-3 flex justify-center items-center gap-1 bg-gradient-to-r from-moradoOiches to-purpleOiches text-white font-semibold py-1 rounded-lg"
                                            href={`/concierto/${concierto.id}`}
                                        >
                                            Ver evento <FaArrowRight />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Paginator
                            setPage={setPage}
                            page={page}
                            total={total}
                            pageSize={pageSize}
                        />
                    </div>
                </div>
            </section>
        )
    );
};

export default OldConciertosList;
