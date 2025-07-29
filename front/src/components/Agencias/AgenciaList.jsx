import { Link } from 'react-router-dom';
import DefaultProfile from '/Horizontal_blanco.webp';

const AgenciaList = ({ agencias }) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    return (
        <div className="grupo-list">
            {agencias.map((agencia) => (
                <div key={agencia.id} className="card-generica">
                    <Link to={`/agencia/${agencia.id}`} className="w-full">
                        <img
                            src={
                                agencia.avatar
                                    ? `${VITE_API_URL_BASE}/uploads/${agencia.avatar}`
                                    : DefaultProfile
                            }
                            alt={`Imagen de ${agencia.nombre}`}
                            className={`grupo-card-image w-full h-48 sm:h-48 rounded-lg mb-4 ${
                                !agencia.avatar
                                    ? 'object-contain'
                                    : 'object-cover'
                            }`}
                        />
                    </Link>

                    {/* Contenedor del contenido alineado a la izquierda */}
                    <div className="flex flex-col flex-1">
                        <h2 className="text-lg font-bold mt-2">
                            {agencia.nombre}
                        </h2>
                        <p className="text-gray-400">{agencia.provincia}</p>
                        <p className="text-sm">{agencia.especNombres}</p>

                        {/* Botón siempre abajo alineado a la izquierda */}
                        <div className="mt-auto pb-2 flex justify-end">
                            <Link
                                to={`/agencia/${agencia.id}`}
                                className="mt-4 inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-all"
                            >
                                Más info
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AgenciaList;
