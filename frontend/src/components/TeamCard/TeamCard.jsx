import { useNavigate } from "react-router-dom";

const TeamCard = ({ team }) => {
  const navigate = useNavigate();

  const handleClick = () => {

    if (team.clickable === false) return;

    navigate(`/team/${team.id}`);
  };

  return (
    <div
      className="leader-card text-center"
      style={{
        cursor: team.clickable === false ? "default" : "pointer",
      }}
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

        {/* {team.showLinkedin !== false && ( */}
          <a
            href={team.linkedin || "#"}
            className={`team-linkedin ${!team.linkedin ? "disabled-linkedin" : ""}`}
            target={team.linkedin ? "_blank" : undefined}
            rel="noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              if (!team.linkedin) e.preventDefault();
            }}
          >
            <i className="bi bi-linkedin fs-3"></i>
          </a>
        {/* )} */}
      </div>

      <h3 className="mt-3 text-white fw-bold">{team.name}</h3>

      <p className="text-white-50 lh-1 fs-6">
        {team.role}
      </p>
    </div>
  );
};

export default TeamCard;