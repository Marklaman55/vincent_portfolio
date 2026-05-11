import { motion } from "motion/react";
import { Globe, ShoppingCart, TrendingUp, BarChart3, Settings, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Globe className="w-8 h-8" />,
    name: "Web Development",
    description: "Custom websites built with modern frameworks for speed and scalability."
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    name: "E-commerce Solutions",
    description: "Robust online stores with seamless payment integration and inventory management."
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    name: "Trading Systems",
    description: "High-frequency trading platforms and automated execution systems."
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    name: "Market Signals",
    description: "Real-time data analysis and signal generation for financial markets."
  },
];

const ServicePreview = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Our <span className="text-gradient">Ecosystem</span>
            </h2>
            <p className="text-lg text-ink/60">
              We offer a comprehensive suite of digital services designed to help your business thrive in the modern landscape.
            </p>
          </div>
          <Link to="/services" className="btn-secondary">
            View All Services
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-2xl glass-hover group border-primary/5"
            >
              <div className="w-16 h-16 rounded-xl bg-tech-gradient flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                {service.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-4">{service.name}</h3>
              <p className="text-ink/60 leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePreview;
