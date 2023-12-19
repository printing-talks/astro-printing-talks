interface NavbarProps {
  logo?: string;
  links?: Array<{ title: string; href: string }>;
  ctaHref?: string;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ logo, links = [], ctaHref, className }) => {
  return (
    <nav className={`navbar relative sm:sticky sm:top-4 z-30 rounded-lg flex items-center justify-between p-4 backdrop-blur-2xl mx-auto w-[98%] sm:w-[95%] ${className}`}>

      <div className="navbar-start gap-4">
        <div className="dropdown">
          <label
            tabIndex={0} // Ensures the label is focusable
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            className="btn btn-ghost p-0 lg:hidden"
            aria-label="Menu" // Descriptive label for screen readers
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true" // Hide decorative icon from screen readers
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0} // Ensures the list is focusable
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            id="dropdown-menu" // Associates the dropdown with its control element
            role="menu" // Semantically identifies the element as a menu
          >
            {links.map((link, index) => (
              <li key={index} role="none"> {/* Ensures proper role for list items within a menu */}
                <a href={link.href} role="menuitem">{link.title}</a> {/* Identifies each link as a menu item */}
              </li>
            ))}
          </ul>
        </div>
        {logo &&
          <a type="button" href="/" aria-label="Home"> {/* Descriptive aria-label */}
            <img src={logo} alt="Logo" className="h-8" /> {/* Alt text for the logo */}
          </a>
        }
      </div>


      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {ctaHref && (
          <a href={ctaHref} className="btn btn-md btn-accent">
            Get Quote
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;