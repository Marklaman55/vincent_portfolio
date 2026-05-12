import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectPreview from '../components/ProjectPreview';
import { Sparkles, Loader2, X, Globe, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';
import 'react-quill-new/dist/quill.snow.css'; // Import styles for content rendering

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

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
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch projects:', err);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-20 bg-bg min-h-screen">
      <SEO title="Portfolio" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-0.5 bg-primary" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary font-bold">Showcase</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-ink leading-tight">
              COLLECTED <br />
              <span className="text-gradient">WORKS</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
             {categories.map((cat) => (
               <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all",
                  activeCategory === cat 
                    ? "bg-ink text-white" 
                    : "bg-ink/5 text-ink/40 hover:bg-ink hover:text-white"
                )}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-ink/60 font-mono text-sm uppercase tracking-widest">Loading Collection</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project: any, i) => (
                <motion.div
                  key={project._id || project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectPreview 
                    index={i}
                    title={project.title} 
                    category={project.category} 
                    image={project.image} 
                    link={project.link}
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 backdrop-blur-md p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-5xl bg-bg rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl h-[90vh] md:h-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white md:hidden"
                >
                  <X />
                </button>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col overflow-y-auto">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4 block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-ink tracking-tight">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="hidden md:flex w-12 h-12 bg-ink/5 hover:bg-ink hover:text-white rounded-full items-center justify-center transition-all"
                  >
                    <X />
                  </button>
                </div>

                <div className="prose prose-ink max-w-none flex-grow mb-12 ql-editor !p-0">
                  <div 
                    dangerouslySetInnerHTML={{ __html: selectedProject.description }} 
                  />
                </div>

                {selectedProject.link && selectedProject.link !== "#" && (
                  <a 
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary py-4 px-10 flex items-center justify-center gap-3 w-full md:w-max group"
                  >
                    Visit Live Project <Globe className="group-hover:rotate-12 transition-transform" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-32 border-t border-border pt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-8 animate-pulse" />
            <h3 className="text-4xl font-display font-bold text-ink mb-8">Want to see more detailed case studies?</h3>
            <p className="text-xl text-ink/60 mb-12 max-w-xl mx-auto">
              Our archive contains over 150+ successful deployments across fintech, healthtech, and creative industries.
            </p>
            <a href="mailto:hello@webhub.agency" className="btn-primary py-4 px-12 text-lg inline-block">
              Request Full Portfolio
            </a>
        </div>
      </div>
    </div>
  );
}
