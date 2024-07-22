import { useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import SalaEdit from '../components/SalaEdit';
import NotFound from './NotFound';

const EdicionSala = () => {
    const { currentUser } = useContext(AuthContext);

    return currentUser ? (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Edita tu Sala" />
            <main className="w-11/12 mx-auto my-6 md:max-w-7xl">
                <SalaEdit />
            </main>
        </motion.div>
    ) : (
        <NotFound />
    );
};
export default EdicionSala;
