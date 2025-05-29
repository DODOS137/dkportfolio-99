
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/home" className="text-white font-light text-2xl tracking-wider hover:text-gray-300 transition-colors">
              DK
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <Link 
              to="/home" 
              className={`text-white hover:text-gray-300 transition-colors font-light tracking-wide ${
                isActive('/home') ? 'border-b border-white pb-1' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/work" 
              className={`text-white hover:text-gray-300 transition-colors font-light tracking-wide ${
                isActive('/work') ? 'border-b border-white pb-1' : ''
              }`}
            >
              Work
            </Link>
            <Link 
              to="/about" 
              className={`text-white hover:text-gray-300 transition-colors font-light tracking-wide ${
                isActive('/about') ? 'border-b border-white pb-1' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/contacts" 
              className={`text-white hover:text-gray-300 transition-colors font-light tracking-wide ${
                isActive('/contacts') ? 'border-b border-white pb-1' : ''
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-white hover:text-gray-300 transition-colors p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
          <div className="px-4 py-6 space-y-4">
            <Link 
              to="/home" 
              className="block text-white text-lg font-light hover:text-gray-300 transition-colors py-2" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/work" 
              className="block text-white text-lg font-light hover:text-gray-300 transition-colors py-2" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Work
            </Link>
            <Link 
              to="/about" 
              className="block text-white text-lg font-light hover:text-gray-300 transition-colors py-2" 
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contacts" 
              className="block text-white text-lg font-light hover:text-gray-300 transition-colors py-2" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
