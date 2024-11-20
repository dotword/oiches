import { motion } from 'framer-motion';
import Header from '../components/Header';
import GrupoEdit from '../components/GrupoEdit';
import Footer from '../components/Footer';

const EdicionGrupo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Edita tu Proyecto musical" />
            <main className="w-11/12 mx-auto my-6 md:max-w-7xl">
                <GrupoEdit />
            </main>
            <Footer />
        </motion.div>
    );
};
export default EdicionGrupo;
