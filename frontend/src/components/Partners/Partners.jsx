import React from "react";
import Adroit from "../../assets/img/partners/adroit-logo.png";
import Dwansys from "../../assets/img/partners/dwansys-logo.png";
import GnaanAI from "../../assets/img/partners/gnaan-logo.png";
import "./Partners.css";


const Partners = () => {
  return (
    <div>
      <section id="partners" className="partners pt-3">
        <div className="container aos-init aos-animate" data-aos="fade-up">
          
          {/* Keep existing title and heading */}
          <div className="section-title">
            <h2>Collaborative Innovation</h2>
            <p>Partners</p>
          </div>


          {/* Partners content */}
          <div className="partners-content">
            

            <div className="partners-logos">
              <a
                href="https://dwansys.com"
                target="_blank"
                rel="noopener noreferrer"
                className="partner-card partner-card-dark"
              >
                <img
                  src={Dwansys}
                  alt="Dwansys"
                />
              </a>


              <a
                href="https://adroittechsolution.com"
                target="_blank"
                rel="noopener noreferrer"
                className="partner-card partner-card-dark"
              >
                <img
                  src={Adroit}
                  alt="Adroit"
                />
              </a>


              <a
                href="https://www.gnaan.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="partner-card partner-card-dark"
              >
                <img
                  src={GnaanAI}
                  alt="GnaanAI"
                />
              </a>
            </div>
          </div>


        </div>
      </section>
    </div>
  );
};


export default Partners;