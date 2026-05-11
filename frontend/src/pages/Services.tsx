import { motion } from "motion/react";
import { Zap, LayoutList, Search } from "lucide-react";
import { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch services from API
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Services Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="py-24 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-lg text-ink/60">
              Comprehensive digital solutions designed to elevate your business and drive measurable results.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered input-sm w-48 md:w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-ink/60">Loading services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="glass rounded-2xl overflow-hidden border-primary/10 glass-hover bg-white/40 p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-display font-bold">{service.name}</h3>
                    </div>
                    <p className="text-ink/60 mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2 text-sm text-ink/50 mb-4">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <Search className="w-3 h-3 text-primary/50" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <a
                      href={`/services/${service.id}`}
                      className="btn-primary px-4 py-2 text-sm flex items-center space-x-2 hover:bg-primary/90 transition-all"
                    >
                      Learn More
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-ink/60">No services found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;