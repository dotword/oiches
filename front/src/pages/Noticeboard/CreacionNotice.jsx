import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NoticeCreacion from '../../components/Noticeboard/NoticeCreacion';

const CreacionNotice = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Publica tu anuncio" />
                <main className="w-11/12 mx-auto my-6 md:max-w-7xl">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <NoticeCreacion />
                    </div>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};
export default CreacionNotice;
