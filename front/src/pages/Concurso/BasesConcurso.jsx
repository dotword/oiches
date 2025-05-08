import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BasesConcurso = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Bases del concurso de músicos Oiches 2025" />
            <main className="w-11/12 mx-auto my-6 pb-14 md:max-w-5xl">
                <ol className="list-decimal list-inside my-3 pl-4 text-lg">
                    <li>
                        <a href="#que-son" className="underline">
                            ¿QUÉ SON?
                        </a>
                    </li>

                    <li>
                        <a href="#participar" className="underline">
                            ¿QUIÉN PUEDE PARTICIPAR?
                        </a>
                    </li>
                    <li>
                        <a href="#inscribirse" className="underline">
                            ¿CÓMO INSCRIBIRSE?
                        </a>
                    </li>
                    <li>
                        <a href="#calendario" className="underline">
                            CALENDARIO Y FASES DEL CONCURSO
                        </a>
                    </li>
                    <li>
                        <a href="#votaciones" className="underline">
                            SISTEMA DE VOTACIONES ONLINE
                        </a>
                    </li>
                    <li>
                        <a href="#premios" className="underline">
                            PREMIOS
                        </a>
                    </li>
                    <li>
                        <a href="#legales" className="underline">
                            CONSIDERACIONES LEGALES
                        </a>
                    </li>
                </ol>

                <div id="que-son">
                    <h2 className="font-semibold text-lg pt-4 pb-2">
                        1. ¿QUÉ SON?
                    </h2>
                    <p className="mb-2">
                        La finalidad del concurso es impulsar el talento de los
                        artistas emergentes, dándoles más visibilidad y la
                        oportunidad de compartir su trabajo en la primera
                        edición de los conciertos de Oiches, celebrados en La
                        Conservera (Viveiro, Lugo).
                    </p>
                </div>
                <div id="participar">
                    <h2 className="font-semibold text-lg pt-4 pb-2">
                        2. ¿QUIÉN PUEDE PARTICIPAR?
                    </h2>
                    <p className="mb-2">
                        El concurso es libre y gratuito para todos los
                        participantes y va dirigido a todos los proyectos
                        musicales en activo en el territorio nacional, en el año
                        2025.
                    </p>
                    <p className="mb-2">
                        El concurso está destinado a artistas cuyos miembros
                        sean mayores de 18 años. En el caso de participación de
                        menores de edad, será obligatorio adjuntar una
                        autorización firmada por su madre, padre o tutor legal,
                        junto con copia del DNI del menor y del firmante, a
                        través del correo electrónico habilitado por la
                        organización.
                    </p>
                    <p className="mb-2">
                        No podrán participar los proyectos con contenidos
                        discriminatorios.
                    </p>
                    <p className="mb-2">
                        No podrán participar proyectos que utilicen falsos
                        directos.
                    </p>
                    <p className="mb-2">
                        Cada artista debe disponer de un repertorio para actuar
                        de al menos 40 minutos.
                    </p>
                    <p className="mb-2">
                        Los finalistas deberán cumplir todos los requisitos
                        legales necesarios para poder actuar en público y
                        desplazarse a Viveiro el día 20/09/2025.
                    </p>
                </div>
                <div id="inscribirse">
                    <h2 className="font-semibold text-lg pt-4 pb-2">
                        3. ¿CÓMO INSCRIBIRSE?
                    </h2>
                    <p className="mb-2">
                        Los participantes deberán registrase (si no lo han hecho
                        ya) en la web:{' '}
                        <a
                            href="/register"
                            target="_blank"
                            className="underline"
                        >
                            www.oiches.com
                        </a>
                        , incluyendo la siguiente información: nombre del
                        proyecto musical, email, género(s) musical, enlace a su
                        web o RRSS, incluye una breve biografía del
                        artista/banda, al menos una foto del artista/grupo,
                        mínimo 2-4 videos de YouTube con temas de su repertorio
                        (preferiblemente algún video en directo), rider y/o
                        condiciones.
                    </p>
                    <p className="mb-2">
                        Dentro de su cuenta de Oiches, en la ficha del proyecto
                        que desean inscribir, deberán acceder a ‘Concurso Oiches
                        2025’ y aceptar las bases del concurso.
                    </p>
                    <p>
                        Deberán ser seguidores de la cuenta oficial de Instagram
                        de Oiches:{' '}
                        <a
                            href="https://www.instagram.com/oiches_musica/"
                            target="_blank"
                            className="underline"
                        >
                            @oiches_musica
                        </a>
                        .
                    </p>
                </div>
                <div id="calendario">
                    <h2 className="font-semibold text-lg pt-4 pb-2">
                        4. CALENDARIO Y FASES DEL CONCURSO
                    </h2>
                    <ul className="list-disc list-inside my-3 pl-4">
                        <li>
                            <b>FASE 1</b>: Inscripción de los proyectos:
                            19/05/2025 – 09/06/2025. A partir del 19/05/2025 y
                            hasta el 09/06/2025 estará abierta la inscripción
                            para los artistas interesados en participar.
                        </li>
                        <li>
                            <b>FASE 2</b>: Votación del público: 11/06/2025 –
                            06/07/2025. El proceso de votaciones online
                            comenzará el 11/06/2025 hasta el 06/07/2025. Los 6
                            proyectos más votados pasarán a la fase 3 del
                            concurso.
                        </li>
                        <li>
                            <b>FASE 3</b>: Votación del jurado: 14/07/2025 –
                            18/07/2025. A partir del día 14/07/2025, la
                            organización se reunirá para seleccionar a los 3
                            proyectos ganadores que actuarán en Oiches 2025.{' '}
                        </li>
                        <li>
                            <b>FASE 4</b>: Selección final: 21/07/2025. Se
                            contactará de manera privada, a través de correo
                            electrónico, a cada artista ganador y dispondrán de
                            7 días desde el comunicado para confirmar su
                            asistencia. En caso de no poder asistir, su plaza
                            pasaría a el siguiente proyecto seleccionado
                        </li>
                        <li>
                            <b>FASE 5</b>:{' '}
                            <span className="font-semibold text-purpleOiches">
                                CONCIERTO!!!
                            </span>{' '}
                            el día 20/09/2025, en La Conservera, Viveiro (Lugo).
                        </li>
                    </ul>
                    <p>
                        Todas las fechas y programación indicadas están sujetas
                        a posibles modificaciones por la Organización. Cualquier
                        modificación o cancelación de este concurso será
                        comunicada a través de su página web y/o redes sociales.
                    </p>
                </div>
                <div id="votaciones">
                    <h2 className="font-semibold text-lg pt-4 pb-2">
                        5. SISTEMA DE VOTACIONES ONLINE
                    </h2>
                    <ul className="list-disc list-inside my-3 pl-4">
                        <li>
                            Una vez abierto el voto al público, se podrá
                            realizar a través de la web: <b>www.oiches.com</b>.
                        </li>
                        <li>
                            El usuario deberá introducir su correo electrónico y
                            validarlo con un mensaje que recibirá en esa
                            dirección de correo electrónico.
                        </li>
                        <li>
                            Cada usuario podrá votar a un máximo de 3 proyectos
                            musicales.
                        </li>
                    </ul>
                </div>
                <div id="premios">
                    <h2 className="font-semibold text-lg pt-4 pb-2">
                        6. PREMIOS
                    </h2>
                    <p className="mb-2">
                        Habrá <b>3 proyectos ganadores</b>.
                    </p>
                    <p className="mb-2">
                        Los ganadores actuarán en la sala <b>La Conservera</b>{' '}
                        (Viveiro, Lugo), con las siguientes condiciones:
                    </p>
                    <ul className="list-disc list-inside my-3 pl-4">
                        <li>
                            Pago de <b>600 € por actuación</b>, en concepto de
                            gastos, que será pagado mediante transferencia
                            bancaria, tras la celebración del concierto o contra
                            factura emitida por el artista.
                        </li>
                        <li>
                            Los gastos de desplazamiento, alojamiento y dietas
                            correrán a cargo de los músicos.
                        </li>
                        <li>
                            Técnica del escenario y de sonido facilitado por la
                            organización.
                        </li>
                        <li>
                            En ningún caso, la renuncia al premio podrá ser
                            canjeado por importe en metálico alguno. Tampoco
                            podrán ser objeto de cambio, alteración o
                            compensación a petición del ganador.
                        </li>
                    </ul>
                </div>
                <div id="legales">
                    <h2 className="font-semibold text-lg pt-4 pb-2">
                        7. CONSIDERACIONES LEGALES
                    </h2>
                    <p className="mb-2">
                        La organizadora es Carmen Salgueiro Rodríguez (en
                        adelante será designada como Oiches), con NIF:
                        33996817B, tiene previsto realizar un concurso de ámbito
                        nacional que se desarrollará de conformidad con lo
                        establecido en las presentes bases.
                    </p>
                    <p className="mb-2 font-semibold text-lg">
                        Selección y moderación de contenidos
                    </p>
                    <p className="mb-2">
                        Oiches se reserva el derecho a seleccionar y moderar los
                        contenidos publicados tanto en su página web como en sus
                        redes sociales oficiales. En consecuencia, podrá
                        eliminar cualquier material o información que, a su
                        juicio, pueda resultar ilícito, ofensivo, peligroso,
                        lesivo para los derechos de terceros, contrario a las
                        presentes bases legales, o que impida el uso adecuado de
                        los canales oficiales de comunicación. Asimismo, Oiches
                        podrá suprimir contenidos que, directa o indirectamente,
                        puedan herir la sensibilidad del público, promuevan
                        actividades ilegales o infrinjan la legislación vigente.
                    </p>
                    <p className="mb-2">
                        Igualmente, Oiches se reserva el derecho a eliminar y,
                        en su caso, denunciar cualquier documento electrónico o
                        información que contenga virus u otros elementos
                        técnicos que puedan dañar, alterar o impedir el
                        funcionamiento normal de la página web o comprometer la
                        imagen de la organización.
                    </p>
                    <p className="mb-2">
                        Se implementará un sistema interno de moderación que
                        supervisará posibles prácticas de votación no
                        autorizadas, como la compra de votos mediante correos
                        electrónicos, incentivos económicos, o la creación
                        masiva y automatizada de cuentas con el fin de manipular
                        los resultados. Oiches se reserva el derecho de
                        descalificar a cualquier participante que, directa o
                        indirectamente, incurra o sea razonablemente sospechoso
                        de incurrir en dichas prácticas.
                    </p>
                    <p className="mb-2 font-semibold text-lg">
                        Protección de datos personales
                    </p>
                    <p className="mb-2">
                        En cumplimiento de lo dispuesto en el Reglamento (UE)
                        2016/679 del Parlamento Europeo y del Consejo
                        (Reglamento General de Protección de Datos), así como en
                        la Ley Orgánica 3/2018, de 5 de diciembre, de Protección
                        de Datos Personales y garantía de los derechos
                        digitales, le informamos de que los datos personales
                        facilitados por los participantes serán incorporados a
                        un fichero titularidad de Oiches, con la finalidad de
                        gestionar su participación en el presente concurso, así
                        como para el mantenimiento de las relaciones derivadas
                        del mismo.
                    </p>
                    <p className="mb-2">
                        Los datos no serán cedidos a terceros, salvo en los
                        casos legalmente previstos, como por ejemplo a la
                        Agencia Estatal de Administración Tributaria (A.E.A.T.)
                        o a entidades bancarias cuando sea necesario para la
                        gestión de pagos previamente acordados.
                    </p>
                    <p className="mb-2">
                        Los participantes podrán ejercer en cualquier momento
                        sus derechos de acceso, rectificación, supresión,
                        oposición, portabilidad y limitación del tratamiento
                        (derechos ARSOPL), remitiendo una solicitud expresa
                        junto con una copia de su documento de identidad al
                        correo electrónico: hola@oiches.com.
                    </p>
                    <p className="mb-2 font-semibold text-lg">
                        Cesión de derechos
                    </p>
                    <p className="mb-2">
                        Los participantes manifiestan y garantizan que son
                        titulares exclusivos de todos los derechos de propiedad
                        intelectual, industrial y de imagen relativos a los
                        contenidos que presenten en el marco del concurso, y
                        que, en su caso, cuentan con las autorizaciones
                        necesarias de terceros para su utilización. En
                        consecuencia, se comprometen a no aportar contenidos
                        sobre los que no ostenten los derechos necesarios,
                        exonerando a Oiches de cualquier responsabilidad
                        derivada de eventuales reclamaciones por parte de
                        terceros o cotitulares de dichas obras.
                    </p>
                    <p className="mb-2">
                        Los participantes serán responsables frente a Oiches y
                        frente a terceros por cualquier daño o perjuicio que
                        pudiera derivarse del incumplimiento de esta obligación,
                        y se comprometen a mantener indemne a la organización
                        frente a cualquier reclamación, sanción o perjuicio
                        relacionado con una infracción de derechos de imagen,
                        propiedad intelectual o industrial sobre los materiales
                        aportados.
                    </p>
                    <p className="mb-2">
                        Asimismo, los participantes ceden a Oiches, con carácter
                        gratuito y sin limitación temporal ni territorial, los
                        derechos de reproducción, distribución, transformación,
                        comunicación pública y puesta a disposición, tanto de
                        sus imágenes como de las obras (música, logos,
                        actuaciones, etc.) presentadas en el concurso. Esta
                        cesión incluye todos los formatos y medios actuales y
                        futuros, incluidos, a título enunciativo, pero no
                        limitativo, prensa, televisión, cine, internet y redes
                        sociales.
                    </p>
                    <p className="mb-2">
                        Dicha cesión faculta a Oiches a utilizar dichos
                        contenidos en cualquier acción promocional, publicitaria
                        o divulgativa vinculada al concurso, al concierto y a
                        futuras ediciones del evento, incluyendo presentaciones,
                        ruedas de prensa, publicaciones digitales o físicas, y
                        otros eventos organizados por la entidad.
                    </p>
                    <p className="mb-2">
                        En particular, los participantes autorizan expresamente
                        a Oiches a utilizar su nombre, imagen, logotipo, música
                        y cualquier otra representación audiovisual vinculada a
                        su participación en:
                    </p>
                    <ul className="list-disc list-inside my-3 pl-4">
                        <li>La página web oficial de Oiches.</li>
                        <li>Los perfiles de Oiches en redes sociales.</li>
                        <li>
                            Notas de prensa, comunicados oficiales, material
                            gráfico o audiovisual de carácter promocional.
                        </li>
                        <li>
                            Publicaciones relativas a los artistas ganadores/as
                            y a sus actuaciones.
                        </li>
                    </ul>
                    <p className="mb-2 font-semibold text-lg">
                        Limitación de responsabilidad
                    </p>
                    <p className="mb-2">
                        Oiches no se responsabiliza de posibles interrupciones o
                        fallos en la participación por causas de fuerza mayor,
                        problemas técnicos en la red, en el sistema informático
                        o en las plataformas digitales utilizadas. Tampoco será
                        responsable por la imposibilidad de contactar con los
                        participantes ganadores debido a errores en los datos
                        facilitados.
                    </p>
                    <p className="mb-2 font-semibold text-lg">
                        Aceptación de las bases
                    </p>
                    <p className="mb-2">
                        La participación en el presente concurso implica la
                        plena aceptación de estas bases legales. Cualquier
                        aspecto no previsto en ellas será resuelto por la
                        organización conforme a su criterio. Oiches se reserva
                        el derecho de modificar las presentes bases en cualquier
                        momento, siempre que existan causas justificadas,
                        comprometiéndose a comunicar dichas modificaciones a
                        través de su página web.
                    </p>
                    <p className="mb-2 font-semibold text-lg">
                        Legislación aplicable y jurisdicción
                    </p>
                    <p className="mb-2">
                        El presente concurso se rige por la legislación
                        española. Para cualquier controversia que pudiera
                        derivarse de su interpretación o aplicación, las partes
                        se someten expresamente a los Juzgados y Tribunales de
                        Lugo, con renuncia a cualquier otro fuero que pudiera
                        corresponderles.
                    </p>
                </div>
            </main>
            <Footer />
        </motion.div>
    );
};

export default BasesConcurso;
