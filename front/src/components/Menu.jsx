import { useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context';
import { NavLink } from 'react-router-dom';

const Menu = ({ isMobile }) => {
    const { signOut, userLogged } = useContext(AuthContext);

    // Clases base para enlaces
    const linkClass = isMobile
        ? 'relative text-lg font-medium w-full text-center py-4 group'
        : 'relative font-medium inline-flex items-center group';

    const innerTextClass = isMobile
        ? 'relative z-10 transition-colors duration-500 group-hover:text-white'
        : 'relative z-10 transition-colors duration-500 group-hover:text-purpleOiches';

    const backgroundClass = isMobile
        ? 'absolute inset-0 bg-purpleOiches scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:scale-x-100'
        : '';

    // Clases base para los botones dinámicos
    const buttonClass =
        'text-lg font-semibold py-3 px-6 text-center rounded-lg transition-all duration-300';

    const loginButtonClass = `${buttonClass} border border-purpleOiches text-purpleOiches hover:bg-purpleOiches hover:text-white ${
        isMobile ? 'w-full' : 'md:px-4 md:py-2 md:text-sm'
    }`;
    const registerButtonClass = `${buttonClass} text-white bg-purpleOiches hover:bg-purple-700 ${
        isMobile ? 'w-full' : 'md:px-4 md:py-2 md:text-sm'
    }`;

    return (
        <div
            className={`${
                isMobile
                    ? 'flex flex-col space-y-6'
                    : 'md:flex md:flex-row md:space-x-10 md:items-center'
            }`}
        >
            {/* Enlaces generales */}
            <NavLink to="/salas" className={linkClass}>
                {isMobile && <span className={backgroundClass}></span>}
                <span className={innerTextClass}>Salas</span>
            </NavLink>
            <NavLink to="/grupos" className={linkClass}>
                {isMobile && <span className={backgroundClass}></span>}
                <span className={innerTextClass}>Músicos</span>
            </NavLink>
            <NavLink to="/sobre-oiches" className={linkClass}>
                {isMobile && <span className={backgroundClass}></span>}
                <span className={innerTextClass}>Sobre Oiches</span>
            </NavLink>
            <NavLink to="/contacto" className={linkClass}>
                {isMobile && <span className={backgroundClass}></span>}
                <span className={innerTextClass}>Contacto</span>
            </NavLink>

            {/* Botones dinámicos Login y Registro */}
            <div
                className={`${
                    isMobile
                        ? 'flex flex-col space-y-4'
                        : 'flex md:flex-row md:space-x-4 md:items-center'
                }`}
            >
                {!userLogged ? (
                    <>
                        <NavLink to="/login" className={loginButtonClass}>
                            Login
                        </NavLink>
                        <NavLink to="/register" className={registerButtonClass}>
                            Registro
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink
                            to={`/users/account/${userLogged.id}`}
                            className={registerButtonClass}
                        >
                            Mi perfil
                        </NavLink>
                        <NavLink
                            to="/login"
                            onClick={() => signOut()}
                            className={loginButtonClass}
                        >
                            Logout
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Menu;
