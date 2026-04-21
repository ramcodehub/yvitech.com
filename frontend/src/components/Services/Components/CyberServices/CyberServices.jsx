import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ApplicationCard from '../../ApplicationCard/ApplicationCard';
import './CyberServices.css';

export default function CyberServices({ Services }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="py-5">
      <div className="d-flex align-items-center justify-content-between swipe-btn mb-4">
        <h1 className="fw-bold" >Core Cyber Security Services</h1>

        <div className="d-flex gap-2 me-4">
          <button ref={prevRef} className="py-3 px-4 border-1 bg-white rounded-circle">
            <i className="bi bi-arrow-left text-dark fs-4"></i>
          </button>
          <button ref={nextRef} className="py-3 px-4 border-1 bg-white rounded-circle">
            <i className="bi bi-arrow-right text-dark fs-4"></i>
          </button>
        </div>
      </div>

       <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{
          delay: 1250,
          disableOnInteraction: true, 
          pauseOnMouseEnter: true, 
        }}
        loop={true} 
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
      >
        {Services.map((services, idx) => (
          <SwiperSlide key={idx} className="d-flex align-items-stretch">
            <ApplicationCard
              title={services.title}
              icon={services.icon}
              items={services.items}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
