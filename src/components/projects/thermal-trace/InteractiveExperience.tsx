
import React from 'react';

interface InteractiveExperienceProps {
  src: string;
  title: string;
  description: string;
}

const InteractiveExperience = ({ src, title, description }: InteractiveExperienceProps) => {
  return (
    <>
      <div className="w-full aspect-[16/9] bg-black rounded-lg overflow-hidden border-1 border-[#0044FA]">
        <iframe
          src={src}
          className="w-full h-full"
          allowFullScreen
          scrolling="no"
          title={title}
        />
      </div>
      <p className="text-sm text-[#0044FA] mt-8 text-center">
        Click the screen to begin, then press the X key to interact. Press ESC to exit.
      </p>
    </>
  );
};

export default InteractiveExperience;
