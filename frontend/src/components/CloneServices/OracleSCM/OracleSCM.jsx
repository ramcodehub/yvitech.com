import React from "react";
import "../service-template.css";

const features = [
  {
    title: "Unified SCM Platform",
    description:
      "Oracle Supply Chain Management consolidates all supply chain functions into a unified, cloud-based platform. It enables smooth and efficient data integration across procurement, production, warehousing, and distribution processes.",
  },
  {
    title: "Advanced Analytics",
    description:
      "Leverage Oracle SCM’s advanced analytics to make data-driven decisions. Obtain actionable insights that enable you to anticipate, adapt, and optimize your supply chain operations in real time.",
  },
  {
    title: "Cloud-Based Flexibility",
    description:
      "Our cloud platform provides exceptional security, scalability, and cost-effectiveness. It enables you to respond to market demands and expand your capabilities with minimal upfront investment.",
  },
];

const benefits = [
  {
    title: "Drive Operational Efficiency",
    description:
      "Automate and optimize your supply chain operations to enhance efficiency, reduce manual workload, minimize errors, and accelerate end-to-end processes.",
  },
  {
    title: "Reduce Costs",
    description:
      "Reduce operational expenses through enhanced inventory management and optimized supplier agreements. Oracle SCM supports waste minimization and cost containment.",
  },
  {
    title: "Enhance Risk Management",
    description:
      "Proactively identify and address supply chain risks using effective tools to anticipate and minimize potential disruptions before they affect your operations.",
  },
  {
    title: "Commit to Sustainability",
    description:
      "Attain your sustainability objectives by implementing efficient resource management, minimizing waste, and enhancing adherence to environmental standards.",
  },
];

const modules = [
  {
    title: "Procurement Cloud",
    description:
      "Enhance procurement processes through optimized workflows, automated supplier negotiations, and effective contract management.",
  },
  {
    title: "Logistics Cloud",
    description:
      "Enhance transportation and warehousing operations while ensuring border compliance through comprehensive global trade management solutions.",
  },
  {
    title: "Product Lifecycle Management Cloud",
    description:
      "Oversee each phase of the product lifecycle from initial concept to successful release with efficiency and collaboration.",
  },
  {
    title: "Supply Chain Planning Cloud",
    description:
      "Synchronize your supply and demand using integrated planning tools that improve forecasting accuracy and inventory management.",
  },
  {
    title: "Manufacturing Cloud",
    description:
      "Provide comprehensive support for diverse manufacturing processes through flexible, efficient, and integrated manufacturing solutions.",
  },
  {
    title: "Inventory Management Cloud",
    description:
      "Maintain accurate and optimized inventory levels through real-time tracking, automated reordering, and efficient order management.",
  },
];

const integrations = [
  {
    title: "Seamless System Integration",
    description:
      "Oracle SCM seamlessly integrates with your existing Oracle ERP, CRM, and HCM systems, improving data consistency and accessibility.",
  },
  {
    title: "Flexible Third-Party Integration",
    description:
      "Integrate Oracle SCM seamlessly with other enterprise systems through robust APIs, enabling unified operations across varied IT environments.",
  },
];

const OracleSCM = () => {
  return (
    <main className="service-template service-template--oracle-scm">
      <section className="service-hero">
        <div className="container">
          <div className="service-hero__content">
            <p className="service-eyebrow">Oracle SCM</p>
            <h1>Oracle Supply Chain Management Resource</h1>
            <p>
              Our Oracle Supply Chain Management (SCM) resource integrates all aspects of your supply chain, from product conception to customer delivery, providing real-time visibility and enhancing efficiency across your organization. Explore how Oracle SCM can optimize your operations and improve responsiveness.
            </p>
            <div className="service-hero__actions">
              <a href="#features" className="btn btn-primary">
                View Features
              </a>
              <a href="#contact" className="btn btn-secondary">
                Request a Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="service-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-label">Our Oracle SCM</p>
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
            <p className="section-label">Oracle SCM</p>
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
            <p className="section-label">Oracle SCM</p>
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
            Are you ready to proceed or require additional information? Please contact our sales team directly or complete our contact form.
          </p>
          <a href="/contact" className="btn btn-primary">
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
};

export default OracleSCM;
