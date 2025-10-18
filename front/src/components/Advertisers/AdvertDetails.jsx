// import { useParams, useNavigate } from 'react-router-dom';
// import {
//     FaPencilAlt,
//     FaMapMarkerAlt,
//     FaTag,
//     FaPhoneAlt,
// } from 'react-icons/fa';
// import { IoChevronBack } from 'react-icons/io5';
// import { SlGlobe } from 'react-icons/sl';
// import { TfiEmail } from 'react-icons/tfi';
// import useAdvert from '../../hooks/useAdvert.jsx';
// import useAuth from '../../hooks/useAuth.jsx';
// import TextFormat from '../TextFormato.jsx';

// const AdvertDetails = () => {
//     const { VITE_API_URL_BASE } = import.meta.env;
//     const { idAdvert } = useParams();
//     const { advert } = useAdvert(idAdvert);
//     const { userLogged } = useAuth();
//     const navigate = useNavigate();

//     if (!advert) {
//         return (
//             <p className="text-center text-lg text-red-600 mt-10">
//                 No se pudo cargar el anuncio.
//             </p>
//         );
//     }

//     const {
//         title,
//         categoria,
//         image_url,
//         contact_email,
//         contact_phone,
//         link,
//         address,
//         city,
//         provincia,
//         advert_description,
//     } = advert[0];

//     // Función para crear URL de Google Maps 
//     const createGoogleMapsUrl = () => {
//         const fullAddress = [address, city, provincia].filter(Boolean).join(', ');
//         return fullAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}` : null;
//     };

//     // contacto
//     const ContactItem = ({ icon: Icon, href, children, title, isExternal = false }) => (
//         <div className="flex items-center gap-3 text-sm">
//             <Icon className="text-purpleOiches w-4 h-4 flex-shrink-0" />
//             {href ? (
//                 <a
//                     href={href}
//                     target={isExternal ? "_blank" : undefined}
//                     rel={isExternal ? "noopener noreferrer" : undefined}
//                     className="text-gray-800 hover:text-purpleOiches break-all"
//                     title={title}
//                 >
//                     {children}
//                 </a>
//             ) : (
//                 <span className="text-gray-800">{children}</span>
//             )}
//         </div>
//     );

//     const googleMapsUrl = createGoogleMapsUrl();
//     const fullAddress = [address, city, provincia && `(${provincia})`].filter(Boolean).join(', ');

//     return (
//         <main className="min-h-screen py-4 md:py-8">
//             <div className="max-w-6xl mx-auto px-4 space-y-6">
//                 {/* Breadcrumb  migas de pan*/}
//                 <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
//                     <span>Hub Musical</span>
//                     <span>/</span>
//                     <span className="text-gray-700 font-medium truncate max-w-48">
//                         {categoria}
//                     </span>
//                 </div>

//                 {/* Imagen Hero */}
//                 <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                     <div className="relative h-48 sm:h-64 md:h-96">
//                         <img
//                             src={`${VITE_API_URL_BASE}/uploads/${image_url}`}
//                             alt={`Imagen de ${title}`}
//                             className="w-full h-full object-cover"
//                             loading="lazy"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
//                             <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
//                                 <div className="flex items-center gap-2 mb-2">
//                                     <FaTag className="w-3 h-3 md:w-4 md:h-4" />
//                                     <span className="text-xs md:text-sm bg-purple-900 px-2 py-1 rounded-full">
//                                         {categoria}
//                                     </span>
//                                 </div>
//                                 <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
//                                     {title}
//                                 </h1>
//                             </div>
//                         </div>
//                     </div>
//                 </article>

//                 {/* Contenido Principal */}
//                 <article className="bg-white rounded-lg shadow-[19px_17px_21px_-14px_rgba(0,_0,_0,_0.1)] border border-gray-200">
//                     {/* Título y Descripción */}
//                     <header>
//                         <h2 className="px-4 md:ml-4 mt-4 md:mt-6 text-xl md:text-2xl font-bold text-gray-900">
//                             {title}
//                         </h2>
//                         {advert_description && (
//                             <section className="px-4 md:ml-4 mb-4 md:mb-2 md:mr-4 pb-4 border-b border-gray-200">
//                                 <TextFormat text={advert_description} />
//                             </section>
//                         )}
//                     </header>

//                     {/* Información de Contacto */}
//                     <footer className="p-4 md:p-6">
//                         {/* Movil vertical */}
//                         <div className="block md:hidden space-y-3">
//                             {contact_email && (
//                                 <ContactItem 
//                                     icon={TfiEmail} 
//                                     href={`mailto:${contact_email}`}
//                                 >
//                                     {contact_email}
//                                 </ContactItem>
//                             )}
//                             {contact_phone && (
//                                 <ContactItem 
//                                     icon={FaPhoneAlt} 
//                                     href={`tel:${contact_phone}`}
//                                 >
//                                     {contact_phone}
//                                 </ContactItem>
//                             )}
//                             {link && (
//                                 <ContactItem 
//                                     icon={SlGlobe} 
//                                     href={link} 
//                                     isExternal={true}
//                                 >
//                                     {link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
//                                 </ContactItem>
//                             )}
//                             <ContactItem 
//                                 icon={FaMapMarkerAlt} 
//                                 href={googleMapsUrl} 
//                                 isExternal={true}
//                                 title="Ver en Google Maps"
//                             >
//                                 {fullAddress}
//                             </ContactItem>
//                         </div>

