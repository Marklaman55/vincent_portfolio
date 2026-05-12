import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  number?: string;
}

export default function WhatsAppButton({ number = '0112561903' }: WhatsAppButtonProps) {
  const formattedNumber = number.replace(/\D/g, '');
  const url = `https://wa.me/${formattedNumber}`;

  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#22c35e] transition-colors"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={32} fill="currentColor" />
      <span className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">1</span>
    </motion.a>
  );
}
