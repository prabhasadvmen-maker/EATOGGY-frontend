import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import Button from '../ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Plans', href: '#plans' },
    { name: 'Menu', href: '#menu' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(id);
    if (targetElement) {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, { offset: -80 });
      } else {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 ${
        isScrolled 
          ? 'bg-[#121212]/90 backdrop-blur-xl shadow-lg border-b border-luxury-gold/10' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="flex items-center gap-3 group">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-luxury-gold/60 overflow-hidden shadow-md shadow-black/30 flex items-center justify-center bg-[#1A1A1A] p-0.5 shrink-0 group-hover:border-luxury-gold transition-colors duration-300">
            <img 
              src="/Eatoggy logo.jpeg" 
              alt="Eatoggy Logo" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="font-poppins font-extrabold text-champagne text-base md:text-lg tracking-wider group-hover:text-luxury-gold transition-colors duration-300">
            EATOGGY
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="font-manrope font-medium text-sm text-gray-400 hover:text-luxury-gold transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => { window.location.hash = '#/login'; }}
            className="font-poppins text-sm font-semibold text-champagne hover:text-luxury-gold transition-colors cursor-pointer px-4 py-2"
          >
            Login
          </button>
          <Button 
            variant="primary" 
            className="text-sm px-5 py-2.5"
            onClick={(e) => handleScrollTo(e, '#plans')}
          >
            Order Now
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-champagne hover:text-luxury-gold transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden bg-[#121212]/98 backdrop-blur-md border-b border-luxury-gold/10 w-full left-0"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="font-manrope font-semibold text-lg text-gray-300 hover:text-luxury-gold transition-colors duration-200"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="h-px bg-luxury-gold/10 my-2" />
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.hash = '#/login';
                  }}
                  className="font-poppins py-3 font-semibold text-champagne hover:text-luxury-gold transition-colors"
                >
                  Login
                </button>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={(e) => handleScrollTo(e, '#plans')}
                >
                  Order Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
