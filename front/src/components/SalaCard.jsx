import { useNavigate } from 'react-router-dom';
import StarRating from './StartRating.jsx';
import DefaultProfile from '/Horizontal_blanco.webp';

const SalaCard = ({ sala }) => {
    const navigate = useNavigate();
    const { VITE_API_URL_BASE } = import.meta.env;
    console.log(sala);

    const imageUrl =
        sala.fotos && sala.fotos.length > 0
            ? // Buscar la foto principal con main === 1
              `${VITE_API_URL_BASE}/uploads/${
                  sala.fotos.find((foto) => foto.main === 1)?.name ||
                  sala.fotos[0].name
              }`
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
            <p>
                {sala.ciudad}, {sala.provincia}
            </p>
            <div className="mt-2">
                <StarRating rating={sala.media_votos} />
            </div>
        </div>
    );
};

export default SalaCard;
