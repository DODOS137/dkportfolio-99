import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Menu, X } from 'lucide-react';
interface ProjectNavigationProps {
  backText?: string;
}
const ProjectNavigation = ({
  backText = "Back to work"
}: ProjectNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
      <div className="flex justify-between items-center">
        <Link to="/work" className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {backText}
        </Link>

        {/* Hamburger Menu */}
        <div className="relative">
          <button onClick={toggleMenu} aria-label="Toggle menu" className="w-12 h-12 bg-opacity-10 backdrop-blur-sm rounded-sm flex flex-col items-center justify-center space-y-1 hover:bg-opacity-20 transition-all duration-300 bg-transparent">
            {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <>
                <div className="w-5 h-0.5 bg-white"></div>
                <div className="w-5 h-0.5 bg-white"></div>
                <div className="w-5 h-0.5 bg-white"></div>
              </>}
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && <div className="absolute top-full right-0 mt-2 w-48 bg-black bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 overflow-hidden">
              <Link to="/" className="block px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 transition-colors text-sm tracking-wide" onClick={toggleMenu}>
                홈
              </Link>
              <Link to="/work" className="block px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 transition-colors text-sm tracking-wide" onClick={toggleMenu}>
                워크
              </Link>
              <Link to="/about" className="block px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 transition-colors text-sm tracking-wide" onClick={toggleMenu}>
                어바웃
              </Link>
              <Link to="/contacts" className="block px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 transition-colors text-sm tracking-wide" onClick={toggleMenu}>
                컨텍트
              </Link>
            </div>}
        </div>
      </div>
    </nav>;
};
export default ProjectNavigation;