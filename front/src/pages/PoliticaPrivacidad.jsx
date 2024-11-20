import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/SEO/Seo.jsx'; // Componente de SEO

const PoliticaPrivacidad = () => {
    return (
        <>
            {/* SEO dinámico para esta página */}
            <Seo
                title="Política de Privacidad - Oiches"
                description="Consulta nuestra política de privacidad para conocer cómo tratamos tus datos personales en Oiches."
                url="https://oiches.com/politica-privacidad"
                keywords="política de privacidad, protección de datos, Oiches"
                noIndex={true} // Indica que no se debe indexar esta página
            />

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Política de privacidad" />
                <main className="w-11/12 mx-auto my-6 pb-14 md:max-w-7xl">
                    <h1 className="text-3xl font-semibold mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="mb-2">
                        De acuerdo con la normativa de Protección de Datos de
                        Carácter Personal, procedemos a informarle del
                        tratamiento de datos personales que realizamos de
                        nuestros clientes y/o usuarios de la presente página
                        web.
                    </p>
                    <p className="mb-2">
                        María Carmen Salgueiro Rodríguez (En adelante, Oiches) -
                        NIF: 33996817B
                    </p>
                    <p className="mb-2">hola@oiches.com</p>

                    <h2 className="font-medium text-lg pt-4 pb-2">
                        1. Finalidad del tratamiento, legitimación y plazo de
                        conservación
                    </h2>
                    <p className="mb-2">
                        Oiches podrá tratar sus datos de carácter personal de
                        acuerdo con las siguientes finalidades:
                    </p>
                    <p className="mb-2">
                        <strong>Servicio de atención al usuario:</strong>{' '}
                        trataremos los datos estrictamente necesarios para
                        gestionar su petición.
                    </p>
                    <p className="mb-2">
                        <strong>Legitimación:</strong> existe un interés
                        legítimo por ambas partes para la resolución de
                        solicitudes o consultas.
                    </p>
                    <p className="mb-2">
                        <strong>Plazo de conservación:</strong> el tiempo
                        necesario para dar respuesta a su solicitud y hasta que
                        transcurra el plazo de prescripción de posibles acciones
                        de responsabilidad derivadas del tratamiento.
                    </p>

                    <h2 className="font-medium text-lg pt-4 pb-2">
                        2. Destinatarios de cesiones
                    </h2>
                    <p className="mb-2">
                        No cederemos sus datos a terceros, salvo para dar
                        cumplimiento a una obligación legal.
                    </p>

                    <h2 className="font-medium text-lg pt-4 pb-2">
                        3. Derechos en materia de protección de datos
                    </h2>
                    <ol className="list-disc ml-8 mb-2">
                        <li>Derecho a solicitar el acceso a sus datos.</li>
                        <li>
                            Derecho a solicitar su rectificación o supresión.
                        </li>
                        <li>
                            Derecho a solicitar la limitación de su tratamiento.
                        </li>
                        <li>Derecho a la portabilidad de los datos.</li>
                        <li>Derecho a la retirada de su consentimiento.</li>
                    </ol>
                    <p className="mb-2">
                        Puede enviar su solicitud a través de la cuenta de
                        correo electrónico: <strong>hola@oiches.com</strong>
                    </p>

                    <h2 className="font-medium text-lg pt-4 pb-2">
                        4. Medidas de seguridad
                    </h2>
                    <p className="mb-2">
                        Oiches tiene implantadas las medidas técnicas y
                        organizativas necesarias para garantizar la seguridad de
                        sus datos de carácter personal y evitar su alteración,
                        pérdida, tratamiento o acceso no autorizado.
                    </p>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};

export default PoliticaPrivacidad;
