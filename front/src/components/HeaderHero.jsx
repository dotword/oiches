import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import logoBlack from '../assets/Horizontal_negro.webp';
import Menu from './Menu';

const HeaderHero = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <header className="flex flex-col items-center justify-between pt-7 pb-4 px-6 md:max-w-7xl md:mx-auto">
            <nav className="hidden md:flex justify-between items-center w-full px-10 py-4 bg-white">
                <Link to="/">
                    <img src={logoBlack} alt="logo" className="h-10" />
                </Link>
                <div className="flex space-x-6">
                    <Menu isMobile={false} />
                </div>
            </nav>

            {/* Menú móvil */}
            <div className="md:hidden flex justify-between items-center w-full px-6">
                <Link to="/">
                    <img src={logoBlack} alt="logo" className="h-10" />
                </Link>
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
        </header>
    );
};

export default HeaderHero;
