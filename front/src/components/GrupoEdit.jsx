import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toastify from './Toastify.jsx';
import FetchProvinciasService from '../services/FetchProvinciasService.js';
import FetchGenresService from '../services/FetchGenresService.js';
import getGrupoByIdService from '../services/getGrupoByIdService.js';
import EditGrupoService from '../services/EditGrupoService.js';

const GrupoEdit = () => {
    const { currentUser, token } = useContext(AuthContext);
    const { idGrupo } = useParams();

    const [nombre, setNombre] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [provincia, setProvincia] = useState('');
    const [genres, setGenres] = useState([]);
    const [generos, setGeneros] = useState('');
    const [honorarios, setHonorarios] = useState('');
    const [biografia, setBiografia] = useState('');
    const [mediaA, setMediaA] = useState([]);
    const [mediaB, setMediaB] = useState('');
    const [mediaC, setMediaC] = useState('');
    const [mediaD, setMediaD] = useState('');
    const [mediaName, setMediaName] = useState('');
    const [mediaDelete, setMediaDelete] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        FetchProvinciasService(setProvinces);
        FetchGenresService(setGenres);
    }, []);

    useEffect(() => {
        const fetchGrupo = async () => {
            try {
                const { data } = await getGrupoByIdService(idGrupo);
                setNombre(data.grupo.nombre || '');
                setGeneros(data.grupo.generoId || '');
                setProvincia(data.grupo.provinciaId || '');
                setHonorarios(data.grupo.honorarios || '');
                setBiografia(data.grupo.biografia || '');
                setMediaA(data.grupo.media[0] || '');
                setMediaB(data.grupo.media[1]?.url || '');
                setMediaC(data.grupo.media[2]?.url || '');
                setMediaD(data.grupo.media[3]?.url || '');
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
            }
        };
        fetchGrupo();
    }, [idGrupo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataForm = new FormData();
            dataForm.append('nombre', nombre);
            dataForm.append('provincia', provincia);
            dataForm.append('generos', generos);
            dataForm.append('honorarios', Number(honorarios));
            dataForm.append('biografia', biografia);
            if (mediaDelete) {
                dataForm.append('mediaDelete', mediaDelete);
            }
            if (mediaName) {
                dataForm.append('mediaName', mediaName);
            }
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
    console.log('md ', mediaName.length);

    return currentUser ? (
        <>
            <form
                onSubmit={handleSubmit}
                className="md:w-3/5 md:flex md:flex-wrap md:justify-between"
            >
                <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                    <label htmlFor="nombre" className="font-semibold">
                        Nombre del Grupo:
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del grupo"
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
                        onChange={(e) => setGeneros(e.target.value)}
                    >
                        <option value="">Todos</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                    <label htmlFor="province" className="font-semibold">
                        Selecciona:
                    </label>
                    <select
                        name="provincia"
                        value={provincia}
                        className="form-select"
                        onChange={(e) => setProvincia(e.target.value)}
                    >
                        <option value="">Provincia</option>
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                                {province.provincia}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                    <label htmlFor="honorarios" className="font-semibold">
                        Caché:
                    </label>
                    <input
                        type="number"
                        name="honorarios"
                        placeholder="Caché del grupo"
                        value={honorarios}
                        onChange={(e) => setHonorarios(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="flex flex-col mb-4 md:w-full">
                    <label htmlFor="biografia" className="font-semibold">
                        Biografía:
                    </label>
                    <textarea
                        name="biografia"
                        value={biografia}
                        onChange={(e) => setBiografia(e.target.value)}
                        className="form-textarea"
                    ></textarea>
                    <p className="mt-1 text-gray-500 text-sm">
                        2000 caracteres como máximo
                    </p>
                </div>
                {mediaA && (
                    <section className="mb-8">
                        <p className="font-semibold mb-2">Borrar videos:</p>
                        <div>
                            <input
                                type="button"
                                value="Selecciona"
                                name="mediaDelete"
                                onClick={() => setMediaDelete(mediaA.url)}
                                className="btn-account"
                            />
                            <p>{mediaA.url}</p>
                        </div>
                    </section>
                )}
                <section className="mb-8">
                    <p className="font-semibold mb-2">Enlaza un video:</p>
                    <input
                        type="url"
                        name="mediaName"
                        placeholder="Añade enlaces a tus videos"
                        value={mediaName}
                        onChange={(e) => setMediaName(e.target.value)}
                        className="form-input"
                    />
                </section>
                <div className="my-12 max-w-80">
                    <input
                        type="submit"
                        value="Modificar Grupo"
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

export default GrupoEdit;
