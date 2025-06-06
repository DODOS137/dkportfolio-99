
import React from 'react';

interface InteractiveExperienceProps {
  src: string;
  title: string;
  description: string;
}

const InteractiveExperience = ({ src, title, description }: InteractiveExperienceProps) => {
  return (
    <>
      <div className="w-full aspect-[16/9] bg-black rounded-lg overflow-hidden">
        <iframe
          src={src}
          className="w-full h-full border-0"
          allowFullScreen
          scrolling="no"
          title={title}
        />
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center">
        {description}
      </p>
    </>
  );
};

export default InteractiveExperience;
