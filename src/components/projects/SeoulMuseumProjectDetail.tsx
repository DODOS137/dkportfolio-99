
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { seoulMuseumProjectData } from '@/data/seoulMuseumProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import ProjectHero from './shared/ProjectHero';
import ProjectMetadata from './shared/ProjectMetadata';
import ProcessGrid from './shared/ProcessGrid';

const SeoulMuseumProjectDetail = () => {
  const project = seoulMuseumProjectData;

  const processSteps = [
    {
      title: "Brand Analysis",
      items: ["Heritage Study & Identity Research"]
    },
    {
      title: "Spatial Design",
      items: ["Wayfinding System", "Visitor Experience"]
    },
    {
      title: "Implementation",
      items: ["Brand Integration", "Modern Design Principles"]
    }
  ];

  return (
    <ProjectLayout>
      <ProjectNavigation backText="Back to work page" />

      <ProjectHero
        title={project.heroTitle}
        subtitle={project.heroSubtitle}
        year={project.heroYear}
        client={project.heroClient}
        role={project.heroRole}
      />

      <section className="pb-20">
        <div className="mb-20">
          <div className="w-full">
            <AspectRatio ratio={16 / 9} className="w-full">
              <ImageWithLoading src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-full object-cover" data-lovable-editable="true" />
            </AspectRatio>
          </div>
        </div>

        <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[150px]">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white">
              {project.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              {project.mainDescription}
            </p>
            
            <ProjectMetadata
              projectType={project.projectType}
              projectCategory={project.projectCategory}
              teamType={project.teamType}
              duration={project.duration}
            />
          </div>
        </div>

        <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[150px]">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white">Approach</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              {project.approach}
            </p>
            
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white">Development Strategy</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {project.development}
            </p>
          </div>
        </div>

        <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[150px]">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <h2 className="text-2xl md:text-3xl font-light mb-12 text-white">Process</h2>
            <ProcessGrid steps={processSteps} />
          </div>
        </div>
      </section>
    </ProjectLayout>
  );
};

export default SeoulMuseumProjectDetail;
