import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { thermalTraceProjectData } from '@/data/thermalTraceProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import ProjectHero from './shared/ProjectHero';
import ProjectContent from './shared/ProjectContent';
import ProjectMetadata from './shared/ProjectMetadata';
import ProcessGrid from './shared/ProcessGrid';
import InteractiveImageSection from './thermal-trace/InteractiveImageSection';
import CarouselSection from './thermal-trace/CarouselSection';
import ContentSection from './thermal-trace/ContentSection';
import InteractiveExperience from './thermal-trace/InteractiveExperience';
import BackToTopButton from '@/components/BackToTopButton';
const ThermalTraceProjectDetail = () => {
  const project = thermalTraceProjectData;

  // Sample images for the spatial design carousel
  const carouselImages = ["/lovable-uploads/46b8ed4c-230a-45eb-8e27-124bea094c92.png", "/lovable-uploads/f421ff4d-3ede-4f79-b712-89e44b679c75.png", "/lovable-uploads/0ad6ae30-d45d-4de3-9d47-59c2ac18a0b0.png"];

  // Art work images
  const artWorkImages = ["/lovable-uploads/31568277-b7f9-4571-80b7-33c38ee874f8.png", "/lovable-uploads/3acaab47-3d89-4589-92c7-2be3cf679ffa.png", "/lovable-uploads/2d907dcd-422c-4ace-856b-a3b65d53ab17.png"];

  // Process steps data
  const processSteps = [{
    title: "Ideation Phase",
    items: ["Brainstorming", "Concept Sketching"]
  }, {
    title: "Analysis",
    items: ["Stage Environment Research", "Precedent Study"]
  }, {
    title: "Design Development",
    items: ["Idea Development", "Spatial Design", "User Interaction", "Exhibition Design"]
  }];
  return <ProjectLayout>
      <ProjectNavigation />

      <ProjectHero title={project.heroTitle} subtitle="Reimaging the Fashion Show Through XR" year={project.heroYear} client="Personal Project" role="XR & Exhibition Designer" />

      <section className="">
        {/* First Image */}
        <div className="max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[250px] z-10">
          <img src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" />
        </div>

        <div className="max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-20 md:mt-40">
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-light">
              Thermal Trace
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
              Thermal Trace explores a new paradigm of fashion presentation by removing visual spectacle and foregrounding sensory engagement. Set in a secluded environment untouched by human intervention, this XR installation uses thermal detection to reveal camouflaged figures—merging body heat, environmental awareness, and spatial interaction. The project invites viewers to become active participants, shifting the role of the audience from passive observer to discoverer.
            </p>
            
            <ProjectMetadata projectType="Personal Project" projectCategory="XR Contents & Exhibition Design" teamType="Solo Project" duration="8 weeks" />
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Approach Section with Interactive Image */}
          <div className="rounded-lg bg-transparent">
            <InteractiveImageSection baseImage="/lovable-uploads/b4f192b1-54ab-437f-8dad-74993331f176.png" overlayImage="/lovable-uploads/585a63af-fb48-41d5-82bf-62bc652eff56.png" />
            
            <ContentSection title="Approach">
              <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
                The work reimagines the runway as a perceptual landscape rather than a stage. Models and viewers alike are disguised to dissolve the boundary between object and subject. Physical presence becomes the primary interface, with proximity and body temperature guiding interaction. Mixed reality overlays augment the scene, constructing a layered exhibition space that blends tangible matter with ephemeral perception. This approach fosters new ways of engaging with space, narrative, and the concept of visibility.
              </p>
            </ContentSection>
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Process Section */}
          <ContentSection title="Process">
            <ProcessGrid steps={processSteps} />
          </ContentSection>

          {/* Preliminary Research */}
          <ContentSection title="Preliminary Research">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">
              A preliminary survey conducted with 56 participants supported the conceptual direction of this project. 78% responded positively to questions suggesting that fashion shows should move beyond conventional viewing formats and explore new experiential approaches. Notably, 40% of respondents (22 individuals) identified as either fashion designers or professionals in the fashion industry—reinforcing the relevance of this investigation within the design field.
            </p>
          </ContentSection>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Idea Development */}
          <ContentSection title="Idea Development" layout="two-column">
            <p>
              This project reframes fashion not as something to be seen, but as something to be discovered through thermal detection. Rather than offering a passive visual display, it invites the audience to detect hidden figures through subtle thermal cues—heat traces, environmental temperature shifts, and proximity sensing. The XR installation creates a reward structure based on thermal awareness, shifting the focus from spectacle to sensing. Viewers become thermal explorers, engaging with camouflaged presence through detection rather than simply seeing.
            </p>
          </ContentSection>

          {/* Art Works Section - Individual Images */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent">
              <h2 className="text-2xl font-light mb-40 text-gray-300 md:text-xl">Art Works</h2>
            </div>
          </div>
          
          <div className="w-full">
            <img className="w-full h-auto mb-40" alt="Art Work 1" data-lovable-editable="true" src="/lovable-uploads/1cab7e45-c7f3-4090-8efa-30b83bd90f54.png" />
          </div>
          
          <div className="w-full">
            <img src="/lovable-uploads/3acaab47-3d89-4589-92c7-2be3cf679ffa.png" className="w-full h-auto mb-40" alt="Art Work 2" data-lovable-editable="true" />
          </div>
          
          <div className="w-full">
            <img className="w-full h-auto mb-40" alt="Art Work 3" data-lovable-editable="true" src="/lovable-uploads/71597544-19d7-483c-81c4-82bf7b521859.png" />
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          <CarouselSection images={carouselImages} title="Transformable stage" />

          {/* Spatial Design */}
          <ContentSection title="Spatial Design" layout="two-column">
            <p>
              Set across natural landscapes designed for camouflage—such as islands, forests, and coastal zones—the experience is structured as a responsive terrain. Each space reacts dynamically to the viewer's position and thermal presence, enabled by a real-time XR sensing system. The traditional runway dissolves into an interactive field that tests visibility, form, and presence. Modular environments are choreographed to evoke narrative tension and guide movement through atmospheric shifts. The space itself becomes the interface, framing the act of seeing as an embodied process.
            </p>
          </ContentSection>

          <div className="w-full">
            <img className="w-full h-auto mb-20 md:mb-40" src="/lovable-uploads/ee33591e-e9b0-4e8e-a3f0-181d426fdff8.png" />
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Exhibition Design Image */}
          <div className="w-full ">
            <img className="w-full h-auto mt-20 mb-40" src="/lovable-uploads/115e4ef3-f572-4222-9101-3e140a672d1c.png" />
          </div>
          
          {/* Exhibition Design Section with Interactive Image */}
          <div className="rounded-lg bg-transparent border-1 border-gray500 overflow-hidden">
            <InteractiveImageSection baseImage="/lovable-uploads/673d5687-9173-4d58-8caa-854189586015.png" overlayImage="/lovable-uploads/c5531ed2-75f4-45bd-bcb2-af267986f73a.png" />

            <ContentSection title="Exhibition Design" layout="two-column">
              <p>
                Set across natural landscapes designed for camouflage—such as islands, forests, and coastal zones—the experience is structured as a responsive terrain. Each space reacts dynamically to the viewer's position and thermal presence, enabled by a real-time XR sensing system. The traditional runway dissolves into an interactive field that tests visibility, form, and presence. Modular environments are choreographed to evoke narrative tension and guide movement through atmospheric shifts. The space itself becomes the interface, framing the act of seeing as an embodied process.
              </p>
            </ContentSection>
          </div>

          <InteractiveExperience src="https://lucent-banoffee-a50286.netlify.app" title="Thermal Trace Interactive Experience" description="Experience the thermal detection interface in real-time" />

          <div className="w-full">
            <img src="/lovable-uploads/fd54a2e9-da0e-4967-89dc-aa0c028ad12a.png" className="w-full h-auto mb-20 md:mb-40 mt-20 md:mt-40" />
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          <ContentSection title="Post Project Direction">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">
              The project will be expanded into an interactive XR installation accessible via headset and sensor interface. A public showcase is planned to gather qualitative user feedback, assess perception thresholds, and refine sensory engagement techniques prior to full deployment.
            </p>
          </ContentSection>
        </div>
      
        {/* Navigation */}
        <div className="pb-40 md:pb-60 flex items-center justify-center mt-32 md:mt-52">
          <Link to="/project/project-4" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
            <span>Next project</span>
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
          </Link>
        </div>
        
        {/* Remaining Images */}
        {project.images.slice(1).map((image, index) => <div key={index + 1} className="mb-20">
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <ImageWithLoading src={image} alt={`${project.title} - Image ${index + 2}`} className="w-full h-full object-cover" />
              </AspectRatio>
            </div>
          </div>)}
      </section>
      
      <BackToTopButton />
    </ProjectLayout>;
};
export default ThermalTraceProjectDetail;