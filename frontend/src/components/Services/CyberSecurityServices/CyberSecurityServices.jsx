import BannerThree from "../../Banner3/BannerThree"
import CyberSecurityApproach from "../Components/CyberSecurityApproach/CyberSecurityApproach"



const highlights = [
  {
    title: "24/7 Threat Monitoring",
    icon: "bi-shield-check",
    desc: "Continuous surveillance across endpoints, networks, and cloud workloads.",
  },
  {
    title: "AI/ML-Powered Detection",
    icon: "bi-cpu",
    desc: "Identifies sophisticated attack patterns, insider threats, and zero-day exploits.",
  },
  {
    title: "Rapid Incident Response",
    icon: "bi-lightning-charge",
    desc: "Automated containment and remediation workflows to minimize downtime.",
  },
  {
    title: "Threat Intelligence Integration",
    icon: "bi-globe",
    desc: "Global feeds and contextual analytics for proactive defence.",
  },
];



const CyberSecurityServices = () => {
  return (
    <>
        <BannerThree headingText='Secure. Detect. Respond. Transform.' 
                    content="In today’s hyper-connected digital ecosystem, cyber threats are evolving faster than ever. YVI Technologies delivers intelligent, scalable, and proactive cybersecurity solutions that protect enterprises from emerging threats while enabling secure digital transformation.
                             We combine AI-driven security, deep domain expertise, and global delivery models to safeguard your business across cloud, applications, infrastructure, and data."
                    videoName='CyberSecurityServices.mp4'/>
        <CyberSecurityApproach/>

         <div className="container py-5 mdr-section">
      <h2 className="mb-4">Key Highlights of YVI MDR Services</h2>

      <div className="row g-4">
        {highlights.map((item, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="mdr-card">
              <i className={`bi ${item.icon} mdr-icon`}></i>
              <h6>{item.title}</h6>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}   

export default CyberSecurityServices