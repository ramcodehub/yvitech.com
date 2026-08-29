import { Link, useParams } from "react-router-dom";
import "./TrainingDetail.css";

const TRAINING_PROGRAMS = {
  "ai-training": {
    eyebrow: "Skill Development / AI",
    category: "AI Capability",
    title: "Artificial Intelligence Training",
    intro:
      "Turn AI from a conversation into a capability your people can use with confidence.",
    description:
      "YVI Tech's AI programs help teams understand modern AI, identify valuable opportunities, use AI tools effectively, and build responsible workflows that translate into measurable business impact.",
    accent: "AI",
    stats: [
      ["01", "AI foundations"],
      ["02", "Hands-on labs"],
      ["03", "Use-case design"],
    ],
    outcomes: [
      "Build a practical understanding of generative AI, machine learning, automation, and modern AI workflows.",
      "Identify business opportunities where AI can improve productivity, customer experience, or decision-making.",
      "Use prompting, AI assistants, automation, and evaluation techniques in day-to-day work.",
      "Design responsible AI practices covering privacy, security, quality, bias, and human oversight.",
      "Move from experimentation to a prioritized roadmap for AI adoption.",
      "Create a practical use case, prototype, or workflow that demonstrates business value.",
    ],
    pathway: [
      ["01", "Understand", "Build the foundations first — what modern AI can do, where it performs well, and where human judgment remains essential."],
      ["02", "Explore", "Work through tools, prompts, workflows, and real business examples relevant to each participant's role."],
      ["03", "Apply", "Turn learning into a practical use case, workflow, or prototype connected to a measurable outcome."],
      ["04", "Adopt", "Define responsible-use guidelines, ownership, measurement, and a realistic next-step adoption roadmap."],
    ],
    tracks: [
      ["Generative AI", "LLMs, AI assistants, multimodal AI, and practical business applications."],
      ["Prompt & workflow design", "Prompt patterns, context, structured outputs, evaluation, and AI-assisted workflows."],
      ["AI productivity", "Research, content, analysis, knowledge work, automation, and decision support."],
      ["Machine learning essentials", "Core concepts, data, models, evaluation, and when ML is the right approach."],
      ["Responsible AI", "Privacy, security, quality, governance, human oversight, and risk-aware adoption."],
      ["AI use-case design", "Opportunity discovery, feasibility, prioritization, prototyping, and value measurement."],
    ],
    format: "Role-based cohorts, executive sessions, workshops, and hands-on labs.",
    audience: "Business leaders, product teams, analysts, engineers, and functional specialists.",
    takeaways: [
      "Role-specific AI playbook",
      "Prioritized use-case backlog",
      "Hands-on practical exercises",
      "Responsible AI checklist",
    ],
  },

  "corporate-training": {
    eyebrow: "Skill Development / Workforce",
    category: "Workforce Transformation",
    title: "Corporate Learning & Development",
    intro:
      "Build the skills, confidence, and collaboration needed for a workforce that keeps moving forward.",
    description:
      "We create practical learning journeys around your people, roles, technology landscape, and business priorities — helping organizations turn training from an event into an ongoing capability-building system.",
    accent: "L&D",
    stats: [
      ["01", "Role-based"],
      ["02", "Project-led"],
      ["03", "Measurable"],
    ],
    outcomes: [
      "Identify the capability gaps that matter most to current business and transformation priorities.",
      "Build role-specific technical, digital, leadership, and collaboration skills.",
      "Apply learning through projects, simulations, challenges, and organization-specific scenarios.",
      "Create stronger collaboration between business, product, technology, and operations teams.",
      "Measure learning through participation, proficiency, application, and business outcomes.",
      "Establish a repeatable learning roadmap that continues beyond the initial program.",
    ],
    pathway: [
      ["01", "Assess", "Map roles, current capability, strategic priorities, and the performance outcomes the learning program needs to influence."],
      ["02", "Design", "Build a focused curriculum with the right balance of instruction, practice, coaching, projects, and assessment."],
      ["03", "Deliver", "Run engaging cohorts using case studies, labs, peer learning, mentoring, and work-based challenges."],
      ["04", "Sustain", "Reinforce capability through measurement, communities of practice, coaching, and an evolving learning roadmap."],
    ],
    tracks: [
      ["Digital fluency", "Modern workplace technology, collaboration, productivity, and digital ways of working."],
      ["Technology skills", "Software engineering, cloud, platforms, tools, and technical foundations."],
      ["Data-driven decisions", "Data literacy, analytics thinking, visualization, and evidence-based decision making."],
      ["Leadership & product", "Product thinking, communication, leadership habits, prioritization, and execution."],
      ["Agile ways of working", "Cross-functional collaboration, iterative delivery, ceremonies, and continuous improvement."],
      ["Custom academies", "Role-based learning academies designed around your organization's capability model."],
    ],
    format: "On-site, virtual, blended, and cohort-based academy programs.",
    audience: "Enterprise teams, managers, emerging leaders, and technology professionals.",
    takeaways: [
      "Role-based learning roadmap",
      "Practical project outcomes",
      "Capability assessment framework",
      "Post-training reinforcement plan",
    ],
  },

  "cyber-security": {
    eyebrow: "Skill Development / Cyber",
    category: "Cyber Resilience",
    title: "Cybersecurity Training & Awareness",
    intro:
      "Build security-ready teams that recognize risk, respond with confidence, and protect the business.",
    description:
      "YVI Tech combines security awareness, technical training, and realistic scenarios to help organizations strengthen security behavior and operational readiness across every level of the workforce.",
    accent: "CYBER",
    stats: [
      ["01", "Awareness"],
      ["02", "Simulation"],
      ["03", "Readiness"],
    ],
    outcomes: [
      "Build security awareness that employees can apply to everyday digital work.",
      "Recognize common threats, vulnerabilities, social engineering techniques, and attack paths.",
      "Strengthen technical readiness across application, cloud, infrastructure, and endpoint security.",
      "Practice incident response and decision-making through realistic scenarios and tabletop exercises.",
      "Improve security ownership across engineering, operations, compliance, and business teams.",
      "Prepare teams for security responsibilities, audits, and relevant certification pathways.",
    ],
    pathway: [
      ["01", "Baseline", "Understand your security culture, technical capability, risk profile, and the control gaps that require attention."],
      ["02", "Train", "Build foundational and role-specific knowledge through focused instruction, demonstrations, and guided practice."],
      ["03", "Simulate", "Test readiness with tabletop exercises, attack scenarios, response drills, and hands-on security labs."],
      ["04", "Strengthen", "Convert lessons into improvement actions with ownership, coaching, measurement, and follow-up exercises."],
    ],
    tracks: [
      ["Security awareness", "Phishing, social engineering, passwords, identity, device safety, and secure digital behavior."],
      ["Ethical hacking & VAPT", "Security testing concepts, vulnerability discovery, attack paths, and defensive thinking."],
      ["Cloud security", "Security foundations and practical controls across AWS, Azure, and GCP environments."],
      ["Security governance", "ISO 27001, SOC 2, risk thinking, policies, controls, and readiness practices."],
      ["Incident response", "Detection, triage, containment, communication, recovery, and blue-team operations."],
      ["Secure development", "Application security, secure coding habits, threat modeling, and developer awareness."],
    ],
    format: "Awareness campaigns, technical bootcamps, tabletop exercises, and hands-on labs.",
    audience: "All employees, engineering teams, security professionals, and compliance stakeholders.",
    takeaways: [
      "Security readiness baseline",
      "Scenario-based exercises",
      "Role-specific security guidance",
      "Improvement action roadmap",
    ],
  },
};

