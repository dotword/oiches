import { motion } from 'framer-motion';
import Header from '../components/Header';
import GrupoCreacion from '../components/GrupoCreacion';

const CreacionGrupo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Crea tu Grupo" />
            <main className="w-11/12 mx-auto my-6 md:max-w-7xl">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <GrupoCreacion />
                </div>
            </main>
        </motion.div>
    );
};
export default CreacionGrupo;
