import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useGrupo from '../../hooks/useGrupo';
import { AuthContext } from '../../context/auth/auth.context';
import ListarReservas from '../../components/Reservas/ListarReservas';
import Toastify from '../../components/Toastify';

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
            <main className="w-11/12 mx-auto my-6 pb-14 md:max-w-7xl">
                <section>
                    <h1 className="font-bold text-xl text-center">Reservas</h1>
                    <p>
                        Aquí irán las FAQ de los músicos. Explicar cómo funciona
                        el histórico reservas
                    </p>
                    {userLogged && (
                        <ListarReservas
                            userInfo={userLogged}
                            entry_id={idGrupo}
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

export default CalendarioGruposPage;
