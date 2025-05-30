
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
      <div className="flex justify-between items-center">
        <Link to="/work" className="text-white text-xl font-light tracking-wide hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
          <span data-lovable-editable="true">Dohyun Kim</span>
        </Link>
        
        <div className="flex space-x-8">
          <Link 
            to="/work" 
            className={`text-sm tracking-wide transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              location.pathname === '/work' || location.pathname.includes('/project') 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span data-lovable-editable="true">Work</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
