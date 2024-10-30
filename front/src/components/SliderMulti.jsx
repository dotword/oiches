// import { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// // Asegúrate de tener tus estilos CSS aquí

// const SliderMulti = ({ children }) => {
//     const [isMounted, setIsMounted] = useState(false);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsMounted(true);
//         }, 100); // Ajusta el tiempo si es necesario
//         return () => clearTimeout(timer);
//     }, []);

//     const settings = {
//         infinite: false,
//         speed: 500,
//         dots: true,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         responsive: [
//             {
//                 breakpoint: 1200,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                     dots: true,
//                 },
//             },
//             {
//                 breakpoint: 900,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                     dots: true,
//                 },
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     initialSlide: 1,
//                     dots: true,
//                 },
//             },
//         ],
//     };

//     return (
//         <div className="w-72 md:w-700 lg:w-900 xl:w-1200 mx-auto">
//             {isMounted && <Slider {...settings}>{children}</Slider>}
//         </div>
//     );
// };

// export default SliderMulti;

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
// Asegúrate de tener tus estilos CSS aquí

const SliderMulti = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 100); // Ajusta el tiempo si es necesario
        return () => clearTimeout(timer);
    }, []);

    const settings = {
        infinite: false,
        speed: 500,
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: true,
                    arrows: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className="w-72 md:w-700 lg:w-900 xl:w-1200 mx-auto">
            {isMounted && <Slider {...settings}>{children}</Slider>}
        </div>
    );
};

export default SliderMulti;
