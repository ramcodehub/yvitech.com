import BannerThree from "../../Banner3/BannerThree"
import ComplianceStandards from "./ComplianceStandards"
import CaseStudies from "./CaseStudies"
import CybersecurityDetails from "./CybersecurityDetails"
import EndpointProtection from "./EndpointProtection"
import ManagedSecurityServices from "./ManagedSecurityServices"
import SecurityAudits from "./SecurityAudits"
import SecurityPlans from "./SecurityPlans"
import SecurityPillars from "./SecurityPillars"
import TechnologyPartners from "./TechnologyPartners"
import "./CyberSecurity.css"

const principles = [
  {
    title: "Security-first delivery",
    description: "Protection built into every stage, not bolted on after.",
  },
  {
    title: "AI & data-driven solutions",
    description: "Decisions grounded in data, accelerated by AI.",
  },
  {
    title: "Partner-led execution",
    description: "Senior hands on the work, not just the pitch.",
  },
  {
    title: "Governance & compliance",
    description: "Built to withstand scrutiny, at every scale.",
  },
]

const CyberSecurity = () => {
  return (
    <main className="cyber-security-page">
      <BannerThree
        headingText="Cyber Security"
        content="Enterprise cybersecurity, privacy, and compliance - One stop solution for all Enterprise Compliance, Cloud, Security & AI"
        videoName="CyberSecurityServices.mp4"
      />

      <section className="cyber-profile cyber-profile--light" aria-labelledby="cyber-profile-title">
        <div className="cyber-profile__grain" aria-hidden="true" />

        <header className="cyber-profile__header">
          <div className="cyber-profile__brand">
            {/* <div className="cyber-profile__mark" aria-hidden="true">Y</div> */}
            <div>
              <p className="cyber-profile__brand-name">YVI Technologies</p>
              <p className="cyber-profile__brand-sub">Consulting built for the AI era</p>
            </div>
          </div>
          <div className="cyber-profile__stat">
            <p className="cyber-profile__stat-number">150+</p>
            <p className="cyber-profile__stat-label">Years of collective<br />team experience</p>
          </div>
        </header>

        <p className="cyber-profile__strapline" id="cyber-profile-title">
          A next-generation technology consulting firm helping businesses unlock growth through <strong>digital transformation, AI, and data-driven solutions</strong> - backed by a core team with deep, cross-industry experience.
        </p>

        {/* <div className="cyber-profile__vision-mission">
          <article className="cyber-profile__column">
            <p className="cyber-profile__eyebrow">Our vision</p>
            <h2>A leading global consulting firm.</h2>
            <p className="cyber-profile__body">Built by prioritizing what truly matters to our clients, above everything else.</p>
          </article>
          <article className="cyber-profile__column">
            <p className="cyber-profile__eyebrow">Our mission</p>
            <h2>Software built around your goals.</h2>
            <p className="cyber-profile__body">We partner with clients to deliver efficient, agile software and data solutions.</p>
          </article>
        </div> */}

        <div className="cyber-profile__drives">
          <div className="cyber-profile__drives-head">
            <p className="cyber-profile__eyebrow">What drives us</p>
            <p className="cyber-profile__count">04 principles</p>
          </div>
          <div className="cyber-profile__trace">
            {principles.map((principle) => (
              <article className="cyber-profile__pillar" key={principle.title}>
                <span className="cyber-profile__node" aria-hidden="true" />
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>

        <hr />
        <p className="cyber-profile__strapline" id="cybersecurity-profile-title">
          All comprehensive <strong>Enterprise cybersecurity solutions</strong> within a single framework.<br/> YVITECH brings managed security, audits, compliance, and consulting together into a single accountable partner - so your team can focus on the business, not the breach.
        </p>

        <div className="cyber-profile__vision-mission">
          <article className="cyber-profile__column">
            <p className="cyber-profile__eyebrow">Our approach</p>
            <h2>Aligned end to end.</h2>
            <p className="cyber-profile__body">People, processes, and technology aligned to protect your enterprise IT environment end to end.</p>
          </article>
          <article className="cyber-profile__column">
            <p className="cyber-profile__eyebrow">Our promise</p>
            <h2>Protection that pays for itself.</h2>
            <p className="cyber-profile__body">Superior protection and rapid response - reducing risk while you focus on your business.</p>
            <div className="cyber-profile__promise-stat">
              <p className="cyber-profile__promise-number">~50%</p>
              <p className="cyber-profile__promise-label">Lower cost than building and running an equivalent in-house security team.</p>
            </div>
          </article>
        </div>

        <footer className="cyber-profile__footer">
          <p>YVI TECH <span aria-hidden="true">|</span> Cyber Security</p>
          <p className="cyber-profile__status"><span aria-hidden="true" /> System secure</p>
        </footer>
      </section>

      <ComplianceStandards />
      <SecurityPillars />
      <ManagedSecurityServices />
      
      <SecurityAudits />
      <CybersecurityDetails />
      <SecurityPlans />
      <TechnologyPartners />
      <EndpointProtection />
      <CaseStudies />
    </main>
  )
}

export default CyberSecurity
