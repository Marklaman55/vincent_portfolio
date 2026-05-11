import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import SEO from "../components/SEO";
import { saveMessage } from '../api/messages';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "Web Development",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await saveMessage(formData);
      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: "Web Development",
        message: ""
      });
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="pt-32 pb-24">
      <SEO 
        title="Contact Me" 
        description="Get in touch with Vincent Kamau. I am ready to architect your next extraordinary digital ecosystem. Contact me for expert web development in Kenya."
        keywords="contact vincent kamau, full stack developer kenya, hire developer nairobi"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-6xl font-display font-bold mb-8"
            >
              Let's Build <br />
              <span className="text-gradient">The Future.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-ink/60 mb-12"
            >
              Ready to create something extraordinary? Reach out to me today. 
              I'm always open to discussing new projects and creative ideas.
            </motion.p>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-xl bg-tech-gradient flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email Me</h4>
                  <p className="text-ink/60">vincentkamau137@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-xl bg-tech-gradient flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Call Me</h4>
                  <p className="text-ink/60">+254 103 591 401</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-xl bg-tech-gradient flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Based In</h4>
                  <p className="text-ink/60">Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 md:p-12 rounded-3xl border-primary/5 bg-white/40"
          >
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">Transmission Received!</h3>
                <p className="text-ink/60 mb-8">
                  Thank you for connecting. Our team will review your message and respond shortly.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="btn-secondary"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-ink/60 ml-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors border-primary/10"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-ink/60 ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors border-primary/10"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-ink/60 ml-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors border-primary/10"
                      placeholder="254 7XX XXX XXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-ink/60 ml-1">Ecosystem Interest</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none border-primary/10"
                    >
                      <option className="bg-white">Web Development</option>
                      <option className="bg-white">E-commerce</option>
                      <option className="bg-white">Trading Systems</option>
                      <option className="bg-white">Market Signals</option>
                      <option className="bg-white">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-ink/60 ml-1">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none border-primary/10"
                    placeholder="Tell us about your vision..."
                  />
                </div>
                <button
                  disabled={status === "submitting"}
                  type="submit"
                  className="w-full btn-primary py-4 flex items-center justify-center group disabled:opacity-50"
                >
                  {status === "submitting" ? "Transmitting..." : (
                    <>
                      Send Transmission
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
                {status === "error" && (
                  <p className="text-red-500 text-sm text-center font-bold">Transmission failed. Please try again.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
