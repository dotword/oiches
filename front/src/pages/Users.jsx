import { motion } from 'framer-motion';
import Header from '../components/Header';
import AuthUser from '../components/AuthUser';
import { ListarReservas } from '../components/ListarReservas.jsx';
import Footer from '../components/Footer.jsx';

const Users = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Perfil de usuario" />
            <main className="w-11/12 mx-auto my-6 md:max-w-7xl">
                <AuthUser />
            </main>
            <ListarReservas />
            <Footer />
        </motion.div>
    );
};

export default Users;
