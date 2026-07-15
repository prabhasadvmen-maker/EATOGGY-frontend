import React, { useEffect } from 'react';
import { motion as m } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  IoLeafOutline, 
  IoRestaurantOutline, 
  IoFlashOutline, 
  IoCashOutline, 
  IoFitnessOutline, 
  IoCalendarOutline, 
  IoNavigateOutline, 
  IoChatbubblesOutline 
} from 'react-icons/io5';
import SectionTitle from '../ui/SectionTitle';

export default function Features() {
  const features = [
    { 
      title: 'Fresh Ingredients', 
      desc: 'Sourced daily from organic farms for peak flavor and peak nutrient retention.', 
      icon: <IoLeafOutline />, 
      iconColor: 'text-luxury-gold bg-luxury-gold/10'
    },
    { 
      title: 'Home Style Cooking', 
      desc: 'Zero preservatives, low oil, and mild spices. Clean food like your mother makes.', 
      icon: <IoRestaurantOutline />, 
      iconColor: 'text-champagne bg-champagne/10'
    },
    { 
      title: 'Lightning Fast Delivery', 
      desc: 'Thermal-insulated bags ensure your food is delivered piping hot before 1 PM.', 
      icon: <IoFlashOutline />, 
      iconColor: 'text-metallic-gold bg-metallic-gold/10'
    },
    { 
      title: 'Budget Friendly', 
      desc: 'Premium home-cooked nutrition plans beginning at only ₹115 per meal.', 
      icon: <IoCashOutline />, 
      iconColor: 'text-luxury-gold bg-luxury-gold/10'
    },
    { 
      title: 'Macro Balanced Meals', 
      desc: 'Meticulously portioned proteins, carbs, and fats calculated by wellness advisors.', 
      icon: <IoFitnessOutline />, 
      iconColor: 'text-champagne bg-champagne/10'
    },
    { 
      title: 'Flexible Subscriptions', 
      desc: 'Pause, resume, or shift delivery location across Delhi NCR with zero charges.', 
      icon: <IoCalendarOutline />, 
      iconColor: 'text-metallic-gold bg-metallic-gold/10'
    },
    { 
      title: 'Live GPS Tracking', 
      desc: 'Track your tiffin progress in real-time once the runner leaves our hub.', 
      icon: <IoNavigateOutline />, 
      iconColor: 'text-luxury-gold bg-luxury-gold/10'
    },
    { 
      title: '24/7 Dedicated Support', 
      desc: 'Resolve questions, swap schedules, or update orders via WhatsApp support.', 
      icon: <IoChatbubblesOutline />, 
      iconColor: 'text-champagne bg-champagne/10'
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="features" className="py-24 bg-[#0E0E0E] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-dark-bronze/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-luxury-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectionTitle 
          title="Why Subscribing to Eatoggy is"
          highlightText="Simply Better"
          subtitle="We are transforming tiffin delivery into a premium wellness experience with smart cooking, zero compromises, and complete flexibility."
          center={true}
        />

        <m.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => (
            <m.div key={idx} variants={cardVariants}>
              <m.div
                whileHover={{ scale: 1.05, y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="neom-card h-full flex flex-col items-start gap-4 p-7 group cursor-default"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.iconColor} flex items-center justify-center text-2xl shadow-lg border border-luxury-gold/10 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="font-poppins font-bold text-lg text-champagne leading-tight">
                  {feature.title}
                </h3>
                <p className="font-manrope text-sm text-gray-400 leading-relaxed flex-grow">
                  {feature.desc}
                </p>
              </m.div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
