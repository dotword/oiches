import RecoverPasswordForm from '../components/RecoverPasswordForm';
import MenuForms from '../components/MenuForms';
import { motion } from 'framer-motion';

export const RecuperarPassword = () => {
    return (
        <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"100%"}} exit={{opacity:0,height:0}} className="md:flex md:w-screen">
            <MenuForms />
            <RecoverPasswordForm className="flex justify-between md:justify-evenly max-w-md flex-col gap-5 p-4 lg:w-1/3 mx-auto lg:mt-20" />
        </motion.div>
    );
};
