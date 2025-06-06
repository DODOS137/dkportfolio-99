
import React from 'react';

interface ProjectLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ProjectLayout = ({ children, className = "" }: ProjectLayoutProps) => {
  return (
    <div className={`min-h-screen bg-black text-white ${className}`}>
      {children}
    </div>
  );
};

export default ProjectLayout;
