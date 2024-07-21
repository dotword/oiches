import { useState, useEffect } from 'react';

import FetchProvinciasService from '../services/FetchProvinciasService';
import FetchGenresService from '../services/FetchGenresService';
import registerSalaService from '../services/registerSalaService';

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
    // const [selectedImage, setSelectedImage] = useState(null);
    // const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        FetchProvinciasService(setProvinces);
    }, []);
    useEffect(() => {
        FetchGenresService(setGenres);
    }, []);

    // const handleImageSelect = (e) => {
    //     setSelectedImage(e.target.files[0]);
    //     setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await registerSalaService({
                token,
                nombre,
                direccion,
                provincia,
                generos,
                capacidad,
                descripcion,
                precios,
                condiciones,
                equipamiento,
                horaReservasStart,
                horaReservasEnd,
            });
            setResp(resp);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="md:w-3/5 md:flex md:flex-wrap md:justify-between">
                <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                    <label htmlFor="nombre" className="font-semibold">
                        Nombre de la Sala:{' '}
                    </label>
                    <input
                        type="nombre"
                        name="text"
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
                        onChange={(event) => setProvincia(event.target.value)}
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
                        onChange={(e) => setHoraReservasStart(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                    <label htmlFor="horaReservasEnd" className="font-semibold">
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

            <div className="my-12 btn-account p-3 max-w-80">
                <input type="submit" value="Crear Sala" />
            </div>
            <div>{error ? <p>{error}</p> : ''}</div>
            <div>
                {resp.status === 'ok' ? (
                    <>
                        <p>{resp.message}</p>
                    </>
                ) : (
                    ''
                )}
            </div>
        </form>
    );
};

export default SalaCreacion;
