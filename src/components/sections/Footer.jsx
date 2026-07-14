import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { IoShieldCheckmark, IoLeaf, IoLockClosed, IoCard } from 'react-icons/io5';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const handleScrollTo = (e, id) => {
    e.preventDefault();
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

  const socialLinks = [
    { icon: <FaInstagram />, href: 'https://instagram.com/eatoggy', label: 'Instagram' },
    { icon: <FaFacebook />, href: 'https://facebook.com/eatoggy', label: 'Facebook' },
    { icon: <FaTwitter />, href: 'https://twitter.com/eatoggy', label: 'Twitter' },
    { icon: <FaYoutube />, href: 'https://youtube.com/eatoggy', label: 'YouTube' },
    { icon: <FaWhatsapp />, href: 'https://wa.me/918860036008', label: 'WhatsApp' }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-charcoal-black text-gray-300 pt-20 pb-10 border-t border-white/10 relative overflow-hidden text-left"
    >
      {/* Background blobs */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary-orange/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-fresh-green/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Branding Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/5">
          <div className="flex flex-col gap-3">
            <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="inline-block">
              <div className="w-12 h-12 rounded-full border-2 border-primary-orange/60 overflow-hidden shadow-md flex items-center justify-center bg-white p-0.5 shrink-0">
                <img 
                  src="/EATOGGY  logo.png" 
                  alt="Eatoggy Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </a>
            <p className="font-poppins text-sm text-gray-400 font-semibold tracking-wide">
              Ghar Jaisa Khana, Aapke Darwaze Tak
            </p>
          </div>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-16">
          
          {/* Column 1: Logo & Socials */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <p className="font-manrope text-sm text-gray-400 leading-relaxed max-w-sm">
              EATOGGY PRIVATE LIMITED is dedicated to delivering fresh, healthy, and hygienic home-style food subscriptions across the Delhi NCR region.
            </p>
            {/* Social Icons with spring lift */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-primary-orange hover:border-primary-orange flex items-center justify-center text-lg transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-poppins font-extrabold text-sm text-white uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4 font-manrope text-sm font-semibold">
              <li>
                <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="hover:text-primary-orange transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#plans" onClick={(e) => handleScrollTo(e, '#plans')} className="hover:text-primary-orange transition-colors">
                  Plans
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => handleScrollTo(e, '#menu')} className="hover:text-primary-orange transition-colors">
                  Today's Menu
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => handleScrollTo(e, '#how-it-works')} className="hover:text-primary-orange transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleScrollTo(e, '#reviews')} className="hover:text-primary-orange transition-colors">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="hover:text-primary-orange transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="font-poppins font-extrabold text-sm text-white uppercase tracking-wider mb-6">
              Contact Info
            </h4>
            <ul className="space-y-4 font-manrope text-sm text-gray-400 leading-relaxed">
              <li>
                <span className="font-bold text-white block mb-0.5">Phone:</span>
                <a href="tel:8860036008" className="hover:text-primary-orange transition-colors">
                  8860036008
                </a>
              </li>
              <li>
                <span className="font-bold text-white block mb-0.5">Email:</span>
                <a href="mailto:info@eatoggy.com" className="hover:text-primary-orange transition-colors">
                  info@eatoggy.com
                </a>
              </li>
              <li>
                <span className="font-bold text-white block mb-0.5">Address:</span>
                Orchid Center, Golf Course Road, Sec-53, Gurugram
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-poppins font-extrabold text-sm text-white uppercase tracking-wider mb-2">
              Newsletter
            </h4>
            <p className="font-manrope text-xs text-gray-400 leading-relaxed">
              Subscribe to get daily menu updates and nutritional guidelines.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <form 
                  onSubmit={handleSubscribe} 
                  className="flex flex-col gap-3 w-full"
                >
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-manrope outline-none text-white focus:border-primary-orange transition-all duration-300 placeholder-gray-500 h-11"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary-orange hover:bg-orange-600 text-white font-poppins font-bold text-xs py-3 rounded-2xl transition-colors uppercase tracking-wider cursor-pointer h-11 flex items-center justify-center"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Badge variant="green" icon="🎉" className="w-full justify-center py-3 rounded-2xl">
                    Subscribed!
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 w-full my-8" />

        {/* Trust Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-6 border-b border-white/5">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-poppins font-bold text-gray-300">
            <IoShieldCheckmark className="text-fresh-green text-base" />
            FSSAI Certified
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-poppins font-bold text-gray-300">
            <IoLeaf className="text-fresh-green text-base" />
            100% Hygienic Kitchen
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-poppins font-bold text-gray-300">
            <IoLockClosed className="text-accent-gold text-base" />
            Secure Payments
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-poppins font-bold text-gray-300">
            <IoCard className="text-primary-orange text-base" />
            UPI · Cards · Wallets
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-poppins font-bold text-gray-300">
            <span className="text-base">🔒</span>
            SSL Secured
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-manrope pt-6">
          <div>
            Copyright © 2026 Eatoggy Private Limited. All rights reserved.
          </div>
          <div className="flex gap-6 font-semibold">
            <a href="#privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#refund" className="hover:text-gray-300 transition-colors">Refund Policy</a>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-4 pt-4 border-t border-white/5 text-center text-[11px] text-gray-600 font-manrope">
          Designed & Developed by{' '}
          <a
            href="https://advmen.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-orange hover:text-orange-400 font-bold transition-colors"
          >
            Advmen Technology Pvt. Ltd.
          </a>
        </div>

      </div>
    </motion.footer>
  );
}
