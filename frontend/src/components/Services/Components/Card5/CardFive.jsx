const CardFive = ({ data }) => {
  return (
    <section className="py-4">
      <div className="container">
        <h2 className="text-start fw-bold mb-3">{data.title}</h2>

        <div className="row">
          {data.items.map((item, index) => (
            <div key={index} className="col-md-6 d-flex justify-content-start mb-3 p-0">
              <div className="card border-0" style={{ width: "70%" }}>
                <div className="card-body">
                  <h5 className="card-title fs-4">{item.heading}</h5>
                  <p className="card-text text-muted" style={{fontSize:"18px"}}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardFive;