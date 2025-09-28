import { useState, useEffect } from 'react';
import FetchProvinciasService from '../../services/FetchProvinciasService';
import FetchAdvertCategoriesService from '../../services/Advertisers/FetchAdvertCategoriesService';

const AdvertsFilter = ({ onFilterChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        title: '',
        provincia: '',
        city: '',
        category: '',
        order: 'ASC',
        field: 'createdAt',
    });

    const [autoSearch, setAutoSearch] = useState(true);

    useEffect(() => {
        const fetchFilters = async () => {
            await FetchProvinciasService(setProvinces);
            await FetchAdvertCategoriesService(setCategories);
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
                name="title"
                placeholder="Nombre"
                value={filters.title}
                onChange={handleChange}
                className="form-input placeholder:text-black"
            />

            <select
                name="category"
                value={filters.category}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Categorías</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
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

            <input
                type="text"
                name="city"
                placeholder="Ciudad"
                value={filters.city}
                onChange={handleChange}
                className="form-input placeholder:text-black"
            />
            <select
                name="order"
                value={filters.order}
                onChange={handleChange}
                className="form-select max-w-32"
            >
                <option value="">Ordenar</option>
                <option value="ASC">A &gt; Z</option>
                <option value="DESC">Z &gt; A</option>
            </select>
        </form>
    );
};

export default AdvertsFilter;
