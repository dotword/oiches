import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import Multiselect from 'multiselect-react-dropdown';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import FetchGenresService from '../../services/FetchGenresService.js';
import getGrupoByIdService from '../../services/Grupos/getGrupoByIdService.js';
import {
    EditGrupoService,
    DeleteGrupoGenerosService,
    addGeneroGrupoService,
} from '../../services/Grupos/EditGrupoService.js';
import { AddGrupoMedia } from './GrupoMedia.jsx';
import { AddRiderForm, AddFotosForm } from './GrupoFiles.jsx';
import DeleteUserSalaGrupo from '../Users/DeleteUserSalaGrupo.jsx';

const GrupoEdit = () => {
    const { token, userLogged } = useContext(AuthContext);
    const { idGrupo } = useParams();

    const [grupo, setGrupo] = useState({
        nombre: '',
        provincia: '',
        web: '',
        honorarios: 0,
        honorarios_to: 0,
        condiciones: '',
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
                    web: data.grupo.web || '',
                    honorarios: data.grupo.honorarios || 0,
                    honorarios_to: data.grupo.honorarios_to || 0,
                    condiciones: data.grupo.condiciones || '',
                    biografia: data.grupo.biografia || '',
                    activeGenres: data.grupo.genero || [],
                    hasRider: data.grupo.pdf.length,
                    hasPhotos: data.grupo.fotos.length,
                    owner: data.grupo.usuario_id,
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
        // 1. Normalizamos la URL
        let normalizedWeb = grupo.web.trim();
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
            dataForm.append('nombre', grupo.nombre || '');
            dataForm.append('provincia', grupo.provincia || '');
            dataForm.append('web', normalizedWeb || '');
            dataForm.append('honorarios', grupo.honorarios || 0);
            dataForm.append('honorarios_to', grupo.honorarios_to || 0);
            dataForm.append('condiciones', grupo.condiciones || '');
            dataForm.append('biografia', grupo.biografia || '');

            await EditGrupoService({
                token,
                idGrupo,
                dataForm,
            });
            toast.success('Has modificado tu proyecto musical con éxito');
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

    return (userLogged && grupo.owner === userLogged.id) ||
        (userLogged && userLogged.roles === 'admin') ? (
        <div className="px-6 pt-3 pb-6 md:px-12 bg-white rounded-lg shadow-md lg:flex lg:flex-wrap lg:gap-20">
            <section className="lg:w-[calc(60%-2.5rem)]">
                <div className="flex flex-col mb-4 md:flex-row md:mb-2 md:gap-12">
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
                    className="md:grid md:grid-cols-4 md:gap-4"
                >
                    <div className="flex flex-col mb-4 md:col-start-1 md:col-end-5 md:mb-0 lg:col-end-3">
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

                    <div className="flex flex-col mb-4 md:col-start-1 md:col-end-3 md:mb-0 lg:col-start-3 lg:col-end-5">
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

                    <div className="flex flex-col mb-4 md:col-start-3 md:col-end-5 md:mb-0 lg:col-start-1 lg:col-end-3">
                        <label htmlFor="web" className="font-semibold">
                            Web:
                        </label>
                        <input
                            type="text"
                            name="web"
                            placeholder="https://www.tugrupo.com"
                            value={grupo.web}
                            onChange={(e) =>
                                setGrupo({
                                    ...grupo,
                                    web: e.target.value,
                                })
                            }
                            className="form-input"
                        />
                    </div>

                    <div className="flex flex-col mb-4 md:col-start-1 md:col-end-3 md:mb-0 lg:col-start-3 lg:col-end-4">
                        <label htmlFor="honorarios" className="font-semibold">
                            Caché desde:
                        </label>
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
                    </div>

                    <div className="flex flex-col mb-4 md:col-start-3 md:col-end-5 md:mb-0 lg:col-start-4 lg:col-end-5">
                        <label
                            htmlFor="honorarios_to"
                            className="font-semibold"
                        >
                            Caché hasta:{' '}
                        </label>
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
                    </div>

                    <div className="flex flex-col mb-4 md:col-start-1 md:col-end-5">
                        <label htmlFor="condiciones" className="font-semibold">
                            Condiciones:
                        </label>
                        <textarea
                            name="condiciones"
                            value={grupo.condiciones}
                            onChange={(e) =>
                                setGrupo({
                                    ...grupo,
                                    condiciones: e.target.value,
                                })
                            }
                            className="form-textarea"
                        ></textarea>
                        <p className="mt-1 text-gray-500 text-sm">
                            2000 caracteres como máximo
                        </p>
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
                            value="Modificar datos"
                            className="btn-account p-3 w-full"
                        />
                    </div>
                    {error && <div>{error}</div>}
                </form>
            </section>

            <section className="lg:w-[calc(40%-2.5rem)]">
                <div className="mt-12 lg:mt-2">
                    <AddGrupoMedia idGrupo={idGrupo} />
                </div>
                <div className="mt-12">
                    <AddFotosForm />
                </div>
                <div className="mt-12">
                    <AddRiderForm />
                </div>
            </section>

            <section className="flex justify-end my-8 lg:w-full">
                <DeleteUserSalaGrupo
                    userLogged={userLogged}
                    token={token}
                    id={idGrupo}
                    type="grupo"
                />
            </section>
            <Toastify />
        </div>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default GrupoEdit;
