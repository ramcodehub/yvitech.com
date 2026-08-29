import "./ComplianceStandards.css"

const complianceGroups = [
  {
    icon: "bi-gear-wide-connected",
    title: <>Quality &<br />Operations</>,
    accent: "violet",
    standards: ["ISO 9001", "ISO 13485", "ISO 22000", "ISO 20000-1"],
  },
  {
    icon: "bi-cpu",
    title: <>Security<br />& AI</>,
    accent: "blue",
    standards: ["ISO 27001", "SOC 2", "GDPR", "ISO 42001"],
  },
  {
    icon: "bi-globe-americas",
    title: <>Sustainability<br />& Resilience</>,
    accent: "green",
    standards: ["ISO 14001", "ISO 45001", "ISO 50001", "ISO 22301"],
  },
  {
    icon: "bi-shield-check",
    title: <>Product<br />Compliance</>,
    accent: "cyan",
    standards: ["CE Marking", "HIPAA", "PCI DSS", "CCPA"],
  },
]

const ComplianceStandards = () => {
  return (
    <section className="container compliance-section" aria-labelledby="compliance-title">
      <div className="compliance-container">
        <div className="compliance-header">
          <span className="compliance-eyebrow">Governance, risk & compliance</span>
          <h2 id="compliance-title">Certifications & <span>Compliance Standards</span></h2>
          <p>Expert consulting and system integration for global certifications - one partner, every framework.</p>
        </div>

        <div className="compliance-grid">
          {complianceGroups.map((group) => (
            <article className={`compliance-card compliance-card--${group.accent}`} key={group.accent}>
              <div className="compliance-card__top">
                <div className="compliance-icon" aria-hidden="true"><i className={`bi ${group.icon}`} /></div>
                <h3>{group.title}</h3>
              </div>
              <div className="compliance-card__divider" />
              <div className="standards-list">
                {group.standards.map((standard, index) => (
                  <div className={`standard-item ${index === 1 || index === 3 ? "standard-item--strong" : ""}`} key={standard}>
                    {standard}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="awareness-bar">
          <div className="awareness-bar__icon" aria-hidden="true"><i className="bi bi-mortarboard-fill" /></div>
          <div className="awareness-bar__content">
            <h3>Security Awareness & Training</h3>
            <p>Information security awareness programs and custom training, mapped to role / job description.</p>
          </div>
          <i className="bi bi-arrow-up-right awareness-bar__arrow" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export default ComplianceStandards
