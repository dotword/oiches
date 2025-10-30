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
        if (type === 'fecha') {
            setDesdeCalendarOpen(false);
        } else if (type === 'fechaHasta') {
            setHastaCalendarOpen(false);
        }
    };

    const handleOutsideClick = (event) => {
        if (
            desdeCalendarRef.current &&
            !desdeCalendarRef.current.contains(event.target)
        ) {
            setDesdeCalendarOpen(false);
        }
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
            clearFilters: 'true',
        });
        setAutoSearch(true);
    };

    const today = new Date();

    return (
        <div className="flex flex-col items-center justify-between w-11/12">
            <form className="w-full mx-auto flex flex-wrap items-center justify-center gap-6 bg-footercolor p-4 rounded-lg shadow-md">
                {/* Select de Provincia */}
                <select
                    name="provincia"
                    value={filters.provincia}
                    onChange={handleChange}
                    className="form-field-filter"
                >
                    <option value="">Provincia</option>
                    {allProvincias.map((provincia, index) => (
                        <option key={index} value={provincia}>
                            {provincia}
                        </option>
                    ))}
                </select>

                {/* Select de Ciudad */}
                <select
                    name="ciudad"
                    value={filters.ciudad}
                    onChange={handleChange}
                    className="form-field-filter"
                >
                    <option value="">Ciudad</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>

                {/* Filtro de Fecha desde */}
                <div
                    className="relative w-full md:w-auto"
                    ref={desdeCalendarRef}
                >
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purpleOiches bg-white w-full text-left"
                        onClick={() => setDesdeCalendarOpen((prev) => !prev)}
                    >
                        {filters.fecha
                            ? new Date(filters.fecha).toLocaleDateString(
                                  'es-ES',
                                  {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                  }
                              )
                            : 'Fecha desde'}
                    </button>
                    {isDesdeCalendarOpen && (
                        <div className="absolute right-0 left-0 z-20 mt-2 bg-white shadow-lg rounded-lg p-2 md:min-w-[280px] md:left-auto md:-right-3/4">
                            <ReactCalendar
                                onChange={(date) =>
                                    handleDateChange(date, 'fecha')
                                }
                                value={
                                    filters.fecha
                                        ? new Date(filters.fecha)
                                        : null
                                }
                                locale="es-ES"
                                className="calendar-concert"
                                minDate={today}
                            />
                        </div>
                    )}
                </div>

                {/* Filtro de Fecha hasta */}
                <div
                    className="relative w-full md:w-auto"
                    ref={hastaCalendarRef}
                >
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purpleOiches bg-white w-full text-left"
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
                        <div className="absolute right-0 left-0 z-20 mt-2 bg-white shadow-lg rounded-lg p-2 md:min-w-[280px] md:left-auto md:-right-3/4">
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

                {/* Select de Género */}
                <select
                    name="generos"
                    value={filters.generos}
                    onChange={handleChange}
                    className="form-field-filter"
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
                    className="py-2 text-white font-semibold"
                    onClick={handleClearFilters}
                >
                    Limpiar filtros
                </button>
            </form>
        </div>
    );
};

export default ConciertosFilter;
