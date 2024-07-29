import { useNavigate } from 'react-router-dom';
import StarRating from './StartRating.jsx';
import DefaultProfile from '../../public/Horizontal_blanco.webp';

const GrupoCard = ({ grupo }) => {
    const navigate = useNavigate();
    const { VITE_API_URL_BASE } = import.meta.env;

    // Construir la URL de la imagen
    const imageUrl = grupo.foto
        ? `${VITE_API_URL_BASE}/uploads/${grupo.gf.grupoId}`
        : DefaultProfile;

    const handleClick = () => {
        navigate(`/grupo/${grupo.id}`);
    };

    return (
        <div
            className="grupo-card bg-gray-800 text-white p-4 rounded-lg shadow-lg cursor-pointer max-w-xs w-full h-auto"
            onClick={handleClick}
        >
            <img
                src={imageUrl}
                alt={grupo.nombre}
                className="grupo-card-image w-full h-60 object-cover rounded-lg mb-4"
            />
            <div className="flex flex-col gap-2 p-2 h-full justify-between">
                <h3 className="grupo-card-title text-xl font-bold mt-4">
                    {grupo.nombre}
                </h3>
                {grupo.provincia_nombre && (
                    <p>
                        Provincia:{' '}
                        <span className="text-gray-300">
                            {grupo.provincia_nombre}
                        </span>
                    </p>
                )}
                {grupo.genero_nombre && (
                    <p>
                        Género:{' '}
                        <span className="text-gray-300">
                            {grupo.genero_nombre}
                        </span>
                    </p>
                )}
                {grupo.media_votos && (
                    <div>
                        <StarRating
                            rating={grupo.media_votos}
                            className="p-1"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GrupoCard;
