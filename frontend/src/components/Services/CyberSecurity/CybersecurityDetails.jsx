import "./CybersecurityDetails.css"

const environmentItems = [
  ["bi-people", "People, 3rd parties, policies & processes"],
  ["bi-diagram-3", "API integrations & user interfaces"],
  ["bi-database", "Databases & file systems"],
  ["bi-window", "Web & mobile applications"],
  ["bi-cloud", "Cloud, network & communication"],
  ["bi-geo-alt", "Physical locations"],
]

const valueItems = [
  ["bi-bullseye", "Strategy"],
  ["bi-shield-check", "Protect"],
  ["bi-search", "Monitor"],
  ["bi-check-circle", "Certify"],
  ["bi-mortarboard", "Educate"],
  ["bi-diagram-3", "Comply"],
  ["bi-file-earmark-text", "Audit"],
  ["bi-arrow-repeat", "Incident management"],
]

const deliveryCards = [
  {
    icon: "bi-layers",
    title: "Security architecture & consulting",
    items: ["Controls consulting & assessment", "Security architecture review & config"],
  },
  {
    icon: "bi-server",
    title: "SOC turnkey projects",
    items: ["Setting up Security Operations Centres", "Greenfield IT & security infrastructure projects", "Annual maintenance contracts, incl. staffing"],
  },
  {
    icon: "bi-mortarboard",
    title: "Capacity building",
    items: ["Custom cybersecurity training & upskilling, mapped to role", "Manpower & infrastructure enhancement"],
  },
]

const timelineItems = [
  ["bi-check2-square", "Planning", "Scope, discovery, gap analysis, objectives & security assessments."],
  ["bi-server", "Execution", "Build, configure & deploy against plan."],
  ["bi-arrow-repeat", "Monitoring & control", "Track progress, risk & quality continuously."],
  ["bi-file-earmark-text", "Closure & audit", "Formal sign-off, documentation & audit."],
]

const comparisonRows = [
  ["1-2 individuals", "Team of 20+ industry-vertical specialists"],
  ["15 years combined experience", "150+ years collective team experience"],
  ["4-5 certifications, max", "15+ industry-standard certifications"],
  ["Additional VAPT / audit services still need outsourcing", "One-stop solution for security, compliance & privacy"],
]

const advantageItems = [
  ["bi-lightning-charge", "Advanced technology"],
  ["bi-bar-chart", "Manage risk & compliance"],
  ["bi-arrow-repeat", "Rapid response"],
  ["bi-shield-check", "Superior protection"],
  ["bi-currency-dollar", "Reduced costs"],
  ["bi-bullseye", "Focus on your business"],
]

const IconChip = ({ icon }) => (
  <span className="cyber-details__icon-chip" aria-hidden="true"><i className={`bi ${icon}`} /></span>
)

const CybersecurityDetails = () => {
  return (
    <div className="container cyber-details">
      <section className="container cyber-details__section" aria-labelledby="cyber-approach-title">
        <div className="cyber-details__eyebrow">Our approach</div>
        <h2 id="cyber-approach-title">Cybersecurity is a business function, not an issue fixed by IT</h2>
        <p className="cyber-details__lede">YVI Tech, together with you, adds value across your people, processes, and technology.</p>

        <div className="cyber-details__two-column">
          <div>
            <div className="cyber-details__sub-eyebrow">Enterprise IT environment</div>
            <div className="cyber-details__pill-list">
              {environmentItems.map(([icon, label]) => <div className="cyber-details__pill-row" key={label}><IconChip icon={icon} /><span>{label}</span></div>)}
            </div>
          </div>
          <div>
            <div className="cyber-details__sub-eyebrow">How we add value</div>
            <div className="cyber-details__pill-grid">
              {valueItems.map(([icon, label]) => <div className="cyber-details__pill-card" key={label}><IconChip icon={icon} /><span>{label}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="cyber-details__section" aria-labelledby="cyber-engineering-title">
        <div className="cyber-details__eyebrow">Security engineering & capacity building</div>
        <h2 id="cyber-engineering-title">Build it right, then build the team to run it</h2>

        <div className="cyber-details__two-column">
          <div>
            {deliveryCards.map((card) => <article className="cyber-details__stack-card" key={card.title}>
              <div className="cyber-details__stack-head"><IconChip icon={card.icon} /><strong>{card.title}</strong></div>
              <ul>{card.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>)}
          </div>
          <div className="cyber-details__timeline-panel">
            <div className="cyber-details__eyebrow">End-to-end project management</div>
            <p className="cyber-details__timeline-lede">Infosec project management, delivered as one continuous program.</p>
            <div className="cyber-details__timeline">
              {timelineItems.map(([icon, title, description]) => <div className="cyber-details__timeline-item" key={title}>
                <IconChip icon={icon} /><div><strong>{title}</strong><p>{description}</p></div>
              </div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="cyber-details__section" aria-labelledby="cyber-advantage-title">
        <div className="cyber-details__eyebrow">The YVI Tech advantage</div>
        <h2 id="cyber-advantage-title">Enterprise-grade security, at roughly half the cost</h2>

        <div className="cyber-details__two-column cyber-details__advantage-grid">
          <div className="cyber-details__compare">
            <div className="cyber-details__compare-row">
              <div className="cyber-details__compare-cell"><strong>Internal security team</strong></div>
              <div className="cyber-details__compare-cell cyber-details__compare-cell--highlight"><strong>YVI Tech as a service</strong></div>
            </div>
            {comparisonRows.map(([internal, yvi]) => <div className="cyber-details__compare-row" key={internal}>
              <div className="cyber-details__compare-cell">{internal}</div>
              <div className="cyber-details__compare-cell cyber-details__compare-cell--highlight">{yvi}</div>
            </div>)}
          </div>
          <div className="cyber-details__value-grid">
            {advantageItems.map(([icon, label]) => <div className="cyber-details__value-card" key={label}><IconChip icon={icon} /><span>{label}</span></div>)}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CybersecurityDetails
