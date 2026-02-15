'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import content from '@/content/siteContent.json';

export function Navbar() {
  const { navigation, site } = content;
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      // Hide nav on scroll down, show on scroll up (mobile only)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-midnight-950/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-32">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3">
            <img src="/images/logo.png" alt={site.name} className="w-24 h-24 rounded-xl object-contain" />
            <span className="text-white font-bold text-2xl">{site.name.split(' ').slice(0, 2).join(' ')}</span>
          </a>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            {navigation.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-2.5 bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/50 hover:scale-105"
            >
              {navigation.ctaText}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className={`md:hidden overflow-x-auto scrollbar-hide border-t border-white/10 transition-all duration-300 ${
        hideNav ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      }`}>
        <div className="flex items-center justify-center gap-1 px-2 py-2 min-w-max">
          {navigation.links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-lg whitespace-nowrap"
          >
            {navigation.ctaText}
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
