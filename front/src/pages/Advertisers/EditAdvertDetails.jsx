import { motion } from 'framer-motion';
import Header from '../../components/Header.jsx';
import AdvertDetailsEdit from '../../components/Advertisers/AdvertDetailsEdit.jsx';
import Footer from '../../components/Footer.jsx';

const EditAdvertDetails = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header />
            <main className="container-main">
                <AdvertDetailsEdit />
            </main>
            <Footer />
        </motion.div>
    );
};
export default EditAdvertDetails;
