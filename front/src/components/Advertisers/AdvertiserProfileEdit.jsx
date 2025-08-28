// import { useState, useContext, useEffect } from 'react';
// import AuthContext from '../../context/auth/AuthContext.jsx';
// import { toast } from 'react-toastify';
// import Toastify from '../Toastify.jsx';
// import { useParams, Link } from 'react-router-dom';
// import AccountConfiguration from '../Users/AccountConfiguration.jsx';
// import useUser from '../../hooks/useUser.jsx';
// import useAdvertiserProfile from '../../hooks/useAdvertiserProfile';
// import AdvertiserProfileEditService from '../../services/Advertisers/AdvertiserProfileEditService.js';

// const AdvertiserProfileEdit = () => {
//     const { userLogged, token } = useContext(AuthContext);
//     const { userId } = useParams();

//     const profile = useAdvertiserProfile({ userId, token });
//     const userData = useUser(userId);

//     const [companyDetails, setCompanyDetails] = useState({
//         company_name: '',
//         contact_name: '',
//         billing_address: '',
//         city: '',
//         postal_code: '',
//         contact_phone: '',
//         tax_id: '',
//     });

//     const [error, setError] = useState('');

//     // Inicializar companyDetails cuando profile se cargue (solo si el form está vacío
//     // para evitar sobreescribir mientras el usuario escribe)
//     useEffect(() => {
//         if (!profile || !profile.advertiser) return;

//         const isEmpty = Object.values(companyDetails).every((v) => v === '');
//         if (!isEmpty) return; // evita sobreescribir si el usuario ya está editando

//         setCompanyDetails({
//             company_name: profile.advertiser.company_name || '',
//             contact_name: profile.advertiser.contact_name || '',
//             billing_address: profile.advertiser.billing_address || '',
//             city: profile.advertiser.city || '',
//             postal_code: profile.advertiser.postal_code || '',
//             contact_phone: profile.advertiser.contact_phone || '',
//             tax_id: profile.advertiser.tax_id || '',
//         });
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [profile]); // intencional: solo depende de profile

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         const val = type === 'checkbox' ? checked : value;
//         setCompanyDetails((prev) => ({ ...prev, [name]: val }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         Object.entries(companyDetails).forEach(([k, v]) =>
//             formData.append(k, v)
//         );

//         try {
//             await AdvertiserProfileEditService({ token, userId, formData });
//             toast.success(
//                 'Tus datos han sido guardados correctamente. Ahora puedes publicar anuncios.'
//             );
//         } catch (error) {
//             setError(error.message);
//             toast.error(error.message);
//         }
//     };

//     if (!userLogged) {
//         return (
//             <h1 className="text-center text-xl">
//                 No puedes acceder a esta página
//             </h1>
//         );
//     }

// return (
//         <>
//             {/* Contenedor principal con flexbox */}
//             <div className="flex flex-col lg:flex-row gap-8 mt-6">
//                 {/* Formulario de facturación - izquierda */}
//                 <div className="max-w-md bg-white rounded-lg shadow-sm border p-6">
//                     {/* Header con navegación */}
//                     <div className="mb-6">
//                         <Link
//                             to={`/users/account/${userId}`}
//                             className="btn-account inline-block py-2 px-4 text-sm font-medium rounded mb-4 transition-colors"
//                         >
//                             ← Volver a mis anuncios
//                         </Link>
//                         <h2 className="text-lg font-bold text-purpleOiches">Datos de facturación</h2>
//                         <p className="text-sm text-gray-600">Completa para recibir facturas</p>
//                     </div>

//                     <form
//                         onSubmit={handleSubmit}
//                         className="space-y-4"
//                     >
//                         {/* Empresa */}
//                         <div>
//                             <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Empresa <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 id="company_name"
//                                 type="text"
//                                 name="company_name"
//                                 placeholder="Ej. Mi Empresa S.L."
//                                 value={companyDetails.company_name}
//                                 onChange={handleChange}
//                                 className="form-input w-full text-sm rounded border-gray-300 focus:border-purpleOiches focus:ring-1 focus:ring-purpleOiches"
//                                 required
//                             />
//                         </div>

//                         {/* NIF/CIF */}
//                         <div>
//                             <label htmlFor="tax_id" className="block text-sm font-medium text-gray-700 mb-1">
//                                 NIF/CIF <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 id="tax_id"
//                                 type="text"
//                                 name="tax_id"
//                                 placeholder="B12345678"
//                                 required
//                                 value={companyDetails.tax_id}
//                                 onChange={handleChange}
//                                 className="form-input w-full text-sm rounded border-gray-300 focus:border-purpleOiches focus:ring-1 focus:ring-purpleOiches"
//                             />
//                         </div>

