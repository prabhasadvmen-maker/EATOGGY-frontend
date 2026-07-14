import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ children, variant = 'default', className = '', ...props }) {
  const baseStyle = "rounded-3xl p-6 transition-all duration-300";

  const variants = {
    clay: "clay-card text-charcoal-black",
    clayOrange: "clay-card-orange text-charcoal-black",
    clayGreen: "clay-card-green text-charcoal-black",
    glass: "glass-panel text-white",
    glassDark: "glass-panel-dark text-white",
    glassLight: "glass-panel-light text-charcoal-black",
    default: "bg-white border border-gray-100 shadow-md text-charcoal-black"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={`${baseStyle} ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
