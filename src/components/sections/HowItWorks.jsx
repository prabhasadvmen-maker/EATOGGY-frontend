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
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.15
      }
    })
  };

  return (
    <section 
      id="how-it-works"
      className="py-24 bg-warm-white relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-primary-orange/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-fresh-green/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionTitle 
          title="How Eatoggy"
          highlightText="Works"
          subtitle="We make getting daily home-cooked meals simple, automated, and healthy."
          center={true}
        />

        {/* Steps Grid Container */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -6,
                transition: { type: "spring", stiffness: 300, damping: 18 }
              }}
              className="neom-card-light rounded-3xl border border-white/60 p-8 shadow-sm flex flex-col justify-between items-start text-left relative overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Step indicator in corner */}
              <div className="w-full flex items-center justify-between mb-8">
                {/* Icon box with soft gradient */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-orange to-red-500 text-white flex items-center justify-center text-xl shadow-md">
                  {step.icon}
                </div>
                {/* Step Index Circle Badge */}
                <div className="w-8 h-8 rounded-full bg-primary-orange/10 text-primary-orange font-poppins font-black text-xs flex items-center justify-center select-none shadow-inner border border-primary-orange/20">
                  {step.num}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold font-poppins text-charcoal-black">
                  {step.title}
                </h3>
                <p className="font-manrope text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Decorative side accent lines */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-primary-orange to-red-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
