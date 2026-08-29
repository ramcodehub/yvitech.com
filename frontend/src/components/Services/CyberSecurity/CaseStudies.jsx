import "./CaseStudies.css"

const caseStudies = [
  {
    id: "bpo-governance",
    category: "Case study - business process outsourcing",
    title: "Compliance-Driven IT Governance Modernization",
    subtitle: "Global BPO Services - Multi-Country Delivery",
    challenge: "A client-mandated SOC 2 deadline exposed fragmented access controls and no unified governance across 8 countries.",
    approach: "Unified Fusion HCM/ERP access model, change management, and centralized logging, mapped to SOC 2 trust criteria.",
    outcome: "Passed SOC 2 Type II with zero major findings, on the original deadline, across all delivery centers.",
    stats: [["0", "Major audit findings"], ["90%", "Fewer manual provisioning steps"], ["8", "Countries, one governance model"]],
  },
  {
    id: "oracle-cloud-security",
    category: "Case study - financial services",
    title: "Strengthening Security Across an Oracle Cloud Environment",
    subtitle: "Leading National Bank",
    challenge: "An untested Oracle Database/OCI environment risked a regulatory finding, with no formal patch cadence or ownership.",
    approach: "Assessed and hardened Oracle Database, Fusion ERP, and OCI, then stood up ongoing managed security operations.",
    outcome: "Resolved all critical findings and passed the next regulatory exam with zero security findings on Oracle.",
    stats: [["100%", "Critical/high findings resolved"], ["60%", "Faster patch deployment"], ["0", "Findings in next exam"]],
  },
  {
    id: "oracle-estate-audit",
    category: "Case study - regional banking & trust services",
    title: "Meeting Regulatory Audit Requirements Across the Oracle Estate",
    subtitle: "Trust Bank - Regulatory IS Audit Readiness",
    challenge: "A fixed regulatory audit date exposed segregation-of-duties conflicts and incomplete audit trails in Fusion and OCI.",
    approach: "Resolved SoD conflicts natively in Fusion, standardized audit trails, and enforced retention across Database and OCI.",
    outcome: "Passed the regulatory IS audit with no repeat findings, and a repeatable evidence process the client now owns.",
    stats: [["0", "Repeat findings from prior cycle"], ["100%", "SoD conflicts eliminated"], ["70%", "Faster evidence preparation"]],
  },
]

const CaseStudies = () => {
  return (
    <section className="container case-studies" aria-labelledby="case-studies-title">
      <div className="case-studies__container">
        <div className="case-studies__intro">
          <span className="case-studies__eyebrow">Proven results</span>
          <h2 id="case-studies-title">Security challenges.<br /><span>Measurable outcomes.</span></h2>
          <p>Real-world transformation delivered through security, governance, compliance, and managed technology expertise.</p>
        </div>

        <div className="case-studies__list">
          {caseStudies.map((study, index) => (
            <article className="case-study" key={study.id}>
              <div className="case-study__header">
                <div>
                  <span className="case-study__category">{study.category}</span>
                  <h3>{study.title}</h3>
                  <p className="case-study__subtitle">{study.subtitle}</p>
                </div>
                <div className="case-study__number">0{index + 1}</div>
              </div>

              <div className="case-study__content">
                <div className="case-study__block">
                  <div className="case-study__icon" aria-hidden="true"><i className="bi bi-exclamation-triangle" /></div>
                  <span className="case-study__label">Challenge</span>
                  <p>{study.challenge}</p>
                </div>
                <div className="case-study__block">
                  <div className="case-study__icon" aria-hidden="true"><i className="bi bi-layers" /></div>
                  <span className="case-study__label">YVI approach</span>
                  <p>{study.approach}</p>
                </div>
                <div className="case-study__block case-study__block--outcome">
                  <div className="case-study__icon" aria-hidden="true"><i className="bi bi-graph-up-arrow" /></div>
                  <span className="case-study__label">Outcome</span>
                  <p>{study.outcome}</p>
                </div>
              </div>

              <div className="case-study__stats">
                {study.stats.map(([value, label]) => (
                  <div className="case-study__stat" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
