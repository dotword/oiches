import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import SalaCard from './SalaCard.jsx';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const [salas, setSalas] = useState([]);
    const [grupos,setGrupos] = useState('')
    const listRef = useRef()
    const { VITE_API_URL_BASE } = import.meta.env;


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
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
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
console.log(salas);
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Encuentra tu Banda Sonora" />
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

                                    <SalaCard key={grupo.id} sala={grupo} />
                                      
                                ))}
                            </Slider>
                        </ul>
                        </div>
                    </section>
                    <section className='flex justify-around'>
                        <Link to={"/grupos"}><img src="" alt="" />Musicos/Bandas</Link>
                        <Link to={"/salas"}><img src="" alt="" />Salas</Link>
                    </section>
                </main>
            </motion.div>
        </>
    );
};

export default Home;
