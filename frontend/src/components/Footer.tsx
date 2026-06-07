import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-display font-bold mb-6 tracking-tight">Let's build something <span className="text-primary">extraordinary</span> together.</h2>
            <p className="text-white/60 max-w-md mb-8">Currently available for selected freelance projects and collaborations. If you have an idea, let's make it a reality.</p>
            <a href="mailto:hello@webhub.agency" className="text-2xl font-display font-bold hover:text-primary transition-colors flex items-center gap-4">
              hello@webhub.agency <Mail className="w-6 h-6" />
            </a>
          </div>

          <div>
            <h4 className="text-primary font-mono text-xs uppercase tracking-widest mb-6">Sitemap</h4>
            <ul className="space-y-4 font-mono text-sm">
              <li><Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-white/60 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="text-white/60 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="text-white/60 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-mono text-xs uppercase tracking-widest mb-6">Social</h4>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Github, label: 'GitHub', href: 'https://github.com/Marklaman55' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  target={social.href !== '#' ? "_blank" : undefined}
                  rel={social.href !== '#' ? "noopener noreferrer" : undefined}
                  className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary hover:text-ink transition-all group"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">&copy; {currentYear} WebHub Technologies</span>
            <Link to="/admin" className="text-[10px] font-mono text-white/10 hover:text-white/40 transition-colors uppercase tracking-widest ml-4">Admin Login</Link>
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-white/40 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
