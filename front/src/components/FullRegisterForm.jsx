import { Input } from "./Input.jsx"
import { Link, NavLink } from "react-router-dom"
import oiches from '../assets/Live.jpg'

export const FullRegisterForm = () => {
  return (
  <div className="h-screen w-full "> 
    <img src={oiches} className="-z-50 absolute h-1/3 w-full" alt="" />
    <section className="h-1/3 p-2 text-white">
      <div className="flex justify-between">
        <button className="flex gap-1"><svg className="self-center" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"/></svg> Back</button>
        <p>¿Ya tienes una cuenta?<Link to='/login' className=" text-yellow-200"> Log in</Link></p>
      </div>
    <div  className="flex flex-col gap-10 pt-5">
      <div className="flex place-content-center">
        <img className="self-center"  alt="Logo de Oiches" />
        <h2 className="text-5xl text-center">Oiches</h2>
      </div>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod quam ad reprehenderit perspiciatis fugit aut obcaecati quas temporibus</p>
    </div>
   </section>
   <form className="flex flex-col gap-5 p-2 ">
    <h3 className="text-4xl">Registro</h3>
    <p>Lorem ipsum dolor sit amet consectetur</p>
    <hr/>
    <div className="flex gap-4 pla">
      <label htmlFor="">
        Musico <input type="radio" name="role" />
      </label>
      <label htmlFor="">
        Sala <input type="radio" name="role" />
      </label>
    </div>
    <div className="flex flex-col gap-5 justify-center">
      <label htmlFor="name">Nombre del Artista o Sala
      <Input type="text" name="name" placeholder="  Led Zeppelin" className="border mt-2 h-10 w-full"></Input>
      </label>
      <label htmlFor="email">Email*
      <Input type="text" name="email" placeholder="  Youremail@example.com" className="border mt-2 h-10 w-full"></Input>
      </label>
      <label htmlFor="password">Contraseña
      <Input type="text" name="password" placeholder="  Yourpassword0?" className="border mt-2 h-10 w-full"></Input>
      </label>
      <label htmlFor="checkpassword">Introduce de nuevo la contraseña
      <Input type="text" name="checkpassword" placeholder="  Yourpassword0?" className="border mt-2 h-10 w-full"></Input>
      </label>
    </div>
    <p><input type="checkbox" required/> Acepto los terminos y condiciones</p>
    <button className="p-4 w-full bg-slate-500 justify-center rounded">Crear cuenta</button>
   </form>
  </div>
  )
}
