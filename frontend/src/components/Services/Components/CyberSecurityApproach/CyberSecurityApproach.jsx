import "./CyberSecurityApproach.css";

const features = [
  {
    title: "PREDICTIVE DEFENSE",
    icon: "bi-rocket-takeoff",
    desc: "AI-powered threat intelligence & forecasting",
  },
  {
    title: "ZERO TRUST ARCHITECTURE",
    icon: "bi-lock",
    desc: "Never trust, always verify",
  },
  {
    title: "TOTAL VISIBILITY",
    icon: "bi-eye",
    desc: "24/7 SOC & real-time continuous monitoring",
  },
  {
    title: "AI ANALYSIS",
    icon: "bi-cpu",
    desc: "AI-driven MDR for continuous cyber resilience",
  },
  {
    title: "RAPID RESPONSE",
    icon: "bi-lightning-charge",
    desc: "Automated incident detection & containment",
  },
  {
    title: "RESILIENCE ENGINEERING",
    icon: "bi-arrow-repeat",
    desc: "Business continuity & disaster recovery",
  },
  {
    title: "VAPT",
    icon: "bi-search",
    desc: "Vulnerability Assessment & Penetration Testing",
  },
  {
    title: "IT SECURITY",
    icon: "bi-server",
    desc: "Comprehensive infrastructure & application security",
  },
];

export default function CyberSecurityApproach() {
  return (
    <div className="cyber-sec-app container py-5">
      <h2 className="section-title mb-1">
        Our Cyber Security Approach
      </h2>

      <div className="row g-4">
        {features.map((item, index) => (
          <div key={index} className="col-lg-4 col-md-3 col-6">
            <div className="card-custom">

              {/* Default Content */}
              <i className={`bi ${item.icon} icon`}></i>
              <div className="card-title">{item.title}</div>

              {/* Popup Content */}
              <div className="card-hover">
                {item.desc}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}