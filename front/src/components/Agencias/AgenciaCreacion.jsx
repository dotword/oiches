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
        <>
            <h3 className="text-xl font-semibold mb-6">Gestiona tu agencia</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Fila de Nombre, Provincia y Web en una línea */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Nombre de la agencia */}
                    <div className="w-full">
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
                            className="form-input w-full"
                        />
                    </div>

                    {/* Provincia */}
                    <div className="w-full">
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
                            className="form-input w-full py-2 h-auto"
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
                    <div className="w-full">
                        <label
                            htmlFor="web"
                            className="block font-semibold mb-1"
                        >
                            Web o enlace a tus RRSS:*
                        </label>
                        <input
                            type="url"
                            name="web"
                            placeholder="https://www.tuagencia.com"
                            value={web}
                            required
                            onChange={handleChange}
                            className="form-input w-full py-2 h-auto"
                        />
                    </div>
                </div>

                {/* Descripción en otra línea */}
                <div className="w-full">
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
                        className="form-input w-full min-h-[8rem]"
                        maxLength="2000"
                        placeholder="Describe tu agencia..."
                    ></textarea>
                    <p className="mt-1 text-gray-500 text-sm">
                        2000 caracteres como máximo
                    </p>
                </div>

                {/* Sección de ayuda alineada a la izquierda */}
                <div className="flex flex-col items-start bg-white w-full mt-6">
                    <p className="mb-4 text-left">
                        ¿Necesitas ayuda con la publicación?
                    </p>
                    <a
                        href="mailto:hola@oiches.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-degradado"
                    >
                        Escríbenos
                    </a>
                </div>

                {/* Botón de Enviar con más aire arriba */}
                <div className="flex flex-col items-start bg-white w-full">
                    <button type="submit" className="btn-degradado mt-8 mb-4">
                        Modificar datos
                    </button>
                </div>

                {/* Mensaje de error */}
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AgenciaCreacion;
