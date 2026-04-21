import BannerThree from "../../Banner3/BannerThree"
import CyberSecurityApproach from "../Components/CyberSecurityApproach/CyberSecurityApproach"
import TableCard from "../Components/TableCard/TableCard"
import data1 from "../../../data/cyberSecData"
import { InfoCardsSection } from "../Components/SectionComponents/SectionComponents"
import { RisksSection } from "../Components/SectionComponents/SectionComponents"
import "./CyberSecurityServices.css";
import ImageTextSection from "../Components/ImageTextSection/ImageTextSection"
import { corecyberservices } from '../../../data/corecyberservices'
import CyberServices from '../Components/CyberServices/CyberServices'
import CardFive from '../Components/Card5/CardFive'
import { carddata } from '../../../data/carddata'
import {cardsixdata} from '../../../data/cardsixdata'
import CardSix from '../Components/Card6/CardSix'
import { yvimdrservicesdata } from '../../../data/yvimdrservicesdata'
import { humanexpertisedata } from '../../../data/humanexpertisedata'
import { yvivaptservicesdata } from '../../../data/yvivaptservicesdata'
import { benefitsdata } from '../../../data/benefitsdata'
import { maturityData } from '../../../data/maturityData'
import MaturityTimeLine from '../Components/MaturityTimeLine/MaturityTimeLine'
import image3 from '../../../assets/img/technology-ecosystem.png'
import ContactUs from "../Components/ContactUs/ContactUs"
import image1 from '../../../assets/img/cybersecurity1.png'
import image2 from '../../../assets/img/cybersecurity2.png'

const headers1 = ["Feature", "YVI Advantages"];

const tableData1 = [
  {
    col1: "Threat Detection",
    col2: "AI/ML predictive analytics",
  },
  {
    col1: "Incident Response",
    col2: "Automated SOAR workflows",
  },
  {
    col1: "Network Management",
    col2: "Scalable, proactive maintenance",
  },
  {
    col1: "Compliance",
    col2: "ISO, GDPR, Indian regulatory alignment",
  },
  {
    col1: "Commercial Model",
    col2: "Flexible subscription/pay-per-use",
  },
];

const headers2 = ["Feature", "YVR MDR Advantage"];

const tableData2 = [
  {
    col1: "Detection Speed",
    col2: "AI-driven, near real-time",
  },
  {
    col1: "Response",
    col2: "Automated SOAR + expert triage",
  },
  {
    col1: "Coverage",
    col2: "Endpoints, networks, cloud",
  },
  {
    col1: "Compliance",
    col2: "ISO, GDPR, HIPAA, Indian laws",
  },
  {
    col1: "Scalability",
    col2: "SMBs to large enterprises",
  },
];

const headers3 = ["Sector", "VAPT Advantage"];

const tableData3 = [
  {
    col1: "Financial Services",
    col2: "PCI DSS compliance, fraud detection, secure transactions",
  },
  {
    col1: "Manufacturing",
    col2: "Protects proprietary data, ensures confidentiality",
  },
  {
    col1: "Healthcare",
    col2: "HIPAA-compliant testing, safeguards sensitive patient data",
  },
  {
    col1: "Government",
    col2: "Data sovereignty compliance (SEBI, IRDAI, GDPR, DPDPA)",
  },
];

const headers4 = ["Risk", "YVI Solution"];

const tableData4 = [
  {
    col1: "Rising Cyberattacks",
    col2: "NGFWs + AI-driven detection",
  },
  {
    col1: "Regulatory Compliance",
    col2: "ISO 27001, GDPR, HIPAA frameworks",
  },
  {
    col1: "Data Breaches",
    col2: "DLP + Zero Trust",
  },
  {
    col1: "Hybrid/Cloud Risks",
    col2: "VPN + Cloud-native security",
  },
];

const useCases = {
  title: "Industry-Specific Cyber Security Focus",
  items: [
    {
      heading: "Healthcare",
      points: [
        "HIPAA-compliant data protection",
        "Secure clinical systems & patient data",
      ],
    },
    {
      heading: "Banking & Financial Services",
      points: [
        "Fraud detection & secure transactions",
        "Regulatory compliance",
      ],
    },
    {
      heading: "Retail & E-commerce",
      points: [
        "Payment security & fraud prevention",
        "Customer data protection",
      ],
    },
    {
      heading: "Energy & Utilities",
      points: [
        "Critical infrastructure protection",
        "OT/SCADA security",
      ],
    },
    {
      heading: "Government & Smart Cities",
      points: [
        "Secure digital governance platforms",
        "Surveillance & cyber intelligence",
      ],
    },
  ],
};


