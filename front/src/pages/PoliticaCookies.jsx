// import { motion } from 'framer-motion';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// const PoliticaCookies = () => {
//     return (
//         <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: '100%' }}
//             exit={{ opacity: 0, height: 0 }}
//         >
//             <Header txt="Política de cookies" />
//             <main className="w-11/12 mx-auto my-6 pb-14 md:max-w-7xl">
//                 <p className="mb-2">
//                     Una cookie es un fichero que se descarga en tu ordenador al
//                     acceder a determinadas páginas web. Las cookies permiten a
//                     una página web, entre otras cosas, almacenar y recuperar
//                     información sobre los hábitos de navegación de un usuario o
//                     de su equipo y, dependiendo de la información que contengan
//                     y de la forma en que utilice tu equipo, pueden utilizarse
//                     para reconocer al usuario. El navegador del usuario memoriza
//                     cookies en el disco duro solamente durante la sesión actual
//                     ocupando un espacio de memoria mínimo y no perjudicando al
//                     ordenador. Las cookies no contienen ninguna clase de
//                     información personal específica, y la mayoría de las mismas
//                     se borran del disco duro al finalizar la sesión de navegador
//                     (las denominadas cookies de sesión).
//                 </p>
//                 <p className="mb-2">
//                     La mayoría de los navegadores aceptan como estándar a las
//                     cookies y, con independencia de las mismas, permiten o
//                     impiden en los ajustes de seguridad las cookies temporales o
//                     memorizadas.
//                 </p>
//                 <h2 className="font-medium text-lg pt-4 pb-2">
//                     ¿Qué tipos de cookies utiliza el presente sitio web y con
//                     qué finalidad?
//                 </h2>
//                 <p className="mb-2">Según la entidad que las gestiona</p>
//                 <ol className="list-disc ml-8 mb-2">
//                     <li>
//                         <em>Cookies propias:</em> son las enviadas al terminal
//                         del usuario desde el equipo gestionado por el titular
//                         del sitio web y desde el cual se presta el servicio al
//                         usuario.
//                     </li>
//                     <li>
//                         <em>Cookies de terceros: </em>son las enviadas al
//                         terminal del usuario desde un equipo no gestionado por
//                         el titular del sitio web, sino por una tercera entidad.
//                     </li>
//                 </ol>
//                 <p className="mb-2">Según el tiempo que permanecen activadas</p>
//                 <ol className="list-disc ml-8 mb-2">
//                     <li>
//                         <em>Cookies de sesión:</em> se trata de las cookies que
//                         recaban y almacenan información durante el acceso del
//                         usuario al sitio web y que desaparecen o se eliminan una
//                         vez dicho acceso haya finalizado.
//                     </li>
//                     <li>
//                         <em>Cookies permanentes: </em>son aquellas cookies que
//                         mantienen los datos almacenados en el terminal pudiendo
//                         ser accedidos y tratados durante un periodo definido por
//                         el responsable de la cookie.
//                     </li>
//                 </ol>
//                 <p className="mb-2">Según su finalidad</p>
//                 <ol className="list-disc ml-8 mb-2">
//                     <li>
//                         <em>Cookies técnicas:</em> son las cookies que permiten
//                         al usuario la navegación por el sitio web, así como el
//                         uso de las diferentes funcionalidades y servicios del
//                         mismo.
//                     </li>
//                     <li>
//                         <em>Cookies analíticas: </em>son aquellas que permiten
//                         el seguimiento y análisis del comportamiento de los
//                         usuarios de los sitios web para la elaboración de los
//                         perfiles de navegación de los usuarios o la medición de
//                         la actividad de los sitios web.
//                     </li>
//                     <li>
//                         <em>Cookies de personalización:</em> son aquellas
//                         cookies que permiten al usuario acceder al servicio con
//                         algunas características de carácter general predefinidas
//                         con base en ciertos criterios del terminal del usuario
//                         (ej.: el tipo de navegador).
//                     </li>
//                     <li>
//                         <em>Cookies publicitarias: </em>son aquellas que
//                         permiten la gestión de los espacios publicitarios que el
//                         titular del sitio web haya decidido incluir en la misma.
//                     </li>
//                     <li>
//                         <em>Cookies de publicidad comportamental:</em> son las
//                         cookies que almacenan información acerca de los hábitos
//                         de navegación de los usuarios, con el objetivo de
//                         desarrollar una publicidad específica para los mismos
//                         basada en sus intereses.
//                     </li>
//                 </ol>
//                 <p className="mb-2">
//                     Con relación al uso concreto de cookies por el presente
//                     sitio web, Oiches le informa de que podrá utilizar cookies
//                     propias o de terceros para algunas de las cuales no es
//                     necesario o están exentas de obtener el consentimiento de
//                     los usuarios, por encontrarse excluidas del cumplimiento de
//                     las obligaciones señaladas en el artículo 22.2 de la LSSI,
//                     respecto a la información y consentimiento del usuario.
//                     Asimismo, el presente sitio web también podrá utilizar
//                     cookies que sí requerirán la información y el consentimiento
//                     de los usuarios.
//                 </p>
//                 <p className="mb-2">
//                     A continuación, se relacionan todas las cookies instaladas y
//                     empleadas específicamente por el presente sitio web:
//                 </p>

