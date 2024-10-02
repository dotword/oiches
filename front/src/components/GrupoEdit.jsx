import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toastify from './Toastify.jsx';
import Multiselect from 'multiselect-react-dropdown';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import FetchProvinciasService from '../services/FetchProvinciasService.js';
import FetchGenresService from '../services/FetchGenresService.js';
import getGrupoByIdService from '../services/getGrupoByIdService.js';
import {
    EditGrupoService,
    DeleteGrupoGenerosService,
    addGeneroGrupoService,
} from '../services/EditGrupoService.js';
import { DeleteGrupoMedia, AddGrupoMedia } from './GrupoMedia.jsx';
import {
    // DeleteGrupoFiles,
    // AddGrupoFiles,
    // AddGrupoPhotos,
    // DeleteGrupoPhotos,
    AddRiderForm,
    AddFotosForm,
} from './GrupoFiles.jsx';

const GrupoEdit = () => {
    const { token, userLogged } = useContext(AuthContext);
    const { idGrupo } = useParams();

    const [grupo, setGrupo] = useState({
        nombre: '',
        provincia: '',
        honorarios: 0,
        honorarios_to: 0,
        biografia: '',
        activeGenres: [],
        hasRider: 0,
        hasPhotos: 0,
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
        const fetchGrupo = async () => {
            try {
                const { data } = await getGrupoByIdService(idGrupo);
                setGrupo({
                    nombre: data.grupo.nombre || '',
                    provincia: data.grupo.provinciaId || '',
                    honorarios: data.grupo.honorarios || 0,
                    honorarios_to: data.grupo.honorarios_to || 0,
                    biografia: data.grupo.biografia || '',
                    activeGenres: data.grupo.genero || [],
                    hasRider: data.grupo.pdf.length,
                    hasPhotos: data.grupo.fotos.length,
                });
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
            }
        };
        fetchGrupo();
    }, [idGrupo]);

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
            await addGeneroGrupoService(dataForm, idGrupo, token);
            toast.success('Géneros añadidos');

            //Actualizar géneros activos
            const { data } = await getGrupoByIdService(idGrupo);
            setGrupo((prevGrupo) => ({
                ...prevGrupo,
                activeGenres: data.grupo.genero,
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
            await DeleteGrupoGenerosService(deleteGenres, idGrupo, token);
            toast.success('Borraste los géneros seleccionados');

            // Actualizar géneros activos
            const { data } = await getGrupoByIdService(idGrupo);
            setGrupo((prevGrupo) => ({
                ...prevGrupo,
                activeGenres: data.grupo.genero,
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
            dataForm.append('nombre', grupo.nombre || '');
            dataForm.append('provincia', grupo.provincia || '');
            dataForm.append('honorarios', grupo.honorarios || 0);
            dataForm.append('honorarios_to', grupo.honorarios_to || 0);
            dataForm.append('biografia', grupo.biografia || '');
            await EditGrupoService({
                token,
                idGrupo,
                dataForm,
            });
            toast.success('Has modificado tu grupo con éxito');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    // Filtrar géneros disponibles para agregar
    const availableGenres = genres.filter(
        (genre) =>
            !grupo.activeGenres.some(
                (activeGenre) => activeGenre.generoId === genre.id
            )
    );

    return userLogged && userLogged.roles === 'grupo' ? (
        <>
            <section className="flex flex-col mb-4 md:flex-row md:justify-between md:max-w-3xl md:col-start-1 md:col-end-4 md:mb-12">
                <div className="mb-6">
                    <p className="font-semibold my-2">
                        Selecciona los géneros que quieres eliminar:
                    </p>
                    <form onSubmit={handleDelGenSubmit}>
                        <ul className="flex flex-wrap gap-2 my-4">
                            {grupo.activeGenres.map((gen) => (
                                <li key={gen.generoId}>
                                    <span
                                        className="bg-yellowOiches px-3 py-1 rounded-3xl"
                                        onClick={() =>
                                            handleDeleteGenreClick(gen.generoId)
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
            </section>

            <form
                onSubmit={handleSubmit}
                className="md:grid md:grid-cols-4 md:gap-x-8 md:col-start-1 md:col-end-3"
            >
                <div className="flex flex-col mb-4 md:col-start-1 md:col-end-3">
                    <label htmlFor="nombre" className="font-semibold">
                        Nombre del artista/grupo:
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del artista/grupo"
                        value={grupo.nombre}
                        onChange={(e) =>
                            setGrupo({ ...grupo, nombre: e.target.value })
                        }
                        className="form-input"
                    />
                </div>

                <div className="flex flex-col mb-4 md:col-start-3 md:col-end-5">
                    <label htmlFor="provincia" className="font-semibold">
                        Provincia:
                    </label>
                    <select
                        name="provincia"
                        value={grupo.provincia}
                        className="form-select"
                        onChange={(e) =>
                            setGrupo({
                                ...grupo,
                                provincia: e.target.value,
                            })
                        }
                    >
                        <option value="">Selecciona</option>
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                                {province.provincia}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col mb-4 md:col-start-1 md:col-end-5">
                    <div className="flex gap-4">
                        <label htmlFor="honorarios" className="font-semibold">
                            Caché desde:
                            <input
                                type="number"
                                name="honorarios"
                                placeholder="Caché desde"
                                value={grupo.honorarios}
                                onChange={(e) =>
                                    setGrupo({
                                        ...grupo,
                                        honorarios: e.target.value,
                                    })
                                }
                                className="form-input font-normal"
                            />
                        </label>
                        <label
                            htmlFor="honorarios_to"
                            className="font-semibold"
                        >
                            Caché hasta:
                            <input
                                type="number"
                                name="honorarios_to"
                                placeholder="Caché hasta"
                                value={grupo.honorarios_to}
                                onChange={(e) =>
                                    setGrupo({
                                        ...grupo,
                                        honorarios_to: e.target.value,
                                    })
                                }
                                className="form-input font-normal"
                            />
                        </label>
                    </div>
                </div>
                <div className="flex flex-col mb-4 md:col-start-1 md:col-end-5">
                    <label htmlFor="biografia" className="font-semibold">
                        Biografía:
                    </label>
                    <textarea
                        name="biografia"
                        value={grupo.biografia}
                        onChange={(e) =>
                            setGrupo({
                                ...grupo,
                                biografia: e.target.value,
                            })
                        }
                        className="form-textarea"
                    ></textarea>
                    <p className="mt-1 text-gray-500 text-sm">
                        2000 caracteres como máximo
                    </p>
                </div>

                <div className="mt-4 max-w-80 md:col-start-1 md:col-end-3">
                    <input
                        type="submit"
                        value="Modificar Grupo"
                        className="btn-account p-3 w-full"
                    />
                </div>
                {error && <div>{error}</div>}
            </form>

            <section className="mt-12 md:col-start-1 md:col-end-3">
                <DeleteGrupoMedia idGrupo={idGrupo} />
                <AddGrupoMedia idGrupo={idGrupo} />
            </section>
            <section className="mt-12 md:mt-0 md:col-start-3 md:col-end-4 md:row-start-2">
                <AddRiderForm />
                {/* {grupo.hasRider === 0 ? (
                    <AddGrupoFiles idGrupo={idGrupo} />
                ) : (
                    <DeleteGrupoFiles idGrupo={idGrupo} />
                )} */}
            </section>
            <section className="mt-12 d:col-start-3 md:col-end-4 md:mt-0">
                {/* <AddFotosForm /> */}
                {/* <DeleteGrupoPhotos idGrupo={idGrupo} />
                {grupo.hasPhotos < 4 && <AddGrupoPhotos idGrupo={idGrupo} />} */}
            </section>
            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default GrupoEdit;
