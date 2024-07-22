import { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/auth/auth.context';

import Header from '../components/Header';
import SalaCreacion from '../components/SalaCreacion';
import NotFound from './NotFound';

const CreacionSala = () => {
    const { currentUser } = useContext(AuthContext);

    return currentUser ? (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Crea tu Sala" />
            <main className="w-11/12 mx-auto my-6 md:max-w-7xl">
                <SalaCreacion />
            </main>
        </motion.div>
    ) : (
        <NotFound />
    );
};
export default CreacionSala;
