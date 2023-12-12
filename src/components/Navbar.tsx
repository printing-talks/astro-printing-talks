interface NavbarProps {
  logo?: string;
  links?: Array<{ title: string; href: string }>;
  ctaHref?: string;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ logo, links = [], ctaHref, className }) => {
  return (
    <nav className={`navbar sticky top-4 z-30 rounded-lg flex items-center justify-between p-4 backdrop-blur-2xl mx-auto w-[98%] sm:w-[95%] ${className}`}>
      <div className="navbar-start gap-4">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost p-0 lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
        {logo && <img src={logo} alt="Logo" className="h-8" />}
      </div >

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