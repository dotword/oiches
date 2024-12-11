import { useState, useEffect } from 'react';
import FetchProvinciasService from '../../services/FetchProvinciasService';
import FetchGenresService from '../../services/FetchGenresService';

const GrupoFilter = ({ onFilterChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filters, setFilters] = useState({
        nombre: '',
        provincia: '',
        generos: '',
        order: '',
    });
    const [autoSearch, setAutoSearch] = useState(true); // Control para búsqueda automática

    // Cargar los datos iniciales de provincias y géneros
    useEffect(() => {
        const fetchFilters = async () => {
            await FetchProvinciasService(setProvinces);
            await FetchGenresService(setGenres);
        };
        fetchFilters();
    }, []);

    // Detectar los cambios en los filtros y aplicar el filtrado automáticamente si está habilitado
    useEffect(() => {
        if (autoSearch) {
            onFilterChange(filters);
        }
    }, [filters, onFilterChange, autoSearch]);

    // Actualizar el estado de los filtros cuando el usuario cambia un valor
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
        setAutoSearch(true); // Activa búsqueda automática cuando se cambian los filtros
    };

    return (
        <form className="grupo-filter-form mx-auto md:flex md:w-4/5 md:flex-row md:space-x-4">
            <input
                type="text"
                name="nombre"
                placeholder="Nombre del artista"
                value={filters.nombre}
                onChange={handleChange}
                className="form-input placeholder:text-black"
            />
            <select
                name="generos"
                value={filters.generos}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Género</option>
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
                    <option key={province.id} value={province.nombre}>
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
                <option value="ASC">Puntuación ⬆</option>
                <option value="DESC">Puntuación ⬇</option>
            </select>
        </form>
    );
};

export default GrupoFilter;
