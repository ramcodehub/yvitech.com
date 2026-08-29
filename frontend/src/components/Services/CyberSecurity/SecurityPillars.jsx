import "./SecurityPillars.css"

const pillars = [
  {
    icon: "bi-headset",
    title: <>Managed Security<br />Services</>,
    items: [
      "End-to-end security & SOC-as-a-Service",
      "Remote monitoring by security experts",
      "24x7x365 incident response & L2 support",
    ],
  },
  {
    icon: "bi-search",
    title: <>Security Audits,<br />VAPT & Forensics</>,
    items: [
      "Security audits & vulnerability assessments",
      "Penetration testing & digital forensics",
      "Cloud security & compliance management",
    ],
  },
  {
    icon: "bi-shield-check",
    title: <>Consulting &<br />Advisory</>,
    items: [
      "Risk management & maturity assessment",
      "Implementation, auditing & certification",
      "End-to-end regulatory compliance",
    ],
  },
  {
    icon: "bi-layers",
    title: <>Security & Privacy<br />Engineering</>,
    items: [
      "Data governance & privacy by design",
      "Security architecture & config review",
      "Application security & secure code review",
    ],
  },
  {
    icon: "bi-mortarboard",
    title: <>Capacity<br />Building</>,
    items: [
      "Manpower & infrastructure enhancement",
      "Infosec project management",
      "vCISO & vDPO services",
    ],
  },
]

const SecurityPillars = () => {
  return (
    <section className="container security-pillars" aria-labelledby="security-pillars-title">
      <div className="security-pillars__container">
        <div className="security-pillars__header">
          <span className="security-pillars__eyebrow">Enterprise security & data management</span>
          <h2 id="security-pillars-title">
            All cybersecurity needs,<br />
            <span>one umbrella.</span>
          </h2>
          <p>The five pillars of enterprise delivery, complemented by robust Security and Compliance measures.</p>
        </div>

        <div className="security-pillars__grid">
          {pillars.map((pillar) => (
            <article className="security-card" key={pillar.icon}>
              <div className="security-card__icon" aria-hidden="true">
                <i className={`bi ${pillar.icon}`} />
              </div>
              <h3>{pillar.title}</h3>
              <div className="security-card__divider" />
              <ul>
                {pillar.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SecurityPillars
