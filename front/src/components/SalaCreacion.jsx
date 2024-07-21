import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Toastify from './Toastify.jsx';

import FetchProvinciasService from '../services/FetchProvinciasService.js';
import FetchGenresService from '../services/FetchGenresService.js';
import registerSalaService from '../services/registerSalaService.js';

const SalaCreacion = () => {
    const token = localStorage.getItem('AUTH_TOKEN');

    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [provincia, setProvincia] = useState('');
    const [genres, setGenres] = useState([]);
    const [generos, setGenero] = useState();
    const [capacidad, setCapacidad] = useState();
    const [descripcion, setDescripcion] = useState();
    const [precios, setPrecios] = useState();
    const [condiciones, setCondiciones] = useState();
    const [equipamiento, setEquipamiento] = useState();
    const [horaReservasStart, setHoraReservasStart] = useState();
    const [horaReservasEnd, setHoraReservasEnd] = useState();
    const [error, setError] = useState('');
    const [resp, setResp] = useState('');
    const [photoA, setPhotoA] = useState(null);
    const [previewUrlA, setPreviewUrlA] = useState(null);
    const [photoB, setPhotoB] = useState(null);
    const [previewUrlB, setPreviewUrlB] = useState(null);
    const [photoC, setPhotoC] = useState(null);
    const [previewUrlC, setPreviewUrlC] = useState(null);
    const [photoD, setPhotoD] = useState(null);
    const [previewUrlD, setPreviewUrlD] = useState(null);

    useEffect(() => {
        FetchProvinciasService(setProvinces);
    }, []);
    useEffect(() => {
        FetchGenresService(setGenres);
    }, []);

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('direccion', direccion);
    formData.append('provincia', provincia);
    if (generos !== undefined) formData.append('generos', generos);
    if (capacidad !== undefined) formData.append('capacidad', capacidad);
    formData.append('descripcion', descripcion);
    if (precios !== undefined) formData.append('precios', precios);
    formData.append('condiciones', condiciones);
    formData.append('equipamiento', equipamiento);
    if (horaReservasStart !== undefined)
        formData.append('horaReservasStart', horaReservasStart);
    if (horaReservasEnd !== undefined)
        formData.append('horaReservasEnd', horaReservasEnd);
    if (photoA !== null) formData.append('photoA', photoA);
    if (photoB !== null) formData.append('photoB', photoB);
    if (photoC !== null) formData.append('photoC', photoC);
    if (photoD !== null) formData.append('photoD', photoD);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('cap ', photoA);
            const resp = await registerSalaService({
                token,
                formData,
            });

            setResp(resp);

            toast.success('Has creado tu nueva sala con éxito');
        } catch (error) {
            setError(error.message);
            toast.error('Error al crear la sala');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="md:flex md:flex-wrap">
                <div className="md:w-3/5 md:flex md:flex-wrap md:justify-between">
                    <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                        <label htmlFor="nombre" className="font-semibold">
                            Nombre de la Sala:{' '}
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre de la sala"
                            value={nombre}
                            required
                            onChange={(e) => setNombre(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                        <label htmlFor="genre" className="font-semibold">
                            Género:
                        </label>
                        <select
                            id="genre"
                            value={generos}
                            className="form-select"
                            onChange={(event) => setGenero(event.target.value)}
                        >
                            <option value="">Todos</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-4 md:w-full">
                        <label htmlFor="direccion" className="font-semibold">
                            Dirección:
                        </label>
                        <input
                            type="text"
                            name="direccion"
                            placeholder="Dirección de la sala"
                            value={direccion}
                            required
                            onChange={(e) => setDireccion(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="flex flex-col mb-4 md:w-[calc(33%-0.5rem)]">
                        <label htmlFor="province" className="font-semibold">
                            Selecciona:
                        </label>
                        <select
                            id="province"
                            value={provincia}
                            className="form-select"
                            onChange={(event) =>
                                setProvincia(event.target.value)
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

                    <div className="flex flex-col mb-4 md:w-[calc(33%-0.5rem)]">
                        <label htmlFor="capacidad" className="font-semibold">
                            Aforo:{' '}
                        </label>
                        <input
                            type="number"
                            name="capacidad"
                            placeholder="Aforo de la sala"
                            value={capacidad}
                            className="form-input"
                            onChange={(e) => setCapacidad(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col mb-4 md:w-[calc(33%-0.5rem)]">
                        <label htmlFor="precios" className="font-semibold">
                            Precios:{' '}
                        </label>
                        <input
                            type="number"
                            name="precios"
                            placeholder="Tarifa para los grupos"
                            value={precios}
                            onChange={(e) => setPrecios(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="flex flex-col mb-4 md:w-full">
                        <label htmlFor="descripcion" className="font-semibold">
                            Descripción:{' '}
                        </label>
                        <textarea
                            name="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="form-textarea"
                        ></textarea>
                        <p className="mt-1 text-gray-500 text-sm">
                            2000 caracteres como máximo
                        </p>
                    </div>

                    <div className="flex flex-col mb-4 md:w-full">
                        <label htmlFor="condiciones" className="font-semibold">
                            Condiciones:{' '}
                        </label>
                        <textarea
                            type="text"
                            name="condiciones"
                            value={condiciones}
                            onChange={(e) => setCondiciones(e.target.value)}
                            className="form-textarea"
                        ></textarea>
                        <p className="mt-1 text-gray-500 text-sm">
                            2000 caracteres como máximo
                        </p>
                    </div>
                    <div className="flex flex-col mb-4 md:w-full">
                        <label htmlFor="equipamiento" className="font-semibold">
                            Equipamiento:
                        </label>
                        <textarea
                            type="text"
                            name="equipamiento"
                            value={equipamiento}
                            onChange={(e) => setEquipamiento(e.target.value)}
                            className="form-textarea"
                        ></textarea>
                        <p className="mt-1 text-gray-500 text-sm">
                            2000 caracteres como máximo
                        </p>
                    </div>
                    <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                        <label
                            htmlFor="horaReservasStart"
                            className="font-semibold"
                        >
                            Hora de inicio de reservas:
                        </label>
                        <input
                            type="time"
                            name="horaReservasStart"
                            value={horaReservasStart}
                            onChange={(e) =>
                                setHoraReservasStart(e.target.value)
                            }
                            className="form-input"
                        />
                    </div>
                    <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                        <label
                            htmlFor="horaReservasEnd"
                            className="font-semibold"
                        >
                            Hora final de reservas:
                        </label>
                        <input
                            type="time"
                            name="horaReservasEnd"
                            value={horaReservasEnd}
                            onChange={(e) => setHoraReservasEnd(e.target.value)}
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="pt-4 md:w-2/5 md:pl-12 overflow-clip">
                    <div className="mb-4">
                        <input
                            type="file"
                            name="photoA"
                            onChange={(e) => {
                                setPhotoA(e.target.files[0]);
                                setPreviewUrlA(
                                    URL.createObjectURL(e.target.files[0])
                                );
                            }}
                        />
                        <section>
                            {previewUrlA && (
                                <img
                                    src={previewUrlA}
                                    alt="Vista previa"
                                    width={'200px'}
                                />
                            )}
                        </section>
                    </div>
                    <div className="mb-4">
                        <input
                            type="file"
                            name="photoB"
                            onChange={(e) => {
                                setPhotoB(e.target.files[0]);
                                setPreviewUrlB(
                                    URL.createObjectURL(e.target.files[0])
                                );
                            }}
                        />
                        <section>
                            {previewUrlB && (
                                <img
                                    src={previewUrlB}
                                    alt="Vista previa"
                                    width={'200px'}
                                />
                            )}
                        </section>
                    </div>
                    <div className="mb-4">
                        <input
                            type="file"
                            name="photoC"
                            onChange={(e) => {
                                setPhotoC(e.target.files[0]);
                                setPreviewUrlC(
                                    URL.createObjectURL(e.target.files[0])
                                );
                            }}
                        />
                        <section>
                            {previewUrlC && (
                                <img
                                    src={previewUrlC}
                                    alt="Vista previa"
                                    width={'200px'}
                                />
                            )}
                        </section>
                    </div>
                    <div className="mb-4">
                        <input
                            type="file"
                            name="photoD"
                            onChange={(e) => {
                                setPhotoD(e.target.files[0]);
                                setPreviewUrlD(
                                    URL.createObjectURL(e.target.files[0])
                                );
                            }}
                        />
                        <section>
                            {previewUrlD && (
                                <img
                                    src={previewUrlD}
                                    alt="Vista previa"
                                    width={'200px'}
                                />
                            )}
                        </section>
                    </div>
                </div>

                <div className="my-12 btn-account p-3 max-w-80">
                    <input type="submit" value="Crear Sala" />
                </div>
                <div>
                    {error && <p>{error}</p>}
                    {resp.status == 'ok' ? (
                        <>
                            <p>{resp.message}</p>
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </form>
            <Toastify />
        </>
    );
};

export default SalaCreacion;
