import { useState } from "react";
import { Link } from "react-router-dom";
import BannerHero from "../BannerHero/BannerHero";
import "./SkillDevelopment.css";

const TABS = [
  {
    id: "ai-training",
    label: "Artificial Intelligence Training",
    heading: "Artificial Intelligence Training",
    description:
      "Build practical AI capabilities through hands-on training in generative AI, machine learning, automation, and responsible AI adoption.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "corporate-training",
    label: "Corporate Learning & Development",
    heading: "Corporate Learning & Development",
    description:
      "Upskill teams with role-based, project-driven programs designed around your organization’s tools, workflows, and business goals.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cyber-security",
    label: "Cybersecurity Training & Awareness",
    heading: "Cybersecurity Training & Awareness",
    description:
      "Strengthen security awareness and technical readiness with focused training in cyber defense, risk management, and secure digital practices.",
    image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80"
  },
];

const SkillDevelopment = () => {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const activeTab = TABS.find((tab) => tab.id === activeId);

  return (
    <div className="skill-development-page">
      <BannerHero
        headingText="From undefined opportunity to"
        highlightText="Scalable Outcome-Led AI MVP"
        content="Most AI initiatives start with a technology possibility rather than an owned business problem. This workshop puts business, product, design, data, AI, engineering and governance stakeholders into one working cadence — so the right choices get made early, and the team leaves with a delivery package, not a slide deck."
        videoName="Skill_Development.mp4"
      />

      <section className="training-tabs" aria-labelledby="training-tabs-title">
        <div className="container training-tabs__inner">
          <div className="training-tabs__intro">
            <p className="training-tabs__eyebrow">Our skilling partnerships</p>
            <h2 id="training-tabs-title">
              Training outcomes that speak for themselves
            </h2>
            <p className="training-tabs__summary">
              YVI Tech helps organizations build future-ready capabilities across AI,
              corporate technology, and cyber security through practical, outcome-led
              learning programs.
            </p>

            <div className="training-tabs__list" role="tablist" aria-label="Training programs">
              {TABS.map((tab) => {
                const isActive = tab.id === activeId;

                return (
                  <button
                    className={`training-tab ${isActive ? "is-active" : ""}`}
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveId(tab.id)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                        event.preventDefault();
                        const nextIndex = (TABS.indexOf(tab) + 1) % TABS.length;
                        setActiveId(TABS[nextIndex].id);
                        document.getElementById(`tab-${TABS[nextIndex].id}`)?.focus();
                      }
                      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                        event.preventDefault();
                        const previousIndex = (TABS.indexOf(tab) - 1 + TABS.length) % TABS.length;
                        setActiveId(TABS[previousIndex].id);
                        document.getElementById(`tab-${TABS[previousIndex].id}`)?.focus();
                      }
                    }}
                  >
                    <span>{tab.label}</span>
                    <span className="training-tab__marker" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="training-tabs__content"
            id={`panel-${activeTab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab.id}`}
            tabIndex="0"
          >
            <div className="training-tabs__image-wrap">
              <img key={activeTab.image} src={activeTab.image} alt={activeTab.heading} />
            </div>
            <div className="training-tabs__details">
              <h3 key={`${activeTab.id}-heading`}>{activeTab.heading}</h3>
              <p key={`${activeTab.id}-description`}>{activeTab.description}</p>
              <div className="training-tabs__actions">
                <Link to={`/skill-development/${activeTab.id}`} className="training-button training-button--primary">
                  Read More
                </Link>
                <Link to="/contact" className="training-button training-button--secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillDevelopment;