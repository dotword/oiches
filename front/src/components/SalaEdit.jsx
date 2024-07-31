import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toastify from './Toastify.jsx';
import DeleteSalaPhotos from './DeleteSalaPhotos.jsx';
import AddSalaPhotos from './AddSalaPhotos.jsx';
import FetchProvinciasService from '../services/FetchProvinciasService.js';
import FetchGenresService from '../services/FetchGenresService.js';
import getSalaService from '../services/getSalaService.js';
import EditSalaService from '../services/EditSalaService.js';

const SalaEdit = () => {
    const { userLogged, token } = useContext(AuthContext);

    const { idSala } = useParams();

    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [provincia, setProvincia] = useState('');
    const [genres, setGenres] = useState([]);
    const [generos, setGenero] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precios, setPrecios] = useState('');
    const [condiciones, setCondiciones] = useState('');
    const [equipamiento, setEquipamiento] = useState('');
    const [horaReservasStart, setHoraReservasStart] = useState('');
    const [horaReservasEnd, setHoraReservasEnd] = useState('');

    const [error, setError] = useState('');

    useEffect(() => {
        FetchProvinciasService(setProvinces);
        FetchGenresService(setGenres);
    }, []);

    useEffect(() => {
        const fetchSala = async () => {
            try {
                const { data } = await getSalaService(idSala);

                setNombre(data.sala.nombre || '');
                setGenero(data.sala.generoId || '');
                setDireccion(data.sala.direccion || '');
                setProvincia(data.sala.provinciaId || '');
                setCapacidad(data.sala.capacidad || '');
                setPrecios(data.sala.precios || '');
                setDescripcion(data.sala.descripcion || '');
                setCondiciones(data.sala.condiciones || '');
                setEquipamiento(data.sala.equipamiento || '');
                setHoraReservasStart(data.sala.horaReservasStart || '');
                setHoraReservasEnd(data.sala.horaReservasEnd || '');
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
            }
        };

        fetchSala();
    }, [idSala]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataForm = new FormData();
            dataForm.append('nombre', nombre || '');
            dataForm.append('direccion', direccion || '');
            dataForm.append('provincia', provincia || '');
            dataForm.append('generos', generos || '');
            dataForm.append('capacidad', capacidad || '');
            dataForm.append('precios', precios || '');
            dataForm.append('descripcion', descripcion || '');
            dataForm.append('condiciones', condiciones || '');
            dataForm.append('equipamiento', equipamiento || '');
            dataForm.append('horaReservasStart', horaReservasStart || '');
            dataForm.append('horaReservasEnd', horaReservasEnd || '');

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

    return userLogged && userLogged.roles === 'sala' ? (
        <>
            <form
                onSubmit={handleSubmit}
                className="md:w-3/5 md:flex md:flex-wrap md:justify-between"
            >
                <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                    <label htmlFor="nombre" className="font-semibold">
                        Nombre de la Sala:
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre de la sala"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                    <label htmlFor="genre" className="font-semibold">
                        Género:
                    </label>
                    <select
                        name="generos"
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
                        onChange={(e) => setDireccion(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="flex flex-col mb-4 md:w-[calc(33%-0.5rem)]">
                    <label htmlFor="province" className="font-semibold">
                        Selecciona:
                    </label>
                    <select
                        name="provincia"
                        value={provincia}
                        className="form-select"
                        onChange={(e) => {
                            setProvincia(e.target.value);
                        }}
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
                        Descripción:
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
                        Condiciones:
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
                <div className="my-12 max-w-80">
                    <input
                        type="submit"
                        value="Modificar Sala"
                        className="btn-account p-3 w-full"
                    />
                </div>
                <div>{error && <p>{error}</p>}</div>
            </form>

            <div className="pt-4 md:w-4/12 md:pt-0 md:flex md:flex-wrap md:flex-col md:items-center">
                <p className="block font-medium mb-8 md:w-full text-center">
                    Fotos de la sala
                </p>
                <DeleteSalaPhotos />
                <AddSalaPhotos idSala={idSala} />
            </div>

            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default SalaEdit;
