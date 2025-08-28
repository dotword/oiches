import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams, Link } from 'react-router-dom';
import AccountConfiguration from '../Users/AccountConfiguration.jsx';
import useUser from '../../hooks/useUser.jsx';
import { IoChevronForward } from 'react-icons/io5';
import useAdvertiserProfile from '../../hooks/useAdvertiserProfile';
import AdvertiserProfileEditService from '../../services/Advertisers/AdvertiserProfileEditService.js';

const AdvertiserProfileEdit = () => {
    const { userLogged, token } = useContext(AuthContext);
    const { userId } = useParams();

    const profile = useAdvertiserProfile({ userId, token });
    const userData = useUser(userId);

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

    // Inicializar companyDetails cuando profile se cargue (solo si el form está vacío
    // para evitar sobreescribir mientras el usuario escribe)
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

        const formData = new FormData();
        Object.entries(companyDetails).forEach(([k, v]) =>
            formData.append(k, v)
        );

        try {
            await AdvertiserProfileEditService({ token, userId, formData });
            toast.success('Tus datos han sido guardados correctamente.');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    if (!userLogged) {
        return (
            <h1 className="text-center text-xl">
                No puedes acceder a esta página
            </h1>
        );
    }

    return (
        <>
            <Link
                to={`/users/account/${userId}`}
                className="btn-degradado self-end mb-4 flex items-center gap-2"
            >
                Mis anuncios
                <IoChevronForward className=" border-purpleOiches hover:bg-purpleOiches text-xl" />
            </Link>

            <form
                onSubmit={handleSubmit}
                className="mb-12 md:flex md:flex-wrap gap-x-8"
            >
                <label
                    htmlFor="company_name"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">Empresa:*</span>
                    <input
                        id="company_name"
                        type="text"
                        name="company_name"
                        required
                        placeholder="Nombre de la empresa"
                        value={companyDetails.company_name}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label
                    htmlFor="contact_name"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">Nombre de contacto:</span>
                    <input
                        id="contact_name"
                        type="text"
                        name="contact_name"
                        placeholder="Nombre de contacto"
                        value={companyDetails.contact_name}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label
                    htmlFor="billing_address"
                    className="flex flex-col mb-4 md:w-full"
                >
                    <span className="font-semibold">Dirección:*</span>
                    <input
                        id="billing_address"
                        type="text"
                        name="billing_address"
                        placeholder="Dirección de la empresa"
                        required
                        value={companyDetails.billing_address}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label
                    htmlFor="city"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">Ciudad:*</span>
                    <input
                        id="city"
                        type="text"
                        name="city"
                        placeholder="Ciudad"
                        required
                        value={companyDetails.city}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label
                    htmlFor="postal_code"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">Código Postal:*</span>
                    <input
                        id="postal_code"
                        type="text"
                        name="postal_code"
                        placeholder="Código Postal"
                        required
                        value={companyDetails.postal_code}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label
                    htmlFor="contact_phone"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">Teléfono:</span>
                    {/* Recomiendo type="tel" para teléfonos */}
                    <input
                        id="contact_phone"
                        type="tel"
                        name="contact_phone"
                        placeholder="Teléfono de contacto"
                        value={companyDetails.contact_phone}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label
                    htmlFor="tax_id"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">NIF/CIF:*</span>
                    <input
                        id="tax_id"
                        type="text"
                        name="tax_id"
                        placeholder="NIF o CIF de la empresa"
                        required
                        value={companyDetails.tax_id}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <input
                    type="submit"
                    value="Editar datos"
                    className="btn-account my-8 mx-auto p-3 w-full max-w-80 font-semibold"
                />

                <div className="w-full">{error && <p>{error}</p>}</div>
            </form>

            <AccountConfiguration
                userLogged={userLogged}
                userData={userData}
                userId={userId}
                token={token}
            />
            <Toastify />
        </>
    );
};

export default AdvertiserProfileEdit;
