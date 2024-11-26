import { motion } from 'framer-motion';
import Header from '../components/Header';
import AuthUser from '../components/AuthUser';
import Footer from '../components/Footer.jsx';
import Seo from '../components/SEO/Seo.jsx'; // Importamos el componente SEO

const Users = () => {
    return (
        <>
            {/* Componente SEO */}
            <Seo
                title="Perfil de Usuario - Oiches"
                description="Gestiona y actualiza la información de tu cuenta en Oiches. Mantén tu perfil al día y accede a las opciones de personalización."
                url="https://oiches.com/perfil"
                keywords="perfil de usuario, cuenta Oiches, configuración de perfil"
                noIndex={true} // Evitamos indexar esta página para proteger información sensible
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Perfil de Usuario',
                    description:
                        'Página de perfil de usuario en Oiches. Accede a tu información personal y opciones de configuración.',
                    url: 'https://oiches.com/perfil',
                }}
            />
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Perfil de usuario" />
                <main className="w-11/12 mx-auto mt-6 mb-10 md:max-w-7xl">
                    <div className="p-6 rounded-lg shadow-md md:pt-0">
                        <AuthUser />
                    </div>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};

export default Users;