//                         {/* Contacto */}
//                         <div>
//                             <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Persona de contacto <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 id="contact_name"
//                                 type="text"
//                                 name="contact_name"
//                                 placeholder="Juan Pérez"
//                                 required
//                                 value={companyDetails.contact_name}
//                                 onChange={handleChange}
//                                 className="form-input w-full text-sm rounded border-gray-300 focus:border-purpleOiches focus:ring-1 focus:ring-purpleOiches"
//                             />
//                         </div>

//                         {/* Dirección */}
//                         <div>
//                             <label htmlFor="billing_address" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Dirección <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 id="billing_address"
//                                 type="text"
//                                 name="billing_address"
//                                 placeholder="C/ Gran Vía 15, 2º A"
//                                 required
//                                 value={companyDetails.billing_address}
//                                 onChange={handleChange}
//                                 className="form-input w-full text-sm rounded border-gray-300 focus:border-purpleOiches focus:ring-1 focus:ring-purpleOiches"
//                             />
//                         </div>

//                         {/* Ciudad y CP en fila */}
//                         <div className="grid grid-cols-2 gap-3">
//                             <div>
//                                 <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
//                                     Ciudad <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     id="city"
//                                     type="text"
//                                     name="city"
//                                     placeholder="Madrid"
//                                     required
//                                     value={companyDetails.city}
//                                     onChange={handleChange}
//                                     className="form-input w-full text-sm rounded border-gray-300 focus:border-purpleOiches focus:ring-1 focus:ring-purpleOiches"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-1">
//                                     CP <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     id="postal_code"
//                                     type="text"
//                                     name="postal_code"
//                                     placeholder="28001"
//                                     required
//                                     value={companyDetails.postal_code}
//                                     onChange={handleChange}
//                                     className="form-input w-full text-sm rounded border-gray-300 focus:border-purpleOiches focus:ring-1 focus:ring-purpleOiches"
//                                     maxLength="5"
//                                 />
//                             </div>
//                         </div>

//                         {/* Teléfono */}
//                         <div>
//                             <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Teléfono
//                             </label>
//                             <input
//                                 id="contact_phone"
//                                 type="tel"
//                                 name="contact_phone"
//                                 placeholder="600 123 456"
//                                 value={companyDetails.contact_phone}
//                                 onChange={handleChange}
//                                 className="form-input w-full text-sm rounded border-gray-300 focus:border-purpleOiches focus:ring-1 focus:ring-purpleOiches"
//                             />
//                         </div>

//                         {/* Error */}
//                         {error && (
//                             <div className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">
//                                 {error}
//                             </div>
//                         )}

//                         {/* Botón */}
//                         <button
//                             type="submit"
//                             className="btn-account w-full py-2.5 text-sm font-semibold rounded transition-colors mt-6"
//                         >
//                             Guardar datos
//                         </button>

//                         {/* Nota de privacidad */}
//                         <p className="text-xs text-gray-500 text-center mt-3">
//                             🔒 Datos protegidos para facturación
//                         </p>
//                     </form>
//                 </div>

//                 {/* AccountConfiguration - derecha */}
//                 <div className="max-w-md">
//                     <AccountConfiguration
//                         userLogged={userLogged}
//                         userData={userData}
//                         userId={userId}
//                         token={token}
//                     />
//                 </div>
//             </div>
//             <Toastify />
//         </>
//     );
// };

// export default AdvertiserProfileEdit;



