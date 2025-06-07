
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
          className="w-full h-full border-2 border-gray-700"
          allowFullScreen
          scrolling="no"
          title={title}
        />
      </div>
      <p className="text-sm text-gray-700 mt-4 text-center">
        Click the screen to begin, then press the X key to interact. Press ESC to exit.
      </p>
    </>
  );
};

export default InteractiveExperience;
