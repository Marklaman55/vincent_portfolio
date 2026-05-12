import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectProps {
  title: string;
  category: string;
  image: string;
  link?: string;
  index: number;
  onClick?: () => void;
}

export default function ProjectPreview({ title, category, image, link, index, onClick }: ProjectProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link && link !== "#") {
      window.open(link, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-ink/5">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500">
            <ArrowUpRight className="text-ink " />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2 block">{category}</span>
          <h3 className="text-2xl font-display font-bold text-ink group-hover:text-primary transition-colors">{title}</h3>
        </div>
        <span className="font-mono text-ink/20 text-xl font-bold">0{index + 1}</span>
      </div>
    </motion.div>
  );
}
