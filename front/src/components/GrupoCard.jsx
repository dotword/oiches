import { useNavigate } from 'react-router-dom';
import StarRating from './StartRating.jsx';

const GrupoCard = ({ grupo }) => {
    const navigate = useNavigate();
    const imageUrl = `${import.meta.env.VITE_API_URL_BASE}/uploads/${
        grupo.primera_foto
    }`;

    const handleClick = () => {
        navigate(`/grupo/${grupo.id}`);
    };

    return (
        <div
            className="grupo-card bg-gray-800 text-white p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={handleClick}
        >
            <img
                src={imageUrl}
                alt={grupo.nombre}
                className="grupo-card-image w-full h-96 object-cover rounded-lg"
            />
            <h2 className="grupo-card-title text-xl font-bold mt-4">
                {grupo.nombre}
            </h2>
            <p className="grupo-card-genre text-gray-400">
                <span className="sub_title_ficha">Género:</span> {grupo.genero}
            </p>
            <p className="grupo-card-location text-gray-400">
                <span className="sub_title_ficha">Ubicación:</span>{' '}
                {grupo.ubicacion}
            </p>
            <div className="mt-2">
                <StarRating rating={grupo.media_votos} />
            </div>
        </div>
    );
};

export default GrupoCard;
