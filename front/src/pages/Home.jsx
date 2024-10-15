// import { motion } from 'framer-motion';
// import HeaderHero from '../components/HeaderHero.jsx';
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import SalaCard from '../components/SalaCard.jsx';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import SalasImg from '../assets/salas-de-conciertos.webp';
// import GruposImg from '../assets/musicos.jpg';
// import GrupoCard from '../components/GrupoCard.jsx';
// import SliderMulti from '../components/SliderMulti.jsx';
// import Footer from '../components/Footer.jsx';
// import Toastify from '../components/Toastify.jsx';
// import Seo from '../components/SEO/Seo.jsx'; // Importar el componente Seo

// const Home = () => {
//     const [salas, setSalas] = useState([]);
//     const [grupos, setGrupos] = useState([]);
//     const { VITE_API_URL_BASE } = import.meta.env;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`${VITE_API_URL_BASE}/salas`);
//                 const result = await response.json();
//                 setSalas(Array.isArray(result.rows) ? result.rows : []);
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
//                 <section className="hero relative flex flex-col justify-center items-center bg-hero-home bg-cover bg-center h-96 md:h-[680px]">
//                     <h1 className="hero-title text-white">
//                         Encuentra tu Banda Sonora
//                     </h1>
//                     <p className="text-xl md:text-3xl hero-subtitle text-white">
//                         Donde la música y el escenario se unen
//                     </p>
//                 </section>
//                 <main className="flex flex-col gap-20 mb-8 max-w-screen-xl mx-auto p-8 md:my-12">
//                     <section className="grid gap-6">
//                         <div className="flex justify-between place-items-center">
//                             <h2 className="text-2xl text-center font-semibold mx-auto md:mb-4 md:text-3xl">
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
//                     </section>
//                     <section className="grid gap-6">
//                         <div className="flex justify-between place-items-center">
//                             <h2 className="text-2xl text-center font-semibold mx-auto md:mb-4 md:text-3xl">
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
//                     </section>
//                     <section className="flex flex-col md:grid md:grid-cols-2 mx-auto gap-8 md:justify-around md:mx-auto md:my-6 xl:w-1200">
//                         <Link
//                             className="relative hover:scale-105 transition-all"
//                             to={'/grupos'}
//                         >
//                             <img
//                                 className="w-96 md:w-auto rounded-2xl"
//                                 src={GruposImg}
//                                 alt="Músicos en Oiches"
//                             />
//                             <span className="absolute bottom-3 px-4 z-50 text-3xl w-full text-white bg-black bg-opacity-65">
//                                 Músicos
//                             </span>
//                         </Link>
//                         <Link
//                             className="relative hover:scale-105 transition-all"
//                             to={'/salas'}
//                         >
//                             <img
//                                 className="w-96 md:w-auto h-full rounded-2xl"
//                                 src={SalasImg}
//                                 alt="Salas de conciertos en Oiches"
//                             />
//                             <span className="absolute bottom-3 px-4 z-50 text-3xl text-white w-full bg-black bg-opacity-65">
//                                 Salas
//                             </span>
//                         </Link>
//                     </section>
//                 </main>
//                 <Footer />
//                 <Toastify />
//             </motion.div>
//         </>
//     );
// };

// export default Home;

// import { motion } from 'framer-motion';
// import HeaderHero from '../components/HeaderHero.jsx';
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import SalaCard from '../components/SalaCard.jsx';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import SalasImg from '../assets/salas-de-conciertos.webp';
// import GruposImg from '../assets/musicos.jpg';
// import GrupoCard from '../components/GrupoCard.jsx';
// import SliderMulti from '../components/SliderMulti.jsx';
// import Footer from '../components/Footer.jsx';
// import Toastify from '../components/Toastify.jsx';
// import Seo from '../components/SEO/Seo.jsx'; // Importar el componente Seo
// import FeatureGridMusicos from '../components/FeatureGridMusicos.jsx'; // Importar el componente FeatureGrid
// import FeatureGridSalas from '../components/FeatureGridSalas.jsx'; // Importar el componente FeatureGrid
// import Steps from '../components/Steps.jsx';

