// import { useState } from 'react';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import { IoClose } from 'react-icons/io5';
// import logoBlack from '../assets/Horizontal_negro.webp';
// import Menu from './Menu';

// const HeaderHero = () => {
//     const [isNavOpen, setIsNavOpen] = useState(false);

//     return (
//         <header className="flex flex-col items-center justify-between pt-7 pb-4 px-6 md:max-w-7xl md:mx-auto">
//             <nav className="self-end md:flex md:justify-between md:mb-3 md:w-11/12 md:mx-auto">
//                 <a href="/" className="max-md:hidden">
//                     <img src={logoBlack} alt="logo" className="max-w-36" />
//                 </a>
//                 <section className="MOBILE-MENU flex md:hidden">
//                     <div
//                         className="HAMBURGER-ICON space-y-1.5"
//                         onClick={() => setIsNavOpen((prev) => !prev)}
//                     >
//                         <RxHamburgerMenu className="text-3xl cursor-pointer" />
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
//             <a href="/" className="mt-1 mb-4 md:hidden">
//                 <img src={logoBlack} alt="logo" className="max-w-48" />
//             </a>
//         </header>
//     );
// };

// export default HeaderHero;

import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import logoBlack from '../assets/Horizontal_negro.webp';
import Menu from './Menu';

const HeaderHero = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <header className="flex flex-col items-center justify-between pt-7 pb-4 px-6 md:max-w-7xl md:mx-auto">
            <nav className="hidden md:flex justify-between items-center w-full px-10 py-4 bg-white">
                <a href="/">
                    <img src={logoBlack} alt="logo" className="h-10" />
                </a>
                <div className="flex space-x-6">
                    <Menu isMobile={false} />
                </div>
            </nav>

            {/* Menú móvil */}
            <div className="md:hidden flex justify-between items-center w-full px-6">
                <a href="/">
                    <img src={logoBlack} alt="logo" className="h-10" />
                </a>
                <RxHamburgerMenu
                    className="text-3xl cursor-pointer"
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
                <div className="flex flex-col items-center p-6">
                    <img
                        src={logoBlack}
                        alt="logo"
                        className="h-10 mb-4 mt-12"
                    />
                    <IoClose
                        className="absolute top-4 right-4 text-3xl cursor-pointer"
                        onClick={() => setIsNavOpen(false)}
                    />
                </div>

                {/* Aquí renderizamos el menú */}
                <div className="pt-6 px-6">
                    <Menu isMobile={true} />
                </div>
            </div>
        </header>
    );
};

export default HeaderHero;
