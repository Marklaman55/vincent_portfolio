import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSettingsData as getSettings } from "../api/settings";

const AdminLayout = ({ children }) => {
  const [settings, setSettings] = useState<any>({
    whatsapp_number: "254103591401",
    company_email: "vincentkamau137@gmail.com"
  });

  useEffect(() => {
    getSettings().then(data => {
      if (data && Object.keys(data).length > 0) {
        setSettings(data);
      }
    }).catch(err => console.error("AdminLayout Settings Error:", err));
  }, []);

  return (
    <div className="min-h-screen flex bg-white/90">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-primary/10">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-tech-gradient flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.583 12l2.667-2.667a4.5 4.5 0 016.364 6.364l-2.667 2.667a3 3 0 01-4.242 0l-1.415-1.415a1.5 1.5 0 00-2.121 0l-1.414 1.414a1.5 1.5 0 002.121 2.121l1.415-1.415zM6 6a3 3 0 110-6 3 3 0 000 6zm0 9a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <span className="text-xl font-display font-bold tracking-tighter uppercase">
              VINCENT<span className="text-gradient">KAMAU</span>
            </span>
          </div>
          <nav className="mt-8 space-y-2">
            <NavLink 
              to="/admin/dashboard" 
              className={(props) => 
                props.isActive 
                  ? "flex items-center space-x-4 text-primary font-medium px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5" 
                  : "flex items-center space-x-4 text-ink/60 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5"
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m-3-3H9a3 3 0 00-3 3v5a3 3 0 003 3h6a3 3 0 003-3V9a3 3 0 00-3-3z" />
              </svg>
              <span>Dashboard</span>
            </NavLink>
            <NavLink 
              to="/admin/projects" 
              className={(props) => 
                props.isActive 
                  ? "flex items-center space-x-4 text-primary font-medium px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5" 
                  : "flex items-center space-x-4 text-ink/60 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5"
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m-3-3H9a3 3 0 00-3 3v5a3 3 0 003 3h6a3 3 0 003-3V9a3 3 0 00-3-3z" />
              </svg>
              <span>Projects</span>
            </NavLink>
            <NavLink 
              to="/admin/services" 
              className={(props) => 
                props.isActive 
                  ? "flex items-center space-x-4 text-primary font-medium px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5" 
                  : "flex items-center space-x-4 text-ink/60 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5"
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m-3-3H9a3 3 0 00-3 3v5a3 3 0 003 3h6a3 3 0 003-3V9a3 3 0 00-3-3z" />
              </svg>
              <span>Services</span>
            </NavLink>
            <NavLink 
              to="/admin/messages" 
              className={(props) => 
                props.isActive 
                  ? "flex items-center space-x-4 text-primary font-medium px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5" 
                  : "flex items-center space-x-4 text-ink/60 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5"
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m-3-3H9a3 3 0 00-3 3v5a3 3 0 003 3h6a3 3 0 003-3V9a3 3 0 00-3-3z" />
              </svg>
              <span>Messages</span>
            </NavLink>
            <NavLink 
              to="/admin/settings" 
              className={(props) => 
                props.isActive 
                  ? "flex items-center space-x-4 text-primary font-medium px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5" 
                  : "flex items-center space-x-4 text-ink/60 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-display hover:bg-primary/5"
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m-3-3H9a3 3 0 00-3 3v5a3 3 0 003 3h6a3 3 0 003-3V9a3 3 0 00-3-3z" />
              </svg>
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-ink">Admin Panel</h1>
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
        </header>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;