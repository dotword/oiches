import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useSala from '../../hooks/useSala';
import CalendarioDisponibilidad from '../../components/Reservas/CalendarioDisponibilidad';
import Toastify from '../../components/Toastify';

const CalendarioSalasPage = () => {
    const { idSala } = useParams();

    const { entry } = useSala(idSala);

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt={`Reservas de ${entry.nombre}`} />
            <main className="w-11/12 mx-auto my-6 pb-14 md:max-w-7xl">
                <section className="flex flex-wrap gap-8">
                    <h2 className="font-semibold txt-lg md:w-full">
                        Gestión de fechas disponibles
                    </h2>
                    <CalendarioDisponibilidad idSala={idSala} />
                    <div className="md:w-[calc(55%-1rem)]">
                        <p>
                            ¡Organiza fácilmente las fechas para que los músicos
                            reserven tu sala!
                        </p>
                        <ol className="">
                            <li>
                                <span className="font-semibold">
                                    Activar el calendario
                                </span>
                                <ul>
                                    <li>
                                        Al principio, todas las fechas estarán
                                        disponibles.
                                    </li>
                                    <li>
                                        Haz clic en el botón &quot;Activar
                                        Calendario&quot; para empezar a
                                        gestionar las reservas.
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <span className="font-semibold">
                                    Añadir fechas disponibles
                                </span>
                                <ul>
                                    <li>
                                        Marca en el calendario los días en los
                                        que tu sala estará disponible y haz clic
                                        en &quot;Guardar fechas&quot;.
                                    </li>
                                    <li>
                                        Si quieres que una disponible deje de
                                        estarlo, simplemente vuelve a
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
                        </p>
                    </div>
                </section>
                <section>
                    <h2 className="font-semibold txt-lg mt-12">Tus reservas</h2>
                    <p>Aquí irá la tabla con las reservas de esa sala</p>
                </section>
            </main>
            <Footer />
            <Toastify />
        </motion.div>
    );
};

export default CalendarioSalasPage;
