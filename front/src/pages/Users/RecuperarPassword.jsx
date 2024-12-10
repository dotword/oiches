import RecoverPasswordForm from '../../components/Users/RecoverPasswordForm';
import MenuForms from '../../components/MenuForms';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../../components/SEO/Seo';

export const RecuperarPassword = () => {
    return (
        <>
            {/* SEO dinámico para la página de recuperación de contraseña */}
            <Seo
                title="Recupera tu Contraseña - Oiches"
                description="Si olvidaste tu contraseña, restablécela fácilmente desde esta página. Sigue los pasos indicados para recuperar el acceso a tu cuenta."
                url="https://oiches.com/recuperar-password"
                keywords="recuperar contraseña, restablecer contraseña, Oiches"
                noIndex={true} // Evitar indexación para SEO no aporta valor seo, se evita acceso no deseado
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Recupera tu Contraseña - Oiches',
                    description:
                        'Si olvidaste tu contraseña, restablécela fácilmente desde esta página.',
                    url: 'https://oiches.com/recuperar-password',
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
                <RecoverPasswordForm />
            </motion.div>
        </>
    );
};
