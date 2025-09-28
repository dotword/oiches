import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NoticeEdicion from '../../components/Noticeboard/NoticeEdicion';

const EdicionNotice = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Edita tu anuncio" />
                <main className="container-main">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <NoticeEdicion />
                    </div>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};
export default EdicionNotice;
