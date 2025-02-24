import { FaArrowRight } from 'react-icons/fa';
import { BsClock, BsCalendar, BsGeoAlt } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ConciertoList = ({ conciertos }) => {
    const { VITE_API_URL_BASE } = import.meta.env;

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
        <div className="concert-list">
            {conciertos.map((concierto) => (
                <div
                    className="bg-white rounded-lg shadow-lg mx-auto w-80 max-w-full overflow-hidden"
                    key={`{${concierto.id}}`}
                >
                    {/* <a className="relative" href={`/concierto/${concierto.id}`}>
                        <img
                            src={`${VITE_API_URL_BASE}/uploads/${concierto.poster}`}
                            alt={`Imagen del concierto de ${concierto.artista}`}
                            className="concert-card-image"
                        />
                    </a> */}

                    <Link
                        to={`/concierto/${concierto.id}`}
                        className="relative"
                    >
                        <img
                            src={`${VITE_API_URL_BASE}/uploads/${concierto.poster}`}
                            alt={`Imagen del concierto de ${concierto.artista}`}
                            className="concert-card-image"
                        />
                    </Link>

                    <div className="px-4 pb-6">
                        <h2 className="text-xl font-bold">
                            {concierto.artista}
                        </h2>
                        <p className="text-gray-600">
                            {concierto.banda_invitada}
                        </p>

                        {/* Detalles del evento */}
                        <div className="mt-3 space-y-2 text-gray-700">
                            <div className="flex items-baseline gap-2">
                                <BsCalendar className="text-gray-500 text-lg" />
                                <span>{formatDate(concierto.fecha)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BsClock className="text-gray-500 text-lg" />
                                <span>{formatHour(concierto.hora)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>
                                    <BsGeoAlt className="text-gray-500 text-lg" />
                                </span>
                                <span className="font-semibold">
                                    {concierto.sala}, {concierto.ciudad}
                                </span>
                            </div>
                        </div>

                        <Link
                            to={`/concierto/${concierto.id}`}
                            className="button-large"
                        >
                            Ver concierto <FaArrowRight />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ConciertoList;
