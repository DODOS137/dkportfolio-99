
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-light text-white hover:text-gray-300 transition-colors duration-300" data-lovable-editable="true">
            DK
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={`text-sm tracking-wider transition-colors duration-300 ${location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`} data-lovable-editable="true">
              HOME
            </Link>
            <Link to="/work" className={`text-sm tracking-wider transition-colors duration-300 ${location.pathname === '/work' ? 'text-white' : 'text-gray-400 hover:text-white'}`} data-lovable-editable="true">
              WORK
            </Link>
            <Link to="/about" className={`text-sm tracking-wider transition-colors duration-300 ${location.pathname === '/about' ? 'text-white' : 'text-gray-400 hover:text-white'}`} data-lovable-editable="true">
              ABOUT
            </Link>
            <Link to="/contacts" className={`text-sm tracking-wider transition-colors duration-300 ${location.pathname === '/contacts' ? 'text-white' : 'text-gray-400 hover:text-white'}`} data-lovable-editable="true">
              CONTACT
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-white hover:text-gray-300 transition-colors duration-300" aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black bg-opacity-95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/" className={`text-sm tracking-wider transition-colors duration-300 ${location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`} onClick={toggleMenu} data-lovable-editable="true">
                HOME
              </Link>
              <Link to="/work" className={`text-sm tracking-wider transition-colors duration-300 ${location.pathname === '/work' ? 'text-white' : 'text-gray-400 hover:text-white'}`} onClick={toggleMenu} data-lovable-editable="true">
                WORK
              </Link>
              <Link to="/about" className={`text-sm tracking-wider transition-colors duration-300 ${location.pathname === '/about' ? 'text-white' : 'text-gray-400 hover:text-white'}`} onClick={toggleMenu} data-lovable-editable="true">
                ABOUT
              </Link>
              <Link to="/contacts" className={`text-sm tracking-wider transition-colors duration-300 ${location.pathname === '/contacts' ? 'text-white' : 'text-gray-400 hover:text-white'}`} onClick={toggleMenu} data-lovable-editable="true">
                CONTACT
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
