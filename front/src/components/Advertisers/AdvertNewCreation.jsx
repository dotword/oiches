import { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import FetchAdvertCategoriesService from '../../services/Advertisers/FetchAdvertCategoriesService.js';
import FetchAdvertPackagesService from '../../services/Advertisers/FetchAdvertPackagesService.js';
import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import AdvertNewCreationService from '../../services/Advertisers/AdvertNewCreationService.js';
import PackagesDetails from './PackagesDetails.jsx';
import { IoPricetagOutline, IoImageOutline } from 'react-icons/io5';
import { MdOutlinePlace } from 'react-icons/md';
import { FaPhoneVolume } from 'react-icons/fa6';
import { TfiWrite } from 'react-icons/tfi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import BreadcrumbAdvert from './BreadcrumbAdvert.jsx';
import SubmitButton from './SubmitButton.jsx';

const AdvertNewCreation = () => {
    const { userLogged, token } = useContext(AuthContext);
    const { userId } = useParams();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
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
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const [categories, setCategories] = useState([]);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [packages, setPackages] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [error, setError] = useState('');
    const titulo = 'Crear anuncio';

    useEffect(() => {
        FetchAdvertCategoriesService(setCategories);
        FetchAdvertPackagesService(setPackages);
        FetchProvinciasService(setProvinces);
    }, []);

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const file = e.target.files[0];
            if (file) {
                // revoke previous preview if any
                if (imagePreview) URL.revokeObjectURL(imagePreview);
                const url = URL.createObjectURL(file);
                setFormValues((prev) => ({ ...prev, [name]: file }));
                setImagePreview(url);
            } else {
                if (imagePreview) URL.revokeObjectURL(imagePreview);
                setFormValues((prev) => ({ ...prev, [name]: null }));
                setImagePreview(null);
            }
            return;
        }

        if (name === 'category_id') {
            const selected = categories.find(
                (c) => String(c.id) === String(value)
            );
            setSelectedDescription(selected ? selected.description : '');
            setFormValues({ ...formValues, category_id: value });
            return;
        }

        setFormValues({ ...formValues, [name]: value });
    };

    const removeImage = () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        setFormValues((prev) => ({ ...prev, image: null }));
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let normalizedWeb = formValues.link.trim();
        if (formValues.link) {
            if (!/^https?:\/\//i.test(normalizedWeb)) {
                normalizedWeb = 'https://' + normalizedWeb;
            }
            try {
                new URL(normalizedWeb);
            } catch {
                setError('La dirección web no es válida');
                return;
            }
        }

        const formData = new FormData();

        Object.entries({ ...formValues, link: normalizedWeb }).forEach(
            ([key, value]) => {
                if (value) formData.append(key, value);
            }
        );

        try {
            await AdvertNewCreationService({ token, userId, formData });

            toast.success(
                'Vamos a revisar tu anuncio. Muy pronto nos pondremos en contacto contigo.'
            );

            setTimeout(() => {
                navigate(`/users/account/${userId}`);
            }, 2000);
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const {
        category_id,
        package_id,
        address,
        city,
        provincia_id,
        title,
        description,
        link,
        contact_email,
        contact_phone,
    } = formValues;

    return (
        <div className="min-h-screen">
            <BreadcrumbAdvert userLogged={userLogged} title={titulo} />

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
                                    {titulo}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <PackagesDetails />
                    {/* Contenido del formulario */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-8">
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
                value={package_id}
                className="px-3 py-2 form-input"
                onChange={handleChange}
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
        </label>

        <label className="block text-sm font-medium text-gray-700 space-y-2">
            Categoría:*
            <select
                id="category_id"
                name="category_id"
                required
                value={category_id}
                className="px-3 py-2 form-input"
                onChange={handleChange}
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
        </label>

        <label className="block text-sm font-medium text-gray-700 space-y-2">
            Título:*
            <input
                type="text"
                name="title"
                placeholder="Título del anuncio"
                required
                value={title}
                onChange={handleChange}
                className="px-3 py-2 form-input"
            />
        </label>
    </div>

    {selectedDescription && (
        <p className="mt-4 text-sm text-white bg-gray-800 p-3 rounded-lg border-l-4 border-indigo-500">
            {selectedDescription}
        </p>
    )}

    <label className="block text-sm font-medium text-gray-700 space-y-2">
        Descripción:
        <textarea
            name="description"
            placeholder="Descripción de tu anuncio. Máximo 2000 caracteres."
            value={description}
            onChange={handleChange}
            rows="4"
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
                                    <label className="block text-sm font-medium text-gray-700 space-y-2">
                                        Dirección:
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Dirección de la empresa"
                                            value={address}
                                            onChange={handleChange}
                                            className="px-3 py-2 form-input"
                                        />
                                    </label>

                                    <label className="block text-sm font-medium text-gray-700 space-y-2">
                                        Ciudad:
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="Ciudad"
                                            value={city}
                                            onChange={handleChange}
                                            className="px-3 py-2 form-input"
                                        />
                                    </label>

                                    <label className="block text-sm font-medium text-gray-700 space-y-2">
                                        Provincia:
                                        <select
                                            id="provincia_id"
                                            name="provincia_id"
                                            value={provincia_id}
                                            className="px-3 py-2 form-input"
                                            onChange={handleChange}
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
                                    <label className="block text-sm font-medium text-gray-700 space-y-2">
                                        Web o enlace a tus RRSS:
                                        <input
                                            type="text"
                                            name="link"
                                            placeholder="https://www.tuenlace.com"
                                            value={link}
                                            onChange={handleChange}
                                            className="px-3 py-2 form-input"
                                        />
                                    </label>

                                    <label className="block text-sm font-medium text-gray-700 space-y-2">
                                        Email de contacto:
                                        <input
                                            type="email"
                                            name="contact_email"
                                            placeholder="Email de contacto"
                                            value={contact_email}
                                            onChange={handleChange}
                                            className="px-3 py-2 form-input"
                                        />
                                    </label>

                                    <label className="block text-sm font-medium text-gray-700 space-y-2">
                                        Teléfono:
                                        <input
                                            type="tel"
                                            name="contact_phone"
                                            placeholder="Teléfono de contacto"
                                            value={contact_phone}
                                            onChange={handleChange}
                                            className="px-3 py-2 form-input"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Sección 5: Imagen del Anuncio */}
                            <div className="space-y-6">
                                <h3 className="flex items-center gap-3 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                    <IoImageOutline className="w-5 h-5 text-purpleOiches" />
                                    IMAGEN DEL ANUNCIO
                                </h3>

                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-200/30 hover:bg-gray-200/50 hover:border-indigo-500 transition-all duration-200 group overflow-hidden">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Previsualización"
                                                className="object-contain"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <AiOutlineCloudUpload className="text-4xl text-gray-400 group-hover:text-indigo-400 transition-colors mb-4" />

                                                <p className="mb-2 text-sm text-gray-400 group-hover:text-indigo-400 transition-colors font-semibold">
                                                    Haz clic para subir o
                                                    arrastra y suelta
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPEG, WEBP (MAX. 2MB)
                                                </p>
                                            </div>
                                        )}

                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            name="image"
                                            required={!imagePreview}
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {imagePreview && (
                                    <div className="mt-3 flex items-center justify-center gap-4">
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="px-3 py-1 rounded-md bg-red-700/60 text-white text-sm hover:bg-red-600 transition"
                                        >
                                            Eliminar imagen
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* Botón de envío */}
                            <SubmitButton
                                isLoading={false}
                                textButton="Enviar anuncio"
                            />
                            {error && (
                                <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                                    <p className="text-red-400 text-sm text-center">
                                        {error}
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <Toastify />
        </div>
    );
};

export default AdvertNewCreation;
