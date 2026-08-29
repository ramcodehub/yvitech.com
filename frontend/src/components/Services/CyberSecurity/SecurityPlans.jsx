import "./SecurityPlans.css"

const plans = [
  { name: "Basic", className: "basic" },
  { name: "Pro", className: "pro" },
  { name: "Max", className: "max" },
]

const features = [
  { id: "soc-service", name: "SOC as a Service", basic: true, pro: true, max: true },
  { id: "shared-resources", name: "Shared Resources", basic: false, pro: true, max: true },
  { id: "dedicated-resources", name: "Dedicated Resources", basic: false, pro: true, max: true },
  { id: "soc-licenses", name: "Licenses for SOC", basic: true, pro: true, max: true },
  { id: "certification-support", name: "Compliance Certification Support", basic: true, pro: true, max: true },
  { id: "training-awareness", name: "Training & Awareness", basic: false, pro: true, max: true, highlighted: true },
  { id: "phishing-simulation", name: "Phishing Simulation", basic: false, pro: true, max: true },
  { id: "policy-development", name: "Policy & Procedures Development", basic: true, pro: true, max: true },
  { id: "vulnerability-management", name: "Vulnerability Management", basic: false, pro: true, max: true },
  { id: "periodic-audits", name: "Yearly & Periodic Audits", basic: false, pro: false, max: true },
  { id: "yearly-assessment", name: <>Yearly Assessment & Certification<br /><small>(ISO 27001, PCI DSS, SOC 1/2, NIST)</small></>, mobileName: "Yearly Assessment & Certification (ISO 27001, PCI DSS, SOC 1/2, NIST)", basic: false, pro: false, max: true },
  { id: "relationship-manager", name: "SPOC / Relationship Manager", basic: true, pro: true, max: true },
  { id: "vciso", name: "vCISO", basic: false, pro: false, max: true },
]

const PlanValue = ({ available }) => (
  <div className={`plan-value ${available ? "is-available" : "is-disabled"}`} aria-label={available ? "Included" : "Not included"}>
    <i className={`bi ${available ? "bi-check-lg" : "bi-dash-lg"}`} aria-hidden="true" />
  </div>
)

const SecurityPlans = () => (
  <section className="container security-plans" aria-labelledby="security-plans-title">
    <div className="security-plans__container">
      <div className="security-plans__header">
        <span className="security-plans__eyebrow">YVI Tech unified security stack</span>
        <h2 id="security-plans-title">Choose the plan that fits your <span>risk profile</span></h2>
      </div>

      <div className="plans-table">
        <div className="plans-row plans-row--header">
          <div className="plans-feature-header">Plan / SLA</div>
          {plans.map((plan) => (
            <div className={`plans-plan-header ${plan.className}`} key={plan.name}>
              <span>{plan.name}</span>
              {plan.name === "Pro" && <small>MOST POPULAR</small>}
            </div>
          ))}
        </div>
        {features.map((feature) => (
          <div className={`plans-row ${feature.highlighted ? "plans-row--highlighted" : ""}`} key={feature.id}>
            <div className="plans-feature">{feature.name}</div>
            <PlanValue available={feature.basic} />
            <PlanValue available={feature.pro} />
            <PlanValue available={feature.max} />
          </div>
        ))}
      </div>

      <div className="plans-mobile">
        {plans.map((plan) => (
          <div className={`mobile-plan-card ${plan.className}`} key={plan.name}>
            <div className="mobile-plan-card__header">
              <span>{plan.name}</span>
              {plan.name === "Pro" && <small>MOST POPULAR</small>}
            </div>
            <div className="mobile-plan-card__body">
              {features.map((feature) => {
                const available = feature[plan.className]
                return <div className="mobile-feature" key={feature.id}><span className="mobile-feature__name">{feature.mobileName || feature.name}</span><i className={`bi ${available ? "bi-check-lg mobile-check" : "bi-dash-lg mobile-dash"}`} aria-hidden="true" /></div>
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default SecurityPlans
