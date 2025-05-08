import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PoliticaVotacion = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Política de Privacidad y Participación" />
            <main className="w-11/12 mx-auto my-6 pb-14 md:max-w-5xl">
                <p className="mb-2">
                    Responsable del tratamiento: Carmen Salgueiro Rodríguez, con
                    NIF: 33996817B.
                </p>
                <h2 className="font-semibold text-lg">
                    1. Finalidad del tratamiento de datos
                </h2>
                <p>
                    Al introducir tu dirección de correo electrónico para
                    participar en el sistema de votación, aceptas que utilicemos
                    tu email <strong>únicamente</strong> para:
                </p>
                <ul>
                    <li>
                        Enviarte un enlace de verificación para confirmar tu
                        identidad.
                    </li>
                    <li>
                        Registrar tu participación en la votación, permitiéndote
                        votar a un máximo de 3 grupos musicales inscritos en el
                        concurso.
                    </li>
                    <li>Prevenir fraudes o votos duplicados.</li>
                </ul>
                <p>
                    <strong>
                        No utilizaremos tu correo electrónico con fines
                        comerciales, ni lo compartiremos con terceros.
                    </strong>
                </p>

                <h2 className="font-semibold text-lg">
                    2. Conservación de los datos
                </h2>
                <p>
                    Tu dirección de correo electrónico y tu participación se
                    conservarán{' '}
                    <strong>únicamente durante la duración del concurso</strong>{' '}
                    y se eliminarán una vez finalizado el mismo, salvo que una
                    normativa legal exija conservarlos durante más tiempo.
                </p>

                <h2 className="font-semibold text-lg">
                    3. Derechos del usuario
                </h2>
                <p>Puedes ejercer en cualquier momento tus derechos de:</p>
                <ul>
                    <li>
                        <strong>Acceso</strong> a tus datos
                    </li>
                    <li>
                        <strong>Rectificación</strong> si son incorrectos
                    </li>
                    <li>
                        <strong>Supresión</strong> (derecho al olvido)
                    </li>
                    <li>
                        <strong>Limitación</strong> u <strong>oposición</strong>{' '}
                        al tratamiento
                    </li>
                </ul>
                <p>Solo tienes que escribirnos a: hola@oiches.com</p>

                <h2 className="font-semibold text-lg">
                    4. Condiciones de participación
                </h2>
                <ul>
                    <li>
                        Solo se permite un voto por persona (identificada
                        mediante dirección de correo electrónico verificada).
                    </li>
                    <li>
                        Cada usuario puede votar por un máximo de{' '}
                        <strong>3 grupos</strong> diferentes.
                    </li>
                    <li>
                        Cualquier intento de manipulación del sistema de
                        votación supondrá la anulación de los votos del
                        participante.
                    </li>
                </ul>

                <h2 className="font-semibold text-lg">5. Aceptación</h2>
                <p>
                    Al marcar la casilla de aceptación y enviar tu email,{' '}
                    <strong>
                        confirmas que has leído y aceptado esta política
                    </strong>{' '}
                    y das tu consentimiento para el tratamiento de tus datos en
                    los términos descritos.
                </p>
            </main>
            <Footer />
        </motion.div>
    );
};

export default PoliticaVotacion;
