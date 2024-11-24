import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiExternalLink } from 'react-icons/fi';

const ListarAllReservas = ({ token }) => {
    const [reservas, setReservas] = useState([]);

    const { VITE_API_URL_BASE } = import.meta.env;

    // const id = userData.user.id;
    // const type = userData.user.roles;

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await fetch(
                    `${VITE_API_URL_BASE}/reservas/listar`,
                    {
                        headers: {
                            authorization: token,
                        },
                    }
                );

                if (!response.ok) {
                    return;
                }
                const reservasData = await response.json();
                console.log(reservasData);

                setReservas(reservasData.data.reservas);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchReservas();
    }, [token, VITE_API_URL_BASE]);

    console.log('reservas ', reservas);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <>
            <section>
                <h3 className="text-lg font-semibold text-center my-6">
                    Histórico Reservas
                </h3>
                {reservas.length > 0 ? (
                    reservas.map((reserva) => (
                        <div key={reserva.id} className="mb-8">
                            <div className="border p-4 my-2">
                                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 sm:gap-6">
                                    <Link
                                        to={`/grupo/${reserva.grupo_id}`}
                                        target="_blank"
                                    >
                                        <p className="font-semibold">Grupo :</p>
                                        <span className="flex gap-1 items-center">
                                            {reserva.grupo_nombre}
                                            <FiExternalLink />
                                        </span>
                                    </Link>
                                    <Link
                                        to={`/sala/${reserva.sala_id}`}
                                        target="_blank"
                                    >
                                        <p className="font-semibold">Sala:</p>
                                        <span className="flex gap-1 items-center">
                                            {reserva.sala_nombre}
                                            <FiExternalLink />
                                        </span>
                                    </Link>
                                    <p className="font-semibold">
                                        Estado:
                                        {reserva.confirmada === 0 ? (
                                            <span className="block font-normal text-red-600">
                                                Sin confirmar
                                            </span>
                                        ) : (
                                            <span className="block font-normal text-green-600">
                                                Confirmada
                                            </span>
                                        )}
                                    </p>
                                    <p>
                                        <span className="block font-semibold">
                                            Fecha:
                                        </span>
                                        {formatDate(reserva.fecha)}
                                    </p>
                                    <p>
                                        <span className="block font-semibold">
                                            Hora Inicio:
                                        </span>
                                        {reserva.horaInicio}
                                    </p>
                                    <p>
                                        <span className="block font-semibold">
                                            Hora Fin:
                                        </span>
                                        {reserva.horaFin}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">
                        No se han encontrado reservas.
                    </p>
                )}
            </section>
        </>
    );
};

export default ListarAllReservas;
