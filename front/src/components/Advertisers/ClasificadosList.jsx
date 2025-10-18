// import { Link } from 'react-router-dom';
// import { useCallback, useRef } from 'react';

// const ClasificadosList = ({ clasificados }) => {
//     const { VITE_API_URL_BASE } = import.meta.env;

//     // evita dobles clicks rápidos por accidente (5s por anuncio)
//     const lastClickRef = useRef({}); // { [classifiedId]: timestamp }
//     const MIN_INTERVAL_MS = 5000; // intervalo mínimo entre click contabilizados para el mismo anuncio

//     const incrementClick = useCallback(
//         (classifiedId) => {
//             if (!classifiedId) return;

//             const now = Date.now();
//             const last = lastClickRef.current[classifiedId] || 0;
//             if (now - last < MIN_INTERVAL_MS) return;
//             lastClickRef.current[classifiedId] = now;

//             const url = `${VITE_API_URL_BASE}/adverts/${encodeURIComponent(
//                 classifiedId
//             )}/click`;

//             const payload = {};

//             try {
//                 if (navigator.sendBeacon) {
//                     const blob = new Blob([JSON.stringify(payload)], {
//                         type: 'application/json',
//                     });
//                     navigator.sendBeacon(url, blob);
//                     return;
//                 }
//             } catch (err) {
//                 // fallthrough a fetch
//             }

//             fetch(url, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload),
//                 keepalive: true,
//                 // credentials: 'include', // descomenta si usas cookies
//             }).catch((e) => {
//                 console.warn('Error increment click', e);
//             });
//         },
//         [VITE_API_URL_BASE]
//     );

//     const handleClick = (classifiedId) => () => {
//         incrementClick(classifiedId);
//         // no preventDefault: dejamos que react-router navegue
//     };

//     return (
//         <div className="grupo-list">
//             {clasificados.map((clasificado) => (
//                 <div
//                     key={clasificado.id}
//                     className={`package-${clasificado.package_id} card-ads`}
//                 >
//                     <Link
//                         to={`/advert/${clasificado.id}`}
//                         className="w-full"
//                         onClick={handleClick(clasificado.id)}
//                     >
//                         <div
//                             style={{
//                                 backgroundImage: `url("${VITE_API_URL_BASE}/uploads/${encodeURIComponent(
//                                     clasificado.image_url
//                                 )}")`,
//                             }}
//                             className="bg-no-repeat bg-center bg-cover h-56 "
//                         >
//                             <h2 className="w-full uppercase font-semibold text-xl bg-footercolor p-3 mb-0 text-center absolute">
//                                 {clasificado.title}
//                             </h2>
//                         </div>
//                         <p className="text-gray-300 text-sm m-4">
//                             {clasificado.category}{' '}
//                             {clasificado.provincia && ' | '}{' '}
//                             {clasificado.city && `${clasificado.city}, `}
//                             {clasificado.provincia && clasificado.provincia}
//                         </p>

//                         <button className="w-full text-center bg-purple-600 text-white p-1 hover:bg-purple-700 transition-all">
//                             Más info
//                         </button>
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ClasificadosList;

import { Link } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import { FaMapMarkerAlt, FaTag } from 'react-icons/fa';

const ClasificadosList = ({ clasificados }) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    // evita dobles clicks rápidos por accidente (5s por anuncio)
    const lastClickRef = useRef({}); // { [classifiedId]: timestamp }
    const MIN_INTERVAL_MS = 5000; // intervalo mínimo entre click contabilizados para el mismo anuncio

    const incrementClick = useCallback(
        (classifiedId) => {
            if (!classifiedId) return;

            const now = Date.now();
            const last = lastClickRef.current[classifiedId] || 0;
            if (now - last < MIN_INTERVAL_MS) return;
            lastClickRef.current[classifiedId] = now;

            const url = `${VITE_API_URL_BASE}/adverts/${encodeURIComponent(
                classifiedId
            )}/click`;

            const payload = {};

            try {
                if (navigator.sendBeacon) {
                    const blob = new Blob([JSON.stringify(payload)], {
                        type: 'application/json',
                    });
                    navigator.sendBeacon(url, blob);
                    return;
                }
            } catch (err) {
                // fallthrough a fetch
            }

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true,
                // credentials: 'include', // descomenta si usas cookies
            }).catch((e) => {
                console.warn('Error increment click', e);
            });
        },
        [VITE_API_URL_BASE]
    );

    const handleClick = (classifiedId) => () => {
        incrementClick(classifiedId);
        // no preventDefault: dejamos que react-router navegue
    };

    // Función para truncar texto
    const truncateText = (text, maxLength = 200) => {
        if (!text) return '';
        return text.length > maxLength 
            ? text.slice(0, maxLength).trim() + '...' 
            : text;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {clasificados.map((clasificado) => (
                <div
                    key={clasificado.id}
                    className={`package-${clasificado.package_id} bg-grayLight rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group`}
                >
                    <Link
                        to={`/advert/${clasificado.id}`}
                        className="block h-full"
                        onClick={handleClick(clasificado.id)}
                    >
                        {/* Imagen */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={`${VITE_API_URL_BASE}/uploads/${encodeURIComponent(
                                    clasificado.image_url
                                )}`}
                                alt={clasificado.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                            
                            {/* Badge de categoría */}
                            <div className="absolute top-3 left-3">
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                                    <FaTag className="w-3 h-3 text-purpleOiches" />
                                    {clasificado.category}
                                </span>
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="p-4">
                            {/* Título */}
                            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-purpleOiches transition-colors">
                                {clasificado.title}
                            </h3>

                            {/* Descripción */}
                            {clasificado.description && (
                                <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-1">
                                    {truncateText(clasificado.description, 100)}
                                </p>
                            )}

                            {/* Ubicación */}
                            {(clasificado.city || clasificado.provincia) && (
                                <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                                    <FaMapMarkerAlt className="w-3 h-3 text-gray-400" />
                                    <span>
                                        {clasificado.city && `${clasificado.city}`}
                                        {clasificado.city && clasificado.provincia && ', '}
                                        {clasificado.provincia}
                                    </span>
                                </div>
                            )}

                            {/* Botón */}
                            <button className="w-full py-2.5 bg-purpleOiches border border-purpleOiches hover:bg-white/40 text-white hover:text-purpleOiches font-medium rounded-lg transition-all duration-200 text-sm">
                                Ver detalles
                            </button>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ClasificadosList;