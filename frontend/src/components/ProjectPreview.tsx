import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectPreviewProps {
  title: string;
  category: string;
  image: string;
  link?: string;
  onClick?: () => void;
  index?: number;
}

export default function ProjectPreview({ title, category, image, link, onClick, index }: ProjectPreviewProps) {
  const displayImage = link && (image.includes('picsum.photos') || image.includes('placeholder') || image.includes('unsplash.com'))
    ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(link)}?w=800`
    : image;

  return (
    <motion.div 
      onClick={onClick}
      className="group relative bg-white rounded-[2rem] overflow-hidden border border-border cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="aspect-[4/3] overflow-hidden bg-ink/5">
        <img 
          src={displayImage} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold block mb-2">{category}</span>
            <h3 className="text-2xl font-display font-bold text-ink tracking-tight">{title}</h3>
          </div>
          <div className="w-12 h-12 bg-ink text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-y-4 group-hover:translate-y-0">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/10 rounded-[2rem] transition-colors pointer-events-none" />
    </motion.div>
  );
}
