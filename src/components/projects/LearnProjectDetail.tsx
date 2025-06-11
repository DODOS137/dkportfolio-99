import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { learnProjectData } from '@/data/learnProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import ProjectHero from './shared/ProjectHero';
import ProjectMetadata from './shared/ProjectMetadata';
import ProcessGrid from './shared/ProcessGrid';
import BackToTopButton from '@/components/BackToTopButton';

const LearnProjectDetail = () => {
  const project = learnProjectData;

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
        title={project.heroTitle}
        subtitle="AR-Enhanced Exhibition for Climate Science"
        year={project.heroYear}
        client="Personal Project"
        role="XR & Exhibition Designer"
      />

      <section className="">
        {/* First Image */}
        <div className="max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[250px] z-10">
          <img 
            src={project.images[0]} 
            alt={`${project.title} - Image 1`} 
            className="w-full h-auto object-contain" 
          />
        </div>

        <div className="max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-20 md:mt-40">
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-light">
              Learn
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
              Learn reframes climate science education by transforming abstract data into immersive, tactile experiences. Through AR-enhanced installations and interactive displays, the exhibition makes complex climate models accessible to diverse audiences. Set in a modular format suitable for schools, museums, and public spaces, Learn bridges the gap between scientific research and public understanding.
            </p>
            
            <ProjectMetadata 
              projectType="Personal Project"
              projectCategory="AR Contents & Exhibition Design"
              teamType="Solo Project"
              duration="12 weeks"
            />
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Approach Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-xl md:text-2xl font-light mb-6 md:mb-8 text-gray-300">Approach</h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
              The project prioritizes hands-on learning over passive information consumption. Climate data is translated into spatial experiences—sea level rise becomes a physical walkthrough, temperature changes trigger responsive environments, and carbon cycles are visualized through interactive AR models. This approach transforms abstract scientific concepts into embodied knowledge.
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
              Research focused on educational psychology and science communication, particularly how spatial metaphors enhance comprehension of abstract concepts. The design methodology emphasized modularity, allowing individual components to function independently while maintaining narrative coherence across the full exhibition experience.
            </p>
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Additional content sections would go here */}
          
        </div>
      
        {/* Navigation */}
        <div className="pb-40 md:pb-60 flex items-center justify-center mt-32 md:mt-52">
          <Link 
            to="/project/project-3" 
            className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium"
          >
            <span>Next project</span>
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
          </Link>
        </div>
        
        {/* Remaining Images */}
        {project.images.slice(1).map((image, index) => (
          <div key={index + 1} className="mb-20">
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <ImageWithLoading 
                  src={image} 
                  alt={`${project.title} - Image ${index + 2}`} 
                  className="w-full h-full object-cover" 
                />
              </AspectRatio>
            </div>
          </div>
        ))}
      </section>
      
      <BackToTopButton />
    </ProjectLayout>
  );
};

export default LearnProjectDetail;
