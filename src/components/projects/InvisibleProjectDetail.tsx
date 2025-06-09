
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { invisibleProjectData } from '@/data/invisibleProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import ProjectHero from './shared/ProjectHero';
import ProjectContent from './shared/ProjectContent';
import ProjectMetadata from './shared/ProjectMetadata';
import ProcessGrid from './shared/ProcessGrid';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import BackToTopButton from '@/components/BackToTopButton';
import PageLoader from '@/components/PageLoader';
import { usePageLoading } from '@/hooks/usePageLoading';

const InvisibleProjectDetail = () => {
  const { isLoading } = usePageLoading();

  if (isLoading) {
    return <PageLoader />;
  }

  const project = invisibleProjectData;
  const processSteps = [
    {
      title: "Ideation Phase",
      items: ["Brainstorming", "Concept Sketching"]
    },
    {
      title: "Analysis",
      items: ["Site Analysis", "Precedent Study"]
    },
    {
      title: "Design Development",
      items: ["Idea Development", "Spatial Design", "Exhibition Design"]
    }
  ];
  const heroRef = useScrollAnimation();

  return (
    <ProjectLayout>
      <ProjectNavigation />

      <ProjectHero 
        title={project.heroTitle}
        subtitle="A Museum Experience Beyond the Visible"
        year={project.heroYear}
        client="Personal Project"
        role="Exhibition Designer"
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
              Invisible Space Museum
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
              The Invisible Space Museum challenges the conventional boundaries of exhibition design by exploring spaces that exist beyond physical perception. This experimental museum concept investigates how architectural voids, negative spaces, and transitional zones can become primary exhibition content, shifting the focus from displayed objects to the spatial experience itself.
            </p>
            
            <ProjectMetadata 
              projectType="Personal Project"
              projectCategory="Exhibition & Spatial Design"
              teamType="Solo Project"
              duration="6 weeks"
            />
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Approach Section */}
          <div className="mb-20 md:mb-40">
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-light">
              Approach
            </h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
              Rather than filling space with artifacts, this museum reveals the inherent drama of emptiness. The project treats absence as presence, using architectural intervals, shadows, and atmospheric conditions as primary exhibition elements. Visitors navigate through carefully orchestrated voids that heighten awareness of spatial relationships and sensory perception.
            </p>
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Process Section */}
          <div className="mb-20 md:mb-40">
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-light">
              Process
            </h2>
            <ProcessGrid steps={processSteps} />
          </div>

          {/* Concept Development */}
          <div className="mb-20 md:mb-40">
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-light">
              Concept Development
            </h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
              The project began with investigations into phenomenological architecture and the psychology of empty space. Drawing from Maurice Merleau-Ponty's writings on spatial perception and Rachel Whiteread's cast sculptures of negative space, the design framework positions emptiness as an active agent rather than a passive container. Each gallery is conceived as a spatial instrument that amplifies subtle environmental phenomena.
            </p>
          </div>

          <div className="w-full">
            <img 
              className="w-full h-auto mb-20 md:mb-40" 
              src="/lovable-uploads/conceptual-sketches.png" 
              alt="Conceptual development sketches"
            />
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Spatial Design */}
          <div className="mb-20 md:mb-40">
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-light">
              Spatial Design
            </h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
              The museum consists of five interconnected chambers, each exploring different aspects of invisible space: transitional thresholds, atmospheric density, acoustic voids, temporal intervals, and perceptual boundaries. Materials are limited to concrete, glass, and controlled lighting, ensuring that architectural form serves the revelation of space rather than its decoration.
            </p>
          </div>

          <div className="w-full">
            <img 
              className="w-full h-auto mb-20 md:mb-40" 
              src="/lovable-uploads/spatial-diagrams.png" 
              alt="Spatial design diagrams"
            />
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          <div className="mb-20 md:mb-40">
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-light">
              Exhibition Framework
            </h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">
              The exhibition operates without traditional display cases or informational texts. Instead, visitors encounter calibrated environments that foreground spatial phenomena: the weight of silence in an anechoic chamber, the optical density of graduated transparency, the temporal rhythm of shadow movement. Each space becomes both container and content, medium and message.
            </p>
          </div>
        </div>
      
        {/* Navigation */}
        <div className="pb-40 md:pb-60 flex items-center justify-center mt-32 md:mt-52">
          <Link 
            to="/project/learn" 
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

export default InvisibleProjectDetail;
