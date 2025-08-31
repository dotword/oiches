import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { useParams } from 'react-router-dom';
import Toastify from '../Toastify.jsx';
import { toast } from 'react-toastify';
import Multiselect from 'multiselect-react-dropdown';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import AddSalaPhotos from './AddSalaPhotos.jsx';
import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import FetchGenresService from '../../services/FetchGenresService.js';
import getSalaService from '../../services/Salas/getSalaService.js';
import {
    EditSalaService,
    addGeneroSalaService,
    DeleteSalaGenerosService,
} from '../../services/Salas/EditSalaService.js';
import { AddSalaRiderForm } from './SalaFiles.jsx';
import DeleteUserSalaGrupo from '../Users/DeleteUserSalaGrupo.jsx';

const SalaEdit = () => {
    const { userLogged, token } = useContext(AuthContext);

    const { idSala } = useParams();

    const [sala, setSala] = useState({
        nombre: '',
        direccion: '',
        ciudad: '',
        googleMapUrl: '',
        provincia: '',
        capacidad: '',
        descripcion: '',
        condiciones: '',
        equipamiento: '',
        web: '',
        activeGenres: [],
    });

    const [provinces, setProvinces] = useState([]);
    const [genres, setGenres] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [deleteGenres, setDeleteGenres] = useState([]);
    const [error, setError] = useState('');
    // const [formattedAddress, setFormattedAddress] = useState('');

    useEffect(() => {
        FetchProvinciasService(setProvinces);
        FetchGenresService(setGenres);
    }, []);

    useEffect(() => {
        const fetchSala = async () => {
            try {
                const { data } = await getSalaService(idSala);

                setSala({
                    nombre: data.sala.nombre || '',
                    direccion: data.sala.direccion || '',
                    ciudad: data.sala.ciudad || '',
                    googleMapUrl: data.sala.googleMapUrl || '',
                    provincia: data.sala.provinciaId || '',
                    capacidad: data.sala.capacidad || '',
                    descripcion: data.sala.descripcion || '',
                    condiciones: data.sala.condiciones || '',
                    equipamiento: data.sala.equipamiento || '',
                    web: data.sala.web || '',
                    activeGenres: data.sala.genero || [],
                    owner: data.sala.usuario_id,
                });
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
            }
        };

        fetchSala();
    }, [idSala]);

    const handleDeleteGenreClick = (genreId) => {
        setDeleteGenres((prevGenres) =>
            prevGenres.includes(genreId)
                ? prevGenres.filter((id) => id !== genreId)
                : [...prevGenres, genreId]
        );
    };

    const handleGenChange = (selectedList) => {
        setGeneros(selectedList.map((genre) => genre.id));
    };

    const handleGenSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataForm = new FormData();
            dataForm.append('newGenero', generos);
            await addGeneroSalaService(dataForm, idSala, token);
            toast.success('Géneros añadidos');

            //Actualizar géneros activos
            const { data } = await getSalaService(idSala);
            setSala((prevSala) => ({
                ...prevSala,
                activeGenres: data.sala.genero,
            }));

            setGeneros([]); // Limpiar selección de géneros
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleDelGenSubmit = async (e) => {
        e.preventDefault();
        if (deleteGenres.length === 0) {
            toast.error('Selecciona al menos un género para eliminar');
            return;
        }
        try {
            await DeleteSalaGenerosService(deleteGenres, idSala, token);
            toast.success('Borraste los géneros seleccionados');

            // Actualizar géneros activos
            const { data } = await getSalaService(idSala);
            setSala((prevSala) => ({
                ...prevSala,
                activeGenres: data.sala.genero,
            }));
            setDeleteGenres([]); // Limpiar selección de géneros
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Normalizamos la URL
        let normalizedWeb = sala.web.trim();
        if (normalizedWeb && !/^https?:\/\//i.test(normalizedWeb)) {
            normalizedWeb = 'https://' + normalizedWeb;
        }

        // Validación extra con la API URL
        try {
            new URL(normalizedWeb);
        } catch {
            setError('La dirección web no es válida');
            toast.error('La dirección web no es válida');
            return;
        }

        try {
            const dataForm = new FormData();
            dataForm.append('nombre', sala.nombre || '');
            dataForm.append('direccion', sala.direccion || '');
            dataForm.append('ciudad', sala.ciudad || '');
            dataForm.append('googleMapUrl', sala.googleMapUrl || '');
            dataForm.append('provincia', sala.provincia || '');
            dataForm.append('capacidad', sala.capacidad || '');
            dataForm.append('descripcion', sala.descripcion || '');
            dataForm.append('condiciones', sala.condiciones || '');
            dataForm.append('equipamiento', sala.equipamiento || '');
            dataForm.append('web', normalizedWeb || '');

            await EditSalaService({
                token,
                idSala,
                dataForm,
            });
            toast.success('Has modificado tu sala con éxito');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    // Filtrar géneros disponibles para agregar
    const availableGenres = genres.filter(
        (genre) =>
            !sala.activeGenres.some(
                (activeGenre) => activeGenre.generoId === genre.id
            )
    );

    return (userLogged && sala.owner === userLogged.id) ||
        (userLogged && userLogged.roles === 'admin') ? (
        <>
            <div className="px-6 pt-3 pb-6 md:px-12 bg-white rounded-lg shadow-md md:grid md:grid-cols-5 md:gap-x-12">
                <div className="flex flex-col mb-4 md:flex-row md:gap-12 md:col-start-1 md:col-end-4 md:row-start-1">
                    {sala.activeGenres && sala.activeGenres.length > 0 && (
                        <div className="mb-6 w-2/3">
                            <p className="font-semibold my-2">
                                Selecciona los géneros que quieres eliminar:
                            </p>
                            <form onSubmit={handleDelGenSubmit}>
                                <ul className="flex flex-wrap gap-2 my-4">
                                    {sala.activeGenres.map((gen) => (
                                        <li key={gen.generoId}>
                                            <span
                                                className="bg-yellowOiches px-3 py-1 rounded-3xl"
                                                onClick={() =>
                                                    handleDeleteGenreClick(
                                                        gen.generoId
                                                    )
                                                }
                                                style={{
                                                    textDecoration:
                                                        deleteGenres.includes(
                                                            gen.generoId
                                                        )
                                                            ? 'line-through'
                                                            : 'none',
                                                }}
                                            >
                                                {gen.generoName}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <input
                                    type="submit"
                                    value="Eliminar seleccionados"
                                    className="btn-account"
                                />
                            </form>
                        </div>
                    )}
                    <div className="mb-6">
                        <p className="font-semibold my-2">Añadir géneros:</p>
                        <form onSubmit={handleGenSubmit} className="max-w-60">
                            <Multiselect
                                options={availableGenres.map((genre) => ({
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
                                className="form-multiselect mb-3"
                            />
                            {generos.length > 0 && (
                                <input
                                    type="submit"
                                    value="Añadir selección"
                                    className="btn-account"
                                />
                            )}
                        </form>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="md:grid md:grid-cols-6 md:gap-x-6 md:col-start-1 md:col-end-4"
                >
                    {/* Nombre */}
                    <label
                        htmlFor="nombre"
                        className="flex flex-col mb-4 md:col-start-1 md:col-end-7"
                    >
                        <span className="font-semibold">
                            Nombre de la Sala:
                        </span>

                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre de la sala"
                            value={sala.nombre}
                            onChange={(e) =>
                                setSala({ ...sala, nombre: e.target.value })
                            }
                            className="form-input"
                        />
                    </label>

                    {/* Dirección */}
                    <label
                        htmlFor="direccion"
                        className="flex flex-col mb-4 md:col-start-1 md:col-end-7"
                    >
                        <span className="font-semibold">Dirección:</span>

                        <input
                            type="text"
                            name="direccion"
                            placeholder="Dirección de la sala"
                            value={sala.direccion}
                            onChange={(e) =>
                                setSala({
                                    ...sala,
                                    direccion: e.target.value,
                                })
                            }
                            className="form-input"
                        />
                    </label>
                    {userLogged && userLogged.roles === 'admin' ? (
                        <label
                            htmlFor="googleMapUrl"
                            className="flex flex-col mb-4 md:col-start-1 md:col-end-7"
                        >
                            <span className="font-semibold">
                                Enlace a Google Maps (Admin)
                            </span>

                            <input
                                type="text"
                                name="googleMapUrl"
                                placeholder="url de Google Maps"
                                value={sala.googleMapUrl}
                                required
                                onChange={(e) =>
                                    setSala({
                                        ...sala,
                                        googleMapUrl: e.target.value,
                                    })
                                }
                                className="form-input"
                            />
                        </label>
                    ) : (
                        ''
                    )}
                    {/* Ciudad */}
                    <label
                        htmlFor="ciudad"
                        className="flex flex-col mb-4 md:col-start-1 md:col-end-4"
                    >
                        <span className="font-semibold"> Ciudad:*</span>
                        <input
                            type="text"
                            name="ciudad"
                            placeholder="Ciudad de la sala"
                            value={sala.ciudad}
                            onChange={(e) =>
                                setSala({
                                    ...sala,
                                    ciudad: e.target.value,
                                })
                            }
                            className="form-input"
                        />
                    </label>

                    {/* Provincia */}
                    <label
                        htmlFor="province"
                        className="flex flex-col mb-4 md:col-start-4 md:col-end-7"
                    >
                        <span className="font-semibold">Provincia:</span>
                        <select
                            name="provincia"
                            value={sala.provincia}
                            className="form-select"
                            onChange={(e) =>
                                setSala({ ...sala, provincia: e.target.value })
                            }
                        >
                            <option value="">Provincia</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                    {province.provincia}
                                </option>
                            ))}
                        </select>
                    </label>
                    {/* Web */}
                    <label
                        htmlFor="web"
                        className="flex-col mb-4 md:col-start-1 md:col-end-5"
                    >
                        <span className="font-semibold">Web:</span>

                        <input
                            type="text"
                            name="web"
                            placeholder="https://www.tusala.com"
                            value={sala.web}
                            className="form-input"
                            onChange={(e) =>
                                setSala({ ...sala, web: e.target.value })
                            }
                        />
                    </label>

                    {/* Aforo */}
                    <label
                        htmlFor="capacidad"
                        className="flex flex-col mb-4 md:col-start-5 md:col-end-7"
                    >
                        <span className="font-semibold">Aforo:</span>

                        <input
                            type="number"
                            name="capacidad"
                            placeholder="Aforo de la sala"
                            value={sala.capacidad}
                            className="form-input"
                            onChange={(e) =>
                                setSala({ ...sala, capacidad: e.target.value })
                            }
                        />
                    </label>
                    {/* Descripción */}
                    <label
                        htmlFor="descripcion"
                        className="flex flex-col mb-4 md:col-start-1 md:col-end-7"
                    >
                        <span className="font-semibold">Descripción:</span>

                        <textarea
                            name="descripcion"
                            value={sala.descripcion}
                            onChange={(e) =>
                                setSala({
                                    ...sala,
                                    descripcion: e.target.value,
                                })
                            }
                            className="form-textarea"
                        ></textarea>
                        <p className="mt-1 text-gray-500 text-sm">
                            2000 caracteres como máximo
                        </p>
                    </label>
                    {/* Condiciones */}
                    <label
                        htmlFor="condiciones"
                        className="flex flex-col mb-4 md:col-start-1 md:col-end-7"
                    >
                        <span className="font-semibold">Condiciones:</span>

                        <textarea
                            type="text"
                            name="condiciones"
                            value={sala.condiciones}
                            onChange={(e) =>
                                setSala({
                                    ...sala,
                                    condiciones: e.target.value,
                                })
                            }
                            className="form-textarea"
                        ></textarea>
                        <p className="mt-1 text-gray-500 text-sm">
                            2000 caracteres como máximo
                        </p>
                    </label>
                    {/* Equipamiento */}
                    <label
                        htmlFor="equipamiento"
                        className="flex flex-col mb-4 md:col-start-1 md:col-end-7"
                    >
                        <span className="font-semibold">Rider:</span>
                        <span className="mt-1 text-gray-500 text-sm font-normal">
                            Si lo prefieres, puedes subir tu rider en PDF en el
                            siguiente apartado.
                        </span>

                        <textarea
                            type="text"
                            name="equipamiento"
                            value={sala.equipamiento}
                            onChange={(e) =>
                                setSala({
                                    ...sala,
                                    equipamiento: e.target.value,
                                })
                            }
                            className="form-textarea"
                        ></textarea>
                        <p className="mt-1 text-gray-500 text-sm">
                            2000 caracteres como máximo
                        </p>
                    </label>
                    <div className="my-8 max-w-80 md:col-start-1 md:col-end-3">
                        <input
                            type="submit"
                            value="Modificar datos"
                            className="btn-account p-3 w-full"
                        />
                    </div>
                    <div>{error && <p>{error}</p>}</div>
                </form>

                <div className="pt-4 md:pt-0 md:flex md:flex-wrap md:flex-col md:col-start-4 md:col-end-6 md:row-start-1 md:row-end-3 md:justify-self-center">
                    <AddSalaRiderForm />
                    <AddSalaPhotos idSala={idSala} />
                </div>
            </div>
            <section className="flex justify-end my-8">
                <DeleteUserSalaGrupo
                    userLogged={userLogged}
                    token={token}
                    id={idSala}
                    type="sala"
                />
            </section>
            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default SalaEdit;
