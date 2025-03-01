import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import FetchNoticeCategoriasService from '../../services/Noticeboard/FetchNoticeCategoriasService.js';
import registerNoticeService from '../../services/Noticeboard/registerNoticeService.js';
import useListSalasGrupoUser from '../../hooks/useListSalasGrupoUser.jsx';

const NoticeCreacion = () => {
    const { userLogged, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const { userId } = useParams();
    const idUserOwner = userId;

    const { entries } = useListSalasGrupoUser({
        token,
        idUserOwner,
    });

    const [formValues, setFormValues] = useState({
        categoria: '',
        provincia: null,
        titulo: '',
        descripcion: '',
    });

    const [provinces, setProvinces] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        FetchProvinciasService(setProvinces);
        FetchNoticeCategoriasService(setCategorias);
    }, []);

    const categoriasPrincipales = categorias.filter(
        (cat) => cat.parent_id === null && cat.role === userLogged.roles
    );
    const subcategorias = categorias.filter(
        (cat) => cat.parent_id === Number(categoriaSeleccionada)
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'categoria') {
            setCategoriaSeleccionada(value); // Guardamos el parent seleccionado
            setFormValues({
                ...formValues,
                categoria: value,
                subcategoria: '',
            }); // Reseteamos subcategoría
        } else {
            setFormValues({
                ...formValues,
                [name]: name === 'provincia' && value === '' ? null : value,
            });
        }
    };

    useEffect(() => {
        if (entries.length > 0 && !formValues.salaGrupo_id) {
            setFormValues((prev) => ({
                ...prev,
                salaGrupo_id: entries[0].id,
            }));
        }
    }, [entries, formValues.salaGrupo_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const category_id = formValues.subcategoria || formValues.categoria;

        if (!category_id) {
            setError('Debes seleccionar una categoría.');
            toast.error('Debes seleccionar una categoría.');
            return;
        }

        const formData = new FormData();
        formData.append('salaGrupo_id', salaGrupo_id);
        formData.append('category_id', category_id);
        if (formValues.provincia) {
            formData.append('provincia', formValues.provincia); // Solo agregar si tiene valor
        }
        formData.append('titulo', formValues.titulo);
        formData.append('descripcion', formValues.descripcion);

        try {
            await registerNoticeService({ token, userId, formData });

            toast.success(
                'Vamos a verificar los datos de tu anuncio y en breve la publicaremos en Oiches.'
            );

            setTimeout(() => {
                navigate(`/users/account/${userId}`);
            }, 3000);
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const {
        salaGrupo_id,
        categoria,
        subcategoria,
        provincia,
        titulo,
        descripcion,
    } = formValues;

    return userLogged ? (
        <>
            <form onSubmit={handleSubmit} className="md:flex md:flex-wrap">
                {entries && entries.length > 0 && (
                    <div className="mb-4">
                        <label htmlFor="project" className="flex flex-wrap">
                            <span className="font-semibold mb-2">
                                {userLogged.roles === 'grupo' &&
                                    'Elige tu proyecto musical:'}
                                {userLogged.roles === 'sala' &&
                                    'Elige tu sala:'}
                            </span>
                            <select
                                id="salaGrupo_id"
                                name="salaGrupo_id"
                                value={formValues.salaGrupo_id || ''}
                                required
                                className="form-select"
                                onChange={handleChange}
                            >
                                <option value="">Selecciona</option>
                                {entries.map((grupo) => (
                                    <option key={grupo.id} value={grupo.id}>
                                        {grupo.nombre}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                )}
                <div className="flex flex-col mb-4 md:w-[calc(70%-0.5rem)]">
                    <label htmlFor="categoria" className="font-semibold">
                        Categoría:*
                    </label>
                    <select
                        id="categoria"
                        name="categoria"
                        required
                        value={categoria}
                        className="form-select"
                        onChange={handleChange}
                    >
                        <option value="">Selecciona</option>
                        {categoriasPrincipales.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {subcategorias.length > 0 && (
                    <div className="flex flex-col mb-4 md:w-[calc(70%-0.5rem)]">
                        <label htmlFor="subcategoria" className="font-semibold">
                            Subcategoría:
                        </label>
                        <select
                            id="subcategoria"
                            name="subcategoria"
                            value={subcategoria}
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option value="">Selecciona</option>
                            {subcategorias.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="flex flex-col mb-4 md:w-[calc(50%-0.5rem)]">
                    <label htmlFor="nombre" className="font-semibold">
                        Título:*
                    </label>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título del anuncio"
                        value={titulo}
                        required
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="flex flex-col mb-4 md:w-[calc(70%-0.5rem)]">
                    <label htmlFor="provincia" className="font-semibold">
                        Provincia:
                    </label>
                    <select
                        id="provincia"
                        name="provincia"
                        value={provincia}
                        className="form-select"
                        onChange={handleChange}
                    >
                        <option value="">Selecciona</option>
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                                {province.provincia}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col mb-4 md:w-full">
                    <label htmlFor="descripcion" className="font-semibold">
                        Descripción:*
                    </label>
                    <textarea
                        name="descripcion"
                        value={descripcion}
                        onChange={handleChange}
                        required
                        className="form-textarea"
                        maxLength="2000"
                    ></textarea>
                    <p className="mt-1 text-gray-500 text-sm">
                        2000 caracteres como máximo
                    </p>
                </div>
                <div className="flex flex-wrap w-full gap-x-2">
                    <input
                        className="accent-purpleOiches"
                        type="checkbox"
                        name="terms"
                        required
                    />
                    Acepto las
                    <a
                        href="/condiciones-noticeboard"
                        target="blank"
                        className="text-yellowOiches"
                    >
                        condiciones de uso
                    </a>
                </div>
                <div className="my-12 max-w-80">
                    <input
                        type="submit"
                        value="Publicar"
                        className="btn-account p-3 w-full"
                    />
                </div>

                <div>{error && <p>{error}</p>}</div>
            </form>

            <div className="m-auto flex flex-col gap-4 shadow-[0_8px_10px_4px_rgba(0,0,0,0.07)] p-4 items-center rounded-2xl md:mr-0 md:mb-0 md:w-full">
                <p className="text-center">
                    ¿Necesitas ayuda con la publicación?
                </p>

                <a
                    href="mailto:hola@oiches.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purpleOiches to-moradoOiches text-white font-bold py-2 px-4 rounded-lg shadow-lg flex max-w-32 justify-center"
                >
                    Escríbenos
                </a>
            </div>

            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default NoticeCreacion;
