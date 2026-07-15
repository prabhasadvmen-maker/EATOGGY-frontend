import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { IoShieldCheckmarkOutline, IoHeartOutline, IoTimeOutline, IoSparkles } from 'react-icons/io5';
import TiffinCanvas from './TiffinCanvas';
import Badge from '../ui/Badge';

export default function About() {
  const features = [
    {
      icon: <IoShieldCheckmarkOutline className="text-xl text-luxury-gold" />,
      title: "100% Hygienic Kitchens",
      desc: "Cooked in sterile, FSSAI-compliant home kitchens with routine sanitization checks."
    },
    {
      icon: <IoHeartOutline className="text-xl text-metallic-gold" />,
      title: "No Added Preservatives",
      desc: "Zero MSG, zero soda, and minimal organic cold-pressed oil for healthy daily consumption."
    },
    {
      icon: <IoTimeOutline className="text-xl text-champagne" />,
      title: "Punctual Delivery Guarantee",
      desc: "Delivered hot in high-grade insulated boxes straight to your office or home before 1:00 PM."
    }
  ];

  return (
    <section 
      id="about" 
      className="pt-16 pb-20 bg-[#0E0E0E] relative overflow-hidden text-left"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-dark-bronze/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 border-b border-luxury-gold/15">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 w-full h-[400px] lg:h-[480px] relative flex items-center justify-center order-2 lg:order-1"
          >
            <div className="w-full h-full rounded-3xl bg-[#1A1A1A] border border-luxury-gold/10 shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing">
              <div className="w-full h-full relative">
                <Suspense fallback={null}>
                  <TiffinCanvas />
                </Suspense>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6 order-1 lg:order-2"
          >
            <Badge
              variant="glow"
              icon={<IoSparkles className="text-luxury-gold animate-pulse" />}
              className="font-poppins font-bold bg-luxury-gold/10 border border-luxury-gold/20 text-champagne py-1.5 px-4 rounded-full shadow-sm"
            >
              Our Story
            </Badge>

            <h2 className="text-4xl sm:text-5xl font-extrabold font-poppins text-champagne leading-tight">
              Bringing Authenticity <br />
              <span className="bg-gradient-to-r from-luxury-gold via-champagne to-metallic-gold bg-clip-text text-transparent">
                To Your Daily Table
              </span>
            </h2>

            <div className="space-y-4 font-manrope text-gray-400 leading-relaxed text-sm sm:text-base">
              <p>
                At <strong className="text-champagne">EATOGGY PRIVATE LIMITED</strong>, we are rewriting the script for daily meals. We understand the struggle of corporate professionals and students finding fresh, clean, and nutritious home-style food in the busy Delhi NCR region.
              </p>
              <p>
                That is why we collaborate with certified home chefs to cook fresh daily using natural ingredients, zero artificial additives, and minimal oil. Every subscription is prepared with love and packed hygienically to recreate the comfort of mother's home food.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {features.map((feat, idx) => (
                <div 
                  key={idx}
                  className="neom-card-light p-4 rounded-2xl border border-luxury-gold/10 shadow-sm flex items-start gap-4 hover:border-luxury-gold/25 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#121212] border border-luxury-gold/10 flex items-center justify-center shadow-inner shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-champagne">
                      {feat.title}
                    </h4>
                    <p className="font-manrope text-xs text-gray-500 mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
