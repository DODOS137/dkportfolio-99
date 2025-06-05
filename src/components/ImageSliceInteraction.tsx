
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
  const [slicePosition, setSlicePosition] = useState(0);
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
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - slicePosition}% 0 0)` }}
      >
        <img 
          src={overlayImage} 
          alt="Overlay" 
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ImageSliceInteraction;
