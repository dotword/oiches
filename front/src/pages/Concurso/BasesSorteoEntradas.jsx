import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BasesSorteoEntradas = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Bases legales del sorteo de entradas “Concierto Oiches 2025”" />
            <main className="w-11/12 mx-auto my-6 pb-14 md:max-w-5xl">
                <h2 className="font-semibold text-lg pt-4 pb-2">OBJETO</h2>
                <p className="mb-2">
                    El sorteo tiene por objeto la entrega de{' '}
                    <b>1 (una) entrada doble</b> para el concierto{' '}
                    <b>Oiches 2025</b>, que tendrá lugar el{' '}
                    <b>
                        20 de septiembre de 2025 en La Conservera (Viveiro,
                        Lugo)
                    </b>
                    .
                </p>

                <h2 className="font-semibold text-lg pt-4 pb-2">
                    PARTICIPANTES
                </h2>
                <p className="mb-2">Podrán participar:</p>
                <ul className="list-disc list-inside my-3 pl-4">
                    <li>Personas físicas mayores de 18 años.</li>
                    <li>
                        Cuentas de Instagram <b>públicas</b>.
                    </li>
                    <li>Residentes en España.</li>
                    <li>
                        No podrán participar empleados, familiares directos del
                        organizador ni agencias colaboradoras.
                    </li>
                </ul>

                <h2 className="font-semibold text-lg pt-4 pb-2">
                    PERIODO DE PARTICIPACIÓN
                </h2>
                <ul className="list-disc list-inside my-3 pl-4">
                    <li>
                        <b>Inicio:</b> 25 de agosto de 2025, 12:00 h (CEST)
                    </li>
                    <li>
                        <b>Fin:</b> 31 de agosto de 2025, 12:00 h (CEST)
                    </li>
                </ul>
                <p>Las participaciones fuera de este plazo no serán válidas.</p>

                <h2 className="font-semibold text-lg pt-4 pb-2">
                    MECÁNICA DE PARTICIPACIÓN
                </h2>
                <p>Para participar, los usuarios deberán:</p>
                <ol className="my-3 pl-4 list-inside list-decimal">
                    <li>
                        Seguir la cuenta de Instagram{' '}
                        <a
                            href="https://www.instagram.com/oiches_musica/"
                            className="font-semibold underline"
                        >
                            @oiches_musica
                        </a>
                        .
                    </li>
                    <li>Dar “Me gusta” a la publicación del sorteo.</li>
                    <li>
                        Comentar esa publicación <b>etiquetando a 1 amigo</b>{' '}
                        con quien asistir al concierto.
                    </li>
                    <li>
                        (Opcional) Compartir la publicación en sus Stories
                        mencionando{' '}
                        <a
                            href="https://www.instagram.com/oiches_musica/"
                            className="font-semibold underline"
                        >
                            @oiches_musica
                        </a>{' '}
                        para una participación extra.
                    </li>
                </ol>

                <h2 className="font-semibold text-lg pt-4 pb-2">PREMIOS</h2>
                <ul className="list-disc list-inside my-3 pl-4">
                    <li>
                        <b>1 premio único</b>: 1 entrada doble (2 tickets) para
                        el concierto Oiches 2025 el 20/09/2025 en La Conservera
                        (Viveiro).
                    </li>
                    <li>
                        El premio no es intercambiable por su valor económico,
                        ni canjeable por otras fechas o productos.
                    </li>
                </ul>

                <h2 className="font-semibold text-lg pt-4 pb-2">
                    SELECCIÓN DE GANADORES
                </h2>
                <ul className="list-disc list-inside my-3 pl-4">
                    <li>
                        El día <b>1 de septiembre de 2025</b> se realizará el
                        sorteo entre todos los comentarios válidos, mediante la
                        herramienta CommentPicker.com o similar.
                    </li>
                    <li>
                        Se extraerán 2 ganadores en conjunto (un solo premio
                        doble).
                    </li>
                </ul>

                <h2 className="font-semibold text-lg pt-4 pb-2">
                    COMUNICACIÓN DE GANADORES
                </h2>

                <ul className="list-disc list-inside my-3 pl-4">
                    <li>
                        Se anunciará públicamente en un post el 1 de septiembre
                        de 2025 a partir de las 18:00 h (CEST).
                    </li>
                    <li>
                        Además, contactaremos a los ganadores vía mensaje
                        directo en Instagram.
                    </li>
                </ul>

                <h2 className="font-semibold text-lg pt-4 pb-2">
                    ENTREGA DEL PREMIO
                </h2>

                <ul className="list-disc list-inside my-3 pl-4">
                    <li>
                        Los ganadores deberán confirmar por mensaje directo sus
                        datos personales (nombre completo, DNI/NIE, e mail)
                        antes del <b>5 de septiembre de 2025</b>.
                    </li>
                    <li>
                        Una vez confirmados, recibirán las instrucciones para
                        recoger sus entradas.
                    </li>
                </ul>

                <h2 className="font-semibold text-lg pt-4 pb-2">
                    DATOS PERSONALES
                </h2>

                <ul className="list-disc list-inside my-3 pl-4">
                    <li>
                        Los datos recabados se usarán exclusivamente para
                        gestionar el sorteo y el envío de premios.
                    </li>
                    <li>No se cederán a terceros salvo obligación legal.</li>
                    <li>
                        Podrás ejercer tus derechos de acceso, rectificación,
                        supresión y otros previstos en el RGPD dirigiéndote a
                        hola@oiches.com.
                    </li>
                </ul>

                <h2 className="font-semibold text-lg pt-4 pb-2">
                    EXENCIÓN DE RESPONSABILIDAD DE INSTAGRAM
                </h2>

                <ul className="list-disc list-inside my-3 pl-4">
                    <li>Instagram no patrocina ni administra este sorteo.</li>
                    <li>
                        Se libera a Instagram de cualquier responsabilidad y no
                        guarda relación alguna con el organizador.
                    </li>
                </ul>

                <h2 className="font-semibold text-lg pt-4 pb-2">
                    RESPONSABILIDAD Y MODIFICACIONES
                </h2>

                <ul className="list-disc list-inside my-3 pl-4">
                    <li>
                        El organizador no se hace responsable de posibles
                        incidencias ajenas a su voluntad (errores de Instagram,
                        problemas de conexión, etc.).
                    </li>
                    <li>
                        Se reserva el derecho de modificar fechas, plazos o
                        premios por causas de fuerza mayor o cambios en el
                        evento. En tal caso, se informará a los participantes
                        con antelación.
                    </li>
                </ul>

                <h2 className="font-semibold text-lg pt-4 pb-2">
                    ACEPTACIÓN DE LAS BASES
                </h2>
                <p className="mb-2">
                    La participación en el sorteo implica la aceptación íntegra
                    de estas bases y de las decisiones que adopte el organizador
                    para resolver cualquier cuestión derivada del sorteo.
                </p>

                <h2 className="font-semibold text-lg pt-4 pb-2">
                    ORGANIZADOR{' '}
                </h2>
                <p className="mb-2">
                    La persona física Carmen Salgueiro, con NIF/CIF 33996817B,
                    es la responsable del sorteo “Oiches 2025”.
                </p>
            </main>
            <Footer />
        </motion.div>
    );
};

export default BasesSorteoEntradas;
