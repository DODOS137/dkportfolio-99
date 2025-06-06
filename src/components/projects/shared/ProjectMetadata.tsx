
import React from 'react';

interface ProjectMetadataProps {
  projectType: string;
  projectCategory: string;
  teamType: string;
  duration: string;
}

const ProjectMetadata = ({ projectType, projectCategory, teamType, duration }: ProjectMetadataProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div>
        <h3 className="text-gray-400 uppercase tracking-wider mb-2">project type</h3>
        <p className="text-white font-light">{projectType}</p>
      </div>
      <div>
        <h3 className="text-gray-400 uppercase tracking-wider mb-2">Project category</h3>
        <p className="text-white font-light">{projectCategory}</p>
      </div>
      <div>
        <h3 className="text-gray-400 uppercase tracking-wider mb-2">team</h3>
        <p className="text-white font-light">{teamType}</p>
      </div>
      <div>
        <h3 className="text-gray-400 uppercase tracking-wider mb-2">DURATION</h3>
        <p className="text-white font-light">{duration}</p>
      </div>
    </div>
  );
};

export default ProjectMetadata;
