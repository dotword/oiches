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
            className="sala-card bg-gray-800 text-white p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={handleClick}
        >
            <img
                src={imageUrl}
                alt={sala.nombre}
                className="sala-card-image w-full h-96 object-cover rounded-lg"
            />
            <h2 className="sala-card-title text-xl font-bold mt-4">
                {sala.nombre}
            </h2>
            <p className="sala-card-genre text-gray-400">
                <span className="sub_title_ficha">Género:</span> {sala.Genero}
            </p>
            <p className="sala-card-province text-gray-400">
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