const TrainingDetail = () => {
  const { trainingId } = useParams();
  const program =
    TRAINING_PROGRAMS[trainingId] || TRAINING_PROGRAMS["ai-training"];

  return (
    <main className="training-detail">
      <section className="training-detail__hero">
        <div className="training-detail__hero-glow" aria-hidden="true" />
        <div className="training-detail__hero-grid" aria-hidden="true" />

        <div className="training-detail__wrap training-detail__hero-inner">
          <div className="training-detail__hero-copy">
            <Link to="/skill-development" className="training-detail__back pt-4">
              <span>←</span> Skill development
            </Link>

            <p className="training-detail__eyebrow">
              <span className="training-detail__eyebrow-dot" />
              {program.eyebrow}
            </p>

            <h1>
              {program.title}
              <span className="training-detail__title-accent">.</span>
            </h1>

            <p className="training-detail__intro">{program.intro}</p>
            <p className="training-detail__description">
              {program.description}
            </p>

            <div className="training-detail__actions">
              <Link
                to="/contact"
                className="training-detail__button training-detail__button--primary"
              >
                Design your program <span>↗</span>
              </Link>
              <a
                href="#curriculum"
                className="training-detail__button training-detail__button--secondary"
              >
                Explore curriculum
              </a>
            </div>
          </div>

          <div className="training-detail__visual">
            <div className="training-detail__orb" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="training-detail__visual-card">
              <div className="training-detail__visual-top">
                <span>YVI / {program.category}</span>
                <span className="training-detail__live-dot" />
              </div>

              <div className="training-detail__visual-core">
                <span className="training-detail__visual-kicker">
                  CAPABILITY SYSTEM
                </span>
                <strong>{program.accent}</strong>
                <p>Learn → Apply → Measure → Grow</p>
              </div>

              <div className="training-detail__visual-stats">
                {program.stats.map(([number, label]) => (
                  <div key={number}>
                    <span>{number}</span>
                    <p>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" training-detail__section training-detail__section--outcomes">
        <div className="container training-detail__wrap">
          <div className="training-detail__section-heading">
            <div>
              <p className="training-detail__label">01 / Outcomes</p>
              <h2>Training should change what people can do.</h2>
            </div>
            <p>
              Every program is built around practical application. Participants
              gain usable skills, stronger judgment, and tangible outputs they
              can carry back into their work.
            </p>
          </div>

          <div className="training-detail__outcome-grid">
            {program.outcomes.map((outcome, index) => (
              <article className="training-detail__outcome-card" key={outcome}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="training-detail__section training-detail__section--pathway">
        <div className="training-detail__pathway-glow" aria-hidden="true" />

        <div className="container training-detail__wrap">
          <div className="training-detail__section-heading training-detail__section-heading--light">
            <div>
              <p className="training-detail__label">02 / Learning pathway</p>
              <h2>From first principles to confident practice.</h2>
            </div>
            <p>
              A structured journey keeps learning connected to the work, with
              every stage moving participants closer to measurable capability.
            </p>
          </div>

          <div className="training-detail__pathway">
            {program.pathway.map(([number, title, body], index) => (
              <article key={number} className="training-detail__path">
                <div className="training-detail__path-number">
                  <span>{number}</span>
                </div>

                <div className="training-detail__path-content">
                  <p className="training-detail__path-kicker">
                    {index === 0
                      ? "FOUNDATION"
                      : index === 1
                        ? "PRACTICE"
                        : index === 2
                          ? "APPLICATION"
                          : "ADOPTION"}
                  </p>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="curriculum"
        className="training-detail__section training-detail__section--curriculum"
      >
        <div className="container training-detail__wrap">
          <div className="training-detail__section-heading">
            <div>
              <p className="training-detail__label">03 / Curriculum</p>
              <h2>Focused modules for the work ahead.</h2>
            </div>
            <p>
              Modules can be combined, expanded, or tailored around your
              organization's roles, technology environment, and priorities.
            </p>
          </div>

          <div className="training-detail__curriculum-grid">
            {program.tracks.map(([title, body], index) => (
              <article className="training-detail__module" key={title}>
                <div className="training-detail__module-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <span className="training-detail__module-arrow">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="training-detail__section training-detail__section--details">
        <div className="container training-detail__wrap training-detail__details-grid">
          <div className="training-detail__details-card">
            <p className="training-detail__label">04 / Delivery</p>
            <h3>{program.format}</h3>
            <p>
              Choose the format that best fits your teams, schedules, and
              learning objectives.
            </p>
          </div>

          <div className="training-detail__details-card">
            <p className="training-detail__label">05 / Designed for</p>
            <h3>{program.audience}</h3>
            <p>
              Content, depth, examples, and exercises are adapted to the
              participants' roles and level of experience.
            </p>
          </div>
        </div>
      </section>

      <section className="training-detail__section training-detail__section--takeaways">
        <div className="container training-detail__wrap training-detail__takeaways">
          <div>
            <p className="training-detail__label">What teams take away</p>
            <h2>More than a certificate.</h2>
            <p>
              The goal is capability that survives beyond the classroom —
              practical assets, stronger habits, and a clear next step.
            </p>
          </div>

          <div className="training-detail__takeaway-list">
            {program.takeaways.map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="training-detail__cta ">
        <div className=" training-detail__cta-glow" aria-hidden="true" />
        <div className="container training-detail__wrap training-detail__cta-inner">
          <p className="training-detail__label">06 / Start with the outcome</p>
          <h2>
            Build a training program
            <br />
            that moves the business forward.
          </h2>
          <p>
            Tell us what your teams need to achieve. We'll help shape the
            learning journey, delivery model, and practical outcomes around it.
          </p>
          <Link
            to="/contact"
            className="training-detail__button training-detail__button--primary"
          >
            Talk to YVI <span>↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default TrainingDetail;
