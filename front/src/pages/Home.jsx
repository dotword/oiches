import { motion } from 'framer-motion';
import Header from '../components/Header';

const Home = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Encuentra tu Banda Sonora" />
            </motion.div>
        </>
    );
};

export default Home;
