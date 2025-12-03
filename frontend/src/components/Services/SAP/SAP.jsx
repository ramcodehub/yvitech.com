import React from 'react'
import './SAP.css'
import BannerThree from '../../Banner3/BannerThree'
import sap from '../../../assets/img/SAPImplementation.png'
import sap1 from '../../../assets/img/SAPPost.png'
import image from '../../../assets/img/SAPcon1.jpg'
import image1 from '../../../assets/img/SAPcon2.jpg'
import SAPImplementation from '../Components/SAPImplementation/SAPImplementation'

const SAP = () => {
  const sapData = {
    title: "The SAP Implementation Methodology",
    description:
      "The SAP Implementation Methodology ensures a structured, efficient, and successful deployment of SAP solutions through key phases such as Data Migration, Integration Setup, Solution Testing, Solution Adoption, Support Readiness, System Management, Custom Extensions Management, and Cutover Management. Each phase produces defined deliverables that guide subsequent stages, ensuring alignment and consistency. Following the SAP Activate framework, it provides detailed procedural guidance and accelerators—including templates, checklists, and guidebooks—that streamline execution. This approach enables efficient, consistent, and repeatable delivery of SAP implementations and upgrades.",
    image: sap,
    points: [
      { title: "Data Migration" },
      { title: "Integration Setup" },
      { title: "Solution Testing" },
      { title: "Solution Adoption" },
      { title: "Support Readiness" },
      { title: "System Management" },
      { title: "Custom Extensions Management" },
      { title: "Cutover Management" },
    ],

    extraContent:
      "During each methodology phase, the project team produces prescribed set of deliverables that serve as inputs to subsequent phases. SAP Activate methodology provides example of key project deliverables, including procedure description explaining how to prepare and complete the deliverable. SAP Activate methodology also provides accelerators for each phase and work stream. These include templates, questionnaires, checklists, guidebooks, and other tools that facilitate the efficient, consistent, and repeatable delivery of SAP implementations and upgrades.",
  };
  const sapPostData = {
    title: "SAP Post Implementation",
    subtitle: "Range of support services includes:",
    description:
      "SAP Post Implementation YVI Tech has aligned services to offer complete business solutions to select industry verticals, utilizing seamless onsite/offsite support model. This model allows us to offer high-quality, cost-effective support to our clients. Our core competency center located in Central India is equipped with technologies and facilities, ensuring highest levels of security and reliability for its customers.",
    image: sap1,

    points: [
      { title: "Enhancements to existing functionality" },
      { title: "ABAP support and modifications" },
      { title: "Production support and second level support" },
      { title: "Master data maintenance" },
      { title: "ABAP performance tuning services" },
      { title: "BASIS/System admin support services." },
    ],
  };
  return (
    <div>
      <BannerThree headingText='SAP Consulting Implementation'
                    content="The SAP Activate methodology is SAP’s content rich, agile methodology for the implementation and/or upgrade of SAP solutions across industries and customer environments. SAP Activate Methodology provides pre-built implementation content, accelerators, tools, and best practices that help consultants to deliver consistent and successful results across industries and customer environments."
                    videoName="SAP.mp4"/>
      <div className='container overview sap d-flex flex-column align-items-start  mt-5'>
        <h1 className='fw-bolder pb-3'>SAP Activate methodology (On-Premise and Managed Cloud)</h1>
        <p>The phases of SAP Activate provide support throughout the project life cycle of SAP solutions. Underlying these phases is a series of value delivery and quality checks to make sure that the solution, as implemented, delivers the expected value. The diagram below illustrates the phases of SAP Activate Methodology.</p>
        <p>SAP implementations and upgrades require a disciplined approach to project management. The SAP Activate methodology aligns with best practices recommended by the Project Management Institute (PMI)*, making it possible to minimize risk, streamline and accelerate the implementation project, and reduce the total cost of implementation or upgrade.</p>
        <p>SAP Activate methodology incorporates a standardized work breakdown structure that helps project managers to define and manage project work in a deliverable-oriented, outcome focused manner. It is structured around these key project work streams:</p>
        <div className='w-100 d-flex align-items-center justify-content-start px-4 sap2' style={{gap:'5rem'}}>
          <ul className='list-unstyled'>
            <li><i className="bi bi-arrow-return-right me-2"></i>Project management</li>
            <li><i className="bi bi-arrow-return-right me-2"></i>Solution Design</li>
            <li><i className="bi bi-arrow-return-right me-2"></i>Solution Configuration</li>
            <li><i className="bi bi-arrow-return-right me-2"></i>Solution Walk through</li>
            <li><i className="bi bi-arrow-return-right me-2"></i>Integration Preparation</li>
            <li><i className="bi bi-arrow-return-right me-2"></i>Customer Team Enablement</li>
          </ul>
          <img src={image} alt="" height='360px' className='rounded-4'/>
        </div>

      </div>              
      <div className="d-flex flex-column justify-content-center align-items-center">
        <SAPImplementation {...sapData} />
        <SAPImplementation {...sapPostData}/>
      </div>
      <div className='container overview sap d-flex flex-column align-items-start my-5'>
        <div className="section-title p-1">
          <h2>Expert Services</h2>
        </div>
        <h1 className='fw-bolder pb-3'>Apart From Implementation & Support Expert Services, We Offer A Range of Expert Services Independent of Consulting Assignments :</h1>
        <p>For example, Version Upgrade. Though SAP has made considerable effort to simplify SAP Upgrades, we understand that SAP Upgrades can be challenging for any organization, due to a variety of reasons like lack of in-house upgrade experience, limited resources, solution complexity, and custom developments. YVI Tech can help with its experienced consulting team, well developed remote delivery methodology, specialized tools and templates.</p>
        <p>SAP implementations and upgrades require a disciplined approach to project management. The SAP Activate methodology aligns with best practices recommended by the Project Management Institute (PMI)*, making it possible to minimize risk, streamline and accelerate the implementation project, and reduce the total cost of implementation or upgrade.</p>
        <p>SAP Activate methodology incorporates a standardized work breakdown structure that helps project managers to define and manage project work in a deliverable-oriented, outcome focused manner. It is structured around these key project work streams:</p>
        <div className=' d-flex align-items-center gap-2 justify-content-between sap2'>
          <ul className='list-unstyled'>
            <li><i className="bi bi-arrow-return-right me-2"></i>Application Development using Net Weaver Developer studio.</li>
            <li><i className="bi bi-arrow-return-right me-2"></i>Solutions using RFID and Bard Code Devices and integrating with ERP System.</li>
            <li><i className="bi bi-arrow-return-right me-2"></i>Workflow Implementation and related alignment of business tasks for electronic controls and approvals.</li>
            <li><i className="bi bi-arrow-return-right me-2"></i>BW/BI Implementation</li>
            <li><i className="bi bi-arrow-return-right me-2"></i>Data Center Management</li>
            <li><i className="bi bi-arrow-return-right me-2"></i>Network Management (LAN/WAN)</li>
            <li><i className="bi bi-arrow-return-right me-2"></i>OS Management</li>
            <li><i className="bi bi-arrow-return-right me-2"></i>Database Admin for Sybase, SQL, Oracle, DB2, HANA</li>
          </ul>
          <img src={image1} alt="" className='rounded-4'/>
        </div>

      </div>
    </div>
  )
}

export default SAP
