import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoSparkles, IoShieldCheckmark } from 'react-icons/io5';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

gsap.registerPlugin(ScrollTrigger);

function Counter({ end, duration = 1.8, decimals = 0, suffix = '' }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setHasStarted(true); },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(progress * end);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <span ref={elementRef}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const words = ['Fresh', 'Healthy', 'Tasty', 'Affordable'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        opacity: 0, y: -60, scale: 0.96,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'bottom 90%',
          end: 'bottom top',
          scrub: 1,
        }
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const handleExplorePlans = (e) => {
    e.preventDefault();
    const plansSec = document.querySelector('#plans');
    if (plansSec) {
      if (window.lenis) window.lenis.scrollTo(plansSec, { offset: -80 });
      else plansSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal-black"
    >

      {/* ── FULL PAGE VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover hidden sm:block"
        >
          <source src="/Hero%20section%20vedio.mp4" type="video/mp4" />
        </video>
        {/* Mobile fallback — solid dark bg instead of heavy video */}
        <div className="sm:hidden absolute inset-0 bg-charcoal-black" />
      </div>

      {/* Dark overlay - left heavy for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-charcoal-black/92 via-charcoal-black/65 to-charcoal-black/30" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-10 bg-gradient-to-t from-charcoal-black to-transparent" />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 z-10 bg-gradient-to-b from-charcoal-black/60 to-transparent" />

      {/* Orange glow blob */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary-orange/10 blur-[130px] animate-pulse-slow pointer-events-none z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-fresh-green/8 blur-[150px] pointer-events-none z-10" />

      {/* ── CONTENT ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 pb-20">
        <div className="max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge
              variant="glow"
              icon={<IoSparkles className="text-primary-orange animate-pulse" />}
              className="mb-6 font-poppins font-bold bg-white/5 border border-white/10 text-white py-2 px-5 rounded-full shadow-lg"
            >
              Now Delivering Across Delhi NCR
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-poppins text-white leading-[1.05] mb-6"
          >
            <span className="block mb-2">Homestyle &</span>
            <div className="h-[1.1em] relative overflow-hidden inline-block align-bottom min-w-[320px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 50, rotateX: -60, opacity: 0 }}
                  animate={{ y: 0, rotateX: 0, opacity: 1 }}
                  exit={{ y: -50, rotateX: 60, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute left-0 bg-gradient-to-r from-primary-orange via-orange-400 to-accent-gold bg-clip-text text-transparent"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="block mt-1">Meals Daily</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-gray-300 text-lg md:text-xl font-manrope max-w-lg mb-10 leading-relaxed"
          >
            Healthy, hygienic and affordable tiffin subscriptions. Cooked fresh daily & delivered straight to your doorstep across Delhi NCR.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-[11px] font-poppins font-bold text-gray-300">
              <IoShieldCheckmark className="text-fresh-green" /> FSSAI Certified
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-[11px] font-poppins font-bold text-gray-300">
              🔒 Secure Payments
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-[11px] font-poppins font-bold text-gray-300">
              ⏰ Delivery by 1 PM
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <Button variant="primary" className="px-10 py-4 text-base" onClick={handleExplorePlans}>
              Order Now 🍱
            </Button>
            <Button variant="outline" className="px-10 py-4 text-base text-white border border-white/20 hover:bg-white/5" onClick={handleExplorePlans}>
              Explore Plans
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg"
          >
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold text-primary-orange font-poppins">
                <Counter end={10000} suffix="+" />
              </span>
              <span className="text-xs sm:text-sm text-gray-400 font-manrope mt-1">Meals Delivered</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold text-fresh-green font-poppins">
                <Counter end={5000} suffix="+" />
              </span>
              <span className="text-xs sm:text-sm text-gray-400 font-manrope mt-1">Happy Customers</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold text-accent-gold font-poppins">
                <Counter end={4.9} decimals={1} suffix="★" />
              </span>
              <span className="text-xs sm:text-sm text-gray-400 font-manrope mt-1">Google Rating</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs font-manrope uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary-orange" />
        </motion.div>
      </motion.div>

    </section>
  );
}