//                         {/* VERSIÓN PC - todo seguido */}
//                         <div className="hidden md:flex md:flex-wrap items-center gap-2 text-sm text-gray-600">
//                             {contact_email && (
//                                 <>
//                                     <TfiEmail className="text-purpleOiches w-4 h-4" />
//                                     <a href={`mailto:${contact_email}`} className="text-gray-900 hover:text-gray-400">
//                                         {contact_email}
//                                     </a>
//                                     <span className="mx-1">•</span>
//                                 </>
//                             )}
//                             {contact_phone && (
//                                 <>
//                                     <FaPhoneAlt className="text-purpleOiches w-4 h-4" />
//                                     <span className="text-gray-800">{contact_phone}</span>
//                                     <span className="mx-1">•</span>
//                                 </>
//                             )}
//                             {link && (
//                                 <>
//                                     <SlGlobe className="text-purpleOiches w-4 h-4" />
//                                     <a
//                                         href={link}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-gray-800 hover:text-purpleOiches"
//                                     >
//                                         {link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
//                                     </a>
//                                     <span className="mx-1">•</span>
//                                 </>
//                             )}
//                             <FaMapMarkerAlt className="text-purpleOiches w-4 h-4" />
//                             {googleMapsUrl ? (
//                                 <a
//                                     href={googleMapsUrl}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-gray-800 hover:text-purpleOiches cursor-pointer"
//                                     title="Ver en Google Maps"
//                                 >
//                                     {fullAddress}
//                                 </a>
//                             ) : (
//                                 <span className="text-gray-800">{fullAddress}</span>
//                             )}
//                         </div>
//                     </footer>
//                 </article>

//                 {/* Boton volver a la pagina principal  Hub-musical */}
//                 <section className="flex justify-between mt-8 mb-16">
//                     <button
//                         onClick={() => navigate('/clasificados')}
//                         className="p-2 rounded-lg border border-purpleOiches hover:bg-purpleOiches text-purpleOiches hover:text-white flex items-center transition-colors"
//                     >
//                         <IoChevronBack className="text-xl" />
//                         Ver más anuncios
//                     </button>

//                     {userLogged?.roles === 'admin' && (
//                         <a
//                             href={`/edit-advert/${idAdvert}`}
//                             className="p-2 rounded-lg border border-purpleOiches hover:bg-purpleOiches hover:text-white flex items-center gap-2 transition-colors text-decoration-none"
//                         >
//                             <FaPencilAlt className="w-4 h-4" />
//                             Editar anuncio
//                         </a>
//                     )}
//                 </section>
//             </div>
//         </main>
//     );
// };

// export default AdvertDetails;

import { useParams, useNavigate } from 'react-router-dom';
import {
    FaPencilAlt,
    FaMapMarkerAlt,
    FaTag,
    FaPhoneAlt,
} from 'react-icons/fa';
import { IoChevronBack } from 'react-icons/io5';
import { SlGlobe } from 'react-icons/sl';
import { TfiEmail } from 'react-icons/tfi';
import useAdvert from '../../hooks/useAdvert.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import TextFormat from '../TextFormato.jsx';

