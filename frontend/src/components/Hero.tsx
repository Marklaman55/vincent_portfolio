import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Globe, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="pt-40 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-ink/5 backdrop-blur-xl border border-ink/10 px-4 py-2 rounded-full mb-8 shadow-sm"
          >
            <Sparkles className="text-primary w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60">Available for new opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-ink tracking-tighter leading-[0.9] mb-12"
          >
            Building Tomorrow's <span className="text-primary italic">Digital</span> Experiences.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-ink/60 max-w-2xl mb-12 leading-relaxed"
          >
            We are a hub of innovation, crafting high-performance web and mobile solutions that scale with your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 mb-20"
          >
            <Link to="/portfolio" className="btn-primary py-5 px-12 text-lg rounded-2xl flex items-center gap-4 group">
              View My Work <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/contact" className="bg-white border border-border py-5 px-12 text-lg rounded-2xl font-bold text-ink hover:bg-ink/5 transition-colors">
              Get in Touch
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-20 border-t border-border w-full"
          >
            {[
              { icon: Zap, label: "Performance First" },
              { icon: Shield, label: "Secure by Design" },
              { icon: Globe, label: "Global Reach" },
              { icon: Sparkles, label: "Creative Vision" }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-ink/5 rounded-2xl flex items-center justify-center text-primary">
                  <feature.icon size={24} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">{feature.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
