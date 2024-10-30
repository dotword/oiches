// import { motion } from 'framer-motion';
// import HeaderHero from '../components/HeaderHero.jsx';
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import SalaCard from '../components/SalaCard.jsx';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import GrupoCard from '../components/GrupoCard.jsx';
// import SliderMulti from '../components/SliderMulti.jsx';
// import Footer from '../components/Footer.jsx';
// import Toastify from '../components/Toastify.jsx';
// import Seo from '../components/SEO/Seo.jsx'; // Importar el componente Seo
// import Steps from '../components/Steps.jsx';
// import Conectate from '../components/Conectate.jsx';

// const Home = () => {
//     const [salas, setSalas] = useState([]);
//     const [grupos, setGrupos] = useState([]);
//     const { VITE_API_URL_BASE } = import.meta.env;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`${VITE_API_URL_BASE}/salas`);
//                 const result = await response.json();

//                 setSalas(Array.isArray(result.result) ? result.result : []);
//             } catch (error) {
//                 console.error('Error fetching salas:', error);
//                 setSalas([]);
//             }
//         };
//         fetchData();
//     }, [VITE_API_URL_BASE]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`${VITE_API_URL_BASE}/grupos`);
//                 const result = await response.json();
//                 setGrupos(Array.isArray(result.rows) ? result.rows : []);
//             } catch (error) {
//                 console.error('Error fetching grupos:', error);
//                 setGrupos([]);
//             }
//         };
//         fetchData();
//     }, [VITE_API_URL_BASE]);

//     return (
//         <>
//             {/* Agregar el componente Seo para las etiquetas meta */}
//             <Seo
//                 title="Oiches - Conecta Músicos y Salas de Conciertos"
//                 description="Descubre los músicos mejor valorados y las salas de conciertos más populares en Oiches. Vive la mejor música en vivo y organiza eventos musicales inolvidables."
//                 keywords="músicos, salas de conciertos, música en vivo, eventos musicales"
//                 url="https://oiches.com"
//                 image="https://oiches.com/assets/salas-de-conciertos.webp"
//                 type="website"
//             />

//             {/* Resto del contenido */}
//             <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: '100%' }}
//                 exit={{ opacity: 0, height: 0 }}
//             >
//                 <HeaderHero />

//                 {/* Hero Section */}
//                 <section className="hero relative flex flex-col justify-center items-start bg-hero-home bg-cover bg-center h-96 md:h-[680px] px-8 md:px-16">
//                     <div className="text-left max-w-lg mr-auto">
//                         <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
//                             Encuentra tu Banda Sonora
//                         </h1>
//                         <p className="text-white text-lg md:text-xl mt-4 mb-3">
//                             Encuentra el escenario perfecto o la banda ideal sin
//                             complicaciones.
//                         </p>
//                         <p className="text-white text-2xl md:text-3xl font-semibold mt-0.25 mb-8">
//                             ¡Vive la música en cada rincón!
//                         </p>

//                         <div className="flex gap-4">
//                             <Link
//                                 to="/grupos"
//                                 className="bg-purpleOiches hover:bg-moradoOiches text-white font-bold py-2 px-6 rounded"
//                             >
//                                 Músicos
//                             </Link>
//                             <Link
//                                 to="/salas"
//                                 className="bg-moradoOiches hover:bg-purpleOiches text-white font-bold py-2 px-6 rounded"
//                             >
//                                 Salas
//                             </Link>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Sliders de músicos y salas */}
//                 <main className="flex flex-col gap-8 mb-8 max-w-screen-xl mx-auto p-8 md:my-8">
//                     {/* Músicos más votados */}
//                     <section className="grid gap-4">
//                         <div className="flex justify-between place-items-center">
//                             <h2 className="text-2xl text-center font-semibold mx-auto md:mb-2 md:text-3xl">
//                                 Músicos más votados
//                             </h2>
//                         </div>
//                         {grupos.length > 0 ? (
//                             <SliderMulti>
//                                 {grupos.map((grupo) => (
//                                     <GrupoCard key={grupo.id} grupo={grupo} />
//                                 ))}
//                             </SliderMulti>
//                         ) : (
//                             <p>Músicos no encontrados</p>
//                         )}
//                         <div className="flex justify-center mt-8">
//                             <Link
//                                 to="/grupos"
//                                 className="bg-purpleOiches hover:bg-moradoOiches text-white font-bold py-2 px-6 rounded"
//                             >
//                                 Todos los músicos
//                             </Link>
//                         </div>
//                     </section>

//                     {/* Salas más votadas */}
//                     <section className="grid gap-4 mt-16">
//                         {' '}
//                         {/* Ajusté mt-16 para más espacio */}
//                         <div className="flex justify-between place-items-center">
//                             <h2 className="text-2xl text-center font-semibold mx-auto md:mb-2 md:text-3xl">
//                                 Salas más votadas
//                             </h2>
//                         </div>
//                         {salas.length > 0 ? (
//                             <SliderMulti>
//                                 {salas.map((sala) => (
//                                     <SalaCard key={sala.id} sala={sala} />
//                                 ))}
//                             </SliderMulti>
//                         ) : (
//                             <p>Salas no encontradas</p>
//                         )}
//                         <div className="flex justify-center mt-8">
//                             <Link
//                                 to="/salas"
//                                 className="bg-moradoOiches hover:bg-purpleOiches text-white font-bold py-2 px-6 rounded"
//                             >
//                                 Todas las salas
//                             </Link>
//                         </div>
//                     </section>

