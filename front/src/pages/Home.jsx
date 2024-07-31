import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useEffect,  useState } from 'react';
import SalaCard from '../components/SalaCard.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SalasImg from '../assets/pexels-teddy-2263436.jpg';
import GruposImg from '../assets/pexels-jibarofoto-2091383.jpg';
import GrupoCard from '../components/GrupoCard.jsx';
import SliderMulti from '../components/SliderMulti.jsx';
import Footer from '../components/Footer.jsx';

const Home = () => {
    const [salas, setSalas] = useState([]);
    const [grupos, setGrupos] = useState([]); // Asegúrate de que sea un array al inicializar
    const { VITE_API_URL_BASE } = import.meta.env;


    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${VITE_API_URL_BASE}/salas`);
            setSalas(await data.json());
        };
        fetchData();
    }, [VITE_API_URL_BASE]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${VITE_API_URL_BASE}/grupos`);
            setGrupos(await data.json());
        };
        fetchData();
    }, [VITE_API_URL_BASE]);

    

   

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header />
            <section className="w-screen hero bg-hero-home bg-cover mt-2 relative before:content-[''] before:bg-white/[.10] before:absolute before:w-full before:h-full md:-mt-4">
                <h1 className="hero-title text-white">
                    Encuentra tu Banda Sonora
                </h1>
                <p className="hero-subtitle text-white">
                    Et has minim elitr intellegat. Mea aeterno eleifend antiopam
                    ad, nam no suscipit quaerendum.
                </p>
            </section>
            <main className="flex flex-col gap-10 max-w-screen-xl mx-auto p-8 ">
                <section className="grid gap-6">
                    <div className="flex justify-between place-items-center">
                        <h2 className="text-3xl">
                        Bandas y músicos más votados:
                        </h2>
                        <Link className="text-2xl" to={'/grupos'}>
                            Ver Todos
                        </Link>
                    </div>

                    <SliderMulti>
                        {grupos &&
                            grupos.map((grupo) => (
                                <GrupoCard key={grupo.id} grupo={grupo} />
                            ))}
                    </SliderMulti>
                </section>
                <section className="grid gap-6">
                    <div className="flex justify-between place-items-center">
                        <h2 className="text-3xl">
                        Salas de conciertos más votadas:
                        </h2>
                        <Link className='text-2xl' to={'/salas'}>
                            {' '}
                            Ver Todas
                        </Link>
                    </div>
                    <SliderMulti>
                        {salas &&
                            salas.map((sala) => (
                                <SalaCard key={sala.id} sala={sala} />
                            ))}
                    </SliderMulti>
                </section>
                <section className="flex flex-col lg:grid lg:grid-cols-2 mx-auto gap-6 md:flex-row md:justify-around md:mx-auto md:my-6 xl:w-1200 ">
                    <Link
                        className="relative hover:scale-105 transition-all "
                        to={'/grupos'}
                    >
                        <img
                            className="w-96 lg:w-auto rounded-2xl"
                            src={GruposImg}
                            alt=""
                        />
                        <span className="absolute bottom-3 px-4 z-50 text-3xl w-full text-white bg-black bg-opacity-65">
                            Musicos/Bandas
                        </span>
                    </Link>
                    <Link
                        className="relative hover:scale-105 transition-all"
                        to={'/salas'}
                    >
                        <img
                            className="w-96 lg:w-auto h-full rounded-2xl"
                            src={SalasImg}
                            alt=""
                        />
                        <span className="absolute bottom-3 px-4 z-50 text-3xl text-white w-full bg-black bg-opacity-65">
                            Salas Musicales
                        </span>
                    </Link>
                </section>
            </main>
            <Footer></Footer>
        </motion.div>
    );
};

export default Home;
