import React from 'react';
import { motion } from 'framer-motion';

export default function Badge({ children, icon, variant = 'primary', className = '' }) {
  const baseStyle = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-poppins font-bold uppercase tracking-wider shadow-sm border border-transparent";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-orange to-red-500 text-white shadow-primary-orange/20",
    green: "bg-gradient-to-r from-fresh-green to-emerald-600 text-white shadow-fresh-green/20",
    gold: "bg-accent-gold text-charcoal-black font-extrabold",
    glow: "bg-primary-orange/10 text-primary-orange border-primary-orange/35 shadow-[0_0_12px_rgba(255,107,53,0.15)]",
    dark: "bg-charcoal-black/60 border-white/10 text-white backdrop-blur-md"
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
    >
      {icon && <span className="text-sm select-none flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </motion.span>
  );
}
