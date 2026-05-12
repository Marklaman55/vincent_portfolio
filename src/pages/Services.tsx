import React from 'react';
import { motion } from 'motion/react';
import { Code, Layout, Globe, Cpu, Shield, Zap, Sparkles, Megaphone } from 'lucide-react';
import SEO from '../components/SEO';

const services = [
  {
    icon: <Code />,
    title: "Web Systems",
    desc: "Complex backend architectures, API development, and lightning-fast frontend applications.",
    tech: ["React", "Node.js", "TypeScript", "PostgreSQL"]
  },
  {
    icon: <Layout />,
    title: "UI Architecture",
    desc: "Meticulous design systems that prioritize user experience and aesthetic perfection.",
    tech: ["Figma", "Tailwind CSS", "Motion", "Design Ops"]
  },
  {
    icon: <Globe />,
    title: "Digital Branding",
    desc: "Defining your digital identity through futuristic visuals and strong core messaging.",
    tech: ["Motion Graphics", "Color Theory", "Typography", "Visual Language"]
  },
  {
    icon: <Cpu />,
    title: "Custom SaaS",
    desc: "Full-lifecycle development for your software as a service product ideas.",
    tech: ["SaaS Architecture", "Multi-tenancy", "Scalable Storage", "IAM"]
  },
  {
    icon: <Shield />,
    title: "Cyber Security",
    desc: "Hardening your digital assets against modern threats and data breaches.",
    tech: ["Auth Systems", "Encryption", "Security Audits", "Data Integrity"]
  },
  {
    icon: <Megaphone />,
    title: "Growth Engine",
    desc: "Strategic marketing and SEO optimizations to scale your user base exponentially.",
    tech: ["SEO", "Performance Marketing", "Content Strategy", "Analytics"]
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-20 bg-bg min-h-screen">
      <SEO title="Services" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-0.5 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary font-bold">What We Offer</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-ink leading-tight">
            MULTIDISCIPLINARY <br />
            <span className="text-gradient">CAPABILITIES</span>
          </h1>
          <p className="text-xl text-ink/60 mt-8 leading-relaxed max-w-xl">
            We operate at the intersection of technology, design, and strategy to build solutions that don't just work, but inspire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 border border-border rounded-3xl hover:bg-ink hover:text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {React.cloneElement(service.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-ink/60 mb-8 leading-relaxed group-hover:text-white/60 transition-colors">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tech.map((t, idx) => (
                  <span key={idx} className="px-3 py-1 bg-ink/5 group-hover:bg-white/10 rounded-full font-mono text-[10px] uppercase tracking-wider text-ink/40 group-hover:text-white/40">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
