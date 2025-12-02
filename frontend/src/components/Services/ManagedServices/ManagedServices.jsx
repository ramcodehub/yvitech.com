import React from 'react'
import BannerThree from '../../Banner3/BannerThree'
import OracleExpandableCard from '../Components/ExpandableCard/OracleExpandableCard'
import image from '../../../assets/img/managedservices.png'
import ContactUs from '../Components/ContactUS/ContactUs'
import WhyChooseYVI from '../Components/WhyChoose/WhyChooseYVI'

const ManagedServices = () => {
  const features = [
    {
      icon: "bi-shield-check",
      title: "Proactive, not reactive",
      desc: "Issues are prevented, not just fixed.",
    },
    {
      icon: "bi-arrows-expand",
      title: "Flexible & scalable",
      desc: "Adjust services as your business evolves.",
    },
    {
      icon: "bi-graph-up",
      title: "Optimized costs",
      desc: "Better efficiency and license management.",
    },
    {
      icon: "bi-lightning-charge",
      title: "Enhanced performance",
      desc: "Faster, more reliable Oracle operations.",
    },
    {
      icon: "bi-people",
      title: "Local accountability",
      desc: "Dedicated service delivery managers.",
    },
  ];
  return (
    <div className='d-flex flex-column mb-5' style={{gap:'4rem'}}>
      <BannerThree headingText='YVI Tech Managed Services'
                    content="Empowering Your Oracle Ecosystem — Smarter, Stronger, Simplified. Partnering with you to optimize performance, enhance user experience, and ensure lasting success."
                    videoName="managedservices.mp4"/>
      <div className="d-flex  container overview gap-5">
      <div className="d-flex flex-column align-items-start gap-3">
        <h1 className="fw-500">Unlock the Full Potential of Your Oracle Applications</h1>
        <p className="text-start">YVI Tech delivers end-to-end <strong>Oracle Managed Services</strong> to help you <b>Support, Maintain, and Enhance</b> your Oracle environment — ensuring performance, scalability, and long-term business value.<br/>
        With global delivery teams across <b>United Arab Emirates, and Asia Pacific,</b> we combine <b>Local expertise</b> with worldwide reach, so your Oracle systems stay optimized, secure, and future-ready.</p>
      </div>
      <img src={image} className="rounded-4" />
    </div>
    <WhyChooseYVI features={features}/>
      <div className="container  aos-init aos-animate" data-aos="fade-up">
            <div className="section-title">
                <h2>Our Service</h2>
                <p>Portfolio</p>
            </div>
        <OracleExpandableCard/>
      </div>   
      <div className="container mt-4">
      <h2 className="fw-bolder">Quality You Can Trust</h2>
      <p className="mt-3 fs-5">
      Every service engagement follows YVI Tech’s <b>ITIL 4–aligned governance model</b>, ensuring <b>Consistency</b>, <b>Transparency</b>, and <b>Accountability</b> across all environments — cloud, on-premises, or hybrid.
      </p>
    </div>
      <div className="container aos-init aos-animate" data-aos="fade-up">
            <div className="section-title">
                <h2>Success stories</h2>
                <p>clients</p>
            </div>
            <div className='success-stories' style={{marginRight:'5rem'}}>
              <p className='text-center p-0 m-0  fs-5'><i>"Reduced costs by ~50% and improved performance by up to 40% after moving to YVI Tech Managed Services."</i></p>
              <p className='fw-medium fs-4 text-end'>-OLV</p>
            </div>
        
      </div>    
      <ContactUs headingText='Let’s Transform Your Oracle Experience'
                   content="Partner with YVI Tech to modernize, streamline, and future-proof your Oracle ecosystem.📩 Contact us today to request our Managed Services Overview Datasheet or to schedule a system assessment."/>
    </div>
  )
}

export default ManagedServices
