import { useNavigate } from 'react-router-dom';
import StarRating from './StartRating.jsx';
import DefaultProfile from '/Horizontal_blanco.webp';

const SalaCard = ({ sala }) => {
    const navigate = useNavigate();
    const { VITE_API_URL_BASE } = import.meta.env;

    const imageUrl = sala.primera_foto
        ? `${VITE_API_URL_BASE}/uploads/${sala.primera_foto}`
        : DefaultProfile;

    const handleClick = () => {
        navigate(`/sala/${sala.id}`);
    };

    return (
        <div className="card" onClick={handleClick}>
            <img
                src={imageUrl}
                alt={sala.nombre}
                className="sala-card-image w-full max-w-full h-48 max-h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="card-title text-lg font-bold mt-2">{sala.nombre}</h2>
            <p className="card-genre text-gray-400">{sala.generoNombres}</p>
            <p className="sala-card-province text-gray-400">
                <span className="sub_title_ficha">Provincia:</span>{' '}
                {sala.provincia}
            </p>
            <div className="mt-2">
                <StarRating rating={sala.media_votos} />
            </div>
        </div>
    );
};

export default SalaCard;
