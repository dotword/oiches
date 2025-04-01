import { useState, useEffect } from 'react';
import FetchProvinciasService from '../../services/FetchProvinciasService';
import FetchAgenciaEspecialidadService from '../../services/Agencias/FetchAgenciaEspecialidadService';

const AgenciaFilter = ({ onFilterChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [filters, setFilters] = useState({
        nombre: '',
        provincia: '',
        especialidades: '',
        order: 'DESC',
        field: 'createdAt',
    });

    const [autoSearch, setAutoSearch] = useState(true);

    useEffect(() => {
        const fetchFilters = async () => {
            await FetchProvinciasService(setProvinces);
            await FetchAgenciaEspecialidadService(setEspecialidades);
        };
        fetchFilters();
    }, []);

    useEffect(() => {
        if (autoSearch) {
            onFilterChange(filters);
        }
    }, [filters, onFilterChange, autoSearch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
        setAutoSearch(true);
    };

    return (
        <form className="sala-filter-form mx-auto md:flex md:flex-row md:space-x-4">
            <input
                type="text"
                name="nombre"
                placeholder="Nombre de la agencia"
                value={filters.nombre}
                onChange={handleChange}
                className="form-input placeholder:text-black"
            />

            <select
                name="especialidades"
                value={filters.especialidades}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Especialidad</option>
                {especialidades.map((espc) => (
                    <option key={espc.id} value={espc.id}>
                        {espc.especialidad}
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
                className="form-select max-w-32"
            >
                <option value="">Ordenar</option>
                <option value="ASC">Recientes ⬆</option>
                <option value="DESC">Recientes ⬇</option>
            </select>
        </form>
    );
};

export default AgenciaFilter;
