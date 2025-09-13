import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { IoBusinessOutline } from 'react-icons/io5';
import { MdOutlinePlace } from 'react-icons/md';
import { FaPhoneVolume } from 'react-icons/fa6';
import AccountConfiguration from '../Users/AccountConfiguration.jsx';
import useUser from '../../hooks/useUser.jsx';
import useAdvertiserProfile from '../../hooks/useAdvertiserProfile';
import AdvertiserProfileEditService from '../../services/Advertisers/AdvertiserProfileEditService.js';
import BreadcrumbAdvert from './BreadcrumbAdvert.jsx';
import SubmitButton from './SubmitButton.jsx';

const AdvertiserProfileEdit = () => {
    const { userLogged, token } = useContext(AuthContext);
    const { userId } = useParams();

    const profile = useAdvertiserProfile({ userId, token });
    const userData = useUser(userId);
    const navigate = useNavigate();

    const [companyDetails, setCompanyDetails] = useState({
        company_name: '',
        contact_name: '',
        billing_address: '',
        city: '',
        postal_code: '',
        contact_phone: '',
        tax_id: '',
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const title = 'Editar datos de facturación';

    useEffect(() => {
        if (!profile || !profile.advertiser) return;

        const isEmpty = Object.values(companyDetails).every((v) => v === '');
        if (!isEmpty) return; // evita sobreescribir si el usuario ya está editando

        setCompanyDetails({
            company_name: profile.advertiser.company_name || '',
            contact_name: profile.advertiser.contact_name || '',
            billing_address: profile.advertiser.billing_address || '',
            city: profile.advertiser.city || '',
            postal_code: profile.advertiser.postal_code || '',
            contact_phone: profile.advertiser.contact_phone || '',
            tax_id: profile.advertiser.tax_id || '',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]); // intencional: solo depende de profile

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setCompanyDetails((prev) => ({ ...prev, [name]: val }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData();
        Object.entries(companyDetails).forEach(([k, v]) =>
            formData.append(k, v)
        );

        try {
            await AdvertiserProfileEditService({ token, userId, formData });
            toast.success('Tus datos han sido guardados correctamente.');
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
        <div className="min-h-screen ">
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
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Información Empresarial */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
                                            <IoBusinessOutline className="w-7 h-7 text-purpleOiches" />
                                            Información empresarial
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="company_name"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                                >
                                                    <span>Empresa:*</span>
                                                </label>
                                                <input
                                                    id="company_name"
                                                    type="text"
                                                    name="company_name"
                                                    required
                                                    placeholder="Nombre de la empresa"
                                                    value={
                                                        companyDetails.company_name
                                                    }
                                                    onChange={handleChange}
                                                    className="form-input px-3 py-2"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="tax_id"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                                >
                                                    <span>NIF/CIF:*</span>
                                                </label>
                                                <input
                                                    id="tax_id"
                                                    type="text"
                                                    name="tax_id"
                                                    placeholder="NIF o CIF de la empresa"
                                                    required
                                                    value={
                                                        companyDetails.tax_id
                                                    }
                                                    onChange={handleChange}
                                                    className="form-input px-3 py-2"
                                                />
                                            </div>
                                        </div>

                                        {/* Dirección Fiscal */}
                                    </div>

                                    {/* Dirección Fiscal */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
                                            <MdOutlinePlace className="w-6 h-6 text-purpleOiches" />
                                            Dirección Fiscal
                                        </h3>

                                        <div className="space-y-1">
                                            <label
                                                htmlFor="billing_address"
                                                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                            >
                                                <span>Dirección:*</span>
                                            </label>
                                            <input
                                                id="billing_address"
                                                type="text"
                                                name="billing_address"
                                                placeholder="Dirección de la empresa"
                                                required
                                                value={
                                                    companyDetails.billing_address
                                                }
                                                onChange={handleChange}
                                                className="form-input px-3 py-2"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="city"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                                >
                                                    <span>Ciudad:*</span>
                                                </label>
                                                <input
                                                    id="city"
                                                    type="text"
                                                    name="city"
                                                    placeholder="Ciudad"
                                                    required
                                                    value={companyDetails.city}
                                                    onChange={handleChange}
                                                    className="form-input px-3 py-2"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="postal_code"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                                >
                                                    <span>Código Postal:*</span>
                                                </label>
                                                <input
                                                    id="postal_code"
                                                    type="text"
                                                    name="postal_code"
                                                    placeholder="Código Postal"
                                                    required
                                                    value={
                                                        companyDetails.postal_code
                                                    }
                                                    onChange={handleChange}
                                                    className="form-input px-3 py-2"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Información de Contacto */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide pb-2">
                                            <FaPhoneVolume className="w-4 h-4 text-purpleOiches" />
                                            Información de Contacto
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="contact_name"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                                >
                                                    <span>
                                                        Nombre de contacto:
                                                    </span>
                                                </label>
                                                <input
                                                    id="contact_name"
                                                    type="text"
                                                    name="contact_name"
                                                    placeholder="Nombre de contacto"
                                                    value={
                                                        companyDetails.contact_name
                                                    }
                                                    onChange={handleChange}
                                                    className="form-input px-3 py-2"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="contact_phone"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                                >
                                                    <span>Teléfono:</span>
                                                </label>
                                                <input
                                                    id="contact_phone"
                                                    type="tel"
                                                    name="contact_phone"
                                                    placeholder="Teléfono de contacto"
                                                    value={
                                                        companyDetails.contact_phone
                                                    }
                                                    onChange={handleChange}
                                                    className="form-input px-3 py-2"
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
                    <div className="flex-1 max-w-md">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-0 px-6 py-4">
                            <div className="px-6 pt-3 pb-6">
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
            </div>
            <Toastify />
        </div>
    );
};

export default AdvertiserProfileEdit;
