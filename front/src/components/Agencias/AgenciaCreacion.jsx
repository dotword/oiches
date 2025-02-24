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
            <h3 className="text-xl font-semibold">Gestiona tu agencia</h3>
            <form onSubmit={handleSubmit} className="md:flex md:flex-wrap">
                <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                    <label htmlFor="nombre" className="font-semibold">
                        Nombre de la agencia/manager:*
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre de la agencia/manager"
                        value={nombre}
                        required
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="flex flex-col mb-4 md:w-[calc(70%-0.5rem)]">
                    <label htmlFor="provincia" className="font-semibold">
                        Provincia:*
                    </label>
                    <select
                        id="provincia"
                        name="provincia"
                        required
                        value={provincia}
                        className="form-select"
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

                <div className="flex flex-col mb-4 md:w-full">
                    <label htmlFor="web" className="font-semibold">
                        Web o enlace a tus RRSS:*
                    </label>
                    <input
                        type="url"
                        name="web"
                        placeholder="https://www.tuagencia.com"
                        value={web}
                        required
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="flex flex-col mb-4 md:w-full">
                    <label htmlFor="descripcion" className="font-semibold">
                        Descripción:*
                    </label>
                    <textarea
                        name="descripcion"
                        value={descripcion}
                        onChange={handleChange}
                        required
                        className="form-textarea"
                        maxLength="2000"
                    ></textarea>
                    <p className="mt-1 text-gray-500 text-sm">
                        2000 caracteres como máximo
                    </p>

                    {/* Botón de ayuda justo después de las fotos */}
                    <div className="sticky top-0 my-8 max-w-full">
                        <div className=" m-auto flex flex-col gap-4 shadow-[0_8px_10px_4px_rgba(0,0,0,0.07)] p-4 items-center rounded-2xl md:mr-0 md:mb-0 md:w-full">
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
                    </div>
                </div>
                <div className="my-12 max-w-80">
                    <input
                        type="submit"
                        value="Publicar"
                        className="btn-account p-3 w-full"
                    />
                </div>
                <div>{error && <p>{error}</p>}</div>
            </form>
            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AgenciaCreacion;
