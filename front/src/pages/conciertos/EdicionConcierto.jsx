import { motion } from 'framer-motion';
import Header from '../../components/Header';
import ConciertoEdit from '../../components/conciertos/ConciertoEdit';

const EdicionConcierto = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Editar concierto" />
                <main className="container-main">
                    <ConciertoEdit />
                </main>
            </motion.div>
        </>
    );
};
export default EdicionConcierto;
