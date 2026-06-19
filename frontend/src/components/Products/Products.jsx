import React from "react";
import logo from "../../assets/img/logo.png";
import "./Products.css";
import '../Client/Client.css'
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

const Products = () => {
    const clientImages = [Client1, Client2, Client3, Client4, Client5, Client6, Client7, Client8];
  return (
    <div className="innovative-solutions ">
        <div className="d-flex flex-column align-items-center justify-content-center w-100 bannerr">
      <div className="d-flex flex-column align-items-center m-0 p-0 bannerr-heading">
        <h1 className="m-0 p-0 lh-1 font-abel text-white">Unlock Data Insights</h1>
        <h1 className="p-0 lh-1 font-abel colored">Make Smarter Decisions</h1>
      </div>
      <div className="fw-light text-center  lh-1 mx-auto bannerr-description">
        <p className="fs-5 font-abel fw-bold" style={{color: "rgba(255, 255, 255, 0.502)"}}>
          “Driving bold, breakthrough innovations that redefine how we protect
          and nurture the planet making sustainability not just a goal, but a
          revolution."
        </p>
      </div>
      <a href="https://www.dwansys.com" target="_blank" rel="noopener noreferrer">
        <button className="secondaryBtn border-0 mt-3 text-white">Explore More</button>
      </a>
    </div>

        <div class="container py-5">
        <div class="row align-items-center rounded-4 ">
            <div class="col-md-4 text-center mb-4 mb-md-0">
            <img
                src={logo}
                alt="Dwansys Logo"
                class="img-fluid"
                style={{ height: "120px" , width: "auto" }}
            />
            </div>

            <div class="col-md-8">
            <p class=" mb-0" style={{fontSize: "17px" , color: "rgba(255, 255, 255, 0.502)"}}>
                Dwansys is a Research and Development organization specializing in
                innovative solutions across ESG, healthcare, life sciences, BFSI,
                and various other industries.
            </p>
            </div>

        </div>
        </div>
        <section id="clients" className="clients bg-white pt-5">
                <div className="container aos-init aos-animate" data-aos="fade-up">
                    
            <div className="clients-slider">
              <Swiper
                modules={[Autoplay]}
                loop={true}
                speed={6000}
                autoplay={{
                  delay: 0,
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

export default Products;