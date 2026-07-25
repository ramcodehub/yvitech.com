import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./WebsiteHeaderTemplate.css";

const defaultNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Strategy", href: "/services/strategy" },
      { label: "Development", href: "/services/development" },
      { label: "Marketing", href: "/services/marketing" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const defaultTheme = {
  background: "linear-gradient(90deg, #f7f9ff 0%, #ffffff 100%)",
  text: "#14213d",
  muted: "#5f6f8f",
  accent: "#3563e9",
  border: "rgba(20, 33, 61, 0.12)",
  shadow: "0 10px 30px rgba(20, 33, 61, 0.08)",
};

const WebsiteHeaderTemplate = ({
  logoSrc,
  logoAlt = "Brand logo",
  brandName = "Your Brand",
  logoHref = "/",
  navItems = defaultNavItems,
  ctaLabel = "Get Started",
  ctaHref = "/contact",
  theme = defaultTheme,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState(null);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerStyle = {
    "--header-bg": theme.background || defaultTheme.background,
    "--header-text": theme.text || defaultTheme.text,
    "--header-muted": theme.muted || defaultTheme.muted,
    "--header-accent": theme.accent || defaultTheme.accent,
    "--header-border": theme.border || defaultTheme.border,
    "--header-shadow": theme.shadow || defaultTheme.shadow,
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setActiveMobileMenu(null);
  };

  return (
    <>
      <header className={`site-header ${isSticky ? "is-sticky" : ""}`} style={headerStyle}>
        <div className="container header-shell">
          <Link to={logoHref} className="brand" onClick={() => setActiveDesktopMenu(null)}>
            {logoSrc ? (
              <img src={logoSrc} alt={logoAlt} className="brand-logo" />
            ) : (
              <span className="brand-mark">{brandName.charAt(0)}</span>
            )}
            <span className="brand-name">{brandName}</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className={`nav-item ${item.children ? "has-dropdown" : ""}`}
                  onMouseEnter={() => item.children && setActiveDesktopMenu(item.label)}
                  onMouseLeave={() => item.children && setActiveDesktopMenu(null)}
                >
                  {item.children ? (
                    <>
                      <button className="nav-link nav-link-button" type="button">
                        <span>{item.label}</span>
                        <i className="bi bi-chevron-down" />
                      </button>
                      {activeDesktopMenu === item.label && (
                        <div className="dropdown-panel">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="dropdown-link"
                              onClick={() => setActiveDesktopMenu(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link to={item.href} className="nav-link">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <Link to={ctaHref} className="header-cta">
            {ctaLabel}
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-label="Open navigation"
            onClick={() => setIsMobileOpen(true)}
          >
            <i className="bi bi-list" />
          </button>
        </div>
      </header>

      {isMobileOpen && <div className="mobile-backdrop" onClick={closeMobileMenu} />}

      <aside className={`mobile-panel ${isMobileOpen ? "open" : ""}`}>
        <div className="mobile-panel-head">
          <Link to={logoHref} className="brand brand-mobile" onClick={closeMobileMenu}>
            {logoSrc ? (
              <img src={logoSrc} alt={logoAlt} className="brand-logo" />
            ) : (
              <span className="brand-mark">{brandName.charAt(0)}</span>
            )}
            <span className="brand-name">{brandName}</span>
          </Link>

          <button type="button" className="close-menu" aria-label="Close navigation" onClick={closeMobileMenu}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Mobile navigation">
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.label} className="mobile-nav-item">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="mobile-nav-trigger"
                      onClick={() =>
                        setActiveMobileMenu((current) => (current === item.label ? null : item.label))
                      }
                    >
                      <span>{item.label}</span>
                      <i className={`bi ${activeMobileMenu === item.label ? "bi-chevron-up" : "bi-chevron-down"}`} />
                    </button>

                    {activeMobileMenu === item.label && (
                      <ul className="mobile-submenu">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link to={child.href} onClick={closeMobileMenu}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link to={item.href} className="mobile-nav-link" onClick={closeMobileMenu}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Link to={ctaHref} className="mobile-cta" onClick={closeMobileMenu}>
          {ctaLabel}
        </Link>
      </aside>
    </>
  );
};

export default WebsiteHeaderTemplate;
