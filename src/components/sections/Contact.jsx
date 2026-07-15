import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCallOutline, IoMailOutline, IoLocationOutline, IoLogoWhatsapp, IoTimeOutline, IoPaperPlane, IoChatbubbleEllipsesOutline, IoClose, IoSend, IoCheckmarkDone } from 'react-icons/io5';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

function FloatingInput({ label, name, type = 'text', required = false, value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value.length > 0;

  return (
    <div className="relative w-full text-left">
      <motion.label
        className="absolute left-4 pointer-events-none font-manrope text-xs font-bold text-gray-500"
        animate={{
          top: isFloating ? '6px' : '16px',
          fontSize: isFloating ? '10px' : '13px',
          color: isFloating ? '#D7A968' : '#9CA3AF'
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 pb-2 pt-6 text-sm font-manrope text-champagne outline-none transition-all duration-300 h-14 ${
          isFocused 
            ? 'neom-card-light-inset border border-luxury-gold/20 bg-[#1A1A1A]' 
            : 'bg-[#1A1A1A] rounded-2xl border border-luxury-gold/10 shadow-inner'
        }`}
      />
    </div>
  );
}

function FloatingTextarea({ label, name, required = false, value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value.length > 0;

  return (
    <div className="relative w-full text-left">
      <motion.label
        className="absolute left-4 pointer-events-none font-manrope text-xs font-bold text-gray-500"
        animate={{
          top: isFloating ? '6px' : '16px',
          fontSize: isFloating ? '10px' : '13px',
          color: isFloating ? '#D7A968' : '#9CA3AF'
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows="4"
        className={`w-full px-4 pb-3 pt-6 text-sm font-manrope text-champagne outline-none transition-all duration-300 resize-none min-h-[120px] ${
          isFocused 
            ? 'neom-card-light-inset border border-luxury-gold/20 bg-[#1A1A1A]' 
            : 'bg-[#1A1A1A] rounded-2xl border border-luxury-gold/10 shadow-inner'
        }`}
      />
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 3500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section 
      id="contact" 
      className="py-24 bg-[#0E0E0E] relative overflow-hidden text-left"
    >
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-luxury-gold/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-dark-bronze/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <SectionTitle 
          title="Get in Touch"
          highlightText="With Eatoggy"
          subtitle="Reach out with dietary inquiries, corporate contract orders, or subscription queries."
          center={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Left Side: Form and Let's Chat Button */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 h-full flex flex-col justify-between"
          >
            <div className="neom-card-light p-8 md:p-10 border border-luxury-gold/15 shadow-2xl flex-grow flex flex-col justify-between gap-6 bg-[#1A1A1A]">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 w-full"
                  >
                    <h3 className="text-xl md:text-2xl font-bold font-poppins text-champagne text-left">
                      Send Us a Message
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingInput
                        label="Full Name"
                        name="name"
                        required={true}
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <FloatingInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        required={true}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <FloatingInput
                      label="Email Address"
                      name="email"
                      type="email"
                      required={true}
                      value={formData.email}
                      onChange={handleChange}
                    />

                    <FloatingTextarea
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full py-4 rounded-2xl font-poppins font-bold text-sm bg-gradient-to-r from-bronze-gold to-luxury-gold text-charcoal-black shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Send Message</span>
                      <IoPaperPlane className="text-base" />
                    </Button>
                  </motion.form>
                ) : (
                    <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16 flex flex-col items-center justify-center h-full"
                  >
                    <IoCheckmarkDone className="text-6xl mb-6 text-luxury-gold" />
                    <h3 className="text-2xl font-bold font-poppins text-luxury-gold mb-2">Message Sent!</h3>
                    <p className="font-manrope text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                      Thank you for getting in touch. One of our operational leads will respond via email or call within 2 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Neomorphic "Let's Chat" button */}
              <div className="pt-6 border-t border-luxury-gold/10 flex flex-col gap-3">
                <p className="font-manrope text-xs text-gray-400 leading-relaxed font-bold">
                  Prefer talking to our support agent instantly?
                </p>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full py-4 rounded-2xl font-poppins font-bold text-sm border-2 border-luxury-gold text-luxury-gold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:bg-luxury-gold/5"
                  onClick={() => window.dispatchEvent(new Event('open-eatoggy-chat'))}
                >
                  <IoChatbubbleEllipsesOutline className="text-lg" />
                  Let's Chat with AI Support
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Details and Google Map */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 h-full flex flex-col gap-6"
          >
            {/* Contact Details Card */}
            <div className="neom-card-dark p-8 bg-[#121212] border border-luxury-gold/10 text-white flex flex-col justify-between text-left">
              <div className="space-y-6">
                <div>
                  <span className="text-xs text-luxury-gold font-poppins font-extrabold uppercase tracking-widest block mb-1">
                    Corporate Office
                  </span>
                  <h3 className="text-2xl font-black font-poppins text-champagne">
                    EATOGGY PRIVATE LIMITED
                  </h3>
                </div>

                {/* Address block */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 border border-luxury-gold/15 text-luxury-gold flex items-center justify-center text-xl shrink-0">
                    <IoLocationOutline />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-manrope font-bold uppercase tracking-wider block">Office Location</span>
                    <p className="text-xs md:text-sm font-manrope text-gray-300 leading-relaxed mt-0.5">
                      Orchid Center, 3rd Floor, Golf Course Road, SEC-53, GURUGRAM, HR, IND, Circle : GURUGRAM CIRCLE-2, Division: South City, Sub Division: SEC-56, 122002
                    </p>
                  </div>
                </div>

                {/* Email details */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 border border-luxury-gold/15 text-luxury-gold flex items-center justify-center text-xl shrink-0">
                    <IoMailOutline />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-manrope font-bold uppercase tracking-wider block">Email ID</span>
                    <a href="mailto:info@eatoggy.com" className="text-sm font-bold font-poppins hover:text-luxury-gold transition-colors text-champagne">
                      info@eatoggy.com
                    </a>
                  </div>
                </div>

                {/* Phone & WhatsApp - Mobile fixed */}
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 pt-4 border-t border-luxury-gold/10">
                  <a
                    href="tel:8860036008"
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-luxury-gold/10 border border-luxury-gold/15 hover:bg-luxury-gold/20 transition-colors text-champagne font-poppins font-bold text-xs w-full min-w-0"
                  >
                    <IoCallOutline className="text-base text-luxury-gold shrink-0" />
                    <span className="truncate">Call 8860036008</span>
                  </a>
                  <a
                    href="https://wa.me/918860036008?text=Hi%20Eatoggy!%20I%20would%20like%20to%20learn%20more%20about%20your%20tiffin%20subscriptions."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-green-600/10 border border-green-500/20 hover:bg-green-600/20 transition-colors text-green-400 font-poppins font-bold text-xs w-full min-w-0"
                  >
                    <IoLogoWhatsapp className="text-base text-green-500 shrink-0" />
                    <span className="truncate">WhatsApp Support</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="neom-card-light p-3 border border-luxury-gold/15 shadow-lg overflow-hidden h-[240px] relative bg-[#1A1A1A]">
              <iframe
                title="Eatoggy Gurugram Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.962299863415!2d77.10099497550186!3d28.45051937576435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18eb85555555%3A0x6b772714c330f6df!2sOrchid%20Center!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="w-full h-full rounded-xl border-none"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
