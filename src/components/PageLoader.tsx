
import React from 'react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg font-light">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
