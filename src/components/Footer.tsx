
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-light tracking-wider mb-4" data-lovable-editable="true">DOHYUN KIM</h3>
            <p className="text-gray-400 leading-relaxed" data-lovable-editable="true">
              Creating immersive experiences through VR, spatial design, and innovative digital interactions.
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h4 className="text-lg font-light mb-4" data-lovable-editable="true">Navigation</h4>
            <div className="space-y-2">
              <Link to="/home" className="block text-gray-400 hover:text-white transition-colors" data-lovable-editable="true">Home</Link>
              <Link to="/work" className="block text-gray-400 hover:text-white transition-colors" data-lovable-editable="true">Work</Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors" data-lovable-editable="true">About</Link>
              <Link to="/contacts" className="block text-gray-400 hover:text-white transition-colors" data-lovable-editable="true">Contact</Link>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-light mb-4" data-lovable-editable="true">Get In Touch</h4>
            <div className="space-y-2">
              <a href="mailto:dohyon18@gmail.com" className="block text-gray-400 hover:text-white transition-colors" data-lovable-editable="true">
                dohyon18@gmail.com
              </a>
              <a href="tel:+447587458797" className="block text-gray-400 hover:text-white transition-colors" data-lovable-editable="true">
                +44 (0) 7587-458797
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm" data-lovable-editable="true">© {new Date().getFullYear()} Dohyun Kim. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="https://www.linkedin.com/in/dohyun-kim-028221343" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" data-lovable-editable="true">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/donn_kkim" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" data-lovable-editable="true">
              Instagram
            </a>
            <a href="https://www.youtube.com/channel/UCwwt3iNyM7nuIx_XbXiqlqw" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" data-lovable-editable="true">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
