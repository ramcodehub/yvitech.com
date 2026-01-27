import './ApplicationCard.css';

const ApplicationCard = ({ title, items }) => {
  return (
    <div className="application-card rounded-4 p-3">
      <h2 className="m-0 p-0 fs-3 fw-bold colored-logo">{title}</h2>
      <div className="d-flex flex-column py-4">
        {items.map((item, index) => (
          <div key={index}>
            {item.subheading ? (
              <>
                <h3 className="fs-4">{item.subheading}</h3>
                <p className="" style={{ color: '#5a5a5a' }}>
                  {item.description}
                </p>
              </>
            ) : (
              <div className="">
                {item.points?.map((point, i) => (
                  <p key={i} className="" style={{ color: '#5a5a5a' }}>
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