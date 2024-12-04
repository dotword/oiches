// import { useState } from 'react';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import { IoClose } from 'react-icons/io5';
// import { Link } from 'react-router-dom';
// import logoBlack from '../assets/Horizontal_negro.webp';
// import Menu from './Menu';

// const Header = ({ txt }) => {
//     const [isNavOpen, setIsNavOpen] = useState(false);

//     return (
//         <header className="relative flex flex-col items-center justify-between pt-7 pb-4 px-6 bg-hero-image bg-cover bg-bottom md:bg-none md:max-w-7xl md:mx-auto">
//             <nav className="self-end md:flex md:justify-between md:mb-5 md:w-11/12 md:mx-auto">
//                 {/* Logo en pantallas grandes */}
//                 <Link to="/" className="max-md:hidden">
//                     <img src={logoBlack} alt="logo" className="h-10" />
//                 </Link>

//                 {/* Menú móvil */}
//                 <div className="md:hidden flex justify-between items-center w-full px-6">
//                     <RxHamburgerMenu
//                         className="text-3xl cursor-pointer text-white"
//                         onClick={() => setIsNavOpen(true)}
//                     />
//                 </div>

//                 {/* Fondo oscurecido para el menú móvil */}
//                 {isNavOpen && (
//                     <div
//                         className="fixed inset-0 bg-black bg-opacity-50 z-20"
//                         onClick={() => setIsNavOpen(false)}
//                     ></div>
//                 )}

//                 {/* Contenedor del menú móvil */}
//                 <div
//                     className={`fixed top-0 right-0 w-[85%] h-full bg-white z-30 transform transition-transform duration-500 ${
//                         isNavOpen ? 'translate-x-0' : 'translate-x-full'
//                     }`}
//                 >
//                     {/* Logo y botón de cierre */}
//                     <div className="flex flex-col items-center p-6">
//                         <Link to="/">
//                             <img
//                                 src={logoBlack}
//                                 alt="logo"
//                                 className="h-10  mt-12"
//                             />
//                         </Link>
//                         <IoClose
//                             className="absolute top-4 right-4 text-3xl cursor-pointer"
//                             onClick={() => setIsNavOpen(false)}
//                         />
//                     </div>

//                     {/* Menú */}
//                     <div className="pt-0 px-6">
//                         <Menu isMobile={true} />
//                     </div>
//                 </div>
//             </nav>

//             {/* Línea divisora */}
//             <hr className="w-full max-md:hidden" />

//             {/* Texto opcional */}
//             {txt && (
//                 <h1 className="text-white mt-5 mb-4 text-2xl/8 font-semibold text-center w-4/5 md:text-black md:mt-12">
//                     {txt}
//                 </h1>
//             )}
//         </header>
//     );
// };

// export default Header;

// import { useState } from 'react';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import { IoClose } from 'react-icons/io5';
// import { Link } from 'react-router-dom';
// import logoWhite from '../assets/Horizontal_blanco.webp';
// import logoBlack from '../assets/Horizontal_negro.webp';
// import Menu from './Menu';

// const Header = ({ txt }) => {
//     const [isNavOpen, setIsNavOpen] = useState(false);

//     return (
//         <header className="flex flex-col items-center justify-between pt-7 pb-4 px-6 bg-hero-image bg-cover bg-bottom md:bg-none md:max-w-7xl md:mx-auto">
//             {/* Menú horizontal para pantallas grandes */}
//             <nav className="self-end md:flex md:justify-between md:mb-5 md:w-11/12 md:mx-auto">
//                 <Link to="/" className="max-md:hidden">
//                     <img src={logoBlack} alt="logo" className="h-10" />
//                 </Link>
//                 <div className="hidden md:flex justify-between items-center space-x-6 lg:space-x-10">
//                     <Menu isMobile={false} />
//                 </div>
//             </nav>

//             {/* Menú móvil */}
//             <div className="md:hidden flex justify-between items-center w-full px-6">
//                 <Link to="/" className="flex items-center">
//                     <img src={logoWhite} alt="logo" className="h-10" />
//                 </Link>
//                 <div
//                     className="HAMBURGER-ICON space-y-1.5"
//                     onClick={() => setIsNavOpen((prev) => !prev)}
//                 >
//                     <RxHamburgerMenu className="text-3xl cursor-pointer text-white" />
//                 </div>
//             </div>

//             {/* Fondo oscurecido y menú móvil */}
//             {isNavOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 z-20"
//                     onClick={() => setIsNavOpen(false)}
//                 ></div>
//             )}
//             <div
//                 className={`fixed top-0 right-0 w-[85%] h-full bg-white z-30 transform transition-transform duration-500 ${
//                     isNavOpen ? 'translate-x-0' : 'translate-x-full'
//                 }`}
//             >
//                 {/* Logo y botón de cierre */}
//                 <div className="flex flex-col items-center p-6">
//                     <Link to="/">
//                         <img
//                             src={logoBlack}
//                             alt="logo"
//                             className="h-10 mb-4 mt-12"
//                         />
//                     </Link>
//                     <IoClose
//                         className="absolute top-4 right-4 text-3xl cursor-pointer"
//                         onClick={() => setIsNavOpen(false)}
//                     />
//                 </div>

//                 {/* Menú móvil */}
//                 <div className="pt-6 px-6">
//                     <Menu isMobile={true} />
//                 </div>
//             </div>

