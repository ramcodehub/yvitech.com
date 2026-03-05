import React from 'react'
import './Video.css'
// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import offering images from the correct directory



import Slide1 from '../../assets/img/YVISoftHighlevelSlides/YVI Tech CorporateProfile-1.jpg'
import Slide2 from '../../assets/img/YVISoftHighlevelSlides/YVI Tech CorporateProfile-2.jpg'
import Slide3 from '../../assets/img/YVISoftHighlevelSlides/YVI Tech CorporateProfile-3.jpg'
import Slide4 from '../../assets/img/YVISoftHighlevelSlides/YVI Tech CorporateProfile-4.jpg'
import Slide5 from '../../assets/img/YVISoftHighlevelSlides/YVI Tech CorporateProfile-5.jpg'
import Slide6 from '../../assets/img/YVISoftHighlevelSlides/YVI Tech CorporateProfile-6.jpg'
import Slide7 from '../../assets/img/YVISoftHighlevelSlides/YVI Tech CorporateProfile-7.jpg'
import Slide8 from '../../assets/img/YVISoftHighlevelSlides/YVI Tech CorporateProfile-8.jpg'
import Slide9 from '../../assets/img/YVISoftHighlevelSlides/YVI Tech CorporateProfile-9.jpg'


import brochure from '../../assets/img/YVI Tech CorporateProfile.pdf' 

const Video = () => {
  // Array of offering images
  const offerings = [
    { image: Slide1, title: "YVI Soft Solutions" },
    { image: Slide2, title: "Our Services" },
    { image: Slide3, title: "Technology Expertise" },
    { image: Slide4, title: "Our Approach" },
    { image: Slide5, title: "Why Choose Us" },
    { image: Slide6, title: "Our Vision" },
    { image: Slide7, title: "Our Mission" },
    { image: Slide8, title: "Our Values" },
    { image: Slide9, title: "Our Team" }

  ];

  return (
    <div>
      <section id="featured-services" className="featured-services" style={{backgroundColor:' #3B3B3B'}}>
        <div className="container-fluid">
          <div className="section-title download-brochure ps-5 d-flex justify-content-between">
            <div className=''>
              <h2>Offerings</h2>
              <p style={{color:'white'}}>OUR Offerings</p>
            </div>
            <div className='mt-4 pe-5 brochure'>
              <a href={brochure}  download>Download Profile</a>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* Replace video with Swiper carousel - full width and height with padding */}
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                loop={true}
                autoplay={{ 
                  delay: 5000, 
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: true
                }}
                navigation={true}
                slidesPerView={1}
                className="offerings-carousel"
              >
                {offerings.map((offering, index) => (
                  <SwiperSlide key={index} className="d-flex justify-content-center align-items-center">
                    <div className="offering-item w-100">
                      <img 
                        src={offering.image} 
                        alt={offering.title}
                        className="offering-image w-100"
                        style={{ 
                          height: '600px',
                          objectFit: 'contain',
                          display: 'block',
                          margin: '0 auto'
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>    
      </section>
    </div>
  )
}

export default Video