//                 <h2 className="font-medium text-lg pt-4 pb-2">
//                     2. Destinatarios de cesiones
//                 </h2>
//                 <p className="mb-2">
//                     No cederemos sus datos a terceros, salvo para dar
//                     cumplimiento a una obligación legal.
//                 </p>
//                 <h2 className="font-medium text-lg pt-4 pb-2">
//                     3. Política de cookies
//                 </h2>
//                 <p className="mb-2">
//                     Para revisar el tratamiento de datos relativo a las cookies,
//                     puede consultar la política de cookies, disponible en esta
//                     misma página web.
//                 </p>
//                 <p className="mb-2">
//                     Podrá configurar sus preferencias respecto al uso de cookies
//                     en el propio aviso de configuración de cookies.
//                 </p>
//                 <table className="table-auto">
//                     <thead>
//                         <tr>
//                             <td className="border-solid border-2 border-slate-200 p-2 font-semibold">
//                                 Nombre
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2 font-semibold">
//                                 Proveedor
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2 font-semibold">
//                                 Propósito
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2 font-semibold">
//                                 Caducidad
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2 font-semibold">
//                                 Tipo
//                             </td>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 _ga
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 oiches.com
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 Registra una identificación única que se utiliza
//                                 para generar datos estadísticos acerca de cómo
//                                 utiliza el visitante el sitio web.
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 2 años
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 Analítica
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 _gat
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 oiches.com
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 Utilizado por Google Analytics para controlar la
//                                 tasa de peticiones.
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 1 día
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 Analítica
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 _ga_MWHD27PJKY
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 oiches.com
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 Registra una identificación única que se utiliza
//                                 para generar datos estadísticos acerca de cómo
//                                 utiliza el visitante el sitio web.
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 1 minuto
//                             </td>
//                             <td className="border-solid border-2 border-slate-200 p-2">
//                                 Analítica
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <h2 className="font-medium text-lg pt-4 pb-2">
//                     Revocación y eliminación de cookies
//                 </h2>
//                 <p className="mb-2">
//                     En cumplimiento de lo dispuesto por el artículo 22 de la
//                     LSSI, Oiches le informa de que usted puede configurar su
//                     navegador para permitir, bloquear, eliminar o desactivar las
//                     cookies instaladas en su equipo o terminal, mediante la
//                     configuración de las opciones del navegador instalado en su
//                     equipo. En caso de que no permita la instalación de cookies
//                     en su navegador, es posible que no pueda acceder a alguno de
//                     los apartados o funcionalidades del presente sitio web. Para
//                     configurar el navegador y desactivar o administrar la
//                     instalación de cookies, puede obtener más información
//                     haciendo clic en los siguientes enlaces que le
//                     proporcionamos, en función del navegador que usted utiliza:
//                 </p>
//                 <ol className="list-disc ml-8 mb-2">
//                     <li>
//                         <a
//                             rel="noreferrer noopener"
//                             href="http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we"
//                             target="_blank"
//                         >
//                             Firefox
//                         </a>
//                     </li>
//                     <li>
//                         <a
//                             rel="noreferrer noopener"
//                             href="http://support.google.com/chrome/bin/answer.py?hl=es&amp;answer=95647"
//                             target="_blank"
//                         >
//                             Chrome
//                         </a>
//                     </li>
//                     <li>
//                         <a
//                             rel="noreferrer noopener"
//                             href="http://windows.microsoft.com/es-es/windows7/how-to-manage-cookies-in-internet-explorer-9"
//                             target="_blank"
//                         >
//                             Explorer
//                         </a>
//                     </li>
//                     <li>
//                         <a
//                             rel="noreferrer noopener"
//                             href="http://support.apple.com/kb/ph5042"
//                             target="_blank"
//                         >
//                             Safari
//                         </a>
//                     </li>
//                 </ol>
//                 <h2 className="font-medium text-lg pt-4 pb-2">
//                     Actualización de la presente Política de Cookies
//                 </h2>
//                 <p className="mb-2">
//                     Oiches se reserva el derecho de actualizar la presente
//                     Política de Cookies, para dar cumplimiento a exigencias
//                     legales o técnicas. Con base en ello, le recomendamos que
//                     revise esta Política de Cookies periódicamente con el
//                     objetivo de estar adecuadamente informado acerca de las
//                     cookies que emplea el presente sitio web y sus finalidades.
//                 </p>
//             </main>
//             <Footer />
//         </motion.div>
//     );
// };

