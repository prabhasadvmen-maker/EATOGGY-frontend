import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoListOutline, 
  IoWalletOutline, 
  IoRestaurantOutline, 
  IoBicycleOutline 
} from 'react-icons/io5';
import SectionTitle from '../ui/SectionTitle';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: <IoListOutline />,
      title: 'Choose Plan',
      desc: 'Select from our Veg or Non-Veg, weekly or monthly subscription models to fit your diet and schedule.'
    },
    {
      num: '02',
      icon: <IoWalletOutline />,
      title: 'Subscribe',
      desc: 'Securely check out via UPI or cards, choose your delivery timing slot, and pause or resume anytime.'
    },
    {
      num: '03',
      icon: <IoRestaurantOutline />,
      title: 'Fresh Cooking',
      desc: 'Our certified home chefs prepare your meal fresh daily with organic produce and minimal oil.'
    },
    {
      num: '04',
      icon: <IoBicycleOutline />,
      title: 'Doorstep Delivery',
      desc: 'Our local logistics riders bring your insulated tiffin container hot to your desk or home.'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15, delay: index * 0.15 }
    })
  };

  return (
    <section id="how-it-works" className="py-24 bg-[#0E0E0E] relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-luxury-gold/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-dark-bronze/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectionTitle 
          title="How Eatoggy"
          highlightText="Works"
          subtitle="We make getting daily home-cooked meals simple, automated, and healthy."
          center={true}
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 18 }
              }}
              className="neom-card rounded-3xl p-8 flex flex-col justify-between items-start text-left relative overflow-hidden group"
            >
              <div className="w-full flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-dark-bronze to-luxury-gold text-charcoal-black flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="w-10 h-10 rounded-full bg-luxury-gold/15 text-luxury-gold font-poppins font-black text-sm flex items-center justify-center select-none shadow-md border border-luxury-gold/20">
                  {step.num}
                </div>
              </div>

              <div className="space-y-3 flex-grow">
                <h3 className="text-lg font-bold font-poppins text-champagne leading-tight">
                  {step.title}
                </h3>
                <p className="font-manrope text-sm text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-dark-bronze to-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
