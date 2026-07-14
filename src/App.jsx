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

function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('home'); // 'home' or 'login'
  
  // Initialize Lenis smooth scroll globally
  useLenis();

  // Client-side Hash Router
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

  // 2 seconds preloader display
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
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
            {/* Logo */}
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

            {/* Glowing Claymorphic Load Bar */}
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

      {/* Conditional page views */}
      {view === 'login' ? (
        <AuthPage />
      ) : (
        /* Main Page Layout */
        <div className="bg-warm-white text-charcoal-black selection:bg-primary-orange selection:text-white min-h-screen">
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
        </div>
      )}
    </>
  );
}

export default App;
