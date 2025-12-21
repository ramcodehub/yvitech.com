import { useNavigate } from "react-router-dom";

const TeamCard = ({ team }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/team/${team.id}`);
  };

  return (
    <div
      className="leader-card text-center position-relative"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <img
        src={team.image}
        alt={team.name}
        className="img-fluid rounded-4"
        style={{ height: "360px", objectFit: "cover", border:'2px solid rgba(255, 255, 255, 0.5)' }}
      />

      <h3 className="mt-2 text-white fw-bold">{team.name}</h3>
      <p className="text-white-50 lh-1 fs-6">{team.role}</p>
      <a
              href={team.linkedin}
              className="founder-linkedin"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-linkedin fs-3"></i>
            </a>
    </div>
  );
};

export default TeamCard;
