import React from 'react'
import BannerThree from '../../Banner3/BannerThree'
import WhyChooseYVI from '../Components/WhyChoose/WhyChooseYVI'
import ContactUs from '../Components/ContactUS/ContactUs'
import './Salesforce.css'

const Salesforce = () => {
  const expertiseData = [
  {
    icon: "bi-lightning-charge-fill",
    title: "Salesforce Implementation",
    desc: "Seamlessly integrate Salesforce into your existing systems, ensuring a smooth transition.",
  },
  {
    icon: "bi-tools",
    title: "Customization",
    desc: "Tailor Salesforce to your specific business needs, optimizing efficiency and productivity.",
  },
  {
    icon: "bi-cloud-arrow-up-fill",
    title: "Migration",
    desc: "Migrate your data to Salesforce securely and efficiently.",
  },
  {
    icon: "bi-diagram-3-fill",
    title: "Integration",
    desc: "Connect Salesforce with other essential business applications for a unified platform.",
  },
  {
    icon: "bi-people-fill",
    title: "Consulting",
    desc: "Receive expert guidance on best practices, strategies, and optimization.",
  },
  ];
 const salesforce = [
  {
    icon: "bi-people",
    title: "Customer-Centric Approach",
    desc: "We prioritize your needs and goals, delivering solutions that align with your vision.",
  },
  {
    icon: "bi-stack",
    title: "Deep Salesforce Expertise",
    desc: "Our team possesses in-depth knowledge of Salesforce platforms and capabilities.",
  },
  {
    icon: "bi-trophy",
    title: "Proven Track Record",
    desc: "We have a history of successful Salesforce implementations for businesses of all sizes.",
  },
  {
    icon: "bi-lightbulb",
    title: "Innovation-Driven",
    desc: "We stay ahead of the curve by embracing the latest Salesforce trends and technologies.",
  },
  {
    icon: "bi-headset",
    title: "Dedicated Support",
    desc: "Our team is committed to providing ongoing support and assistance.",
  },
];

  return (
    <div>
      <BannerThree headingText='Elevate Your Business with 360-Degree Salesforce Solutions'
                    content="Are you ready to transform your business with the power of Salesforce?  YVI Tech offers comprehensive Salesforce implementation and consultation services designed to elevate your operations and drive growth."
                    videoName="Salesforce.mp4"/>
    <section className="container py-5">
        <div className="section-title">
                <p>Our Expertise</p>
            </div>
      <div className="container text-center">
        <div className="row g-4 justify-content-center">
          {expertiseData.map((item, index) => (
            <div className="col-md-4 " key={index}>
              <div className="card custom-card border-0 h-100 shadow">
                <div className="card-body text-start p-4">
                  <div className="iconn mb-3 ">
                    <i className={`bi ${item.icon}  fs-1 `}></i>
                  </div>
                  <h5 className="fw-semibold">{item.title}</h5>
                  <p className=" mb-0">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section> 
    <WhyChooseYVI features={salesforce}/>
    <ContactUs headingText='Talk to Us'
                   content="Leverage digital technologies to unlock new opportunities and drive innovation across all aspects of your organization."/>
    </div>
  )
}

export default Salesforce
