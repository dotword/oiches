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
                noIndex={true}
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Política de Privacidad - Oiches',
                    description:
                        'Consulta nuestra política de privacidad para conocer cómo tratamos tus datos personales en Oiches.',
                    url: 'https://oiches.com/politica-privacidad',
                }}
            />

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Política de privacidad" />
                <main className="container-main-pb">
                    <h2 className="font-medium text-lg pt-4 pb-2">
                        1. Responsable de tratamiento de los datos
                    </h2>
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
                        2. Finalidad del tratamiento, legitimación y plazo de
                        conservación
                    </h2>
                    <p className="mb-2">
                        Oiches podrá tratar sus datos de carácter personal de
                        acuerdo con las siguientes finalidades:
                    </p>
                    <p className="font-semibold">
                        Servicio de atención al usuario a través del formulario
                        de contacto y/o envío de correos electrónicos:
                    </p>
                    <ul className="ml-8 list-disc">
                        <li>
                            Finalidad de tratamiento: trataremos los datos
                            estrictamente necesarios para gestionar su petición.
                        </li>
                        <li>
                            Legitimación: existe un interés legítimo por ambas
                            partes para la resolución de solicitudes o
                            consultas. En caso de reclamaciones relacionadas con
                            nuestros servicios, la legitimación es el
                            cumplimiento de obligaciones legales por nuestra
                            parte.
                        </li>
                        <li>
                            Plazo de conservación: el tiempo necesario para dar
                            respuesta a su solicitud y en cualquier caso, hasta
                            que transcurra el plazo de prescripción de posibles
                            acciones de responsabilidad derivadas del
                            tratamiento.
                        </li>
                    </ul>

                    <p className="font-semibold">
                        Gestionar el registro como usuario de la web
                    </p>
                    <ul className="ml-8 list-disc">
                        <li>
                            Finalidad de tratamiento: En caso de que decida
                            registrarse como usuario de la web, necesitaremos
                            tratar sus datos para identificarle como usuario y
                            darle acceso a los beneficios que obtiene por su
                            condición de usuario registrado.
                        </li>
                        <li>
                            Legitimación: El tratamiento de los datos está
                            legitimado por su consentimiento.
                        </li>
                        <li>
                            Plazo de conservación: hasta que decida dar de baja
                            el usuario. Puede consultar cómo cancelar su cuenta
                            de usuario en el apartado “5. Derechos”.
                        </li>
                    </ul>
                    <p className="font-semibold">Uso de redes sociales</p>
                    <p>
                        Los datos recogidos mediante las redes sociales de las
                        que disponemos, son tratados en cumplimiento de la
                        normativa vigente en materia de protección de datos, le
                        informamos que al hacer uso de nuestras redes sociales,
                        usted se atiene a la política de protección de datos
                        dispuesta por las mismas.
                    </p>
                    <p>
                        Deberá tener en cuenta que, al realizar comentarios o
                        pulsar “me gusta” a las publicaciones, tanto los
                        comentarios realizados como su nombre de usuario serán
                        visibles y accesibles para el resto de usuarios del
                        perfil. Usted mismo podrá editar y/o eliminar los
                        comentarios que usted mismo haya realizado.
                    </p>
                    <p>
                        Le recordamos que si desea que se elimine algún
                        comentario, fotografía, video o cualquier otro elemento
                        relacionado con su usuario, podrá comunicarlo
                        enviándonos un mensaje privado, o por correo
                        electrónico: hola@oiches.com
                    </p>

                    <h2 className="font-medium text-lg pt-4 pb-2">
                        3. Destinatarios de cesiones
                    </h2>
                    <p className="mb-2">
                        No cederemos sus datos a terceros, salvo para dar
                        cumplimiento a una obligación legal.
                    </p>

                    <h2 className="font-medium text-lg pt-4">
                        4. Política de cookies
                    </h2>
                    <p>
                        Para revisar el tratamiento de datos relativo a las
                        cookies, puede consultar la política de cookies,
                        disponible en esta misma página web.
                    </p>
                    <p>
                        Podrá configurar sus preferencias respecto al uso de
                        cookies en el propio aviso de configuración de cookies.
                    </p>

                    <h2 className="font-medium text-lg pt-4 pb-2">
                        5. Derechos en materia de protección de datos
                    </h2>
                    <ol className="list-disc ml-8 mb-2">
                        <li>Derecho a solicitar el acceso a sus datos.</li>
                        <li>
                            Derecho a solicitar su rectificación o supresión.
                        </li>
                        <li>
                            Derecho a solicitar la limitación de su
                            tratamiento,y a oponerse al tratamiento.
                        </li>
                        <li>Derecho a la portabilidad de los datos.</li>
                        <li>Derecho a la retirada de su consentimiento.</li>
                    </ol>
                    <p>
                        Puede enviar su solicitud a través de la cuenta de
                        correo electrónico: hola@oiches.com.
                    </p>
                    <p>
                        Si considera que no hemos atendido correctamente sus
                        derechos, podrá formular una reclamación ante la Agencia
                        Española de Protección de Datos, a través de las
                        siguientes vías:
                    </p>
                    <ol className="list-disc ml-8 mb-2">
                        <li>
                            Sede electrónica:{' '}
                            <a
                                href="https://www.aepd.es/"
                                className="underline"
                            >
                                www.aepd.es
                            </a>
                        </li>
                        <li>Correo postal: C/ Jorge Juan 6, 28001 – Madrid</li>
                        <li>Teléfono: 901 100 099 – 91 266 35 17</li>
                    </ol>

                    <h2 className="font-medium text-lg pt-4 pb-2">
                        6. Medidas de seguridad
                    </h2>
                    <p>
                        Oiches tiene implantadas las medidas técnicas y
                        organizativas necesarias para garantizar la seguridad de
                        sus datos de carácter personal y evitar su alteración,
                        la pérdida y el tratamiento y/o el acceso no autorizado,
                        teniendo en cuenta el estado de la tecnología, la
                        naturaleza de los datos almacenados y los riesgos
                        provenientes de la acción humana o del medio físico y
                        natural a que están expuestas.
                    </p>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};

export default PoliticaPrivacidad;
