import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiExternalLink, FiMail } from 'react-icons/fi';
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
                    toast.error(error);
                }
            }
        };

        fetchReservas();
    }, [token, VITE_API_URL_BASE, id, type]);

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
                    <table className="max-w-5xl mx-auto">
                        <thead>
                            <tr>
                                <th>
                                    {type === 'sala' && 'Artista'}
                                    {type === 'grupo' && 'Sala'}
                                </th>

                                <th>Estado</th>
                                <th>Fecha concierto</th>
                                <th>Fecha solicitud</th>
                                <th>Cancelar</th>
                                {type === 'sala' && <th>Confirmar</th>}
                                <th>Contactar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map((reserva) => (
                                <React.Fragment key={reserva.id}>
                                    <tr className="mt-10 md:mt-0">
                                        <td>
                                            {type === 'sala' && (
                                                <Link
                                                    to={`/grupo/${reserva.grupo_id}`}
                                                    target="_blank"
                                                >
                                                    <span className="flex gap-1 justify-center items-center font-semibold md:justify-start">
                                                        {reserva.grupo_nombre}
                                                        <FiExternalLink />
                                                    </span>
                                                </Link>
                                            )}
                                            {type === 'grupo' && (
                                                <Link
                                                    to={`/sala/${reserva.sala_id}`}
                                                    target="_blank"
                                                >
                                                    <span className="flex gap-1 justify-center items-center font-semibold md:justify-start">
                                                        {reserva.sala_nombre}
                                                        <FiExternalLink />
                                                    </span>
                                                </Link>
                                            )}
                                        </td>

                                        <td>
                                            {reserva.confirmada === 0 ? (
                                                <span className="block font-normal text-red-600">
                                                    Sin confirmar
                                                </span>
                                            ) : (
                                                <span className="block font-normal text-green-600">
                                                    Confirmada
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <span className="md:hidden text-sm">
                                                Fecha concierto:{' '}
                                            </span>
                                            {formatDate(reserva.fecha)}
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
                                                    hidden={
                                                        type === 'grupo' &&
                                                        reserva.confirmada === 1
                                                    }
                                                    disabled={
                                                        type === 'grupo' &&
                                                        reserva.confirmada === 1
                                                    }
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
                                                        handleConfirm(
                                                            reserva.id
                                                        )
                                                    }
                                                    hidden={
                                                        type === 'grupo' ||
                                                        reserva.confirmada === 1
                                                    }
                                                    disabled={type === 'grupo'}
                                                    className="button bg-green-700 text-white p-2 text-sm rounded"
                                                >
                                                    Confirmar
                                                </button>
                                            </td>
                                        )}
                                        <td>
                                            <a href={`mailto:${reserva.email}`}>
                                                <FiMail className="m-auto text-lg" />
                                            </a>
                                        </td>
                                    </tr>
                                    {new Date(reserva.fecha) < new Date() &&
                                    reserva.confirmada === 1 ? (
                                        <tr>
                                            <td colSpan="7">
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
