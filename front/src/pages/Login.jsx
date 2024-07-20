import { LoginForm } from '../components/LoginForm.jsx';
import MenuForms from '../components/MenuForms';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:flex md:w-screen"
        >
            <MenuForms
                signInLogin={
                    <>
                        <p className="max-[360px]:hidden">
                            ¿Aún no tienes cuenta?
                        </p>
                        <Link
                            to="/register"
                            className="hover:text-purpleOiches text-yellowOiches ml-2"
                        >
                            Regístrate
                        </Link>
                    </>
                }
            />

            <LoginForm />
        </motion.div>
    );
};
