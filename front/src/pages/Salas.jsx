import { motion } from 'framer-motion';

const Salas = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            Salas
        </motion.div>
    );
};

export default Salas;
