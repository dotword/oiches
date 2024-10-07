// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import GrupoFilter from '../components/GrupoFilter';
// import GrupoList from '../components/GrupoList';
// import FetchGruposService from '../services/FetchGruposService';
// import HeaderHero from '../components/HeaderHero.jsx';
// import Footer from '../components/Footer';
// import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
// import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

// const Grupos = () => {
//     const [filteredGrupos, setFilteredGrupos] = useState([]);
//     const [page, setPage] = useState(1); // Estado para la página actual
//     const pageSize = 8; // Tamaño de página
//     const [total, setTotal] = useState(null); // Total de resultados
//     const [filters, setFilters] = useState({}); // Filtros activos
//     const [error, setError] = useState(null);

//     // Fetch de los grupos basado en los filtros y la página actual
//     useEffect(() => {
//         const fetchGrupos = async () => {
//             setError(null);

//             try {
//                 const data = await FetchGruposService(filters, page, pageSize);
//                 setFilteredGrupos(data.rows); // Grupos filtrados
//                 setTotal(data.total); // Total de grupos disponibles
//             } catch (err) {
//                 setError('No se pudo cargar la información de los músicos.');
//             }
//         };

//         fetchGrupos();
//     }, [page, filters, pageSize]);

//     // Actualiza los filtros y resetea la página a la primera cuando los filtros cambian
//     const handleFilterChange = (newFilters) => {
//         if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
//             setFilters(newFilters); // Aplica los nuevos filtros
//             setPage(1); // Reinicia la paginación cuando los filtros cambian
//         }
//     };

//     // Cambiar de página sin afectar los filtros
//     const handlePageChange = (newPage) => {
//         setPage(newPage); // Actualiza la página actual
//     };

//     const totalPages = total ? Math.ceil(total / pageSize) : 0; // Calcula el total de páginas

//     return (
//         <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: '100%' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="container-grupos"
//         >
//             <HeaderHero />
//             <div className="hero bg-hero-grupos bg-cover relative before:content-[''] before:bg-white/[.10] before:absolute before:w-full before:h-full">
//                 <h1 className="hero-title text-white">
//                     Encuentra a los músicos ideales para tu sala
//                 </h1>
//                 <p className="hero-subtitle text-white">
//                     Explora diversos talentos, conecta con ellos y llena tu
//                     espacio con música en vivo.
//                 </p>
//             </div>
//             <div className="grupo-filter-form-container">
//                 <GrupoFilter onFilterChange={handleFilterChange} />
//             </div>
//             <div className="grupo-list-container">
//                 {!error &&
//                     (filteredGrupos.length > 0 ? (
//                         <GrupoList grupos={filteredGrupos} />
//                     ) : (
//                         <p>No se encontraron músicos</p>
//                     ))}
//             </div>

//             {/* Controles de paginación */}
//             {totalPages > 1 && (
//                 <div className="flex gap-3 justify-center my-16">
//                     <button
//                         disabled={page === 1}
//                         onClick={() => handlePageChange(page - 1)} // Cambiar de página sin modificar los filtros
//                     >
//                         <MdKeyboardDoubleArrowLeft className="text-xl" />
//                     </button>
//                     <p>
//                         {page} de {totalPages}
//                     </p>
//                     <button
//                         disabled={page >= totalPages}
//                         onClick={() => handlePageChange(page + 1)} // Cambiar de página sin modificar los filtros
//                     >
//                         <MdKeyboardDoubleArrowRight className="text-xl" />
//                     </button>
//                 </div>
//             )}
//             <Footer />
//         </motion.div>
//     );
// };

// export default Grupos;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GrupoFilter from '../components/GrupoFilter';
import GrupoList from '../components/GrupoList';
import FetchGruposService from '../services/FetchGruposService';
import HeaderHero from '../components/HeaderHero.jsx';
import Footer from '../components/Footer';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import Seo from '../components/SEO/Seo.jsx'; // Importar el componente SEO

const Grupos = () => {
    const [filteredGrupos, setFilteredGrupos] = useState([]);
    const [page, setPage] = useState(1); // Estado para la página actual
    const pageSize = 8; // Tamaño de página
    const [total, setTotal] = useState(null); // Total de resultados
    const [filters, setFilters] = useState({}); // Filtros activos
    const [error, setError] = useState(null);

    // Fetch de los grupos basado en los filtros y la página actual
    useEffect(() => {
        const fetchGrupos = async () => {
            setError(null);

            try {
                const data = await FetchGruposService(filters, page, pageSize);
                setFilteredGrupos(data.rows); // Grupos filtrados
                setTotal(data.total); // Total de grupos disponibles
            } catch (err) {
                setError('No se pudo cargar la información de los músicos.');
            }
        };

        fetchGrupos();
    }, [page, filters, pageSize]);

    // Actualiza los filtros y resetea la página a la primera cuando los filtros cambian
    const handleFilterChange = (newFilters) => {
        if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
            setFilters(newFilters); // Aplica los nuevos filtros
            setPage(1); // Reinicia la paginación cuando los filtros cambian
        }
    };

    // Cambiar de página sin afectar los filtros
    const handlePageChange = (newPage) => {
        setPage(newPage); // Actualiza la página actual
    };

    const totalPages = total ? Math.ceil(total / pageSize) : 0; // Calcula el total de páginas

    return (
        <>
            {/* Componente SEO dinámico */}
            <Seo
                title="Músicos - Oiches"
                description="Encuentra músicos ideales para tu sala y llena tu espacio con la mejor música en vivo. Conéctate con bandas y organiza eventos únicos."
                url="https://oiches.com/grupos"
                keywords="músicos, bandas emergentes, grupos musicales,músicos para eventos, eventos, salas de conciertos"
            />

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
                className="container-grupos"
            >
                <HeaderHero />
                <div className="hero bg-hero-grupos bg-cover relative before:content-[''] before:bg-white/[.10] before:absolute before:w-full before:h-full">
                    <h1 className="hero-title text-white">
                        Encuentra a los músicos ideales para tu sala
                    </h1>
                    <p className="hero-subtitle text-white">
                        Explora diversos talentos, conecta con ellos y llena tu
                        espacio con música en vivo.
                    </p>
                </div>
                <div className="grupo-filter-form-container">
                    <GrupoFilter onFilterChange={handleFilterChange} />
                </div>
                <div className="grupo-list-container">
                    {!error &&
                        (filteredGrupos.length > 0 ? (
                            <GrupoList grupos={filteredGrupos} />
                        ) : (
                            <p>No se encontraron músicos</p>
                        ))}
                </div>

                {/* Controles de paginación */}
                {totalPages > 1 && (
                    <div className="flex gap-3 justify-center my-16">
                        <button
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)} // Cambiar de página sin modificar los filtros
                        >
                            <MdKeyboardDoubleArrowLeft className="text-xl" />
                        </button>
                        <p>
                            {page} de {totalPages}
                        </p>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => handlePageChange(page + 1)} // Cambiar de página sin modificar los filtros
                        >
                            <MdKeyboardDoubleArrowRight className="text-xl" />
                        </button>
                    </div>
                )}
                <Footer />
            </motion.div>
        </>
    );
};

export default Grupos;
