
import React from 'react';
import { useParams } from 'react-router-dom';
import InvisibleProjectDetail from '@/components/projects/InvisibleProjectDetail';
import LearnProjectDetail from '@/components/projects/LearnProjectDetail';
import ThermalTraceProjectDetail from '@/components/projects/ThermalTraceProjectDetail';
import WhispersProjectDetail from '@/components/projects/WhispersProjectDetail';
import SeoulMuseumProjectDetail from '@/components/projects/SeoulMuseumProjectDetail';
import IslandProjectDetail from '@/components/projects/IslandProjectDetail';
import { Link } from 'react-router-dom';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const renderProjectComponent = () => {
    switch (slug) {
      case 'invisible-space-museum':
        return <InvisibleProjectDetail />;
      case 'learn':
        return <LearnProjectDetail />;
      case 'thermal-trace':
        return <ThermalTraceProjectDetail />;
      case 'whispers-of-memory':
        return <WhispersProjectDetail />;
      case 'project-5':
        return <SeoulMuseumProjectDetail />;
      case 'project-6':
        return <IslandProjectDetail />;
      default:
        return (
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-light text-white mb-4">Project Not Found</h1>
              <Link to="/work" className="text-gray-400 hover:text-white transition-colors">
                Back to Work
              </Link>
            </div>
          </div>
        );
    }
  };

  return renderProjectComponent();
};

export default ProjectDetail;
