// import { FaCheck } from 'react-icons/fa6';

// const PackagesDetails = () => {
//     return (
//         <div className="mx-auto mt-6 grid w-11/12 grid-cols-1 gap-8 md:grid-cols-2">
//             {/* Card 1 - Anuncio Básico */}
//             <div className="package-card group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
//                 <div className="flex items-center justify-between gap-x-4 mb-4">
//                     <h3 className="package-title">Anuncio básico</h3>
//                 </div>

//                 {/* Lista de características - altura fija */}
//                 <div className="flex-1 mb-4">
//                     <div className="text-sm leading-6 text-gray-200">
//                         <ul className="space-y-2 h-32">
//                             <li className="package-desc-item">
//                                 <FaCheck className="text-green-500" />
//                                 Título
//                             </li>
//                             <li className="package-desc-item">
//                                 <FaCheck className="text-green-500" />
//                                 Descripción
//                             </li>
//                             <li className="package-desc-item">
//                                 <FaCheck className="text-green-500" />
//                                 Imagen pequeña
//                             </li>
//                             <li className="package-desc-item">
//                                 <FaCheck className="text-green-500" />
//                                 Enlace a tu web - Contacto
//                             </li>
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Precio - posición fija */}
//                 <div className="mb-4">
//                     <p className="flex items-baseline justify-center gap-x-1 transform transition-all duration-300 group-hover:scale-110">
//                         <span className="text-4xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-300">
//                             20 €
//                         </span>
//                         <span className="text-sm font-semibold leading-6 text-gray-200 group-hover:text-indigo-400 transition-colors duration-300">
//                             /3 meses
//                         </span>
//                     </p>
//                 </div>

//                 {/* Descripción y opciones adicionales */}
//                 <div className="mt-auto">
//                     <ul className="space-y-3 text-base leading-6 text-gray-200">
//                         <li className="flex items-center justify-center gap-x-3">
//                             <div className="flex gap-2 flex-wrap justify-center">
//                                 <span className="package-buttons bg-blue-900/40 text-blue-200  border-blue-700/50">
//                                     6 meses: 35€
//                                 </span>
//                                 <span className="package-buttons bg-green-900/40 text-green-200  border-green-700/50">
//                                     1 año: 60€
//                                 </span>
//                             </div>
//                         </li>
//                     </ul>
//                 </div>
//             </div>

//             {/* Card 2 - Anuncio Destacado */}
//             <div className="package-card group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
//                 <div className="relative z-10 flex flex-col h-full">
//                     <div className="flex items-baseline justify-between gap-x-4 mb-4">
//                         <h3 className="package-title">Anuncio destacado</h3>
//                         {/* <span className="package-popular">
//                                 Más popular
//                             </span> */}
//                     </div>

//                     {/* Lista de características - altura fija */}
//                     <div className="flex-1 mb-4">
//                         <div className="text-sm leading-6 text-gray-200">
//                             <ul className="space-y-2 h-32">
//                                 <li className="package-desc-item">
//                                     <FaCheck className="text-green-500" />
//                                     Básico +
//                                 </li>
//                                 <li className="package-desc-item">
//                                     <FaCheck className="text-green-500" />
//                                     Siempre en primeras posiciones
//                                 </li>
//                                 <li className="package-desc-item">
//                                     <FaCheck className="text-green-500" />
//                                     Imagen principal grande
//                                 </li>
//                                 <li className="package-desc-item">
//                                     <FaCheck className="text-green-500" />
//                                     Fondo destacado en el listado
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>

//                     {/* Precio - posición fija */}
//                     <div className="mb-4">
//                         <p className="flex items-baseline justify-center gap-x-1 transform transition-all duration-300 group-hover:scale-110">
//                             <span className="text-4xl font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors duration-300">
//                                 30 €
//                             </span>
//                             <span className="text-sm font-semibold leading-6 text-gray-200 group-hover:text-indigo-400 transition-colors duration-300">
//                                 /3 meses
//                             </span>
//                         </p>
//                     </div>

//                     {/* Descripción y opciones adicionales */}
//                     <div className="mt-auto">
//                         <ul className="space-y-3 text-base leading-6 text-gray-200">
//                             <li className="flex items-center justify-center">
//                                 <div className="flex gap-2 flex-wrap justify-center">
//                                     <span className="package-buttons bg-blue-900/40 text-blue-200  border-blue-700/50">
//                                         6 meses: 50€
//                                     </span>
//                                     <span className="package-buttons bg-green-900/40 text-green-200  border-green-700/50">
//                                         1 año: 90€
//                                     </span>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PackagesDetails;

