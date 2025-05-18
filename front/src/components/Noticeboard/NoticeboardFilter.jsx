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

    // Nuevo estado para saber si hay filtros “aplicados”
    const [isFiltered, setIsFiltered] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Si ya había un filtro aplicado y el usuario cambia algo, resetear resultados
        if (isFiltered) {
            onFilterChange({}); // pide todos los resultados
            setIsFiltered(false); // volvemos a “sin filtrar”
        }

        setFilters((prev) => {
            const next = { ...prev, [name]: value };
            if (name === 'categoria') next.subcategoria = ''; // reset subcategoria
            return next;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let filtrosActualizados = { ...filters };

        // Lógica de categorías / subcategorías
        if (filters.categoria && !filters.subcategoria) {
            const subIds = categorias
                .filter((cat) => cat.parent_id === Number(filters.categoria))
                .map((cat) => cat.id);
            if (subIds.length) filtrosActualizados.categoria = subIds;
        } else if (filters.subcategoria) {
            filtrosActualizados.categoria = filters.subcategoria;
        }

        onFilterChange(filtrosActualizados);
        setIsFiltered(true); // marcamos que ahora hay un filtro activo
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
        onFilterChange({});
        setIsFiltered(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between p-4 mx-auto w-80 md:gap-1"
        >
            <div className="w-full">
                <select
                    name="role"
                    value={filters.role}
                    className="form-select mt-0 md:bg-footercolor md:text-white"
                    onChange={handleChange}
                >
                    <option value="">Categoría</option>
                    <option value="sala">Sala busca...</option>
                    <option value="grupo">Músico/Grupo busca...</option>
                </select>

                {filters.role && (
                    <select
                        name="categoria"
                        value={filters.categoria}
                        className="form-select md:bg-footercolor md:text-white"
                        onChange={handleChange}
                    >
                        <option value="">Selecciona una categoría</option>
                        {categoriasPrincipales.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                )}

                {filters.categoria && subcategorias.length > 0 && (
                    <select
                        name="subcategoria"
                        value={filters.subcategoria}
                        className="form-select md:bg-footercolor md:text-white"
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
                className="form-select md:bg-footercolor md:text-white"
            >
                <option value="">Géneros</option>
                {genres.map((g) => (
                    <option key={g.id} value={g.id}>
                        {g.nombre}
                    </option>
                ))}
            </select>

            <select
                name="provincia"
                value={filters.provincia}
                onChange={handleChange}
                className="form-select md:bg-footercolor md:text-white"
            >
                <option value="">Provincia</option>
                {provinces.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.provincia}
                    </option>
                ))}
            </select>

            <select
                name="order"
                value={filters.order}
                onChange={handleChange}
                className="form-select md:bg-footercolor md:text-white"
            >
                <option value="">Ordenar</option>
                <option value="ASC">Fecha ⬆</option>
                <option value="DESC">Fecha ⬇</option>
            </select>

            <div className="flex gap-2 mt-4">
                <button type="submit" className="py-2 px-4 button">
                    Buscar
                </button>
                <button
                    type="button"
                    onClick={resetFilters}
                    className="py-2 px-4 bg-gray-300 text-black rounded"
                >
                    Limpiar filtros
                </button>
            </div>
        </form>
    );
};

export default NoticeboardFilter;
