
import React from 'react';

interface ProcessStepProps {
  title: string;
  items: string[];
}

interface ProcessGridProps {
  steps: ProcessStepProps[];
}

const ProcessGrid = ({ steps }: ProcessGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
      {steps.map((step, index) => (
        <div key={index} className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
          <h3 className="text-xl font-light text-white mb-4">{step.title}</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            {step.items.map((item, itemIndex) => (
              <p key={itemIndex} className="text-gray-400 text-sm leading-relaxed">
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessGrid;