// export default PoliticaCookies;

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PoliticaCookies = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Política de cookies" />
            <main className="w-11/12 mx-auto my-6 pb-14 md:max-w-7xl">
                <p className="mb-2">
                    Una cookie es un fichero que se descarga en tu ordenador al
                    acceder a determinadas páginas web. Las cookies permiten a
                    una página web, entre otras cosas, almacenar y recuperar
                    información sobre los hábitos de navegación de un usuario o
                    de su equipo y, dependiendo de la información que contengan
                    y de la forma en que utilice tu equipo, pueden utilizarse
                    para reconocer al usuario. El navegador del usuario memoriza
                    cookies en el disco duro solamente durante la sesión actual
                    ocupando un espacio de memoria mínimo y no perjudicando al
                    ordenador. Las cookies no contienen ninguna clase de
                    información personal específica, y la mayoría de las mismas
                    se borran del disco duro al finalizar la sesión de navegador
                    (las denominadas cookies de sesión).
                </p>
                <p className="mb-2">
                    La mayoría de los navegadores aceptan como estándar a las
                    cookies y, con independencia de las mismas, permiten o
                    impiden en los ajustes de seguridad las cookies temporales o
                    memorizadas.
                </p>
                <h2 className="font-medium text-lg pt-4 pb-2">
                    ¿Qué tipos de cookies utiliza el presente sitio web y con
                    qué finalidad?
                </h2>
                <p className="mb-2">Según la entidad que las gestiona</p>
                <ol className="list-disc ml-8 mb-2">
                    <li>
                        <em>Cookies propias:</em> son las enviadas al terminal
                        del usuario desde el equipo gestionado por el titular
                        del sitio web y desde el cual se presta el servicio al
                        usuario.
                    </li>
                    <li>
                        <em>Cookies de terceros: </em>son las enviadas al
                        terminal del usuario desde un equipo no gestionado por
                        el titular del sitio web, sino por una tercera entidad.
                    </li>
                </ol>
                <p className="mb-2">Según el tiempo que permanecen activadas</p>
                <ol className="list-disc ml-8 mb-2">
                    <li>
                        <em>Cookies de sesión:</em> se trata de las cookies que
                        recaban y almacenan información durante el acceso del
                        usuario al sitio web y que desaparecen o se eliminan una
                        vez dicho acceso haya finalizado.
                    </li>
                    <li>
                        <em>Cookies permanentes: </em>son aquellas cookies que
                        mantienen los datos almacenados en el terminal pudiendo
                        ser accedidos y tratados durante un periodo definido por
                        el responsable de la cookie.
                    </li>
                </ol>
                <p className="mb-2">Según su finalidad</p>
                <ol className="list-disc ml-8 mb-2">
                    <li>
                        <em>Cookies técnicas:</em> son las cookies que permiten
                        al usuario la navegación por el sitio web, así como el
                        uso de las diferentes funcionalidades y servicios del
                        mismo.
                    </li>
                    <li>
                        <em>Cookies analíticas: </em>son aquellas que permiten
                        el seguimiento y análisis del comportamiento de los
                        usuarios de los sitios web para la elaboración de los
                        perfiles de navegación de los usuarios o la medición de
                        la actividad de los sitios web.
                    </li>
                    <li>
                        <em>Cookies de personalización:</em> son aquellas
                        cookies que permiten al usuario acceder al servicio con
                        algunas características de carácter general predefinidas
                        con base en ciertos criterios del terminal del usuario
                        (ej.: el tipo de navegador).
                    </li>
                    <li>
                        <em>Cookies publicitarias: </em>son aquellas que
                        permiten la gestión de los espacios publicitarios que el
                        titular del sitio web haya decidido incluir en la misma.
                    </li>
                    <li>
                        <em>Cookies de publicidad comportamental:</em> son las
                        cookies que almacenan información acerca de los hábitos
                        de navegación de los usuarios, con el objetivo de
                        desarrollar una publicidad específica para los mismos
                        basada en sus intereses.
                    </li>
                </ol>
                <p className="mb-2">
                    Con relación al uso concreto de cookies por el presente
                    sitio web, Oiches le informa de que podrá utilizar cookies
                    propias o de terceros para algunas de las cuales no es
                    necesario o están exentas de obtener el consentimiento de
                    los usuarios, por encontrarse excluidas del cumplimiento de
                    las obligaciones señaladas en el artículo 22.2 de la LSSI,
                    respecto a la información y consentimiento del usuario.
                    Asimismo, el presente sitio web también podrá utilizar
                    cookies que sí requerirán la información y el consentimiento
                    de los usuarios.
                </p>
                <p className="mb-2">
                    A continuación, se relacionan todas las cookies instaladas y
                    empleadas específicamente por el presente sitio web:
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
                <table className="table-auto">
                    <thead>
                        <tr>
                            <td className="border-solid border-2 border-slate-200 p-2 font-semibold">
                                Nombre
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2 font-semibold">
                                Proveedor
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2 font-semibold">
                                Propósito
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2 font-semibold">
                                Caducidad
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2 font-semibold">
                                Tipo
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                _ga
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                oiches.com
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                Registra una identificación única que se utiliza
                                para generar datos estadísticos acerca de cómo
                                utiliza el visitante el sitio web.
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                2 años
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                Analítica
                            </td>
                        </tr>
                        <tr>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                _gat
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                oiches.com
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                Utilizado por Google Analytics para controlar la
                                tasa de peticiones.
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                1 día
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                Analítica
                            </td>
                        </tr>
                        <tr>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                _ga_MWHD27PJKY
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                oiches.com
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                Registra una identificación única que se utiliza
                                para generar datos estadísticos acerca de cómo
                                utiliza el visitante el sitio web.
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                1 minuto
                            </td>
                            <td className="border-solid border-2 border-slate-200 p-2">
                                Analítica
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h2 className="font-medium text-lg pt-4 pb-2">
                    Revocación y eliminación de cookies
                </h2>
                <p className="mb-2">
                    En cumplimiento de lo dispuesto por el artículo 22 de la
                    LSSI, Oiches le informa de que usted puede configurar su
                    navegador para permitir, bloquear, eliminar o desactivar las
                    cookies instaladas en su equipo o terminal, mediante la
                    configuración de las opciones del navegador instalado en su
                    equipo. En caso de que no permita la instalación de cookies
                    en su navegador, es posible que no pueda acceder a alguno de
                    los apartados o funcionalidades del presente sitio web. Para
                    configurar el navegador y desactivar o administrar la
                    instalación de cookies, puede obtener más información
                    haciendo clic en los siguientes enlaces que le
                    proporcionamos, en función del navegador que usted utiliza:
                </p>
                <ol className="list-disc ml-8 mb-2">
                    <li>
                        <a
                            rel="noreferrer noopener"
                            href="http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we"
                            target="_blank"
                        >
                            Firefox
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer noopener"
                            href="http://support.google.com/chrome/bin/answer.py?hl=es&amp;answer=95647"
                            target="_blank"
                        >
                            Chrome
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer noopener"
                            href="http://windows.microsoft.com/es-es/windows7/how-to-manage-cookies-in-internet-explorer-9"
                            target="_blank"
                        >
                            Explorer
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer noopener"
                            href="http://support.apple.com/kb/ph5042"
                            target="_blank"
                        >
                            Safari
                        </a>
                    </li>
                </ol>
                <h2 className="font-medium text-lg pt-4 pb-2">
                    Actualización de la presente Política de Cookies
                </h2>
                <p className="mb-2">
                    Oiches se reserva el derecho de actualizar la presente
                    Política de Cookies, para dar cumplimiento a exigencias
                    legales o técnicas. Con base en ello, le recomendamos que
                    revise esta Política de Cookies periódicamente con el
                    objetivo de estar adecuadamente informado acerca de las
                    cookies que emplea el presente sitio web y sus finalidades.
                </p>
            </main>
            <Footer />
        </motion.div>
    );
};

export default PoliticaCookies;
