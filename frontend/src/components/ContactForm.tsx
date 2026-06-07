import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-12 rounded-[2.5rem] text-center border border-primary/20 shadow-2xl"
      >
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <Send size={32} />
        </div>
        <h3 className="text-3xl font-display font-bold text-ink mb-4 tracking-tight">Message Received!</h3>
        <p className="text-ink/60 mb-8 max-w-sm mx-auto">Thanks for reaching out. I'll review your inquiry and get back to you within 24 hours.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="btn-primary py-4 px-10 rounded-xl font-bold"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-ink/40 ml-4">Full Name</label>
          <input
            required
            type="text"
            className="w-full glass-input bg-white/50 border border-border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-4">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-ink/40 ml-4">Email Address</label>
          <input
            required
            type="email"
            className="w-full glass-input bg-white/50 border border-border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xs font-mono uppercase tracking-[0.2em] text-ink/40 ml-4">Subject</label>
        <input
          required
          type="text"
          className="w-full glass-input bg-white/50 border border-border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
          placeholder="New Project Inquiry"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <label className="text-xs font-mono uppercase tracking-[0.2em] text-ink/40 ml-4">Message</label>
        <textarea
          required
          rows={6}
          className="w-full glass-input bg-white/50 border border-border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
          placeholder="Tell me about your project ideas..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full btn-primary py-5 rounded-2xl text-lg flex items-center justify-center gap-4 group disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            Send Message <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
