import { useParams } from "react-router-dom";
import team from "../../data/team";
import "./TeamDetail.css";

const TeamDetail = () => {
  const { id } = useParams();
  const leader = team.find((l) => l.id === id);

  if (!leader) return null;

  return (
    <section className="leader" style={{ backgroundColor: "#3B3B3B" }}>
      <div className="container aos-init aos-animate" data-aos="fade-up">
        <div
          className="meet-the-founder d-flex justify-content-center text-white"
          style={{ gap: "3rem" }}
        >
          <div className="position-relative">
            <img src={leader.image} height="450px" alt={leader.name} className="rounded-4"/>

            <div className="founder">
              <span>{leader.role}</span>
            </div>

            <a
              href={leader.linkedin}
              className="founder-linkedin"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-linkedin fs-3"></i>
            </a>
          </div>

          <div className="d-flex flex-column">
            <div
              className="mx-4 pb-4"
              style={{ borderBottom: "1px solid white" }}
            >
              <h2 className="fw-bold">{leader.name}</h2>
              <p style={{ color: "#f5f5f5a0" }}>
                {leader.description}
              </p>
            </div>

            <div className="m-4" style={{ color: "#f5f5f5a0"  }}>
              <h2 className="fw-bold text-white">
                {leader.experienceTitle}
              </h2>

              <p>{leader.experienceIntro}</p>

              <ul className="list-unstyled d-flex flex-column gap-2">
                {leader.experiencePoints.map((point, index) => (
                  <li key={index} className="d-flex gap-2">
                    <i className="bi bi-check-circle-fill text-white"></i>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mx-4 py-4" style={{ color: "#f5f5f5a0" , borderTop:'1px solid white'}}>
              <h2 className="fw-bold text-white">
                {leader.educationTitle}
              </h2>

              <ul className="list-unstyled d-flex flex-column gap-2">
                {leader.educationPoints.map((point, index) => (
                  <li key={index} className="d-flex gap-2">
                    <i className="bi bi-check-circle-fill text-white"></i>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamDetail;
