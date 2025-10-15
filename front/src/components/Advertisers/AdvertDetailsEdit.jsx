import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoPricetagOutline, IoImageOutline } from 'react-icons/io5';
import { TfiWrite } from 'react-icons/tfi';
import { MdOutlinePlace, MdOutlineSaveAlt } from 'react-icons/md';
import { FaPhoneVolume } from 'react-icons/fa6';
import { CiLock } from 'react-icons/ci';
import useAdvert from '../../hooks/useAdvert.jsx';
import AdvertDetailsEditService from '../../services/Advertisers/AdvertDetailsEditService.js';
import FetchAdvertCategoriesService from '../../services/Advertisers/FetchAdvertCategoriesService.js';
import FetchAdvertPackagesService from '../../services/Advertisers/FetchAdvertPackagesService.js';
import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import EditAdvertPhoto from './EditAdvertPhoto.jsx';
import DeleteAdvert from './DeleteAdvert.jsx';
import AdminPubishAdvert from './AdminPubishAdvert.jsx';
import ResetAdvertClicks from './ResetAdvertClicks.jsx';
import BreadcrumbAdvert from './BreadcrumbAdvert.jsx';
import PackagesDetails from './PackagesDetails.jsx';

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
    });

    const [categories, setCategories] = useState([]);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [packages, setPackages] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const today = new Date();

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

    useEffect(() => {
        if (!advertDetails.category_id || categories.length === 0) return;
        const selected = categories.find(
            (c) => String(c.id) === String(advertDetails.category_id)
        );
        setSelectedDescription(selected ? selected.description : '');
    }, [advertDetails.category_id, categories]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const formData = new FormData();

            // Campos que el backend espera como número
            const numericFields = ['provincia_id', 'package_id', 'category_id'];

            Object.entries(advertDetails).forEach(([k, v]) => {
                // saltar valores vacíos/null/undefined
                if (v === '' || v === null || v === undefined) return;

                if (numericFields.includes(k)) {
                    const num = Number(v);
                    // solo append si la conversión a número tiene sentido
                    if (!Number.isNaN(num)) {
                        formData.append(k, num);
                    }
                } else {
                    formData.append(k, v);
                }
            });

            await AdvertDetailsEditService({
                token,
                idAdvert,
                formData,
                advertDetails,
            });

            toast.success(
                'Vamos a revisar tu anuncio, muy pronto nos pondremos en contacto contigo.'
            );

            setTimeout(() => {
                navigate(`/users/account/${userLogged.id}`);
            }, 3000);
        } catch (err) {
            setError(err.message || 'Error al actualizar el anuncio');
            toast.error(err.message || 'Error al actualizar el anuncio');
        } finally {
            setIsLoading(false);
        }
    };

    const title =
        new Date(advertDetails.expiresAt) < today
            ? 'Renovar anuncio'
            : 'Editar anuncio';
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
            <BreadcrumbAdvert userLogged={userLogged} title={title} />
            {/* Contenido principal */}
            <div className="w-full mx-auto px-4 pb-6 sm:pb-12 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header de la tarjeta */}
                <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
                    <div className="w-12 h-12 bg-purpleOiches rounded-xl flex items-center justify-center">
                        <TfiWrite className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                </div>
                {/* ADMIN */}
                {userLogged && userLogged.roles === 'admin' && (
                    <div className="mx-auto mt-6 w-11/12">
                        <AdminPubishAdvert
                            idAdvert={idAdvert}
                            newExpiresAt={advertDetails.expiresAt}
                            publishedAt={advertDetails.publishedAt}
                            status={advertDetails.status}
                            userLogged={userLogged}
                            token={token}
                        />
                        <ResetAdvertClicks
                            clicks={advertData.clicks}
                            token={token}
                            idAdvert={idAdvert}
                        />
                    </div>
                )}
                <PackagesDetails />
                {/* Contenido del formulario */}

                <form onSubmit={handleSubmit} className="space-y-8 px-6">
                    {/* Información del Anuncio */}
                    <div className="space-y-6">
                        <h3 className="flex items-center gap-3 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                            <IoPricetagOutline className="w-5 h-5 text-purpleOiches" />
                            INFORMACIÓN DEL ANUNCIO
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <label
                                htmlFor="package_id"
                                className="block text-sm font-medium text-gray-700 space-y-2"
                            >
                                Tipo de anuncio:*
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
                                    className="px-3 py-2 form-input"
                                >
                                    <option value="">Selecciona</option>
                                    {packages.map((pack) => (
                                        <option key={pack.id} value={pack.id}>
                                            {pack.package}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label
                                htmlFor="category_id"
                                className="block text-sm font-medium text-gray-700 space-y-2"
                            >
                                Categoría:*
                                <select
                                    id="category_id"
                                    name="category_id"
                                    required
                                    value={advertDetails.category_id}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const selected = categories.find(
                                            (c) => String(c.id) === String(val)
                                        );
                                        setAdvertDetails({
                                            ...advertDetails,
                                            category_id: val,
                                        });
                                        setSelectedDescription(
                                            selected ? selected.description : ''
                                        );
                                    }}
                                    className="px-3 py-2 form-input"
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
                            {selectedDescription && (
                                <p className="text-sm text-white bg-gray-800 p-3 rounded-lg border-l-4 border-indigo-500">
                                    {selectedDescription}
                                </p>
                            )}
                            </label>
                            
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 space-y-2"
                            >
                                Título:*
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
                                    className="px-3 py-2 form-input"
                                />
                            </label>
                        </div>

                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 space-y-2"
                        >
                            Descripción:
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
                                className="px-3 py-2 form-textarea"
                            />
                        </label>
                    </div>

                    {/* Dirección Fiscal */}
                    <div className="space-y-6">
                        <h3 className="flex items-center gap-3 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                            <MdOutlinePlace className="w-5 h-5 text-purpleOiches" />
                            DIRECCIÓN
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700 space-y-2"
                            >
                                Dirección:
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
                                    className="px-3 py-2 form-input"
                                />
                            </label>

                            <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700 space-y-2"
                            >
                                Ciudad:
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
                                    className="px-3 py-2 form-input"
                                />
                            </label>

                            <label
                                htmlFor="provincia_id"
                                className="block text-sm font-medium text-gray-700 space-y-2"
                            >
                                Provincia:
                                <select
                                    id="provincia_id"
                                    name="provincia_id"
                                    value={advertDetails.provincia_id}
                                    onChange={(e) =>
                                        setAdvertDetails({
                                            ...advertDetails,
                                            provincia_id: e.target.value,
                                        })
                                    }
                                    className="px-3 py-2 form-input"
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
                            </label>
                        </div>
                    </div>

                    {/* Información de Contacto */}
                    <div className="space-y-6">
                        <h3 className="flex items-center gap-3 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                            <FaPhoneVolume className="w-4 h-4 text-purpleOiches" />
                            INFORMACIÓN DE CONTACTO
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <label
                                htmlFor="link"
                                className="block text-sm font-medium text-gray-700 space-y-2"
                            >
                                Web o enlace a tus RRSS:
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
                                    className="px-3 py-2 form-input"
                                />
                            </label>

                            <label
                                htmlFor="contact_email"
                                className="block text-sm font-medium text-gray-700 space-y-2"
                            >
                                Email de contacto:
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
                                    className="px-3 py-2 form-input"
                                />
                            </label>

                            <label
                                htmlFor="contact_phone"
                                className="block text-sm font-medium text-gray-700 space-y-2"
                            >
                                Teléfono:
                                <input
                                    type="tel"
                                    name="contact_phone"
                                    id="contact_phone"
                                    placeholder="Teléfono de contacto"
                                    value={advertDetails.contact_phone}
                                    onChange={(e) =>
                                        setAdvertDetails({
                                            ...advertDetails,
                                            contact_phone: e.target.value,
                                        })
                                    }
                                    className="px-3 py-2 form-input"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                            <p className="text-red-700 text-sm font-medium">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Botón de Guardar */}
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
                            'Actualizando...'
                        ) : (
                            <>
                                <MdOutlineSaveAlt className="w-5 h-5" />
                                {advertDetails &&
                                new Date(advertDetails.expiresAt) < today
                                    ? 'Renueva tu anuncio'
                                    : 'Editar anuncio'}
                            </>
                        )}
                    </button>

                    {/* Nota de privacidad */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-1">
                            <span className="flex items-center gap-1">
                                <CiLock className="text-base" />
                                Datos protegidos según nuestra
                            </span>
                            <Link
                                to="/politica-privacidad"
                                className="text-purpleOiches hover:underline"
                                target="_blank"
                            >
                                política de privacidad
                            </Link>
                        </p>
                    </div>
                </form>
                {/* Imagen del Anuncio */}
                <div className="space-y-6 p-6">
                    <h3 className="flex items-center gap-3 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        <IoImageOutline className="w-5 h-5 text-purpleOiches" />
                        CAMBIAR IMAGEN
                    </h3>

                    <EditAdvertPhoto advertData={advertData} token={token} />
                </div>
                {/* DeleteAdvert integrado al final del formulario */}
                {userLogged &&
                    userLogged.roles === 'admin' &&
                    advertData?.status !== 'published' && (
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
            <Toastify />
        </div>
    );
};

export default AdvertDetailsEdit;
