const MaturityTimeline = ({ data }) => {
  return (
    <section className="py-5">
      <div className="container text-center">
        <h2 className="mb-5 fw-bold">{data.title}</h2>

        <div className="d-flex flex-wrap justify-content-between">
          {data.steps.map((step, index) => (
            <div
              key={index}
              className="position-relative text-center mb-4"
              style={{ width: "180px" }}
            >
              {/* Circle */}
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "#0d6efd",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </div>

              {/* Title */}
              <h6 className="mb-1">{step.title}</h6>

              {/* Description */}
              <p className="text-muted small mb-0">
                {step.description}
              </p>

              {/* Connector Line */}
              {index !== data.steps.length - 1 && (
                <div
                  className="position-absolute start-100 translate-middle-y"
                  style={{
                    width: "60px",
                    height: "2px",
                    top:'25%',
                    background: "#dee2e6",
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaturityTimeline;