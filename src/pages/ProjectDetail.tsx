
import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';

// Import project components
import InvisibleProjectDetail from '@/components/projects/InvisibleProjectDetail';
import LearnProjectDetail from '@/components/projects/LearnProjectDetail';
import ThermalTraceProjectDetail from '@/components/projects/ThermalTraceProjectDetail';
import WhispersProjectDetail from '@/components/projects/WhispersProjectDetail';
import SeoulMuseumProjectDetail from '@/components/projects/SeoulMuseumProjectDetail';
import IslandProjectDetail from '@/components/projects/IslandProjectDetail';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  console.log('ProjectDetail rendering with slug:', slug);

  const renderProjectComponent = () => {
    console.log('Rendering project component for slug:', slug);
    
    try {
      switch (slug) {
        case 'invisible-space-museum':
          console.log('Loading InvisibleProjectDetail');
          return (
            <ErrorBoundaryWrapper fallback={<ProjectErrorFallback projectName="Invisible" />}>
              <InvisibleProjectDetail />
            </ErrorBoundaryWrapper>
          );
        case 'learn':
          console.log('Loading LearnProjectDetail');
          return (
            <ErrorBoundaryWrapper fallback={<ProjectErrorFallback projectName="Learn" />}>
              <LearnProjectDetail />
            </ErrorBoundaryWrapper>
          );
        case 'project-3':
          console.log('Loading ThermalTraceProjectDetail');
          return (
            <ErrorBoundaryWrapper fallback={<ProjectErrorFallback projectName="Thermal Trace" />}>
              <ThermalTraceProjectDetail />
            </ErrorBoundaryWrapper>
          );
        case 'project-4':
          console.log('Loading WhispersProjectDetail');
          return (
            <ErrorBoundaryWrapper fallback={<ProjectErrorFallback projectName="Whispers from the Bottom" />}>
              <WhispersProjectDetail />
            </ErrorBoundaryWrapper>
          );
        case 'project-5':
          console.log('Loading SeoulMuseumProjectDetail');
          return (
            <ErrorBoundaryWrapper fallback={<ProjectErrorFallback projectName="Seoul Museum" />}>
              <SeoulMuseumProjectDetail />
            </ErrorBoundaryWrapper>
          );
        case 'project-6':
          console.log('Loading IslandProjectDetail');
          return (
            <ErrorBoundaryWrapper fallback={<ProjectErrorFallback projectName="Island" />}>
              <IslandProjectDetail />
            </ErrorBoundaryWrapper>
          );
        default:
          console.log('No matching project found for slug:', slug);
          return <ProjectNotFound />;
      }
    } catch (error) {
      console.error('Error in renderProjectComponent:', error);
      return <ProjectErrorFallback projectName="Unknown" />;
    }
  };

  return (
    <ErrorBoundaryWrapper>
      {renderProjectComponent()}
    </ErrorBoundaryWrapper>
  );
};

const ProjectErrorFallback = ({ projectName }: { projectName: string }) => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-light text-white mb-4">Error Loading {projectName}</h1>
      <p className="text-gray-400 mb-6">There was an issue loading this project.</p>
      <Link to="/work" className="text-white hover:text-gray-300 transition-colors border border-white px-6 py-2 rounded">
        Back to Work
      </Link>
    </div>
  </div>
);

const ProjectNotFound = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-light text-white mb-4">Project Not Found</h1>
      <Link to="/work" className="text-gray-400 hover:text-white transition-colors">
        Back to Work
      </Link>
    </div>
  </div>
);

export default ProjectDetail;
