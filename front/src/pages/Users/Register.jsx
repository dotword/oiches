import { Link } from 'react-router-dom';
import { RegisterForm } from '../../components/Users/RegisterForm.jsx';
import { motion } from 'framer-motion';
import MenuForms from '../../components/MenuForms.jsx';
import Seo from '../../components/SEO/Seo.jsx';

export const RegisterPage = () => {
    return (
        <>
            {/* SEO registro si debe ser indexada, facilita acceso */}
            <Seo
                title="Regístrate en Oiches - Músicos y Salas de Conciertos"
                description="Crea una cuenta en Oiches para conectar con músicos y salas de conciertos. ¡Empieza a vivir la mejor música en vivo!"
                url="https://oiches.com/register"
                keywords="registro, crear cuenta, Oiches, músicos, salas de conciertos"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Regístrate en Oiches - Músicos y Salas de Conciertos',
                    description:
                        'Crea una cuenta en Oiches para conectar con músicos y salas de conciertos.',
                    url: 'https://oiches.com/register',
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
                                ¿Ya tienes cuenta?
                            </p>
                            <Link
                                to="/login"
                                className="hover:text-purpleOiches md:text-yellowOiches ml-2"
                            >
                                Login
                            </Link>
                        </>
                    }
                />
                <RegisterForm />
            </motion.div>
        </>
    );
};
