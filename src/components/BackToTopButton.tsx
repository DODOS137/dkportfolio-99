import React from 'react';
import { ArrowUp } from 'lucide-react';
const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <button onClick={scrollToTop} className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 inline-flex items-center gap-3 pl-4 pr-2 py-2 text-white hover:text-white transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide backdrop-blur-sm rounded border border-transparent hover:border-black bg-transparent">
      <span className="text-white">Back to top</span>
      <ArrowUp className="w-4 h-4" />
    </button>;
};
export default BackToTopButton;