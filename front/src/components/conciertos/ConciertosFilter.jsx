import { useState, useEffect, useRef } from 'react';
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
        clearFilters: '',
    });
    const [autoSearch, setAutoSearch] = useState(true);
    const [isDesdeCalendarOpen, setDesdeCalendarOpen] = useState(false);
    const [isHastaCalendarOpen, setHastaCalendarOpen] = useState(false);

    const desdeCalendarRef = useRef(null);
    const hastaCalendarRef = useRef(null);

    useEffect(() => {
        FetchGenresService(setGenres);
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

        // Cierra los calendarios dependiendo de cuál está activo
        if (type === 'fecha') {
            setDesdeCalendarOpen(false);
        } else if (type === 'fechaHasta') {
            setHastaCalendarOpen(false);
        }
    };

    const handleOutsideClick = (event) => {
        // Cierra "Fecha desde" si el clic está fuera de su calendario
        if (
            desdeCalendarRef.current &&
            !desdeCalendarRef.current.contains(event.target)
        ) {
            setDesdeCalendarOpen(false);
        }

        // Cierra "Fecha hasta" si el clic está fuera de su calendario
        if (
            hastaCalendarRef.current &&
            !hastaCalendarRef.current.contains(event.target)
        ) {
            setHastaCalendarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleClearFilters = () => {
        setFilters({
            provincia: '',
            ciudad: '',
            generos: '',
            fecha: '',
            fechaHasta: '',
            order: '',
            clearFilters: 'true', // Indica que se borraron los filtros
        });
        setAutoSearch(true);
    };

    const today = new Date();

    return (
        <form className="grupo-filter-form mx-auto md:flex md:flex-row md:space-x-4">
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
            <div className="relative" ref={desdeCalendarRef}>
                <button
                    type="button"
                    className="form-select mt-0"
                    onClick={() => setDesdeCalendarOpen((prev) => !prev)}
                >
                    {filters.fecha
                        ? new Date(filters.fecha).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                          })
                        : 'Fecha desde'}
                </button>
                {isDesdeCalendarOpen && (
                    <div className="absolute z-10 mt-2 shadow-lg">
                        <ReactCalendar
                            onChange={(date) => handleDateChange(date, 'fecha')}
                            value={
                                filters.fecha ? new Date(filters.fecha) : null
                            }
                            locale="es-ES"
                            className="calendar-concert"
                            minDate={today}
                        />
                    </div>
                )}
            </div>

            {/* Filtro de Fecha hasta */}
            <div className="relative" ref={hastaCalendarRef}>
                <button
                    type="button"
                    className="form-select mt-0"
                    onClick={() => setHastaCalendarOpen((prev) => !prev)}
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
                {isHastaCalendarOpen && (
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
                            className="calendar-concert"
                            minDate={today}
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
            {/* Botón para limpiar filtros */}
            <button
                type="button"
                className="btn text-white"
                onClick={handleClearFilters}
            >
                Limpiar filtros
            </button>
        </form>
    );
};

export default ConciertosFilter;
