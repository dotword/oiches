import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams, Link, useNavigate } from 'react-router-dom';
import FetchAdvertCategoriesService from '../../services/Advertisers/FetchAdvertCategoriesService.js';
import FetchAdvertPackagesService from '../../services/Advertisers/FetchAdvertPackagesService.js';
import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import AdvertNewCreationService from '../../services/Advertisers/AdvertNewCreationService.js';
import { IoChevronForward } from 'react-icons/io5';
import { IoPricetagOutline } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci"
import { TfiWrite } from "react-icons/tfi";
import { FiSend } from "react-icons/fi";




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

    const [categories, setCategories] = useState([]);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [packages, setPackages] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        FetchAdvertCategoriesService(setCategories);
        FetchAdvertPackagesService(setPackages);
        FetchProvinciasService(setProvinces);
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            setFormValues({ ...formValues, [name]: e.target.files[0] });
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

    return userLogged ? (
        <div className="min-h-screen bg-transparent pt-20">
            <div className="mx-auto w-full text-center">
                <p className="mt-2 font-bold tracking-tight text-white sm:text-4xl">
                    Crear nuevo anuncio
                </p>
            </div>
            <div className="mx-auto pb-20 mt-4 w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-52">
                <Link
                    to={`/users/account/${userId}`}
                    className="bg-purple-900/30 text-purple-400 border border-purple-400 rounded-md px-4 py-2 mb-6 inline-flex items-center gap-2 hover:bg-purple-900/50 transition"
                >
                    Mis anuncios
                    <IoChevronForward className="text-xl" />
                </Link>
                <div className="mx-auto w-full text-center">
                    <h1 className="text-base font-semibold leading-7 text-indigo-400">
                        Tarifas de anuncios
                    </h1>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Elige el tipo de anuncio que mejor se adapta a ti.
                    </p>
                </div>
                <p className="mx-auto mt-6 w-full text-center text-lg leading-8 text-gray-300">
                    Selecciona el paquete que prefieras para tu anuncio.
                </p>

                <div className="isolate mx-auto mt-10 grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Card 1 - Anuncio Básico */}
                    <div className="bg-gray-900/40 backdrop-blur-lg border border-white/30 rounded-2xl p-4 xl:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-[0_8px_40px_rgba(79,70,229,0.3)] hover:border-indigo-400/50 cursor-pointer group flex flex-col h-full">
                        <div className="flex items-center justify-between gap-x-4 mb-4">
                            <h3 className="text-lg font-semibold leading-8 text-white group-hover:text-indigo-300 transition-colors duration-300">
                                Anuncio básico
                            </h3>
                        </div>

                        {/* Lista de características - altura fija */}
                        <div className="flex-1 mb-6">
                            <div className="text-sm leading-6 text-gray-200">
                                <ul className="space-y-2 h-32">
                                    <li className="flex gap-x-3 transform transition-transform duration-200 hover:translate-x-1">
                                        <svg
                                            className="h-5 w-5 flex-none text-green-400 mt-0.5 transition-colors duration-300 group-hover:text-green-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Título
                                    </li>
                                    <li className="flex gap-x-3 transform transition-transform duration-200 hover:translate-x-1">
                                        <svg
                                            className="h-5 w-5 flex-none text-green-400 mt-0.5 transition-colors duration-300 group-hover:text-green-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Hasta 200 palabras
                                    </li>
                                    <li className="flex gap-x-3 transform transition-transform duration-200 hover:translate-x-1">
                                        <svg
                                            className="h-5 w-5 flex-none text-green-400 mt-0.5 transition-colors duration-300 group-hover:text-green-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Imagen pequeña
                                    </li>
                                    <li className="flex gap-x-3 transform transition-transform duration-200 hover:translate-x-1">
                                        <svg
                                            className="h-5 w-5 flex-none text-green-400 mt-0.5 transition-colors duration-300 group-hover:text-green-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Enlace a tu web
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Precio - posición fija */}
                        <div className="mb-6">
                            <p className="flex items-baseline justify-center gap-x-1 transform transition-all duration-300 group-hover:scale-110">
                                <span className="text-5xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-300">
                                    20€
                                </span>
                                <span className="text-sm font-semibold leading-6 text-gray-200 group-hover:text-indigo-400 transition-colors duration-300">
                                    /3 meses
                                </span>
                            </p>
                        </div>

                        {/* Descripción y opciones adicionales */}
                        <div className="mt-auto">
                            <ul className="space-y-3 text-base leading-6 text-gray-200">
                                <li className="flex gap-x-3 transition-colors duration-300 group-hover:text-white">
                                    Orden cronológico/alfabético en su categoría
                                </li>
                                <li className="flex items-center justify-center gap-x-3">
                                    <div className="flex gap-2 flex-wrap justify-center">
                                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-900/40 text-blue-200 border border-blue-700/50 transition-all duration-300 hover:bg-blue-800/60 hover:scale-105 hover:shadow-lg backdrop-blur-sm">
                                            6 meses: 35€
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-900/40 text-green-200 border border-green-700/50 transition-all duration-300 hover:bg-green-800/60 hover:scale-105 hover:shadow-lg backdrop-blur-sm">
                                            1 año: 60€
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 2 - Anuncio Destacado */}
                    <div className="bg-gray-900/50 backdrop-blur-lg border-2 border-indigo-400/40 rounded-2xl p-4 xl:p-8 shadow-[0_4px_30px_rgba(79,70,229,0.2)] transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:shadow-[0_12px_50px_rgba(79,70,229,0.4)] hover:border-indigo-400/60 cursor-pointer group relative overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-baseline justify-between gap-x-4 mb-4">
                                <h3 className="text-lg font-semibold leading-8 text-white group-hover:text-indigo-200 transition-colors duration-300">
                                    Anuncio destacado
                                </h3>
                                <span className="rounded-full bg-indigo-500/80 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold leading-5 text-white border border-indigo-400/50 transition-all duration-300 group-hover:bg-indigo-400/90 group-hover:scale-110 group-hover:shadow-lg">
                                    Más popular
                                </span>
                            </div>

                            {/* Lista de características - altura fija */}
                            <div className="flex-1 mb-6">
                                <div className="text-sm leading-6 text-gray-200">
                                    <ul className="space-y-2 h-32">
                                        <li className="flex gap-x-3 transform transition-transform duration-200 hover:translate-x-1">
                                            <svg
                                                className="h-5 w-5 flex-none text-green-400 mt-0.5 transition-colors duration-300 group-hover:text-green-300"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Imagen principal grande
                                        </li>
                                        <li className="flex gap-x-3 transform transition-transform duration-200 hover:translate-x-1">
                                            <svg
                                                className="h-5 w-5 flex-none text-green-400 mt-0.5 transition-colors duration-300 group-hover:text-green-300"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Fondo de color en el listado
                                        </li>
                                        <li className="flex gap-x-3 transform transition-transform duration-200 hover:translate-x-1">
                                            <svg
                                                className="h-5 w-5 flex-none text-green-400 mt-0.5 transition-colors duration-300 group-hover:text-green-300"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Enlace a tu web
                                        </li>
                                        <li className="flex gap-x-3 transform transition-transform duration-200 hover:translate-x-1">
                                            <svg
                                                className="h-5 w-5 flex-none text-green-400 mt-0.5 transition-colors duration-300 group-hover:text-green-300"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Contacto
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Precio - posición fija */}
                            <div className="mb-6">
                                <p className="flex items-baseline justify-center gap-x-1 transform transition-all duration-300 group-hover:scale-110">
                                    <span className="text-5xl font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors duration-300">
                                        30€
                                    </span>
                                    <span className="text-sm font-semibold leading-6 text-gray-200 group-hover:text-indigo-400 transition-colors duration-300">
                                        /3 meses
                                    </span>
                                </p>
                            </div>

                            {/* Descripción y opciones adicionales */}
                            <div className="mt-auto">
                                <ul className="space-y-3 text-base leading-6 text-gray-200">
                                    <li className="flex gap-x-3 transition-colors duration-300 group-hover:text-white">
                                        Siempre en primeras posiciones, etiqueta
                                        Destacado
                                    </li>
                                    <li className="flex items-center justify-center">
                                        <div className="flex gap-2 flex-wrap justify-center">
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-900/40 text-blue-200 border border-blue-700/50 transition-all duration-300 hover:bg-blue-800/60 hover:scale-105 hover:shadow-lg backdrop-blur-sm">
                                                6 meses: 50€
                                            </span>
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-900/40 text-green-200 border border-green-700/50 transition-all duration-300 hover:bg-green-800/60 hover:scale-105 hover:shadow-lg backdrop-blur-sm">
                                                1 año: 90€
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 - Flash Premium */}
                    <div className="bg-gray-900/40 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-4 xl:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-105 hover:bg-yellow-500/10 hover:shadow-[0_8px_40px_rgba(234,179,8,0.3)] hover:border-yellow-400/50 cursor-pointer group flex flex-col h-full">
                        <div className="flex items-center justify-between gap-x-4 mb-4">
                            <h3 className="text-lg font-semibold leading-8 text-white group-hover:text-yellow-300 transition-colors duration-300">
                                Paquete Flash Premium
                            </h3>
                        </div>

                        {/* Lista de características - altura fija */}
                        <div className="flex-1 mb-6">
                            <div className="text-sm leading-6 text-gray-200">
                                <ul className="space-y-2 h-32">
                                    <li className="flex gap-x-3 transform transition-transform duration-200 hover:translate-x-1">
                                        <svg
                                            className="h-5 w-5 flex-none text-green-400 mt-0.5 transition-colors duration-300 group-hover:text-green-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Imagen (hero)
                                    </li>
                                    <li className="flex gap-x-3 transform transition-transform duration-200 hover:translate-x-1">
                                        <svg
                                            className="h-5 w-5 flex-none text-green-400 mt-0.5 transition-colors duration-300 group-hover:text-green-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Enlace a la web del anunciante
                                    </li>
                                    <li className="flex gap-x-3 transform transition-transform duration-200 hover:translate-x-1">
                                        <svg
                                            className="h-5 w-5 flex-none text-green-400 mt-0.5 transition-colors duration-300 group-hover:text-green-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Anuncio destacado incluido
                                    </li>
                                    <li className="flex gap-x-3 transform transition-transform duration-200 hover:translate-x-1">
                                        <svg
                                            className="h-5 w-5 flex-none text-green-400 mt-0.5 transition-colors duration-300 group-hover:text-green-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Contacto
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Precio - posición fija */}
                        <div className="mb-6">
                            <p className="flex items-baseline gap-x-1 justify-center transform transition-all duration-300 group-hover:scale-110">
                                <span className="text-5xl font-bold tracking-tight text-white group-hover:text-yellow-300 transition-colors duration-300">
                                    50€
                                </span>
                                <span className="text-sm font-semibold leading-6 text-gray-200 group-hover:text-yellow-400 transition-colors duration-300">
                                    /mes
                                </span>
                            </p>
                        </div>

                        {/* Descripción adicional */}
                        <div className="mt-2 mb-10">
                            <ul className="space-y-3 text-base leading-6 text-gray-200">
                                <li className="flex gap-x-3 transition-colors duration-300 group-hover:text-white">
                                    Siempre en primeras posiciones, etiqueta
                                    Destacado
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-16 mx-0 sm:mx-auto w-full bg-footercolor/60 backdrop-blur-lg border border-white/30 rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] ring-1 ring-white/10"
                >
                    {/* Sección 1: Información del Anuncio */}
                    <div className="mx-0 sm:mx-auto w-full p-4 rounded mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
                            <IoPricetagOutline className="text-purpleOiches" />

                            Información del Anuncio
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <label className="flex flex-col w-full">
                                <span className="font-semibold text-gray-200 mb-2">
                                    Tipo de anuncio:*
                                </span>
                                <select
                                    id="package_id"
                                    name="package_id"
                                    required
                                    value={package_id}
                                    className="w-full py-3 px-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona</option>
                                    {packages.map((pack) => (
                                        <option key={pack.id} value={pack.id}>
                                            {pack.package}
                                        </option>
                                    ))}
                                </select>
                            </label>
                           

                            <label className="flex flex-col w-full">
                                <span className="font-semibold text-gray-200 mb-2">
                                    Categoría:*
                                </span>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    required
                                    value={category_id}
                                    className="w-full py-3 px-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
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
                                {selectedDescription && (
                                    <p className="mt-4 text-sm text-white bg-gray-800 p-3 rounded-lg border-l-4 border-indigo-500">
                                        {selectedDescription}
                                    </p>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* Sección 2: Contenido del Anuncio */}
                    <div className="mx-0 sm:mx-auto w-full p-4 sm:p-6 rounded-xl  mb-4 sm:mb-6">
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                           <TfiWrite className="text-purpleOiches" />

                            Contenido del Anuncio
                        </h3>
                        <div className="space-y-4 sm:space-y-6">
                            <label className="flex flex-col w-full">
                                <span className="font-semibold text-gray-200 mb-2">
                                    Título:*
                                </span>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Título del anuncio"
                                    required
                                    value={title}
                                    onChange={handleChange}
                                    className="w-full py-3 px-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                />
                            </label>
                            <label className="flex flex-col w-full">
                                <span className="font-semibold text-gray-200 mb-2">
                                    Descripción:
                                </span>
                                <textarea
                                    name="description"
                                    placeholder="Descripción de tu anuncio. Máximo 2000 caracteres."
                                    value={description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full py-3 px-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 resize-none"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Sección 3: Ubicación */}
                    <div className="mx-0 sm:mx-auto w-full p-4 rounded mb-4 sm:mb-6">
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <MdOutlinePlace className="text-purpleOiches" />

                            Ubicación
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                            <label className="flex flex-col w-full">
                                <span className="font-semibold text-gray-200 mb-2">
                                    Dirección:
                                </span>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Dirección de la empresa"
                                    value={address}
                                    onChange={handleChange}
                                    className="w-full py-3 px-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                />
                            </label>
                            <label className="flex flex-col w-full">
                                <span className="font-semibold text-gray-200 mb-2">
                                    Ciudad:
                                </span>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Ciudad"
                                    value={city}
                                    onChange={handleChange}
                                    className="w-full py-3 px-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                />
                            </label>
                            <label className="flex flex-col w-full">
                                <span className="font-semibold text-gray-200 mb-2">
                                    Provincia:*
                                </span>
                                <select
                                    id="provincia_id"
                                    name="provincia_id"
                                    value={provincia_id}
                                    required
                                    className="w-full py-3 px-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
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

                    {/* Sección 4: Información de Contacto */}
                    <div className=" sm:p-6 rounded-xl mb-4 sm:mb-6">
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <IoMailOutline className="text-purpleOiches" />
                            Información de Contacto
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                            <label className="flex flex-col w-full">
                                <span className="font-semibold text-gray-200 mb-2">
                                    Web o enlace a tus RRSS:
                                </span>
                                <input
                                    type="text"
                                    name="link"
                                    placeholder="https://www.tuenlace.com"
                                    value={link}
                                    onChange={handleChange}
                                    className="w-full py-3 px-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                />
                            </label>
                            <label className="flex flex-col w-full">
                                <span className="font-semibold text-gray-200 mb-2">
                                    Email de contacto:
                                </span>
                                <input
                                    type="email"
                                    name="contact_email"
                                    placeholder="Email de contacto"
                                    value={contact_email}
                                    onChange={handleChange}
                                    className="w-full py-3 px-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                />
                            </label>
                            <label className="flex flex-col w-full">
                                <span className="font-semibold text-gray-200 mb-2">
                                    Teléfono:
                                </span>
                                <input
                                    type="number"
                                    name="contact_phone"
                                    placeholder="Teléfono de contacto"
                                    value={contact_phone}
                                    onChange={handleChange}
                                    className="w-full py-3 px-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Sección 5: Imagen del Anuncio */}
                    <div className="p-4 sm:p-6 rounded-xl mb-4 sm:mb-6">
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                           <CiImageOn className="text-purpleOiches" />

                            Imagen del Anuncio
                        </h3>
                        <label className="flex flex-col w-full">
                            <span className="font-semibold text-gray-200 mb-2">
                                Imagen:*
                            </span>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-900/50 hover:bg-gray-800/50 hover:border-indigo-500 transition-all duration-200 group">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-400 group-hover:text-indigo-400 transition-colors"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-400 group-hover:text-indigo-400 transition-colors">
                                            <span className="font-semibold">
                                                Haz clic para subir
                                            </span>{' '}
                                            o arrastra y suelta
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF (MAX. 2MB)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        name="image"
                                        required
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </label>
                    </div>

                    {/* Botón de envío */}
                    <div className="flex justify-center mt-6 sm:mt-8">
                        <button
                            type="submit"
                            className="bg-purpleOiches hover:bg-moradoOiches  text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                           <FiSend />

                            Enviar Anuncio
                        </button>
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                            <p className="text-red-400 text-sm text-center">
                                {error}
                            </p>
                        </div>
                    )}
                </form>
                <Toastify />
            </div>
        </div>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AdvertNewCreation;
