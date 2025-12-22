import { Link } from "react-router-dom";
import './Header.css'
import yviLogo from '../../assets/img/YVI TechLogo.png'
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

      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      id="header"
      className={`
        header fixed-top white-nav
        ${sticky ? "sticky-active" : ""}
        ${visible ? "header-show" : "header-hide"}
      `}
      data-scrollto-offset="0"
    >
      <div className="container d-flex align-items-center justify-content-between">

        <Link to="/" className="logo d-flex align-items-center scrollto me-auto me-lg-0">
          <img src={yviLogo} height="80px" alt="YVI" />
        </Link>

        <nav id="navbar" className='navbar'>
          <ul>
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link scrollto" to="/about">Explore YVI Tech</Link></li>

            <li
              className="dropdown"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <a href="#"><span>Services</span> <i className="bi bi-chevron-down dropdown-indicator"></i></a>

              {isOpen && (
                <ul>
                  <li className="dropdown">
                    <a href="#"><span>Enterprise Solutions</span> <i className="bi bi-chevron-right dropdown-indicator"></i></a>
                    <ul>
                      <li><Link to="/oracle-hcm" onClick={() => setIsOpen(false)}>Oracle HCM</Link></li>
                      <li><Link to="/oracle-scm" onClick={() => setIsOpen(false)}>Oracle SCM</Link></li>
                      <li><Link to="/oracle-financials" onClick={() => setIsOpen(false)}>Oracle Financials</Link></li>
                      <li><Link to="/sap" onClick={() => setIsOpen(false)}>SAP</Link></li>
                      <li><Link to="/salesforce" onClick={() => setIsOpen(false)}>Salesforce</Link></li>
                      <li><Link to="/other-core-capabilities" onClick={() => setIsOpen(false)}>Other Core Capabilities</Link></li>
                    </ul>
                  </li>

                  <li><Link to="/managed-services" onClick={() => setIsOpen(false)}>Managed Services</Link></li>
                  <li><Link to="/ai-and-data-platform" onClick={() => setIsOpen(false)}>Data and AI Solutions</Link></li>
                  <li><Link to="/rpa-services" onClick={() => setIsOpen(false)}>RPA Services</Link></li>
                  <li><Link to="/digital-marketing" onClick={() => setIsOpen(false)}>Digital Marketing</Link></li>
                  <li className="dropdown">
                    <a href="#"><span>Digital Solutions</span> <i className="bi bi-chevron-right dropdown-indicator"></i></a>
                    <ul>
                      <li><Link to="/ui-ux-design" onClick={() => setIsOpen(false)}>UX/UI Design</Link></li>
                      <li><Link to="/web-development" onClick={() => setIsOpen(false)}>Web Development</Link></li>
                      <li><Link to="/mobile-app-development" onClick={() => setIsOpen(false)}>Mobile Development</Link></li>
                    </ul>
                  </li>
                </ul>
              )}
            </li>

            <li><Link className="nav-link scrollto bttn" to="/contact">Contact Us</Link></li>
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
