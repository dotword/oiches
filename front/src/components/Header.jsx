import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import logoBlack from '../assets/Horizontal_negro.webp';
import Menu from './Menu';

const Header = ({ txt }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <header className="relative flex flex-col items-center justify-between pt-7 pb-4 px-6 bg-hero-image bg-cover bg-bottom md:bg-none md:max-w-7xl md:mx-auto">
            <nav className="self-end md:flex md:justify-between md:mb-5 md:w-11/12 md:mx-auto">
                {/* Logo en pantallas grandes */}
                <Link to="/" className="max-md:hidden">
                    <img src={logoBlack} alt="logo" className="h-10" />
                </Link>

                {/* Menú móvil */}
                <div className="md:hidden flex justify-between items-center w-full px-6">
                    <RxHamburgerMenu
                        className="text-3xl cursor-pointer text-white"
                        onClick={() => setIsNavOpen(true)}
                    />
                </div>

                {/* Fondo oscurecido para el menú móvil */}
                {isNavOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20"
                        onClick={() => setIsNavOpen(false)}
                    ></div>
                )}

                {/* Contenedor del menú móvil */}
                <div
                    className={`fixed top-0 right-0 w-[85%] h-full bg-white z-30 transform transition-transform duration-500 ${
                        isNavOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    {/* Logo y botón de cierre */}
                    <div className="flex flex-col items-center p-6">
                        <Link to="/">
                            <img
                                src={logoBlack}
                                alt="logo"
                                className="h-10  mt-12"
                            />
                        </Link>
                        <IoClose
                            className="absolute top-4 right-4 text-3xl cursor-pointer"
                            onClick={() => setIsNavOpen(false)}
                        />
                    </div>

                    {/* Menú */}
                    <div className="pt-0 px-6">
                        <Menu isMobile={true} />
                    </div>
                </div>
            </nav>

            {/* Línea divisora */}
            <hr className="w-full max-md:hidden" />

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
