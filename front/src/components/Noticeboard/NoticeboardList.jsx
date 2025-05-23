import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NoticeboardList = ({ notices }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <ul className="md:flex md:flex-wrap md:gap-x-16">
            {notices.map((notice) => (
                <li
                    className="border-b border-gray-300 py-4 md:w-[calc(50%-2rem)]"
                    key={`{${notice.id}}`}
                >
                    <div className="px-4 pb-5">
                        <h2 className="text-lg font-bold">{notice.titulo}</h2>
                        <p className="text-sm">
                            {formatDate(notice.createdAt)}
                        </p>

                        <p className="flex">
                            {notice.ownerRole === 'grupo'
                                ? 'Músico/grupo '
                                : 'Sala de conciertos '}{' '}
                            busca...{' '}
                            {notice.parentCategory &&
                                `${notice.parentCategory}: `}
                            {notice.category}
                            {notice.provincia && ` en  ${notice.provincia}`}
                        </p>

                        {notice.genero.length > 0 && (
                            <div className="flex gap-x-1 mb-2">
                                <span className="font-semibold">Géneros: </span>
                                <ul className="flex flex-wrap">
                                    {notice.genero.map((gen, index) => (
                                        <li key={gen.generoId} className="mb-0">
                                            {gen.generoName}
                                            {index <
                                                notice.genero.length - 1 && (
                                                <span>,&nbsp;</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Link
                            to={`/noticeboard/${notice.id}`}
                            className="button-large max-w-40"
                        >
                            Más info <FaArrowRight />
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default NoticeboardList;
