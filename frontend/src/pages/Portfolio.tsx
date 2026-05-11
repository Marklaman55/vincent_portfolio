import { motion } from "motion/react";
import { ExternalLink, Search } from "lucide-react";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { getProjects } from "../api/portfolio";

const Portfolio = () => {
  const [projects, setProjects] = useState<any[]>([
    {
      id: 1,
      name: "EasyMove Kenya",
      description: "A comprehensive relocation and logistics platform for the Kenyan market. Features seamless booking, real-time tracking, and verified movers.",
      technologies: "React, TailWind CSS, Vercel",
      link: "https://easymove-kenya.vercel.app/",
      imageUrl: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=1200",
      category: "Web"
    },
    {
      id: 2,
      name: "katiani.Styles",
      description: "A premium fashion and styling showcase platform. Elegant design focused on visual storytelling and appointment scheduling.",
      technologies: "React, Framer Motion, Vercel",
      link: "https://styled-by-kim.vercel.app/",
      imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200",
      category: "Web"
    }
  ]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Project Load Error:", err);
      }
    };
    loadProjects();
  }, []);

  const categories = ["All", "Web", "Design"];
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.technologies?.toLowerCase().includes(filter.toLowerCase()) || p.description?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="pt-32 pb-24">
      <SEO 
        title="Portfolio" 
        description="View our collection of high-performance digital products. Our portfolio showcases successful projects in web development, e-commerce, and trading systems."
        keywords="web hub portfolio, web development projects kenya, e-commerce success stories, trading platform examples"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold mb-6"
          >
            Our <span className="text-gradient">Portfolio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-ink/60"
          >
            Explore our collection of digital products and success stories.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                filter === cat 
                  ? "bg-tech-gradient text-white shadow-lg shadow-primary/20" 
                  : "glass text-ink/60 hover:text-primary border-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass rounded-3xl overflow-hidden glass-hover border-primary/5 bg-white/40"
              >
                <div className="aspect-[16/10] overflow-hidden relative border-b border-primary/10 bg-tech-gradient p-1">
                  <div className="w-full h-full rounded-t-xl overflow-hidden shadow-2xl relative group-hover:scale-[1.02] transition-transform duration-500">
                    {/* Browser Header Mockup */}
                    <div className="bg-bg/90 backdrop-blur px-3 py-2 flex items-center space-x-1.5 border-b border-primary/5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                      <div className="ml-2 flex-grow bg-white/50 rounded flex items-center px-3 py-0.5 text-[10px] text-ink/40 font-mono truncate">
                        {project.link.replace('https://', '')}
                      </div>
                    </div>
                    <img 
                      src={project.imageUrl || `https://picsum.photos/seed/${project.id}/1200/800`} 
                      alt={project.name} 
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-display font-bold">{project.name}</h3>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 glass rounded-full hover:text-primary transition-colors border-primary/10"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-ink/60 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.split(',').map((tech: string) => (
                      <span key={tech} className="text-xs font-bold px-3 py-1 rounded-full bg-primary/5 text-primary/60 border border-primary/10">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <Search className="w-12 h-12 text-ink/10 mx-auto mb-4" />
              <p className="text-ink/40 text-lg">No projects found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