//             {/* Línea divisoria */}
//             <hr className="w-full max-md:hidden" />

//             {/* Texto opcional */}
//             {txt && (
//                 <h1 className="text-white mt-5 mb-4 text-2xl/8 font-semibold text-center w-4/5 md:text-black md:mt-12">
//                     {txt}
//                 </h1>
//             )}
//         </header>
//     );
// };

// export default Header;

// import { useState } from 'react';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import { IoClose } from 'react-icons/io5';
// import logoWhite from '../assets/Horizontal_blanco.webp';
// import logoBlack from '../assets/Horizontal_negro.webp';
// import Menu from './Menu';

// const Header = ({ txt }) => {
//     const [isNavOpen, setIsNavOpen] = useState(false);

//     return (
//         <header className="flex flex-col items-center justify-between pt-7 pb-4 px-6 bg-hero-image bg-cover bg-bottom md:bg-none md:max-w-7xl md:mx-auto">
//             <nav className="self-end md:flex md:justify-between md:mb-5 md:w-11/12 md:mx-auto">
//                 <a href="/" className="max-md:hidden">
//                     <img src={logoBlack} alt="logo" className="max-w-36" />
//                 </a>
//                 <section className="MOBILE-MENU flex md:hidden">
//                     <div
//                         className="HAMBURGER-ICON space-y-1.5"
//                         onClick={() => setIsNavOpen((prev) => !prev)}
//                     >
//                         <RxHamburgerMenu className="text-3xl cursor-pointer text-white" />
//                     </div>

//                     <div
//                         className={
//                             isNavOpen
//                                 ? 'flex fixed w-full h-screen top-0 left-0 bg-white z-20 flex-col items-center justify-evenly'
//                                 : 'hidden'
//                         }
//                     >
//                         <div
//                             className="absolute top-0 right-0 px-8 py-8"
//                             onClick={() => setIsNavOpen(false)}
//                         >
//                             <IoClose className="text-3xl cursor-pointer" />
//                         </div>
//                         <div className="flex flex-col items-center justify-between min-h-[250px]">
//                             <Menu />
//                         </div>
//                     </div>
//                 </section>

//                 <div className="DESKTOP-MENU hidden space-x-6 md:flex md:items-baseline lg:space-x-10">
//                     <Menu />
//                 </div>
//             </nav>
//             <hr className="w-full max-md:hidden" />
//             <a href="/" className="mt-6 md:hidden">
//                 <img src={logoWhite} alt="logo" className="max-w-48" />
//             </a>
//             {txt ? (
//                 <h1 className="text-white mt-5 mb-4 text-2xl/8 font-semibold text-center w-4/5 md:text-black md:mt-12">
//                     {txt}
//                 </h1>
//             ) : (
//                 ''
//             )}

//             {txt ? (
//                 <span className="relative w-full md:hidden">
//                     <span
//                         className="block absolute bg-yellowOiches w-6 h-2 bottom-0 right-0"
//                         aria-hidden="true"
//                     ></span>
//                     <span
//                         className="block absolute bg-yellowOiches w-2 h-6 bottom-0 right-0"
//                         aria-hidden="true"
//                     ></span>
//                 </span>
//             ) : (
//                 ''
//             )}
//         </header>
//     );
// };

// export default Header;

import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/Horizontal_blanco.webp';
import logoBlack from '../assets/Horizontal_negro.webp';
import Menu from './Menu';

const Header = ({ txt }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <header className="flex flex-col items-center justify-between pt-7 pb-4 px-6 bg-hero-image bg-cover bg-bottom md:bg-none md:max-w-7xl md:mx-auto">
            {/* Menú horizontal para escritorio */}
            <nav className="hidden md:flex justify-between items-center w-full px-10 py-4 bg-white rounded-lg">
                <Link to="/" className="flex items-center">
                    <img src={logoBlack} alt="logo" className="h-10" />
                </Link>
                <div className="flex space-x-6">
                    <Menu isMobile={false} />
                </div>
            </nav>

            {/* Menú móvil */}
            <div className="md:hidden flex justify-between items-center w-full px-6">
                <Link to="/" className="flex items-center">
                    <img src={logoWhite} alt="logo" className="h-10" />
                </Link>
                <RxHamburgerMenu
                    className="text-3xl cursor-pointer text-white"
                    onClick={() => setIsNavOpen(true)}
                />
            </div>

            {/* Fondo oscurecido y menú móvil */}
            {isNavOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setIsNavOpen(false)}
                ></div>
            )}
            <div
                className={`fixed top-0 right-0 w-[85%] h-full bg-white z-30 transform transition-transform duration-500 ${
                    isNavOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Logo y botón de cierre */}
                <div className="flex flex-col items-center p-6 mt-8">
                    <Link to="/">
                        <img src={logoBlack} alt="logo" className="h-10" />
                    </Link>
                    <IoClose
                        className="absolute top-4 right-4 text-3xl cursor-pointer"
                        onClick={() => setIsNavOpen(false)}
                    />
                </div>

                {/* Menú móvil */}
                <div className="pt-6 px-6">
                    <Menu isMobile={true} />
                </div>
            </div>

            {/* Texto opcional */}
            {txt && (
                <h1 className="text-white mt-5 mb-4 text-2xl/8 font-semibold text-center w-4/5 md:text-black md:mt-12">
                    {txt}
                </h1>
            )}
        </header>
    );
};

export default Header;
