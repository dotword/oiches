import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import logoBlack from '../assets/Horizontal_negro.webp';
import Menu from './Menu';

const HeaderHero = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <header className="flex flex-col items-center justify-between pt-7 pb-4 px-6 md:max-w-7xl md:mx-auto">
            <nav className="self-end md:flex md:justify-between md:mb-3 md:w-11/12 md:mx-auto">
                <a href="/" className="max-md:hidden">
                    <img src={logoBlack} alt="logo" className="max-w-36" />
                </a>
                <section className="MOBILE-MENU flex md:hidden">
                    <div
                        className="HAMBURGER-ICON space-y-1.5"
                        onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                        <RxHamburgerMenu className="text-3xl cursor-pointer" />
                    </div>

                    {isNavOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-10"
                            onClick={() => setIsNavOpen(false)}
                        ></div>
                    )}

                    <div
                        className={`fixed top-0 right-0 w-10/12 max-w-[85%] h-screen bg-white z-20 flex flex-col items-center justify-start transform transition-transform duration-300 space-y-4 pt-6 ${
                            isNavOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <div
                            className="absolute top-0 right-0 px-8 py-8"
                            onClick={() => setIsNavOpen(false)}
                        >
                            <IoClose className="text-3xl cursor-pointer" />
                        </div>

                        <a href="/" className="pt-4">
                            <img
                                src={logoBlack}
                                alt="logo"
                                className="max-w-48"
                            />
                        </a>

                        <div className="flex flex-col items-center justify-between text-xl font-semibold">
                            <Menu mobile />
                        </div>
                    </div>
                </section>

                <div className="DESKTOP-MENU hidden space-x-6 md:flex md:items-baseline lg:space-x-10">
                    <Menu />
                </div>
            </nav>
            <a href="/" className="mt-1 mb-4 md:hidden">
                <img src={logoBlack} alt="logo" className="max-w-48" />
            </a>
        </header>
    );
};

export default HeaderHero;
