import { motion } from 'framer-motion';
import Header from '../../components/Header.jsx';
import AdvertDetails from '../../components/Advertisers/AdvertDetails.jsx';
import Footer from '../../components/Footer.jsx';

const AdvertPage = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header />
                <AdvertDetails />
                <Footer />
            </motion.div>
        </>
    );
};
export default AdvertPage;
