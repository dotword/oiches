import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import SalaCard from './SalaCard.jsx';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SalaFilter from '../components/SalaFilter.jsx';
import FetchSalasService from '../services/FetchSalasService.js';
import SalasImg from '../assets/SalasMusicales.jpeg';
import GruposImg from '../assets/Musicos.jpeg';
const Home = () => {
    const [salas, setSalas] = useState([]);
    const [grupos,setGrupos] = useState('')
    const listRef = useRef()
    const { VITE_API_URL_BASE } = import.meta.env;
    const [filteredSalas, setFilteredSalas] = useState([]);
    const [error, setError] = useState('');
    const imageUrl = `${import.meta.env.VITE_API_URL_BASE}/uploads/`
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${VITE_API_URL_BASE}/salas`);
            setSalas(await data.json());
        };
        fetchData();
    }, []);
    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await fetch(`${VITE_API_URL_BASE}/grupos`)
            setGrupos(await data.json())
        }
        fetchData()
    },[])
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: false,
              dots: true
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      
      const handleFilterChange = async (filters) => {
        try {
            const filtered = await FetchSalasService(filters);
            setSalas(filtered);
        } catch (error) {
            console.error('Error filtering salas:', error);
            setError('Hubo un error al filtrar las salas');
        }
    };
console.log(salas);
console.log(grupos);
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header />
                <div className="hero w-full bg-gray-200 flex flex-col">
                <h1 className="text-4xl font-bold">Encuentra tu Banda Sala</h1>
                <p className="text-xl mt-4 text-center">
                    Et has minim elitr intellegat. Mea aeterno eleifend antiopam
                    ad, nam no suscipit quaerendum. At nam minimum ponderum. Est
                    audiam animal molestiae te.
                </p>
            </div>
            <div className="sala-filter-form-container">
                <SalaFilter onFilterChange={handleFilterChange} />
            </div>
                <main className='flex flex-col gap-6 max-w-screen-lg mx-auto'>
                    
                    <section className='grid gap-6'>
                        <div className='flex justify-between'>
                            <h2>Bandas/Musicos recomendados</h2>
                            <Link to={'/grupos'}>Ver Todos</Link>
                        </div>
                        <div className='w-full max-w-xs sm:max-w-md md:max-w-3xl  lg:max-w-screen-lg mx-auto' >
                        <ul ref={listRef} className='max-w-xs md:max-w-3xl sm:max-w-md  lg:max-w-screen-lg mx-auto'>
                            <Slider className='rounded-xl' {...settings}>
                                {salas && salas.map((sala) => (

                                    <SalaCard key={sala.id} sala={sala} />
                                      
                                ))}
                            </Slider>
                        </ul>
                        </div>
                        
                    </section>
                    <section className='grid gap-6'>
                        <div className='flex justify-between'>
                            <h2>Salas de concierto recomendadas</h2>
                            <Link to={'/salas'}> Ver Todas</Link>
                        </div>
                        <div className='w-full max-w-xs sm:max-w-md md:max-w-3xl  lg:max-w-screen-lg mx-auto' >
                        <ul ref={listRef} className='max-w-xs md:max-w-3xl sm:max-w-md  lg:max-w-screen-lg mx-auto'>
                            <Slider className='rounded-xl' {...settings}>
                                {grupos && grupos.map((grupo) => (
                                    
                                    <div key={grupo.id} className="sala-card bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                                        <img
                                            src={`${VITE_API_URL_BASE}/uploads/${grupo.fotos[0].name}`}
                                            alt={grupo.nombre}
                                            className="sala-card-image w-full h-full object-cover rounded-lg"
                                        />
                                        <h2 className="sala-card-title text-xl font-bold mt-4">
                                            {grupo.nombre}
                                        </h2>
                                        <p className="sala-card-genre text-gray-400">{grupo.genero_nombre}</p>
                                        <p className="sala-card-province text-gray-400">{grupo.provincia_nombre}</p>
                                        <p className="sala-card-votes text-gray-400">
                                            Votos: {grupo.media_votos}
                                        </p>
                                    </div>
                                
                                ))}
                            </Slider>
                        </ul>
                        </div>
                    </section>
                    <section className='flex flex-col mx-auto my-10 gap-6 md:flex-row md:justify-around md:mx-0 md:mt-40 '>
                        <Link className='relative hover:scale-110 transition-all' to={"/grupos"}>
                            <img className='w-72 rounded-xl' src={GruposImg} alt=""/>
                            <span className='absolute bottom-3 px-2 z-50 text-xl w-full text-white bg-black bg-opacity-65'>Musicos/Bandas</span>
                        </Link>
                        <Link className='relative hover:scale-110 transition-all' to={"/salas"}>
                            <img className='w-72 h-full rounded-xl' src={SalasImg} alt=""/>
                            <span className='absolute bottom-3 px-2 z-50 text-xl text-white w-full bg-black bg-opacity-65'>Salas Musicales</span>
                        </Link>
                    </section>
                </main>
            </motion.div>
        </>
    );
};

export default Home;
