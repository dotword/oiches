import { useState, useEffect } from 'react';
import FetchGenresService from '../../services/FetchGenresService';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ConciertosFilter = ({ onFilterChange, cities, allProvincias }) => {
    const [genres, setGenres] = useState([]);
    const [filters, setFilters] = useState({
        provincia: '',
        ciudad: '',
        generos: '',
        fecha: '',
        fechaHasta: '',
        order: '',
    });
    const [autoSearch, setAutoSearch] = useState(true);
    const [isFechaDesdeOpen, setIsFechaDesdeOpen] = useState(false);
    const [isFechaHastaOpen, setIsFechaHastaOpen] = useState(false);

    useEffect(() => {
        const fetchFilters = async () => {
            await FetchGenresService(setGenres);
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

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const handleDateChange = (date, type) => {
        const formattedDate = formatFecha(date);

        setFilters((prev) => ({
            ...prev,
            [type]: formattedDate,
        }));

        setAutoSearch(true);

        // Cerramos el calendario correspondiente después de seleccionar la fecha
        if (type === 'fecha') {
            setIsFechaDesdeOpen(false);
        } else if (type === 'fechaHasta') {
            setIsFechaHastaOpen(false);
        }
    };

    const toggleCalendar = (type) => {
        if (type === 'desde') {
            setIsFechaDesdeOpen(!isFechaDesdeOpen);
        } else if (type === 'hasta') {
            setIsFechaHastaOpen(!isFechaHastaOpen);
        }
    };

    return (
        <form className="grupo-filter-form mx-auto md:flex md:w-4/5 md:flex-row md:space-x-4">
            <select
                name="provincia"
                value={filters.provincia}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Provincia</option>
                {allProvincias.map((provincia, index) => (
                    <option key={index} value={provincia}>
                        {provincia}
                    </option>
                ))}
            </select>

            <select
                name="ciudad"
                value={filters.ciudad}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Ciudad</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                ))}
            </select>

            {/* Filtro de Fecha desde */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => toggleCalendar('desde')}
                    className="form-select mt-0"
                >
                    {filters.fecha
                        ? new Date(filters.fecha).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                          })
                        : 'Fecha desde'}
                </button>
                {isFechaDesdeOpen && (
                    <div className="absolute z-10 mt-2 shadow-lg">
                        <ReactCalendar
                            onChange={(date) => handleDateChange(date, 'fecha')}
                            value={
                                filters.fecha ? new Date(filters.fecha) : null
                            }
                            locale="es-ES"
                            className="rounded-md"
                        />
                    </div>
                )}
            </div>

            {/* Filtro de Fecha hasta */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => toggleCalendar('hasta')}
                    className="form-select mt-0"
                >
                    {filters.fechaHasta
                        ? new Date(filters.fechaHasta).toLocaleDateString(
                              'es-ES',
                              {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                              }
                          )
                        : 'Fecha hasta'}
                </button>
                {isFechaHastaOpen && (
                    <div className="absolute z-10 mt-2 shadow-lg">
                        <ReactCalendar
                            onChange={(date) =>
                                handleDateChange(date, 'fechaHasta')
                            }
                            value={
                                filters.fechaHasta
                                    ? new Date(filters.fechaHasta)
                                    : null
                            }
                            locale="es-ES"
                            className="rounded-md"
                        />
                    </div>
                )}
            </div>

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

export default ConciertosFilter;
