import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiExternalLink, FiMail } from 'react-icons/fi';
import GrupoVotaSala from '../Grupos/GrupoVotaSala.jsx';
import SalaVotaGrupo from '../Salas/SalaVotaGrupo.jsx';
import { ConfirmationModal } from '../ConfirmModal.jsx';

export const ListarReservas = ({ entry_id, token, userInfo }) => {
    const [reservas, setReservas] = useState([]);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [reservaAEliminar, setReservaAEliminar] = useState(null);
    const { VITE_API_URL_BASE } = import.meta.env;
    const type = userInfo.roles;

    useEffect(() => {
        const fetchReservas = async () => {
            if (entry_id && type) {
                try {
                    const response = await fetch(
                        `${VITE_API_URL_BASE}/reservas/${type}s/${entry_id}`,
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
                    toast.error(error);
                }
            }
        };

        fetchReservas();
    }, [token, VITE_API_URL_BASE, type, entry_id]);

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
            }

            // Actualizar el estado de reservas
            setReservas(
                reservas.filter((reserva) => reserva.id !== reservaAEliminar)
            );
            toast.success('Su reserva se ha eliminado con éxito');
        } catch (error) {
            toast.error('Error eliminando la reserva');
        } finally {
            // Cerrar el modal y limpiar el estado
            setCancelModalOpen(false);
            setReservaAEliminar(null);
        }
    };

    const handleTramitando = async (reservaId) => {
        if (userInfo) {
            try {
                const response = await fetch(
                    `${VITE_API_URL_BASE}/tramitar-reserva/${reservaId}`,
                    {
                        method: 'PUT',
                        headers: {
                            authorization: token,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Error al tramitar la reserva', 400);
                }

                setReservas(
                    reservas.map((reserva) =>
                        reserva.id === reservaId
                            ? { ...reserva, confirmada: '2' }
                            : reserva
                    )
                );
                toast.success('¡La reserva se está tramitando!');
            } catch (error) {
                toast.error(error);
            }
        }
    };

    const handleConfirm = async (reservaId) => {
        if (userInfo) {
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
                    throw new Error('Error al confirmar el concierto');
                }

                setReservas(
                    reservas.map((reserva) =>
                        reserva.id === reservaId
                            ? { ...reserva, confirmada: '1' }
                            : reserva
                    )
                );
                toast.success('Concierto confirmado con éxito');
            } catch (error) {
                toast.error(error);
            }
        }
    };

    const handleChangeFecha = (id, nuevaFecha) => {
        setReservas((prevReservas) =>
            prevReservas.map((reserva) =>
                reserva.id === id ? { ...reserva, fecha: nuevaFecha } : reserva
            )
        );
    };

    const handleSubmitFecha = async (id, nuevaFecha) => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/cambiar-fecha-reserva/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        authorization: token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fecha: nuevaFecha }),
                }
            );

            if (!response.ok) {
                throw new Error('Error al actualizar la fecha');
            }

            toast.success('Fecha actualizada correctamente');
        } catch (error) {
            toast.error('No se pudo actualizar la fecha');
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

    const today = formatDate(new Date());

    const isPastOrToday = (fechaReserva) => {
        const reservaDate = new Date(fechaReserva);
        const todayDate = new Date();
        reservaDate.setHours(0, 0, 0, 0); // Ignorar la hora
        todayDate.setHours(0, 0, 0, 0); // Ignorar la hora
        return reservaDate <= todayDate;
    };

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
    };

    return (
        <>
            <section>
                <h3 className="text-lg font-semibold text-center my-6">
                    Histórico Reservas
                </h3>
                {reservas.length > 0 ? (
                    <table className="max-w-5xl mx-auto">
                        <thead>
                            <tr>
                                {type === 'grupo' && <th>Sala</th>}
                                {type === 'sala' && <th>Artista</th>}
                                <th>Estado</th>
                                <th>Fecha concierto</th>
                                <th>Fecha solicitud</th>
                                <th>Cancelar</th>
                                {type === 'sala' && <th>Gestionar</th>}
                                <th>Contactar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map((reserva) => (
                                <React.Fragment key={reserva.id}>
                                    <tr className="mt-10 md:mt-0">
                                        {type === 'grupo' && (
                                            <td>
                                                <Link
                                                    to={`/sala/${reserva.sala_id}`}
                                                    target="_blank"
                                                >
                                                    <span className="flex gap-1 justify-center items-center font-semibold md:justify-start">
                                                        {reserva.sala_nombre}
                                                        <FiExternalLink />
                                                    </span>
                                                </Link>
                                            </td>
                                        )}
                                        {type === 'sala' && (
                                            <td>
                                                <Link
                                                    to={`/grupo/${reserva.grupo_id}`}
                                                    target="_blank"
                                                >
                                                    <span className="flex gap-1 justify-center items-center font-semibold md:justify-start">
                                                        {reserva.grupo_nombre}
                                                        <FiExternalLink />
                                                    </span>
                                                </Link>
                                            </td>
                                        )}

                                        <td>
                                            {reserva.confirmada === '0' && (
                                                <span className="block font-normal text-red-600">
                                                    Pendiente
                                                </span>
                                            )}
                                            {reserva.confirmada === '1' && (
                                                <span className="block font-normal text-green-600">
                                                    Confirmada
                                                </span>
                                            )}
                                            {reserva.confirmada === '2' && (
                                                <span className="block font-normal text-cyan-700">
                                                    Tramitando
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <span className="md:hidden text-sm">
                                                Fecha concierto:
                                            </span>
                                            {type === 'sala' &&
                                            reserva.confirmada === '2' ? (
                                                <div>
                                                    <input
                                                        type="date"
                                                        value={formatDateForInput(
                                                            reserva.fecha
                                                        )}
                                                        onChange={(e) =>
                                                            handleChangeFecha(
                                                                reserva.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="border rounded p-1"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            handleSubmitFecha(
                                                                reserva.id,
                                                                reserva.fecha
                                                            )
                                                        }
                                                        className="ml-2 bg-blue-500 text-white p-1 rounded"
                                                    >
                                                        Cambiar fecha
                                                    </button>
                                                </div>
                                            ) : (
                                                formatDate(reserva.fecha)
                                            )}
                                        </td>
                                        <td>
                                            <span className="md:hidden text-sm">
                                                Fecha solicitud:{' '}
                                            </span>
                                            {formatDate(reserva.createdAt)}
                                        </td>
                                        <td>
                                            {new Date(reserva.fecha) <
                                            new Date() ? (
                                                ''
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setCancelModalOpen(
                                                            true
                                                        );
                                                        setReservaAEliminar(
                                                            reserva.id
                                                        ); // Guardar la reserva seleccionada
                                                    }}
                                                    hidden={isPastOrToday(
                                                        reserva.fecha,
                                                        today
                                                    )}
                                                    disabled={isPastOrToday(
                                                        reserva.fecha,
                                                        today
                                                    )}
                                                    className="button bg-red-500 text-white p-1 text-sm rounded"
                                                >
                                                    Cancelar
                                                </button>
                                            )}
                                            {cancelModalOpen && (
                                                <ConfirmationModal
                                                    isOpen={cancelModalOpen}
                                                    text="¿Estás seguro que quieres eliminar esta reserva?"
                                                    onConfirm={
                                                        handleConfirmDelete
                                                    } // Pasar la referencia correcta
                                                    onCancel={() => {
                                                        setCancelModalOpen(
                                                            false
                                                        );
                                                        setReservaAEliminar(
                                                            null
                                                        ); // Limpiar la reserva seleccionada al cancelar
                                                    }}
                                                    classConfirm={'bg-red-600'}
                                                    textConfirm="Eliminar reserva"
                                                    textCancel="No eliminar"
                                                    classCancel={'bg-green-600'}
                                                />
                                            )}
                                        </td>

                                        {type === 'sala' && (
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        handleTramitando(
                                                            reserva.id
                                                        )
                                                    }
                                                    hidden={
                                                        type === 'grupo' ||
                                                        reserva.confirmada !==
                                                            '0' ||
                                                        isPastOrToday(
                                                            reserva.fecha,
                                                            today
                                                        )
                                                    }
                                                    disabled={type === 'grupo'}
                                                    className="button bg-green-700 text-white p-2 text-sm rounded"
                                                >
                                                    Me interesa
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleConfirm(
                                                            reserva.id
                                                        )
                                                    }
                                                    hidden={
                                                        type === 'grupo' ||
                                                        reserva.confirmada !==
                                                            '2'
                                                    }
                                                    disabled={type === 'grupo'}
                                                    className="button bg-green-700 text-white p-2 text-sm rounded"
                                                >
                                                    Confirmar
                                                </button>
                                            </td>
                                        )}

                                        <td>
                                            {reserva.confirmada !== '0' && (
                                                <a
                                                    href={`mailto:${reserva.email}`}
                                                >
                                                    <FiMail className="m-auto text-3xl" />
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                    {new Date(reserva.fecha) < new Date() &&
                                    reserva.confirmada === 1 ? (
                                        <tr>
                                            <td colSpan="8">
                                                {type === 'grupo' && (
                                                    <GrupoVotaSala
                                                        idReserva={reserva.id}
                                                        idGrupo={
                                                            reserva.grupo_id
                                                        }
                                                        idSala={reserva.sala_id}
                                                    />
                                                )}

                                                {type === 'sala' && (
                                                    <SalaVotaGrupo
                                                        idReserva={reserva.id}
                                                        idGrupo={
                                                            reserva.grupo_id
                                                        }
                                                        idSala={reserva.sala_id}
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    ) : (
                                        ''
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
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
