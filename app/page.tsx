'use client';

import React, { useState, useEffect } from 'react';
import { Bot, Zap, MessageSquare, BookOpen, FileText, Menu, X, ArrowRight, Mail, Phone, Globe, Send, Moon, Sun } from 'lucide-react';

export default function ExcelsiorAIWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch - only run after component mounts
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Scroll detection for active navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode toggle with localStorage persistence
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormStatus({ type: '', message: '' });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus({ type: 'error', message: data.error || 'Something went wrong' });
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Automation",
      description: "Transform manual tasks into intelligent automated systems."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Chatbots",
      description: "24/7 customer support, lead-generation bots, WhatsApp bots, and more."
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Strategy & Consulting",
      description: "Identify the right AI tools and build a clear automation roadmap."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "AI Training",
      description: "Practical training for teams and individuals—simple, clear, and effective."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "AI Document Systems",
      description: "Automate document processing and knowledge management."
    }
  ];

  const benefits = [
    "Professional corporate quality",
    "Affordable for all business sizes",
    "Fast and reliable delivery",
    "End-to-end support",
    "Modern & future-proof solutions"
  ];

  // Prevent hydration mismatch - don't render until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full shadow-sm z-50 transition-colors duration-300 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img
                src="/ExcelsiorAILogo.png"
                 alt="Excelsior AI Logo"
                 className='w-48 h-48 object-countain'
              />
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Excelsior AI</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'services', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section
                      ? darkMode ? 'text-blue-400 font-semibold' : 'text-blue-600 font-semibold'
                      : darkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {section}
                </button>
              ))}
              
              {/* Dark Mode Toggle - Desktop */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu Controls */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Dark Mode Toggle - Mobile */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-slate-700 text-yellow-400' : 'bg-slate-100 text-slate-600'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              {/* Hamburger Menu */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? 
                  <X className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-slate-900'}`} /> : 
                  <Menu className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-slate-900'}`} />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="px-4 py-4 space-y-3">
              {['home', 'services', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left capitalize py-2 ${
                    darkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-blue-50 to-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Excelsior AI Solutions
          </h1>
          <p className={`text-2xl md:text-3xl font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Smarter Solutions. Stronger Business.
          </p>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            We deliver advanced AI automation, chatbots, and workflow systems designed to optimize how your business operates.
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Our Services
          </h2>
          <p className={`text-center mb-12 max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Comprehensive AI solutions tailored to your business needs
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl shadow-md hover:shadow-xl transition-all border ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-700 hover:border-blue-500' 
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className={`mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {service.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {service.title}
                </h3>
                <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                About Us
              </h2>
              <p className={`text-lg mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Excelsior AI Solutions is a modern, tech-focused consultancy helping businesses unlock the power of AI. We specialize in practical solutions that save time, reduce costs, and drive growth.
              </p>
              <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Our mission is to make advanced AI technology accessible and practical for businesses of all sizes.
              </p>
            </div>

            <div className={`p-8 rounded-xl ${
              darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-gradient-to-br from-blue-50 to-slate-100'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Why Choose Us
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Get In Touch</h2>
          <p className="text-xl text-slate-300 mb-12 text-center">
            Ready to transform your business with AI? Let's talk.
          </p>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-xl text-center bg-slate-800">
              <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <a href="mailto:contact@excelsior-ai.com" className="text-blue-400 hover:text-blue-300 text-sm break-all">
                contact@excelsior-ai.com
              </a>
            </div>

            <div className="p-6 rounded-xl text-center bg-slate-800">
              <Phone className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
              <a href="https://wa.me/1234567890" className="text-blue-400 hover:text-blue-300 text-sm">
                +1 (234) 567-890
              </a>
            </div>

            <div className="p-6 rounded-xl text-center bg-slate-800">
              <Globe className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Services</h3>
              <p className="text-slate-300 text-sm">Remote | Global</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className={`p-8 rounded-xl shadow-xl ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Send us a message
            </h3>
            
            {/* Success/Error Message */}
            {formStatus.message && (
              <div className={`mb-6 p-4 rounded-lg ${
                formStatus.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {formStatus.message}
              </div>
            )}

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition border ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition border ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                  placeholder="your@email.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none border ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Excelsior AI Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}