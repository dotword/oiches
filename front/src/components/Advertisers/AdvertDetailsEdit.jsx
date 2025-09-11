import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoPricetagOutline, IoImageOutline } from 'react-icons/io5';
import { TfiWrite } from 'react-icons/tfi';
import { MdOutlinePlace, MdOutlineSaveAlt } from 'react-icons/md';
import { FaPhoneVolume } from 'react-icons/fa6';
import useAdvert from '../../hooks/useAdvert.jsx';
import AdvertDetailsEditService from '../../services/Advertisers/AdvertDetailsEditService.js';
import FetchAdvertCategoriesService from '../../services/Advertisers/FetchAdvertCategoriesService.js';
import FetchAdvertPackagesService from '../../services/Advertisers/FetchAdvertPackagesService.js';
import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import EditAdvertPhoto from './EditAdvertPhoto.jsx';
import DeleteAdvert from './DeleteAdvert.jsx';
import AdminPubishAdvert from './AdminPubishAdvert.jsx';
import ResetAdvertClicks from './ResetAdvertClicks.jsx';

const AdvertDetailsEdit = () => {
    const { userLogged, token } = useContext(AuthContext);
    const { idAdvert } = useParams();
    const navigate = useNavigate();
    const advert = useAdvert(idAdvert);

    const advertData = advert.advert[0];

    const [advertDetails, setAdvertDetails] = useState({
        category_id: '',
        package_id: '',
        address: '',
        city: '',
        provincia_id: '',
        title: '',
        description: '',
        link: '',
        contact_email: '',
        contact_phone: '',
        image_url: '',
        status: '',
        expiresAt: '',
        publishedAt: '',
    });

    const [categories, setCategories] = useState([]);
    const [packages, setPackages] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!advertData) return;

        setAdvertDetails({
            package_id: advertData.package_id || '',
            category_id: advertData.category_id || '',
            address: advertData.address || '',
            city: advertData.city || '',
            provincia_id: advertData.provincia_id || '',
            title: advertData.title || '',
            description: advertData.advert_description || '',
            link: advertData.link || '',
            contact_email: advertData.contact_email || '',
            contact_phone: advertData.contact_phone || '',
            status: advertData.status || '',
            expiresAt: advertData.expiresAt || '',
            publishedAt: advertData.publishedAt || '',
        });
    }, [advertData]);

    useEffect(() => {
        FetchAdvertCategoriesService(setCategories);
        FetchAdvertPackagesService(setPackages);
        FetchProvinciasService(setProvinces);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        Object.entries(advertDetails).forEach(([k, v]) =>
            formData.append(k, v)
        );

        try {
            await AdvertDetailsEditService({ token, idAdvert, formData });
            toast.success(
                'Vamos a revisar tu anuncio, muy pronto nos pondremos en contacto contigo.'
            );
            setTimeout(() => {
                navigate(`/users/account/${userLogged.id}`);
            }, 3000);
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!userLogged) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-xl font-medium text-gray-800">
                        No puedes acceder a esta página
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="w-full mx-auto px-4 py-4 bg-white">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <nav className="text-sm text-gray-600">
                        <Link
                            to="/"
                            className="hover:text-purpleOiches transition-colors"
                        >
                            Inicio
                        </Link>
                        <span className="mx-2">›</span>
                        <Link
                            to={`/users/account/${userLogged.id}`}
                            className="hover:text-purpleOiches transition-colors"
                        >
                            Mi cuenta
                        </Link>
                        <span className="mx-2">›</span>
                        <span className="text-gray-800 font-medium">
                            Editar anuncio
                        </span>
                    </nav>
                    <button
                        onClick={() =>
                            navigate(`/users/account/${userLogged.id}`)
                        }
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-purpleOiches 
                                 text-purpleOiches font-medium rounded-lg hover:bg-purpleOiches hover:text-white
                                 transition-all duration-200 text-sm w-fit"
                    >
                        ← Volver a mis anuncios
                    </button>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="w-full mx-auto px-4 pb-6 sm:pb-12 bg-white">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header de la tarjeta */}
                    <div className="px-6 py-5 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purpleOiches rounded-xl flex items-center justify-center">
                                <TfiWrite className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Editar Anuncio
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Modifica la información de tu anuncio
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contenido del formulario */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Imagen del Anuncio */}
                            <div className="space-y-6">
                                <h3 className="flex items-center gap-3 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                    <IoImageOutline className="w-5 h-5 text-purpleOiches" />
                                    IMAGEN DEL ANUNCIO
                                </h3>

                                <div className="space-y-4">
                                    <EditAdvertPhoto
                                        advertData={advertData}
                                        token={token}
                                    />
                                </div>
                            </div>

                            {/* Información del Anuncio */}
                            <div className="space-y-6">
                                <h3 className="flex items-center gap-3 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                    <IoPricetagOutline className="w-5 h-5 text-purpleOiches" />
                                    INFORMACIÓN DEL ANUNCIO
                                </h3>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="package_id"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Tipo de anuncio:*
                                        </label>
                                        <select
                                            id="package_id"
                                            name="package_id"
                                            required
                                            value={advertDetails.package_id}
                                            onChange={(e) =>
                                                setAdvertDetails({
                                                    ...advertDetails,
                                                    package_id: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                     focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                     hover:border-gray-400 transition-all duration-200
                                                     bg-white shadow-sm"
                                        >
                                            <option value="">Selecciona</option>
                                            {packages.map((pack) => (
                                                <option
                                                    key={pack.id}
                                                    value={pack.id}
                                                >
                                                    {pack.package}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="category_id"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Categoría:*
                                        </label>
                                        <select
                                            id="category_id"
                                            name="category_id"
                                            required
                                            value={advertDetails.category_id}
                                            onChange={(e) =>
                                                setAdvertDetails({
                                                    ...advertDetails,
                                                    category_id: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                     focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                     hover:border-gray-400 transition-all duration-200
                                                     bg-white shadow-sm"
                                        >
                                            <option value="">Selecciona</option>
                                            {categories.map((categorie) => (
                                                <option
                                                    key={categorie.id}
                                                    value={categorie.id}
                                                >
                                                    {categorie.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Título:*
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Título del anuncio"
                                        required
                                        value={advertDetails.title}
                                        onChange={(e) =>
                                            setAdvertDetails({
                                                ...advertDetails,
                                                title: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                 focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                 hover:border-gray-400 transition-all duration-200
                                                 bg-white shadow-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Descripción:
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        placeholder="Descripción de tu anuncio. Máximo 2000 caracteres."
                                        rows="4"
                                        value={advertDetails.description}
                                        onChange={(e) =>
                                            setAdvertDetails({
                                                ...advertDetails,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                 focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                 hover:border-gray-400 transition-all duration-200
                                                 bg-white shadow-sm resize-none"
                                    />
                                </div>
                            </div>

                            {/* Dirección Fiscal */}
                            <div className="space-y-6">
                                <h3 className="flex items-center gap-3 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                    <MdOutlinePlace className="w-5 h-5 text-purpleOiches" />
                                    DIRECCIÓN FISCAL
                                </h3>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Dirección:*
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Dirección de la empresa"
                                        value={advertDetails.address}
                                        onChange={(e) =>
                                            setAdvertDetails({
                                                ...advertDetails,
                                                address: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                 focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                 hover:border-gray-400 transition-all duration-200
                                                 bg-white shadow-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Ciudad:*
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            placeholder="Ciudad"
                                            value={advertDetails.city}
                                            onChange={(e) =>
                                                setAdvertDetails({
                                                    ...advertDetails,
                                                    city: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                     focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                     hover:border-gray-400 transition-all duration-200
                                                     bg-white shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="provincia_id"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Provincia:*
                                        </label>
                                        <select
                                            id="provincia_id"
                                            name="provincia_id"
                                            value={advertDetails.provincia_id}
                                            required
                                            onChange={(e) =>
                                                setAdvertDetails({
                                                    ...advertDetails,
                                                    provincia_id:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                     focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                     hover:border-gray-400 transition-all duration-200
                                                     bg-white shadow-sm"
                                        >
                                            <option value="">Selecciona</option>
                                            {provinces.map((province) => (
                                                <option
                                                    key={province.id}
                                                    value={province.id}
                                                >
                                                    {province.provincia}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Información de Contacto */}
                            <div className="space-y-6">
                                <h3 className="flex items-center gap-3 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                    <FaPhoneVolume className="w-4 h-4 text-purpleOiches" />
                                    INFORMACIÓN DE CONTACTO
                                </h3>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="contact_email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email de contacto:
                                    </label>
                                    <input
                                        type="email"
                                        name="contact_email"
                                        id="contact_email"
                                        placeholder="Email de contacto"
                                        value={advertDetails.contact_email}
                                        onChange={(e) =>
                                            setAdvertDetails({
                                                ...advertDetails,
                                                contact_email: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                 focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                 hover:border-gray-400 transition-all duration-200
                                                 bg-white shadow-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="link"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Web o enlace a tus RRSS:
                                        </label>
                                        <input
                                            type="text"
                                            name="link"
                                            id="link"
                                            placeholder="https://www.tuenlace.com"
                                            value={advertDetails.link}
                                            onChange={(e) =>
                                                setAdvertDetails({
                                                    ...advertDetails,
                                                    link: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                     focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                     hover:border-gray-400 transition-all duration-200
                                                     bg-white shadow-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="contact_phone"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Teléfono:
                                        </label>
                                        <input
                                            type="tel"
                                            name="contact_phone"
                                            id="contact_phone"
                                            placeholder="Teléfono de contacto"
                                            value={advertDetails.contact_phone}
                                            onChange={(e) =>
                                                setAdvertDetails({
                                                    ...advertDetails,
                                                    contact_phone:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                     focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                     hover:border-gray-400 transition-all duration-200
                                                     bg-white shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5 text-red-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                            />
                                        </svg>
                                        <p className="text-red-700 text-sm font-medium">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Botón de Guardar */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full ${
                                        isLoading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-purpleOiches hover:bg-purple-700'
                                    } text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 
                                                shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg
                                                className="w-5 h-5 animate-spin"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                />
                                            </svg>
                                            Actualizando...
                                        </>
                                    ) : (
                                        <>
                                            <MdOutlineSaveAlt className="w-5 h-5" />
                                            Guardar datos
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Nota de privacidad */}
                            <div className="text-center">
                                <p className="text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-1">
                                    <span className="flex items-center gap-1">
                                        <svg
                                            className="w-3 h-3 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                        Datos protegidos según nuestra
                                    </span>
                                    <Link
                                        to="/politica-privacidad"
                                        className="text-purpleOiches hover:underline"
                                    >
                                        política de privacidad
                                    </Link>
                                </p>
                            </div>
                        </form>

                        {/* DeleteAdvert integrado al final del formulario */}
                        {advertData?.status !== 'published' && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <DeleteAdvert
                                    userLogged={userLogged}
                                    token={token}
                                    id={idAdvert}
                                    status={advertData?.status}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Toastify />
        </div>
    );
};

export default AdvertDetailsEdit;
