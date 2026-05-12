import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Hero from '../components/Hero';
import ProjectPreview from '../components/ProjectPreview';
import { ArrowRight, Code, Layout, Smartphone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(async res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Expected JSON response from server");
        }
        return res.json();
      })
      .then(data => {
        setFeaturedProjects(data.slice(0, 3));
      })
      .catch(err => console.error('Failed to fetch home projects:', err));
  }, []);

  const services = [
    { 
      icon: <Code className="w-8 h-8" />, 
      title: "Web Systems", 
      desc: "Building complex, scalable web infrastructures using modern frameworks." 
    },
    { 
      icon: <Layout className="w-8 h-8" />, 
      title: "UI Architecture", 
      desc: "Crafting beautiful, functional interfaces with meticulous attention to detail." 
    },
    { 
      icon: <Globe className="w-8 h-8" />, 
      title: "Digital Strategy", 
      desc: "Positioning brands for success in the competitive digital landscape." 
    },
  ];

  return (
    <div className="bg-bg">
      <SEO title="Home" />
      <Hero />

      {/* Services Section */}
      <section className="py-32 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary mb-6 block">Capabilities</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-tight">
                WE PROVIDE END-TO-END <br />
                <span className="text-primary">DIGITAL SOLUTIONS</span>
              </h2>
            </div>
            <Link to="/services" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors pb-2 border-b border-white/20">
              Explore All Services
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <div className="mb-6 text-primary group-hover:scale-110 transition-transform origin-left">{service.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-white/50 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 text-ink">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary mb-6 block">Selected Work</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-tight">
                CRAFTING PERSONAL <br />
                <span className="text-gradient">LEGACIES</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProjects.map((project, i) => (
              <ProjectPreview 
                key={project._id || i} 
                index={i}
                title={project.title} 
                category={project.category} 
                image={project.image} 
                link={project.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-ink mb-12">
            HAVE A VISION? <br />
            LET'S ARCHITECT IT.
          </h2>
          <Link to="/contact" className="inline-flex items-center gap-4 text-2xl font-display font-bold bg-ink text-white py-6 px-12 rounded-full hover:scale-105 transition-transform group">
            Start Your Journey
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
