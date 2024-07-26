import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

export const ListarReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [id, setId] = useState('');
  const [type, setType] = useState(''); // Either 'grupo' or 'sala'
  const { VITE_API_URL_BASE } = import.meta.env;
  const { token, currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          // Fetch Salas
          const salasResponse = await fetch(`${VITE_API_URL_BASE}/salas`, {
            headers: {
              token: token,
            },
          });

          if (!salasResponse.ok) {
            throw new Error('Failed to fetch salas');
          }

          const salasData = await salasResponse.json();
          const userSala = salasData.find(sala => sala.usuario_id === currentUser.id);

          if (userSala) {
            setId(userSala.id);
            setType('sala');
            return;
          }
          
          // Fetch Grupos if no sala found
          const gruposResponse = await fetch(`${VITE_API_URL_BASE}/grupos`, {
            headers: {
              token: token,
            },
          });

          if (!gruposResponse.ok) {
            throw new Error('Failed to fetch grupos');
          }

          const gruposData = await gruposResponse.json();
          const userGrupo = gruposData.find(grupo => grupo.usuario_id === currentUser.id);

          if (userGrupo) {
            setId(userGrupo.id);
            setType('grupo');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [token, VITE_API_URL_BASE, currentUser,id]);

  useEffect(() => {
    const fetchReservas = async () => {
      if (id && type) {
        try {
          const response = await fetch(`${VITE_API_URL_BASE}/reservas/${type}s/${id}`, {
            headers: {
              token: token,
            },
          });

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
      <section className='grid border grid-cols-6 max-w-6xl place-items-center gap-6 mx-auto my-2'>
        <h2 className='col-span-6'>Historico reservas</h2>
        <p>Grupo</p>
        <p>Sala</p>
        <p>Estado</p>
        <p>Fecha</p>
        <p>Hora Inicio Reserva</p>
        <p>Hora Final Reserva</p>
      </section>
      <section>
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <>
            <section className='grid border grid-cols-6 max-w-6xl place-items-center gap-6 mx-auto' key={reserva.id}>
              <p>{reserva.grupo_id}</p>
              <p>{reserva.sala_id}</p>
              <p>{reserva.confirmada === 0 ? 'Reserva no confirmada.' : 'Reserva confirmada'}</p>
              <p>{reserva.fecha}</p>
              <p>{reserva.horaInicio}</p>
              <p>{reserva.horaFin}</p>
            </section>
            <div className='flex max-w-6xl place-items-center gap-6 mx-auto'>
              <button>Confirmar</button>
              <button>Cancelar</button>
            </div>
            </>
          ))
        ) : (
          <div className='flex col-span-6 max-w-6xl place-items-center gap-6 mx-auto'><p>No reservations found.</p></div>
        )}
      </section>
    </>
  );
};

export default ListarReservas;
