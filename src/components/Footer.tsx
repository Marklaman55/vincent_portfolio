import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Zap className="text-primary w-8 h-8 fill-primary" />
            <span className="text-2xl font-display font-bold tracking-tighter uppercase">VINCENT KAMAU</span>
          </Link>
          <p className="text-white/60 max-w-sm mb-8 leading-relaxed">
            Software Engineer specializing in building the next generation of digital connectivity and futuristic web systems.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
              <Linkedin size={18} />
            </a>
            <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
              <Github size={18} />
            </a>
            <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-white/60 hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/services" className="text-white/60 hover:text-primary transition-colors">Services</Link></li>
            <li><Link to="/portfolio" className="text-white/60 hover:text-primary transition-colors">Portfolio</Link></li>
            <li><Link to="/contact" className="text-white/60 hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">Services</h4>
           <ul className="space-y-4 font-mono text-xs opacity-70">
            <li>/ WEB SYSTEMS</li>
            <li>/ UI ARCHITECTURE</li>
            <li>/ DIGITAL BRANDING</li>
            <li>/ CLOUD SOLUTIONS</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:row items-center justify-between gap-4 text-white/40 text-xs uppercase tracking-[0.2em]">
        <span>&copy; {new Date().getFullYear()} VINCENT KAMAU</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
