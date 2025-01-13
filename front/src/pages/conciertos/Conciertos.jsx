import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ConciertosFilter from '../../components/conciertos/ConciertosFilter.jsx';
import ConciertosList from '../../components/conciertos/ConciertosList.jsx';
import FetchConciertosService from '../../services/conciertos/FetchConciertosService.js';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import Seo from '../../components/SEO/Seo.jsx';
import { IoFilter } from 'react-icons/io5';
import Paginator from '../../components/Paginator.jsx';

const Conciertos = () => {
    const [filteredConciertos, setFilteredConciertos] = useState([]);
    const [allProvincias, setAllProvincias] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 12;
    const [total, setTotal] = useState(null);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [filters, setFilters] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConciertos = async () => {
            setError(null);

            try {
                const data = await FetchConciertosService(
                    filters,
                    page,
                    pageSize
                );
                const conciertosFiltrados = data.rows.filter((concierto) => {
                    // Filtrar por fecha desde (fecha)
                    const isFechaValida = filters.fecha
                        ? new Date(concierto.fecha) >= new Date(filters.fecha)
                        : true;

                    // Filtrar por fecha hasta (fechaHasta)
                    const isFechaHastaValida = filters.fechaHasta
                        ? new Date(concierto.fecha) <=
                          new Date(filters.fechaHasta)
                        : true;

                    return isFechaValida && isFechaHastaValida;
                });

                setFilteredConciertos(conciertosFiltrados);
                setTotal(data.total);

                if (data.rows && allProvincias.length === 0) {
                    const uniqueProvincias = [
                        ...new Set(
                            data.rows.map((concierto) => concierto.provincia)
                        ),
                    ];
                    setAllProvincias(uniqueProvincias);
                }

                if (data.rows && allCities.length === 0) {
                    const uniqueCities = [
                        ...new Set(
                            data.rows.map((concierto) => concierto.ciudad)
                        ),
                    ];
                    setAllCities(uniqueCities); // Guardamos las ciudades únicas
                }
            } catch (err) {
                setError('No se pudo cargar la información de los conciertos.');
            }
        };

        fetchConciertos();
    }, [page, filters, pageSize, allCities.length, allProvincias.length]);

    // Actualiza los filtros y resetea la página a la primera cuando los filtros cambian
    const handleFilterChange = (newFilters) => {
        if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
            setFilters(newFilters); // Aplica los nuevos filtros
            setPage(1); // Reinicia la paginación cuando los filtros cambian
        }
    };

    return (
        <>
            <Seo
                title="Conciertos - Oiches"
                description="Los conciertos de Oiches que no te puedes perder. Encuentra conciertos en tu ciudad, salas y grupos"
                url="https://oiches.com/conciertos"
                keywords="conciertos, músicos, bandas emergentes, grupos musicales, músicos para eventos, eventos, salas de conciertos"
                image="https://oiches.com/Oiches-Conectamos-musicos-y-salas.jpg"
                type="website"
            />

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Próximos conciertos" />

                <section>
                    <div
                        className="flex justify-center p-2 gap-4 bg-footercolor text-white md:hidden"
                        onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                        FILTRAR
                        <IoFilter className="text-2xl cursor-pointer" />
                    </div>
                    <div
                        className={`bg-footercolor flex-col items-center justify-evenly ${
                            isNavOpen ? 'flex' : 'hidden md:flex'
                        }`}
                    >
                        <div className="flex flex-col items-center justify-between w-4/5">
                            <ConciertosFilter
                                onFilterChange={handleFilterChange}
                                cities={allCities}
                                allProvincias={allProvincias}
                            />
                        </div>
                    </div>
                </section>

                <main className="w-11/12 mx-auto mt-6 mb-20 md:max-w-7xl md:mb-28">
                    <section className="grupo-list-container">
                        {!error &&
                            (filteredConciertos.length > 0 ? (
                                <ConciertosList
                                    conciertos={filteredConciertos}
                                />
                            ) : (
                                <p className="text-center">
                                    No se encontraron conciertos
                                </p>
                            ))}

                        <Paginator
                            setPage={setPage}
                            page={page}
                            total={total}
                            pageSize={pageSize}
                        />
                    </section>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};

export default Conciertos;
