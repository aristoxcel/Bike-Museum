
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { Autoplay,EffectCoverflow, Pagination } from 'swiper/modules';
import Title from './Title';
import Client_Card from './Client_Card';

export default function Testimonial() {
    const clients = [
        {
            name: "John Doe",
            img:"https://i.ibb.co/D7jMCQM/pic.jpg",
            comment : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, debitis! Pariatur aliquam in totam doloribus quos possimus facilis quia ullam numquam eligendi reiciendis eaque cumque, sit culpa soluta. Quas, ad!"
        },
        {
            name: "Bran Chan",
            img:"https://i.ibb.co/Y2Dn0PB/pexels-chloekalaartist-1043471.jpg",
            comment : "Cozy atmosphere, friendly staff, loved every bite. Highly recommend! s quos possimus facilis quia ullam numquam eligendi reiciendis eaque cumque, sit culpa"
        },
        {
            name: "Maria Kuri",
            img:"https://i.ibb.co/DKhsnBF/pexels-bertellifotografia-3764119.jpg",
            comment : "Cozy atmosphere, friendly staff, loved every bite. Highly recommend! s quos possimus facilis quia ullam numquam eligendi reiciendis eaque cumque, sit culpa"
        },
        {
            name: "Bran Chan",
            img:"https://i.ibb.co/Y2Dn0PB/pexels-chloekalaartist-1043471.jpg",
            comment : "Cozy atmosphere, friendly staff, loved every bite. Highly recommend! s quos possimus facilis quia ullam numquam eligendi reiciendis eaque cumque, sit culpa"
        },
        {
            name: "John Doe",
            img:"https://i.ibb.co/D7jMCQM/pic.jpg",
            comment : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, debitis! Pariatur aliquam in totam doloribus quos possimus facilis quia ullam numquam eligendi reiciendis eaque cumque, sit culpa soluta. Quas, ad!"
        },
        {
            name: "John Doe",
            img:"https://i.ibb.co/D7jMCQM/pic.jpg",
            comment : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, debitis! Pariatur aliquam in totam doloribus quos possimus facilis quia ullam numquam eligendi reiciendis eaque cumque, sit culpa soluta. Quas, ad!"
        },
        {
            name: "John Doe",
            img:"https://i.ibb.co/D7jMCQM/pic.jpg",
            comment : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, debitis! Pariatur aliquam in totam doloribus quos possimus facilis quia ullam numquam eligendi reiciendis eaque cumque, sit culpa soluta. Quas, ad!"
        },
        {
            name: "Bran Chan",
            img:"https://i.ibb.co/Y2Dn0PB/pexels-chloekalaartist-1043471.jpg",
            comment : "Cozy atmosphere, friendly staff, loved every bite. Highly recommend!s quos possimus facilis quia ullam numquam eligendi reiciendis eaque cumque, sit culpa"
        },
    ]
  return (
    <>
        <div className=''>
        <div className='my-16 py-8 z-10 relative'>
        <Title text= 'Happy Clients'></Title>
        </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={50}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          // When the window width is >= 320px (for mobile)
          320: {
            slidesPerView: 1,   // Show 1 card for mobile devices
            spaceBetween: 20,   // Adjust spacing if needed
          },
          // When the window width is >= 768px (for tablets and larger screens)
          768: {
            slidesPerView: 2,   // Show 2 cards for tablets
            spaceBetween: 30,
          },
          // When the window width is >= 1024px (for desktops)
          1024: {
            slidesPerView: 3,   // Show 3 cards for larger screens
            spaceBetween: 50,
          },
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true , backgroundColor: '#f97316'}}
        modules={[Autoplay,EffectCoverflow, Pagination]}
        className="mySwiper relative z-60 mb-36"
      >
        {clients.map(({ name, img, comment }, index) => (
          <SwiperSlide key={index}>
            <Client_Card name={name} img={img} comment={comment} />
          </SwiperSlide>
        ))}
      </Swiper>
        </div>
      <style >{`

        .swiper-pagination-bullet {
          background-color: #d1d5db; 
          opacity: 1; 
        }

        .swiper-pagination-bullet-active {
          background-color: #f97316; 
        }
      `}</style>
    </>
  );
}
