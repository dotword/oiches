import { NavLink } from 'react-router-dom';
import logoWhite from '../assets/Horizontal_blanco.webp';
import { FaEnvelope } from 'react-icons/fa6';
import { FaPhoneVolume } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black">
            <div className=" text-greyOiches text-xs mt-12 w-11/12 max-w-7xl mx-auto pt-10 pb-6 md:grid md:grid-cols-2 md:gap-x-12">
                <section className="mb-6">
                    <a
                        href="/"
                        className="flex justify-center mb-6 md:justify-start md:mb-4"
                    >
                        <img
                            src={logoWhite}
                            alt="logo"
                            className="max-w-48 md:max-w-32"
                        />
                    </a>
                    <p className="mb-6">
                        <b>Oiches</b> es una innovadora plataforma diseñada para
                        facilitar la conexión entre salas de conciertos y grupos
                        musicales...{' '}
                        <a href="/" className="text-yellowOiches">
                            Saber más
                        </a>
                    </p>
                    <div className="flex flex-wrap justify-between gap-4 mx-auto max-w-80 md:ml-0">
                        <div className="flex gap-4 items-center">
                            <FaPhoneVolume className="text-lg text-white" />
                            <p className="flex flex-col gap-1">
                                <span>¿Hablamos?</span>
                                <span className="italic text-white font-semibold">
                                    555-437-2766
                                </span>
                            </p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <FaEnvelope className="text-lg text-white" />
                            <p className="flex flex-col gap-1">
                                <span>Contacta con nosotros</span>
                                <span className="italic text-white font-semibold">
                                    hola@oiches.es
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
                <section className="mb-6 md:mt-5">
                    <p className="text-white font-semibold mb-2">Newsletter</p>
                    <p>
                        Be the first one to know about discounts, offers and
                        events. Unsubscribe whenever you like.
                    </p>
                    <div className="relative mt-4 mx-auto max-w-80">
                        <input
                            type="button"
                            value="Tu email"
                            className="bg-greyOiches/[.5] w-full text-left px-3 py-2 rounded-2xl text-white h-10"
                        />
                        <button
                            type="submit"
                            className="bg-purpleOiches text-white px-2 py-1 rounded-2xl absolute h-4/5 right-3 top-1 font-semibold min-w-16"
                        >
                            Enviar
                        </button>
                    </div>
                    <div className="mt-8 flex justify-center gap-4 text-white text-xl">
                        <FaFacebook />
                        <FaXTwitter />
                        <FaInstagram />
                        <FaYoutube />
                    </div>
                </section>
                <section className="mb-6 flex flex-col gap-3 items-center text-sm md:flex-row">
                    <NavLink to={'/'} className="hover:text-yellowOiches">
                        Sobre nosotros
                    </NavLink>
                    <NavLink to={'/'} className="hover:text-yellowOiches">
                        Músicos
                    </NavLink>
                    <NavLink to={'/salas'} className="hover:text-yellowOiches">
                        Salas
                    </NavLink>
                    <NavLink to={'/users'} className="hover:text-yellowOiches">
                        Mi cuenta
                    </NavLink>
                </section>
                <section className="mt-8 md:mt-0 md:mb-6">
                    <p className="flex items-center justify-center gap-2">
                        <FaRegCopyright /> 2024, Todos los derechos reservados
                    </p>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
