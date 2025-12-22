import { useState, useRef, useEffect } from "react";
import ImageTextSection from "../Services/Components/ImageTextSection/ImageTextSection";
import "./ServicesTabs.css";

export default function ServicesTabs({ services }) {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const activeTabRef = useRef(null);
  const firstLoad = useRef(true);

  const activeService = services.find(
    (service) => service.id === activeTab
  );

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    if (window.innerWidth <= 768 && activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  return (
    <section className="services-tabs">
      {/* Tabs */}
      <div className="tabs">
        {services.map((service) => (
          <button
            key={service.id}
            ref={activeTab === service.id ? activeTabRef : null}
            className={`tab-btn ${
              activeTab === service.id ? "active" : ""
            }`}
            onClick={() => setActiveTab(service.id)}
          >
            {service.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="tab-content">
        <ImageTextSection
          image={activeService.img}
          heading={activeService.title}
          description={activeService.description}
          imageLeft={
            services.indexOf(activeService) % 2 === 0
          }
        />
      </div>
    </section>
  );
}
