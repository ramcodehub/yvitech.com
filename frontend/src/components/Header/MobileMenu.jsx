import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileMenu.css';

const MobileMenu = () => {
  const [sideBar, setSideBar] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [enterpriseDrop, setEnterpriseDrop] = useState(false);
  const [developmentDrop, setdevelopmentDrop] = useState(false);


  const handleNavigate = () => {
    setSideBar(false);
    setDropDown(false);
    setEnterpriseDrop(false);
    setdevelopmentDrop(false);
  };

  return (
    <>
      <i className="hamburger bi bi-list mobile-nav-toggle" onClick={() => setSideBar(true)}></i>

      {sideBar && <div className="header-overlay" onClick={() => setSideBar(false)}></div>}

      <nav className={`sidebar ${sideBar ? 'open' : ''}`}>
        {sideBar && (
          <i className="bi bi-x mobile-nav-toggle" onClick={() => setSideBar(false)}></i>
        )}
        <ul className="menu">
          <li>
            <Link className="nav-link" to="/" onClick={handleNavigate}>
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link scrollto" to="/about" onClick={handleNavigate}>
              Explore YVI Tech
            </Link>
          </li>

          <li className="dropdown-mobile">
            <button
              className="servicebtn"
              onClick={() => setDropDown(!dropDown)}
            >
              <span>Services</span>{' '}
              <i className={`bi ${dropDown ? 'bi-chevron-up' : 'bi-chevron-down'} dropdown-indicator`}></i>
            </button>

            {dropDown && (
              <ul className="submenu">
                <li className="sub-dropdown">
                  <button
                    className="servicebtn sub-btn"
                    onClick={() => setEnterpriseDrop(!enterpriseDrop)}
                  >
                    <span>Enterprise Solutions</span>{' '}
                    <i className={`bi ${enterpriseDrop ? 'bi-chevron-up' : 'bi-chevron-down'} dropdown-indicator`}></i>
                  </button>

                  {enterpriseDrop && (
                    <ul className="sub-submenu">
                      <li>
                        <Link to="/oracle-hcm" onClick={handleNavigate}>
                          Oracle HCM
                        </Link>
                      </li>
                      <li>
                        <Link to="/oracle-scm" onClick={handleNavigate}>
                          Oracle SCM
                        </Link>
                      </li>
                      <li>
                        <Link to="/oracle-financials" onClick={handleNavigate}>
                          Oracle Financials
                        </Link>
                      </li>
                     <li>
                  <Link to="/sap" onClick={handleNavigate}>
                    SAP
                  </Link>
                </li>
                <li>
                  <Link to="/salesforce" onClick={handleNavigate}>
                    Salesforce
                  </Link>
                </li> 
                      <li>
                        <Link to="/other-core-capabilities" onClick={handleNavigate}>
                          Other Core Capabilities
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link to="/managed-services" onClick={handleNavigate}>
                    Managed Services
                  </Link>
                </li>
              
                <li>
                  <Link to="/ai-and-data-platform" onClick={handleNavigate}>
                    Data and AI Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/rpa-services" onClick={handleNavigate}>
                    Automation & RPA
                  </Link>
                </li>
                
                <li>
                  <Link to="/digital-marketing" onClick={handleNavigate}>
                    Digital Marketing
                  </Link>
                </li>
                <li className="sub-dropdown">
                  <button
                    className="servicebtn sub-btn"
                    onClick={() => setdevelopmentDrop(!developmentDrop)}
                  >
                    <span>Digital Solutions</span>{' '}
                    <i className={`bi ${developmentDrop ? 'bi-chevron-up' : 'bi-chevron-down'} dropdown-indicator`}></i>
                  </button>

                  {developmentDrop && (
                    <ul className="sub-submenu">
                      <li>
                        <Link to="/ui-ux-design" onClick={handleNavigate}>
                          UX/UI Design
                        </Link>
                      </li>
                      <li>
                        <Link to="/web-development" onClick={handleNavigate}>
                          Web Development
                        </Link>
                      </li>
                      <li>
                        <Link to="/mobile-app-development" onClick={handleNavigate}>
                          Mobile Development
                        </Link>
                      </li>
                    </ul>
                  )}
                  </li>
                
              </ul>
            )}
          </li>

          <li>
            <Link className="nav-link scrollto" to="/contact" onClick={handleNavigate}>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileMenu;
