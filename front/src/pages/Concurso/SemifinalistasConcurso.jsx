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
                        <h1 className="text-4xl">Semifinalistas</h1>
                        <p className="text-2xl">Concurso Oiches 2025</p>
                    </section>
                    <section className="flex flex-col">
                        <div className="overflow-hidden sm:grid sm:grid-cols-2 lg:grid-cols-3">
                            <div className="concurso_semifinal-card">
                                <img
                                    src={`${VITE_API_URL_BASE}/uploads/8e4b34e0-4b35-4656-8268-7d477c9306b2.jpg`}
                                    alt="Hermana Furia"
                                    className="concurso_semifinal-image"
                                />
                                <h2 className="concurso_semifinal-title">
                                    Quincalla
                                </h2>
                                <p className="text-gray-200">Rock</p>
                                <p className="text-gray-200">Madrid</p>
                                <div className="self-end">
                                    <Link
                                        to="/grupo/accad9fe-b4c0-4f74-a92c-8efdd351df41"
                                        className="concurso_semifinal-link"
                                    >
                                        + info
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>

                            <div className="concurso_semifinal-card">
                                <img
                                    src={`${VITE_API_URL_BASE}/uploads/a2681e40-6e12-499e-b1c0-ffa8dd4b9ea8.jpg`}
                                    alt="Hermana Furia"
                                    className="concurso_semifinal-image"
                                />
                                <h2 className="concurso_semifinal-title">
                                    Hermana Furia
                                </h2>
                                <p className="text-gray-200">Pop, Rock</p>
                                <p className="text-gray-200">Madrid</p>
                                <div className="self-end">
                                    <Link
                                        to="/grupo/accad9fe-b4c0-4f74-a92c-8efdd351df41"
                                        className="concurso_semifinal-link"
                                    >
                                        + info
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>

                            <div className="concurso_semifinal-card">
                                <img
                                    src={`${VITE_API_URL_BASE}/uploads/d5eb1272-1d96-4beb-856b-a2e09cd6ae99.jpg`}
                                    alt="Gael de Papel"
                                    className="concurso_semifinal-image"
                                />
                                <h2 className="concurso_semifinal-title">
                                    Gael de Papel
                                </h2>
                                <p className="text-gray-200">
                                    Canción de autor, Fado, Folk...
                                </p>
                                <p className="text-gray-200">A Coruña</p>
                                <div className="self-end">
                                    <Link
                                        to="/grupo/accad9fe-b4c0-4f74-a92c-8efdd351df41"
                                        className="concurso_semifinal-link"
                                    >
                                        + info
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>

                            <div className="concurso_semifinal-card">
                                <img
                                    src={`${VITE_API_URL_BASE}/uploads/1b6ab196-30ce-4b8b-870f-f9f3cb3ca8ae.webp`}
                                    alt="Mardom"
                                    className="concurso_semifinal-image"
                                />
                                <h2 className="concurso_semifinal-title">
                                    Mardom
                                </h2>
                                <p className="text-gray-200">Soul, Pop</p>
                                <p className="text-gray-200">Madrid</p>
                                <div className="self-end">
                                    <Link
                                        to="/grupo/accad9fe-b4c0-4f74-a92c-8efdd351df41"
                                        className="concurso_semifinal-link"
                                    >
                                        + info
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>

                            <div className="concurso_semifinal-card">
                                <img
                                    src={`${VITE_API_URL_BASE}/uploads/8e4b34e0-4b35-4656-8268-7d477c9306b2.jpg`}
                                    alt="Hermana Furia"
                                    className="concurso_semifinal-image"
                                />
                                <h2 className="concurso_semifinal-title">
                                    Quincalla
                                </h2>
                                <p className="text-gray-200">Rock</p>
                                <p className="text-gray-200">Madrid</p>
                                <div className="self-end">
                                    <Link
                                        to="/grupo/accad9fe-b4c0-4f74-a92c-8efdd351df41"
                                        className="concurso_semifinal-link"
                                    >
                                        + info
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>

                            <div className="concurso_semifinal-card">
                                <img
                                    src={`${VITE_API_URL_BASE}/uploads/1b6ab196-30ce-4b8b-870f-f9f3cb3ca8ae.webp`}
                                    alt="Mardom"
                                    className="concurso_semifinal-image"
                                />
                                <h2 className="concurso_semifinal-title">
                                    Mardom
                                </h2>
                                <p className="text-gray-200">Soul, Pop</p>
                                <p className="text-gray-200">Madrid</p>
                                <div className="self-end">
                                    <Link
                                        to="/grupo/accad9fe-b4c0-4f74-a92c-8efdd351df41"
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
