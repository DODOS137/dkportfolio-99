
import React from 'react';

interface PageLoaderProps {
  isVisible: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg font-light tracking-wide">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
