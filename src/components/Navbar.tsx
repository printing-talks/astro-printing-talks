import React from 'react';

interface NavbarProps {
  logo?: string;
  links?: Array<{ title: string; href: string }>;
  ctaHref?: string;
}

const Navbar: React.FC<NavbarProps> = ({ logo, links = [], ctaHref }) => {
  return (
    <nav className="mt-4 sticky top-4 z-30 rounded-lg flex items-center justify-between p-4 backdrop-blur-2xl">
      {logo && <img src={logo} alt="Logo" className="h-8" />}
      <ul className="flex space-x-4">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} className="hover:text-gray-300">{link.title}</a>
          </li>
        ))}
      </ul>
      {ctaHref && (
        <a href={ctaHref} className="px-4 py-2 bg-accent text-accent-content hover:bg-accent rounded text-sm">
          CTA
        </a>
      )}
    </nav>
  );
};

export default Navbar;