import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiExternalLink } from 'react-icons/fi';
import GrupoVotaSala from './GrupoVotaSala';
import SalaVotaGrupo from './SalaVotaGrupo';
import { ConfirmationModal } from './ConfirmModal.jsx';

export const ListarReservas = ({ userData, token, userLogged }) => {
    const [reservas, setReservas] = useState([]);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [reservaAEliminar, setReservaAEliminar] = useState(null);

    const { VITE_API_URL_BASE } = import.meta.env;

    const id = userData.user.id;
    const type = userData.user.roles;

    useEffect(() => {
        const fetchReservas = async () => {
            if (id && type) {
                try {
                    const response = await fetch(
                        `${VITE_API_URL_BASE}/reservas/${type}s/${id}`,
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

                    setReservas(reservasData.reservas);
                } catch (error) {
                    console.error('Error fetching reservas:', error);
                }
            }
        };

        fetchReservas();
    }, [token, VITE_API_URL_BASE, id, type]);

    // const handleConfirmDelete = () => {
    //     handleDelete();
    //     setCancelModalOpen(false);
    // };

    const handleConfirmDelete = async () => {
        if (!reservaAEliminar) return; // Verificar que hay una reserva seleccionada
        try {
            const endpoint =
                type === 'grupo'
                    ? `${VITE_API_URL_BASE}/cancelar-reserva/${reservaAEliminar}`
                    : `${VITE_API_URL_BASE}/borrar-reserva/${reservaAEliminar}`;

            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    authorization: token,
                },
            });

            if (!response.ok) {
                toast.error('Fallo al eliminar la reserva');
                throw new Error('Fallo al eliminar la reserva');
            }

            // Actualizar el estado de reservas
            setReservas(
                reservas.filter((reserva) => reserva.id !== reservaAEliminar)
            );
            toast.success('Su reserva se ha eliminado con éxito');
        } catch (error) {
            toast.error('Error eliminando la reserva');
            console.error('Fallo al eliminar la reserva:', error);
        } finally {
            // Cerrar el modal y limpiar el estado
            setCancelModalOpen(false);
            setReservaAEliminar(null);
        }
    };

    const handleConfirm = async (reservaId) => {
        if (userLogged) {
            try {
                const response = await fetch(
                    `${VITE_API_URL_BASE}/aprobar-reserva/${reservaId}`,
                    {
                        method: 'PUT',
                        headers: {
                            authorization: token,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to confirm reserva');
                }

                setReservas(
                    reservas.map((reserva) =>
                        reserva.id === reservaId
                            ? { ...reserva, confirmada: 1 }
                            : reserva
                    )
                );
                toast.success('Su reserva se ha confirmado con éxito');
            } catch (error) {
                toast.error(error);
                console.error('Error confirming reserva:', error);
            }
        }
    };

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
                            <div className="flex flex-col sm:flex-row gap-6">
                                <button
                                    onClick={() => handleConfirm(reserva.id)}
                                    hidden={
                                        type === 'grupo' ||
                                        reserva.confirmada === 1
                                    }
                                    disabled={type === 'grupo'}
                                    className={`button ${
                                        type === 'grupo'
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-500'
                                    } text-white p-2 rounded`}
                                >
                                    Confirmar
                                </button>
                                {new Date(reserva.fecha) < new Date() ? (
                                    ''
                                ) : (
                                    <button
                                        onClick={() => {
                                            setCancelModalOpen(true);
                                            setReservaAEliminar(reserva.id); // Guardar la reserva seleccionada
                                        }}
                                        hidden={
                                            type === 'grupo' &&
                                            reserva.confirmada === 1
                                        }
                                        disabled={
                                            type === 'grupo' &&
                                            reserva.confirmada === 1
                                        }
                                        className="button bg-red-500 text-white p-2 rounded"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                            {cancelModalOpen && (
                                <ConfirmationModal
                                    isOpen={cancelModalOpen}
                                    text="¿Estás seguro que quieres eliminar esta reserva?"
                                    onConfirm={handleConfirmDelete} // Pasar la referencia correcta
                                    onCancel={() => {
                                        setCancelModalOpen(false);
                                        setReservaAEliminar(null); // Limpiar la reserva seleccionada al cancelar
                                    }}
                                />
                            )}
                            {new Date(reserva.fecha) < new Date() &&
                            reserva.confirmada === 1 ? (
                                <>
                                    {type === 'grupo' ? (
                                        <GrupoVotaSala
                                            idReserva={reserva.id}
                                            idGrupo={reserva.grupo_id}
                                            idSala={reserva.sala_id}
                                        />
                                    ) : (
                                        <SalaVotaGrupo
                                            idReserva={reserva.id}
                                            idGrupo={reserva.grupo_id}
                                            idSala={reserva.sala_id}
                                        />
                                    )}
                                </>
                            ) : (
                                ''
                            )}
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

export default ListarReservas;
