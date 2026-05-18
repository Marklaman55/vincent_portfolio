import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Zap, Rocket, ShoppingCart, Gift, Award, Loader2, Smartphone, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: "Starter Website",
    originalPrice: "10,000",
    discountPrice: "7,000",
    description: "Perfect for startups, portfolios, churches, restaurants, and small businesses.",
    badge: "SAVE 30%",
    icon: <Rocket className="w-6 h-6" />,
    features: [
      "Responsive Website",
      "Modern UI Design",
      "WhatsApp Integration",
      "Contact Form",
      "Free SSL Certificate",
      "Mobile Optimization",
      "Basic SEO Setup",
      "Fast Hosting Setup",
      "Domain Connection",
      "1 Month Free Maintenance"
    ],
    buttonText: "Get Started",
    popular: false
  },
  {
    name: "Business Website",
    originalPrice: "20,000",
    discountPrice: "15,000",
    description: "Professional business website with advanced features and better performance.",
    badge: "MOST POPULAR",
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Multi-Page Professional Website",
      "Admin Dashboard",
      "SEO Optimization",
      "Analytics Integration",
      "Fast Cloud Deployment",
      "Secure Database",
      "Performance Optimization",
      "Inquiry & Contact System",
      "Mobile Responsive Design",
      "2 Months Free Maintenance"
    ],
    buttonText: "Choose Business",
    popular: true
  },
  {
    name: "E-Commerce Store",
    originalPrice: "35,000",
    discountPrice: "25,000",
    description: "Full online store system for businesses selling products or services online.",
    badge: "BEST VALUE",
    icon: <ShoppingCart className="w-6 h-6" />,
    features: [
      "Full E-commerce Website",
      "M-Pesa Integration",
      "Product Management System",
      "Inventory Dashboard",
      "Customer Accounts",
      "Order Tracking System",
      "Secure Payment System",
      "Admin Panel",
      "Mobile Optimized UI",
      "3 Months Free Maintenance"
    ],
    buttonText: "Start Selling",
    popular: false
  }
];

