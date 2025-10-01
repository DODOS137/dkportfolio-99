
import React from 'react';
import ImageSliceInteraction from '@/components/ImageSliceInteraction';

interface InteractiveImageSectionProps {
  baseImage: string;
  overlayImage: string;
  instruction?: string;
}

const InteractiveImageSection = ({ baseImage, overlayImage, instruction = "Hover over the image and move your mouse from left to right." }: InteractiveImageSectionProps) => {
  return (
    <div className="w-full h-auto mb-20">
      <ImageSliceInteraction baseImage={baseImage} overlayImage={overlayImage} />
      <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-8">
        <h2 className="text-2xl font-Bold text-white whitespace-nowrap min-w-8 md:text-sm">
          →
        </h2>
        <p className="text-sm leading-relaxed text-white font-Medium md:text-sm">{instruction}</p>
      </div>
    </div>
  );
};

export default InteractiveImageSection;