// const Home = () => {
//     const [salas, setSalas] = useState([]);
//     const [grupos, setGrupos] = useState([]);
//     const { VITE_API_URL_BASE } = import.meta.env;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`${VITE_API_URL_BASE}/salas`);
//                 const result = await response.json();
//                 setSalas(Array.isArray(result.rows) ? result.rows : []);
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
//                 {/* <section className="hero relative flex flex-col justify-center items-center bg-hero-home bg-cover bg-center h-96 md:h-[680px]">
//                     <h1 className="hero-title text-white">
//                         Encuentra tu Banda Sonora
//                     </h1>
//                     <p className="text-xl md:text-3xl hero-subtitle text-white">
//                         Donde la música y el escenario se unen
//                     </p>
//                 </section> */}

//                 <section className="hero relative flex flex-col justify-center items-start bg-hero-home bg-cover bg-center h-96 md:h-[680px] px-8 md:px-16">
//                     <div className="text-left max-w-lg mr-auto">
//                         <h1 className="text-white text-4xl md:text-4xl font-bold leading-tight">
//                             Encuentra tu Banda Sonora
//                         </h1>
//                         <p className="text-white text-lg md:text-xl mt-4 mb-8">
//                             Encuentra el escenario perfecto o la banda ideal sin
//                             complicaciones.
//                         </p>
//                         <p className="text-white text-2xl md:text-3xl font-semibold mt-0.25 mb-8">
//                             ¡Vive la música en cada rincón!
//                         </p>

//                         <div className="flex gap-4">
//                             <Link
//                                 to="/salas"
//                                 className="bg-purpleClaro hover:bg-orange-500 text-white font-bold py-2 px-6 rounded"
//                             >
//                                 Salas
//                             </Link>
//                             <Link
//                                 to="/grupos"
//                                 className="bg-orange-500 hover:bg-purpleClaro text-white font-bold py-2 px-6 rounded"
//                             >
//                                 Músicos
//                             </Link>
//                         </div>
//                     </div>
//                 </section>
//                 <section className="flex flex-col gap-4 mx-auto">
//                     {' '}
//                     {/* Ajusté gap-8 para reducir la separación */}
//                     <Steps />
//                 </section>

//                 <main className="flex flex-col gap-8 mb-8 max-w-screen-xl mx-auto p-8 md:my-2">
//                     {/* Sección de características para músicos */}
//                     <section className="flex flex-col gap-8 mx-auto">
//                         {' '}
//                         {/* Ajusté gap-8 para reducir la separación */}
//                         <FeatureGridMusicos />
//                     </section>

//                     {/* Músicos más votados */}
//                     <section className="grid gap-4">
//                         {' '}
//                         {/* Ajusté gap-4 para menos espacio entre tarjetas */}
//                         <div className="flex justify-between place-items-center">
//                             <h2 className="text-2xl text-center font-semibold mx-auto md:mb-2 md:text-3xl">
//                                 {' '}
//                                 {/* Reduje mb a 2 */}
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
//                     </section>

//                     {/* Sección de características para salas */}
//                     <section className="flex flex-col gap-8 mx-auto mt-12">
//                         {' '}
//                         {/* Ajusté mt-12 y gap-8 */}
//                         <FeatureGridSalas />
//                     </section>

//                     {/* Salas más votadas */}
//                     <section className="grid gap-4">
//                         {' '}
//                         {/* Ajusté gap-4 para reducir la separación */}
//                         <div className="flex justify-between place-items-center">
//                             <h2 className="text-2xl text-center font-semibold mx-auto md:mb-2 md:text-3xl">
//                                 {' '}
//                                 {/* Reduje mb a 2 */}
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
//                     </section>

