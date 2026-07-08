import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, Github } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
      isScrolled ? "py-4" : "py-8"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto rounded-3xl transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 px-8 py-4" : "bg-transparent px-0 py-0"
      )}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-ink rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Code2 size={20} />
            </div>
            <span className="text-xl font-display font-bold text-ink tracking-tight uppercase">WebHub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
             {navLinks.map((link) => (
               <Link
                 key={link.path}
                 to={link.path}
                 className={cn(
                   "font-mono text-xs uppercase tracking-widest transition-colors",
                   location.pathname === link.path ? "text-primary font-bold" : "text-ink/60 hover:text-primary"
                 )}
               >
                 {link.name}
               </Link>
             ))}
             
             <a href="https://github.com/Marklaman55" target="_blank" rel="noopener noreferrer" className="text-ink/40 hover:text-ink transition-colors">
               <Github size={18} />
             </a>
           </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-ink p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 md:hidden"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-border overflow-hidden p-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-2xl font-display font-bold",
                    location.pathname === link.path ? "text-primary" : "text-ink"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-ink/5">
                 <a 
                   href="https://github.com/Marklaman55" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-3 text-ink/60 font-mono text-xs uppercase tracking-widest"
                 >
                   <Github size={18} /> GitHub Profile
                 </a>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
