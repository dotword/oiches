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
//     const [page, setPage] = useState(1);
//     const pageSize = 8;
//     const [total, setTotal] = useState(null);
//     const [filters, setFilters] = useState({});
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchGrupos = async () => {
//             setError(null);

//             try {
//                 const data = await FetchGruposService(filters, page, pageSize);

//                 setFilteredGrupos(data.rows);
//                 setTotal(data.total);
//             } catch (err) {
//                 setError('No se pudo cargar la información de los grupos.');
//             }
//         };

//         fetchGrupos();
//     }, [page, filters, pageSize]);

//     const handleFilterChange = async (newFilters) => {
//         setFilters(newFilters);
//         setPage(1); // Reinicia la paginación cuando cambian los filtros
//     };

//     const totalPages = total ? Math.ceil(total / pageSize) : 0;

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
//                     Encuentra tu Grupo Ideal
//                 </h1>
//                 <p className="hero-subtitle text-white">
//                     Explora diversos grupos, conecta con ellos y crea música
//                     juntos.
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
//                         <p>No se encontraron grupos</p>
//                     ))}
//             </div>
//             {totalPages > 1 && (
//                 <div className="flex gap-3 justify-center my-16">
//                     <button
//                         disabled={page === 1}
//                         onClick={() => setPage(page - 1)}
//                     >
//                         <MdKeyboardDoubleArrowLeft className="text-xl" />
//                     </button>
//                     <p>
//                         {page} de {totalPages}
//                     </p>
//                     <button
//                         disabled={page >= totalPages}
//                         onClick={() => setPage(page + 1)}
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
                setError('No se pudo cargar la información de los grupos.');
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
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
            className="container-grupos"
        >
            <HeaderHero />
            <div className="hero bg-hero-grupos bg-cover relative before:content-[''] before:bg-white/[.10] before:absolute before:w-full before:h-full">
                <h1 className="hero-title text-white">
                    Encuentra tu Grupo Ideal
                </h1>
                <p className="hero-subtitle text-white">
                    Explora diversos grupos, conecta con ellos y crea música
                    juntos.
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
                        <p>No se encontraron grupos</p>
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
    );
};

export default Grupos;
