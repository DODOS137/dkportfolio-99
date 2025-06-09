
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InvisibleProjectDetail from '@/components/projects/InvisibleProjectDetail';
import LearnProjectDetail from '@/components/projects/LearnProjectDetail';
import ThermalTraceProjectDetail from '@/components/projects/ThermalTraceProjectDetail';
import WhispersProjectDetail from '@/components/projects/WhispersProjectDetail';
import SeoulMuseumProjectDetail from '@/components/projects/SeoulMuseumProjectDetail';
import IslandProjectDetail from '@/components/projects/IslandProjectDetail';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Link } from 'react-router-dom';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner size="lg" color="white" />
      </div>
    );
  }

  const renderProjectComponent = () => {
    switch (slug) {
      case 'invisible-space-museum':
        return <InvisibleProjectDetail />;
      case 'learn':
        return <LearnProjectDetail />;
      case 'project-3':
        return <ThermalTraceProjectDetail />;
      case 'project-4':
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
