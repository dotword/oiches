import { motion } from 'framer-motion';
import Header from '../../components/Header';
import GrupoCreacion from '../../components/Grupos/GrupoCreacion';
import Footer from '../../components/Footer';
import Seo from '../../components/SEO/Seo';

const CreacionGrupo = () => {
    return (
        <>
            {/* SEO creación de grupo */}
            <Seo
                title="Publica tu Proyecto Musical - Oiches"
                description="Crea y publica tu proyecto musical en Oiches para conectar con salas de conciertos y promocionar tu música."
                url="https://oiches.com/creacion-grupo"
                noIndex={true} // Evitamos la indexación de esta página
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Publica tu Proyecto Musical - Oiches',
                    description:
                        'Crea y publica tu proyecto musical en Oiches para conectar con salas de conciertos y promocionar tu música.',
                    url: 'https://oiches.com/creacion-grupo',
                    isPartOf: {
                        '@type': 'WebSite',
                        name: 'Oiches',
                        url: 'https://oiches.com',
                    },
                    potentialAction: {
                        '@type': 'CreateAction',
                        name: 'Crear un proyecto musical',
                        target: 'https://oiches.com/creacion-grupo',
                    },
                }}
            />
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Publica tu proyecto musical" />
                <main className="container-main">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <GrupoCreacion />
                    </div>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};
export default CreacionGrupo;
