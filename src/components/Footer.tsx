import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return <footer className="bg-black text-white py-16 border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Brand */}
          
          
          {/* Navigation */}
          
          
          {/* Contact */}
          
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
    </footer>;
};
export default Footer;