//                     {/* Enlaces a más información sobre músicos y salas */}
//                     <section className="flex flex-col md:grid md:grid-cols-2 mx-auto gap-8 md:justify-around xl:w-1200 mt-20">
//                         {' '}
//                         {/* Mantengo mt-20 para más espacio aquí */}
//                         <Link
//                             className="relative hover:scale-105 transition-all"
//                             to={'/grupos'}
//                         >
//                             <img
//                                 className="w-96 md:w-auto rounded-2xl"
//                                 src={GruposImg}
//                                 alt="Músicos en Oiches"
//                             />
//                             <span className="absolute bottom-3 px-4 z-50 text-3xl w-full text-white bg-black bg-opacity-65">
//                                 Músicos
//                             </span>
//                         </Link>
//                         <Link
//                             className="relative hover:scale-105 transition-all"
//                             to={'/salas'}
//                         >
//                             <img
//                                 className="w-96 md:w-auto h-full rounded-2xl"
//                                 src={SalasImg}
//                                 alt="Salas de conciertos en Oiches"
//                             />
//                             <span className="absolute bottom-3 px-4 z-50 text-3xl text-white w-full bg-black bg-opacity-65">
//                                 Salas
//                             </span>
//                         </Link>
//                     </section>
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
//import SalasImg from '../assets/salas-de-conciertos.webp';
//import GruposImg from '../assets/musicos.jpg';
import GrupoCard from '../components/GrupoCard.jsx';
import SliderMulti from '../components/SliderMulti.jsx';
import Footer from '../components/Footer.jsx';
import Toastify from '../components/Toastify.jsx';
import Seo from '../components/SEO/Seo.jsx'; // Importar el componente Seo
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
                setSalas(Array.isArray(result.rows) ? result.rows : []);
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
            {/* Agregar el componente Seo para las etiquetas meta */}
            <Seo
                title="Oiches - Conecta Músicos y Salas de Conciertos"
                description="Descubre los músicos mejor valorados y las salas de conciertos más populares en Oiches. Vive la mejor música en vivo y organiza eventos musicales inolvidables."
                keywords="músicos, salas de conciertos, música en vivo, eventos musicales"
                url="https://oiches.com"
                image="https://oiches.com/assets/salas-de-conciertos.webp"
                type="website"
            />

            {/* Resto del contenido */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <HeaderHero />

                {/* Hero Section */}
                <section className="hero relative flex flex-col justify-center items-start bg-hero-home bg-cover bg-center h-96 md:h-[680px] px-8 md:px-16">
                    <div className="text-left max-w-lg mr-auto">
                        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                            Encuentra tu Banda Sonora
                        </h1>
                        <p className="text-white text-lg md:text-xl mt-4 mb-8">
                            Encuentra el escenario perfecto o la banda ideal sin
                            complicaciones.
                        </p>
                        <p className="text-white text-2xl md:text-3xl font-semibold mt-0.25 mb-8">
                            ¡Vive la música en cada rincón!
                        </p>

                        <div className="flex gap-4">
                            <Link
                                to="/salas"
                                className="bg-purpleClaro hover:bg-orange-500 text-white font-bold py-2 px-6 rounded"
                            >
                                Salas
                            </Link>
                            <Link
                                to="/grupos"
                                className="bg-orange-500 hover:bg-purpleClaro text-white font-bold py-2 px-6 rounded"
                            >
                                Músicos
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Sliders de músicos y salas */}
                <main className="flex flex-col gap-8 mb-8 max-w-screen-xl mx-auto p-8 md:my-8">
                    {/* Músicos más votados */}
                    <section className="grid gap-4">
                        <div className="flex justify-between place-items-center">
                            <h2 className="text-2xl text-center font-semibold mx-auto md:mb-2 md:text-3xl">
                                Músicos más votados
                            </h2>
                        </div>
                        {grupos.length > 0 ? (
                            <SliderMulti>
                                {grupos.map((grupo) => (
                                    <GrupoCard key={grupo.id} grupo={grupo} />
                                ))}
                            </SliderMulti>
                        ) : (
                            <p>Músicos no encontrados</p>
                        )}
                        <div className="flex justify-center mt-8">
                            <Link
                                to="/grupos"
                                className="bg-purpleClaro hover:bg-orange-500 text-white font-bold py-2 px-6 rounded"
                            >
                                Todos los músicos
                            </Link>
                        </div>
                    </section>

                    {/* Salas más votadas */}
                    <section className="grid gap-4 mt-16">
                        {' '}
                        {/* Ajusté mt-16 para más espacio */}
                        <div className="flex justify-between place-items-center">
                            <h2 className="text-2xl text-center font-semibold mx-auto md:mb-2 md:text-3xl">
                                Salas más votadas
                            </h2>
                        </div>
                        {salas.length > 0 ? (
                            <SliderMulti>
                                {salas.map((sala) => (
                                    <SalaCard key={sala.id} sala={sala} />
                                ))}
                            </SliderMulti>
                        ) : (
                            <p>Salas no encontradas</p>
                        )}
                        <div className="flex justify-center mt-8">
                            <Link
                                to="/salas"
                                className="bg-orange-500 hover:bg-purpleClaro text-white font-bold py-2 px-6 rounded"
                            >
                                Todas las salas
                            </Link>
                        </div>
                    </section>

                    {/* Sección de Steps */}
                    <section className="flex flex-col gap-4 mx-auto">
                        <Steps />
                    </section>

                    {/* Sección de Conectate */}
                    <Conectate />
                </main>

                <Footer />
                <Toastify />
            </motion.div>
        </>
    );
};

export default Home;