const AdvertDetails = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { idAdvert } = useParams();
    const { advert } = useAdvert(idAdvert);
    const { userLogged } = useAuth();
    const navigate = useNavigate();

    // Validación
    if (!advert || !Array.isArray(advert) || advert.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-center text-lg text-red-600">
                    No se pudo cargar el anuncio.
                </p>
            </div>
        );
    }

    const {
        title,
        categoria,
        image_url,
        contact_email,
        contact_phone,
        link,
        address,
        city,
        provincia,
        advert_description,
    } = advert[0];

    // Funciones utilitarias
    const createGoogleMapsUrl = (address, city, provincia) => {
        const addressParts = [address, city, provincia].filter(Boolean);
        return addressParts.length > 0 
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressParts.join(', '))}` 
            : null;
    };

    const formatAddress = (address, city, provincia) => {
        const parts = [address, city, provincia && `(${provincia})`];
        return parts.filter(Boolean).join(', ');
    };

    const formatUrl = (url) => {
        return url?.replace(/^https?:\/\//, '').replace(/\/$/, '') || '';
    };

    // Datos calculados para maps
    const googleMapsUrl = createGoogleMapsUrl(address, city, provincia);
    const fullAddress = formatAddress(address, city, provincia);

    // Información de contacto 
    const contactInfo = [
        contact_email && {
            icon: TfiEmail,
            href: `mailto:${contact_email}`,
            text: contact_email,
            label: "Email"
        },
        contact_phone && {
            icon: FaPhoneAlt,
            href: `tel:${contact_phone}`,
            text: contact_phone,
            label: "Teléfono"
        },
        link && {
            icon: SlGlobe,
            href: link,
            text: formatUrl(link),
            label: "Sitio web",
            isExternal: true
        },
        {
            icon: FaMapMarkerAlt,
            href: googleMapsUrl,
            text: fullAddress,
            label: "Ubicación",
            isExternal: true
        }
    ].filter(Boolean);

    // Componente reutilizable para contacto
    const ContactItem = ({ icon: Icon, href, text, label, isExternal = false }) => (
        <div className="flex items-center gap-3 text-sm">
            <Icon className="text-purpleOiches w-4 h-4 flex-shrink-0" />
            {href ? (
                <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="text-gray-800 hover:text-purpleOiches break-all"
                    title={label}
                >
                    {text}
                </a>
            ) : (
                <span className="text-gray-800">{text}</span>
            )}
        </div>
    );

    // Info para movil
    const ContactInfoMobile = () => (
        <div className="block md:hidden space-y-3">
            {contactInfo.map((contact, index) => (
                <ContactItem key={index} {...contact} />
            ))}
        </div>
    );

    // Info para PC
    const ContactInfoDesktop = () => (
        <div className="hidden md:flex md:flex-wrap items-center gap-2 text-sm text-gray-600">
            {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center gap-2">
                    <contact.icon className="text-purpleOiches w-4 h-4" />
                    {contact.href ? (
                        <a
                            href={contact.href}
                            target={contact.isExternal ? "_blank" : undefined}
                            rel={contact.isExternal ? "noopener noreferrer" : undefined}
                            className="text-gray-800 hover:text-purpleOiches"
                            title={contact.label}
                        >
                            {contact.text}
                        </a>
                    ) : (
                        <span className="text-gray-800">{contact.text}</span>
                    )}
                    {index < contactInfo.length - 1 && <span className="mx-1">•</span>}
                </div>
            ))}
        </div>
    );

    return (
        <main className="min-h-screen py-4 md:py-8 lg:py-12">
            <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* Breadcrumb  migas de pan */}
                <nav className="hidden sm:flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
                    <ol className="flex items-center gap-2">
                        <li>Hub Musical</li>
                        <li aria-hidden="true">/</li>
                        <li className="text-gray-700 font-medium truncate max-w-48">
                            {categoria}
                        </li>
                    </ol>
                </nav>

                {/* Imagen Hero  */}
                <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="relative h-48 sm:h-64 md:h-96">
                        <img
                            src={`${VITE_API_URL_BASE}/uploads/${image_url}`}
                            alt={`Imagen de ${title}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                             e.target.src = '/Oiches-Conectamos-musicos-y-salas.jpg'; 
                           }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaTag className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
                                    <span className="text-xs md:text-sm bg-purple-900 px-2 py-1 rounded-full">
                                        {categoria}
                                    </span>
                                </div>
                                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
                                    {title}
                                </h1>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Contenido Principal */}
                <article className="bg-white rounded-lg shadow-[19px_17px_21px_-14px_rgba(0,_0,_0,_0.1)] border border-gray-200">
                    {/* Título y Descripción */}
                    <header>
                        <h2 className="px-4 md:ml-4 mt-4 md:mt-6 text-xl md:text-2xl font-bold text-gray-900">
                            {title}
                        </h2>
                        {advert_description && (
                            <section className="px-4 md:ml-4 mb-4 md:mb-2 md:mr-4 pb-4 border-b border-gray-200">
                                <TextFormat text={advert_description} />
                            </section>
                        )}
                    </header>

                    {/* Información de Contacto */}
                    <footer className="p-4 md:p-6">
                        <ContactInfoMobile />
                        <ContactInfoDesktop />
                    </footer>
                </article>

                {/* Navegación */}
                <section className="flex flex-col sm:flex-row justify-between gap-4 mt-8 mb-16">
                    <button
                        onClick={() => navigate('/clasificados')}
                        className="p-3 rounded-lg border border-purpleOiches hover:bg-purpleOiches text-purpleOiches hover:text-white flex items-center justify-center gap-2 transition-colors"
                        aria-label="Volver a la lista de clasificados"
                    >
                        <IoChevronBack className="text-xl" aria-hidden="true" />
                        Ver más anuncios
                    </button>

                    {userLogged?.roles === 'admin' && (
                        <a
                            href={`/edit-advert/${idAdvert}`}
                            className="p-3 rounded-lg border border-purpleOiches hover:bg-purpleOiches hover:text-white flex items-center justify-center gap-2 transition-colors no-underline"
                            aria-label="Editar este anuncio"
                        >
                            <FaPencilAlt className="w-4 h-4" aria-hidden="true" />
                            Editar anuncio
                        </a>
                    )}
                </section>
            </div>
        </main>
    );
};

export default AdvertDetails;