import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StartRating.jsx';

const SalaCard = ({ sala }) => {
    const navigate = useNavigate();
    const imageUrl = `${import.meta.env.VITE_API_URL_BASE}/uploads/${
        sala.primera_foto
    }`;

    const handleClick = () => {
        navigate(`/sala/${sala.id}`);
    };

    return (
        <div
            className="card bg-gray-800 text-white p-4 rounded-lg shadow-lg cursor-pointer w-full sm:w-72 h-auto sm:h-96 mx-auto"
            onClick={handleClick}
        >
            <img
                src={imageUrl}
                alt={sala.nombre}
                className="card-image w-full h-48 sm:h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="card-title text-lg font-bold mt-2">{sala.nombre}</h2>
            <p className="card-genre text-gray-400">
                <span className="sub_title_ficha">Género:</span> {sala.Genero}
            </p>
            <p className="card-province text-gray-400">
                <span className="sub_title_ficha">Provincia:</span>{' '}
                {sala.Provincia}
            </p>
            <div className="mt-2">
                <StarRating rating={sala.media_votos} />
            </div>
        </div>
    );
};

export default SalaCard;
