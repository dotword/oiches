import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useSala from '../../hooks/useSala';
import CalendarioDisponibilidad from '../../components/Reservas/CalendarioDisponibilidad';
import { AuthContext } from '../../context/auth/auth.context';
import ListarReservas from '../../components/Reservas/ListarReservas';
import Toastify from '../../components/Toastify';
import Dropdown from '../../components/Dropdown';

const CalendarioSalasPage = () => {
    const { idSala } = useParams();
    const { entry } = useSala(idSala);

    const { userLogged, token } = useContext(AuthContext);

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt={`Reservas de ${entry.nombre}`} />
            <main className="w-11/12 mx-auto my-6 pb-14 md:max-w-5xl">
                <section className="flex flex-wrap md:gap-x-4 lg:gap-x-8">
                    <h2 className="font-bold text-2xl my-2 w-full">
                        Gestión de fechas disponibles
                    </h2>
                    <div className="my-2 mx-auto shadow-xl rounded-xl p-4 md:w-[calc(55%-.5rem)] lg:w-[calc(45%-1rem)]">
                        <CalendarioDisponibilidad idSala={idSala} />
                    </div>
                    <div className="my-2 mx-auto shadow-xl rounded-xl p-4 md:px-8 md:w-[calc(45%-.5rem)] lg:w-[calc(55%-1rem)]">
                        <p className="mb-4">
                            ¡Organiza fácilmente las fechas para que los músicos
                            reserven tu sala!
                        </p>
                        <h3 className="text-2xl mb-4 font-semibold text-purpleOiches">
                            Preguntas frecuentes
                        </h3>
                        <Dropdown
                            title="¿Cómo funciona el calendario?"
                            description='
                        <ol>
                            <li>
                                <b>
                                    Activar el calendario
                                </b>
                                <ul style="list-style:disc; padding-left:1rem; margin-top:.5rem; margin-bottom:1rem;">
                                    <li>
                                        Al principio, todas las fechas estarán
                                        disponibles.
                                    </li>
                                    <li>
                                        Haz clic en el botón "Activar
                                        calendario" todas las fechas
                                        pasarán a NO disponibles y ya puedes
                                        empezar a gestionar tus fechas.
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <b>
                                    Añadir fechas disponibles
                                </b>
                                <ul style="list-style:disc; padding-left:1rem; margin-top:.5rem; margin-bottom:1rem;">
                                    <li>
                                        Marca en el calendario los días en los
                                        que tu sala estará disponible y haz clic
                                        en "Guardar fechas".
                                    </li>
                                    <li>
                                        Si quieres que una fecha disponible deje
                                        de estarlo, simplemente vuelve a
                                        seleccionarla.
                                    </li>
                                </ul>
                            </li>
                        </ol>
                        <p>
                            Con este calendario gestionas las reservas de forma
                            rápida y sencilla, así te aseguras de que solo te
                            contacten cuando tú lo decidas. ¡Haz que los músicos
                            encuentren la mejor fecha para tocar en tu sala!
                        </p>'
                        />

                        <Dropdown
                            title="¿Cómo funcionan las reservas?"
                            description='<p>Recibirás un email del grupo o artista que quiere tocar
                        en tu sala.</p>
                    <p>
                        En el <b>Histórico de Reservas</b> podrás elegir si
                        cancelar la solicitud o, si estás interesado/a, marcarla
                        como <b>"Tramitando"</b>. En este caso, el
                        músico recibirá una notificación con tu interés, y
                        podrás ponerte en contacto directamente para acordar los
                        detalles del evento en el enlace que aparecerá en <b>"Contactar"</b>.
                    </p>
                    <p>
                        Una vez todo esté confirmado, selecciona la opción <b>"Confirmar"</b>. ¡Así, el concierto quedará
                        programado y lo publicaremos en nuestra agenda de
                        conciertos y redes sociales!
                    </p>'
                        />
                        <Dropdown
                            title="¿Qué puedo hacer después de realizar el concierto?"
                            description="<p>Tras el concierto, podrás calificar la actuación dejando un comentario o una valoración sobre el grupo/artista. De manera similar, los músicos podrán calificar su experiencia.</p>
                    <p>Esto fomenta la transparencia y ayuda a la comunidad de Oiches.</p>"
                        />
                    </div>
                </section>
                <section className="mt-10">
                    {userLogged && (
                        <ListarReservas
                            userInfo={userLogged}
                            entry_id={idSala}
                            token={token}
                        />
                    )}
                </section>
            </main>
            <Footer />
            <Toastify />
        </motion.div>
    );
};

export default CalendarioSalasPage;
