import { useContext } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminVotersList from '../../components/Concurso/AdminVotersList';
import AuthContext from '../../context/auth/AuthContext';

const AdminVoters = () => {
    const { userLogged, token } = useContext(AuthContext);
    return userLogged && userLogged.roles === 'admin' ? (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Votantes concurso Oiches 2025" />
            <main className="container-main">
                <AdminVotersList token={token} />
            </main>
            <Footer />
        </motion.div>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AdminVoters;
