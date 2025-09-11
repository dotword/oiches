import { Link } from 'react-router-dom';
import { useCallback, useRef } from 'react';

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

    return (
        <div className="grupo-list">
            {clasificados.map((clasificado) => (
                <div
                    key={clasificado.id}
                    className={`package-${clasificado.package_id} card-ads`}
                >
                    <Link
                        to={`/advert/${clasificado.id}`}
                        className="w-full"
                        onClick={handleClick(clasificado.id)}
                    >
                        <div
                            style={{
                                backgroundImage: `url("${VITE_API_URL_BASE}/uploads/${encodeURIComponent(
                                    clasificado.image_url
                                )}")`,
                            }}
                            className="bg-no-repeat bg-center bg-cover h-56 "
                        >
                            <h2 className="w-full uppercase font-semibold text-xl bg-footercolor p-3 mb-0 text-center absolute">
                                {clasificado.title}
                            </h2>
                        </div>
                        <p className="text-gray-300 text-sm m-4">
                            {clasificado.category}{' '}
                            {clasificado.provincia && ' | '}{' '}
                            {clasificado.city && `${clasificado.city}, `}
                            {clasificado.provincia && clasificado.provincia}
                        </p>

                        <button className="w-full text-center bg-purple-600 text-white p-1 hover:bg-purple-700 transition-all">
                            Más info
                        </button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ClasificadosList;
