import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DefaultProfile from '/Horizontal_blanco.webp';

const AgenciaList = ({ agencias }) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    return (
        <div className="grupo-list">
            {agencias.map((agencia) => (
                <div className="card" key={`{${agencia.id}}`}>
                    <Link to={`/agencia/${agencia.id}`} className="relative">
                        <img
                            src={
                                agencia.avatar
                                    ? `${VITE_API_URL_BASE}/uploads/${agencia.avatar}`
                                    : DefaultProfile
                            }
                            alt={`Imagen de ${agencia.nombre}`}
                            className={`grupo-card-image ${
                                !agencia.avatar
                                    ? 'object-contain'
                                    : 'object-cover'
                            }`}
                        />
                    </Link>

                    <div className="px-4 pb-5">
                        <h2 className="text-lg font-bold">{agencia.nombre}</h2>
                        <p className="text-gray-400">{agencia.provincia}</p>
                        <Link
                            to={`/agencia/${agencia.id}`}
                            className="mt-3 inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-all"
                        >
                            Ver Agencia <FaArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AgenciaList;
