import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoCheckmarkCircle, IoLeaf, IoFlame, IoBusiness } from 'react-icons/io5';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { plansData } from '../../data/plansData';

// Custom 3D Tilt Wrapper
function TiltCard({ children, className = "", isPopular = false, ...props }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Rotate max 12 degrees
    const rX = -(mouseY / height) * 12;
    const rY = (mouseX / width) * 12;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

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
          ? 'border-2 border-primary-orange shadow-2xl shadow-primary-orange/10 bg-charcoal-black' 
          : 'border border-gray-200 shadow-xl bg-white'
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
  const [diet, setDiet] = useState('veg'); // 'veg' or 'nonveg'
  const [cycle, setCycle] = useState('weekly'); // 'weekly' or 'monthly'

  // Read data based on selections
  const currentPlans = plansData[diet][cycle];

  const handleWhatsAppOrder = (planName) => {
    const message = `Hi Eatoggy! I would like to subscribe to the ${diet.toUpperCase()} ${planName} (${cycle.toUpperCase()} plan). Please share availability.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918860036008?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="plans" className="py-24 bg-white relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-primary-orange/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-fresh-green/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionTitle 
          title="Flexible Subscription"
          highlightText="Pricing Plans"
          subtitle="Subscribe on a weekly or monthly basis. No lock-in, pause or resume anytime. Homestyle goodness made convenient."
          center={true}
        />

        {/* Toggles Panel */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          
          {/* Diet Toggle: Veg / Non-Veg */}
          <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 shadow-inner">
            <button
              onClick={() => setDiet('veg')}
              className={`px-6 py-2.5 rounded-xl font-poppins font-bold text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                diet === 'veg' 
                  ? 'bg-fresh-green text-white shadow-md' 
                  : 'text-gray-600 hover:text-charcoal-black'
              }`}
            >
              <IoLeaf className="text-sm" /> Vegetarian
            </button>
            <button
              onClick={() => setDiet('nonveg')}
              className={`px-6 py-2.5 rounded-xl font-poppins font-bold text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                diet === 'nonveg' 
                  ? 'bg-red-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-charcoal-black'
              }`}
            >
              <IoFlame className="text-sm" /> Non-Vegetarian
            </button>
          </div>

          {/* Timeframe Toggle: Weekly / Monthly */}
          <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 shadow-inner">
            <button
              onClick={() => setCycle('weekly')}
              className={`px-6 py-2.5 rounded-xl font-poppins font-bold text-sm transition-all duration-300 cursor-pointer ${
                cycle === 'weekly' 
                  ? 'bg-primary-orange text-white shadow-md' 
                  : 'text-gray-600 hover:text-charcoal-black'
              }`}
            >
              Weekly (6 Days)
            </button>
            <button
              onClick={() => setCycle('monthly')}
              className={`px-6 py-2.5 rounded-xl font-poppins font-bold text-sm transition-all duration-300 cursor-pointer ${
                cycle === 'monthly' 
                  ? 'bg-primary-orange text-white shadow-md' 
                  : 'text-gray-600 hover:text-charcoal-black'
              }`}
            >
              Monthly (26 Days)
            </button>
          </div>

        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {currentPlans.map((plan) => {
            const isPopular = plan.isPopular;
            return (
              <TiltCard 
                key={plan.id} 
                isPopular={isPopular}
                className="p-8 md:p-10 flex flex-col justify-between"
              >
                
                {/* Upper part of card */}
                <div>
                  
                  {/* Top Badge (if Standard) */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-2xl font-bold font-poppins ${isPopular ? 'text-white' : 'text-charcoal-black'}`}>
                      {plan.name}
                    </h3>
                    {plan.badge && (
                      <Badge variant={isPopular ? 'primary' : 'green'} icon={isPopular ? <IoFlame /> : <IoLeaf />}>
                        {plan.badge}
                      </Badge>
                    )}
                  </div>

                  <p className={`text-sm font-manrope mb-6 ${isPopular ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8 flex items-baseline">
                    <span className={`text-4xl md:text-5xl font-extrabold font-poppins ${isPopular ? 'text-primary-orange' : 'text-charcoal-black'}`}>
                      ₹{plan.price}
                    </span>
                    <span className={`text-sm font-medium font-manrope ml-2 ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>
                      / {cycle === 'weekly' ? 'week' : 'month'}
                    </span>
                  </div>

                  {/* Divider line */}
                  <div className={`h-px w-full mb-8 ${isPopular ? 'bg-white/10' : 'bg-gray-200'}`} />

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <IoCheckmarkCircle 
                          className={`text-lg shrink-0 mt-0.5 ${isPopular ? 'text-primary-orange' : 'text-fresh-green'}`} 
                        />
                        <span className={`text-sm font-manrope font-medium ${isPopular ? 'text-gray-200' : 'text-gray-700'}`}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Bottom CTA Button */}
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

        {/* Corporate CTA banner at bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 bg-gradient-to-br from-charcoal-black/90 to-gray-900 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-fresh-green/10 blur-[80px] pointer-events-none" />
          
          <div className="text-left relative z-10">
            <Badge variant="glow" icon={<IoBusiness />} className="mb-4 bg-white/5 border border-white/10 text-white font-bold px-4 py-2 flex items-center gap-2">
              Eatoggy for Corporates
            </Badge>
            
            <h3 className="text-2xl md:text-3xl font-extrabold font-poppins text-white mb-3">
              Powering NCR Workforces with Healthy Tiffins
            </h3>
            
            <p className="font-manrope text-sm md:text-base text-gray-300 max-w-xl leading-relaxed">
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
