import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoStarSharp } from 'react-icons/io5';
import { FaGoogle } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import Badge from '../ui/Badge';
import { testimonialsData } from '../../data/testimonialsData';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkMediaQuery();
    window.addEventListener('resize', checkMediaQuery);
    return () => window.removeEventListener('resize', checkMediaQuery);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    } else if (info.offset.x > swipeThreshold) {
      setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    }
  };

  const getVisibleTestimonials = () => {
    const count = isDesktop ? 3 : 1;
    const result = [];
    for (let i = 0; i < count; i++) {
      const idx = (activeIndex + i) % testimonialsData.length;
      result.push(testimonialsData[idx]);
    }
    return result;
  };

  const visibleCards = getVisibleTestimonials();

  return (
    <section 
      id="reviews" 
      className="py-24 bg-[#0E0E0E] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectionTitle 
          title="What Our Customers"
          highlightText="Are Saying"
          subtitle="Real reviews from busy professionals and health-conscious eaters across Delhi NCR."
          center={true}
        />

        <div className="flex justify-center mb-12">
          <Badge 
            variant="dark" 
            className="bg-[#1A1A1A] text-white flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-luxury-gold/15 shadow-xl"
          >
            <FaGoogle className="text-red-500 text-lg" />
            <div className="text-left font-poppins">
              <span className="font-extrabold text-sm block leading-tight text-luxury-gold">4.9★ on Google</span>
              <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-semibold">Trustpilot & Google Verified</span>
            </div>
          </Badge>
        </div>

        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative max-w-6xl mx-auto h-[380px] md:h-[280px] overflow-hidden"
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full absolute"
              >
                {visibleCards.map((test) => (
                  <motion.div
                    key={test.id}
                    whileHover={{ scale: 1.03, y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                    className="neom-card-light h-72 border border-luxury-gold/15 p-8 flex flex-col justify-between transition-all duration-300 bg-[#1A1A1A]"
                  >
                    <div>
                      <div className="flex gap-1 text-luxury-gold mb-4">
                        {[...Array(5)].map((_, i) => (
                          <IoStarSharp 
                            key={i} 
                            className={i < test.rating ? 'text-luxury-gold' : 'text-gray-600'} 
                          />
                        ))}
                      </div>

                      <p className="font-manrope text-sm text-gray-300 italic leading-relaxed line-clamp-4">
                        "{test.review}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 border-t border-luxury-gold/10 pt-4 mt-4">
                      <div className="w-12 h-12 rounded-full neom-card-light-inset flex items-center justify-center font-poppins font-extrabold text-luxury-gold text-lg shadow-inner shrink-0 border border-luxury-gold/15 bg-[#121212]">
                        {test.name[0]}
                      </div>

                      <div className="text-left truncate">
                        <h4 className="font-poppins font-extrabold text-sm text-champagne truncate">
                          {test.name}
                        </h4>
                        <span className="text-[10px] text-gray-500 font-manrope font-bold uppercase tracking-wider block">
                          {test.role}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? 'w-8 bg-luxury-gold shadow-md shadow-luxury-gold/30' : 'w-2.5 bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
