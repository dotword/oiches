import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdvertNewCreation from '../../components/Advertisers/AdvertNewCreation';

const CreateNewAdvert = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header />
                <main className="container-main">
                    <AdvertNewCreation />
                </main>
                <Footer />
            </motion.div>
        </>
    );
};
export default CreateNewAdvert;
