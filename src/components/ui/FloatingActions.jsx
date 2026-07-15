import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCall, IoLogoWhatsapp, IoChatbubbleEllipsesOutline, IoClose, IoSend, IoArrowUpOutline } from 'react-icons/io5';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Chatbot states
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! 👋 How can we help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll handler for Back to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Event listener to open Chatbot globally
  useEffect(() => {
    const handleOpenChat = () => setIsChatOpen(true);
    window.addEventListener('open-eatoggy-chat', handleOpenChat);
    return () => window.removeEventListener('open-eatoggy-chat', handleOpenChat);
  }, []);

  // Auto scroll chat list
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isGenerating]);

  const handleScrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Mock answers fallback if Groq Key is missing
  const getMockResponse = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('plan') || msg.includes('price') || msg.includes('cost') || msg.includes('charge') || msg.includes('rate')) {
      return "Our subscriptions start at ₹115 per meal! Veg plans range from ₹699/week to ₹4,499/month, and Non-Veg plans range from ₹899/week to ₹5,499/month. You can select your perfect fit in the Plans section above!";
    }
    if (msg.includes('delivery') || msg.includes('area') || msg.includes('location') || msg.includes('ncr') || msg.includes('gurugram')) {
      return "We deliver daily before 1:00 PM across Gurugram, Delhi, Noida, Greater Noida, Ghaziabad, and Faridabad. Delivery is free for subscriptions above ₹500.";
    }
    if (msg.includes('pause') || msg.includes('resume') || msg.includes('skip') || msg.includes('change')) {
      return "Yes, you have complete flexibility! You can pause, resume, or change your delivery timing slot and location at any time directly through WhatsApp at 8860036008.";
    }
    if (msg.includes('hygiene') || msg.includes('clean') || msg.includes('cook') || msg.includes('chef')) {
      return "All Eatoggy meals are prepared daily in sterile, sanitized kitchens by certified home chefs, using organic ingredients, minimal oil, and zero preservatives.";
    }
    if (msg.includes('contact') || msg.includes('phone') || msg.includes('call') || msg.includes('number') || msg.includes('support')) {
      return "You can call or WhatsApp our helpline at 8860036008, or email us directly at info@eatoggy.com.";
    }
    return "Thank you for reaching out! Eatoggy Private Limited delivers clean, healthy, and authentic home-style food subscriptions across the Delhi NCR region. Call 8860036008 for custom corporate proposals!";
  };

  // Chatbot submit trigger (Groq completions API)
  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setIsGenerating(true);

    const apiKey = import.meta.env.VITE_GROQ_API_KEY || "";

    if (!apiKey) {
      setTimeout(() => {
        const reply = getMockResponse(userMessage);
        setChatMessages((prev) => [
          ...prev, 
          { role: 'assistant', content: `${reply} (Mock Mode: Configure VITE_GROQ_API_KEY in .env for active live answers)` }
        ]);
        setIsGenerating(false);
      }, 1000);
      return;
    }

    try {
      const apiEndpoint = 'https://api.groq.com/openai/v1/chat/completions';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: 'You are Eatoggy Bot, a helpful customer support AI assistant for EATOGGY PRIVATE LIMITED, a premium home-style tiffin subscription service in Delhi NCR. Keep answers brief (max 3 sentences), polite, and extremely precise. Use correct formatting.\n\nCompany Details:\n- Address: Orchid Center, 3rd floor, Golf Course Road, SEC-53, GURUGRAM, HR, IND, Circle: GURUGRAM CIRCLE-2, Division: South City, Sub Division: SEC-56, 122002.\n- Phone / WhatsApp: 8860036008\n- Email: info@eatoggy.com\n- Deliveries: Gurugram, Delhi, Noida, Greater Noida, Ghaziabad, Faridabad. Daily hot delivery before 1 PM.\n- Plans: Veg Basic (₹699/wk, ₹2499/mo), Veg Standard (₹899/wk, ₹3299/mo), Veg Premium (₹1199/wk, ₹4499/mo). Non-Veg plans start from ₹899/week.\n- Policies: Subscriptions can be paused, resumed, or address-swapped anytime.'
            },
            ...chatMessages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      if (!response.ok) {
        throw new Error('Groq API Error');
      }

      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content || "I couldn't process that query. Please call us at 8860036008!";
      setChatMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
    } catch (error) {
      console.error(error);
      const reply = getMockResponse(userMessage);
      setChatMessages((prev) => [...prev, { role: 'assistant', content: `${reply} (Connection error fallback)` }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* 1. LEFT SIDE FLOATING WIDGET BUTTON: Transforms from "Let's Talk" to "X" */}
      <AnimatePresence mode="wait">
        {!isChatOpen ? (
          <motion.button
            key="chat-btn-closed"
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            whileHover={{ scale: 1.05, y: -2 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 left-6 z-40 bg-luxury-gold hover:bg-champagne text-charcoal-black px-5 py-3.5 rounded-full border border-white/20 shadow-xl flex items-center gap-2.5 cursor-pointer transition-all duration-300 font-poppins font-extrabold text-xs uppercase tracking-wider"
          >
            <IoChatbubbleEllipsesOutline className="text-lg text-charcoal-black animate-pulse" />
            <span>Let's Talk</span>
          </motion.button>
        ) : (
          <motion.button
            key="chat-btn-opened"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.08 }}
            onClick={() => setIsChatOpen(false)}
            className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-charcoal-black border border-white/10 text-white flex items-center justify-center text-xl shadow-xl cursor-pointer hover:bg-black transition-colors duration-200"
            aria-label="Close Chat"
          >
            <IoClose />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. FLOATING CHAT POPUP WINDOW (Directly above the button) */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className="fixed bottom-24 left-6 z-50 w-[340px] md:w-[380px] h-[400px] bg-[#1A1A1A] border border-luxury-gold/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between p-5 text-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-luxury-gold/10">
              <div className="flex items-center gap-3">
                <IoChatbubbleEllipsesOutline className="text-2xl text-luxury-gold shrink-0" />
                <div>
                  <h4 className="font-poppins font-extrabold text-sm text-champagne leading-tight">Let's Talk</h4>
                  <span className="text-[10px] text-gray-400 font-manrope font-bold block mt-0.5">Eatoggy AI Support</span>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-luxury-gold/10 flex items-center justify-center text-xl text-champagne cursor-pointer transition-colors border-none"
              >
                <IoClose />
              </button>
            </div>

            {/* Chat Messages Logs */}
            <div className="flex-grow overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin">
              {chatMessages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div 
                    key={idx} 
                    className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs md:text-sm font-manrope leading-relaxed ${
                        isUser 
                          ? 'bg-luxury-gold text-charcoal-black rounded-br-none shadow-md' 
                          : 'bg-luxury-gold/10 border border-luxury-gold/15 text-champagne rounded-bl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-luxury-gold/10 border border-luxury-gold/15 rounded-2xl rounded-bl-none p-3.5 text-xs text-gray-400 font-manrope flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input form */}
            <form 
              onSubmit={handleSendChat}
              className="flex items-center gap-3 pt-3 border-t border-luxury-gold/10 bg-[#1A1A1A]"
            >
              <input
                type="text"
                required
                placeholder="Type message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-grow bg-luxury-gold/10 border border-luxury-gold/15 rounded-xl px-4 py-2.5 text-xs md:text-sm font-manrope text-champagne outline-none focus:border-luxury-gold transition-colors placeholder-gray-600"
              />
              <button
                type="submit"
                disabled={isGenerating || !chatInput.trim()}
                className="w-10 h-10 rounded-xl bg-luxury-gold hover:bg-champagne disabled:bg-gray-700 text-charcoal-black flex items-center justify-center text-base cursor-pointer transition-colors shadow-md border-none shrink-0"
              >
                <IoSend className="rotate-45" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. RIGHT SIDE FLOATING STACK: WhatsApp, Call, and Back to Top */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 items-end">
        
        {/* WhatsApp Icon */}
        <motion.a
          href="https://wa.me/918860036008?text=Hi%20Eatoggy!%20I%20would%20like%20to%20learn%20more%20about%20your%20tiffin%20subscriptions."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -3 }}
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-xl hover:shadow-[#25D366]/20 transition-all duration-300 cursor-pointer"
          aria-label="WhatsApp Support"
        >
          <IoLogoWhatsapp />
        </motion.a>

        {/* Call & Back to Top Row */}
        <div className="flex gap-4 items-center">
          
          {/* Back to Top (Translucent circle, appears on scroll) */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                onClick={handleScrollToTop}
                className="w-12 h-12 rounded-full bg-[#1A1A1A]/75 hover:bg-[#1A1A1A] backdrop-blur-md border border-luxury-gold/15 text-champagne flex items-center justify-center text-xl shadow-lg cursor-pointer transition-all duration-300"
                aria-label="Back to Top"
              >
                <IoArrowUpOutline />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Call Icon */}
          <motion.a
            href="tel:8860036008"
            whileHover={{ scale: 1.1, y: -3 }}
            className="w-12 h-12 rounded-full bg-luxury-gold text-charcoal-black flex items-center justify-center text-xl shadow-xl hover:shadow-luxury-gold/20 transition-all duration-300 cursor-pointer"
            aria-label="Phone Call Support"
          >
            <IoCall />
          </motion.a>

        </div>

      </div>
    </>
  );
}
