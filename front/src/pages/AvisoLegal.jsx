import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AvisoLegal = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Aviso Legal" />
            <main className="w-11/12 mx-auto my-6 pb-14 md:max-w-7xl">
                <p className="mb-2">
                    En cumplimiento de la Ley 34/2002, de 11 de junio, de
                    servicios de la sociedad de la información y de comercio
                    electrónico (LSSI), le facilitamos información sobre el
                    titular de la presente página web:
                </p>
                <p className="mb-2">
                    María Carmen Salgueiro Rodríguez (En adelante, Oiches) -
                    NIF: 33996817B
                </p>
                <h2 className="font-medium text-lg pt-4 pb-2">
                    1. CONDICIONES GENERALES DE USO DEL PORTAL
                </h2>
                <p className="mb-2">
                    El portal www.oiches.com tiene por objeto informar al
                    público en general sobre sus servicios.
                </p>
                <p className="mb-2">
                    La visita y uso de este portal web implica la aceptación
                    total y expresa de las condiciones expuestas en el presente
                    aviso legal, por lo que al utilizar esta página web, usted
                    consiente quedar vinculado por estas condiciones, por
                    nuestra Política de Privacidad y Cookies, por lo que, si no
                    está usted de acuerdo con todas las condiciones expuestas en
                    nuestro Aviso Legal, Política de Privacidad y Cookies, no
                    debe usar esta página web.
                </p>
                <p className="mb-2">
                    Oiches se reserva el derecho de efectuar, sin previo aviso,
                    las modificaciones que considere oportunas en su portal,
                    pudiendo cambiar, suprimir, añadir o actualizar la
                    información contenida en su Web o en la configuración y
                    presentación de ésta.
                </p>
                <p className="mb-2">
                    Le recomendamos comprobar la vigencia y exactitud de los
                    contenidos del presente aviso legal, puesto que puede ser
                    modificado, con el fin de mantener actualizada la
                    información publicada en el portal.
                </p>
                <p className="mb-2">
                    La vigencia de las condiciones de uso irá en función de los
                    cambios que vayan resultando necesarios en la página web.
                    Siempre se publicarán las modificaciones oportunas.
                </p>
                <h2 className="font-medium text-lg pt-4 pb-2">
                    2. PROTECCIÓN DE DATOS
                </h2>
                <p className="mb-2">
                    Oiches cumple con las directrices de la normativa vigente en
                    materia de protección de datos: La Ley Orgánica 3/2018, de 5
                    de diciembre, de Protección de Datos Personales y garantía
                    de los derechos digitales y el Reglamento General de
                    Protección de Datos 2016/679 del Parlamento Europeo y del
                    Consejo de 27 de abril de 2016 y se compromete a garantizar
                    un correcto uso y tratamiento de datos de carácter personal
                    de los usuarios.
                </p>
                <p className="mb-2">
                    Deberá acceder a la Política de Privacidad de Oiches en el
                    siguiente enlace: www.oiches.com, para obtener información
                    sobre el tratamiento de sus datos de carácter personal.
                </p>
                <h2 className="font-medium text-lg pt-4 pb-2">
                    3. PROPIEDAD INTELECTUAL E INDUSTRIAL
                </h2>
                <p className="mb-2">
                    Oiches es la titular de todos los derechos de propiedad
                    intelectual e industrial de los contenidos de su página web,
                    así como de cualquier imagen, sonido, audio, video,
                    software, textos, marcas o logotipos, etc. Y están
                    protegidos por los correspondientes derechos de propiedad
                    intelectual e industrial.
                </p>
                <p className="mb-2">
                    Quedan expresamente prohibidas la reproducción, la
                    comunicación pública y distribución de cualquier contenido
                    de esta página web, con fines comerciales, en cualquier
                    soporte y por cualquier medio técnico, sin la autorización
                    previa y expresa de Oiches.
                </p>
                <p className="mb-2">
                    Si se autoriza al uso del contenido de la página web como
                    uso personal y privado. Cualquier otro uso deberá ser
                    comunicado y autorizado por Oiches previa y expresamente.
                </p>
                <h2 className="font-medium text-lg pt-4 pb-2">
                    4. RESPONSABILIDAD
                </h2>
                <p className="mb-2">
                    Oiches no garantiza la inexistencia de errores en el
                    contenido de la web, ni que este se encuentre actualizado,
                    aunque su intención será siempre la de evitarlos,
                    subsanarlos o actualizaros.
                </p>
                <p className="mb-2">
                    Oiches no se hace responsable de los daños y perjuicios de
                    cualquier naturaleza que puedan causarle al sistema
                    informático del usuario de la página web, como consecuencia
                    de la presencia de virus o del mal funcionamiento del
                    navegador.
                </p>
                <h2 className="font-medium text-lg pt-4 pb-2">5. ENLACES</h2>
                <p className="mb-2">
                    Oiches puede publicar enlaces externos y ajenos a esta
                    página web por considerarlos de interés. Al ser enlaces
                    ajenos, Oiches no se hace responsable del contenido de esos
                    hipervínculos, ni garantiza su disponibilidad técnica,
                    calidad, fiabilidad, exactitud y constitucionalidad de
                    cualquier material o formación contenida en los mismos.
                </p>
                <p className="mb-2">
                    La inclusión de estos hipervínculos no implica ningún tipo
                    de asociación con las entidades propietarias de los mismos.
                </p>
                <h2 className="font-medium text-lg pt-4 pb-2">
                    6. DERECHO DE EXCLUSIÓN
                </h2>
                <p className="mb-2">
                    Oiches podrá impedir el acceso a la web a cualquier usuario
                    que incumpla las condiciones reflejadas en el presente aviso
                    legal.
                </p>
                <h2 className="font-medium text-lg pt-4 pb-2">
                    7. LEGISLACIÓN APLICABLE Y JURISDICCIÓN
                </h2>
                <ol className="list-disc ml-8">
                    <li>
                        Ley de Servicios de la Sociedad de Información y
                        Comercio Electrónico (LSSICE).
                    </li>
                    <li>
                        Ley Orgánica de Protección de Datos Personales y
                        garantía de los derechos digitales (LOPDGDD).
                    </li>
                    <li>
                        Reglamento General de Protección de Datos (UE) 2016/679.
                    </li>
                    <li>
                        Ley General para la Defensa de los Consumidores y
                        Usuarios.
                    </li>
                </ol>
            </main>
            <Footer />
        </motion.div>
    );
};

export default AvisoLegal;
