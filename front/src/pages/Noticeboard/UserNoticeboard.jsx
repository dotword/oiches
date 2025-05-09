import { useContext } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListarUserNotices from '../../components/Noticeboard/ListarUserNotices';
import AuthContext from '../../context/auth/AuthContext';

const UserNoticeboard = () => {
    const { userLogged, token } = useContext(AuthContext);
    return userLogged ? (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Mis anuncios" />
            <main className="w-11/12 mx-auto pb-14 md:max-w-7xl">
                <ListarUserNotices token={token} />
            </main>
            <Footer />
        </motion.div>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default UserNoticeboard;
