import { motion } from "motion/react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProjectPreview = () => {
  const [projects] = useState<any[]>([
    {
      id: 1,
      name: "EasyMove Kenya",
      description: "A comprehensive relocation and logistics platform for the Kenyan market.",
      technologies: "React, Tailwind, Vercel",
      link: "https://easymove-kenya.vercel.app/",
      imageUrl: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 2,
      name: "Styled by Kim",
      description: "A premium fashion and styling showcase platform.",
      technologies: "React, Framer Motion, Vercel",
      link: "https://styled-by-kim.vercel.app/",
      imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200"
    }
  ]);

  return (
    <section className="py-24 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-lg text-ink/60">
              A selection of high-impact digital solutions I've architected and deployed recently.
            </p>
          </div>
          <Link to="/portfolio" className="btn-secondary">
            View Full Portfolio
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="glass rounded-2xl overflow-hidden border-primary/10 glass-hover bg-white/40">
                  <div className="aspect-[16/10] overflow-hidden relative border-b border-primary/10">
                    <div className="absolute top-3 left-3 flex space-x-1 z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    </div>
                    <img 
                      src={project.imageUrl || `https://picsum.photos/seed/${project.id}/800/500`} 
                      alt={project.name} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary py-2 px-4 text-sm flex items-center shadow-2xl"
                      >
                        Visit Live Site <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold mb-2">{project.name}</h3>
                    <p className="text-ink/60 text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.split(',').map((tech: string) => (
                        <span key={tech} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-primary/5 text-primary/60 border border-primary/10">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Fallback placeholders if no projects in DB
            [1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-2xl p-8 h-80 flex flex-col justify-center items-center text-center border-primary/5">
                <div className="w-12 h-12 rounded-full bg-primary/5 mb-4 animate-pulse" />
                <div className="h-4 w-3/4 bg-primary/5 rounded mb-2 animate-pulse" />
                <div className="h-4 w-1/2 bg-primary/5 rounded animate-pulse" />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectPreview;
