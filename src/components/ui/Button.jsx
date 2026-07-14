import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', onClick, ...props }) {
  const baseStyle = "px-6 py-3 font-poppins font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer outline-none focus:ring-2 focus:ring-primary-orange/50 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-orange to-red-500 text-white shadow-lg shadow-primary-orange/20 hover:shadow-primary-orange/30 border-b-3 border-orange-700",
    outline: "border-2 border-primary-orange text-primary-orange hover:bg-primary-orange/5",
    ghost: "text-charcoal-black hover:bg-black/5 hover:text-primary-orange",
    green: "bg-gradient-to-r from-fresh-green to-emerald-600 text-white shadow-lg shadow-fresh-green/20 hover:shadow-fresh-green/30 border-b-3 border-emerald-800"
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
