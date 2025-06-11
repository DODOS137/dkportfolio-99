
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import ProjectHero from './shared/ProjectHero';
import ProjectMetadata from './shared/ProjectMetadata';
import ProcessGrid from './shared/ProcessGrid';
import BackToTopButton from '@/components/BackToTopButton';

const IslandProjectDetail = () => {
  // Process steps data
  const processSteps = [
    {
      title: "Ideation Phase",
      items: ["Brainstorming", "Concept Sketching"]
    },
    {
      title: "Analysis",
      items: ["Context & Problem Analysis", "Survey", "Precedent Study"]
    },
    {
      title: "Design Development", 
      items: ["Idea Development", "Spatial Design", "Product Design", "User Interface Design"]
    }
  ];

  return (
    <ProjectLayout>
      <ProjectNavigation />

      <ProjectHero 
        title="Island"
        subtitle="Digital Interactive Installation"
        year="2024"
        client="Personal Project"
        role="Interactive Designer"
      />

      <section className="">
        {/* First Image */}
        <div className="max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[250px] z-10">
          <img 
            src="/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png" 
            alt="Island - Image 1" 
            className="w-full h-auto object-contain" 
          />
        </div>

        <div className="max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-20 md:mt-40">
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-light">
              Island
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
              Island explores the concept of isolation and connection in digital spaces through an interactive installation. The project creates immersive environments that respond to user presence and interaction, questioning the boundaries between physical and virtual experiences.
            </p>
            
            <ProjectMetadata 
              projectType="Personal Project"
              projectCategory="Interactive Installation"
              teamType="Solo Project"
              duration="10 weeks"
            />
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Approach Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-xl md:text-2xl font-light mb-6 md:mb-8 text-gray-300">Approach</h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
              The project examines the paradox of digital isolation - how technology can simultaneously connect and disconnect us. Through responsive environments and interactive elements, Island creates a space for reflection on our relationship with digital interfaces and virtual communities.
            </p>
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Process Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-xl md:text-2xl font-light mb-8 md:mb-12 text-gray-300">Process</h2>
            <ProcessGrid steps={processSteps} />
          </div>

          {/* Development Strategy */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-xl md:text-2xl font-light mb-6 md:mb-8 text-gray-300">Development Strategy</h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
              The development focused on creating responsive digital environments that adapt to user behavior and presence. The installation uses sensor technology and real-time rendering to create dynamic visual and spatial experiences that reflect the theme of digital isolation and connection.
            </p>
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>
        </div>
      
        {/* Navigation */}
        <div className="pb-40 md:pb-60 flex items-center justify-center mt-32 md:mt-52">
          <Link 
            to="/project/invisible-space-museum" 
            className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium"
          >
            <span>Next project</span>
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
          </Link>
        </div>
      </section>
      
      <BackToTopButton />
    </ProjectLayout>
  );
};

export default IslandProjectDetail;
