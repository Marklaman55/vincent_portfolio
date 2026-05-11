import { Link } from "react-router-dom";
import { Code2, Github, Twitter, Linkedin, Mail, Facebook, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { getSettingsData as getSettings } from "../api/settings";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.9-.39-2.82-.12-1.07.3-1.91 1.1-2.31 2.12-.26.64-.3 1.34-.14 2.02.24 1.02.9 1.93 1.81 2.47.98.59 2.19.67 3.25.35 1.17-.37 2.12-1.35 2.49-2.5.11-.35.14-.72.15-1.08-.01-5.66-.01-11.31-.01-16.97z"/>
  </svg>
);

const Footer = () => {
  const [settings, setSettings] = useState<any>({
    whatsapp_number: "254103591401",
    company_email: "vincentkamau137@gmail.com"
  });

  useEffect(() => {
    getSettings().then(data => {
      if (data && Object.keys(data).length > 0) {
        setSettings(data);
      }
    }).catch(err => console.error("Footer Settings Error:", err));
  }, []);

  return (
    <footer className="bg-white/50 border-t border-primary/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-tech-gradient flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tighter uppercase">
                VINCENT<span className="text-gradient">KAMAU</span>
              </span>
            </Link>
            <p className="text-ink/60 max-w-md mb-8">
              Full-stack developer and digital transformer based in Kenya. 
              Creating high-performance web systems and advanced digital ecosystems that define the next era of technology.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-5">
              <a href="https://facebook.com/vinnie.kmcn" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl hover:text-primary transition-all hover:scale-110 border-primary/10 shadow-sm" aria-label="Facebook (Vinnie Kmcn)">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/webhubsolutionHS" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl hover:text-primary transition-all hover:scale-110 border-primary/10 shadow-sm" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://tiktok.com/@webhub64" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl hover:text-primary transition-all hover:scale-110 border-primary/10 shadow-sm" aria-label="TikTok">
                <TikTokIcon className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 glass rounded-xl hover:text-primary transition-all hover:scale-110 border-primary/10 shadow-sm" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 glass rounded-xl hover:text-primary transition-all hover:scale-110 border-primary/10 shadow-sm" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-ink/60 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-ink/60 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="text-ink/60 hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="text-ink/60 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-ink/60">
              <li>Nairobi, Kenya</li>
              <li>+{settings.whatsapp_number}</li>
              <li>{settings.company_email}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-ink/40">
          <p>© {new Date().getFullYear()} Vincent Kamau. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
