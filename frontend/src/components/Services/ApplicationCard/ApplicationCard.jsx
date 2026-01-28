import './ApplicationCard.css';

const ApplicationCard = ({ title, items, icon }) => {
  return (
    <div className="application-card rounded-4 p-3">
      <div className="d-flex align-items-center gap-3 mb-3">
        {icon && (
          <i className={`${icon} app-icon`}></i>
        )}
        <h2 className="m-0 p-0 fs-3 fw-bold colored-logo">
          {title}
        </h2>
      </div>

      <div className="d-flex flex-column py-3">
        {items.map((item, index) => (
          <div key={index}>
            {item.subheading ? (
              <>
                <h3 className="fs-5">{item.subheading}</h3>
                <p style={{ color: '#5a5a5a' }}>
                  {item.description}
                </p>
              </>
            ) : (
              <div>
                {item.points?.map((point, i) => (
                  <p key={i} style={{ color: '#5a5a5a' }}>
                    {point}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationCard;