const PricingSection = () => {
  const { user, updateUserPlan, token } = useAuth();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'processing' | 'success'>('details');

  const handleSelectPlan = (plan: any) => {
    if (!user) {
      navigate('/signup');
      return;
    }
    setSelectedPlan(plan);
    setPaymentStep('details');
  };

  const handleMpesaPayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid M-Pesa mobile number (e.g., 2547XXXXXXXX)");
      return;
    }

    setIsProcessing(true);
    setPaymentStep('processing');

    try {
      // 1. Trigger STK Push
      const res = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber.startsWith('0') ? '254' + phoneNumber.slice(1) : phoneNumber,
          amount: selectedPlan.discountPrice.replace(/,/g, '')
        })
      });

      if (!res.ok) throw new Error('STK Push failed');

      // 2. Since STK pushes are async, for this demo we'll wait a bit and simulate success
      // In a real app, you'd poll an endpoint or wait for a webhook to update the user state
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // 3. Update User Plan
      await updateUserPlan(selectedPlan.name);
      
      setPaymentStep('success');
      setTimeout(() => {
        setSelectedPlan(null);
        navigate('/account');
      }, 3000);

    } catch (err) {
      console.error('Payment error:', err);
      alert("Payment failed. Please try again.");
      setPaymentStep('details');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-32 bg-ink overflow-hidden" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-primary mb-6 block"
          >
            Pricing & Packages
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-tight text-white mb-6"
          >
            Affordable Websites & <br />
            <span className="text-primary">Business Systems</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Launch your business online with professional websites, e-commerce systems, and digital solutions at affordable pricing — now with limited-time discounts.
          </motion.p>
        </div>

        {/* Offer Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mb-16 p-8 rounded-3xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-primary/10 border border-primary/20 backdrop-blur-sm"></div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-ink flex-shrink-0">
                <Gift size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">🎉 Special Launch Offer — Save Up to 30%</h3>
                <p className="text-white/60 text-sm max-w-xl">
                  Get professional websites at discounted prices for a limited time. Offer includes free setup, free SSL, and 1–3 months maintenance depending on package.
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-mono text-xs uppercase tracking-widest">
                Limited Time Only
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`relative flex flex-col p-8 rounded-[2.5rem] border transition-all duration-500 group ${
                plan.popular 
                  ? 'bg-white/5 border-primary/50 shadow-[0_0_50px_-12px_rgba(255,225,0,0.2)]' 
                  : 'bg-white/[0.02] border-white/10 hover:border-white/30'
              }`}
            >
              {/* Badge */}
              <div className="flex justify-between items-start mb-8">
                <div className={`p-3 rounded-2xl ${plan.popular ? 'bg-primary text-ink' : 'bg-white/5 text-primary'}`}>
                  {plan.icon}
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase ${
                  plan.popular ? 'bg-primary text-ink animate-pulse' : 'bg-white/10 text-white/60'
                }`}>
                  {plan.badge}
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-white/50 text-sm mb-8 leading-relaxed h-12">
                {plan.description}
              </p>

              {/* Pricing */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white/30 text-lg line-through font-mono">KES {plan.originalPrice}</span>
                  <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-md font-bold">SALE</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-mono text-white/40 uppercase tracking-widest mr-1">KES</span>
                  <span className="text-5xl font-display font-bold text-white tracking-tight">{plan.discountPrice}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 group/item">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/30 transition-colors">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-white/70 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button 
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-5 rounded-2xl font-display font-bold text-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${
                plan.popular 
                  ? 'bg-gradient-to-r from-primary to-[#FFD700] text-ink shadow-[0_10px_30px_-10px_rgba(255,225,0,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(255,225,0,0.6)]' 
                  : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}>
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* M-Pesa Checkout Modal */}
        <AnimatePresence>
          {selectedPlan && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isProcessing && setSelectedPlan(null)}
                className="absolute inset-0 bg-ink/80 backdrop-blur-md"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
                
                <div className="relative">
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                        <Smartphone size={20} />
                      </div>
                      <h4 className="text-xl font-display font-bold text-white uppercase tracking-tight">Checkout</h4>
                    </div>
                    {!isProcessing && (
                      <button 
                        onClick={() => setSelectedPlan(null)}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        <X size={24} />
                      </button>
                    )}
                  </div>

                  {paymentStep === 'details' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl mb-8">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white/40 font-mono text-xs uppercase tracking-widest">Plan Selection</span>
                          <span className="text-primary font-bold">SALE</span>
                        </div>
                        <h5 className="text-2xl font-display font-bold text-white mb-1">{selectedPlan.name}</h5>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-display font-bold text-white">KES {selectedPlan.discountPrice}</span>
                          <span className="text-white/20 line-through text-sm">KES {selectedPlan.originalPrice}</span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3 block">
                            M-Pesa Mobile Number
                          </label>
                          <div className="relative">
                            <input 
                              type="tel"
                              placeholder="2547XXXXXXXX"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white text-lg focus:border-primary focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
                              <Check size={20} />
                            </div>
                          </div>
                          <p className="mt-2 text-white/30 text-[10px] leading-relaxed italic">
                            Enter the number that will receive the STK push to authorize payment.
                          </p>
                        </div>

                        <button 
                          onClick={handleMpesaPayment}
                          className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3 group"
                        >
                          Unlock This Plan <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {paymentStep === 'processing' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="py-12 text-center"
                    >
                      <div className="relative w-24 h-24 mx-auto mb-8">
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <Smartphone size={32} />
                        </div>
                      </div>
                      <h5 className="text-2xl font-display font-bold text-white mb-4">Requesting STK Push...</h5>
                      <p className="text-white/50 text-sm max-w-sm mx-auto leading-relaxed">
                        Please check your phone for an M-Pesa prompt and enter your PIN to authorize the transaction.
                      </p>
                      <div className="mt-10 flex items-center justify-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                        <ShieldCheck size={14} className="text-green-500" />
                        Secure Encrypted Transaction
                      </div>
                    </motion.div>
                  )}

                  {paymentStep === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-8 flex items-center justify-center text-ink shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                        <Check size={48} strokeWidth={3} />
                      </div>
                      <h5 className="text-3xl font-display font-bold text-white mb-4">Payment Confirmed!</h5>
                      <p className="text-white/60 text-sm mb-8">
                        Your plan has been activated. Welcome to WebHub Technologies!
                      </p>
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full text-white/40 font-mono text-[10px] uppercase tracking-widest border border-white/5 animate-pulse">
                        Redirecting to Dashboard...
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Bonus Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20 border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                <Award size={24} />
              </div>
              <h3 className="text-3xl font-display font-bold text-white">🔥 First 30 Clients Special Bonus</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Free Domain Setup (1 Year)",
                "Free SSL Certificate",
                "Free Basic Logo Design",
                "Free Website Hosting Setup",
                "Priority Support for 30 Days"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/60 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10"
          >
            <h4 className="text-2xl font-display font-bold text-white mb-8">Why Choose Webhub Technologies</h4>
            <div className="space-y-6">
              {[
                { title: "Fast Delivery", text: "3–7 Days Setup" },
                { title: "Modern Design", text: "Premium UI/UX standard" },
                { title: "Secure Systems", text: "Scalable & protected" },
                { title: "Mobile-First", text: "Perfect on all devices" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <span className="text-white/40 font-mono text-xs uppercase tracking-widest">{item.title}</span>
                  <div className="flex-grow mx-4 border-b border-white/5 border-dashed"></div>
                  <span className="text-white font-display font-semibold group-hover:text-primary transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-white/60 text-xs font-mono uppercase tracking-widest text-center leading-loose">
                Professional • Secure • Affordable <br />
                <span className="text-primary font-bold text-sm">Built for Kenyan Businesses</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
