import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PoliticaPrivacidad = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Política de privacidad" />
            <main className="w-11/12 mx-auto my-6 pb-14 md:max-w-7xl">
                <p className="mb-2">
                    De acuerdo con la normativa de Protección de Datos de
                    Carácter Personal, procedemos a informarle del tratamiento
                    de datos personales que realizamos de nuestros clientes y/o
                    usuarios de la presente página web.
                </p>
                <p className="mb-2">
                    María Carmen Salgueiro Rodríguez (En adelante, Oiches)- NIF:
                    33996817B
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
                    SERVICIO DE ATENCIÓN AL USUARIO A TRAVÉS DEL FORMULARIO DE
                    CONTACTO Y/O ENVÍO DE CORREOS ELECTRÓNICOS
                </p>
                <p className="mb-2">
                    Finalidad de tratamiento: trataremos los datos estrictamente
                    necesarios para gestionar su petición.
                </p>
                <p className="mb-2">
                    Legitimación: existe un interés legítimo por ambas partes
                    para la resolución de solicitudes o consultas.
                </p>
                <p className="mb-2">
                    En caso de reclamaciones relacionadas con nuestros productos
                    o servicios, la legitimación es el cumplimiento de
                    obligaciones legales por nuestra parte.
                </p>
                <p className="mb-2">
                    Plazo de conservación: el tiempo necesario para dar
                    respuesta a su solicitud y en cualquier caso, hasta que
                    transcurra el plazo de prescripción de posibles acciones de
                    responsabilidad derivadas del tratamiento.
                </p>
                <h2 className="font-medium text-lg pt-4 pb-2">
                    2. Destinatarios de cesiones
                </h2>
                <p className="mb-2">
                    No cederemos sus datos a terceros, salvo para dar
                    cumplimiento a una obligación legal.
                </p>
                <h2 className="font-medium text-lg pt-4 pb-2">
                    3. Política de cookies
                </h2>
                <p className="mb-2">
                    Para revisar el tratamiento de datos relativo a las cookies,
                    puede consultar la política de cookies, disponible en esta
                    misma página web.
                </p>
                <p className="mb-2">
                    Podrá configurar sus preferencias respecto al uso de cookies
                    en el propio aviso de configuración de cookies.
                </p>

                <h2 className="font-medium text-lg pt-4 pb-2">4. Derechos</h2>
                <p className="mb-2">
                    Por último, le informamos de sus derechos en materia de
                    protección de datos.
                </p>
                <ol className="list-disc ml-8 mb-2">
                    <li>Derecho a solicitar el acceso a sus datos</li>
                    <li>Derecho a solicitar su rectificación o supresión.</li>
                    <li>Derecho a solicitar la limitación de su tratamiento</li>
                    <li>Derecho a la portabilidad de los datos</li>
                    <li>Derecho a la retirada de sus datos</li>
                </ol>
                <p className="mb-2">
                    Puede enviar su solicitud a través de la cuenta de correo
                    electrónico: hola@oiches.com
                </p>
                <h2 className="font-medium text-lg pt-4 pb-2">
                    5. Medidas de seguridad
                </h2>
                <p className="mb-2">
                    Oiches tiene implantadas las medidas técnicas y
                    organizativas necesarias para garantizar la seguridad de sus
                    datos de carácter personal y evitar su alteración, la
                    pérdida y el tratamiento y/o el acceso no autorizado,
                    teniendo en cuenta el estado de la tecnología, la naturaleza
                    de los datos almacenados y los riesgos provenientes de la
                    acción humana o del medio físico y natural a que están
                    expuestas.
                </p>
            </main>
            <Footer />
        </motion.div>
    );
};

export default PoliticaPrivacidad;
