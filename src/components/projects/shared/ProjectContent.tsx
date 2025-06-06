
import React from 'react';

interface ProjectContentProps {
  children: React.ReactNode;
  className?: string;
}

const ProjectContent = ({ children, className = "" }: ProjectContentProps) => {
  return (
    <div className={`max-w-[1540px] mx-auto px-[250px] z-10 ${className}`}>
      {children}
    </div>
  );
};

export default ProjectContent;
