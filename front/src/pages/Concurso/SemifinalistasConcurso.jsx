import { motion } from 'framer-motion';
import HeaderHero from '../../components/HeaderHero.jsx';
import Footer from '../../components/Footer.jsx';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SemifinalistasConcurso = () => {
    const { VITE_API_URL_BASE } = import.meta.env;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <HeaderHero />

                <main className="w-full">
                    <section className="bg-footercolor px-4 py-8 font-bold text-center text-white">
                        <h1 className="text-5xl">Finalistas</h1>
                        <p className="text-2xl">Concurso Oiches 2025</p>
                    </section>
                    <section className="flex flex-col">
                        <div className="overflow-hidden sm:grid sm:grid-cols-2 lg:grid-cols-3">
                            {/* ANDREI */}
                            <div className="concurso_semifinal-card">
                                <img
                                    src={`${VITE_API_URL_BASE}/uploads/703fa696-a3b0-474c-a105-fcaee5ffaedd.png`}
                                    alt="Andrei La Ley"
                                    className="concurso_semifinal-image"
                                />
                                <h2 className="concurso_semifinal-title">
                                    Andrei La Ley
                                </h2>
                                <p className="text-gray-200">
                                    Rap, Hip-Hop, Músicas urbanas
                                </p>
                                <p className="text-gray-200">Valencia</p>
                                <div className="self-end">
                                    <Link
                                        to="/grupo/edc649e0-fbb8-45d3-ab9e-0a747459a966"
                                        className="concurso_semifinal-link"
                                    >
                                        + info
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>

                            {/* JAZZI */}
                            <div className="concurso_semifinal-card">
                                <img
                                    src={`${VITE_API_URL_BASE}/uploads/4f2a886a-ba8f-440b-9961-80eccf19c81f.jpg`}
                                    alt="Jazzi"
                                    className="concurso_semifinal-image"
                                />
                                <h2 className="concurso_semifinal-title">
                                    Jazzi
                                </h2>
                                <p className="text-gray-200">
                                    Electrónica, Ópera, Músicas urbanas
                                </p>
                                <p className="text-gray-200">Madrid</p>
                                <div className="self-end">
                                    <Link
                                        to="/grupo/3ebb43e0-7dbb-47a7-bf77-161b83e8bad4"
                                        className="concurso_semifinal-link"
                                    >
                                        + info
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>

                            {/* Distance Sisters */}
                            <div className="concurso_semifinal-card">
                                <img
                                    src={`${VITE_API_URL_BASE}/uploads/aeda57d2-59bd-4ae7-99df-5398f8fe6e95.jpg`}
                                    alt="Distance Sisters
"
                                    className="concurso_semifinal-image"
                                />
                                <h2 className="concurso_semifinal-title">
                                    Distance Sisters
                                </h2>
                                <p className="text-gray-200">Rock, Blues</p>
                                <p className="text-gray-200">Ourense</p>
                                <div className="self-end">
                                    <Link
                                        to="/grupo/951c5f2b-1dc0-42ac-9a5d-993995f8cde6"
                                        className="concurso_semifinal-link"
                                    >
                                        + info
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>

                            {/* Peet Fighting Murphy */}
                            <div className="concurso_semifinal-card">
                                <img
                                    src={`${VITE_API_URL_BASE}/uploads/babf1e9a-8b8b-4d1f-88a8-81ce3e36b6aa.jpg`}
                                    alt="Peet Fighting Murphy
"
                                    className="concurso_semifinal-image"
                                />
                                <h2 className="concurso_semifinal-title">
                                    Peet Fighting Murphy
                                </h2>
                                <p className="text-gray-200">Metal, Rock</p>
                                <p className="text-gray-200">Alicante</p>
                                <div className="self-end">
                                    <Link
                                        to="/grupo/7171aeca-fead-47d0-b191-8884b5c21f02"
                                        className="concurso_semifinal-link"
                                    >
                                        + info
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>

                            {/* Betania */}
                            <div className="concurso_semifinal-card">
                                <img
                                    src={`${VITE_API_URL_BASE}/uploads/aa4320e5-01f4-4012-ba57-5b19037fd573.jpeg`}
                                    alt="Betania"
                                    className="concurso_semifinal-image"
                                />
                                <h2 className="concurso_semifinal-title">
                                    Betania
                                </h2>
                                <p className="text-gray-200">Heavy, Metal</p>
                                <p className="text-gray-200">Valencia</p>
                                <div className="self-end">
                                    <Link
                                        to="/grupo/87f49a01-3757-4a97-be7b-1d5c8c3c13c1"
                                        className="concurso_semifinal-link"
                                    >
                                        + info
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>

                            {/* Linda Burnetti */}
                            <div className="concurso_semifinal-card">
                                <img
                                    src={`${VITE_API_URL_BASE}/uploads/485f14ba-f21b-4d51-ac1e-eb5a1a969ec9.jpg`}
                                    alt="Linda Burnetti
"
                                    className="concurso_semifinal-image"
                                />
                                <h2 className="concurso_semifinal-title">
                                    Linda Burnetti
                                </h2>
                                <p className="text-gray-200">Blues, Rock</p>
                                <p className="text-gray-200">Valladolid</p>
                                <div className="self-end">
                                    <Link
                                        to="/grupo/21c23a16-4af9-4abf-85ec-09cc39aa9e13"
                                        className="concurso_semifinal-link"
                                    >
                                        + info
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};

export default SemifinalistasConcurso;
