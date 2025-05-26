
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScrollAnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

const ScrollAnimatedImage: React.FC<ScrollAnimatedImageProps> = ({ 
  src, 
  alt, 
  className = "",
  children
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-auto object-contain" 
      />
      {children}
    </div>
  );
};

export default ScrollAnimatedImage;
