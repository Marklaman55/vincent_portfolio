import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 bg-bg min-h-screen flex items-center justify-center px-6">
      <SEO title="404 - Page Not Found" />
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-[10rem] md:text-[14rem] font-display font-bold text-ink leading-none tracking-tighter">
            4
            <span className="text-[#FFD700]">0</span>
            4
          </h1>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
          <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-ink/60 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back to the experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/" className="btn-primary py-4 px-8 inline-flex items-center gap-3 group">
            <Home size={20} className="group-hover:scale-110 transition-transform" />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="px-8 py-4 border border-border rounded-xl font-bold text-ink hover:bg-ink/5 transition-colors inline-flex items-center gap-3"
          >
            <ArrowLeft size={20} />
            Previous Page
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-20 pt-10 border-t border-border"
        >
          <p className="text-ink/40 font-mono text-xs uppercase tracking-[0.3em]">
            Error Code: 404 | Resource Not Found
          </p>
        </motion.div>
      </div>
    </div>
  );
}
