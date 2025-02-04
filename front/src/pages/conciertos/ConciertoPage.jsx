import { motion } from 'framer-motion';
import Header from '../../components/Header.jsx';
import ConciertoDetail from '../../components/Conciertos/ConciertoDetails.jsx';
import Footer from '../../components/Footer.jsx';

const ConciertoPage = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header />
                <ConciertoDetail />
                <Footer />
            </motion.div>
        </>
    );
};
export default ConciertoPage;
