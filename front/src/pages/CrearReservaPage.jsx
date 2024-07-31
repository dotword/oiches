import { CrearReservaForm } from "../components/CrearReservaForm.jsx"
import Header from "../components/Header.jsx"
import useSala from "../hooks/useSala.jsx";
import useAuth from '../hooks/useAuth.jsx'
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Toastify from "../components/Toastify.jsx";
import { useEffect } from "react";
import noImage from "../assets/noimage.png"
import Footer from "../components/Footer.jsx";
export const CrearReservaPage = ({type}) => {
  const { VITE_API_URL_BASE} = import.meta.env;
  const navigate = useNavigate()
  const {idSala} = useParams()
  const {entry} = useSala(idSala)
  const {currentUser} = useAuth()

  
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
        className="max-w-md rounded-l-md"
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
          <div className="flex flex-col  gap-2 px-6 min-w-26">

            <span>Dirección :<p>{entry.direccion}</p></span>
            <span>Provincia :<p>{entry.provincia}</p></span>
            {
              entry.genero && <span>Genero :<p>{entry.genero}</p></span>
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
      <Footer/>
      <Toastify/>
    </>
  )
}
