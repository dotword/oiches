import { useParams } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import useAdvert from '../../hooks/useAdvert.jsx';
import useAuth from '../../hooks/useAuth.jsx';

const AdvertDetails = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { idAdvert } = useParams();
    const { advert } = useAdvert(idAdvert);
    const { userLogged } = useAuth();

    if (!advert) {
        return (
            <p className="text-center text-lg text-red-600 mt-10">
                No se pudo cargar el anuncio.
            </p>
        );
    }

    return (
        <>
            <main className="px-4 pb-16 mt-6 flex flex-col gap-6 mx-auto shadow-xl w-11/12 md:max-w-1200">
                <div className="grid-details">
                    <div className="py-4 flex flex-col  justify-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6 md:text-4xl">
                            {advert[0].title && advert[0].title}
                        </h1>

                        <p>{advert[0].categoria}</p>

                        <p>
                            {advert[0].address && advert[0].address}
                            {advert[0].city && `, ${advert[0].city}`}
                            {advert[0].provincia && ` (${advert[0].provincia})`}
                        </p>
                        {advert[0].advert_description && (
                            <div>{advert[0].advert_description}</div>
                        )}

                        <div>
                            {advert[0].contact_email && (
                                <a
                                    href={`mailto:${advert[0].contact_email}`}
                                    className="underline"
                                >
                                    {advert[0].contact_email}
                                </a>
                            )}

                            {advert[0].contact_phone && (
                                <p>{advert[0].contact_phone}</p>
                            )}

                            {advert[0].link && (
                                <a
                                    href={advert[0].link}
                                    className="underline"
                                    target="_blank"
                                >
                                    Enlace
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="relative w-full rounded-xl overflow-hidden  cursor-pointer mt-8">
                        <img
                            src={`${VITE_API_URL_BASE}/uploads/${advert[0].image_url}`}
                            alt={`Imagen de ${advert[0].title}`}
                            className="w-full object-cover rounded-xl shadow-xl bg-gray-900 "
                            loading="lazy"
                        />
                    </div>
                </div>

                {userLogged && userLogged.roles === 'admin' && (
                    <div className="text-right mt-6">
                        <a
                            href={`/edit-advert/${idAdvert}`}
                            className="inline-flex items-center py-2 px-6 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700"
                        >
                            <FaPencilAlt
                                className="mr-2"
                                aria-label="Editar anuncio"
                            />
                            Editar anuncio
                        </a>
                    </div>
                )}
            </main>
        </>
    );
};

export default AdvertDetails;
