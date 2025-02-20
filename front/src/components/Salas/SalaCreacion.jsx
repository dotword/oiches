import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import MapComponent from '../MapComponent.jsx';

import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import FetchGenresService from '../../services/FetchGenresService.js';
import registerSalaService from '../../services/Salas/registerSalaService.js';

const SalaCreacion = () => {
    const { currentUser, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const { userId } = useParams();

    const [formValues, setFormValues] = useState({
        nombre: '',
        direccion: '',
        ciudad: '',
        provincia: '',
        generos: [],
        capacidad: '',
        descripcion: '',
        condiciones: '',
        equipamiento: '',
        web: '',
    });

    const [provinces, setProvinces] = useState([]);
    const [genres, setGenres] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        FetchProvinciasService(setProvinces);
        FetchGenresService(setGenres);
    }, []);

    const handleGenChange = (selectedList) => {
        const selectedGenres = selectedList.map((genre) => genre.id);
        setGeneros(selectedGenres);
        setFormValues((prevValues) => ({
            ...prevValues,
            generos: selectedGenres,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar si se ha seleccionado una dirección
        if (!formValues.direccion || !formValues.ciudad) {
            toast.error('Debes seleccionar una dirección válida del mapa.');
            return; // Evitar que el formulario se envíe
        }

        const formData = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
            if (key === 'generos') {
                value.forEach((genre) => formData.append('generos', genre));
            } else {
                if (value) formData.append(key, value);
            }
        });

        try {
            await registerSalaService({
                token,
                userId,
                formData,
            });

            toast.success(
                'Vamos a verificar los datos de tu sala y en breve la publicaremos en Oiches.'
            );

            setTimeout(() => {
                navigate(`/users/account/${userId}`);
            }, 2000);
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const {
        nombre,
        direccion,
        ciudad,
        provincia,
        capacidad,
        descripcion,
        condiciones,
        web,
    } = formValues;

    // Esta función actualizará los valores en el formulario con los datos seleccionados en el mapa
    const handleLocationSelect = (location) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            direccion: location.direccion,
            ciudad: location.ciudad,
        }));
    };

    return currentUser ? (
        <>
            <form onSubmit={handleSubmit} className="md:flex md:flex-wrap">
                <div className="md:w-1/2 md:flex md:flex-wrap md:justify-between">
                    <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                        <label htmlFor="nombre" className="font-semibold">
                            Nombre de la Sala:*
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre de la sala"
                            value={nombre}
                            required
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                        <label htmlFor="generos" className="font-semibold mb-2">
                            Géneros:
                        </label>
                        <Multiselect
                            options={genres.map((genre) => ({
                                id: genre.id,
                                nombre: genre.nombre,
                            }))}
                            selectedValues={generos.map((genreId) =>
                                genres.find((genre) => genre.id === genreId)
                            )}
                            onSelect={handleGenChange}
                            onRemove={handleGenChange}
                            displayValue="nombre"
                            placeholder="Selecciona los géneros"
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

                    <div className="flex flex-col mb-4 md:w-full">
                        <label htmlFor="direccion" className="font-semibold">
                            Dirección:*
                        </label>
                        <MapComponent onLocationSelect={handleLocationSelect} />
                        <span className="hidden">
                            <input
                                type="text"
                                name="direccion"
                                placeholder="Dirección de la sala"
                                value={direccion}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="ciudad"
                                placeholder="Ciudad de la sala"
                                value={ciudad}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </span>
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

                    <div className="flex flex-col mb-4 md:w-[calc(30%-0.5rem)]">
                        <label htmlFor="capacidad" className="font-semibold">
                            Aforo:*
                        </label>
                        <input
                            type="number"
                            name="capacidad"
                            placeholder="Aforo de la sala"
                            required
                            value={capacidad}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <div className="flex flex-col mb-4 md:w-full">
                        <label htmlFor="web" className="font-semibold">
                            Web o enlace a tus RRSS:*
                        </label>
                        <input
                            type="url"
                            name="web"
                            placeholder="https://www.tusala.com"
                            value={web}
                            required
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:flex md:flex-col">
                    <div className="flex flex-col mb-4 md:w-full">
                        <label htmlFor="descripcion" className="font-semibold">
                            Descripción:
                        </label>
                        <textarea
                            name="descripcion"
                            value={descripcion}
                            onChange={handleChange}
                            className="form-textarea"
                            maxLength="2000"
                        ></textarea>
                        <p className="mt-1 text-gray-500 text-sm">
                            2000 caracteres como máximo
                        </p>
                    </div>

                    <div className="flex flex-col mb-4 md:w-full">
                        <label htmlFor="condiciones" className="font-semibold">
                            Condiciones:
                        </label>
                        <textarea
                            type="text"
                            name="condiciones"
                            value={condiciones}
                            onChange={handleChange}
                            className="form-textarea"
                            maxLength="2000"
                        ></textarea>
                        <p className="mt-1 text-gray-500 text-sm">
                            2000 caracteres como máximo
                        </p>
                    </div>

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
                        value="Continuar"
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

export default SalaCreacion;
