import React from "react";
import "./MicrosoftDynamicsComponent.css";

const MicrosoftDynamicsComponent = () => {
  const expertiseData = [
    {
      code: "D365 SALES",
      title: "Dynamics 365 Sales",
      icon: "bi-people",
      description:
        "CRM module offering advanced capabilities for managing customer relationships, sales pipelines, lead-to-opportunity tracking, and complete customer lifecycle management."
    },
    {
      code: "D365 FIN",
      title: "Dynamics 365 Finance",
      icon: "bi-bar-chart-line",
      description:
        "Enterprise-grade financial management solution focused on business intelligence, automation, compliance, and real-time financial insights."
    },
    {
      code: "BUS CENTRAL",
      title: "Dynamics 365 Business Central",
      icon: "bi-building",
      description:
        "Comprehensive ERP designed for small and mid-sized businesses, delivering robust finance, operations, and sales functionality with cost-effective licensing."
    },
    {
      code: "POWER PLATFORM",
      title: "Power Platform & HR Enablement",
      icon: "bi-lightning-charge",
      description:
        "Enhanced HR, payroll, and talent management using Power Apps, Power Automate, Dataverse, and Viva integrations for secure, role-based employee experiences."
    },
    {
      code: "AZURE INT",
      title: "Azure Integration Services",
      icon: "bi-diagram-3",
      description:
        "Expertise in Logic Apps, Azure Functions, Service Bus, REST APIs, middleware, and Dataverse to ensure seamless enterprise and third-party system integration."
    },
    {
      code: "CLOUD MIG",
      title: "Legacy to Azure Cloud Migration",
      icon: "bi-cloud-arrow-up",
      description:
        "Assessment-driven migration of legacy systems to Azure and Dynamics 365, ensuring minimal disruption, performance optimization, cost efficiency, and future-ready scalability."
    }
  ];

  return (
    <section className="expertise-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">
            MICROSOFT DYNAMICS EXPERTISE
          </span>
          <h2>Our Microsoft Dynamics Expertise & Capability</h2>
          <p>
            We streamline enterprise processes using Microsoft Dynamics 365,
            Power Platform, and Azure. Our solutions prioritize compliance,
            security, scalability, and long-term digital transformation across
            finance, supply chain, HR, and analytics.
          </p>
        </div>

        <div className="expertise-grid">
          {expertiseData.map((item, index) => (
            <div
              className="expertise-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="card-header">
                <i className={`bi ${item.icon} fs-1`}></i>
                <span className="module-badge">{item.code}</span>
              </div>

              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MicrosoftDynamicsComponent;
