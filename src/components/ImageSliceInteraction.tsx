
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    
    // Instant response - no throttling or debouncing
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
      
      {/* Overlay Image with smooth transition */}
      <div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden transition-all duration-300 ease-in-out"
        style={{ 
          width: `${slicePosition}%`
        }}
      >
        <img 
          src={overlayImage} 
          alt="Overlay" 
          className="w-full h-full object-cover"
          draggable={false}
          style={{ 
            width: `${containerRef.current ? (containerRef.current.offsetWidth * 100) / slicePosition : 100}%`
          }}
        />
      </div>
      
      {/* Vertical Divider Line with arrows */}
      {isHovering && (
        <>
          {/* Main divider line */}
          <div 
            className="absolute top-0 h-full w-0.5 bg-white shadow-lg pointer-events-none z-10 transition-all duration-75"
            style={{ left: `${slicePosition}%`, transform: 'translateX(-50%)' }}
          />
          
          {/* Arrow indicators */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center gap-2 transition-all duration-75"
            style={{ left: `${slicePosition}%` }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg flex items-center gap-1">
              <ChevronLeft className="w-3 h-3 text-black" />
              <ChevronRight className="w-3 h-3 text-black" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSliceInteraction;
