import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoRestaurant, IoEggOutline, IoDiscOutline, IoFlame, 
  IoNutrition, IoRestaurantOutline, IoLeaf, IoFlameOutline
} from 'react-icons/io5';
import SectionTitle from '../ui/SectionTitle';
import { menuData } from '../../data/menuData';

function FoodCard({ item }) {
  return (
    <div className="w-full h-full relative select-none" style={{ perspective: 1200 }}>
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ 
          rotateY: 180, scale: 1.03, y: -6, 
          transition: { type: "spring", stiffness: 300, damping: 20 } 
        }}
      >
        {/* FRONT */}
        <div 
          className="absolute inset-0 w-full h-full neom-card-light p-6 flex flex-col justify-between border border-luxury-gold/10"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-[60%] rounded-2xl relative overflow-hidden shadow-inner">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {item.tag && (
              <span className="absolute top-3 left-3 bg-luxury-gold text-charcoal-black font-poppins font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-sm">
                {item.tag}
              </span>
            )}
            <span className="absolute bottom-3 right-3 bg-[#121212]/80 border border-luxury-gold/20 text-champagne font-poppins font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <IoFlame className="text-luxury-gold" /> {item.calories} kcal
            </span>
          </div>

          <div className="mt-3 flex flex-col justify-between flex-grow">
            <div>
              <h4 className="font-poppins font-extrabold text-lg text-champagne truncate leading-tight">
                {item.name}
              </h4>
              <span className="flex items-center gap-1 mt-1">
                {item.category === 'veg' ? (
                  <>
                    <IoLeaf className="text-luxury-gold text-xs" />
                    <span className="font-manrope text-xs text-gray-500 uppercase tracking-wider font-bold">Pure Veg</span>
                  </>
                ) : (
                  <>
                    <IoFlame className="text-metallic-gold text-xs" />
                    <span className="font-manrope text-xs text-gray-500 uppercase tracking-wider font-bold">Non-Veg</span>
                  </>
                )}
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-500 font-manrope font-bold mt-2">
              <span>Portion Controlled</span>
              <span className="text-luxury-gold">Hover to Flip</span>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div 
          className="absolute inset-0 w-full h-full neom-card-dark text-champagne p-6 flex flex-col justify-between border border-luxury-gold/10"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <h4 className="font-poppins font-bold text-lg text-luxury-gold truncate mb-3">{item.name}</h4>
            <div className="mb-4">
              <span className="text-[10px] font-poppins font-bold uppercase tracking-wider text-gray-500 block mb-1.5">Ingredients</span>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, idx) => (
                  <span key={idx} className="text-[10px] font-manrope bg-luxury-gold/10 border border-luxury-gold/15 px-2 py-0.5 rounded-lg text-gray-300">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-poppins font-bold uppercase tracking-wider text-gray-500 block mb-1.5">Estimated Macros</span>
              <div className="grid grid-cols-3 gap-2 bg-luxury-gold/5 border border-luxury-gold/10 p-2.5 rounded-xl text-center text-xs font-manrope">
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase font-bold">Protein</span>
                  <span className="font-bold text-luxury-gold">~18-24g</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase font-bold">Carbs</span>
                  <span className="font-bold text-champagne">~45-60g</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase font-bold">Fat</span>
                  <span className="font-bold text-metallic-gold">~8-12g</span>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const plansSec = document.querySelector('#plans');
              if (plansSec) {
                if (window.lenis) window.lenis.scrollTo(plansSec, { offset: -80 });
                else plansSec.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full bg-gradient-to-r from-dark-bronze to-luxury-gold hover:from-bronze-gold hover:to-champagne text-charcoal-black py-2.5 rounded-xl font-poppins font-bold text-xs transition-all uppercase tracking-wider cursor-pointer"
          >
            Add to Plan
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function TodaysMenu() {
  const [mealCategory, setMealCategory] = useState('lunch');
  const [dietFilter, setDietFilter] = useState('veg');
  const allItems = menuData[mealCategory] || [];
  const filteredItems = allItems.filter(item => item.category === dietFilter);

  return (
    <section id="menu" className="py-24 bg-[#0E0E0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectionTitle 
          title="Explore Today's"
          highlightText="Delicious Menu"
          subtitle="Our daily selection cooked fresh with low oil and high nutrition values."
          center={true}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 max-w-4xl mx-auto border-b border-luxury-gold/10 pb-6 text-left">
          <div className="flex gap-4">
            {['breakfast', 'lunch', 'dinner'].map((cat) => {
              const isActive = mealCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setMealCategory(cat)}
                  className={`relative px-4 py-2 font-poppins font-semibold text-sm uppercase tracking-wider transition-colors cursor-pointer ${
                    isActive ? 'text-luxury-gold font-extrabold' : 'text-gray-500 hover:text-champagne'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="category-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex gap-4">
            {[
              { id: 'veg', label: 'Veg Only', icon: <IoLeaf className="text-luxury-gold" /> },
              { id: 'nonveg', label: 'Non-Veg Only', icon: <IoFlameOutline className="text-metallic-gold" /> }
            ].map((diet) => {
              const isActive = dietFilter === diet.id;
              return (
                <button
                  key={diet.id}
                  onClick={() => setDietFilter(diet.id)}
                  className={`relative px-4 py-2 font-poppins font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2 ${
                    isActive ? 'text-luxury-gold font-extrabold' : 'text-gray-500 hover:text-champagne'
                  }`}
                >
                  {diet.icon}
                  {diet.label}
                  {isActive && (
                    <motion.div
                      layoutId="diet-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
