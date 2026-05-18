import React from 'react';
import { motion } from 'motion/react';
import PricingSection from '../components/PricingSection';
import SEO from '../components/SEO';

const Pricing = () => {
  return (
    <div className="pt-20">
      <SEO title="Pricing | WebHub" description="Affordable websites and business systems for Kenyan businesses" />
      <PricingSection />
      
      {/* FAQ or additional info could go here */}
      <section className="pb-32 px-6 bg-ink">
        <div className="max-w-3xl mx-auto glass p-12 rounded-[2.5rem] border border-white/10">
          <h3 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-primary font-bold mb-2">How long does setup take?</h4>
              <p className="text-white/60 text-sm">Most websites are ready within 3–7 days after we receive all necessary content and assets from your business.</p>
            </div>
            <div>
              <h4 className="text-primary font-bold mb-2">Can I upgrade my plan later?</h4>
              <p className="text-white/60 text-sm">Yes, you can upgrade to a higher package at any time. We'll simply bill you the difference and move your system to the more advanced architecture.</p>
            </div>
            <div>
              <h4 className="text-primary font-bold mb-2">Is hosting included?</h4>
              <p className="text-white/60 text-sm">We provide basic hosting setup for all plans. Ongoing hosting fees may apply depending on your traffic and storage needs after the initial setup period.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
