import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import useConcierto from '../../hooks/useConcierto.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import Seo from '../SEO/Seo.jsx';
import MapShow from '../MapShow.jsx';

const ConciertoDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { conciertoId } = useParams();
    const { concierto } = useConcierto(conciertoId);
    const { userLogged } = useAuth();
    const [formattedAddress, setFormattedAddress] = useState('');

    const {
        artista,
        sala,
        ciudad,
        provincia,
        direccion,
        fecha,
        hora,
        precio,
        genero,
        link,
        poster,
        biografiaGrupo,
        grupo_id,
        infoSala,
        sala_id,
    } = concierto || {};

    const handleAddressChange = (newAddress) => {
        setFormattedAddress(newAddress);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const formatHour = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`; // Devuelve solo horas y minutos
    };
    const formatPrice = (priceString) => {
        return priceString.replace('.', ','); // Reemplaza el punto por coma
    };
    const limitText = (text, limit) => {
        if (text.length > limit) {
            return text.slice(0, limit) + '...'; // Agrega "..." si se trunca
        }
        return text;
    };

    return (
        <>
            <Seo
                title={`Concierto de ${artista} en ${sala}`}
                description={`Concierto de ${artista} en ${sala} (${ciudad}) el ${formatDate(
                    fecha
                )}.`}
                keywords={`conciertos, ${sala}, ${artista}, ${provincia}, ${ciudad}, música en vivo, eventos`}
                url={`https://oiches.com/concierto/${conciertoId}`}
                image={`${VITE_API_URL_BASE}/uploads/${poster}`}
            />

            <main className="p-4 mt-6 flex flex-col gap-6 mx-auto shadow-xl w-11/12 md:max-w-1200 md:px-24">
                <section className="mb-6">
                    <h1>
                        Concierto de {artista} en {sala}
                    </h1>
                    {poster && (
                        <img
                            className="shadow-lg mx-auto"
                            src={`${VITE_API_URL_BASE}/uploads/${poster}`}
                            alt="Imagen del concierto"
                        />
                    )}

                    <div>
                        Fecha: {formatDate(fecha)} a las{' '}
                        {hora && formatHour(hora)}
                    </div>
                    {precio && <div>Precio: {formatPrice(precio)} €</div>}
                    {link && (
                        <div>
                            <p>
                                <a
                                    href={link}
                                    target="_blank"
                                    className="underline"
                                >
                                    Más información
                                </a>
                            </p>
                        </div>
                    )}
                </section>
                <section>
                    <p>Info de {artista}:</p>
                    {genero && (
                        <ul className="flex flex-wrap">
                            {genero.map((gen, index) => (
                                <li key={gen.generoId} className="mb-0">
                                    {gen.generoName}
                                    {index < genero.length - 1 && (
                                        <span>,&nbsp;</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                    {biografiaGrupo && (
                        <div>{limitText(biografiaGrupo, 1000)}</div>
                    )}

                    <a
                        href={`/grupo/${grupo_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver más
                    </a>
                </section>

                <section>
                    <p>Info de {sala}:</p>
                    {infoSala && <div>{limitText(infoSala, 1000)}</div>}

                    <div className="flex flex-wrap gap-6">
                        <p className="text-black">
                            Dirección: {formattedAddress || direccion}
                        </p>
                        {direccion && (
                            <MapShow
                                direccion={direccion}
                                onAddressChange={handleAddressChange}
                            />
                        )}
                    </div>
                    <a
                        href={`/sala/${sala_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver más
                    </a>
                </section>

                {userLogged && userLogged.roles === 'admin' && (
                    <a
                        href={`/concierto/${conciertoId}/edit`}
                        className="flex justify-end gap-4 mb-16"
                    >
                        {' '}
                        <FaPencilAlt className=" text-2xl" />
                        Editar
                    </a>
                )}
            </main>
        </>
    );
};

export default ConciertoDetail;
