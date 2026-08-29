import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import team from "../../data/team";
import "./TeamDetail.css";

const TeamDetail = () => {
  const { id } = useParams();

  const leader = team.find((l) => l.id === id);

  if (!leader) return null;

  return (
    <section className="leader" style={{ backgroundColor: "#3B3B3B" }}>
      <div className="container" data-aos="fade-up">

        {/* BREADCRUMB */}
        <div className="back-arrow">
          <Link to="/">Home</Link>
          <i className="bi bi-chevron-right"></i>

          <HashLink smooth to="/about/#team">
            Team
          </HashLink>

          <i className="bi bi-chevron-right"></i>

          <span>{leader.role}</span>
        </div>

        {/* MAIN CONTENT */}
        <div className="meet-the-founder d-flex justify-content-center text-white">

          
          {/* LEFT SECTION */}
<div className="team-left">

  {/* IMAGE */}
  <div className="position-relative">
    <img
      src={leader.image}
      alt={leader.name}
      className="rounded-4 leader-image"
    />
  </div>

  {/* NAME */}
  <div className="team-profile-footer d-flex flex-column align-items-center justify-content-between mt-3">
    <h2 className="fw-bold team-detail-name">
    {leader.name}
  </h2>

  {/* DESIGNATION + LINKEDIN */}
  <div className="team-profile-footer d-flex flex-column align-items-center justify-content-between">

    <div className="team-designation">
      {leader.role}
    </div>

    {leader.linkedin && (
      <a
        href={leader.linkedin}
        className="detail-linkedin"
        target="_blank"
        rel="noreferrer"
        aria-label={`LinkedIn profile of ${leader.name}`}
      >
        <i className="bi bi-linkedin fs-3"></i>
      </a>
    )}

  </div>
  </div>

</div>
          {/* RIGHT SECTION - ONLY PARAGRAPHS */}
          <div className="team-right">

            <div className="team-description">

              {leader.paragraphs?.map((paragraph, index) => {
                const parts = paragraph.split("**");

                return (
                  <p key={index}>
                    {parts.map((part, partIndex) =>
                      partIndex % 2 === 1 ? (
                        <strong key={partIndex}>
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              })}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamDetail;