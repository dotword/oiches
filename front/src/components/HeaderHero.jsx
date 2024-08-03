import { useState } from 'react';

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
                        <span className="block h-0.5 w-7 bg-black"></span>
                        <span className="block h-0.5 w-7 bg-black"></span>
                        <span className="block h-0.5 w-7 bg-black"></span>
                    </div>

                    <div
                        className={
                            isNavOpen
                                ? 'flex fixed w-full h-screen top-0 left-0 bg-white z-20 flex-col items-center justify-evenly'
                                : 'hidden'
                        }
                    >
                        <div
                            className="absolute top-0 right-0 px-8 py-8"
                            onClick={() => setIsNavOpen(false)}
                        >
                            <svg
                                className="h-8 w-8"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                        <div className="flex flex-col items-center justify-between min-h-[250px]">
                            <Menu />
                        </div>
                    </div>
                </section>

                <div className="DESKTOP-MENU hidden space-x-8 md:flex md:items-baseline">
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
