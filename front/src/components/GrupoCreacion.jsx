import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context';
import { toast } from 'react-toastify';
import Toastify from './Toastify';
import FetchProvinciasService from '../services/FetchProvinciasService';
import FetchGenresService from '../services/FetchGenresService';
import registerGrupoService from '../services/registerGrupoService';

const GrupoCreacion = () => {
    const { userLogged, token } = useContext(AuthContext);

    const [formValues, setFormValues] = useState({
        nombre: '',
        provincia: '',
        generos: '',
        honorarios: '',
        biografia: '',
        mediaA: '',
        mediaB: '',
        mediaC: '',
        mediaD: '',
    });
    const [provinces, setProvinces] = useState([]);
    const [genres, setGenres] = useState([]);
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
    const [error, setError] = useState('');
    const [resp, setResp] = useState('');

    useEffect(() => {
        FetchProvinciasService(setProvinces);
        FetchGenresService(setGenres);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // const handleMediaChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(value);
    //     if (value.includes('youtube.com/watch')) {
    //         // Convertir enlace de YouTube a formato embed
    //         value.replace('watch?v=', 'embed/');
    //     }
    //     setFormValues({ ...formValues, [name]: value });
    // };

    const handleFotoChange = (e, name) => {
        const file = e.target.files[0];
        setPhotos({ ...photos, [name]: file });
        setPreviews({
            ...previews,
            [`previewUrl${name.charAt(name.length - 1).toUpperCase()}`]:
                URL.createObjectURL(file),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });
        Object.entries(photos).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });
        if (file) formData.append('file', file);

        try {
            const response = await registerGrupoService({ token, formData });
            setResp(response);
            toast.success('Has creado tu nuevo grupo con éxito');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };
    const {
        nombre,
        provincia,
        generos,
        honorarios,
        biografia,
        mediaA,
        mediaB,
        mediaC,
        mediaD,
    } = formValues;

    return (
        <>
            {userLogged ? (
                <form onSubmit={handleSubmit} className="md:flex md:flex-wrap">
                    <div className="md:w-3/5 md:flex md:flex-wrap md:justify-between">
                        <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                            <label htmlFor="nombre" className="font-semibold">
                                Nombre del Grupo:
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre del grupo"
                                value={nombre}
                                required
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                        <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                            <label htmlFor="generos" className="font-semibold">
                                Género:
                            </label>
                            <select
                                id="generos"
                                name="generos"
                                value={generos}
                                className="form-select"
                                onChange={handleChange}
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
                            <label
                                htmlFor="provincia"
                                className="font-semibold"
                            >
                                Selecciona:
                            </label>
                            <select
                                id="provincia"
                                name="provincia"
                                value={provincia}
                                required
                                className="form-select"
                                onChange={handleChange}
                            >
                                <option value="">Provincia</option>
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
                                placeholder="Caché del grupo"
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
                            <input
                                type="url"
                                name="mediaA"
                                placeholder="Añade enlaces a tus videos"
                                value={mediaA}
                                // onChange={handleMediaChange}
                                className="form-input"
                                onChange={(e) => {
                                    const { name, value } = e.target;

                                    e.target.value.includes('youtube.com/watch')
                                        ? setFormValues({
                                              ...formValues,
                                              [name]: value.replace(
                                                  'watch?v=',
                                                  'embed/'
                                              ),
                                          })
                                        : setFormValues({
                                              ...formValues,
                                              [name]: value,
                                          });
                                }}
                            />
                            <input
                                type="url"
                                name="mediaB"
                                placeholder="Añade enlaces a tus videos"
                                value={mediaB}
                                onChange={handleMediaChange}
                                className="form-input"
                            />
                            <input
                                type="url"
                                name="mediaC"
                                placeholder="Añade enlaces a tus videos"
                                value={mediaC}
                                onChange={handleMediaChange}
                                className="form-input"
                            />
                            <input
                                type="url"
                                name="mediaD"
                                placeholder="Añade enlaces a tus videos"
                                value={mediaD}
                                onChange={handleMediaChange}
                                className="form-input"
                            />
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
                                Fotos del grupo
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
                            value="Crear Grupo"
                            className="btn-account p-3 w-full"
                        />
                    </div>
                    <div>
                        {error && <p>{error}</p>}
                        {resp.status === 'ok' && <p>{resp.message}</p>}
                    </div>
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
