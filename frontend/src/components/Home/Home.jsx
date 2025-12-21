import { useState } from "react";
import about from '../../assets/img/about1.jpg'
import about1 from '../../assets/img/about2.png'
import './Home.css'
import Info_Form from "../Contact Info & Form/Info_Form";
import ServicesTabs from "../ServicesTabs/ServicesTabs";
import services from "../../data/services";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BannerThree from "../Banner3/BannerThree";


const Home = () => {
  
    return (
        <div>
            {/* <Banner headingText='IT Consulting and Services to Support Your Digital Transformation'
                content='Leverage our tailored software engineering services to optimize your digital capabilities. We are committed to supporting your efforts to streamline operations, improve efficiency, and enhance the customer experience through customized solutions.'
                imageName='Index.jpg' /> */}
            <BannerThree headingText='IT Consulting and Services to Support Your Digital Transformation'
                        content="Leverage our tailored software engineering services to optimize your digital capabilities. We are committed to supporting your efforts to streamline operations, improve efficiency, and enhance the customer experience through customized solutions."
                        videoName="YVI.mp4" />

                               {/* ======= About Section ======= */}
        <section className="container aos-init aos-animate" data-aos="fade-up">
            <div className="section-title p-0" >
                <h2>About Us</h2>
                <p>Who We Are</p>
            </div>                       
            <div id="about" className="about pt-4">
          <div className="about-container d-flex align-items-stretch">

            {/* CONTENT */}
            <div
              className="about-content aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="content p-5">
                <h2>Accelerating Your Digital Future</h2>
                <p>
                  YVI Tech empowers organizations to advance their digital journey through customized IT consulting and transformation services. We help streamline operations, improve efficiency, and elevate customer experiences by delivering solutions aligned with your strategic objectives.
                </p>
                <p>
                  Our experienced consultants provide actionable, insight-driven guidance to optimize technology investments, reduce risk, maximize ROI, and accelerate data-led decision-making. Leveraging proven methodologies and innovative approaches, we design, implement, and manage end-to-end solutions tailored to your organization’s unique business needs—enabling sustainable growth and measurable outcomes.
                </p>
              </div>
            </div>

            {/* IMAGE */}
            <div
              className="about-image aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img src={about1} className="about-imgg" alt="About us" />
            </div>

          </div>
        </div>

    </section>
    <section id="features" className="features" >
    <div className='container'>
    <div className="section-title">
        <h2>Services</h2>
        <p>Our Services</p>
        <span>Our tailored-fit services definitely suits all kind of customer needs. Our customer-first approach is the main motto which made us to come up with blended services that would cater all our customer requirements with a long-lasting satisfaction.</span>
    </div>
    <ServicesTabs services={services} />;
    </div>
    </section>



    <Info_Form/>

    </div>
    );
}

export default Home;