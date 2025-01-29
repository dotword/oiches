import { FaArrowRight } from 'react-icons/fa';

const ConciertoCard = ({ concierto }) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const imageUrl = `${VITE_API_URL_BASE}/uploads/${concierto.poster}`;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };
    return (
        <div className="card">
            <img
                src={imageUrl}
                alt={concierto.artista}
                className="concert-card-image"
            />
            <p>{formatDate(concierto.fecha)}</p>
            <h2 className="text-lg font-bold mt-2">{concierto.artista}</h2>
            <p className="mt-2">
                <span className="font-semibold">{concierto.sala}</span>,{' '}
                {concierto.ciudad}
            </p>
            <a
                className="flex justify-end items-center gap-2 my-4"
                href={`/concierto/${concierto.id}`}
            >
                Ver evento <FaArrowRight />
            </a>
        </div>
    );
};

export default ConciertoCard;
