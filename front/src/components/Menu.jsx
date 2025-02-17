import { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { NavLink } from 'react-router-dom';

const Menu = ({ mobile }) => {
    const { signOut, userLogged } = useContext(AuthContext);

    const linkClassName = mobile
        ? 'block w-full max-md:my-4 py-4 px-12 font-medium relative overflow-hidden group'
        : 'font-medium hover:text-purpleOiches';

    const backgroundClassName = mobile
        ? 'absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg rounded-lg transform translate-x-[200%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out'
        : '';

    const textClassName = mobile
        ? 'relative z-10 flex justify-center items-center h-full text-black group-hover:text-white'
        : '';

    return (
        <>
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
            <NavLink to="/contacto" className={linkClassName}>
                {mobile && <span className={backgroundClassName}></span>}
                <span className={textClassName}>Contacto</span>
            </NavLink>
            {!userLogged ? (
                <>
                    <NavLink
                        to="/login"
                        className="max-md:m-4 font-medium text-purpleOiches hover:text-black"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className="btn-account max-md:m-4 font-medium"
                    >
                        Registro
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink
                        to={`/users/account/${userLogged.id}`}
                        className="btn-account max-md:m-4 font-medium"
                    >
                        Mi perfil
                    </NavLink>
                    <NavLink
                        to="/login"
                        onClick={() => {
                            signOut();
                        }}
                        className="font-medium text-purpleOiches hover:text-black"
                    >
                        Logout
                    </NavLink>
                </>
            )}
        </>
    );
};

export default Menu;
