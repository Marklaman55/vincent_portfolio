import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Loader2, ArrowLeft, Globe, Briefcase, Calendar } from 'lucide-react';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';
import 'react-quill-new/dist/quill.snow.css';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project] = useState<any | null>(projects.find(p => p._id === id) || null);

  if (!project) {
    return (
      <div className="pt-32 pb-20 bg-bg min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-display font-bold text-ink mb-4">Project Not Found</h1>
        <p className="text-ink/60 mb-8 max-w-md">The project you're looking for doesn't exist or has been moved.</p>
        <Link to="/portfolio" className="btn-primary py-3 px-8 flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  // Extract keywords from category and description
  const keywords = `${project.category}, ${project.title}, web development, UI UX design, portfolio, case study`.toLowerCase();
  
  // Create a clean meta description
  const metaDescription = project.description 
    ? project.description.replace(/<[^>]*>/g, '').substring(0, 160).trim() + '...'
    : `Detailed information about the work on ${project.title} in the ${project.category} category.`;

  return (
    <div className="pt-32 pb-20 bg-bg min-h-screen">
      <SEO 
        title={project.title} 
        description={metaDescription}
        keywords={keywords}
      />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link 
            to="/portfolio" 
            className="group flex items-center gap-2 text-ink/40 hover:text-primary transition-colors font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Collection
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4 block">
                {project.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-ink tracking-tighter leading-tight mb-8">
                {project.title}
              </h1>
            </div>

            <div className="flex flex-wrap gap-12 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ink/5 rounded-full flex items-center justify-center text-primary">
                  <Briefcase size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-ink/40 uppercase tracking-widest">Industry</p>
                  <p className="font-medium">{project.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ink/5 rounded-full flex items-center justify-center text-primary">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-ink/40 uppercase tracking-widest">Year</p>
                  <p className="font-medium">{new Date(project.createdAt).getFullYear()}</p>
                </div>
              </div>
            </div>

            {project.link && project.link !== "#" && (
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-4 px-10 flex items-center justify-center gap-3 w-max group"
              >
                Launch Project <Globe className="group-hover:rotate-12 transition-transform" />
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="mb-12">
            <h2 className="text-3xl font-display font-bold text-ink mb-8 border-l-4 border-primary pl-6">
              PROJECT OVERVIEW
            </h2>
            <div className="prose prose-xl prose-ink max-w-none text-ink/70 ql-editor !p-0">
              <div 
                dangerouslySetInnerHTML={{ __html: project.description }} 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
