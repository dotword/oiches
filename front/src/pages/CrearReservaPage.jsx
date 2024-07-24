import { CrearReservaForm } from "../components/CrearReservaForm.jsx"
import Header from "../components/Header.jsx"
import useSala from "../hooks/useSala.jsx";
import useAuth from '../hooks/useAuth.jsx'
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Toastify from "../components/Toastify.jsx";
import { useEffect } from "react";
import noImage from "../assets/noimage.png"
export const CrearReservaPage = ({type}) => {
  const navigate = useNavigate()
  const {idSala} = useParams()
  const {entry} = useSala(idSala)
  const {currentUser} = useAuth()
  console.log(currentUser);
  console.log(entry);
  
   if(!currentUser){
     toast.error('Necesitas loguearte como grupo para acceder a esta página')
    navigate('/login',toast.error('Error'))
   }
   if(!entry) return (<p>Cargando...</p>)
  return (
    <>
      <Header txt={`Reservar sala: ${entry.nombre}`}/>
      <main className="p-4 flex flex-col gap-10 max-w-6xl mx-auto shadow-xl">
        <section className="flex flex-col place-items-center border rounded-lg mx-auto min-w-60 sm:flex-row sm:gap-6">
        {entry.photos.length > 0 ? (
        <img
        className="w-full sm:w-auto"
          src={entry.photos[0].url} 
          alt={`Una imagen de la sala ${entry.nombre}`} 
        />
      ) : (
        <img
        className="w-full sm:w-auto" 
          src={noImage} 
          alt="Imagen Default" 
        />
      )}
          <div className="flex flex-col  gap-2 px-6 min-w-26">

            <span>Dirección :<p>{entry.direccion}</p></span>
            <span>Dirección :<p>{entry.provincia}</p></span>
            {
              entry.genero && <span>Dirección :<p>{entry.provincia}</p></span>
            }
            
            {
              entry.honorarios && <span>Honorarios :<p>{entry.honorarios}</p></span>
            }
            {
              entry.horaReservasStart && <span>Hora inicio reservas :<p>{entry.horaReservasStart}</p></span>
            }
            {
              entry.horaReservasEnd && <span>Hora final reservas :<p>{entry.horaReservasEnd}</p></span>
            }
          </div>
        </section>
        <CrearReservaForm/>
      </main>
      <Toastify/>
    </>
  )
}
