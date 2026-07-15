import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoCheckmarkCircle, IoLeaf, IoFlame, IoBusiness } from 'react-icons/io5';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { plansData } from '../../data/plansData';

function TiltCard({ children, className = "", isPopular = false, ...props }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    setRotateX(-(mouseY / rect.height) * 12);
    setRotateY((mouseX / rect.width) * 12);
  };

  const handleMouseLeave = () => { setRotateX(0); setRotateY(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`rounded-3xl transition-all duration-300 ${
        isPopular 
          ? 'border-2 border-luxury-gold shadow-2xl shadow-luxury-gold/15 bg-[#1A1A1A]' 
          : 'border border-luxury-gold/15 shadow-xl bg-[#161616]'
      } ${className}`}
      {...props}
    >
      <div style={{ transform: 'translateZ(35px)' }} className="h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

export default function MealPlans() {
  const [diet, setDiet] = useState('veg');
  const [cycle, setCycle] = useState('weekly');
  const currentPlans = plansData[diet][cycle];

  const handleWhatsAppOrder = (planName) => {
    const message = `Hi Eatoggy! I would like to subscribe to the ${diet.toUpperCase()} ${planName} (${cycle.toUpperCase()} plan). Please share availability.`;
    window.open(`https://wa.me/918860036008?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="plans" className="py-24 bg-[#0E0E0E] relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-luxury-gold/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-dark-bronze/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectionTitle 
          title="Flexible Subscription"
          highlightText="Pricing Plans"
          subtitle="Subscribe on a weekly or monthly basis. No lock-in, pause or resume anytime. Homestyle goodness made convenient."
          center={true}
        />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          
          <div className="flex bg-[#1A1A1A] p-1.5 rounded-2xl border border-luxury-gold/15 shadow-inner">
            <button
              onClick={() => setDiet('veg')}
              className={`px-6 py-2.5 rounded-xl font-poppins font-bold text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                diet === 'veg' 
                  ? 'bg-gradient-to-r from-dark-bronze to-luxury-gold text-charcoal-black shadow-md' 
                  : 'text-gray-500 hover:text-champagne'
              }`}
            >
              <IoLeaf className="text-sm" /> Vegetarian
            </button>
            <button
              onClick={() => setDiet('nonveg')}
              className={`px-6 py-2.5 rounded-xl font-poppins font-bold text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                diet === 'nonveg' 
                  ? 'bg-gradient-to-r from-bronze-gold to-metallic-gold text-charcoal-black shadow-md' 
                  : 'text-gray-500 hover:text-champagne'
              }`}
            >
              <IoFlame className="text-sm" /> Non-Vegetarian
            </button>
          </div>

          <div className="flex bg-[#1A1A1A] p-1.5 rounded-2xl border border-luxury-gold/15 shadow-inner">
            <button
              onClick={() => setCycle('weekly')}
              className={`px-6 py-2.5 rounded-xl font-poppins font-bold text-sm transition-all duration-300 cursor-pointer ${
                cycle === 'weekly' 
                  ? 'bg-gradient-to-r from-dark-bronze to-luxury-gold text-charcoal-black shadow-md' 
                  : 'text-gray-500 hover:text-champagne'
              }`}
            >
              Weekly (6 Days)
            </button>
            <button
              onClick={() => setCycle('monthly')}
              className={`px-6 py-2.5 rounded-xl font-poppins font-bold text-sm transition-all duration-300 cursor-pointer ${
                cycle === 'monthly' 
                  ? 'bg-gradient-to-r from-dark-bronze to-luxury-gold text-charcoal-black shadow-md' 
                  : 'text-gray-500 hover:text-champagne'
              }`}
            >
              Monthly (26 Days)
            </button>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {currentPlans.map((plan) => {
            const isPopular = plan.isPopular;
            return (
              <TiltCard key={plan.id} isPopular={isPopular} className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-2xl font-bold font-poppins ${isPopular ? 'text-champagne' : 'text-gray-300'}`}>
                      {plan.name}
                    </h3>
                    {plan.badge && (
                      <Badge variant={isPopular ? 'primary' : 'gold'} icon={isPopular ? <IoFlame /> : <IoLeaf />}>
                        {plan.badge}
                      </Badge>
                    )}
                  </div>

                  <p className={`text-sm font-manrope mb-6 ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>

                  <div className="mb-8 flex items-baseline">
                    <span className={`text-4xl md:text-5xl font-extrabold font-poppins ${isPopular ? 'text-luxury-gold' : 'text-metallic-gold'}`}>
                      ₹{plan.price}
                    </span>
                    <span className={`text-sm font-medium font-manrope ml-2 ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>
                      / {cycle === 'weekly' ? 'week' : 'month'}
                    </span>
                  </div>

                  <div className={`h-px w-full mb-8 ${isPopular ? 'bg-luxury-gold/15' : 'bg-luxury-gold/8'}`} />

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <IoCheckmarkCircle className={`text-lg shrink-0 mt-0.5 ${isPopular ? 'text-luxury-gold' : 'text-metallic-gold'}`} />
                        <span className={`text-sm font-manrope font-medium ${isPopular ? 'text-gray-300' : 'text-gray-400'}`}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button
                    variant={isPopular ? 'primary' : 'outline'}
                    className="w-full justify-center py-3.5 text-sm"
                    onClick={() => handleWhatsAppOrder(plan.name)}
                  >
                    Subscribe Now
                  </Button>
                </div>
              </TiltCard>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 bg-gradient-to-br from-[#1A1A1A] to-[#121212] border border-luxury-gold/15 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-luxury-gold/8 blur-[80px] pointer-events-none" />
          
          <div className="text-left relative z-10">
            <Badge variant="glow" icon={<IoBusiness />} className="mb-4 bg-luxury-gold/10 border border-luxury-gold/20 text-champagne font-bold px-4 py-2 flex items-center gap-2">
              Eatoggy for Corporates
            </Badge>
            <h3 className="text-2xl md:text-3xl font-extrabold font-poppins text-champagne mb-3">
              Powering NCR Workforces with Healthy Tiffins
            </h3>
            <p className="font-manrope text-sm md:text-base text-gray-400 max-w-xl leading-relaxed">
              Elevate cafeteria satisfaction. We provide subsidized office lunches, meeting platters, or customized recurring meals for organizations with 15+ daily orders.
            </p>
          </div>

          <Button 
            variant="green" 
            className="w-full md:w-auto shrink-0 px-8 py-4 text-sm font-bold shadow-xl"
            onClick={() => window.open('https://wa.me/918860036008?text=Hi%20Eatoggy!%20I%20would%20like%20to%20know%20more%20about%20your%20Corporate%20Tiffin%20plans.', '_blank')}
          >
            Get Custom Proposal
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
