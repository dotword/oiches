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
                <main className="w-11/12 mx-auto my-6 md:max-w-7xl">
                    <AdvertNewCreation />
                </main>
                <Footer />
            </motion.div>
        </>
    );
};
export default CreateNewAdvert;
