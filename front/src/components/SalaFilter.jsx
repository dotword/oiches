import { useState, useEffect } from 'react';
import FetchProvinciasService from '../services/FetchProvinciasService';
import FetchGenresService from '../services/FetchGenresService';

const SalaFilter = ({ onFilterChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filters, setFilters] = useState({
        nombre: '',
        provincia: '',
        genero: '',
    });

    useEffect(() => {
        const fetchFilters = async () => {
            await FetchProvinciasService(setProvinces);
            await FetchGenresService(setGenres);
        };
        fetchFilters();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="sala-filter-form w-4/5 mx-auto md:flex md:flex-row md:space-x-4"
        >
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={filters.nombre}
                onChange={handleChange}
                className="form-input placeholder:text-black"
            />
            <select
                name="genero"
                value={filters.genero}
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
                    <option key={province.id} value={province.id}>
                        {province.provincia}
                    </option>
                ))}
            </select>
            <button type="submit" className="btn-buscar">
                Buscar
            </button>
        </form>
    );
};

export default SalaFilter;
