import { motion } from "motion/react";
import { Globe, ShoppingCart, TrendingUp, BarChart3, Settings, Lightbulb, RefreshCw, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const services = [
  {
    icon: <Globe className="w-10 h-10" />,
    name: "Website Development",
    description: "Custom, high-performance websites built with React, Next.js, and modern tech stacks. My focus is on speed, SEO, and superior user experience.",
    features: ["Responsive Design", "SEO Optimization", "Fast Loading", "Custom CMS"]
  },
  {
    icon: <ShoppingCart className="w-10 h-10" />,
    name: "E-commerce Development",
    description: "Scalable online stores that convert. I build custom e-commerce solutions or integrate with Shopify and WooCommerce.",
    features: ["Secure Payments", "Inventory Management", "Customer Analytics", "Mobile Commerce"]
  },
  {
    icon: <TrendingUp className="w-10 h-10" />,
    name: "Trading Systems",
    description: "Advanced trading platforms with real-time data execution, automated strategies, and high-security protocols.",
    features: ["Low Latency", "API Integration", "Risk Management", "Backtesting Tools"]
  },
  {
    icon: <BarChart3 className="w-10 h-10" />,
    name: "Market Signal Platforms",
    description: "Data-driven platforms that provide actionable market insights and signals using advanced algorithms.",
    features: ["Real-time Data", "Push Notifications", "Technical Analysis", "User Dashboards"]
  },
  {
    icon: <Settings className="w-10 h-10" />,
    name: "Business Automation",
    description: "Streamline your operations with custom internal tools, CRM integrations, and workflow automation.",
    features: ["Process Mapping", "Tool Integration", "Data Migration", "Custom Dashboards"]
  },
  {
    icon: <RefreshCw className="w-10 h-10" />,
    name: "Website Redesign",
    description: "Modernize your existing digital presence with a fresh look, improved performance, and better conversion rates.",
    features: ["UI/UX Audit", "Brand Refresh", "Performance Boost", "Content Strategy"]
  },
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    name: "Technical Consulting",
    description: "Expert advice on tech stack selection, architecture design, and digital transformation strategies.",
    features: ["Code Review", "Security Audit", "Scalability Planning", "Tech Roadmap"]
  },
  {
    icon: <Lightbulb className="w-10 h-10" />,
    name: "Startup Tech Strategy",
    description: "Helping startups build their MVP, scale their product, and establish a solid technical foundation.",
    features: ["MVP Development", "Product Strategy", "Team Scaling", "Investor Readiness"]
  }
];

const Services = () => {
  return (
    <div className="pt-32 pb-24">
      <SEO 
        title="Services" 
        description="Explore our comprehensive digital ecosystem. We offer custom website development, e-commerce solutions, trading systems, and business automation in Kenya."
        keywords="web development services kenya, e-commerce development nairobi, trading systems development, business automation kenya"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold mb-6"
          >
            My <span className="text-gradient">Expertise</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-ink/60"
          >
            Comprehensive digital solutions tailored to your unique requirements. 
            From architecture to production, I've got you covered.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass p-10 rounded-3xl glass-hover group border-primary/5 bg-white/40"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-20 h-20 shrink-0 rounded-2xl bg-tech-gradient flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-xl shadow-primary/20">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-4">{service.name}</h3>
                  <p className="text-ink/60 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map(feature => (
                      <div key={feature} className="flex items-center text-sm text-ink/40 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="btn-secondary py-2 px-6 inline-flex items-center group/btn">
                    Get a Quote
                    <RefreshCw className="ml-2 w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
