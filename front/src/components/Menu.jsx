import { useState, useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { NavLink } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import logoBlack from '../assets/Horizontal_negro.webp';

const Menu = ({ mobile }) => {
    const { signOut, userLogged } = useContext(AuthContext);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openDropdownPlus, setOpenDropdownPlus] = useState(false);

    // Clases de enlace: móvil vs escritorio con espaciado y wrap
    const linkClassName = mobile
        ? 'block w-full py-3 px-6 text-center font-semibold relative group overflow-hidden'
        : 'inline-block px-4 py-2 font-medium whitespace-nowrap hover:text-purpleOiches';

    const backgroundClassName = mobile
        ? 'absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg rounded transform translate-x-[200%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out'
        : '';

    const textClassName = mobile
        ? 'relative z-10 flex-grow text-black group-hover:text-white'
        : '';

    return (
        <>
            <a href="/" className="lg:hidden">
                <img
                    src={logoBlack}
                    alt="logo"
                    className="max-w-36"
                    loading="lazy"
                />
            </a>

            {/* Otros Enlaces */}
            <NavLink to="/clasificados" className={linkClassName}>
                {mobile && <span className={backgroundClassName}></span>}
                <span className={textClassName}>Clasificados</span>
            </NavLink>
            <NavLink to="/salas" className={linkClassName}>
                {mobile && <span className={backgroundClassName}></span>}
                <span className={textClassName}>Salas</span>
            </NavLink>
            <NavLink to="/grupos" className={linkClassName}>
                {mobile && <span className={backgroundClassName}></span>}
                <span className={textClassName}>Músicos</span>
            </NavLink>
            <NavLink to="/agencias" className={linkClassName}>
                {mobile && <span className={backgroundClassName}></span>}
                <span className={textClassName}>Agencias</span>
            </NavLink>
            <NavLink to="/conciertos" className={linkClassName}>
                {mobile && <span className={backgroundClassName}></span>}
                <span className={textClassName}>Conciertos</span>
            </NavLink>

            {/* Dropdown Plus */}
            <div
                className={`relative ${
                    mobile ? 'w-full text-center' : 'inline-flex'
                }`}
                onMouseEnter={() => !mobile && setOpenDropdownPlus(true)}
                onMouseLeave={() => !mobile && setOpenDropdownPlus(false)}
            >
                <button
                    onClick={() =>
                        mobile && setOpenDropdownPlus((prev) => !prev)
                    }
                    className="w-full py-3 text-center relative overflow-hidden group flex items-center justify-center max-lg:uppercase max-lg:hover:text-white font-medium max-lg:font-semibold"
                >
                    {mobile && <span className={backgroundClassName}></span>}
                    <span className={textClassName}>+ Oiches</span>
                    <FiChevronDown
                        className={`max-lg:absolute max-lg:right-0 ml-2 transition-transform duration-300 ${
                            openDropdownPlus ? 'rotate-180' : 'rotate-0'
                        }`}
                    />
                </button>

                {/* Dropdown Items */}
                {openDropdownPlus && (
                    <div
                        className={`${
                            mobile
                                ? 'bg-gray-50 left-0 right-0 fixed'
                                : 'top-full w-56 bg-white left-0 absolute'
                        } shadow-lg font-medium rounded z-20 flex flex-col`}
                    >
                        <NavLink to="/noticeboard" className={linkClassName}>
                            {mobile && (
                                <span className={backgroundClassName}></span>
                            )}
                            <span className={textClassName}>Se busca</span>
                        </NavLink>
                        <NavLink to="/contacto" className={linkClassName}>
                            {mobile && (
                                <span className={backgroundClassName}></span>
                            )}
                            <span className={textClassName}>Contacto</span>
                        </NavLink>
                        {/* Dropdown Parent */}
                        <div
                            className={`relative ${
                                mobile ? 'w-full text-center' : 'inline-flex'
                            }`}
                            onMouseEnter={() =>
                                !mobile && setOpenDropdown(true)
                            }
                            onMouseLeave={() =>
                                !mobile && setOpenDropdown(false)
                            }
                        >
                            <button
                                onClick={() =>
                                    mobile && setOpenDropdown((prev) => !prev)
                                }
                                className="w-full py-2 px-4 text-center relative overflow-hidden group flex items-center justify-center max-lg:uppercase max-lg:hover:text-white lg:text-left lg:justify-normal font-medium max-lg:font-semibold"
                            >
                                {mobile && (
                                    <span
                                        className={backgroundClassName}
                                    ></span>
                                )}
                                <span className={textClassName}>Concursos</span>
                                <FiChevronDown
                                    className={`max-lg:absolute max-lg:right-0 ml-2 transition-transform duration-300 ${
                                        openDropdown ? 'rotate-180' : 'rotate-0'
                                    }`}
                                />
                            </button>

                            {/* Dropdown Items */}
                            {openDropdown && (
                                <div
                                    className={`${
                                        mobile
                                            ? 'bg-gray-50 left-0 right-0 fixed'
                                            : 'top-full w-56 bg-white left-0 absolute'
                                    } shadow-lg font-medium rounded z-20 flex flex-col`}
                                >
                                    <NavLink
                                        to="/concurso/concierto-oiches"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap"
                                    >
                                        Ganadores Oiches 2025
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Dropdown Parent */}
            <div
                className={`relative ${
                    mobile ? 'w-full text-center' : 'inline-flex'
                }`}
                onMouseEnter={() => !mobile && setOpenDropdown(true)}
                onMouseLeave={() => !mobile && setOpenDropdown(false)}
            >
                <button
                    onClick={() => mobile && setOpenDropdown((prev) => !prev)}
                    className="w-full mt-2 py-3 text-center relative overflow-hidden group flex items-center justify-center max-lg:uppercase max-lg:hover:text-white font-medium max-lg:font-semibold"
                >
                    {mobile && <span className={backgroundClassName}></span>}
                    <span className={textClassName}>Concurso</span>
                    <FiChevronDown
                        className={`max-lg:absolute max-lg:right-0 ml-2 transition-transform duration-300 ${
                            openDropdown ? 'rotate-180' : 'rotate-0'
                        }`}
                    />
                </button>

                {/* Dropdown Items */}
                {openDropdown && (
                    <div
                        className={`${
                            mobile
                                ? 'bg-gray-50 left-0 right-0 fixed'
                                : 'top-full w-56 bg-white left-0 absolute'
                        } shadow-lg font-medium rounded z-20 flex flex-col`}
                    >
                        <NavLink
                            to="/concurso/concierto-oiches"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap"
                        >
                            Concierto Oiches 2025
                        </NavLink>
                    </div>
                )}
            </div>

            {/* Enlaces de Autenticación */}
            {!userLogged ? (
                <>
                    <NavLink
                        to="/login"
                        className="max-md:py-2 font-medium text-purpleOiches hover:text-black lg:px-4 lg:py-2"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className="btn-account max-lg:mb-8 max-lg:mt-2 font-medium"
                    >
                        Registro
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink
                        to={`/users/account/${userLogged.id}`}
                        className="btn-account font-medium"
                    >
                        Mi perfil
                    </NavLink>
                    <NavLink
                        to="/login"
                        onClick={() => {
                            signOut();
                        }}
                        className="py-2 font-medium text-purpleOiches hover:text-black lg:px-4 max-lg:mb-8 max-lg:mt-2"
                    >
                        Logout
                    </NavLink>
                </>
            )}
        </>
    );
};

export default Menu;
