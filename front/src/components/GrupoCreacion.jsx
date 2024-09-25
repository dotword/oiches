import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context';
import { toast } from 'react-toastify';
import Toastify from './Toastify';
import { useNavigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';

import { IoIosCloseCircleOutline } from 'react-icons/io';

import FetchProvinciasService from '../services/FetchProvinciasService';
import FetchGenresService from '../services/FetchGenresService';
import registerGrupoService from '../services/registerGrupoService';

const GrupoCreacion = () => {
    const { userLogged, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        nombre: '',
        provincia: '',
        generos: [],
        honorarios: '',
        biografia: '',
        mediaA: '',
        mediaB: '',
        mediaC: '',
        mediaD: '',
    });
    const [provinces, setProvinces] = useState([]);
    const [genres, setGenres] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [file, setFile] = useState(null);
    const [photos, setPhotos] = useState({
        photoA: null,
        photoB: null,
        photoC: null,
        photoD: null,
    });
    const [previews, setPreviews] = useState({
        previewUrlA: null,
        previewUrlB: null,
        previewUrlC: null,
        previewUrlD: null,
    });
    const [mediaLinks, setMediaLinks] = useState({
        mediaA: '',
        mediaB: '',
        mediaC: '',
        mediaD: '',
    });
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

    const handleFotoChange = (e, name) => {
        const file = e.target.files[0];
        setPhotos({ ...photos, [name]: file });
        setPreviews({
            ...previews,
            [`previewUrl${name.charAt(name.length - 1).toUpperCase()}`]:
                URL.createObjectURL(file),
        });
    };

    const extractYouTubeId = (url) => {
        try {
            const urlObj = new URL(url);
            return urlObj.searchParams.get('v');
        } catch (e) {
            return null; // Manejo de casos donde el URL no es válido
        }
    };
    const handleMediaChange = (e) => {
        const { name, value } = e.target;
        setMediaLinks((prev) => ({
            ...prev,
            [name]: value,
        }));

        const youTubeId = extractYouTubeId(value);
        if (youTubeId) {
            setFormValues((prev) => ({
                ...prev,
                [name]: youTubeId,
            }));
        }
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
        Object.entries(photos).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });
        if (file) formData.append('file', file);

        // Extraer el ID de YouTube para cada campo de medios
        ['mediaA', 'mediaB', 'mediaC', 'mediaD'].forEach((media) => {
            const youTubeId = extractYouTubeId(formValues[media]);
            if (youTubeId) {
                formData.append(media, youTubeId); // Guardar solo el ID
            }
        });

        try {
            await registerGrupoService({ token, formData });

            toast.success('Has creado tu nuevo artista/grupo con éxito');
            navigate('/users');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };
    const { nombre, provincia, honorarios, biografia } = formValues;

    return (
        <>
            {userLogged ? (
                <form onSubmit={handleSubmit} className="md:flex md:flex-wrap">
                    <div className="md:w-3/5 md:flex md:flex-wrap md:justify-between">
                        <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                            <label htmlFor="nombre" className="font-semibold">
                                Nombre del artista/grupo:*
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
                                Géneros:
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
                            <label
                                htmlFor="honorarios"
                                className="font-semibold"
                            >
                                Caché:
                            </label>
                            <input
                                type="number"
                                name="honorarios"
                                placeholder="Caché del artista/grupo"
                                value={honorarios}
                                onChange={handleChange}
                                className="form-input"
                            />
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
                        <section className="mb-8">
                            <p className="font-semibold mb-2">
                                Enlaza tus videos:
                            </p>
                            {['mediaA', 'mediaB', 'mediaC', 'mediaD'].map(
                                (media) => (
                                    <input
                                        key={media}
                                        type="text"
                                        name={media}
                                        placeholder="Añade enlaces a tus videos de YouTube"
                                        value={mediaLinks[media]}
                                        className="form-input"
                                        onChange={handleMediaChange}
                                    />
                                )
                            )}
                        </section>
                    </div>
                    <div className="pt-4 md:w-2/5 md:pl-12 md:pt-0 md:flex md:flex-col">
                        <section className="mb-8">
                            <p className="font-semibold mb-2">
                                Sube el Rider (.pdf)
                            </p>
                            <div className="sect-photo">
                                <span className="border-photos w-full h-20">
                                    {file ? (
                                        <span className="text-xs p-1 overflow-hidden">
                                            {file.name}
                                        </span>
                                    ) : (
                                        <span>Sube tu archivo</span>
                                    )}

                                    <input
                                        type="file"
                                        name={file}
                                        className="absolute w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) =>
                                            setFile(e.target.files[0])
                                        }
                                    />
                                </span>
                            </div>
                        </section>

                        <section className="mb-8 gap-2 flex flex-wrap">
                            <p className="mb-2 font-semibold w-full">
                                Fotos del artista/grupo
                            </p>
                            {['A', 'B', 'C', 'D'].map((key) => (
                                <div
                                    className="mb-4 flex flex-wrap gap-4"
                                    key={key}
                                >
                                    <section className="sect-photo">
                                        <span className="border-photos">
                                            {previews[`previewUrl${key}`] ? (
                                                <img
                                                    src={
                                                        previews[
                                                            `previewUrl${key}`
                                                        ]
                                                    }
                                                    alt="Vista previa"
                                                    width={'200px'}
                                                />
                                            ) : (
                                                <span>Sube una foto</span>
                                            )}
                                            <input
                                                type="file"
                                                name={`photo${key}`}
                                                className="absolute w-full h-full opacity-0 cursor-pointer"
                                                onChange={(e) =>
                                                    handleFotoChange(
                                                        e,
                                                        `photo${key}`
                                                    )
                                                }
                                            />
                                        </span>
                                    </section>
                                </div>
                            ))}
                        </section>
                    </div>
                    <div className="my-12 max-w-80">
                        <input
                            type="submit"
                            value="Publicar artista/grupo"
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
