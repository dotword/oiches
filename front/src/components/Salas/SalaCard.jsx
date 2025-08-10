import { useNavigate } from 'react-router-dom';

// import StarRating from '../StartRating.jsx';
import DefaultProfile from '/Horizontal_blanco.webp';

const SalaCard = ({ sala }) => {
    const navigate = useNavigate();
    const { VITE_API_URL_BASE } = import.meta.env;

    // Obtener la imagen de la sala
    const imageUrl =
        sala.fotos && sala.fotos.length > 0
            ? `${VITE_API_URL_BASE}/uploads/${
                  sala.fotos.find((foto) => foto.main === 1)?.name ||
                  sala.fotos[0].name
              }`
            : sala.avatar
            ? `${VITE_API_URL_BASE}/uploads/${sala.avatar}`
            : DefaultProfile;

    // Manejar clic en la tarjeta
    const handleClick = () => {
        navigate(`/sala/${sala.id}`);
    };

    // Límite de géneros a 3 y agregar "..." si hay más
    const maxGeneros = 3;
    const generosArray = sala.generoNombres
        ? sala.generoNombres.split(',').map((g) => g.trim()) // Limpiar espacios
        : [];

    const mostrarGeneros =
        generosArray.length > maxGeneros
            ? `${generosArray.slice(0, maxGeneros).join(', ')}...`
            : generosArray.join(', ');

    return (
        <div className="card-generica" onClick={handleClick}>
            {/* Imagen */}
            <img
                src={imageUrl}
                alt={sala.nombre}
                className={`grupo-card-image w-full h-48 sm:h-48 rounded-lg mb-4 ${
                    imageUrl === DefaultProfile
                        ? 'object-contain'
                        : 'object-cover'
                }`}
            />

            {/* Contenido */}
            <div className="flex flex-col flex-grow">
                <h2 className="text-lg font-bold">{sala.nombre}</h2>

                {/* Mostrar los géneros con límite mirar mas arribe el limite */}
                <p className="text-gray-400">{mostrarGeneros}</p>

                <p>
                    {sala.ciudad}, {sala.provincia}
                </p>

                <div className="mt-auto pb-2 flex justify-end">
                    <div className="mt-4 inline-flex items-center bg-purple-600 text-white px-4 py-1 rounded-md hover:bg-purple-700 transition-all">
                        Más info
                    </div>
                </div>
                {/* Rating  */}
                {/* <div className="mt-2">
                    <StarRating rating={sala.media_votos} />
                </div> */}
            </div>
        </div>
    );
};

export default SalaCard;
