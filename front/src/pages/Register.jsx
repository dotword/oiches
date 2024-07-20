import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm.jsx';
import { motion } from 'framer-motion';
import MenuForms from '../components/MenuForms.jsx';

export const RegisterPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
            className="h-screen md:flex md:w-screen"
        >
            <MenuForms
                signInLogin={
                    <>
                        <p className="max-[360px]:hidden">¿Ya tienes cuenta?</p>
                        <Link
                            to="/login"
                            className="hover:text-purpleOiches text-yellowOiches ml-2"
                        >
                            Login
                        </Link>
                    </>
                }
            />
            <RegisterForm />
        </motion.div>
    );
};
