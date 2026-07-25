import React from "react";
import "../service-template.css";

const serviceHighlights = [
  {
    title: "Oracle Human Resources",
    description:
      "Utilize customizable and scalable workflows to personalize employee experiences and enhance decision-making. Oracle HR streamlines resource management and associated processes for improved efficiency.",
    points: [
      "Core HR",
      "Onboarding",
      "Benefits",
      "Absence management",
      "Workforce directory",
      "HR help desk",
      "Work-life solutions",
      "Advance HCM control",
      "Workforce modelling and predictions",
    ],
  },
  {
    title: "Oracle Talent Management",
    description:
      "Oracle HCM Cloud implementation enables comprehensive management of your organization's talent lifecycle, including sourcing, recruiting, onboarding new employees, goal management, and performance recognition. It ensures a seamless learning experience and supports high employee engagement.",
    points: [
      "Performance management",
      "Compensation",
      "Learning",
      "Succession planning",
    ],
  },
  {
    title: "Oracle Recruiting",
    description:
      "Oracle Recruiting helps organizations attract, recruit, and onboard talent more efficiently while improving the experience for candidates and HR teams.",
    points: [
      "Candidate engagement",
      "Hiring",
      "Onboarding",
      "Analytics and reporting",
      "Extensibility",
    ],
  },
  {
    title: "Oracle Workforce Management",
    description:
      "Enhance organizational performance, employee productivity, and workforce competency with accurate forecasting, scheduling, and labor planning capabilities.",
    points: [
      "Workforce time and labour",
      "Strategic workforce planning",
      "Workforce health and safety",
      "Absences management",
      "Workforce modelling and predictions",
    ],
  },
  {
    title: "Oracle Payroll",
    description:
      "Streamline payroll operations through automation, compliance-ready processing, and accurate reporting across global operations.",
    points: [
      "Global payroll",
      "Payroll interface",
      "Onboarding",
      "Analytics and reporting",
      "Extensibility",
    ],
  },
  {
    title: "Oracle HR Helpdesk",
    description:
      "Provide employees with secure and efficient access to HR services and request management through a centralized support experience.",
    points: ["HR service delivery", "Service request analytics", "Data privacy"],
  },
];

const industries = [
  {
    title: "Government",
    description:
      "We help public sector organizations modernize HR and workforce processes with secure, scalable digital solutions.",
  },
  {
    title: "Retail",
    description:
      "Our solutions optimize workforce planning, recruitment, and employee engagement for agile retail operations.",
  },
  {
    title: "Healthcare",
    description:
      "We support healthcare organizations with resilient and human-centered HCM tools that improve service delivery.",
  },
  {
    title: "Manufacturing",
    description:
      "We enable manufacturers to align workforce planning, talent management, and productivity in one connected platform.",
  },
  {
    title: "Financial Services",
    description:
      "We help financial organizations strengthen employee operations, compliance, and engagement through intelligent HCM capabilities.",
  },
];

const OracleHCM = () => {
  return (
    <main className="service-template service-template--oracle-hcm">
      <section className="service-hero">
        <div className="container">
          <div className="service-hero__content">
            <p className="service-eyebrow">Oracle HCM</p>
            <h1>Oracle Human Capital Management</h1>
            <p>
              Our expertise is in supporting organizations with the deployment of comprehensive talent and HR solutions. We address all aspects, from strategic planning to daily operations, with a focus on delivering customized experiences and promoting human-centered engagement. By utilizing Oracle&apos;s advanced HCM innovations, we aim to drive continuous value and improvement for our clients.
            </p>
            <div className="service-hero__actions">
              <a href="#solutions" className="btn btn-primary">
                Explore Solutions
              </a>
              <a href="#contact" className="btn btn-secondary">
                Talk to an Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="service-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-label">Solutions We Offer</p>
            <h2>Oracle Fusion Cloud ERP Modules</h2>
          </div>

          <div className="cards-grid">
            {serviceHighlights.map((item, index) => (
              <article className="info-card" key={item.title} data-aos={index % 2 === 0 ? "fade-up" : "fade-up"}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section service-section--alt">
        <div className="container">
          <div className="section-heading">
            <p className="section-label">Industries We Serve</p>
            <h2>Our approach is industry first</h2>
          </div>

          <div className="cards-grid cards-grid--compact">
            {industries.map((industry) => (
              <article className="info-card info-card--compact" key={industry.title}>
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="service-cta">
        <div className="container">
          <h2>Get Started with Digital</h2>
          <p>
            Leverage digital technologies to unlock new opportunities and drive innovation across all aspects of your organization.
          </p>
          <a href="/contact" className="btn btn-primary">
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
};

export default OracleHCM;
