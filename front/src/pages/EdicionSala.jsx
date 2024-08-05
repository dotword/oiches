import { motion } from 'framer-motion';
import Header from '../components/Header';
import SalaEdit from '../components/SalaEdit';
import Footer from '../components/Footer';

const EdicionSala = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Edita tu Sala" />
            <main className="w-11/12 mx-auto my-6 md:max-w-7xl">
                <div className="px-6 pt-3 pb-6 md:px-12 bg-white rounded-lg shadow-md md:grid md:grid-cols-3 md:gap-x-12">
                    <SalaEdit />
                </div>
            </main>
            <Footer />
        </motion.div>
    );
};
export default EdicionSala;
