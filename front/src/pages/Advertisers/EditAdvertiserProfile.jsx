import { motion } from 'framer-motion';
import Header from '../../components/Header';
import AdvertiserProfileEdit from '../../components/Advertisers/AdvertiserProfileEdit.jsx';
import Footer from '../../components/Footer';

const EditAdvertiserProfile = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header />
            <main className="container-main">
                <AdvertiserProfileEdit />
            </main>
            <Footer />
        </motion.div>
    );
};
export default EditAdvertiserProfile;
