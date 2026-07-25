import React from "react";
import "../service-template.css";

const features = [
  {
    title: "Complete Financial Management",
    description:
      "Utilize comprehensive financial functionalities, including general ledger, accounts payable, accounts receivable, fixed assets, and cash management, within a single cloud-based platform.",
  },
  {
    title: "Advanced Financial Controls",
    description:
      "Leverage strong financial controls to ensure accuracy, mitigate the risk of fraud, and uphold compliance with international accounting standards and regulations.",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Utilize integrated analytics to obtain real-time insights into your financial performance and support strategic decision-making.",
  },
  {
    title: "Automation and Efficiency",
    description:
      "Automate routine tasks such as transaction processing and data entry to enhance efficiency and minimize manual errors.",
  },
];

const benefits = [
  {
    title: "Drive Better Decisions",
    description:
      "Make informed decisions by leveraging comprehensive, real-time data access and reporting capabilities.",
  },
  {
    title: "Increase Efficiency and Reduce Costs",
    description:
      "Automate and streamline financial workflows to lower operational costs and allocate resources more effectively.",
  },
  {
    title: "Ensure Compliance",
    description:
      "Ensure adherence to financial regulations with automated updates and built-in governance capabilities.",
  },
  {
    title: "Scalable for Growth",
    description:
      "As your business expands, Oracle Financials scales accordingly and adapts to your evolving needs.",
  },
];

const modules = [
  {
    title: "General Ledger",
    description:
      "Obtain a comprehensive understanding of your financial position through customizable and scalable accounting solutions.",
  },
  {
    title: "Accounts Payable",
    description:
      "Automate invoice processing and payments to enhance operational efficiency and strengthen vendor relationships.",
  },
  {
    title: "Accounts Receivable",
    description:
      "Optimize billing and collections procedures to enhance cash flow management and customer experience.",
  },
  {
    title: "Cash Management",
    description:
      "Enhance liquidity and financial stability through effective cash flow planning and forecasting.",
  },
  {
    title: "Fixed Assets",
    description:
      "Oversee the lifecycle of organizational assets from acquisition to retirement with clear governance.",
  },
];

const integrations = [
  {
    title: "Seamless System Integration",
    description:
      "Oracle Financials integrates smoothly with Oracle SCM, HCM, and other ERP solutions to deliver a comprehensive business view.",
  },
  {
    title: "Flexible Third-Party Integration",
    description:
      "Seamlessly integrate with third-party systems through reliable APIs and align Oracle Financials within your current IT infrastructure.",
  },
];

const OracleFinancials = () => {
  return (
    <main className="service-template service-template--oracle-financials">
      <section className="service-hero">
        <div className="container">
          <div className="service-hero__content">
            <p className="service-eyebrow">Oracle Financials</p>
            <h1>Oracle Financials</h1>
            <p>
              Oracle Financials, a component of Oracle&apos;s Cloud ERP solutions, provides a comprehensive suite designed to optimize financial management processes, support informed decision-making, and facilitate business growth. Contact us to learn how Oracle Financials can enhance your financial operations.
            </p>
            <div className="service-hero__actions">
              <a href="#features" className="btn btn-primary">
                Discover Features
              </a>
              <a href="#contact" className="btn btn-secondary">
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="service-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-label">Our Oracle Financials</p>
            <h2>Features</h2>
          </div>
          <div className="cards-grid">
            {features.map((feature) => (
              <article className="info-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section service-section--alt">
        <div className="container">
          <div className="section-heading">
            <p className="section-label">Why Choose Us</p>
            <h2>Benefits</h2>
          </div>
          <div className="cards-grid cards-grid--compact">
            {benefits.map((benefit) => (
              <article className="info-card info-card--compact" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-label">Oracle Financials</p>
            <h2>Modules</h2>
          </div>
          <div className="cards-grid">
            {modules.map((module) => (
              <article className="info-card" key={module.title}>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section service-section--alt">
        <div className="container">
          <div className="section-heading">
            <p className="section-label">Oracle Financials</p>
            <h2>Integration</h2>
          </div>
          <div className="cards-grid cards-grid--compact">
            {integrations.map((integration) => (
              <article className="info-card info-card--compact" key={integration.title}>
                <h3>{integration.title}</h3>
                <p>{integration.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="service-cta">
        <div className="container">
          <h2>Contact Us</h2>
          <p>
            Would you like to explore Oracle Financials in more detail? Our sales team is available to provide comprehensive product information and arrange a personalized demonstration.
          </p>
          <a href="/contact" className="btn btn-primary">
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
};

export default OracleFinancials;
