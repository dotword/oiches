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
                <main className="w-full mx-auto  md:max-w-1xl">
                    <div className="bg-custom-gradient p-1 sm:p-6 shadow-md flex flex-col">
                        <AdvertNewCreation />
                    </div>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};
export default CreateNewAdvert;
