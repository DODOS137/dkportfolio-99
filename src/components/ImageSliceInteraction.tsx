
import React, { useState, useRef } from 'react';

interface ImageSliceInteractionProps {
  baseImage: string;
  overlayImage: string;
  className?: string;
}

const ImageSliceInteraction: React.FC<ImageSliceInteractionProps> = ({
  baseImage,
  overlayImage,
  className = ""
}) => {
  const [slicePosition, setSlicePosition] = useState(50);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSlicePosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-auto cursor-none overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Base Image */}
      <img 
        src={baseImage} 
        alt="Base" 
        className="w-full h-auto block"
        draggable={false}
      />
      
      {/* Overlay Image */}
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${slicePosition}%` }}
      >
        <img 
          src={overlayImage} 
          alt="Overlay" 
          className="w-full h-full object-cover"
          style={{ width: `${containerRef.current ? containerRef.current.offsetWidth : 0}px` }}
          draggable={false}
        />
      </div>
      
      {/* Vertical Divider Line */}
      {isHovering && (
        <div 
          className="absolute top-0 h-full w-0.5 bg-white shadow-lg pointer-events-none z-10 transition-all duration-75"
          style={{ left: `${slicePosition}%` }}
        />
      )}
    </div>
  );
};

export default ImageSliceInteraction;
