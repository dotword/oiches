import React from "react";
import Slider from "react-slick";


const SliderMulti = ({ children }) => {

  const settings = {
    infinite: false,
    speed: 500,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive:[
      {
      breakpoint: 1200,
      settings:{
        slidesToShow: 1,
        dots: true
      }
    },
      {
      breakpoint: 600,
      settings:{
        slidesToShow: 1,
        dots: true
      }
    },
    ]
  };

  return (
    <div className="w-80 lg:w-full mx-auto">
      <div className="">
        <Slider {...settings} >
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default SliderMulti;
