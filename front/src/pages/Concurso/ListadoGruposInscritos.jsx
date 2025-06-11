import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InscriptionGrupoCard from '../../components/Concurso/InscriptionGrupoCard.jsx';
import FetchListInscripcionesService from '../../services/Concurso/FetchListInscripcionesService.js';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import Paginator from '../../components/Paginator.jsx';
import { toast } from 'react-toastify';
import Toastify from '../../components/Toastify.jsx';
// import { ImBullhorn } from 'react-icons/im';
import { IoIosSearch } from 'react-icons/io';
// import ValidateEmailWithCodeForm from '../../components/Concurso/ValidateEmailWithCodeForm.jsx';
import Seo from '../../components/SEO/Seo.jsx';

const ListadoGruposInscritos = () => {
    const [filteredGrupos, setFilteredGrupos] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 12; // Tamaño de página
    const [total, setTotal] = useState(null);
    const [filters, setFilters] = useState({
        name: '',
    });
    const [autoSearch, setAutoSearch] = useState(true); // Control para búsqueda automática

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const data = await FetchListInscripcionesService(
                    filters,
                    page,
                    pageSize
                );

                setFilteredGrupos(data.inscripciones.result);
                setTotal(data.inscripciones.total);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchAllUsers();
    }, [page, filters, pageSize]);

    useEffect(() => {
        if (autoSearch) {
            setPage(1); // Reinicia la paginación cuando cambian los filtros.
        }
    }, [filters, autoSearch]);

    // Actualizar el estado de los filtros cuando el usuario cambia un valor
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
        setAutoSearch(true); // Activa búsqueda automática cuando se cambian los filtros
    };

    return (
        <>
            <Seo
                title="Músicos - Concurso Oiches 2025"
                description="Músicos inscritos en el Concurso Oiches 2025. Vota a tus proyectos musicales favoritos"
                url="https://oiches.com/votacion-concurso-Oiches"
                keywords="músicos, concurso de bandas, bandas emergentes, grupos musicales, concierto"
                image="https://oiches.com/Oiches-Conectamos-musicos-y-salas.jpg"
                imageAlt="Oiches - Conectamos músicos y salas"
            />
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Proyectos inscritos - Concurso Oiches 2025" />

                <main className="w-11/12 mx-auto mt-6 mb-20 md:max-w-7xl md:mb-28">
                    {/* <section className="bg-yellowOiches rounded-3xl px-6 py-3 max-w-2xl mx-auto mb-8 flex flex-wrap items-center gap-3 font-semibold justify-center sm:gap-8">
                        <ImBullhorn
                            style={{ transform: 'rotateY(180deg)' }}
                            className="text-3xl"
                        />
                        <div className="flex flex-col justify-center text-center">
                            <p className="mb-1">
                                Las votaciones están abiertas hasta el
                                06/07/2025
                            </p>
                            <p className="mb-1 text-sm">
                                Los votos pueden ser descontados si incumplen
                                las bases del concurso.
                            </p>
                        </div>
                    </section>
                    <section className="mb-8">
                        <ul className="flex flex-col mb-4 max-w-3xl mx-auto">
                            <li>
                                1. Ingresa tu email y tu usuario de Instagram o
                                Facebook. Recibirás un correo para verificar tu
                                email.
                            </li>
                            <li>
                                2. Confirma tu cuenta de red social:
                                <ol className="ml-4">
                                    <li>
                                        • Si usaste Instagram: Síguenos en{' '}
                                        <a
                                            href="https://www.instagram.com/oiches_musica/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-purpleOiches"
                                        >
                                            @oiches_musica
                                        </a>{' '}
                                        <b>o</b> envíanos un mensaje con el
                                        texto “Concurso Oiches”.
                                    </li>
                                    <li className="mb-0">
                                        • Si usaste Facebook: Síguenos en{' '}
                                        <a
                                            href="https://www.facebook.com/oiches"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-purpleOiches"
                                        >
                                            @oiches
                                        </a>{' '}
                                        <b>o</b> envíanos un mensaje con el
                                        texto “Concurso Oiches”.
                                    </li>
                                </ol>
                            </li>
                            <li>
                                3. Ya puedes votar a tus 6 artistas/grupos
                                favoritos.
                            </li>
                        </ul>

                        <ValidateEmailWithCodeForm />
                    </section> */}
                    <section>
                        <form className="flex justify-end relative">
                            <input
                                type="text"
                                name="name"
                                placeholder="Buscar por nombre de grupo/artista"
                                value={filters.name}
                                onChange={handleChange}
                                className="w-full max-w-80 p-2 border-b-2 border-gray-500 focus:outline-none focus:border-yellowOiches transition duration-200 ease-in-out"
                            />
                            <IoIosSearch className="absolute text-xl bottom-3 right-2" />
                        </form>
                    </section>
                    <section className="grupo-list-container w-full">
                        {filteredGrupos.length > 0 ? (
                            <InscriptionGrupoCard grupos={filteredGrupos} />
                        ) : (
                            <p className="text-center">
                                No se encontraron músicos
                            </p>
                        )}

                        <Paginator
                            setPage={setPage}
                            page={page}
                            total={total}
                            pageSize={pageSize}
                        />
                    </section>
                    <Toastify />
                </main>
                <Footer />
            </motion.div>
        </>
    );
};

export default ListadoGruposInscritos;
