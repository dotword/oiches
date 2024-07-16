import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { loginUserService } from '../services/loginUserService.jsx';
import { AuthContext } from "../context/auth/auth.context.jsx";

const LoginForm = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
   
    const { signIn, currentUser } = auth
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const {data} = await loginUserService({ email, password })
        console.log(data);
        signIn(data.token, data.user);
        navigate('/');
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <>
        <form className="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Usuario: </label>
            <input
              type="text"
              name="email"
              placeholder="Introduce tu usuario"
              value={email}
              required
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña: </label>
            <input
              type="password"
              name="password"
              placeholder="Introduce tu contraseña"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Iniciar sesión" />
          </div>
          <div>
            {error ? <p>{error}</p> : ''}
          </div>
          <div>
            <p>Recuperar contraseña</p>
          </div>
        </form>
      </>
    );
  };
  
  export default LoginForm;