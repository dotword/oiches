import { useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    const { userLogged } = useContext(AuthContext);

    return (
        <>
            <NavLink
                to={'/'}
                className="max-md:my-8 font-medium hover:text-purpleOiches active:text-purpleOiches"
            >
                Salas
            </NavLink>
            <NavLink
                to={'/'}
                className="max-md:my-8 font-medium hover:text-purpleOiches active:text-purpleOiches"
            >
                Músicos
            </NavLink>
            <NavLink
                to={'/'}
                className="max-md:my-8 font-medium hover:text-purpleOiches active:text-purpleOiches"
            >
                Sobre nosotros
            </NavLink>
            {!userLogged ? (
                <>
                    <NavLink
                        to={'/'}
                        className="max-md:my-8 font-medium text-purpleOiches hover:text-black"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to={'/register'}
                        className="btn-account max-md:my-8 font-medium"
                    >
                        Registro
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink
                        to={'/'}
                        className="max-md:my-8 font-medium text-purpleOiches hover:text-black"
                    >
                        Logout
                    </NavLink>
                    <NavLink
                        to={'/'}
                        className="max-md:my-8 font-medium hover:text-purpleOiches active:text-purpleOiches"
                    >
                        Mi perfil
                    </NavLink>
                </>
            )}
        </>
    );
};

export default Menu;
