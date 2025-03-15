// import { useNavigate } from 'react-router-dom';
// import StarRating from '../StartRating.jsx';
// import DefaultProfile from '/Horizontal_blanco.webp';

// const SalaCard = ({ sala }) => {
//     const navigate = useNavigate();
//     const { VITE_API_URL_BASE } = import.meta.env;

//     const imageUrl =
//         sala.fotos && sala.fotos.length > 0
//             ? // Buscar la foto principal con main === 1
//               `${VITE_API_URL_BASE}/uploads/${
//                   sala.fotos.find((foto) => foto.main === 1)?.name ||
//                   sala.fotos[0].name
//               }`
//             : sala.avatar
//             ? `${VITE_API_URL_BASE}/uploads/${sala.avatar}`
//             : DefaultProfile;

//     const handleClick = () => {
//         navigate(`/sala/${sala.id}`);
//     };

//     return (
//         <div className="card" onClick={handleClick}>
//             <img
//                 src={imageUrl}
//                 alt={sala.nombre}
//                 className={`sala-card-image w-full h-48 sm:h-48 rounded-lg mb-4 ${
//                     imageUrl === DefaultProfile
//                         ? 'object-contain'
//                         : 'object-cover'
//                 }`}
//             />
//             <h2 className="card-title text-lg font-bold mt-2">{sala.nombre}</h2>
//             <p className="card-genre text-gray-400">{sala.generoNombres}</p>
//             <p>
//                 {sala.ciudad}, {sala.provincia}
//             </p>
//             <div className="mt-2">
//                 <StarRating rating={sala.media_votos} />
//             </div>
//         </div>
//     );
// };

// export default SalaCard;

// import { useNavigate } from 'react-router-dom';
// import StarRating from '../StartRating.jsx';
// import DefaultProfile from '/Horizontal_blanco.webp';

// const SalaCard = ({ sala }) => {
//     const navigate = useNavigate();
//     const { VITE_API_URL_BASE } = import.meta.env;

//     const imageUrl =
//         sala.fotos && sala.fotos.length > 0
//             ? // Buscar la foto principal con main === 1
//               `${VITE_API_URL_BASE}/uploads/${
//                   sala.fotos.find((foto) => foto.main === 1)?.name ||
//                   sala.fotos[0].name
//               }`
//             : sala.avatar
//             ? `${VITE_API_URL_BASE}/uploads/${sala.avatar}`
//             : DefaultProfile;

//     const handleClick = () => {
//         navigate(`/sala/${sala.id}`);
//     };

//     return (
//         <div
//             className="card flex flex-col h-full p-4 bg-footercolor shadow-md rounded-lg cursor-pointer transition-transform hover:scale-105"
//             onClick={handleClick}
//         >
//             {/* Imagen */}
//             <img
//                 src={imageUrl}
//                 alt={sala.nombre}
//                 className={`w-full h-48 sm:h-48 rounded-lg mb-4 ${
//                     imageUrl === DefaultProfile
//                         ? 'object-contain'
//                         : 'object-cover'
//                 }`}
//             />

//             {/* Contenido */}
//             <div className="flex flex-col flex-grow">
//                 <h2 className="text-lg font-bold">{sala.nombre}</h2>
//                 <p className="text-gray-400">{sala.generoNombres}</p>
//                 <p>
//                     {sala.ciudad}, {sala.provincia}
//                 </p>

//                 {/* StarRating hacia abajo */}
//                 <div className="flex-grow"></div>

//                 {/* Rating al final */}
//                 <div className="mt-2">
//                     <StarRating rating={sala.media_votos} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SalaCard;

import { useNavigate } from 'react-router-dom';
import StarRating from '../StartRating.jsx';
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

    // Configurar el límite de géneros a 5 y agregar "..." si hay más
    const maxGeneros = 5;
    const generosArray = sala.generoNombres
        ? sala.generoNombres.split(',').map((g) => g.trim()) // Limpiar espacios
        : [];

    const mostrarGeneros =
        generosArray.length > maxGeneros
            ? `${generosArray.slice(0, maxGeneros).join(', ')}...`
            : generosArray.join(', ');

    return (
        <div
            className="card flex flex-col h-full p-4 bg-footercolor shadow-md rounded-lg cursor-pointer transition-transform hover:scale-105"
            onClick={handleClick}
        >
            {/* Imagen */}
            <img
                src={imageUrl}
                alt={sala.nombre}
                className={`w-full h-48 sm:h-48 rounded-lg mb-4 ${
                    imageUrl === DefaultProfile
                        ? 'object-contain'
                        : 'object-cover'
                }`}
            />

            {/* Contenido */}
            <div className="flex flex-col flex-grow">
                <h2 className="text-lg font-bold">{sala.nombre}</h2>

                {/* Mostrar los géneros con límite */}
                <p className="text-gray-400">{mostrarGeneros}</p>

                <p>
                    {sala.ciudad}, {sala.provincia}
                </p>

                {/* Espaciador para empujar el rating hacia abajo */}
                <div className="flex-grow"></div>

                {/* Rating al final */}
                <div className="mt-2">
                    <StarRating rating={sala.media_votos} />
                </div>
            </div>
        </div>
    );
};

export default SalaCard;
