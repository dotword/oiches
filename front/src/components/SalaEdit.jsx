import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Multiselect from 'multiselect-react-dropdown';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import MapComponent from './MapComponent.jsx';
import Toastify from './Toastify.jsx';
import AddSalaPhotos from './AddSalaPhotos.jsx';
import FetchProvinciasService from '../services/FetchProvinciasService.js';
import FetchGenresService from '../services/FetchGenresService.js';
import getSalaService from '../services/getSalaService.js';
import {
    EditSalaService,
    addGeneroSalaService,
    DeleteSalaGenerosService,
} from '../services/EditSalaService.js';
import { AddSalaRiderForm } from './SalaFiles.jsx';

const SalaEdit = () => {
    const { userLogged, token } = useContext(AuthContext);

    const { idSala } = useParams();

    const [sala, setSala] = useState({
        nombre: '',
        direccion: '',
        ciudad: '',
        provincia: '',
        capacidad: '',
        descripcion: '',
        condiciones: '',
        equipamiento: '',
        web: '',
        horaReservasStart: '',
        horaReservasEnd: '',
        activeGenres: [],
    });

    const [provinces, setProvinces] = useState([]);
    const [genres, setGenres] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [deleteGenres, setDeleteGenres] = useState([]);
    const [error, setError] = useState('');

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
                    provincia: data.sala.provinciaId || '',
                    capacidad: data.sala.capacidad || '',
                    descripcion: data.sala.descripcion || '',
                    condiciones: data.sala.condiciones || '',
                    equipamiento: data.sala.equipamiento || '',
                    web: data.sala.web || '',
                    horaReservasStart: data.sala.horaReservasStart || '',
                    horaReservasEnd: data.sala.horaReservasEnd || '',
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

        try {
            const dataForm = new FormData();
            dataForm.append('nombre', sala.nombre || '');
            dataForm.append('direccion', sala.direccion || '');
            dataForm.append('ciudad', sala.ciudad || '');
            dataForm.append('provincia', sala.provincia || '');
            dataForm.append('capacidad', sala.capacidad || '');
            dataForm.append('descripcion', sala.descripcion || '');
            dataForm.append('condiciones', sala.condiciones || '');
            dataForm.append('equipamiento', sala.equipamiento || '');
            dataForm.append('web', sala.web || '');
            dataForm.append('horaReservasStart', sala.horaReservasStart || '');
            dataForm.append('horaReservasEnd', sala.horaReservasEnd || '');

            await EditSalaService({
                token,
                idSala,
                dataForm,
            });
            toast.success('Has modificado sala con éxito');
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

    const handleLocationSelect = (location) => {
        setSala((prevSala) => ({
            ...prevSala,
            direccion: location.direccion,
            ciudad: location.ciudad,
        }));
    };

    return (userLogged && sala.owner === userLogged.id) ||
        (userLogged && userLogged.roles === 'admin') ? (
        <>
            <div className="px-6 pt-3 pb-6 md:px-12 bg-white rounded-lg shadow-md md:grid md:grid-cols-3 md:gap-x-12">
                <div className="flex flex-col mb-4 md:flex-row md:gap-12 md:col-start-1 md:col-end-4">
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
                            <input
                                type="submit"
                                value="Añadir géneros"
                                className="btn-account"
                            />
                        </form>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="md:grid md:grid-cols-6 md:gap-x-6 md:col-start-1 md:col-end-3"
                >
                    {/* Nombre */}
                    <div className="flex flex-col mb-4 md:col-start-1 md:col-end-5">
                        <label htmlFor="nombre">
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
                    </div>

                    {/* Provincia */}
                    <div className="flex flex-col mb-4 md:col-start-5 md:col-end-7">
                        <label htmlFor="province" className="font-semibold">
                            Provincia:
                        </label>
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
                    </div>
                    {/* Dirección */}
                    <div className="flex flex-col mb-4 md:col-start-1 md:col-end-7">
                        <label htmlFor="direccion" className="font-semibold">
                            Cambiar dirección:
                        </label>
                        <input
                            type="text"
                            name="direccion"
                            placeholder="Dirección de la sala"
                            value={sala.direccion || ''}
                            onChange={(e) =>
                                setSala({ ...sala, direccion: e.target.value })
                            }
                            className="hidden"
                        />
                        <input
                            type="text"
                            name="ciudad"
                            placeholder="Ciudad de la sala"
                            value={sala.ciudad || ''}
                            onChange={(e) =>
                                setSala({ ...sala, ciudad: e.target.value })
                            }
                            className="hidden"
                        />
                        <MapComponent onLocationSelect={handleLocationSelect} />
                    </div>
                    {/* Web */}
                    <div className="flex flex-col mb-4 md:col-start-1 md:col-end-5">
                        <label htmlFor="web" className="font-semibold">
                            Web:
                        </label>
                        <input
                            type="url"
                            name="web"
                            placeholder="https://www.tusala.com"
                            value={sala.web}
                            className="form-input"
                            onChange={(e) =>
                                setSala({ ...sala, web: e.target.value })
                            }
                        />
                    </div>

                    {/* Aforo */}
                    <div className="flex flex-col mb-4 md:col-start-5 md:col-end-7">
                        <label htmlFor="capacidad" className="font-semibold">
                            Aforo:
                        </label>
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
                    </div>

                    <div className="flex flex-col mb-4 md:col-start-1 md:col-end-7">
                        <label htmlFor="descripcion" className="font-semibold">
                            Descripción:
                        </label>
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
                    </div>

                    <div className="flex flex-col mb-4 md:col-start-1 md:col-end-7">
                        <label htmlFor="condiciones" className="font-semibold">
                            Condiciones:
                        </label>
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
                    </div>
                    <div className="flex flex-col mb-4 md:col-start-1 md:col-end-7">
                        <label htmlFor="equipamiento" className="font-semibold">
                            Rider:
                        </label>
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
                    </div>
                    <div className="flex flex-col mb-4 md:col-start-1 md:col-end-4">
                        <label
                            htmlFor="horaReservasStart"
                            className="font-semibold"
                        >
                            Hora de inicio de reservas:
                        </label>
                        <input
                            type="time"
                            name="horaReservasStart"
                            value={sala.horaReservasStart}
                            onChange={(e) =>
                                setSala({
                                    ...sala,
                                    horaReservasStart: e.target.value,
                                })
                            }
                            className="form-input"
                        />
                    </div>
                    <div className="flex flex-col mb-4 md:col-start-4 md:col-end-7">
                        <label
                            htmlFor="horaReservasEnd"
                            className="font-semibold"
                        >
                            Hora final de reservas:
                        </label>
                        <input
                            type="time"
                            name="horaReservasEnd"
                            value={sala.horaReservasEnd}
                            onChange={(e) =>
                                setSala({
                                    ...sala,
                                    horaReservasEnd: e.target.value,
                                })
                            }
                            className="form-input"
                        />
                    </div>
                    <div className="my-12 max-w-80 md:col-start-1 md:col-end-3">
                        <input
                            type="submit"
                            value="Modificar Sala"
                            className="btn-account p-3 w-full"
                        />
                    </div>
                    <div>{error && <p>{error}</p>}</div>
                </form>

                <div className="pt-4 md:pt-0 md:flex md:flex-wrap md:flex-col md:items-center md:col-start-3 md:col-end-4">
                    <AddSalaRiderForm />
                    <AddSalaPhotos idSala={idSala} />
                </div>
            </div>
            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default SalaEdit;
