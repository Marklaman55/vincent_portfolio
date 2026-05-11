import { motion } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechFlow",
    content: "Nexus Digital transformed our vision into a reality. Their attention to detail and technical expertise in building our trading platform was exceptional.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Michael Chen",
    role: "Founder, AlphaSignals",
    content: "The market signal platform they built for us is incredibly fast and reliable. Our users love the intuitive interface and real-time updates.",
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director, GlobalRetail",
    content: "Our e-commerce sales increased by 40% after the redesign. The checkout process is now seamless and the mobile experience is top-notch.",
    avatar: "https://i.pravatar.cc/150?u=elena"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            What Our <span className="text-gradient">Partners Say</span>
          </h2>
          <p className="text-lg text-ink/60">
            Don't just take our word for it. Here's what business leaders have to say about working with Web Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-2xl relative border-primary/5 bg-white/40"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-primary/10" />
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full border border-primary/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-ink">{testimonial.name}</h4>
                  <p className="text-xs text-ink/40 uppercase tracking-wider font-bold">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-ink/70 italic leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
