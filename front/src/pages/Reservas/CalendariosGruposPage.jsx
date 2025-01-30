import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useGrupo from '../../hooks/useGrupo';
import AuthContext from '../../context/auth/AuthContext';
import ListarReservas from '../../components/Reservas/ListarReservas';
import Toastify from '../../components/Toastify';
import Dropdown from '../../components/Dropdown';

const CalendarioGruposPage = () => {
    const { idGrupo } = useParams();
    const { entry } = useGrupo(idGrupo);

    const { userLogged, token } = useContext(AuthContext);

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt={`Reservas de ${entry.nombre}`} />
            <main className="w-11/12 mx-auto my-6 pb-14 max-w-5xl">
                <section className="mb-12">
                    <h3 className="font-bold text-2xl mt-8 w-full">
                        Preguntas frecuentes
                    </h3>
                    <div className="mt-4 mb-8 shadow-xl rounded-xl p-4 md:px-8 lg:flex lg:justify-between lg:gap-x-8">
                        <div className="lg:w-[calc(45%-1rem)]">
                            <Dropdown
                                title="¿Cómo encuentro salas disponibles para tocar?"
                                description="
                            <p>1. Inicia sesión en tu cuenta y utiliza el buscador para encontrar salas según su ubicación o estilos musicales.</p>
                            <p>2. Selecciona la sala y haz clic en el botón “Quiero tocar aquí”.</p>
                            <p>3. Completa el formulario con los datos requeridos, seleccionando tu proyecto musical (si tienes más de uno).</p>
                            <p>4. Elige la fecha deseada, indica si tienes flexibilidad en las fechas y añade un mensaje para la sala.</p>
                            <p>5. Envía tu solicitud y espera la confirmación.</p>
                            "
                            />

                            <Dropdown
                                title="¿Qué sucede después de enviar la solicitud?"
                                description="
                            <p>La sala recibirá un correo electrónico con tu solicitud y podrá gestionarla desde su panel de administración.</p>
                            <p>Además de confirmar tu reserva, podrán contactarte directamente por correo electrónico si lo necesitan.</p>
                            "
                            />
                            <Dropdown
                                title="¿Qué ocurre si la sala acepta mi solicitud?"
                                description="
                            <p>Recibirás una notificación por correo electrónico, y la confirmación aparecerá en tu perfil privado, dentro del historial de reservas, y podrás ponerte en contacto directamente con la sala para acordar los detalles del evento en el enlace que aparecerá en “Contactar”.</p>
                            <p>¡Una vez que el concierto esté confirmado quedará programado en Oiches y lo publicaremos en nuestra agenda de conciertos y redes sociales!</p>
                            "
                            />
                        </div>
                        <div className="lg:w-[calc(45%-1rem)]">
                            <Dropdown
                                title="¿Qué ocurre si rechazan mi solicitud?"
                                description="
                            <p>Se borrará de tu historial y recibiréis un mail diciendo que fue rechazada.</p>
                            "
                            />

                            <Dropdown
                                title="¿Qué ocurre si no recibo ningún mensaje?"
                                description="
                            <p>Escríbenos a hola@oiches.com e intentaremos contactar con la sala para comprobar si han recibido la solicitud correctamente.</p>
                            "
                            />
                            <Dropdown
                                title="¿Qué puedo hacer después de realizar el concierto?"
                                description="
                            <p>Tras el concierto, podrás compartir tu experiencia dejando un comentario o una valoración sobre la sala. De manera similar, la sala podrá calificar tu actuación.</p>
                            <p>Esto fomenta la transparencia y ayuda a la comunidad de Oiches.</p>
                            "
                            />
                        </div>
                    </div>
                </section>
                {userLogged && (
                    <ListarReservas
                        userInfo={userLogged}
                        entry_id={idGrupo}
                        token={token}
                    />
                )}
            </main>
            <Footer />
            <Toastify />
        </motion.div>
    );
};

export default CalendarioGruposPage;
