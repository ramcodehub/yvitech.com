import React from 'react';
import './Client.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Navigation } from 'swiper/modules';

import 'swiper/css';
import Client2 from '../../assets/img/clients/client-4.jpg'
import Client4 from '../../assets/img/clients/client-2.png'
import Client6 from '../../assets/img/clients/client-1.jpg'
import Client1 from '../../assets/img/clients/client-3.jpeg'
import Client3 from '../../assets/img/clients/client-5.jpg'
import Client5 from '../../assets/img/clients/client-6.jpeg'
import Client8 from '../../assets/img/clients/client-7.avif'
import Client7 from '../../assets/img/clients/client-8.png'

const Client = () => {
  const clientImages = [Client1, Client2, Client3, Client4, Client5, Client6, Client7, Client8];

  return (
     <div>
      <section id="clients" className="clients">
        <div className="container aos-init aos-animate" data-aos="zoom-out">
            <div className="section-title">
                <h2>Trusted By</h2>
                <p>Clients</p>
            </div>
    <div className="clients-slider">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={400}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={false}
        slidesPerView={'auto'}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 40 },
          480: { slidesPerView: 3, spaceBetween: 60 },
          640: { slidesPerView: 4, spaceBetween: 80 },
          992: { slidesPerView: 6, spaceBetween: 120 },
        }}
      >
        {clientImages.map((client, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: 'flex',
              alignItems:'center',
              justifyContent: 'center',
              width: 'auto',
              height:'120px'
            }}
          >
            <img
              src={client}
              alt={`Client ${index + 1}`}
              style={{
                width: '200px',
                maxHeight: '200px', 
                gap: '172px'
              }}
              className="img-fluid"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
    </section>
    </div>
  );
};

export default Client;