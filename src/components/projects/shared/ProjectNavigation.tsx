
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ProjectNavigationProps {
  backText?: string;
}

const ProjectNavigation = ({ backText = "Back to work" }: ProjectNavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
      <Link 
        to="/work" 
        className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {backText}
      </Link>
    </nav>
  );
};

export default ProjectNavigation;
