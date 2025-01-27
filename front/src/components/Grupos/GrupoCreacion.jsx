import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import { toast } from 'react-toastify';
import Toastify from '../Toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import FetchProvinciasService from '../../services/FetchProvinciasService';
import FetchGenresService from '../../services/FetchGenresService';
import registerGrupoService from '../../services/Grupos/registerGrupoService';

const GrupoCreacion = () => {
    const { userLogged, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const { userId } = useParams();

    const [formValues, setFormValues] = useState({
        nombre: '',
        provincia: '',
        web: '',
        generos: [],
        honorarios: '',
        honorarios_to: '',
        condiciones: '',
        biografia: '',
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

        const formData = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
            if (key === 'generos') {
                value.forEach((genre) => formData.append('generos', genre));
            } else {
                if (value) formData.append(key, value);
            }
        });

        try {
            await registerGrupoService({
                token,
                userId,
                formData,
            });

            toast.success(
                'Vamos a verificar los datos de tu proyecto y en breves lo publicaremos en Oiches.'
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
        provincia,
        web,
        honorarios,
        honorarios_to,
        condiciones,
        biografia,
    } = formValues;

    return (
        <>
            {userLogged ? (
                <form onSubmit={handleSubmit} className="md:flex md:flex-wrap">
                    <div className="md:w-3/5 md:flex md:flex-wrap md:justify-between">
                        <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                            <label htmlFor="nombre" className="font-semibold">
                                Nombre:*
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre del artista/grupo"
                                value={nombre}
                                required
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                        <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                            <label
                                htmlFor="generos"
                                className="font-semibold mb-2"
                            >
                                Géneros:*
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
                                placeholder="Selecciona los géneros musicales"
                                required
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
                        <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                            <label
                                htmlFor="provincia"
                                className="font-semibold"
                            >
                                Provincia:*
                            </label>
                            <select
                                id="provincia"
                                name="provincia"
                                value={provincia}
                                required
                                className="form-select"
                                onChange={handleChange}
                            >
                                <option value="">Selecciona</option>
                                {provinces.map((province) => (
                                    <option
                                        key={province.id}
                                        value={province.id}
                                    >
                                        {province.provincia}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                            <label htmlFor="web" className="font-semibold">
                                Web o enlace a tus RRSS:*
                            </label>
                            <input
                                type="url"
                                name="web"
                                placeholder="https://www.tugrupo.com"
                                value={web}
                                required
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="flex gap-4 mb-4 md:w-full">
                            <div className="flex flex-col w-1/2">
                                <label
                                    htmlFor="honorarios"
                                    className="font-semibold mb-1"
                                >
                                    Caché desde:
                                </label>
                                <input
                                    type="number"
                                    name="honorarios"
                                    placeholder="Caché del artista/grupo"
                                    value={honorarios}
                                    onChange={handleChange}
                                    className="form-input font-normal w-full"
                                />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label
                                    htmlFor="honorarios_to"
                                    className="font-semibold mb-1"
                                >
                                    Caché hasta:
                                </label>
                                <input
                                    type="number"
                                    name="honorarios_to"
                                    placeholder="Caché del artista/grupo"
                                    value={honorarios_to}
                                    onChange={handleChange}
                                    className="form-input font-normal w-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-4 md:w-full">
                            <label
                                htmlFor="biografia"
                                className="font-semibold"
                            >
                                Biografía:
                            </label>
                            <textarea
                                name="biografia"
                                value={biografia}
                                onChange={handleChange}
                                className="form-textarea"
                                maxLength="2000"
                            ></textarea>
                            <p className="mt-1 text-gray-500 text-sm">
                                2000 caracteres como máximo
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 md:w-2/5 md:pl-12 md:pt-0 md:flex md:flex-col">
                        <div className="flex flex-col mb-4 md:w-full">
                            <label
                                htmlFor="biografia"
                                className="font-semibold"
                            >
                                Condiciones:
                            </label>
                            <textarea
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
            ) : (
                <h1 className="text-center text-xl">
                    No puedes acceder a esta página
                </h1>
            )}
            <Toastify />
        </>
    );
};

export default GrupoCreacion;
