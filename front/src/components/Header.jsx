import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import logoBlack from '../assets/Horizontal_negro.webp';
import logoWhite from '../assets/Horizontal_blanco.webp';
import Menu from './Menu';

const Header = ({ txt }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <header className="flex flex-col items-center justify-between pt-7 pb-4 px-6 bg-hero-image bg-cover bg-bottom md:bg-none md:max-w-7xl md:mx-auto">
            <nav className="self-end md:flex md:justify-between md:mb-3 md:w-[97%] md:mx-auto lg:w-11/12">
                <a href="/" className="max-md:hidden">
                    <img src={logoBlack} alt="logo" className="max-w-36" />
                </a>
                <section className="MOBILE-MENU flex md:hidden">
                    <div
                        className="HAMBURGER-ICON"
                        onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                        <RxHamburgerMenu className="text-3xl cursor-pointer text-white" />
                    </div>

                    {isNavOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-70 z-10"
                            onClick={() => setIsNavOpen(false)}
                        ></div>
                    )}

                    <div
                        className={`fixed top-0 right-0 w-10/12 max-w-[85%] h-screen bg-white z-20 flex flex-col items-center justify-start transform transition-transform duration-300 ${
                            isNavOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <div
                            className="absolute top-0 right-0 p-4"
                            onClick={() => setIsNavOpen(false)}
                        >
                            <IoClose className="text-3xl cursor-pointer" />
                        </div>

                        <a href="/" className="pt-4 mt-12">
                            <img
                                src={logoBlack}
                                alt="logo"
                                className="max-w-48"
                            />
                        </a>

                        <div className="flex flex-col items-center justify-between text-xl font-semibold h-[calc(100vh-10rem)]">
                            <Menu mobile />
                        </div>
                    </div>
                </section>

                <div className="DESKTOP-MENU hidden space-x-6 md:flex md:items-baseline lg:space-x-10">
                    <Menu />
                </div>
            </nav>
            <a href="/" className="mt-1 mb-4 md:hidden">
                <img src={logoWhite} alt="logo" className="max-w-48" />
            </a>
            {txt ? (
                <h1 className="text-white mt-5 mb-4 text-2xl/8 font-semibold text-center w-4/5 md:mt-12">
                    {txt}
                </h1>
            ) : null}

            {txt ? (
                <span className="relative w-full md:hidden">
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
