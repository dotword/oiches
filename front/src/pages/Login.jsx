import { LoginForm } from '../components/LoginForm.jsx';
import MenuForms from '../components/MenuForms';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/SEO/Seo';

export const LoginPage = () => {
    return (
        <>
            {/* Configuración SEO para la página de inicio de sesión */}
            <Seo
                title="Inicia Sesión - Oiches"
                description="Accede a tu cuenta en Oiches para gestionar tu perfil, conectar con músicos o salas, y descubrir nuevas oportunidades."
                url="https://oiches.com/login"
                keywords="inicia sesión, login, Oiches, conecta músicos y salas"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Inicia Sesión - Oiches',
                    description:
                        'Accede a tu cuenta en Oiches para gestionar tu perfil, conectar con músicos o salas, y descubrir nuevas oportunidades.',
                    url: 'https://oiches.com/login',
                }}
            />

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:flex"
            >
                <MenuForms
                    signInLogin={
                        <>
                            <p className="max-[360px]:hidden">
                                ¿Aún no tienes cuenta?
                            </p>
                            <Link
                                to="/register"
                                className="hover:text-purpleOiches md:text-yellowOiches ml-2"
                            >
                                Regístrate
                            </Link>
                        </>
                    }
                />

                <LoginForm />
            </motion.div>
        </>
    );
};
