import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import CrearReservaForm from '../../components/Reservas/CrearReservaForm.jsx';
import Header from '../../components/Header.jsx';
import useSala from '../../hooks/useSala.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import { toast } from 'react-toastify';
import Toastify from '../../components/Toastify.jsx';
import noImage from '../../assets/noimage.png';
import Footer from '../../components/Footer.jsx';
import Seo from '../../components/SEO/Seo.jsx';
import MapShow from '../../components/MapShow.jsx';
import { FiExternalLink } from 'react-icons/fi';

export const CrearReservaPage = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { idSala } = useParams();
    const { entry } = useSala(idSala);
    const { currentUser, userLogged } = useAuth();
    const [formattedAddress, setFormattedAddress] = useState('');

    if (!currentUser) {
        toast.error(
            'Necesitas loguearte como músico para acceder a esta página'
        );
    }

    if (!entry) return <p>Cargando...</p>;

    const handleAddressChange = (newAddress) => {
        setFormattedAddress(newAddress);
    };

    const imageUrl =
        entry.fotos && entry.fotos.length > 0
            ? // Buscar la foto principal con main === 1
              `${VITE_API_URL_BASE}/uploads/${
                  entry.fotos.find((foto) => foto.main === 1)?.name ||
                  entry.fotos[0].name
              }`
            : entry.usuarioAvatar
            ? `${VITE_API_URL_BASE}/uploads/${entry.usuarioAvatar}`
            : noImage;

    return (
        <>
            {/* SEO dinámico para la página de reservas */}
            <Seo
                title={`Reserva en ${entry.nombre} - Oiches`}
                description={`Reserva un espacio en la sala ${entry.nombre}, ubicada en ${entry.direccion}. Conoce sus horarios y géneros musicales.`}
                url={`https://oiches.com/crear-reserva/${idSala}`}
                image={imageUrl}
                noIndex={true}
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'EventReservation',
                    reservationFor: {
                        '@type': 'EventVenue',
                        name: entry.nombre,
                        address: {
                            '@type': 'PostalAddress',
                            streetAddress: entry.direccion,
                            addressLocality: entry.ciudad || '',
                            addressRegion: entry.provincia || '',
                            postalCode: entry.codigoPostal || '',
                            addressCountry: 'ES',
                        },
                    },
                }}
            />
            <Header txt={`Quiero tocar en ${entry.nombre}`} />
            <main className="p-4 mt-6 flex flex-col mx-auto shadow-xl w-11/12 md:max-w-1200">
                <section className="mb-6 md:flex md:gap-24 md:justify-center md:items-center md:mb-14">
                    <img
                        src={imageUrl}
                        alt={entry.nombre}
                        className="w-52 h-52 rounded-full object-cover shadow-lg mx-auto md:mx-4"
                    />

                    <div className="flex flex-col my-6 md:mt-0">
                        <Link to={`/sala/${entry.id}`} target="_blank">
                            <h2 className="font-semibold text-lg flex gap-4 items-center">
                                {entry.nombre} <FiExternalLink />
                            </h2>
                        </Link>

                        {entry.direccion && (
                            <>
                                <p className="text-black">{formattedAddress}</p>

                                <MapShow
                                    direccion={entry.direccion}
                                    onAddressChange={handleAddressChange}
                                    hideMap="hideMap"
                                />
                            </>
                        )}
                    </div>
                </section>
                <section className="border-t border-gray-300 pt-4 mb-14 mx-auto md:py-10">
                    <h2 className="text-2xl font-semibold mb-3 text-center">
                        Contacta con {entry.nombre}
                    </h2>
                    <p className="text-center">
                        Rellena el siguiente formulario y {entry.nombre}{' '}
                        recibirá un email con tu solicitud.
                    </p>

                    <CrearReservaForm
                        calendarActive={entry.calendarActive}
                        idUserOwner={currentUser.id}
                        roles={userLogged.roles}
                    />
                </section>
            </main>
            <Footer />
            <Toastify />
        </>
    );
};
