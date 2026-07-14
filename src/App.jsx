import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLenis from './hooks/useLenis';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Features from './components/sections/Features';
import HowItWorks from './components/sections/HowItWorks';
import MealPlans from './components/sections/MealPlans';
import TodaysMenu from './components/sections/TodaysMenu';
import DeliveryAreas from './components/sections/DeliveryAreas';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import FloatingActions from './components/ui/FloatingActions';
import AuthPage from './components/pages/AuthPage';
import { IoClose, IoSparkles } from 'react-icons/io5';

// ── First Order Discount Banner ──
function DiscountBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full bg-gradient-to-r from-primary-orange via-orange-500 to-accent-gold text-white text-center py-2.5 px-4 text-xs font-poppins font-bold tracking-wide relative z-[60] flex items-center justify-center gap-2"
    >
      <IoSparkles className="text-white animate-pulse shrink-0" />
      <span>
        🎉 First Order Special — Use code <span className="bg-white/20 px-2 py-0.5 rounded-md mx-1 font-extrabold tracking-widest">EATOGGY10</span> for 10% OFF your first subscription!
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white cursor-pointer"
        aria-label="Close banner"
      >
        <IoClose size={16} />
      </button>
    </motion.div>
  );
}

// ── Live Stats Ticker (Conversion) ──
function LiveTicker() {
  const [orders, setOrders] = useState(10247);
  const [customers, setCustomers] = useState(5032);

  useEffect(() => {
    const t = setInterval(() => {
      setOrders((p) => p + Math.floor(Math.random() * 3));
      setCustomers((p) => p + (Math.random() > 0.7 ? 1 : 0));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full bg-charcoal-black/95 border-b border-white/5 py-2 px-4 flex items-center justify-center gap-6 text-[11px] font-manrope font-bold text-gray-300 z-[59] relative">
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-fresh-green animate-pulse inline-block" />
        <span className="text-fresh-green font-extrabold">{orders.toLocaleString()}+</span> meals delivered today
      </span>
      <span className="text-white/20">|</span>
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary-orange animate-pulse inline-block" />
        <span className="text-primary-orange font-extrabold">{customers.toLocaleString()}+</span> happy customers
      </span>
      <span className="text-white/20 hidden sm:inline">|</span>
      <span className="hidden sm:flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse inline-block" />
        Delivery by <span className="text-accent-gold font-extrabold ml-1">1:00 PM</span>
      </span>
    </div>
  );
}

// ── Sticky Order Button (shows after scrolling past hero) ──
function StickyOrderButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const el = document.querySelector('#plans');
    if (el) {
      if (window.lenis) window.lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={handleClick}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-primary-orange to-orange-600 text-white font-poppins font-extrabold text-sm px-8 py-3.5 rounded-full shadow-2xl shadow-primary-orange/30 border border-white/20 cursor-pointer hover:scale-105 transition-transform duration-200 flex items-center gap-2 whitespace-nowrap"
          aria-label="Order Now"
        >
          🍱 Order Now — Starting ₹115/meal
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('home');
  
  useLenis();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/login' || hash === '#/signup') {
        setView('login');
      } else {
        setView('home');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smart preloader — hide as soon as page is interactive, max 1.5s
  useEffect(() => {
    const hide = () => setLoading(false);
    if (document.readyState === 'complete') {
      const t = setTimeout(hide, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(hide, 1500);
    window.addEventListener('load', hide, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('load', hide);
    };
  }, []);

  return (
    <>
      {/* Brand Preloader */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 bg-charcoal-black z-[9999] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-8"
            >
              <img 
                src="/EATOGGY  logo.png" 
                alt="Eatoggy Logo" 
                className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,107,53,0.35)]"
              />
            </motion.div>
            <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden relative border border-white/5 shadow-inner">
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-primary-orange to-fresh-green rounded-full shadow-[0_0_8px_#FF6B35]"
              />
            </div>
            <p className="font-poppins text-[10px] font-bold text-gray-400 mt-4 tracking-widest uppercase select-none animate-pulse">
              Serving Freshness
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'login' ? (
        <AuthPage />
      ) : (
        <div className="bg-warm-white text-charcoal-black selection:bg-primary-orange selection:text-white min-h-screen">
          {/* Top Conversion Bars */}
          <DiscountBanner />
          <LiveTicker />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Features />
            <HowItWorks />
            <MealPlans />
            <TodaysMenu />
            <DeliveryAreas />
            <Testimonials />
            <FAQ />
            <Contact />
          </main>
          <Footer />
          <FloatingActions />
          <StickyOrderButton />
        </div>
      )}
    </>
  );
}

export default App;
