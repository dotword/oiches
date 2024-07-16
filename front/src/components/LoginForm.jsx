import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Importa Link aquí
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from './Input.jsx';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { loginUserService } from '../services/loginUserService.jsx';

const LoginForm = ({ className }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { signIn } = auth;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await loginUserService({ email, password });
            signIn(data.token, data.user);
            toast.success('Inicio de sesión exitoso');
            navigate('/');
        } catch (error) {
            setError(error.message);
            toast.error('Error al iniciar sesión');
        }
    };

    return (
        <>
            <section className="flex w-full h-screen">
                <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('')" }}>
                    {'front/public/Live.jpg'}
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <form onSubmit={handleSubmit} className={className}>
                        <h3 className="text-4xl">Iniciar sesión</h3>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <hr />
                        <div className="flex flex-col gap-5 justify-center">
                            <label htmlFor="email">
                                Usuario*
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Introduce tu usuario"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                />
                            </label>
                            <label htmlFor="password">
                                Contraseña*
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Introduce tu contraseña"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input"
                                />
                            </label>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className="p-4 w-full hover:text-white hover:bg-opacity-80 transition-all bg-purpleOiches text-xl justify-center rounded"
                        >
                            Iniciar sesión
                        </button>
                        <p className="mt-4 text-center">
                            <Link to="/recover-password" className="hover:text-purpleOiches text-yellowOiches">
                                Recuperar contraseña
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    );
};

export default LoginForm;
