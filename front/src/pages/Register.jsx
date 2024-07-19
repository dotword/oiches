import { NavLink } from 'react-router-dom';
import oiches from '../assets/Live.jpg';
import { RegisterForm } from '../components/RegisterForm.jsx';
import oichesLogo from '../assets/Horizontal_blanco.webp';
import { motion } from 'framer-motion';

export const RegisterPage = () => {
    return (
        <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"100%"}} exit={{opacity:0,height:0}} className="h-screen lg:flex lg:w-screen">
            <section className="h-1/3 text-white lg:w-1/2">
                <img
                    src={oiches}
                    className="-z-50 absolute h-1/3 w-full lg:w-1/2 lg:h-screen"
                    alt=""
                />
                <div className="flex justify-between lg:hidden lg:text-black p-4">
                    <NavLink to={"/"} className="flex hover:text-purpleOiches gap-1">
                        <svg
                            className="self-center"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
                            />
                        </svg>{' '}
                        Back
                    </NavLink>
                    <p>
                        ¿Ya tienes una cuenta?
                        <NavLink
                            to="/login"
                            className=" hover:text-purpleOiches text-yellowOiches"
                        >
                            {' '}
                            Log in
                        </NavLink>
                    </p>
                </div>
                <div className="flex flex-col gap-10 pt-5 lg:h-screen lg:gap-y-60">
                    <div className="flex place-content-center">
                        <NavLink to={'/home'}>
                            <img
                                src={oichesLogo}
                                className="self-center px-10 mt-10 max-w-sm"
                                alt="Logo de Oiches"
                            />
                        </NavLink>
                    </div>
                    <blockquote className="hidden lg:flex lg:flex-col lg:mx-auto lg:w-1/2">
                        Cuando estoy en el escenario, siento que puedo
                        conquistar el mundo. No hay nada como la energía que
                        recibo del público.Es un intercambio de amor y pasión
                        que no se puede describir con palabras, se se puede
                        sentir <br />
                        <cite className="mt-6">Jimi Hendrix</cite>
                    </blockquote>
                </div>
            </section>
            <RegisterForm className="flex justify-between max-w-md flex-col gap-5 p-4 lg:w-1/3 mx-auto lg:mt-20" />
        </motion.div>
    );
};
