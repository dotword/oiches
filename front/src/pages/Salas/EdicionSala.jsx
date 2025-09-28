import { motion } from 'framer-motion';
import Header from '../../components/Header';
import SalaEdit from '../../components/Salas/SalaEdit';
import Footer from '../../components/Footer';
import Seo from '../../components/SEO/Seo';

const EdicionSala = () => {
    return (
        <>
            {/* SEO para la página de edición de sala */}
            <Seo
                title="Edita tu Sala - Oiches"
                description="Edita y actualiza la información de tu sala en Oiches. Cambia detalles como ubicación, horarios y más."
                url="https://oiches.com/edicion-sala"
                noIndex={true} // No indexamos poco valor en cuanto a Seo se evita Bots maliciosos
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Edita tu Sala - Oiches',
                    description:
                        'Edita y actualiza la información de tu sala en Oiches. Cambia detalles como ubicación, horarios y más.',
                    url: 'https://oiches.com/edicion-sala',
                }}
            />
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Edita tu Sala" />
                <main className="container-main">
                    <SalaEdit />
                </main>
                <Footer />
            </motion.div>
        </>
    );
};
export default EdicionSala;
