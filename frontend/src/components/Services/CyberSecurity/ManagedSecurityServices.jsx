import "./ManagedSecurityServices.css"

const services = [
  {
    icon: "bi-headset",
    title: "SOC-as-a-Service",
    items: [
      "Remote & continuous monitoring by security experts",
      "24x7x365 surveillance & incident response",
      "All software & monitoring tool licenses included",
      "SLAs - High: 15 min - Medium: 30 min - Low: 2 hr.",
      "Tools such as EDR, SIEM, SOAR, FIREWALLS & NEXTGEN FIREWALLS, IDS, IPS.",
    ],
  },
  {
    icon: "bi-person-badge",
    title: "vCISO Services",
    items: [
      "Highly experienced, qualified CISO on-demand",
      "Strategic risk & compliance leadership",
      "Vast institutional knowledge at a fraction of the cost",
    ],
  },
  {
    icon: "bi-people-fill",
    title: "Cybersecurity Staffing",
    items: [
      "Functions as your internal security team",
      "On-premise deployment of trained staff where needed",
      "End-to-end security services & solutions",
    ],
  },
]

const ManagedSecurityServices = () => (
  <section className="container managed-security" aria-labelledby="managed-security-title">
    <div className="managed-security__container">
      <div className="managed-security__header">
        <span className="managed-security__eyebrow">Managed security services</span>
        <h2 id="managed-security-title">Your extended security operations team</h2>
      </div>

      <div className="managed-security__grid">
        {services.map((service) => (
          <article className="managed-security__card" key={service.title}>
            <div className="managed-security__icon" aria-hidden="true"><i className={`bi ${service.icon}`} /></div>
            <h3>{service.title}</h3>
            <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default ManagedSecurityServices
