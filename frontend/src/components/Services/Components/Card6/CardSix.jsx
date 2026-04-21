const CardSix = ({ data }) => {
  return (
    <section className="py-5">
      <div className="container">
        {/* Main Heading */}
        <h2 className="text-start mb-4">{data.title}</h2>

        <div className="row">
          {data.items.map((item, index) => (
            <div key={index} className="col-md-6 d-flex justify-content-start mb-4 p-0">
              <div className="card border-0" style={{ width: "70%" }}>
                <div className="card-body">
                  {/* Card Heading */}
                  <h5 className="card-title mb-3 fs-4 fw-bold">{item.heading}</h5>

                  {/* Sub Items */}
                  {item.subItems.map((sub, i) => (
                    <div key={i} className="mb-3">
                      <h6 className="mb-1 fs-5">{sub.subheading}</h6>
                      <p className="text-muted mb-0" style={{fontSize:"18px"}}>{sub.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardSix;