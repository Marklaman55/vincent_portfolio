import { motion } from "motion/react";
import { ArrowRight, Code2, Rocket, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import ServicePreview from "../components/ServicePreview";
import ProjectPreview from "../components/ProjectPreview";
import Testimonials from "../components/Testimonials";
import SEO from "../components/SEO";
import NetworkBackground from "../components/NetworkBackground";

const Home = () => {
  return (
    <div className="overflow-hidden relative">
      <SEO 
        title="Home" 
        description="Web Hub is a futuristic tech agency in Kenya specializing in high-performance web development, e-commerce, and advanced digital solutions."
        keywords="web hub, tech agency kenya, web development nairobi, futuristic web design, digital solutions"
      />
      <NetworkBackground />
      <Hero />
      <Stats />
      <ServicePreview />
      <ProjectPreview />
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-bg to-primary/5 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-3xl border-primary/20 max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to build something <span className="text-gradient">extraordinary?</span>
            </h2>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
              Whether you're a startup or an established enterprise, we have the expertise to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary w-full sm:w-auto flex items-center justify-center group">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/portfolio" className="btn-secondary w-full sm:w-auto">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
