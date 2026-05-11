import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Briefcase, 
  Settings, 
  LogOut, 
  Code2,
  Menu,
  X,
  Layers
} from "lucide-react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Messages", path: "/admin/messages", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Projects", path: "/admin/projects", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Services", path: "/admin/services", icon: <Layers className="w-5 h-5" /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 glass border-r border-primary/10 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-tech-gradient flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold tracking-tighter">
                WEB<span className="text-gradient">HUB</span>
              </span>
            </Link>
            <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-grow px-4 space-y-2 mt-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-tech-gradient text-white shadow-lg shadow-primary/20"
                    : "text-ink/40 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {item.icon}
                <span className="font-bold">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-primary/10">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-bold">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0">
        <header className="h-16 glass border-b border-primary/10 flex items-center justify-between px-8 lg:px-12">
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">Administrator</p>
              <p className="text-xs text-ink/40">Web Hub Tech Agency</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-tech-gradient flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
              WH
            </div>
          </div>
        </header>

        <div className="p-8 lg:p-12 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