import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams, Link } from 'react-router-dom';
import AccountConfiguration from '../Users/AccountConfiguration.jsx';
import useUser from '../../hooks/useUser.jsx';
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
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-xl font-medium text-gray-800">No puedes acceder a esta página</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Header simple sin fondo */}
            <div className="bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <h1 className="text-2xl font-medium text-gray-900">Datos de facturación</h1>
                    <p className="text-gray-600 mt-1">Completa tu información</p>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <nav className="text-sm text-gray-600">
                        <Link to="/" className="hover:text-purpleOiches transition-colors">Inicio</Link>
                        <span className="mx-2">›</span>
                        <Link to={`/users/account/${userId}`} className="hover:text-purpleOiches transition-colors">Mi cuenta</Link>
                        <span className="mx-2">›</span>
                        <span className="text-gray-800 font-medium">Configuración</span>
                    </nav>
                    
                    {/* Botón volver a mis anuncios */}
                    <Link
                        to={`/users/account/${userId}`}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-purpleOiches 
                                 text-purpleOiches font-medium rounded-lg hover:bg-purpleOiches hover:text-white
                                 transition-all duration-200 text-sm w-fit"
                    >
                        ← Volver a mis anuncios
                    </Link>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="max-w-7xl mx-auto px-4 pb-6 sm:pb-12">
                <div className="flex flex-col xl:flex-row gap-12">
                    {/* Formulario de facturación */}
                    <div className="flex-1 max-w-4xl">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            {/* Header de la tarjeta */}
                            <div className="px-6 py-5 border-b">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purpleOiches rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">Datos de Facturación</h2>
                                        <p className="text-sm text-gray-600">Información requerida para procesar pagos</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contenido del formulario */}
                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Información Empresarial */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
                                            <svg className="w-4 h-4 text-purpleOiches" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Información Empresarial
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label htmlFor="company_name" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                    <span>Empresa:*</span>
                                                </label>
                                                <input
                                                    id="company_name"
                                                    type="text"
                                                    name="company_name"
                                                    required
                                                    placeholder="Nombre de la empresa"
                                                    value={companyDetails.company_name}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                             focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                             hover:border-gray-400 transition-all duration-200
                                                             bg-white shadow-sm"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label htmlFor="tax_id" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                    <span>NIF/CIF:*</span>
                                                </label>
                                                <input
                                                    id="tax_id"
                                                    type="text"
                                                    name="tax_id"
                                                    placeholder="NIF o CIF de la empresa"
                                                    required
                                                    value={companyDetails.tax_id}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                             focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                             hover:border-gray-400 transition-all duration-200
                                                             bg-white shadow-sm"
                                                />
                                            </div>
                                        </div>

                                       

                                    {/* Dirección Fiscal */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
                                            <svg className="w-4 h-4 text-purpleOiches" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Dirección Fiscal
                                        </h3>
                                        
                                        <div className="space-y-1">
                                            <label htmlFor="billing_address" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                <span>Dirección:*</span>
                                            </label>
                                            <input
                                                id="billing_address"
                                                type="text"
                                                name="billing_address"
                                                placeholder="Dirección de la empresa"
                                                required
                                                value={companyDetails.billing_address}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                         focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                         hover:border-gray-400 transition-all duration-200
                                                         bg-white shadow-sm"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label htmlFor="city" className="flex items-center gap-2 text-sm font-medium text-gray-700">
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
                                                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                             focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                             hover:border-gray-400 transition-all duration-200
                                                             bg-white shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label htmlFor="postal_code" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                    <span>Código Postal:*</span>
                                                </label>
                                                <input
                                                    id="postal_code"
                                                    type="text"
                                                    name="postal_code"
                                                    placeholder="Código Postal"
                                                    required
                                                    value={companyDetails.postal_code}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                             focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                             hover:border-gray-400 transition-all duration-200
                                                             bg-white shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Información de Contacto */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
                                            <svg className="w-4 h-4 text-purpleOiches" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Información de Contacto
                                        </h3>
                                         <div className="space-y-1">
                                            <label htmlFor="contact_name" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                <span>Nombre de contacto:</span>
                                            </label>
                                            <input
                                                id="contact_name"
                                                type="text"
                                                name="contact_name"
                                                placeholder="Nombre de contacto"
                                                value={companyDetails.contact_name}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                         focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                         hover:border-gray-400 transition-all duration-200
                                                         bg-white shadow-sm"
                                            />
                                        </div>
                                    </div>
                                        
                                        <div className="space-y-1">
                                            <label htmlFor="contact_phone" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                <span>Teléfono:</span>
                                            </label>
                                            <input
                                                id="contact_phone"
                                                type="tel"
                                                name="contact_phone"
                                                placeholder="Teléfono de contacto"
                                                value={companyDetails.contact_phone}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                                                         focus:border-purpleOiches focus:ring-2 focus:ring-purple-100
                                                         hover:border-gray-400 transition-all duration-200
                                                         bg-white shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                                <p className="text-red-700 text-sm font-medium">{error}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Botón de Guardar */}
                                    <div className="pt-6 border-t border-gray-200">
                                        <button
                                            type="submit"
                                            className="w-full bg-purpleOiches hover:bg-purple-700 text-white 
                                                     font-semibold py-3 px-6 rounded-lg transition-all duration-200 
                                                     shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                                                     focus:ring-4 focus:ring-purple-200
                                                     flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                            </svg>
                                            Guardar datos
                                        </button>
                                    </div>

                                    {/* Nota de privacidad */}
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-1">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                Datos protegidos según nuestra
                                            </span>
                                            <Link to="/privacy" className="text-purpleOiches hover:underline">
                                                política de privacidad
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar de configuración */}
                    <div className="flex-1 max-w-md">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-0">
                            <div className="px-6 py-4 border-b">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-purpleOiches" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Configuración de Cuenta
                                </h3>
                            </div>
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