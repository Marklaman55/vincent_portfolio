import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top translate-x-20 z-0" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-ink/[0.02] skew-y-6 transform origin-bottom -translate-x-10 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-0.5 bg-primary" />
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-primary font-bold">Software Engineer & Architect</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.85] mb-10 text-ink"
          >
            I ARCHITECT THE <br />
            <span className="text-gradient">DIGITAL FUTURE</span> <br />
            THROUGH CODE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-ink/60 mb-12 max-w-2xl leading-relaxed"
          >
            I'm Vincent Kamau, a software engineer specialized in building high-performance web systems and futuristic digital interfaces with meticulous precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link to="/portfolio" className="btn-primary py-4 px-10 text-lg flex items-center justify-center gap-2 group">
              View Work
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link to="/contact" className="btn-secondary py-4 px-10 text-lg flex items-center justify-center gap-2">
              Let's Talk
              <Zap className="w-5 h-5 fill-ink" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute right-10 bottom-10 hidden xl:block">
        <div className="flex flex-col items-end">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-ink/20 transform rotate-90 origin-right translate-y-20">Established 2024</span>
          <div className="w-px h-32 bg-ink/10 mb-4" />
          <div className="font-display font-black text-ink/5 text-8xl">WH-A</div>
        </div>
      </div>
    </section>
  );
}
