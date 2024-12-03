// import { useContext } from 'react';
// import { AuthContext } from '../context/auth/auth.context';
// import { NavLink } from 'react-router-dom';

// const Menu = () => {
//     const { signOut, userLogged } = useContext(AuthContext);

//     return (
//         <>
//             <NavLink
//                 to="/salas"
//                 className="max-md:my-8 font-medium hover:text-purpleOiches"
//             >
//                 Salas
//             </NavLink>
//             <NavLink
//                 to="/grupos"
//                 className="max-md:my-8 font-medium hover:text-purpleOiches active:text-purpleOiches"
//             >
//                 Músicos
//             </NavLink>
//             <NavLink
//                 to="/sobre-oiches"
//                 className="max-md:my-8 font-medium hover:text-purpleOiches active:text-purpleOiches"
//             >
//                 Sobre Oiches
//             </NavLink>
//             <NavLink
//                 to="/contacto"
//                 className="max-md:my-8 font-medium hover:text-purpleOiches active:text-purpleOiches"
//             >
//                 Contacto
//             </NavLink>
//             {!userLogged ? (
//                 <>
//                     <NavLink
//                         to="/login"
//                         className="max-md:my-8 font-medium text-purpleOiches hover:text-black"
//                     >
//                         Login
//                     </NavLink>
//                     <NavLink
//                         to="/register"
//                         className="btn-account max-md:my-8 font-medium"
//                     >
//                         Registro
//                     </NavLink>
//                 </>
//             ) : (
//                 <>
//                     <NavLink
//                         to={`/users/account/${userLogged.id}`}
//                         className="btn-account max-md:my-8 font-medium"
//                     >
//                         Mi perfil
//                     </NavLink>
//                     <NavLink
//                         to="/login"
//                         onClick={() => {
//                             signOut();
//                         }}
//                         className="max-md:my-8 font-medium text-purpleOiches hover:text-black"
//                     >
//                         Logout
//                     </NavLink>
//                 </>
//             )}
//         </>
//     );
// };

// export default Menu;

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

    const loginButtonClass = isMobile
        ? 'text-lg font-semibold border border-purpleOiches text-purpleOiches py-3 px-6 w-full text-center rounded-lg hover:bg-purpleOiches hover:text-white transition-all duration-300 mt-6' // Agregamos mt-6 solo en móvil
        : 'font-medium text-purpleOiches border border-purpleOiches px-4 py-2 rounded-md hover:bg-purpleOiches hover:text-white transition-all duration-300';

    const registerButtonClass = isMobile
        ? 'text-lg font-semibold text-white bg-purpleOiches py-3 px-6 w-full text-center rounded-lg hover:bg-purple-700'
        : 'font-medium text-white bg-purpleOiches px-4 py-2 rounded-md hover:bg-purple-700';

    return (
        <div
            className={`${
                isMobile ? 'flex flex-col space-y-6' : 'flex space-x-10'
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

            {/* Contenedor de botones de Login y Registro */}
            {!userLogged ? (
                <div
                    className={`${
                        isMobile
                            ? 'flex flex-col space-y-4 mt-12' // Espacio adicional con mt-14
                            : 'flex space-x-4 mt-0' // Sin margen adicional en desktop
                    }`}
                >
                    <NavLink to="/login" className={loginButtonClass}>
                        Login
                    </NavLink>
                    <NavLink to="/register" className={registerButtonClass}>
                        Registro
                    </NavLink>
                </div>
            ) : (
                <div
                    className={`${
                        isMobile
                            ? 'flex flex-col space-y-4 mt-12' // Espacio adicional con mt-12
                            : 'flex space-x-4 mt-0' // Sin margen adicional en desktop
                    }`}
                >
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
                </div>
            )}
        </div>
    );
};

export default Menu;
