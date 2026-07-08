import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Zap } from 'lucide-react';
import SEO from '../components/SEO';

const contactInfo = [
  { icon: <Mail />, label: "Email", value: "webhubsolutions@gmail.com", href: "mailto:webhubsolutions@gmail.com" },
  { icon: <Phone />, label: "WhatsApp", value: "0103591401", href: "https://wa.me/254103591401" },
  { icon: <MapPin />, label: "Location", value: "Nairobi, Kenya", href: "#" },
];

export default function Contact() {
  return (
    <div className="pt-32 pb-20 bg-bg min-h-screen">
      <SEO title="Contact" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-0.5 bg-primary" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary font-bold">Get In Touch</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-ink leading-tight mb-8">
              LET'S START A <br />
              <span className="text-gradient">CONVERSATION</span>
            </h1>
            <p className="text-xl text-ink/60 leading-relaxed max-w-xl mb-12">
              Whether you have a fully-vetted specifications document or just a rough idea written on a napkin, we're ready to architect your next digital breakthrough.
            </p>

            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={i}
                  href={info.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 group p-4 border border-border rounded-2xl hover:bg-ink hover:text-white transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {React.cloneElement(info.icon as React.ReactElement<any>, { size: 20 })}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider block opacity-50">{info.label}</span>
                    <span className="text-xl font-bold font-display">{info.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-12">
               <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/30 mb-6 block">Follow Socials</span>
               <div className="flex gap-4">
                <a href="#" className="w-12 h-12 border border-border rounded-full flex items-center justify-center text-ink/40 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-12 h-12 border border-border rounded-full flex items-center justify-center text-ink/40 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-12 h-12 border border-border rounded-full flex items-center justify-center text-ink/40 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-primary/5 -skew-x-6 transform translate-x-4 translate-y-4 rounded-3xl" />
             <div className="relative glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
               <div className="text-center mb-8">
                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                   <Phone size={28} />
                 </div>
                 <h3 className="text-2xl font-display font-bold text-ink mb-2">Text us on WhatsApp</h3>
                 <p className="text-ink/60 mb-6">We typically reply within minutes during business hours.</p>
                 <a
                   href="https://wa.me/254103591401"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
                 >
                   <Phone size={20} />
                   Chat Now
                 </a>
               </div>
             </div>

             {/* Decorative Elements */}
             <div className="absolute -bottom-10 -left-10 w-32 h-32 border-2 border-primary/20 rounded-full flex items-center justify-center animate-spin-slow">
                <Zap size={40} className="text-primary/20" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
