import { useNavigate } from 'react-router-dom';
import StarRating from '../StartRating.jsx';
import DefaultProfile from '/Horizontal_blanco.webp';

const GrupoCard = ({ grupo }) => {
    const navigate = useNavigate();
    const { VITE_API_URL_BASE } = import.meta.env;

    const imageUrl =
        grupo.fotos && grupo.fotos.length > 0
            ? `${VITE_API_URL_BASE}/uploads/${
                  grupo.fotos.find((foto) => foto.main === 1)?.name ||
                  grupo.fotos[0].name
              }`
            : grupo.avatar
            ? `${VITE_API_URL_BASE}/uploads/${grupo.avatar}`
            : DefaultProfile;

    const handleClick = () => {
        navigate(`/grupo/${grupo.id}`);
    };
    // Límite de géneros a 3 y agregar "..." si hay más
    const maxGeneros = 3;
    const generosArray = grupo.generoNombres
        ? grupo.generoNombres.split(',').map((g) => g.trim()) // Limpiar espacios
        : [];

    const mostrarGeneros =
        generosArray.length > maxGeneros
            ? `${generosArray.slice(0, maxGeneros).join(', ')}...`
            : generosArray.join(', ');
    return (
        <div className="card-generica" onClick={handleClick}>
            <img
                src={imageUrl}
                alt={grupo.nombre}
                className={`grupo-card-image w-full h-48 sm:h-48 rounded-lg mb-4 ${
                    imageUrl === DefaultProfile
                        ? 'object-contain'
                        : 'object-cover'
                }`}
            />
            <h2 className="card-title text-lg font-bold mt-2">
                {grupo.nombre}
            </h2>
            <p className="card-genre text-gray-400">{mostrarGeneros}</p>
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