// import { FaCheck, FaStar } from 'react-icons/fa6';
// import { MdOutlineRocketLaunch } from "react-icons/md";
// import { FaCrown } from "react-icons/fa";



// const PackagesDetails = () => {
//     return (
//         <div className="mx-auto mt-6 mb-8">
//             <h2 className="text-center text-2xl font-light text-gray-400 mb-8">
//                 Elige tu plan de anuncio
//             </h2>
            
//             <div className="grid w-11/12 mx-auto grid-cols-1 gap-8 md:grid-cols-2">
//                 {/* Card 1 - Anuncio Básico */}
//                 <div className="relative bg-white rounded-2xl border border-purpleOiches p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
//                     {/* Icono superior */}
//                     <div className="flex justify-center mb-6 mt-4">
//                         <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
//                             <MdOutlineRocketLaunch className="text-purpleOiches text-3xl" />
//                         </div>
//                     </div>

//                     {/* Título */}
//                     <h3 className="text-center text-xl font-semibold text-gray-700 mb-6">
//                         Anuncio básico
//                     </h3>

//                     {/* Precio */}
//                     <div className="text-center mb-8">
//                         <span className="text-5xl font-semibold text-gray-800">20€</span>
//                         <span className="text-gray-500 ml-1">/ 3 meses</span>
//                     </div>

//                     {/* Características incluidas */}
//                     <div className="mb-8">
//                         <h4 className="text-sm font-medium text-gray-600 mb-4 text-center">
//                             Anuncio Básico Incluye
//                         </h4>
//                         <ul className="space-y-3">
//                             <li className="flex items-center gap-3 text-sm text-gray-600">
//                                 <FaCheck className="text-green-500 text-xs flex-shrink-0" />
//                                 Título
//                             </li>
//                             <li className="flex items-center gap-3 text-sm text-gray-600">
//                                 <FaCheck className="text-green-500 text-xs flex-shrink-0" />
//                                 Descripción
//                             </li>
//                             <li className="flex items-center gap-3 text-sm text-gray-600">
//                                 <FaCheck className="text-green-500 text-xs flex-shrink-0" />
//                                 Imagen pequeña
//                             </li>
//                             <li className="flex items-center gap-3 text-sm text-gray-600">
//                                 <FaCheck className="text-green-500 text-xs flex-shrink-0" />
//                                 Enlace a tu web - Contacto
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Opciones extendidas */}
//                     <div className="border-t border-gray-100 pt-6">
//                         <p className="text-center text-lg text-gray-500 mb-3">Opciones extendidas:</p>
//                         <div className="flex gap-2 justify-center flex-wrap">
//                             <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200">
//                                 6 meses: 35€
//                             </span>
//                             <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full border border-green-200">
//                                 1 año: 60€
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Card 2 - Anuncio Destacado */}
//                 <div className="relative bg-gradient-to-br from-black to-moradoOiches rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group text-white">
//                     {/* Badge "Más popular" */}
//                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                         <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-xs font-medium flex items-center gap-1">
//                             <FaStar className="text-yellow-300" />
//                             Más popular
//                         </div>
//                     </div>

//                     {/* Icono superior */}
//                     <div className="flex justify-center mb-6 mt-4">
//                         <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
//                             <FaCrown  className="text-yellow-300 text-3xl" />
//                         </div>
//                     </div>

//                     {/* Título */}
//                     <h3 className="text-center text-xl font-medium mb-6">
//                         Anuncio destacado
//                     </h3>

//                     {/* Precio */}
//                     <div className="text-center mb-8">
//                         <span className="text-5xl font-semibold">30€</span>
//                         <span className="text-purple-200 ml-1">/ 3 meses</span>
//                     </div>

//                     {/* Características incluidas */}
//                     <div className="mb-8">
//                         <h4 className="text-sm font-medium text-purple-200 mb-4 text-center">
//                             Anuncio Destacado Incluye
//                         </h4>
//                         <ul className="space-y-3">
//                             <li className="flex items-center gap-3 text-sm">
//                                 <FaCheck className="text-green-400 text-xs flex-shrink-0" />
//                                 Básico +
//                             </li>
//                             <li className="flex items-center gap-3 text-sm">
//                                 <FaCheck className="text-green-400 text-xs flex-shrink-0" />
//                                 Siempre en primeras posiciones
//                             </li>
//                             <li className="flex items-center gap-3 text-sm">
//                                 <FaCheck className="text-green-400 text-xs flex-shrink-0" />
//                                 Imagen principal grande
//                             </li>
//                             <li className="flex items-center gap-3 text-sm">
//                                 <FaCheck className="text-green-400 text-xs flex-shrink-0" />
//                                 Fondo destacado en el listado
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Opciones extendidas */}
//                     <div className="border-t border-purple-400/30 pt-6">
//                         <p className="text-center text-sm text-purple-200 mb-3">Opciones extendidas:</p>
//                         <div className="flex gap-2 justify-center flex-wrap">
//                             <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">
//                                 6 meses: 50€
//                             </span>
//                             <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">
//                                 1 año: 90€
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PackagesDetails;


