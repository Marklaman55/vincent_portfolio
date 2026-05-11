import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSettingsData as getSettings } from "../api/settings";

const Navbar = () => {
  const [settings, setSettings] = useState<any>({
    whatsapp_number: "254103591401",
    company_email: "vincentkamau137@gmail.com"
  });

  useEffect(() => {
    getSettings().then(data => {
      if (data && Object.keys(data).length > 0) {
        setSettings(data);
      }
    }).catch(err => console.error("Navbar Settings Error:", err));
  }, []);

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-tech-gradient flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.583 12l2.667-2.667a4.5 4.5 0 016.364 6.364l-2.667 2.667a3 3 0 01-4.242 0l-1.415-1.415a1.5 1.5 0 00-2.121 0l-1.414 1.414a1.5 1.5 0 002.121 2.121l1.415-1.415zM6 6a3 3 0 110-6 3 3 0 000 6zm0 9a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <span className="text-xl font-display font-bold tracking-tighter uppercase">
              VINCENT<span className="text-gradient">KAMAU</span>
            </span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink 
              to="/" 
              className={(props) => 
                props.isActive 
                  ? "text-primary font-medium px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5" 
                  : "text-ink/60 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              className={(props) => 
                props.isActive 
                  ? "text-primary font-medium px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5" 
                  : "text-ink/60 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5"
              }
            >
              Services
            </NavLink>
            <NavLink 
              to="/portfolio" 
              className={(props) => 
                props.isActive 
                  ? "text-primary font-medium px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5" 
                  : "text-ink/60 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5"
              }
            >
              Portfolio
            </NavLink>
            <NavLink 
              to="/contact" 
              className={(props) => 
                props.isActive 
                  ? "text-primary font-medium px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5" 
                  : "text-ink/60 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5"
              }
            >
              Contact
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href={`https://wa.me/${settings.whatsapp_number}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary px-4 py-2 text-sm flex items-center space-x-2"
            >
              WhatsApp
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21h8.25c1.102 0 2- .898 2-2V9c0-1.102-.898-2-2-2H8.25c-1.102 0-2 .898-2 2v10c0 1.102.898 2 2 2z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex items-center px-4 pt-2">
          <div className="flex-1"></div>
          <a 
            href={`https://wa.me/${settings.whatsapp_number}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:block btn-primary px-4 py-2 text-sm flex items-center space-x-2"
          >
            WhatsApp
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21h8.25c1.102 0 2- .898 2-2V9c0-1.102-.898-2-2-2H8.25c-1.102 0-2 .898-2 2v10c0 1.102.898 2 2 2z" />
            </svg>
          </a>
          <button 
            className="md:hidden btn-secondary px-4 py-2 text-sm flex items-center space-x-2"
            id="mobile-menu-button"
            aria-label="Open mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/5"
            >
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/5"
            >
              Services
            </NavLink>
            <NavLink 
              to="/portfolio" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/5"
            >
              Portfolio
            </NavLink>
            <NavLink 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/5"
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;