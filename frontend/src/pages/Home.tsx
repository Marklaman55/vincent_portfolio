import { motion } from "motion/react";
import { ArrowUpRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const [settings, setSettings] = useState<any>({
    whatsapp_number: "254103591401",
    company_email: "vincentkamau137@gmail.com"
  });

  useEffect(() => {
    // Fetch settings from API
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error("Home Settings Error:", err));
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black/50 via-black/70 to-black/90">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full">
          <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 1440 320">
            <path fill="opacity-20" fillOpacity={0.03} d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,112C672,96,768,128,864,160C960,192,1056,224,1152,208C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,352,1248,384,1152,416C1056,448,960,416,864,384C768,352,672,320,576,288C480,256,384,224,288,192C192,160,96,128,48,96L0,64Z"></path>
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 md:py-32 text-center">
        <motion.h1
          whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 text-5xl md:text-6xl font-display font-bold text-white tracking-tighter"
        >
          Transforming Ideas<span className="text-gradient"> Into Reality</span>
        </motion.h1>

        <motion.p
          whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-10 max-w-2xl text-lg text-ink/60"
        >
          Full-stack developer specializing in scalable web applications, AI integration, and digital transformation solutions for businesses seeking to innovate and grow in the digital landscape.
        </motion.p>

        <motion.div
          whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#services"
            className="btn-primary px-8 py-3 text-lg flex items-center space-x-2 hover:bg-primary/90 transition-all"
          >
            Our Services
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="/portfolio"
            className="btn-secondary px-8 py-3 text-lg flex items-center space-x-2 hover:bg-secondary/90 transition-all"
          >
            View Portfolio
            <Zap className="w-4 h-4" />
          </a>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 flex items-center space-x-3 text-sm text-ink/60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21h8.25c1.102 0 2- .898 2-2V9c0-1.102-.898-2-2-2H8.25c-1.102 0-2 .898-2 2v10c0 1.102.898 2 2 2z"
            />
          </svg>
          <span>Chat with us on WhatsApp: {settings.whatsapp_number}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;