import { Input } from "./Input.jsx"
import { Link, NavLink } from "react-router-dom"
import oiches from '../assets/Live.jpg'
export const RegisterForm = () => {
  return (
    <div className="h-screen w-full"> 
        <img src={oiches} className="-z-50 absolute h-1/2 w-full" alt="" />
      <section className="h-1/2 p-2 text-white">
        <button className="flex gap-1"><svg className="self-center" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"/></svg> Back</button>
        <div  className="flex flex-col gap-16  pt-5">
          <div className="flex place-content-center">
            <img className="self-center"  alt="Logo de Oiches" />
            <h2 className="text-5xl text-center">Oiches</h2>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod architecto libero veritatis cupiditate inventore non ea est. Culpa, dolorem iure magni earum doloremque reprehenderit, deleniti in hic adipisci, eveniet ipsum.</p>
        </div>
      </section>
      <form className="flex flex-col h-1/2 gap-5 p-2 ">
        <h3 className="text-3xl">Date de alta</h3>
        <Input className="border-b w-full" type="text" name="email" placeholder="Hello@gamil.com"/>
        <Input className="border-b w-full" type="text" name="fullname" placeholder="Aitor Carreras Simonet"/>
        <Input className="border-b w-full" type="text" name="number" placeholder="Phone number"/>
        <p><input type="checkbox" id="checkbox" name="checkbox" required/> By signing up, you agree to our <span>Terms & Conditions</span> and <span>Policies</span> </p>
        <NavLink to="/register" className="text-center p-4 w-full bg-gray-600 justify-center rounded text-white text-lg">Continue</NavLink>
        <p className=" text-center pt-10">Alredy signed up?,<Link to='/login' className="font-bold">Log in</Link></p>
      </form>
    </div>
  )
}
