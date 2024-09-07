import MenuForms from '../components/MenuForms';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ChangePasswordForm from '../components/ChangePasswordForm';

const ChangePassword = () => {
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
                        <p className="max-[360px]:hidden">¿Ya tienes cuenta?</p>
                        <Link
                            to="/login"
                            className="hover:text-purpleOiches md:text-yellowOiches ml-2"
                        >
                            Login
                        </Link>
                    </>
                }
            />
            <ChangePasswordForm />
        </motion.div>
    );
};

export default ChangePassword;
