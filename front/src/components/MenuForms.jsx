import { NavLink, Link } from 'react-router-dom';
import oichesLogo from '../assets/Horizontal_blanco.webp';

const MenuForms = () => {
    return (
        <section className="md:w-1/2 flex">
            <div className="flex flex-col items-center justify-between p-4 w-full bg-hero-image bg-cover bg-bottom md:hidden">
                <div className="min-h-20 w-full flex justify-between">
                    <Link to={'/'} className="text-white">
                        <p>&#60; Back</p>
                    </Link>
                    <div className="flex gap-4">
                        <NavLink
                            to="/register"
                            className="hover:text-purpleOiches text-yellowOiches"
                        >
                            Registro
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="hover:text-purpleOiches text-yellowOiches"
                        >
                            Login
                        </NavLink>
                    </div>
                </div>
                <NavLink to={'/'}>
                    <img
                        src={oichesLogo}
                        className="max-w-60 w-11/12 mb-8"
                        alt="Logo Oiches"
                    />
                </NavLink>
            </div>
            <div className="flex bg-hero-image bg-cover flex-col w-full gap-10 pt-5 h-screen gap-y-60 max-md:hidden">
                <div className="flex place-content-center">
                    <NavLink to={'/'}>
                        <img
                            src={oichesLogo}
                            className="self-center px-10 mt-10 max-w-sm"
                            alt="Logo de Oiches"
                        />
                    </NavLink>
                </div>
                <blockquote className="text-white flex flex-col mx-auto w-10/12 max-w-96">
                    Cuando estoy en el escenario, siento que puedo conquistar el
                    mundo. No hay nada como la energía que recibo del público.
                    Es un intercambio de amor y pasión que no se puede describir
                    con palabras, se puede sentir <br />
                    <cite className="mt-6">Jimi Hendrix</cite>
                </blockquote>
            </div>
            <div className="absolute w-1/2 right-0 p-8 flex justify-between max-md:hidden">
                <Link to={'/'}>
                    <p>&#60; Back</p>
                </Link>
                <div className="flex gap-4">
                    <NavLink
                        to="/register"
                        className="hover:text-purpleOiches text-yellowOiches"
                    >
                        {' '}
                        Registro
                    </NavLink>
                    <NavLink
                        to="/login"
                        className="hover:text-purpleOiches text-yellowOiches"
                    >
                        {' '}
                        Login
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export default MenuForms;
