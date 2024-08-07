import { CrearReservaForm } from '../components/CrearReservaForm.jsx';
import Header from '../components/Header.jsx';
import useSala from '../hooks/useSala.jsx';
import useAuth from '../hooks/useAuth.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toastify from '../components/Toastify.jsx';
import noImage from '../assets/noimage.png';
import Footer from '../components/Footer.jsx';
export const CrearReservaPage = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const navigate = useNavigate();
    const { idSala } = useParams();
    const { entry } = useSala(idSala);
    const { currentUser } = useAuth();

    if (!currentUser) {
        toast.error(
            'Necesitas loguearte como grupo para acceder a esta página'
        );
        navigate('/login', toast.error('Error'));
    }
    if (!entry) return <p>Cargando...</p>;

    return (
        <>
            <Header txt={`Reservar sala: ${entry.nombre}`} />
            <main className="p-4 mt-6 flex flex-col gap-10 mx-auto shadow-xl w-11/12 md:max-w-1200">
                <section className="flex flex-col border rounded-lg mx-auto gap-6 md:flex-wrap md:flex-row md:w-full">
                    {entry.photos.length > 0 ? (
                        <img
                            className="rounded-l-md object-cover"
                            src={`${VITE_API_URL_BASE}/uploads/${entry.photos[0].name}`}
                            alt={`Una imagen de la sala ${entry.nombre}`}
                        />
                    ) : (
                        <img
                            className="w-full sm:w-auto h-full rounded-l-md"
                            src={noImage}
                            alt="Imagen Default"
                        />
                    )}
                    <div className="flex flex-col gap-2 px-6 mb-6 md:mt-6 md:px-0">
                        <p className="flex flex-col">
                            <span className="font-semibold">Dirección</span>
                            {entry.direccion}
                        </p>
                        <p className="flex flex-col">
                            <span className="font-semibold">Provincia</span>
                            {entry.provincia}
                        </p>

                        {entry.genero && (
                            <p className="flex flex-col">
                                <span className="font-semibold">Géneros</span>

                                {entry.genero.map((gen) => {
                                    return (
                                        <span key={gen.generoId}>
                                            {gen.generoName}
                                        </span>
                                    );
                                })}
                            </p>
                        )}
                        <p className="flex flex-col">
                            <span className="font-semibold">
                                Hora inicio reservas
                            </span>
                            {entry.horaReservasStart}
                        </p>
                        <p className="flex flex-col">
                            <span className="font-semibold">
                                Hora final reservas
                            </span>
                            {entry.horaReservasEnd}
                        </p>
                    </div>
                </section>
                <CrearReservaForm />
            </main>
            <Footer />
            <Toastify />
        </>
    );
};