const CyberSecurityServices = () => {
  return (
    < div className="cyber-security-services" >
        <BannerThree headingText='Secure. Detect. Respond. Transform.' 
                    content="In today’s hyper-connected digital ecosystem, cyber threats are evolving faster than ever. YVI Technologies delivers intelligent, scalable, and proactive cybersecurity solutions that protect enterprises from emerging threats while enabling secure digital transformation.
                             We combine AI-driven security, deep domain expertise, and global delivery models to safeguard your business across cloud, applications, infrastructure, and data."
                    videoName='CyberSecurityServices.mp4'/>
        <CyberSecurityApproach/>
        <div className="container">
          <CyberServices Services={corecyberservices.props.Services} />
        </div>
        <CardFive data={carddata}/>
        <div className="container bg-white rounded-2xl shadow-md py-4">
          <h2 className="text-2xl fw-bold text-gray-800 mb-3">
            Expert Team
          </h2>

          <ul className="space-y-3 d-flex flex-column expert gap-2 list-unstyled text-gray-600 ps-2">
            <li className="flex items-start gap-3" >
              <i className="bi bi-check2-circle text-green-600 text-lg me-2"></i>
              Certified cybersecurity specialists, network engineers, and AI experts.
            </li>

            <li className="flex items-start gap-3 ">
              <i className="bi bi-check2-circle text-green-600 text-lg me-2"></i>
              Decades of experience in managing complex IT environments.
            </li>

            <li className="flex items-start gap-3 ">
              <i className="bi bi-check2-circle text-green-600 text-lg me-2"></i>
              Personalized, client-centric approach—acting as an extension of your team.
            </li>
          </ul>
        </div>
        <InfoCardsSection {...data1.commercialModels} />
        <TableCard
          title="Why YVI Cyber Security Stands Out"
          headers={headers1}
          data={tableData1}
        />
        <RisksSection {...data1.risksAndConsiderations1} />
         <CardFive data={yvimdrservicesdata}/>
         <CardFive data={humanexpertisedata}/>
        <TableCard
          title="Why MDR Matters"
          headers={headers2}
          data={tableData2}
        />
        <InfoCardsSection {...data1.flexibleEngagementModels} />
        <RisksSection {...data1.risksAndConsiderations2} />
        <CardSix data={yvivaptservicesdata.props}/>
        <CardFive data={benefitsdata}/>

        <TableCard
          title="Industry-Specific Focus"
          headers={headers3}
          data={tableData3}
        />
        <InfoCardsSection {...data1.whyYVIStandsOut} />
        <RisksSection {...data1.risksAndConsiderations3} />
        <CardSix data={cardsixdata.props}/>
        <TableCard
          title="Why IT Security Matters"
          headers={headers4}
          data={tableData4}
        />
        <InfoCardsSection {...data1.yviAdvantage} />
        <RisksSection {...data1.risksAndConsiderations4} />

        <div className="container" >
          <ImageTextSection
          image={image1}
          heading="AI-Powered Cyber Security"
          description="YVI leverages Artificial Intelligence and Machine Learning to enhance security posture, enabling proactive threat management and intelligent automation."
          imageLeft={true}
          points={[
            "Detect anomalies in real-time",
            "Predict potential threats before impact",
            "Automate threat response",
            "Reduce false positives by up to 60%",
          ]}
        />
        </div>
        <section className="py-4">
        <div className="container">
          <h2 className="text-start fw-bold mb-3">{useCases.title}</h2>

          <div className="row">
            {useCases.items.map((item, index) => (
              <div key={index} className="col-md-6 d-flex justify-content-start mb-3 p-0">
                <div className="card border-0" style={{ width: "70%" }}>
                  <div className="card-body">
                    <h5 className="card-title fs-4">{item.heading}</h5>

                    <ul className="text-muted ps-3" style={{ fontSize: "18px" }}>
                      {item.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <MaturityTimeLine data={maturityData}/>
      <div className="container">
          <ImageTextSection
            image={image2}
            heading="YVI Cyber Security Differentiators"
            points={[
                "AI + Human Intelligence Model ",
                "Global SOC with 24/7 Monitoring ",
                "Integrated Cyber + AI + Cloud Expertise  ",
                "Cost-optimized Managed Services ",
                "Rapid Deployment Frameworks"
            ]}
            imageLeft={true}
            />

        <ImageTextSection
            image={image3}
            heading="Technology Ecosystem"
            description="YVI integrates with leading platforms. "
            points={[
                "SIEM: Splunk, QRadar, Sentinel ",
                "Cloud: AWS Security Hub, Azure Defender ",
                "Endpoint: CrowdStrike, Microsoft Defender ",
                "Identity: Okta, Azure AD "
            ]}
            />
        </div>
        <div className="container bg-white rounded-2xl shadow-md py-4">
          <h2 className="text-2xl fw-bold text-gray-800 mb-3">
            Business Impact
          </h2>

          <ul className="space-y-3 d-flex flex-column expert gap-2 list-unstyled text-gray-600 ps-2">
            <li className="flex items-start gap-3" >
              <i className="bi bi-check2-circle text-green-600 text-lg me-2"></i>
              70% faster threat detection
            </li>

            <li className="flex items-start gap-3 ">
              <i className="bi bi-check2-circle text-green-600 text-lg me-2"></i>
              50% reduction in security incidents 
            </li>

            <li className="flex items-start gap-3 ">
              <i className="bi bi-check2-circle text-green-600 text-lg me-2"></i>
              40% lower operational security costs 
            </li>
             <li className="flex items-start gap-3 ">
              <i className="bi bi-check2-circle text-green-600 text-lg me-2"></i>
              Improved compliance posture 
            </li>
          </ul>
        </div>
        <ContactUs headingText='Secure your digital future with YVI Technologies.'
                   content="Partner with us to build a resilient, intelligent, and future-ready cybersecurity ecosystem."/>

    </div>
  )
}   

export default CyberSecurityServices