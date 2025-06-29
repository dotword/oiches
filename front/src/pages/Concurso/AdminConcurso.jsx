import { useContext } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminInscriptionsList from '../../components/Concurso/AdminInscriptionsList';
import AuthContext from '../../context/auth/AuthContext';
import { Link } from 'react-router-dom';

const AdminConcurso = () => {
    const { userLogged, token } = useContext(AuthContext);
    return userLogged && userLogged.roles === 'admin' ? (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Concurso Oiches 2025" />
            <main className="w-11/12 mx-auto pb-14 md:max-w-7xl">
                <Link
                    to="/concurso/admin-voters"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md my-4 mx-auto flex justify-center max-w-60"
                >
                    Listado voters
                </Link>
                <AdminInscriptionsList token={token} />
            </main>
            <Footer />
        </motion.div>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AdminConcurso;
