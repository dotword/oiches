import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context';
import logoWhite from '../assets/Horizontal_blanco.webp';
import { FaEnvelope } from 'react-icons/fa6';
// import { FaPhoneVolume } from 'react-icons/fa6';
// import { FaFacebook } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';
// import { FaInstagram } from 'react-icons/fa';
// import { FaYoutube } from 'react-icons/fa';
import { FaRegCopyright } from 'react-icons/fa';
const Footer = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <footer className="bg-black text-white pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-10 flex flex-col md:grid md:grid-cols-2 gap-x-20 gap-y-10 text-sm">
                {/* Columna izquierda */}
                <div className="flex flex-col items-start">
                    <a href="/" className="mb-6">
                        <img src={logoWhite} alt="logo" className="max-w-44" />
                    </a>
                    <p className="mb-6">
                        <b>Oiches</b> es una innovadora plataforma diseñada para
                        facilitar la conexión entre salas de conciertos y
                        músicos...{' '}
                        <a href="/sobre-oiches" className="text-yellowOiches">
                            Saber más
                        </a>
                    </p>
                    <div className="flex flex-col flex-wrap gap-x-12 gap-y-4 items-start md:flex-row">
                        {/* <div className="flex gap-4 items-center">
                            <FaPhoneVolume className="text-lg" />
                            <p className="flex flex-col gap-1">
                                <span>¿Hablamos?</span>
                                <span className="italic font-semibold">
                                    555-437-2766
                                </span>
                            </p>
                        </div> */}
                        <div className="flex gap-4 items-center">
                            <FaEnvelope className="text-lg" />
                            <p className="flex flex-col gap-1">
                                <span>Contacta con nosotros</span>
                                <span className="italic font-semibold">
                                    hola@oiches.com
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:text-right items-start md:items-end mt-0 md:mt-14">
                    <div className="flex flex-col md:flex-row my-2 items-start">
                        <NavLink
                            to={'/grupos'}
                            className="hover:text-yellowOiches mx-2 md:mx-2"
                        >
                            Músicos
                        </NavLink>
                        <NavLink
                            to={'/salas'}
                            className="hover:text-yellowOiches mx-2 md:mx-2"
                        >
                            Salas
                        </NavLink>
                        {currentUser ? (
                            <NavLink
                                to={'/users'}
                                className="hover:text-yellowOiches mx-2 md:mx-2"
                            >
                                Mi cuenta
                            </NavLink>
                        ) : (
                            ''
                        )}
                        <NavLink
                            to={'/sobre-oiches'}
                            className="hover:text-yellowOiches mx-2 md:mx-2"
                        >
                            Sobre Oiches
                        </NavLink>
                    </div>
                    <div className="flex flex-col md:flex-row my-2 items-start">
                        <NavLink
                            to={'/aviso-legal'}
                            className="hover:text-yellowOiches mx-2 md:mx-2"
                        >
                            Aviso Legal
                        </NavLink>
                        <NavLink
                            to={'/politica-privacidad'}
                            className="hover:text-yellowOiches mx-2 md:mx-2"
                        >
                            Política de privacidad
                        </NavLink>
                        <NavLink
                            to={'/politica-cookies'}
                            className="hover:text-yellowOiches mx-2 md:mx-2"
                        >
                            Política de cookies
                        </NavLink>
                    </div>
                    {/* <p className="font-semibold mb-2">Newsletter</p>
                    <p className="max-w-96">
                        Sé el primero en enterarte de nuestros eventos y
                        novedades. Date de baja cuando quieras.
                    </p>
                    <div className="relative mt-4 w-full">
                        <input
                            type="email"
                            placeholder="Tu email"
                            className="bg-greyOiches/[.5] w-full px-3 py-2 rounded-2xl text-white h-10"
                        />
                        <button
                            type="submit"
                            className="bg-purpleOiches text-white px-8 py-2 rounded-2xl absolute right-0 top-0 font-semibold"
                        >
                            Enviar
                        </button>
                    </div>
                    <div className="flex gap-4 mt-8 text-xl">
                        <FaFacebook />
                        <FaXTwitter />
                        <FaInstagram />
                        <FaYoutube />
                    </div> */}
                    <p className="flex items-start justify-start gap-2 mt-8">
                        <FaRegCopyright /> 2024 - Todos los derechos reservados
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
