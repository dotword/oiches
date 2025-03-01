import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams } from 'react-router-dom';
import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import registerAgenciaService from '../../services/Agencias/registerAgenciaService.js';

const AgenciaCreacion = () => {
    const { currentUser, token } = useContext(AuthContext);
    const { userId } = useParams();

    const [formValues, setFormValues] = useState({
        nombre: '',
        provincia: '',
        descripcion: '',
        web: '',
    });

    const [provinces, setProvinces] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        FetchProvinciasService(setProvinces);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(formValues).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        try {
            await registerAgenciaService({
                token,
                userId,
                formData,
            });

            toast.success(
                'Vamos a verificar los datos de tu agencia y en breve la publicaremos en Oiches.'
            );
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const { nombre, provincia, descripcion, web } = formValues;

    return currentUser ? (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-center mb-6">
                Gestiona tu agencia
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre de la agencia */}
                <div>
                    <label
                        htmlFor="nombre"
                        className="block font-semibold mb-1"
                    >
                        Nombre de la agencia/manager:*
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre de la agencia/manager"
                        value={nombre}
                        required
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-purple-300"
                    />
                </div>

                {/* Provincia */}
                <div>
                    <label
                        htmlFor="provincia"
                        className="block font-semibold mb-1"
                    >
                        Provincia:*
                    </label>
                    <select
                        id="provincia"
                        name="provincia"
                        required
                        value={provincia}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-purple-300"
                        onChange={handleChange}
                    >
                        <option value="">Selecciona</option>
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                                {province.provincia}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Web o Redes Sociales */}
                <div>
                    <label htmlFor="web" className="block font-semibold mb-1">
                        Web o enlace a tus RRSS:*
                    </label>
                    <input
                        type="url"
                        name="web"
                        placeholder="https://www.tuagencia.com"
                        value={web}
                        required
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-purple-300"
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label
                        htmlFor="descripcion"
                        className="block font-semibold mb-1"
                    >
                        Descripción:*
                    </label>
                    <textarea
                        name="descripcion"
                        value={descripcion}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-purple-300"
                        maxLength="2000"
                    ></textarea>
                    <p className="mt-1 text-gray-500 text-sm">
                        2000 caracteres como máximo
                    </p>
                </div>

                {/* Botón de ayuda */}
                <div className="bg-gray-100 p-4 rounded-lg text-center shadow-md">
                    <p className="mb-2">¿Necesitas ayuda con la publicación?</p>
                    <a
                        href="mailto:hola@oiches.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                    >
                        Escríbenos
                    </a>
                </div>

                {/* Botón de Enviar */}
                <div className="text-center">
                    <input
                        type="submit"
                        value="Publicar"
                        className="btn-primary w-full"
                    />
                </div>

                {/* Mensaje de error */}
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>

            <Toastify />
        </div>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AgenciaCreacion;
