import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import HeaderHero from '../components/HeaderHero.jsx';

export const Contacto = () => {
    return (
        <>
            <HeaderHero /> {/* Incluye el encabezado con fondo blanco */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col items-center justify-center relative px-4 min-h-screen "
                style={{
                    backgroundImage: "url('/Steps.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Header Text */}
                <div className="absolute top-20 md:top-16 text-center px-4 md:px-0">
                    <h1
                        className="text-white text-4xl md:text-6xl font-extrabold"
                        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                    >
                        Hablemos
                    </h1>
                    <p
                        className="text-white text-opacity-70 text-base md:text-lg mt-2 md:mt-4"
                        style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}
                    >
                        ¡Dudas, ideas, propuestas…! ¡Devolvamos la esencia a la
                        música en directo!
                    </p>
                </div>
                <ContactForm />
            </motion.div>
        </>
    );
};

export default Contacto;
