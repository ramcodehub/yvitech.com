import React from 'react'
import './SAPComponent.css'

const SAPComponent = () => {
    const expertiseData = [
    {
        code: "FI/CO",
        title: "Finance Management & Controlling",
        icon: "bi-currency-exchange",
        description:
        "End-to-end financial process enablement including general ledger, AP/AR, asset accounting, cost controlling, profitability analysis, and real-time financial reporting."
    },
    {
        code: "SD",
        title: "Sales & Distribution",
        icon: "bi-graph-up-arrow",
        description:
        "Optimization of order-to-cash processes, pricing, billing, credit management, and customer analytics to improve revenue realization and sales performance."
    },
    {
        code: "MM",
        title: "Purchasing & Procurement",
        icon: "bi-cart-check",
        description:
        "Streamlined procure-to-pay workflows covering vendor management, sourcing, inventory valuation, and invoice verification."
    },
    {
        code: "CS",
        title: "Customer Service Operations",
        icon: "bi-headset",
        description:
        "Configuration and enhancement of service management processes including service orders, warranty management, complaint handling, and customer interaction tracking."
    },
    {
        code: "WM",
        title: "Warehouse & Inventory Management",
        icon: "bi-box-seam",
        description:
        "Implementation and optimization of inventory planning, warehouse operations, goods movement, and stock visibility."
    },
    {
        code: "RE",
        title: "Real Estate Management",
        icon: "bi-buildings",
        description:
        "SAP-enabled real estate lifecycle management including lease administration, contract management, property accounting, and compliance."
    }
    ];

  return (
    <section className="expertise-section">
    <div className="container">
        <div className="section-header text-center">
        <span className="section-eyebrow">FUNCTIONAL EXPERTISE</span>
        <h2>Functional Expertise Across Core Business Functions</h2>
        <p>
            Our consultants bring hands-on experience across enterprise functions,
            enabling integrated SAP solutions that align technology with real business operations.
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

  )
}

export default SAPComponent
