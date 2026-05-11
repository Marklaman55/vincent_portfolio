import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-sm font-bold mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Defining The Next Era of Tech</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-8 leading-[1.1]"
          >
            The Future of <br />
            <span className="text-gradient">Digital Connectivity</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-ink/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Web Hub is a futuristic technology agency specializing in high-performance web systems, 
            intelligent connectivity, and advanced digital ecosystems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact" className="btn-primary w-full sm:w-auto flex items-center justify-center group">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/services" className="btn-secondary w-full sm:w-auto">
              Explore Ecosystem
            </Link>
          </motion.div>
        </div>

        {/* Hero Image/Mockup Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="glass rounded-2xl border-primary/10 overflow-hidden shadow-2xl p-2 bg-white/30">
            <div className="bg-bg rounded-xl overflow-hidden aspect-video relative">
              <img 
                src="https://picsum.photos/seed/future/1920/1080" 
                alt="Web Hub Interface" 
                className="object-cover w-full h-full opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
