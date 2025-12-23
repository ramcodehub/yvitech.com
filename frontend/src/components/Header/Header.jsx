import { Link } from "react-router-dom";
import "./Header.css";
import yviLogo from "../../assets/img/YVI TechLogo.png";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setSticky(currentScrollY > 50);
      setVisible(!(currentScrollY > lastScrollY && currentScrollY > 20));
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`header fixed-top white-nav ${
        sticky ? "sticky-active" : ""
      } ${visible ? "header-show" : "header-hide"}`}
    >
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="logo">
          <img src={yviLogo} alt="YVI" height="80" />
        </Link>

        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">Explore YVI Tech</Link></li>

            <li
              className="dropdown megamenu"
              onMouseEnter={() => setIsOpen(true)}
            >
              <a href="#">
                Services <i className="bi bi-chevron-down"></i>
              </a>

              {isOpen && (
                <div className="mega-menu py-4 px-5 d-flex " onMouseLeave={() => setIsOpen(false)} >
                  <h2 className="fw-bold lh-1 m-0 p-0">Our Services</h2>
                <div className="d-flex align-items-start py-2  w-100" >

                  <div className="mega-right d-flex align-items-start justify-content-evenly col-md-8 " >
                    <div className="mega-column" >
                      <h5>Enterprise Solutions</h5>
                      <Link to="/oracle-hcm" onClick={() => setIsOpen(false)}>Oracle HCM</Link>  
                      <Link to="/oracle-scm" onClick={() => setIsOpen(false)}>Oracle SCM</Link>
                      <Link to="/oracle-financials" onClick={() => setIsOpen(false)}>Oracle Financials</Link>
                      <Link to="/sap" onClick={() => setIsOpen(false)}>SAP</Link>
                      <Link to="/salesforce" onClick={() => setIsOpen(false)}>Salesforce</Link>
                      <Link to="/other-core-capabilities" onClick={() => setIsOpen(false)}>Other Core Capabilities</Link>
                    </div>

                    <div className="mega-column">
                      <h5>Digital Solutions</h5>
                      <Link to="/ui-ux-design" onClick={() => setIsOpen(false)}>UX / UI Design</Link>
                      <Link to="/web-development" onClick={() => setIsOpen(false)}>Web Development</Link>
                      <Link to="/mobile-app-development" onClick={() => setIsOpen(false)}>Mobile Development</Link>
                    </div>
                  </div>
                  <div className="mega-left  col-md-4">
                    <div>
                      <Link to="/managed-services" onClick={() => setIsOpen(false)}>Managed Services</Link>
                      <Link to="/ai-and-data-platform" onClick={() => setIsOpen(false)}>Data & AI Solutions</Link>
                      <Link to="/rpa-services" onClick={() => setIsOpen(false)}>RPA Services</Link>
                      <Link to="/digital-marketing" onClick={() => setIsOpen(false)}>Digital Marketing</Link>
                    </div>
                  </div>
                </div>
               </div> 
              )}
            </li>

            <li>
              <Link className="bttn" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mobilemenu">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
