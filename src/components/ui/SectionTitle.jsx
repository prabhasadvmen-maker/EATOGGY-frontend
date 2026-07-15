import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SectionTitle({ title, highlightText, subtitle, center = true }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Sync ScrollTrigger with Lenis smooth scroll
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) window.lenis?.scrollTo(value);
        return window.scrollY;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      }
    });

    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Title slide up + fade in
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Underline drawing animation from left to right on scroll
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: true,
            }
          }
        );
      }
    }, el);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: 'easeOut' } 
    }
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={`flex flex-col ${center ? 'items-center text-center' : 'items-start text-left'} mb-16 max-w-4xl ${center ? 'mx-auto' : ''}`}
    >
      <h2 
        ref={titleRef} 
        className="text-3xl md:text-5xl font-poppins font-extrabold text-champagne tracking-tight leading-tight mb-4 relative"
      >
        {title}{' '}
        {highlightText && (
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-luxury-gold via-champagne to-metallic-gold bg-clip-text text-transparent">
              {highlightText}
            </span>
            <span 
              ref={lineRef} 
              className="absolute bottom-[-6px] left-0 right-0 h-1 bg-gradient-to-r from-luxury-gold to-champagne origin-left scale-x-0"
            />
          </span>
        )}
      </h2>

      {subtitle && (
        <motion.p 
          variants={textVariants} 
          className="text-gray-400 font-manrope text-sm md:text-base max-w-2xl leading-relaxed mt-2"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
