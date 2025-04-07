import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import CrearConcierto from '../../components/conciertos/CrearConcierto';
import AuthContext from '../../context/auth/AuthContext';

const CreateConcierto = () => {
    const { userLogged, token } = useContext(AuthContext);

    const location = useLocation();
    const { reserva } = location.state || {};
    const crearConciertoProps = {
        token,
        ...(reserva && { reserva }), // Solo añade 'reserva' si existe
    };

    // if (!reserva) {
    //     return <p>Cargando detalles de la reserva...</p>;
    // }

    return userLogged && userLogged.roles === 'admin' ? (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Crear concierto" />
            <main className="w-11/12 mx-auto pb-14 md:max-w-7xl">
                {reserva && (
                    <p className="text-center mb-8">
                        Concierto de <b>{reserva.grupo_nombre}</b> en{' '}
                        <b>{reserva.sala_nombre}</b>
                    </p>
                )}

                <CrearConcierto {...crearConciertoProps} />
            </main>
        </motion.div>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default CreateConcierto;
