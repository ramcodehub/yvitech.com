const SAPImplementation = ({
  title,
  subtitle,
  description,
  image,
  points = [],
  extraContent,
}) => {
  return (
    <div
      className="container m-0 p-0 pb-5 my-5 border-0 shadow-sm "
      style={{backgroundColor:"#F6F9FF"}}
    >
      <div className="row gx-0 ">
        {(title || subtitle) && (
          <div className="col-lg-12 d-flex flex-column  px-4 pt-3">
            <div className="pb-3">
              {title && (
                <h1 className="m-0 p-0 lh-1 fw-bold" style={{color: '#012970'}}>
                  {title}
                </h1>
              )}
            </div>
            {description && (
              <div className="" >
                <p className="p-0 m-0 " style={{fontSize: "1.18rem" }}>
                  {description}
                </p>
              </div>
            )}
          </div>
        )}

        {image && (
          <div className="col-lg-12 d-flex flex-column align-items-center">
            <img src={image} height='600px' className="img-fluid about-imgg" alt="" />
          </div>
        )}

        {subtitle && (
          <h2 className="px-4 pt-4 fw-bold" style={{color: '#012970'}}>
            {subtitle}
          </h2>
        )}

        {points.length > 0 && (
          <div className="col-lg-12 m-0 p-0 ">
            <ul className="list-unstyled"
              style={{
                fontSize: "1.25rem",
                paddingLeft: "2rem",
              }}
            >
              {points.map((point, index) => (
                <li key={index} className="mb-2">
                  <i class="bi bi-arrow-return-right me-2"></i>{point.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {extraContent && (
          <div
            className="content text-start px-4"
            style={{fontSize: "1.25rem" }}
          >
            {extraContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default SAPImplementation;