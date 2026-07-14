import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IoArrowBack, 
  IoMailOutline, 
  IoLockClosedOutline, 
  IoPersonOutline, 
  IoCallOutline, 
  IoEyeOutline, 
  IoEyeOffOutline,
  IoSparkles
} from 'react-icons/io5';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API registration/login delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        // Redirect back to homepage on success
        window.location.hash = '#home';
      }, 1500);
    }, 1200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2] relative overflow-hidden flex flex-col justify-between font-manrope text-charcoal-black">
      
      {/* Decorative background vectors */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary-orange/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-fresh-green/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary-orange/60 overflow-hidden shadow-md bg-white p-0.5 flex items-center justify-center">
            <img 
              src="/EATOGGY  logo.png" 
              alt="Eatoggy Logo" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="font-poppins font-extrabold text-charcoal-black text-base md:text-lg tracking-wider">
            EATOGGY
          </span>
        </a>

        {/* Neomorphic Back to Home button */}
        <a 
          href="#home"
          className="neom-card-light py-2.5 px-5 rounded-2xl border border-white/60 font-poppins font-bold text-xs flex items-center gap-2 text-charcoal-black hover:text-primary-orange transition-colors"
        >
          <IoArrowBack className="text-sm" />
          <span>Back to Home</span>
        </a>
      </header>

      {/* Center Card Area */}
      <main className="w-full flex-grow flex items-center justify-center px-6 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', damping: 20 }}
          className="neom-card-light w-full max-w-md bg-[#FFF8F2] border border-white/60 p-8 md:p-10 rounded-3xl shadow-xl text-left"
        >
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center flex flex-col items-center justify-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-fresh-green/10 text-fresh-green flex items-center justify-center text-3xl shadow-inner border border-fresh-green/20 animate-bounce">
                ✓
              </div>
              <h3 className="text-2xl font-bold font-poppins text-fresh-green">
                {isLogin ? 'Welcome Back!' : 'Account Created!'}
              </h3>
              <p className="font-manrope text-sm text-gray-500">
                Logging you in. Redirecting to home...
              </p>
            </motion.div>
          ) : (
            <div>
              {/* Header / Tabs */}
              <div className="flex gap-4 border-b border-gray-200/50 pb-4 mb-6">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`font-poppins font-black text-xl cursor-pointer transition-colors ${
                    isLogin ? 'text-primary-orange' : 'text-gray-400 hover:text-charcoal-black'
                  }`}
                >
                  Login
                </button>
                <span className="text-xl text-gray-300">|</span>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`font-poppins font-black text-xl cursor-pointer transition-colors ${
                    !isLogin ? 'text-primary-orange' : 'text-gray-400 hover:text-charcoal-black'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Subtitle */}
              <p className="font-manrope text-xs text-gray-400 mb-6 -mt-3">
                {isLogin 
                  ? 'Enter your credentials to access your daily meal planner.' 
                  : 'Create an account to automate healthy meal deliveries.'
                }
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Signup Fields: Name & Phone */}
                {!isLogin && (
                  <>
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label className="font-manrope text-xs text-gray-500 font-bold block pl-1">
                        Full Name
                      </label>
                      <div className="relative flex items-center">
                        <IoPersonOutline className="absolute left-4 text-gray-400 text-base" />
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-3 rounded-2xl neom-card-light-inset border border-transparent text-sm font-manrope outline-none focus:border-primary-orange transition-colors text-charcoal-black bg-[#FFF8F2]"
                        />
                      </div>
                    </div>

                    {/* Phone input */}
                    <div className="space-y-1.5">
                      <label className="font-manrope text-xs text-gray-500 font-bold block pl-1">
                        Phone Number
                      </label>
                      <div className="relative flex items-center">
                        <IoCallOutline className="absolute left-4 text-gray-400 text-base" />
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="8860036008"
                          className="w-full pl-12 pr-4 py-3 rounded-2xl neom-card-light-inset border border-transparent text-sm font-manrope outline-none focus:border-primary-orange transition-colors text-charcoal-black bg-[#FFF8F2]"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Email input */}
                <div className="space-y-1.5">
                  <label className="font-manrope text-xs text-gray-500 font-bold block pl-1">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <IoMailOutline className="absolute left-4 text-gray-400 text-base" />
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="info@eatoggy.com"
                      className="w-full pl-12 pr-4 py-3 rounded-2xl neom-card-light-inset border border-transparent text-sm font-manrope outline-none focus:border-primary-orange transition-colors text-charcoal-black bg-[#FFF8F2]"
                    />
                  </div>
                </div>

                {/* Password input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between pl-1">
                    <label className="font-manrope text-xs text-gray-500 font-bold">
                      Password
                    </label>
                    {isLogin && (
                      <a href="#forgot" className="font-manrope text-[10px] text-primary-orange hover:underline font-bold">
                        Forgot?
                      </a>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <IoLockClosedOutline className="absolute left-4 text-gray-400 text-base" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 rounded-2xl neom-card-light-inset border border-transparent text-sm font-manrope outline-none focus:border-primary-orange transition-colors text-charcoal-black bg-[#FFF8F2]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-gray-400 hover:text-charcoal-black cursor-pointer border-none bg-transparent flex items-center justify-center"
                    >
                      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl font-poppins font-bold text-sm bg-gradient-to-r from-primary-orange to-red-500 text-white shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>{isSubmitting ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
                </Button>

                {/* Footer Toggles */}
                <div className="text-center pt-2">
                  <p className="font-manrope text-xs text-gray-400 font-bold">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-primary-orange hover:underline font-extrabold cursor-pointer border-none bg-transparent"
                    >
                      {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                  </p>
                </div>

              </form>
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-xs text-gray-400 font-manrope">
        <p>© 2026 Eatoggy Private Limited. All rights reserved.</p>
      </footer>
    </div>
  );
}
