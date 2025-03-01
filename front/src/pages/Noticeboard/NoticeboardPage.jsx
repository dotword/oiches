import { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import Seo from '../../components/SEO/Seo.jsx';
import AuthContext from '../../context/auth/AuthContext.jsx';
import Noticeboard from '../../components/Noticeboard/Noticeboard.jsx';
import { Link } from 'react-router-dom';
import { IoFilter } from 'react-icons/io5';
import FetchNoticesService from '../../services/Noticeboard/FetchNoticesService.js';
import NoticeboardFilter from '../../components/Noticeboard/NoticeboardFilter.jsx';

const NoticeboardPage = () => {
    const { userLogged } = useContext(AuthContext);
    const [page, setPage] = useState(1); // Estado para la página actual
    const [total, setTotal] = useState(null); // Total de elementos
    const pageSize = 25; // Tamaño de cada página
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [filters, setFilters] = useState({}); // Filtros activos
    const [filteredNotices, setFilteredNotices] = useState([]); // Salas filtradas

    useEffect(() => {
        const fetchNotices = async () => {
            const data = await FetchNoticesService(filters, page, pageSize);
            setTotal(data.notices.total);
            setFilteredNotices(data.notices.rows);
        };

        fetchNotices();
    }, [page, filters, pageSize]);

    console.log('filteredNot ', filteredNotices);
    console.log('total ', total);

    const handleFilterChange = async (newFilters) => {
        if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
            setFilters(newFilters);
            setPage(1);
        }
    };

    return (
        <>
            <Seo
                title="Oiches | Tablón de anuncios de Oiches"
                description="Se buscan músicos, grupos, compartir giras, salas buscan músicos"
                keywords="salas de conciertos, música en vivo, reservas de salas, eventos musicales, donde tocar, conciertos en vivo"
                url="https://oiches.com/noticeboard"
                image="https://oiches.com/Oiches-Conectamos-musicos-y-salasRRSS.jpg"
                type="website"
                imageType="image/jpg"
                // structuredData={{
                //     '@context': 'https://schema.org',
                //     '@type': 'ItemList',
                //     itemListElement: filteredSalas.map((sala, index) => ({
                //         '@type': 'ListItem',
                //         position: index + 1,
                //         name: sala.nombre,
                //         url: `https://oiches.com/salas/${sala.id}`,
                //     })),
                // }}
            />
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Se busca..." />
                <main className="w-11/12 mx-auto my-6 pb-14 md:max-w-7xl">
                    {(userLogged && userLogged.roles === 'grupo') ||
                    (userLogged && userLogged.roles === 'sala') ? (
                        <Link
                            to={`/notice-creacion/${userLogged.id}`}
                            className="button-large max-w-48 mb-8"
                        >
                            Publica tu anuncio
                        </Link>
                    ) : (
                        ''
                    )}

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
                                <NoticeboardFilter
                                    onFilterChange={handleFilterChange}
                                />
                            </div>
                        </div>
                    </section>

                    <Noticeboard />
                </main>
                <Footer />
            </motion.div>
        </>
    );
};
export default NoticeboardPage;
