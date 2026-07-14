import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function DeliveryAreas() {
  const cities = [
    { name: 'Delhi', time: 'By 1:00 PM', charge: 'Free above ₹500' },
    { name: 'Gurugram', time: 'By 1:00 PM', charge: 'Free above ₹500' },
    { name: 'Noida', time: 'By 1:00 PM', charge: 'Free above ₹500' },
    { name: 'Greater Noida', time: 'By 1:00 PM', charge: 'Free above ₹500' },
    { name: 'Ghaziabad', time: 'By 1:00 PM', charge: 'Free above ₹500' },
    { name: 'Faridabad', time: 'By 1:00 PM', charge: 'Free above ₹500' }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: 'easeOut' } 
    }
  };

  return (
    <section 
      id="delivery" 
      className="py-24 bg-charcoal-black text-white relative overflow-hidden"
    >
      {/* Animated gradient blobs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary-orange/15 blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-fresh-green/10 blur-[130px] animate-spin-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <SectionTitle 
          title="We Deliver Across"
          highlightText="Delhi NCR"
          subtitle="Timely hot lunches delivered straight to your home or office desk every single day."
          center={true}
        />

        {/* City Cards Grid (Dark Neomorphic Styles) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
        >
          {cities.map((city) => (
            <motion.div key={city.name} variants={cardVariants}>
              <motion.div
                whileHover={{ scale: 1.03, y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="neom-card-dark h-full border border-white/5 p-6 flex flex-col justify-between text-center group cursor-default transition-all duration-300"
              >
                <div>
                  {/* Location Icon inside Neomorphic badge (Replacing emoji) */}
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-primary-orange flex items-center justify-center text-xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IoLocationOutline className="animate-pulse" />
                  </div>
                  
                  {/* Name */}
                  <h3 className="font-poppins font-extrabold text-lg text-white mb-3">
                    {city.name}
                  </h3>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/5 text-[11px] font-manrope font-semibold text-gray-400">
                  <div className="flex items-center justify-center gap-1">
                    <IoTimeOutline className="text-primary-orange text-xs" />
                    <span>{city.time}</span>
                  </div>
                  <div className="text-fresh-green">{city.charge}</div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="font-manrope text-sm text-gray-400 mb-6">
            Don't see your specific locality listed?
          </p>
          <Button
            variant="outline"
            className="border-primary-orange text-primary-orange hover:bg-primary-orange/10 px-8 py-3.5 text-xs font-bold font-poppins uppercase tracking-wider"
            onClick={() => window.open('https://wa.me/918860036008?text=Hi%20Eatoggy!%20Is%20delivery%20available%20in%20my%20sector?', '_blank')}
          >
            Contact us on WhatsApp
          </Button>
        </div>

      </div>
    </section>
  );
}
