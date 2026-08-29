import crowdstrikeLogo from "../../../assets/img/cyber-security/Technology-partners/crowdstrike.png"
import fortinetLogo from "../../../assets/img/cyber-security/Technology-partners/Fortinet.png"
import paloAltoLogo from "../../../assets/img/cyber-security/Technology-partners/palalto-logo.jpg"
import zscalerLogo from "../../../assets/img/cyber-security/Technology-partners/Zscaler.jpg"
import trendMicroLogo from "../../../assets/img/cyber-security/Technology-partners/trendmicro.png"
import sophosLogo from "../../../assets/img/cyber-security/Technology-partners/sophos.png"
import sentinelOneLogo from "../../../assets/img/cyber-security/Technology-partners/sentinel-logo.png"
import "./EndpointProtection.css"

const endpointPartners = [
  {
    name: "CrowdStrike",
    logo: crowdstrikeLogo,
    logoClass: "crowdstrike",
    description: "Cloud-native platform utilizes AI and threat intelligence to identify and neutralize cyber threats, safeguarding digital infrastructure.",
  },
  {
    name: "Fortinet",
    logo: fortinetLogo,
    logoClass: "fortinet",
    description: "Offers a broad range of cybersecurity solutions including next-generation firewalls, secure access, cloud security, endpoint protection and threat intelligence, boosting security and reducing complexity.",
  },
  {
    name: "Palo Alto Networks",
    logo: paloAltoLogo,
    logoClass: "palo-alto",
    description: "Provides next-generation firewalls, cloud security and threat detection tools for comprehensive cybersecurity.",
  },
  {
    name: "Zscaler",
    logo: zscalerLogo,
    logoClass: "zscaler",
    description: "Provides secure internet and cloud application access by routing traffic through their security stack, reducing hardware reliance.",
  },
  {
    name: "Trend Micro",
    logo: trendMicroLogo,
    logoClass: "trend-micro",
    description: "Delivers threat detection, antivirus, network and cloud security solutions for robust defence.",
  },
  {
    name: "Sophos",
    logo: sophosLogo,
    logoClass: "sophos",
    description: "Provides antivirus, firewalls, endpoint protection and threat detection to defend organizations' digital assets.",
  },
  {
    name: "SentinelOne",
    logo: sentinelOneLogo,
    logoClass: "sentinelone",
    description: "Specializes in AI-driven endpoint protection, delivering real-time threat detection and autonomous response to prevent, predict, and recover from attacks.",
  },
]

const EndpointProtection = () => (
  <section className="container endpoint-protection" aria-labelledby="endpoint-protection-title">
    <div className="endpoint-protection__container">
      <div className="endpoint-protection__header">
        <span className="endpoint-protection__eyebrow">Technology partners</span>
        <h2 id="endpoint-protection-title">Security &amp; Endpoint Protection</h2>
        <p>Best-of-breed security platforms powering our managed services.</p>
      </div>

      <div className="endpoint-protection__grid">
        {endpointPartners.map((partner) => (
          <article className={`endpoint-card endpoint-card--${partner.logoClass}`} key={partner.name}>
            <div className="endpoint-card__logo-wrapper">
              <img className="endpoint-card__logo" src={partner.logo} alt={`${partner.name} logo`} />
            </div>
            <div className="endpoint-card__content">
              <p>{partner.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default EndpointProtection