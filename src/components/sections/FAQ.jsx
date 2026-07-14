import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus } from 'react-icons/hi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import { faqData } from '../../data/faqData';

function AccordionItem({ faq, isOpen, toggleOpen, innerRef }) {
  return (
    <div 
      ref={innerRef}
      className="neom-card-light overflow-hidden mb-5 border border-white/60 hover:shadow-lg transition-shadow duration-300"
    >
      <button 
        onClick={toggleOpen}
        className="w-full flex items-center justify-between p-6 font-poppins font-extrabold text-left text-charcoal-black hover:text-primary-orange transition-all duration-300 border-l-4 border-transparent hover:border-primary-orange cursor-pointer focus:outline-none"
      >
        <span className="text-sm md:text-base leading-tight pr-4">{faq.question}</span>
        
        {/* Plus rotates to X (45deg) when open */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-2xl shrink-0 ${isOpen ? 'text-primary-orange' : 'text-gray-400'}`}
        >
          <HiPlus />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-gray-100/50 text-xs md:text-sm font-manrope text-gray-600 leading-relaxed bg-white/10">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const faqRefs = useRef([]);

  // FIX 1 & 4 - Scroll Trigger Initialization & Synchronization
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Lenis Scroller Proxy Setup
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) window.lenis?.scrollTo(value);
        return window.scrollY;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      }
    });

    // Stagger FAQ items in from right on scroll entrance
    faqRefs.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    ScrollTrigger.refresh();
  }, []);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-warm-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-fresh-green/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-primary-orange/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <SectionTitle 
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Clear answers about meal customization, timings, hygiene, pause policies, and corporate bookings."
          center={true}
        />

        {/* FAQ list */}
        <div className="mt-12">
          {faqData.map((faq, idx) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              toggleOpen={() => toggleOpen(faq.id)}
              innerRef={(el) => (faqRefs.current[idx] = el)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
