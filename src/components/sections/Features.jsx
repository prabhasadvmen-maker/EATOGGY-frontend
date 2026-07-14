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
      iconColor: 'text-fresh-green bg-fresh-green/10'
    },
    { 
      title: 'Home Style Cooking', 
      desc: 'Zero preservatives, low oil, and mild spices. Clean food like your mother makes.', 
      icon: <IoRestaurantOutline />, 
      iconColor: 'text-primary-orange bg-primary-orange/10'
    },
    { 
      title: 'Lightning Fast Delivery', 
      desc: 'Thermal-insulated bags ensure your food is delivered piping hot before 1 PM.', 
      icon: <IoFlashOutline />, 
      iconColor: 'text-accent-gold bg-accent-gold/10'
    },
    { 
      title: 'Budget Friendly', 
      desc: 'Premium home-cooked nutrition plans beginning at only ₹115 per meal.', 
      icon: <IoCashOutline />, 
      iconColor: 'text-fresh-green bg-fresh-green/10'
    },
    { 
      title: 'Macro Balanced Meals', 
      desc: 'Meticulously portioned proteins, carbs, and fats calculated by wellness advisors.', 
      icon: <IoFitnessOutline />, 
      iconColor: 'text-primary-orange bg-primary-orange/10'
    },
    { 
      title: 'Flexible Subscriptions', 
      desc: 'Pause, resume, or shift delivery location across Delhi NCR with zero charges.', 
      icon: <IoCalendarOutline />, 
      iconColor: 'text-accent-gold bg-accent-gold/10'
    },
    { 
      title: 'Live GPS Tracking', 
      desc: 'Track your tiffin progress in real-time once the runner leaves our hub.', 
      icon: <IoNavigateOutline />, 
      iconColor: 'text-fresh-green bg-fresh-green/10'
    },
    { 
      title: '24/7 Dedicated Support', 
      desc: 'Resolve questions, swap schedules, or update orders via WhatsApp support.', 
      icon: <IoChatbubblesOutline />, 
      iconColor: 'text-primary-orange bg-primary-orange/10'
    },
  ];

  // FIX 1 & 4 - Scroll Trigger Initialization & Synchronization
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) window.lenis?.scrollTo(value);
        return window.scrollY;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      }
    });

    ScrollTrigger.refresh();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: 'easeOut' } 
    }
  };

  return (
    <section id="features" className="py-24 bg-warm-white relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-fresh-green/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-primary-orange/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionTitle 
          title="Why Subscribing to Eatoggy is"
          highlightText="Simply Better"
          subtitle="We are transforming tiffin delivery into a premium wellness experience with smart cooking, zero compromises, and complete flexibility."
          center={true}
        />

        {/* Staggered Grid */}
        <m.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, idx) => (
            <m.div key={idx} variants={cardVariants}>
              <m.div
                whileHover={{ scale: 1.03, y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="neom-card-light h-full flex flex-col items-start gap-4 p-8 border border-white/60 hover:shadow-2xl transition-all duration-300"
              >
                {/* 3D-effect neomorphic circular container for icons */}
                <div className={`w-14 h-14 rounded-2xl ${feature.iconColor} flex items-center justify-center text-2xl shadow-inner border border-white/20 shrink-0`}>
                  {feature.icon}
                </div>
                
                {/* Info */}
                <h3 className="font-poppins font-extrabold text-xl text-charcoal-black mt-2">
                  {feature.title}
                </h3>
                
                <p className="font-manrope text-sm text-gray-500 leading-relaxed">
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
