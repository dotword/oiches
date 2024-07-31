import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toastify from './Toastify.jsx';
import FetchProvinciasService from '../services/FetchProvinciasService.js';
import FetchGenresService from '../services/FetchGenresService.js';
import getGrupoByIdService from '../services/getGrupoByIdService.js';
import EditGrupoService from '../services/EditGrupoService.js';
import { DeleteGrupoMedia, AddGrupoMedia } from './GrupoMedia.jsx';
import {
    DeleteGrupoFiles,
    AddGrupoFiles,
    AddGrupoPhotos,
    DeleteGrupoPhotos,
} from './GrupoFiles.jsx';

const GrupoEdit = () => {
    const { currentUser, token, userLogged } = useContext(AuthContext);
    const { idGrupo } = useParams();

    const [nombre, setNombre] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [provincia, setProvincia] = useState('');
    const [genres, setGenres] = useState([]);
    const [generos, setGeneros] = useState('');
    const [honorarios, setHonorarios] = useState(0);
    const [biografia, setBiografia] = useState('');
    const [hasRider, setHasRider] = useState('');
    const [hasPhotos, setHasPhotos] = useState('');
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
                setHasRider(data.grupo.pdf.length);
                setHasPhotos(data.grupo.fotos.length);
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

            dataForm.append('nombre', nombre || '');
            dataForm.append('provincia', provincia || '');
            dataForm.append('generos', generos || '');
            dataForm.append('honorarios', honorarios || 0);
            dataForm.append('biografia', biografia || '');
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

    return userLogged && userLogged.roles === 'grupo' ? (
        <>
            {console.log(userLogged)}
            <form
                onSubmit={handleSubmit}
                className="md:grid md:grid-cols-2 md:gap-x-8"
            >
                <div className="flex flex-col mb-4 md:col-start-1 md:col-end-2">
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
                <div className="flex flex-col mb-4 md:col-start-2 md:col-end-3">
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
                <div className="flex flex-col mb-4 md:col-start-1 md:col-end-2">
                    <label htmlFor="province" className="font-semibold">
                        Provincia:
                    </label>
                    <select
                        name="provincia"
                        value={provincia}
                        className="form-select"
                        onChange={(e) => setProvincia(e.target.value)}
                    >
                        <option value="">Selecciona</option>
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                                {province.provincia}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col mb-4 md:col-start-2 md:col-end-3">
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
                <div className="flex flex-col mb-4 md:col-start-1 md:col-end-3">
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

                <div className="mt-4 max-w-80">
                    <input
                        type="submit"
                        value="Modificar Grupo"
                        className="btn-account p-3 w-full"
                    />
                </div>
                <div>{error && <p>{error}</p>}</div>
            </form>
            <section className="mt-12">
                <DeleteGrupoMedia idGrupo={idGrupo} />
                <AddGrupoMedia idGrupo={idGrupo} />
            </section>
            <section className="mt-12">
                {hasRider === 0 ? (
                    <AddGrupoFiles idGrupo={idGrupo} />
                ) : (
                    <DeleteGrupoFiles idGrupo={idGrupo} />
                )}
            </section>
            <section className="mt-12">
                <DeleteGrupoPhotos idGrupo={idGrupo} />
                {hasPhotos < 4 ? <AddGrupoPhotos idGrupo={idGrupo} /> : ''}
            </section>
            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default GrupoEdit;
