import { motion } from 'framer-motion';
import Header from '../../components/Header.jsx';
import NoticeDetails from '../../components/Noticeboard/NoticeDetails.jsx';
import Footer from '../../components/Footer.jsx';

const NoticeDetail = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header />
                <NoticeDetails />
                <Footer />
            </motion.div>
        </>
    );
};
export default NoticeDetail;
