import { useState, useEffect } from 'react';
import FetchProvinciasService from '../../services/FetchProvinciasService';
import FetchGenresService from '../../services/FetchGenresService';
import FetchNoticeCategoriasService from '../../services/Noticeboard/FetchNoticeCategoriasService';

const NoticeboardFilter = ({ onFilterChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [genres, setGenres] = useState([]);
    const [role, setRole] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [filters, setFilters] = useState({
        role: '',
        categoria: '',
        provincia: '',
        generos: '',
        order: '',
    });

    const [autoSearch, setAutoSearch] = useState(true);

    useEffect(() => {
        const fetchFilters = async () => {
            await FetchProvinciasService(setProvinces);
            await FetchGenresService(setGenres);
            await FetchNoticeCategoriasService(setCategoria);
        };
        fetchFilters();
    }, []);

    console.log('categoria ', categoria);

    console.log('role ', role);

    useEffect(() => {
        if (autoSearch) {
            console.log('Filtros enviados:', filters);
            onFilterChange(filters);
        }
    }, [filters, onFilterChange, autoSearch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Cambiando filtro: ${name} -> ${value}`); // Depuración

        setFilters({
            ...filters,
            [name]: value,
        });
        setAutoSearch(true);
    };

    return (
        <form className="sala-filter-form w-4/5 mx-auto md:flex md:flex-row md:space-x-4">
            <select
                name="role"
                value={filters.role}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Tipo</option>
                {categoria.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.role}
                    </option>
                ))}
            </select>
            <select
                name="categoria"
                value={filters.categoria}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Categoría</option>
                {categoria.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                    </option>
                ))}
            </select>
            <select
                name="generos"
                value={filters.generos}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Géneros</option> {/* Cambio aquí */}
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
        </form>
    );
};

export default NoticeboardFilter;
