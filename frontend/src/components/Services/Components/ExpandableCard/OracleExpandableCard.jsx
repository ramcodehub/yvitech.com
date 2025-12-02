import React, { useState } from "react";

const ExpandableCard = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border rounded-4 shadow-sm bg-white p-4 w-100"
      style={{ maxWidth: "600px" }}
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ cursor: "pointer" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className="fw-semibold mb-0">{title}</h5>
        <i
          className={`bi ${isOpen ? "bi-dash-circle" : "bi-plus-circle"} fs-5`}
        ></i>
      </div>


      {isOpen && (
        <div className="border-top mt-3 pt-3 text-secondary">
          <ul className="mb-0">
            {items.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const OracleExpandableCard = () => {
  const cards = [
    {
      title: "Oracle SaaS Applications (ERP, EPM, HCM, SCM)",
      items: [
        "Functional & technical support",
        "Vendor updates and environment maintenance",
        "Process optimization and agile enhancements",
      ],
    },
    {
      title: "Oracle E-Business Suite & Hyperion",
      items: [
        "Functional and technical support (customizations, integrations, localizations)",
        "Proactive patching and updates",
        "Agile release and change management",
      ],
    },
    {
      title: "Oracle Core Technology",
      items: [
        "Database & middleware support, monitoring, capacity management",
        "Hosting on-premises or via cloud (OCI, third-party, or YVI Private Cloud)",
        "Platform upgrades and technology migrations",
      ],
    },
  ];

  return (
    <div className="d-flex flex-column gap-3 ms-4">
      {cards.map((card, index) => (
        <ExpandableCard key={index} title={card.title} items={card.items} />
      ))}
    </div>
  );
};

export default OracleExpandableCard;
