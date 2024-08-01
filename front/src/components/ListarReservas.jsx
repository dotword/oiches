import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Toastify from './Toastify.jsx';
import { toast } from 'react-toastify';
import GrupoVotaSala from './GrupoVotaSala';

export const ListarReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [id, setId] = useState('');
    const [type, setType] = useState(''); // Either 'grupo' or 'sala'
    const { VITE_API_URL_BASE } = import.meta.env;
    const { token, currentUser } = useAuth();

    const handleDelete = async (reservaId) => {
        try {
            const endpoint =
                type === 'grupo'
                    ? `${VITE_API_URL_BASE}/cancelar-reserva/${reservaId}`
                    : `${VITE_API_URL_BASE}/borrar-reserva/${reservaId}`;

            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    token: token,
                },
            });

            if (!response.ok) {
                console.log(response);
                toast.error('Fallo al eliminar la reserva');
                throw new Error('Fallo al eliminar la reserva');
            }

            setReservas(reservas.filter((reserva) => reserva.id !== reservaId));
            toast.success('Su reserva se ha eliminado con exito');
        } catch (error) {
            toast.error(error);
            console.error('Fallo al eliminar la reserva:', error);
        }
    };

    const handleConfirm = async (reservaId) => {
        if (currentUser) {
            try {
                const response = await fetch(
                    `${VITE_API_URL_BASE}/aprobar-reserva/${reservaId}`,
                    {
                        method: 'PUT',
                        headers: {
                            token: token,
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
                toast.success('Su reserva se ha confirmado con exito');
            } catch (error) {
                toast.error(error);
                console.error('Error confirming reserva:', error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                try {
                    // Fetch Salas
                    const salasResponse = await fetch(
                        `${VITE_API_URL_BASE}/salas`,
                        {
                            headers: {
                                token: token,
                            },
                        }
                    );

                    if (!salasResponse.ok) {
                        throw new Error('Failed to fetch salas');
                    }

                    const salasData = await salasResponse.json();
                    const userSala = salasData.find(
                        (sala) => sala.usuario_id === currentUser.id
                    );

                    if (userSala) {
                        setId(userSala.id);
                        setType('sala');
                        return;
                    }

                    // Fetch Grupos if no sala found
                    const gruposResponse = await fetch(
                        `${VITE_API_URL_BASE}/grupos`,
                        {
                            headers: {
                                token: token,
                            },
                        }
                    );

                    if (!gruposResponse.ok) {
                        throw new Error('Failed to fetch grupos');
                    }

                    const gruposData = await gruposResponse.json();
                    const userGrupo = gruposData.find(
                        (grupo) => grupo.usuario_id === currentUser.id
                    );

                    if (userGrupo) {
                        setId(userGrupo.id);
                        setType('grupo');
                    }
                } catch (error) {
                    toast.error(error);
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [token, VITE_API_URL_BASE, currentUser]);

    useEffect(() => {
        const fetchReservas = async () => {
            if (id && type) {
                try {
                    const response = await fetch(
                        `${VITE_API_URL_BASE}/reservas/${type}s/${id}`,
                        {
                            headers: {
                                token: token,
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`Failed to fetch reservas for ${type}`);
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

    return (
        <>
            <section className="max-w-3xl mx-auto">
                <h3 className="text-3xl text-center my-6">
                    Histórico Reservas:
                </h3>
                {reservas.length > 0 ? (
                    reservas.map((reserva) => (
                        <div key={reserva.id} className="mb-8">
                            <div className="border p-4 my-2">
                                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 sm:gap-6">
                                    <Link to={`/grupo/${reserva.grupo_id}`}>
                                        <p className="font-semibold">Grupo :</p>
                                        {reserva.grupo_nombre}
                                    </Link>
                                    <Link to={`/sala/${reserva.sala_id}`}>
                                        <p className="font-semibold">Sala:</p>
                                        {reserva.sala_nombre}
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
                                        {reserva.fecha}
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
                                <button
                                    onClick={() => handleDelete(reserva.id)}
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
                            </div>
                            {new Date(reserva.fecha) < new Date() &&
                            reserva.confirmada === 1 ? (
                                <GrupoVotaSala
                                    idReserva={reserva.id}
                                    idGrupo={reserva.grupo_id}
                                    idSala={reserva.sala_id}
                                />
                            ) : (
                                ''
                            )}
                        </div>
                    ))
                ) : (
                    <div className="flex col-span-6 max-w-6xl place-items-center gap-6 mx-auto">
                        <p>No se han encontrado reservas.</p>
                    </div>
                )}
            </section>
            <Toastify />
        </>
    );
};

export default ListarReservas;
