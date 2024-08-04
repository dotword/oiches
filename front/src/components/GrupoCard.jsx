import { useNavigate } from 'react-router-dom';
import StarRating from './StartRating.jsx';
import DefaultProfile from '/Horizontal_blanco.webp';

const GrupoCard = ({ grupo }) => {
    const navigate = useNavigate();
    const { VITE_API_URL_BASE } = import.meta.env;

    const imageUrl =
        grupo.fotos && grupo.fotos.length > 0 && grupo.fotos[0].name
            ? `${VITE_API_URL_BASE}/uploads/${grupo.fotos[0].name}`
            : DefaultProfile;

    const handleClick = () => {
        navigate(`/grupo/${grupo.id}`);
    };

    return (
        <div className="card" onClick={handleClick}>
            <img
                src={imageUrl}
                alt={grupo.nombre}
                className="grupo-card-image  w-full h-48 sm:h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="card-title text-lg font-bold mt-2">
                {grupo.nombre}
            </h2>
            <p className="card-genre text-gray-400">{grupo.generoNombres}</p>
            <p className="card-province text-gray-400">
                <span className="sub_title_ficha">Provincia:</span>{' '}
                {grupo.provincia_nombre}
            </p>
            <div className="mt-2">
                <StarRating rating={grupo.media_votos} />
            </div>
        </div>
    );
};

export default GrupoCard;
