import "./SecurityAudits.css"

const auditServices = [
  {
    id: "vulnerability-assessments",
    icon: "bi-search",
    title: <>Vulnerability<br />Assessments</>,
    items: [
      "Continuous VA integrated with product lifecycle",
      "Priority reporting of high-impact issues",
      "Executive dashboards with real-time visibility",
    ],
  },
  {
    id: "penetration-testing",
    icon: "bi-bug",
    title: <>Penetration<br />Testing</>,
    items: [
      "CERT-IN empanelled team",
      "Full scoping & comprehensive pentesting",
    ],
  },
  {
    id: "secure-code-app-security",
    icon: "bi-shield-lock",
    title: <>Secure Code &<br />App Security</>,
    items: [
      "Secure code analysis",
      "Application security assessments",
    ],
  },
  {
    id: "mobile-app-va",
    icon: "bi-phone",
    title: <>Mobile App VA</>,
    items: [
      "Automated scanners for Android & iOS",
      "Binary code sufficient - no source sharing",
    ],
  },
  {
    id: "forensics-red-team",
    icon: "bi-search",
    title: <>Forensics &<br />Red Team</>,
    items: [
      "1st & 2nd level digital forensics",
      "Red team assessments",
    ],
  },
]

const SecurityAudits = () => {
  return (
    <section className="container security-audits" aria-labelledby="security-audits-title">
      <div className="security-audits__container">
        <div className="security-audits__header">
          <span className="security-audits__eyebrow">Security audits, VA/PT & forensics</span>
          <h2 id="security-audits-title">Find, fix, and prove it <span>- before attackers do.</span></h2>
        </div>

        <div className="security-audits__grid">
          {auditServices.map((service) => (
            <article className="security-audits__card" key={service.id}>
              <div className="security-audits__icon" aria-hidden="true"><i className={`bi ${service.icon}`} /></div>
              <h3>{service.title}</h3>
              <div className="security-audits__divider" />
              <ul>
                {service.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SecurityAudits
