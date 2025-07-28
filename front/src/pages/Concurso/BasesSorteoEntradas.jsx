import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BasesSorteoEntradas = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
            className="min-h-screen bg-white"
        >
            <Header txt='Bases legales del sorteo de entradas "Concierto Oiches 2025"' />

            <main className="max-w-3xl mx-auto px-6 py-12">
                {/* Índice */}
                <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 text-purpleOiches">
                        Índice
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="space-y-1">
                            <a
                                href="#objeto"
                                className="block hover:text-purpleOiches"
                            >
                                1. Objeto
                            </a>
                            <a
                                href="#participantes"
                                className="block hover:text-purpleOiches"
                            >
                                2. Participantes
                            </a>
                            <a
                                href="#periodo"
                                className="block hover:text-purpleOiches"
                            >
                                3. Período de participación
                            </a>
                            <a
                                href="#mecanica"
                                className="block hover:text-purpleOiches"
                            >
                                4. Mecánica de participación
                            </a>
                            <a
                                href="#premios"
                                className="block hover:text-purpleOiches"
                            >
                                5. Premios
                            </a>
                            <a
                                href="#ganadores"
                                className="block hover:text-purpleOiches"
                            >
                                6. Selección de ganadores
                            </a>
                            <a
                                href="#comunicacion"
                                className="block hover:text-purpleOiches"
                            >
                                7. Comunicación de ganadores
                            </a>
                        </div>
                        <div className="space-y-1">
                            <a
                                href="#entrega"
                                className="block hover:text-purpleOiches"
                            >
                                8. Entrega del premio
                            </a>
                            <a
                                href="#datos"
                                className="block hover:text-purpleOiches"
                            >
                                9. Datos personales
                            </a>
                            <a
                                href="#instagram"
                                className="block hover:text-purpleOiches"
                            >
                                10. Exención Instagram
                            </a>
                            <a
                                href="#responsabilidad"
                                className="block hover:text-purpleOiches"
                            >
                                11. Responsabilidad
                            </a>
                            <a
                                href="#aceptacion"
                                className="block hover:text-purpleOiches"
                            >
                                12. Aceptación
                            </a>
                            <a
                                href="#organizador"
                                className="block hover:text-purpleOiches"
                            >
                                13. Organizador
                            </a>
                        </div>
                    </div>
                </nav>

                {/* Contenido */}
                <div className="space-y-12">
                    <section id="objeto">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            1. OBJETO
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            El sorteo tiene por objeto la entrega de{' '}
                            <strong>1 (una) entrada doble</strong> para el
                            concierto <strong>Oiches 2025</strong>, que tendrá
                            lugar el{' '}
                            <strong>
                                20 de septiembre de 2025 en La Conservera
                                (Viveiro, Lugo)
                            </strong>
                            .
                        </p>
                    </section>

                    <section id="participantes">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            2. PARTICIPANTES
                        </h2>
                        <p className="text-gray-700 mb-3">Podrán participar:</p>
                        <ul className="space-y-1 text-gray-700 ml-4">
                            <li>• Personas físicas mayores de 18 años</li>
                            <li>
                                • Cuentas de Instagram <strong>públicas</strong>
                            </li>
                            <li>• Residentes en España</li>
                        </ul>
                        <p className="text-gray-700 mt-3">
                            No podrán participar empleados, familiares directos
                            del organizador ni agencias colaboradoras.
                        </p>
                    </section>

                    <section id="periodo">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            3. PERÍODO DE PARTICIPACIÓN
                        </h2>
                        <div className="space-y-2 text-gray-700">
                            <p>
                                <strong>Inicio:</strong> 25 de agosto de 2025,
                                12:00 h (CEST)
                            </p>
                            <p>
                                <strong>Fin:</strong> 31 de agosto de 2025,
                                12:00 h (CEST)
                            </p>
                            <p className="text-sm text-gray-600 mt-3">
                                Las participaciones fuera de este plazo no serán
                                válidas.
                            </p>
                        </div>
                    </section>

                    <section id="mecanica">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            4. MECÁNICA DE PARTICIPACIÓN
                        </h2>
                        <p className="text-gray-700 mb-3">
                            Para participar, los usuarios deberán:
                        </p>
                        <ol className="space-y-2 text-gray-700 ml-4">
                            <li>
                                1. Seguir la cuenta de Instagram{' '}
                                <a
                                    href="https://www.instagram.com/oiches_musica/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purpleOiches underline"
                                >
                                    @oiches_musica
                                </a>
                            </li>
                            <li>
                                2. Dar `Me gusta` a la publicación del sorteo.
                            </li>
                            <li>
                                3. Comentar esa publicación{' '}
                                <strong>etiquetando a 1 amigo</strong> con quien
                                asistir al concierto
                            </li>
                            <li>
                                4. (Opcional) Compartir la publicación en sus
                                Stories mencionando{' '}
                                <a
                                    href="https://www.instagram.com/oiches_musica/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purpleOiches underline"
                                >
                                    @oiches_musica
                                </a>{' '}
                                para una participación extra
                            </li>
                        </ol>
                    </section>

                    <section id="premios">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            5. PREMIOS
                        </h2>
                        <div className="text-gray-700">
                            <p className="mb-2">
                                <strong>Premio único:</strong> 1 entrada doble
                                (2 tickets) para el concierto Oiches 2025 -
                                20/09/2025 en La Conservera (Viveiro)
                            </p>
                            <p className="text-sm text-gray-600">
                                El premio no es intercambiable por su valor
                                económico, ni canjeable por otras fechas o
                                productos.
                            </p>
                        </div>
                    </section>

                    <section id="ganadores">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            6. SELECCIÓN DE GANADORES
                        </h2>
                        <ul className="space-y-2 text-gray-700 ml-4">
                            <li>
                                • El día{' '}
                                <strong>1 de septiembre de 2025</strong> se
                                realizará el sorteo entre todos los comentarios
                                válidos, mediante la herramienta
                                CommentPicker.com o similar
                            </li>
                            <li>
                                • Se extraerán 2 ganadores en conjunto (un solo
                                premio doble)
                            </li>
                        </ul>
                    </section>

                    <section id="comunicacion">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            7. COMUNICACIÓN DE GANADORES
                        </h2>
                        <ul className="space-y-2 text-gray-700 ml-4">
                            <li>
                                • Se anunciará públicamente en un post el 1 de
                                septiembre de 2025 a partir de las 18:00 h
                                (CEST)
                            </li>
                            <li>
                                • Además, contactaremos a los ganadores vía
                                mensaje directo en Instagram
                            </li>
                        </ul>
                    </section>

                    <section id="entrega">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            8. ENTREGA DEL PREMIO
                        </h2>
                        <ul className="space-y-2 text-gray-700 ml-4">
                            <li>
                                • Los ganadores deberán confirmar por mensaje
                                directo sus datos personales (nombre completo,
                                DNI/NIE, e-mail) antes del{' '}
                                <strong>5 de septiembre de 2025</strong>
                            </li>
                            <li>
                                • Una vez confirmados, recibirán las
                                instrucciones para recoger sus entradas
                            </li>
                        </ul>
                    </section>

                    <section id="datos">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            9. DATOS PERSONALES
                        </h2>
                        <ul className="space-y-2 text-gray-700 ml-4">
                            <li>
                                • Los datos recabados se usarán exclusivamente
                                para gestionar el sorteo y el envío de premios
                            </li>
                            <li>
                                • No se cederán a terceros salvo obligación
                                legal
                            </li>
                            <li>
                                • Podrás ejercer tus derechos de acceso,
                                rectificación, supresión y otros previstos en el
                                RGPD dirigiéndote a{' '}
                                <a
                                    href="mailto:hola@oiches.com"
                                    className="text-purpleOiches underline"
                                >
                                    hola@oiches.com
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section id="instagram">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            10. EXENCIÓN DE RESPONSABILIDAD DE INSTAGRAM
                        </h2>
                        <ul className="space-y-2 text-gray-700 ml-4">
                            <li>
                                • Instagram no patrocina ni administra este
                                sorteo
                            </li>
                            <li>
                                • Se libera a Instagram de cualquier
                                responsabilidad y no guarda relación alguna con
                                el organizador
                            </li>
                        </ul>
                    </section>

                    <section id="responsabilidad">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            11. RESPONSABILIDAD Y MODIFICACIONES
                        </h2>
                        <ul className="space-y-2 text-gray-700 ml-4">
                            <li>
                                • El organizador no se hace responsable de
                                posibles incidencias ajenas a su voluntad
                                (errores de Instagram, problemas de conexión,
                                etc.)
                            </li>
                            <li>
                                • Se reserva el derecho de modificar fechas,
                                plazos o premios por causas de fuerza mayor o
                                cambios en el evento. En tal caso, se informará
                                a los participantes con antelación
                            </li>
                        </ul>
                    </section>

                    <section id="aceptacion">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            12. ACEPTACIÓN DE LAS BASES
                        </h2>
                        <p className="text-gray-700">
                            La participación en el sorteo implica la aceptación
                            íntegra de estas bases y de las decisiones que
                            adopte el organizador para resolver cualquier
                            cuestión derivada del sorteo.
                        </p>
                    </section>

                    <section id="organizador">
                        <h2 className="text-xl font-bold text-purpleOiches mb-4 border-b border-gray-200 pb-2">
                            13. ORGANIZADOR
                        </h2>
                        <p className="text-gray-700">
                            La persona física Carmen Salgueiro, con NIF/CIF
                            33996817B, es la responsable del sorteo `Oiches
                            2025`.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </motion.div>
    );
};

export default BasesSorteoEntradas;
