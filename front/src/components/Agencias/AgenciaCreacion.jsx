import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams } from 'react-router-dom';
import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import FetchAgenciaEspecialidadService from '../../services/Agencias/FetchAgenciaEspecialidadService.js';
import registerAgenciaService from '../../services/Agencias/registerAgenciaService.js';
import Multiselect from 'multiselect-react-dropdown';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const AgenciaCreacion = () => {
    const { currentUser, token } = useContext(AuthContext);
    const { userId } = useParams();

    const [formValues, setFormValues] = useState({
        nombre: '',
        provincia: '',
        descripcion: '',
        web: '',
        especialidad: [],
    });

    const [provinces, setProvinces] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        FetchProvinciasService(setProvinces);
        FetchAgenciaEspecialidadService(setEspecialidades);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(formValues).forEach(([key, value]) => {
            if (key === 'especialidad') {
                const especialidadArray = Array.isArray(value)
                    ? value
                    : value.split(',');
                especialidadArray.forEach((especialidad) =>
                    formData.append('especialidad', especialidad)
                );
            } else {
                if (value) formData.append(key, value);
            }
        });

        try {
            await registerAgenciaService({
                token,
                userId,
                formData,
            });

            toast.success(
                'Vamos a verificar los datos de tu agencia y en breve la publicaremos en Oiches.',
                {
                    onClose: () => window.location.reload(), // Refresca la página tras cerrar el toast
                }
            );
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const { nombre, provincia, descripcion, web } = formValues;

    return currentUser ? (
        <>
            <h3 className="text-xl font-semibold mb-6">Publica tu agencia</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Fila de Nombre, Provincia y Web en una línea */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    {/* Especialidades */}
                    <div className="w-full">
                        <label
                            htmlFor="especialidad"
                            className="block font-semibold mb-3"
                        >
                            Especialidad:*
                        </label>
                        <Multiselect
                            options={especialidades.map((especialidad) => ({
                                id: especialidad.id,
                                nombre: especialidad.especialidad,
                            }))}
                            displayValue="nombre"
                            placeholder="Selecciona una o varias especialidades"
                            onSelect={(selectedList) => {
                                const ids = selectedList.map((item) => item.id);
                                setFormValues({
                                    ...formValues,
                                    especialidad: ids.join(','),
                                });
                            }}
                            onRemove={(selectedList) => {
                                const ids = selectedList.map((item) => item.id);
                                setFormValues({
                                    ...formValues,
                                    especialidad: ids.join(','),
                                });
                            }}
                            customCloseIcon={
                                <IoIosCloseCircleOutline className="ml-1" />
                            }
                            style={{
                                chips: {
                                    background: '#ffb500',
                                    color: 'black',
                                },
                            }}
                        />
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
                {/* Botón de Enviar con más aire arriba */}
                <div className="flex flex-col items-start bg-white w-full">
                    <button type="submit" className="btn-degradado my-4">
                        Publica tu agencia
                    </button>
                </div>

                {/* Mensaje de error */}
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
            {/* Sección de ayuda alineada a la izquierda */}

            <div className="max-w-80 flex flex-col gap-4 shadow-[0_8px_10px_4px_rgba(0,0,0,0.07)] p-4 items-center rounded-2xl mx-auto my-8 md:mr-0">
                <p className="text-center">
                    ¿Necesitas ayuda con la publicación?
                </p>

                <a
                    href="mailto:hola@oiches.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purpleOiches to-moradoOiches text-white font-bold py-2 px-4 rounded-lg shadow-lg flex max-w-32 justify-center"
                >
                    Escríbenos
                </a>
            </div>

            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AgenciaCreacion;