//                     {/* Sección de Steps */}
//                     <section className="flex flex-col gap-4 mx-auto">
//                         <Steps />
//                     </section>

//                     {/* Sección de Conectate */}
//                     <Conectate />
//                 </main>

//                 <Footer />
//                 <Toastify />
//             </motion.div>
//         </>
//     );
// };

// export default Home;

import { motion } from 'framer-motion';
import HeaderHero from '../components/HeaderHero.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SalaCard from '../components/SalaCard.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GrupoCard from '../components/GrupoCard.jsx';
import SliderMulti from '../components/SliderMulti.jsx';
import Footer from '../components/Footer.jsx';
import Toastify from '../components/Toastify.jsx';
import Seo from '../components/SEO/Seo.jsx';
import Steps from '../components/Steps.jsx';
import Conectate from '../components/Conectate.jsx';

const Home = () => {
    const [salas, setSalas] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const { VITE_API_URL_BASE } = import.meta.env;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${VITE_API_URL_BASE}/salas`);
                const result = await response.json();
                setSalas(Array.isArray(result.result) ? result.result : []);
            } catch (error) {
                console.error('Error fetching salas:', error);
                setSalas([]);
            }
        };
        fetchData();
    }, [VITE_API_URL_BASE]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${VITE_API_URL_BASE}/grupos`);
                const result = await response.json();
                setGrupos(Array.isArray(result.rows) ? result.rows : []);
            } catch (error) {
                console.error('Error fetching grupos:', error);
                setGrupos([]);
            }
        };
        fetchData();
    }, [VITE_API_URL_BASE]);

    return (
        <>
            <Seo
                title="Oiches - Conecta Músicos y Salas de Conciertos"
                description="Descubre los músicos mejor valorados y las salas de conciertos más populares en Oiches. Vive la mejor música en vivo y organiza eventos musicales inolvidables."
                keywords="músicos, salas de conciertos, música en vivo, eventos musicales"
                url="https://oiches.com"
                image="https://oiches.com/assets/Oiches-Conectamos-músicos-y-salas.jpg"
                type="website"
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <HeaderHero />

                {/* Hero Section */}
                <section className="hero relative flex flex-col justify-center items-start bg-hero-home bg-cover bg-center h-96 md:h-[680px] px-8 md:px-16">
                    <div className="text-left max-w-lg mr-auto">
                        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                            Encuentra tu Banda Sonora
                        </h1>
                        <p className="text-white text-lg md:text-xl mt-4 mb-3">
                            Encuentra el escenario perfecto o la banda ideal sin
                            complicaciones.
                        </p>
                        <p className="text-white text-2xl md:text-3xl font-semibold mt-0.25 mb-8">
                            ¡Vive la música en cada rincón!
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/grupos"
                                className="bg-purpleOiches hover:bg-moradoOiches text-white font-bold py-2 px-6 rounded-lg transition-transform hover:scale-105"
                            >
                                Músicos
                            </Link>
                            <Link
                                to="/salas"
                                className="bg-moradoOiches hover:bg-purpleOiches text-white font-bold py-2 px-6 rounded-lg transition-transform hover:scale-105"
                            >
                                Salas
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <main className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 mb-16 max-w-screen-xl mx-auto p-4 md:my-12">
                    {/* Músicos más votados */}
                    <section className="flex flex-col gap-4 md:gap-6 mt-12 sm:mt-12 md:mt-16">
                        <h2 className="text-3xl text-center font-semibold text-footercolor mx-auto md:text-4xl">
                            Músicos más votados
                        </h2>
                        {grupos.length > 0 ? (
                            <SliderMulti>
                                {grupos.map((grupo) => (
                                    <GrupoCard key={grupo.id} grupo={grupo} />
                                ))}
                            </SliderMulti>
                        ) : (
                            <p className="text-center text-gray-500">
                                Músicos no encontrados
                            </p>
                        )}
                        <div className="flex justify-center mt-8">
                            <Link
                                to="/grupos"
                                className="bg-gradient-to-r from-purpleOiches to-moradoOiches text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105"
                            >
                                Todos los músicos
                            </Link>
                        </div>
                    </section>

                    {/* Salas más votadas */}
                    <section className="flex flex-col gap-4 md:gap-6">
                        <h2 className="text-3xl text-center font-semibold text-footercolor mx-auto md:text-4xl">
                            Salas más votadas
                        </h2>
                        {salas.length > 0 ? (
                            <SliderMulti>
                                {salas.map((sala) => (
                                    <SalaCard key={sala.id} sala={sala} />
                                ))}
                            </SliderMulti>
                        ) : (
                            <p className="text-center text-gray-500">
                                Salas no encontradas
                            </p>
                        )}
                        <div className="flex justify-center mt-8">
                            <Link
                                to="/salas"
                                className="bg-gradient-to-r from-moradoOiches to-purpleOiches text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105"
                            >
                                Todas las salas
                            </Link>
                        </div>
                    </section>

                    {/* Sección de Steps */}
                    <section className="flex flex-col gap-2 md:gap-4">
                        <Steps />
                    </section>

                    {/* Sección de Conectate */}
                    <section className="flex flex-col gap-2 md:gap-4">
                        <Conectate />
                    </section>
                </main>

                <Footer />
                <Toastify />
            </motion.div>
        </>
    );
};

export default Home;
