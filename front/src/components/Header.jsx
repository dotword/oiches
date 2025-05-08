import { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import logoBlack from '../assets/Horizontal_negro.webp';
import logoWhite from '../assets/Horizontal_blanco.webp';
import Menu from './Menu';

const Header = ({ txt }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    // Bloqueo/desbloqueo del scroll en el body
    useEffect(() => {
        if (isNavOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Limpiar estilo al desmontar el componente
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isNavOpen]);

    return (
        <header className="flex flex-col items-center justify-between pt-7 pb-4 px-6 bg-hero-image bg-cover bg-bottom lg:bg-none lg:max-w-7xl lg:mx-auto">
            <nav className="self-end items-center lg:flex lg:justify-between lg:mb-3 lg:mx-auto lg:w-full xl:mx-auto xl:w-11/12">
                <a href="/" className="max-lg:hidden">
                    <img
                        src={logoBlack}
                        alt="logo"
                        className="max-w-36"
                        loading="lazy"
                    />
                </a>
                <section className="MOBILE-MENU flex lg:hidden">
                    <div
                        className="HAMBURGER-ICON"
                        onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                        <RxHamburgerMenu className="text-3xl cursor-pointer text-white" />
                    </div>

                    {isNavOpen && (
                        <div
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20"
                            onClick={() => setIsNavOpen(false)}
                        ></div>
                    )}

                    <div
                        className={`fixed top-0 right-0 bottom-0 w-full sm:w-3/4 h-screen bg-white z-20 flex flex-col items-center justify-start transform transition-transform duration-300 ${
                            isNavOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <div
                            className="absolute top-0 right-0 p-4"
                            onClick={() => setIsNavOpen(false)}
                        >
                            <IoClose className="text-3xl cursor-pointer" />
                        </div>

                        <div className="flex flex-col items-center justify-between mt-11 h-[calc(100vh-3rem)] uppercase">
                            <Menu mobile />
                        </div>
                    </div>
                </section>

                <div className="DESKTOP-MENU hidden space-x-6 lg:flex lg:items-baseline lg:space-x-3 xl:space-x-6">
                    <Menu />
                </div>
            </nav>
            <a href="/" className="mt-1 mb-4 lg:hidden">
                <img
                    src={logoWhite}
                    alt="logo"
                    className="max-w-48"
                    loading="lazy"
                />
            </a>
            {txt ? (
                <h1 className="text-white mt-5 mb-4 text-2xl/8 font-semibold text-center w-4/5 lg:mt-12 lg:text-black">
                    {txt}
                </h1>
            ) : null}

            {txt ? (
                <span className="relative w-full lg:hidden">
                    <span
                        className="block absolute bg-yellowOiches w-6 h-2 bottom-0 right-0"
                        aria-hidden="true"
                    ></span>
                    <span
                        className="block absolute bg-yellowOiches w-2 h-6 bottom-0 right-0"
                        aria-hidden="true"
                    ></span>
                </span>
            ) : null}
        </header>
    );
};

export default Header;

// const Header = ({ txt }) => {
//     const [isNavOpen, setIsNavOpen] = useState(false);

//     // Bloqueo/desbloqueo del scroll en el body
//     useEffect(() => {
//         if (isNavOpen) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'auto';
//         }

//         // Limpiar estilo al desmontar el componente
//         return () => {
//             document.body.style.overflow = 'auto';
//         };
//     }, [isNavOpen]);

//     return (
//         <header className="flex flex-col items-center justify-between pt-7 pb-4 px-6 bg-hero-image bg-cover bg-bottom lg:bg-none lg:max-w-7xl lg:mx-auto">
//             <nav className="self-end lg:flex lg:justify-between lg:mb-3 lg:w-[97%] lg:mx-auto lg:w-11/12">
//                 <a href="/" className="max-lg:hidden">
//                     <img src={logoBlack} alt="logo" className="max-w-36" />
//                 </a>
//                 <section className="MOBILE-MENU flex lg:hidden">
//                     <div
//                         className="HAMBURGER-ICON"
//                         onClick={() => setIsNavOpen((prev) => !prev)}
//                     >
//                         <RxHamburgerMenu className="text-3xl cursor-pointer text-white" />
//                     </div>

//                     {isNavOpen && (
//                         <div
//                             className="fixed inset-0 bg-black bg-opacity-70 z-10"
//                             onClick={() => setIsNavOpen(false)}
//                         ></div>
//                     )}

//                     <div
//                         className={`fixed top-0 right-0 bottom-0 w-10/12 max-w-[85%] h-screen bg-white z-20 flex flex-col items-center justify-start transform transition-transform duration-300 ${
//                             isNavOpen ? 'translate-x-0' : 'translate-x-full'
//                         }`}
//                     >
//                         <div
//                             className="absolute top-0 right-0 p-4"
//                             onClick={() => setIsNavOpen(false)}
//                         >
//                             <IoClose className="text-3xl cursor-pointer" />
//                         </div>

//                         <a href="/" className="pt-4 mt-8">
//                             <img
//                                 src={logoBlack}
//                                 alt="logo"
//                                 className="max-w-48"
//                             />
//                         </a>

//                         <div className="flex flex-col items-center justify-between text-xl font-semibold h-[calc(100vh-12rem)]">
//                             <Menu mobile />
//                         </div>
//                     </div>
//                 </section>

//                 <div className="DESKTOP-MENU hidden space-x-6 lg:flex lg:items-baseline lg:space-x-10">
//                     <Menu />
//                 </div>
//             </nav>
//             <a href="/" className="mt-1 mb-4 lg:hidden">
//                 <img src={logoWhite} alt="logo" className="max-w-48" />
//             </a>
//             {txt ? (
//                 <h1 className="text-white mt-5 mb-4 text-2xl/8 font-semibold text-center w-4/5 lg:mt-12 lg:text-black">
//                     {txt}
//                 </h1>
//             ) : null}

//             {txt ? (
//                 <span className="relative w-full lg:hidden">
//                     <span
//                         className="block absolute bg-yellowOiches w-6 h-2 bottom-0 right-0"
//                         aria-hidden="true"
//                     ></span>
//                     <span
//                         className="block absolute bg-yellowOiches w-2 h-6 bottom-0 right-0"
//                         aria-hidden="true"
//                     ></span>
//                 </span>
//             ) : null}
//         </header>
//     );
// };

// export default Header;
