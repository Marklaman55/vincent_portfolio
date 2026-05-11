import { motion } from "motion/react";

const stats = [
  { label: "High-End Projects", value: "40+" },
  { label: "Global Clients", value: "25+" },
  { label: "Years in Code", value: "6+" },
  { label: "Performance Score", value: "98%" },
];

const Stats = () => {
  return (
    <section className="py-20 border-y border-primary/5 bg-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-ink/40 uppercase tracking-widest font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
