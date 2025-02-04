import { motion } from 'framer-motion';
import Header from '../../components/Header';
import ConciertoEdit from '../../components/Conciertos/ConciertoEdit';

const EdicionConcierto = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Editar concierto" />
                <main className="w-11/12 mx-auto my-6 md:max-w-7xl">
                    <ConciertoEdit />
                </main>
            </motion.div>
        </>
    );
};
export default EdicionConcierto;