import { FaCheck, FaStar } from 'react-icons/fa6';
import { FaCrown } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";

const PackagesDetails = () => {
    return (
        <div className="mx-auto mt-6 mb-8">
            <h2 className="text-center text-2xl font-light text-greyOiches mb-8">
                Elige tu plan de anuncio
            </h2>
            
            <div className="grid w-11/12 mx-auto grid-cols-1 gap-8 md:grid-cols-2">
                {/* Card 1 - Anuncio Básico */}
                <div className="relative bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
                    {/* Icono, título y precio en la misma línea */}
                    <div className="flex items-center gap-3 mb-6">
                        <MdOutlineRocketLaunch className="text-purpleOiches text-3xl" />
                        <h3 className="text-xl font-medium text-gray-700">
                            Anuncio básico
                        </h3>
                        <div className="ml-auto">
                            <span className="text-4xl font-light text-gray-800">20€</span>
                            <span className="text-greyOiches text-sm ml-1">/ 3 meses</span>
                        </div>
                    </div>

                    {/* Características incluidas */}
                    <div className="mb-8">
                        <h4 className="font-medium text-gray-700 mb-4">
                            Anuncio Básico Incluye
                        </h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <FaCheck className="text-green-500 text-xs flex-shrink-0" />
                                Título
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <FaCheck className="text-green-500 text-xs flex-shrink-0" />
                                Descripción
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <FaCheck className="text-green-500 text-xs flex-shrink-0" />
                                Imagen pequeña
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <FaCheck className="text-green-500 text-xs flex-shrink-0" />
                                Enlace a tu web - Contacto
                            </li>
                        </ul>
                    </div>

                    {/* Opciones extendidas */}
                    <div className="border-t border-gray-200 pt-6">
                        <p className="text-center text-xl text-greyOiches mb-3">Opciones extendidas:</p>
                        <div className="flex gap-2 justify-center flex-wrap">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200">
                                6 meses: 35€
                            </span>
                            <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full border border-green-200">
                                1 año: 60€
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card 2 - Anuncio Destacado */}
                <div className="relative bg-gradient-to-br from-footercolor to-moradoOiches rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group text-white">
                    {/* Badge "Más popular" */}
                    <div className="absolute -top-3 right-4">
                        <div className="bg-yellowOiches text-black px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <FaStar className="text-black" />
                            Más popular
                        </div>
                    </div>

                    {/* Icono, título y precio en la misma línea */}
                    <div className="flex items-center gap-3 mb-6 mt-1">
                        <FaCrown className="text-yellowOiches text-3xl" />
                        <h3 className="text-xl font-medium">
                            Anuncio destacado
                        </h3>
                        <div className="ml-auto">
                            <span className="text-4xl font-light">30€</span>
                            <span className="text-purple-200 text-sm ml-1">/ 3 meses</span>
                        </div>
                    </div>

                    {/* Características incluidas */}
                    <div className="mb-8">
                        <h4 className="font-medium text-white mb-4">
                            Anuncio Destacado Incluye
                        </h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-sm">
                                <FaCheck className="text-green-400 text-xs flex-shrink-0" />
                                Básico +
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <FaCheck className="text-green-400 text-xs flex-shrink-0" />
                                Siempre en primeras posiciones
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <FaCheck className="text-green-400 text-xs flex-shrink-0" />
                                Imagen principal grande
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <FaCheck className="text-green-400 text-xs flex-shrink-0" />
                                Fondo destacado en el listado
                            </li>
                        </ul>
                    </div>

                    {/* Opciones extendidas */}
                    <div className="border-t border-purple-400/30 pt-6">
                        <p className="text-center text-xl text-purple-200 mb-3">Opciones extendidas:</p>
                        <div className="flex gap-2 justify-center flex-wrap">
                            <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">
                                6 meses: 50€
                            </span>
                            <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">
                                1 año: 90€
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackagesDetails;