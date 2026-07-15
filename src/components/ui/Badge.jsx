import React from 'react';
import { motion } from 'framer-motion';

export default function Badge({ children, icon, variant = 'primary', className = '' }) {
  const baseStyle = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-poppins font-bold uppercase tracking-wider shadow-sm border border-transparent";
  
  const variants = {
    primary: "bg-gradient-to-r from-bronze-gold to-luxury-gold text-charcoal-black shadow-luxury-gold/20 font-extrabold",
    green: "bg-gradient-to-r from-dark-bronze to-bronze-gold text-champagne shadow-dark-bronze/20 font-extrabold",
    gold: "bg-champagne text-charcoal-black font-extrabold",
    glow: "bg-luxury-gold/10 text-luxury-gold border-luxury-gold/35 shadow-[0_0_12px_rgba(215,169,104,0.2)]",
    dark: "bg-charcoal-black/80 border-luxury-gold/15 text-champagne backdrop-blur-md"
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
