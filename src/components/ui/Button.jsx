import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', onClick, ...props }) {
  const baseStyle = "px-6 py-3 font-poppins font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer outline-none focus:ring-2 focus:ring-primary-orange/50 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-bronze-gold to-luxury-gold text-charcoal-black shadow-lg shadow-luxury-gold/20 hover:shadow-luxury-gold/30 border-b-3 border-dark-bronze font-extrabold",
    outline: "border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10",
    ghost: "text-champagne hover:bg-white/5 hover:text-luxury-gold",
    green: "bg-gradient-to-r from-dark-bronze to-bronze-gold text-champagne shadow-lg shadow-dark-bronze/30 hover:shadow-bronze-gold/30 border-b-3 border-dark-bronze font-extrabold"
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
