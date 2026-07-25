import { useNavigate } from "react-router-dom";

const TeamCard = ({ team }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/team/${team.id}`);
  };

  return (
    <div
      className="leader-card text-center"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <div className="team-image-wrapper">
        <img
          src={team.image}
          alt={team.name}
          className="img-fluid"
          style={{
            width: "250px",
            height: "250px",
            objectFit: "cover",
            border: "2px solid rgba(255,255,255,.5)",
            borderRadius: "50%",
          }}
        />

        <a
          href={team.linkedin}
          className="team-linkedin"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <i className="bi bi-linkedin fs-3"></i>
        </a>
      </div>

      <h3 className="mt-3 text-white fw-bold">{team.name}</h3>

      <p className="text-white-50 lh-1 fs-6">
        {team.role}
      </p>
    </div>
  );
};

export default TeamCard;