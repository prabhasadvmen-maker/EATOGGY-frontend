import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  IoRestaurant, 
  IoEggOutline, 
  IoDiscOutline, 
  IoFlame, 
  IoNutrition, 
  IoRestaurantOutline,
  IoLeaf,
  IoFlameOutline
} from 'react-icons/io5';
import SectionTitle from '../ui/SectionTitle';
import Badge from '../ui/Badge';
import { menuData } from '../../data/menuData';

// Helper to resolve clean React Icons for Indian dishes
const getFoodIcon = (name) => {
  const lowercase = name.toLowerCase();
  if (lowercase.includes('poha')) return <IoRestaurant />;
  if (lowercase.includes('upma')) return <IoRestaurantOutline />;
  if (lowercase.includes('paratha')) return <IoDiscOutline className="rotate-45" />;
  if (lowercase.includes('omelette') || lowercase.includes('egg')) return <IoEggOutline />;
  if (lowercase.includes('rice') || lowercase.includes('chawal')) return <IoRestaurantOutline />;
  if (lowercase.includes('paneer')) return <IoRestaurantOutline />;
  if (lowercase.includes('chicken')) return <IoFlame />;
  if (lowercase.includes('chaap')) return <IoNutrition />;
  return <IoRestaurant />;
};

function FoodCard({ item, isLarge }) {
  const isVeg = item.category === 'veg';
  const gradientClass = isVeg 
    ? "bg-gradient-to-tr from-fresh-green to-emerald-600 text-white" 
    : "bg-gradient-to-tr from-primary-orange to-red-500 text-white";

  return (
    <div className="w-full h-full relative select-none" style={{ perspective: 1200 }}>
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ 
          rotateY: 180, 
          scale: 1.03, 
          y: -6, 
          transition: { type: "spring", stiffness: 300, damping: 20 } 
        }}
      >
        {/* FRONT SIDE (Neomorphic Light Card) */}
        <div 
          className="absolute inset-0 w-full h-full neom-card-light p-6 flex flex-col justify-between border border-white/60"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Header Visual - Real Food Image */}
          <div className="w-full h-[60%] rounded-2xl relative overflow-hidden shadow-inner">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Tag Badge */}
            {item.tag && (
              <span className="absolute top-3 left-3 bg-accent-gold text-charcoal-black font-poppins font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-sm">
                {item.tag}
              </span>
            )}

            {/* Calories overlay */}
            <span className="absolute bottom-3 right-3 bg-charcoal-black/70 border border-white/10 text-white font-poppins font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <IoFlame className="text-primary-orange" /> {item.calories} kcal
            </span>
          </div>

          {/* Footer details */}
          <div className="mt-3 flex flex-col justify-between flex-grow">
            <div>
              <h4 className="font-poppins font-extrabold text-lg text-charcoal-black truncate leading-tight">
                {item.name}
              </h4>
              <span className="flex items-center gap-1 mt-1">
                {item.category === 'veg' ? (
                  <>
                    <IoLeaf className="text-fresh-green text-xs" />
                    <span className="font-manrope text-xs text-gray-400 uppercase tracking-wider font-bold">Pure Veg</span>
                  </>
                ) : (
                  <>
                    <IoFlame className="text-primary-orange text-xs" />
                    <span className="font-manrope text-xs text-gray-400 uppercase tracking-wider font-bold">Non-Veg</span>
                  </>
                )}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-gray-400 font-manrope font-bold mt-2">
              <span>Portion Controlled</span>
              <span className="text-primary-orange">Hover to Flip</span>
            </div>
          </div>
        </div>

        {/* BACK SIDE (Neomorphic Dark Card) */}
        <div 
          className="absolute inset-0 w-full h-full neom-card-dark text-white p-6 flex flex-col justify-between border border-white/5"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)' 
          }}
        >
          <div>
            <h4 className="font-poppins font-bold text-lg text-primary-orange truncate mb-3">
              {item.name}
            </h4>

            {/* Ingredients */}
            <div className="mb-4">
              <span className="text-[10px] font-poppins font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                Ingredients
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, idx) => (
                  <span 
                    key={idx} 
                    className="text-[10px] font-manrope bg-white/10 border border-white/5 px-2 py-0.5 rounded-lg text-gray-200"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutrition breakdown */}
            <div>
              <span className="text-[10px] font-poppins font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                Estimated Macros
              </span>
              <div className="grid grid-cols-3 gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl text-center text-xs font-manrope">
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Protein</span>
                  <span className="font-bold text-fresh-green">~18-24g</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Carbs</span>
                  <span className="font-bold text-white">~45-60g</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Fat</span>
                  <span className="font-bold text-primary-orange">~8-12g</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add to Plan CTA */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const plansSec = document.querySelector('#plans');
              if (plansSec) {
                if (window.lenis) window.lenis.scrollTo(plansSec, { offset: -80 });
                else plansSec.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full bg-primary-orange hover:bg-orange-600 text-white py-2.5 rounded-xl font-poppins font-bold text-xs transition-colors uppercase tracking-wider cursor-pointer"
          >
            Add to Plan
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function TodaysMenu() {
  const [mealCategory, setMealCategory] = useState('lunch'); // 'breakfast', 'lunch', 'dinner'
  const [dietFilter, setDietFilter] = useState('veg'); // 'veg', 'nonveg'

  const allItems = menuData[mealCategory] || [];
  const filteredItems = allItems.filter(item => item.category === dietFilter);

  return (
    <section id="menu" className="py-24 bg-warm-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionTitle 
          title="Explore Today's"
          highlightText="Delicious Menu"
          subtitle="Our daily selection cooked fresh with low oil and high nutrition values."
          center={true}
        />

        {/* Filter Navigation Row (Emojis replaced with React Icons) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 max-w-4xl mx-auto border-b border-gray-200 pb-6 text-left">
          {/* Meal category */}
          <div className="flex gap-4">
            {['breakfast', 'lunch', 'dinner'].map((cat) => {
              const isActive = mealCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setMealCategory(cat)}
                  className={`relative px-4 py-2 font-poppins font-semibold text-sm uppercase tracking-wider transition-colors cursor-pointer ${
                    isActive ? 'text-primary-orange font-extrabold' : 'text-gray-500 hover:text-charcoal-black'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="category-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-orange"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Diet category */}
          <div className="flex gap-4">
            {[
              { id: 'veg', label: 'Veg Only', icon: <IoLeaf className="text-fresh-green" /> },
              { id: 'nonveg', label: 'Non-Veg Only', icon: <IoFlameOutline className="text-primary-orange" /> }
            ].map((diet) => {
              const isActive = dietFilter === diet.id;
              return (
                <button
                  key={diet.id}
                  onClick={() => setDietFilter(diet.id)}
                  className={`relative px-4 py-2 font-poppins font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2 ${
                    isActive ? 'text-primary-orange font-extrabold' : 'text-gray-500 hover:text-charcoal-black'
                  }`}
                >
                  {diet.icon}
                  {diet.label}
                  {isActive && (
                    <motion.div
                      layoutId="diet-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-orange"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const isLarge = idx === 0;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={isLarge ? 'md:col-span-2 h-80' : 'col-span-1 h-80'}
                >
                  <FoodCard item={item} isLarge={isLarge} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-manrope text-sm">No items found matching the selection.</p>
          </div>
        )}

      </div>
    </section>
  );
}
