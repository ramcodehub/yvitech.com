import React from "react";
const WhyChooseYVI = ({features}) => {
  

  return (
    <section className="py-5 bg-light mb-4">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">
          Why Choose <span className="text-gradient">YVI Tech </span> ?
        </h2>

        <div className="row justify-content-center g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-4 col-sm-6">
              <div className="card border-0 shadow-sm h-100" style={{background:'linear-gradient(135deg,#05F4FA,#2185DA)'}}>
                <div className="card-body text-white">
                  <div className="mb-3">
                    <i className={`${feature.icon} text-white fs-2`}></i>
                  </div>
                  <h5 className="fw-semibold">{feature.title}</h5>
                  <p className="mb-0">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseYVI;