import { useState, useEffect } from 'react';
import FetchProvinciasService from '../../services/FetchProvinciasService';
import FetchGenresService from '../../services/FetchGenresService';
import FetchNoticeCategoriasService from '../../services/Noticeboard/FetchNoticeCategoriasService';

const NoticeboardFilter = ({ onFilterChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [genres, setGenres] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [filters, setFilters] = useState({
        role: '',
        categoria: '',
        subcategoria: '',
        provincia: '',
        generos: '',
        order: '',
    });

    const [autoSearch, setAutoSearch] = useState(true);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                await FetchProvinciasService(setProvinces);
                await FetchGenresService(setGenres);
                await FetchNoticeCategoriasService(setCategorias);
            } catch (error) {
                console.error('Error cargando filtros:', error);
            }
        };
        fetchFilters();
    }, []);

    const categoriasPrincipales = categorias.filter(
        (cat) => cat.parent_id === null && cat.role === filters.role
    );
    const subcategorias = categorias.filter(
        (cat) => cat.parent_id === Number(filters.categoria)
    );

    useEffect(() => {
        if (autoSearch) {
            let filtrosActualizados = { ...filters };

            if (filters.categoria && !filters.subcategoria) {
                // Obtener todas las subcategorías de la categoría seleccionada
                const subcategoriasDeCategoria = categorias
                    .filter(
                        (cat) => cat.parent_id === Number(filters.categoria)
                    )
                    .map((cat) => cat.id);

                if (subcategoriasDeCategoria.length > 0) {
                    filtrosActualizados.categoria = subcategoriasDeCategoria; // Enviamos un array de IDs
                }
            } else if (filters.subcategoria) {
                // Si hay subcategoría seleccionada, usarla como categoría
                filtrosActualizados.categoria = filters.subcategoria;
            }
            onFilterChange(filtrosActualizados);
        }
    }, [filters, autoSearch, onFilterChange, categorias]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters, [name]: value };

            if (name === 'categoria') {
                newFilters.subcategoria = ''; // Resetear subcategoría al cambiar la categoría
            }

            return newFilters;
        });

        setAutoSearch(true);
    };

    const resetFilters = () => {
        setFilters({
            role: '',
            categoria: '',
            subcategoria: '',
            provincia: '',
            generos: '',
            order: '',
        });
        setAutoSearch(true);
    };

    return (
        <form className="sala-filter-form mx-auto md:flex md:flex-row md:space-x-4">
            <div className="min-w-56">
                <select
                    name="role"
                    value={filters.role}
                    className="form-select mt-0"
                    onChange={handleChange}
                >
                    <option value="">Categoría</option>
                    <option value="sala">Sala</option>
                    <option value="grupo">Músico/Grupo</option>
                </select>

                {filters.role && (
                    <select
                        id="categoria"
                        name="categoria"
                        value={filters.categoria}
                        className="form-select"
                        onChange={handleChange}
                    >
                        <option value="">Selecciona una categoría</option>
                        {categoriasPrincipales.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.nombre}
                            </option>
                        ))}
                    </select>
                )}

                {filters.categoria && subcategorias.length > 0 && (
                    <select
                        id="subcategoria"
                        name="subcategoria"
                        value={filters.subcategoria}
                        className="form-select"
                        onChange={handleChange}
                    >
                        <option value="">Selecciona una subcategoría</option>
                        {subcategorias.map((sub) => (
                            <option key={sub.id} value={sub.id}>
                                {sub.nombre}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <select
                name="generos"
                value={filters.generos}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Géneros</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.nombre}
                    </option>
                ))}
            </select>

            <select
                name="provincia"
                value={filters.provincia}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Provincia</option>
                {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                        {province.provincia}
                    </option>
                ))}
            </select>

            <select
                name="order"
                value={filters.order}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Ordenar</option>
                <option value="ASC">Fecha ⬆</option>
                <option value="DESC">Fecha ⬇</option>
            </select>
            <button
                type="button"
                onClick={resetFilters}
                className="py-2 text-white font-semibold"
            >
                Limpiar filtros
            </button>
        </form>
    );
};

export default NoticeboardFilter;
