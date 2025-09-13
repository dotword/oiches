import { useState, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { IoBusinessOutline } from 'react-icons/io5';
import { MdOutlinePlace } from 'react-icons/md';
import { FaPhoneVolume } from 'react-icons/fa6';
import AdvertiserProfileCreationService from '../../services/Advertisers/AdvertiserProfileCreationService.js';
import AccountConfiguration from '../Users/AccountConfiguration.jsx';
import useUser from '../../hooks/useUser.jsx';
import BreadcrumbAdvert from './BreadcrumbAdvert.jsx';
import SubmitButton from './SubmitButton.jsx';

const AdvertiserProfileCreation = () => {
    const { userLogged, token } = useContext(AuthContext);
    const { userId } = useParams();
    const userData = useUser(userId);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        nombreEmpresa: '',
        nombreContacto: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        telefono: '',
        cif: '',
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const title = 'Datos de facturación';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('nombreEmpresa', formValues.nombreEmpresa);
        formData.append('nombreContacto', formValues.nombreContacto);
        formData.append('direccion', formValues.direccion);
        formData.append('ciudad', formValues.ciudad);
        formData.append('codigoPostal', formValues.codigoPostal);
        formData.append('telefono', formValues.telefono);
        formData.append('cif', formValues.cif);

        try {
            await AdvertiserProfileCreationService({ token, userId, formData });
            toast.success(
                'Tus datos han sido guardados correctamente. Ahora puedes publicar anuncios.'
            );
            setTimeout(() => {
                navigate(`/users/account/${userLogged.id}`);
            }, 3000);
            setError('');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const {
        nombreEmpresa,
        nombreContacto,
        direccion,
        ciudad,
        codigoPostal,
        telefono,
        cif,
    } = formValues;

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
        <div className="min-h-screen">
            <BreadcrumbAdvert userLogged={userLogged} title={title} />

            {/* Contenido principal */}
            <div className="max-w-7xl mx-auto px-4 pb-6 sm:pb-12 bg-white">
                <div className="flex flex-col xl:flex-row gap-12">
                    {/* Formulario de facturación */}
                    <div className="flex-1 max-w-4xl">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            {/* Header de la tarjeta */}
                            <div className="px-6 py-5 border-b">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purpleOiches rounded-xl flex items-center justify-center">
                                        <IoBusinessOutline className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">
                                            {title}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            Información requerida para procesar
                                            pagos
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contenido del formulario */}
                            <div className="p-6">
                                {/* Loading overlay */}
                                {isLoading && (
                                    <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg z-10">
                                        <div className="flex items-center gap-3 text-gray-600 font-medium">
                                            Guardando datos...
                                        </div>
                                    </div>
                                )}

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Información Empresarial */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
                                            <IoBusinessOutline className="w-7 h-7 text-purpleOiches" />
                                            Información Empresarial
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="nombreEmpresa"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                                >
                                                    <span>Empresa:*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="nombreEmpresa"
                                                    id="nombreEmpresa"
                                                    placeholder="Nombre de la empresa"
                                                    required
                                                    value={nombreEmpresa}
                                                    onChange={handleChange}
                                                    className="px-3 py-2 form-input"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="cif"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                                >
                                                    <span>NIF/CIF:*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cif"
                                                    id="cif"
                                                    placeholder="NIF o CIF de la empresa"
                                                    required
                                                    value={cif}
                                                    onChange={handleChange}
                                                    className="px-3 py-2 form-input"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dirección Fiscal */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
                                            <MdOutlinePlace className="w-6 h-6 text-purpleOiches" />
                                            Dirección Fiscal
                                        </h3>

                                        <div className="space-y-1">
                                            <label
                                                htmlFor="direccion"
                                                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                            >
                                                <span>Dirección:*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="direccion"
                                                id="direccion"
                                                placeholder="Dirección de la empresa"
                                                required
                                                value={direccion}
                                                onChange={handleChange}
                                                className="px-3 py-2 form-input"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="ciudad"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                                >
                                                    <span>Ciudad:*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="ciudad"
                                                    id="ciudad"
                                                    placeholder="Ciudad"
                                                    required
                                                    value={ciudad}
                                                    onChange={handleChange}
                                                    className="px-3 py-2 form-input"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="codigoPostal"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                                >
                                                    <span>Código Postal:*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="codigoPostal"
                                                    id="codigoPostal"
                                                    placeholder="Código Postal"
                                                    required
                                                    value={codigoPostal}
                                                    onChange={handleChange}
                                                    className="px-3 py-2 form-input"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Información de Contacto */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
                                            <FaPhoneVolume className="w-4 h-4 text-purpleOiches" />
                                            Información de contacto
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="nombreContacto"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                                >
                                                    <span>
                                                        Nombre de contacto:
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="nombreContacto"
                                                    id="nombreContacto"
                                                    placeholder="Nombre de contacto"
                                                    value={nombreContacto}
                                                    onChange={handleChange}
                                                    className="px-3 py-2 form-input"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="telefono"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                                >
                                                    <span>Teléfono:</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="telefono"
                                                    id="telefono"
                                                    placeholder="Teléfono de contacto"
                                                    value={telefono}
                                                    onChange={handleChange}
                                                    className="px-3 py-2 form-input"
                                                />
                                            </div>
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
                                    <SubmitButton
                                        isLoading={isLoading}
                                        textButton="Guardar datos"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar de configuración */}
                    <div className="flex-1 w-full sm:max-w-md">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-0 p-6">
                            <AccountConfiguration
                                userLogged={userLogged}
                                userData={userData}
                                userId={userId}
                                token={token}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Toastify />
        </div>
    );
};

export default AdvertiserProfileCreation;
