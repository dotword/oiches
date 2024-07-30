import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export const ListarReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [id, setId] = useState('');
  const [type, setType] = useState(''); // Either 'grupo' or 'sala'
  const { VITE_API_URL_BASE } = import.meta.env;
  const { token, currentUser } = useAuth();
  const handleDelete = async (reservaId) =>{
    const fetchData = await fetch(`${VITE_API_URL_BASE}/cancelar-reserva/${reservaId}`,{
      method:'DELETE',
      headers:{
        token:token
      }
    
    })
   
  }
  const handleConfirm = async (reservaId) =>{
    
    const fetchData = await fetch(`${VITE_API_URL_BASE}/aprobar-reserva/${reservaId}`,{
      method:'PUT',
      headers:{
        token:token
      }
    
    })
      }
 
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
  }, [token, VITE_API_URL_BASE, currentUser]);

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
 console.log(reservas);
  return (
    <>
    <h3 className='text-3xl text-center my-6'>Historico Reservas:</h3>
      <section>
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <>
            <div key={reserva.id} className="border p-4 my-2">
              <section className='grid grid-cols-1 sm:grid-cols-6 gap-4 sm:gap-6 '>
               <Link to={`/grupo/${reserva.grupo_id}`}><p>Grupo :</p>{reserva.grupo_nombre}</Link>
                <Link to={`/sala/${reserva.sala_id}`}><p>Sala :</p>{reserva.sala_nombre}</Link>
                <p>Estado :<p>{reserva.confirmada === 0 ? 'Reserva no confirmada.' : 'Reserva confirmada'}</p></p>
                <p><p>Fecha:</p>{reserva.fecha}</p>
                <p><p>Hora Inicio</p>{reserva.horaInicio}</p>
                <p><p>Hora Fin</p>{reserva.horaFin}</p>
              </section>
            </div>
              <div className='flex flex-col sm:flex-row justify-between mt-4 gap-2'>
                <button onClick={()=>{
                  handleConfirm(reserva.id)
                }} className='bg-blue-500 text-white p-2 rounded'>Confirmar</button>
                <button onClick={()=>{
                  handleDelete(reserva.id)
                }} className='bg-red-500 text-white p-2 rounded'>Cancelar</button>
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
