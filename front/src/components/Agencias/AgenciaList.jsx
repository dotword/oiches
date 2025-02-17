import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AgenciaList = ({ agencias }) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    return (
        <div className="grupo-list">
            {agencias.map((agencia) => (
                <div className="card" key={`{${agencia.id}}`}>
                    <Link to={`/agencia/${agencia.id}`} className="relative">
                        <img
                            src={`${VITE_API_URL_BASE}/uploads/${agencia.avatar}`}
                            alt={`Imagen de ${agencia.nombre}`}
                            className="grupo-card-image"
                        />
                    </Link>

                    <div className="px-4 pb-5">
                        <h2 className="text-lg font-bold">{agencia.nombre}</h2>
                        <p className="text-gray-400">{agencia.provincia}</p>

                        <Link
                            to={`/agencia/${agencia.id}`}
                            className="button-large"
                        >
                            Ver agencia <FaArrowRight />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AgenciaList;
