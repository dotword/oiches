import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import Seo from '../../components/SEO/Seo';
import NoticeCreacion from '../../components/Noticeboard/NoticeCreacion';

const CreacionNotice = () => {
    return (
        <>
            {/* <Seo
                title="Publica tu Sala - Oiches"
                description="Crea y publica tu sala en Oiches para conectar con músicos y organizar conciertos inolvidables."
                url="https://oiches.com/creacion-sala"
                noIndex={true} // Evitamos que sea indexada
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Publica tu Sala - Oiches',
                    description:
                        'Crea y publica tu sala en Oiches para conectar con músicos y organizar conciertos inolvidables.',
                    url: 'https://oiches.com/creacion-sala',
                    isPartOf: {
                        '@type': 'WebSite',
                        name: 'Oiches',
                        url: 'https://oiches.com',
                    },
                    potentialAction: {
                        '@type': 'CreateAction',
                        name: 'Publicar Sala',
                        target: 'https://oiches.com/creacion-sala',
                    },
                }}
            /> */}
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
