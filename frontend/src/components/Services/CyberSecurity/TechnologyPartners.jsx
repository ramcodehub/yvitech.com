import microsoftLogo from "../../../assets/img/cyber-security/Technology-partners/microsoft-logo.webp"
import redHatLogo from "../../../assets/img/cyber-security/Technology-partners/redhat.png"
import vmwareLogo from "../../../assets/img/cyber-security/Technology-partners/Vmware-logo.png"
import dellLogo from "../../../assets/img/cyber-security/Technology-partners/dell-logo.png"
import manageEngineLogo from "../../../assets/img/cyber-security/Technology-partners/Manageengine.png"
import veeamLogo from "../../../assets/img/cyber-security/Technology-partners/veeam.png"
import veritasLogo from "../../../assets/img/cyber-security/Technology-partners/veritas.png"
import awsLogo from "../../../assets/img/cyber-security/Technology-partners/aws.png"
import googleCloudLogo from "../../../assets/img/cyber-security/Technology-partners/google-cloud.jpg"
import "./TechnologyPartners.css"

const partners = [
  {
    name: "Microsoft",
    logo: microsoftLogo,
    description: "Operating systems, Office 365, Azure cloud, and enterprise apps, supporting diverse IT needs.",
  },
  {
    name: "Red Hat",
    logo: redHatLogo,
    description: "Enterprise Linux and OpenShift, facilitating IT modernization, automation and streamlining.",
  },
  {
    name: "VMware",
    logo: vmwareLogo,
    description: "Virtualization and cloud computing with solutions like vSphere, NSX, vSAN and cloud services to enhance scalability and agility.",
  },
  {
    name: "AWS",
    logo: awsLogo,
    description: "Scalable cloud services for computing, storage, databases and AI, enabling global innovation and growth.",
  },
  {
    name: "Google Cloud",
    logo: googleCloudLogo,
    description: "Web search, advertising, cloud computing, Google Cloud Platform and G Suite productivity tools.",
  },
  {
    name: "Dell",
    logo: dellLogo,
    description: "Supplies hardware, software and IT services globally, including PCs, servers, storage and networking solutions.",
  },
  {
    name: "ManageEngine",
    logo: manageEngineLogo,
    description: "Delivers IT management and security solutions for servers, networks, endpoints, and SIEM, optimizing operations and security.",
  },
  {
    name: "VEEAM",
    logo: veeamLogo,
    description: "Offers backup, recovery and cloud data management solutions to ensure data protection across virtual, physical, and cloud environments.",
  },
  {
    name: "VERITAS",
    logo: veritasLogo,
    description: "Specializes in data management, backup, recovery, archiving, cloud data, and info governance for organizational data security.",
  },
]

const TechnologyPartners = () => (
  <section className="container technology-partners" aria-labelledby="technology-partners-title">
    <div className="technology-partners__container">
      <div className="technology-partners__header">
        <span className="technology-partners__eyebrow">Technology partners</span>
        <h2 id="technology-partners-title">Cloud, Infrastructure &amp; Data Management</h2>
        <p>Enterprise platforms we deploy, manage, and secure for our clients.</p>
      </div>

      <div className="technology-partners__grid">
        {partners.map((partner) => (
          <article className="technology-partner" key={partner.name}>
            <div className="technology-partner__scrim" aria-hidden="true" />
            {partner.logo && <img className="technology-partner__logo" src={partner.logo} alt="" aria-hidden="true" />}
            <div className="technology-partner__content">
              <h3>{partner.name}</h3>
              <p>{partner.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default TechnologyPartners
