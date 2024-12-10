import { motion } from 'framer-motion';
import Header from '../../components/Header';
import GrupoEdit from '../../components/Grupos/GrupoEdit';
import Footer from '../../components/Footer';
import Seo from '../../components/SEO/Seo';

const EdicionGrupo = () => {
    return (
        <>
            {/* SEO para la página de edición de grupo */}
            <Seo
                title="Edita tu Proyecto Musical - Oiches"
                description="Edita y actualiza los detalles de tu proyecto musical en Oiches. Cambia la información de tu banda o proyecto."
                url="https://oiches.com/edicion-grupo"
                noIndex={true} // Evitamos que sea indexada no tiene valor en cuento a Seo se evita Bots maliciosos
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Edita tu Proyecto Musical - Oiches',
                    description:
                        'Edita y actualiza los detalles de tu proyecto musical en Oiches.',
                    url: 'https://oiches.com/edicion-grupo',
                }}
            />

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Edita tu Proyecto musical" />
                <main className="w-11/12 mx-auto my-6 md:max-w-7xl">
                    <GrupoEdit />
                </main>
                <Footer />
            </motion.div>
        </>
    );
};
export default EdicionGrupo;
