
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import ImageSliceInteraction from '@/components/ImageSliceInteraction';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '@/components/ui/carousel';
import { thermalTraceProjectData } from '@/data/thermalTraceProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import ProjectHero from './shared/ProjectHero';
import ProjectContent from './shared/ProjectContent';
import ProjectMetadata from './shared/ProjectMetadata';
import ProcessGrid from './shared/ProcessGrid';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ThermalTraceProjectDetail = () => {
  const project = thermalTraceProjectData;

  // Carousel state for the spatial design slider
  const [secondApi, setSecondApi] = useState<CarouselApi>();
  const [secondCurrent, setSecondCurrent] = useState(0);

  // Scroll animation for iframe
  const iframeAnimation = useScrollAnimation<HTMLDivElement>();

  // Sample images for the spatial design carousel
  const secondSliderImages = ["/lovable-uploads/46b8ed4c-230a-45eb-8e27-124bea094c92.png", "/lovable-uploads/f421ff4d-3ede-4f79-b712-89e44b679c75.png", "/lovable-uploads/0ad6ae30-d45d-4de3-9d47-59c2ac18a0b0.png"];

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

  // Update current slide when carousel changes
  React.useEffect(() => {
    if (!secondApi) {
      return;
    }
    setSecondCurrent(secondApi.selectedScrollSnap());
    secondApi.on("select", () => {
      setSecondCurrent(secondApi.selectedScrollSnap());
    });
  }, [secondApi]);

  return (
    <ProjectLayout>
      <ProjectNavigation />

      <ProjectHero title={project.heroTitle} subtitle={project.heroSubtitle} year={project.heroYear} client="Personal Project" role="XR & Exhibition Designer" />

      {/* Main Content */}
      <section className="">
        {/* First Image */}
        <div className="max-w-[1540px] mx-auto px-[250px] z-10">
          <img src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" />
        </div>

        <ProjectContent>        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-40">
            <h2 className="text-2xl md:text-3xl mb-8 text-white font-light">
              Thermal Trace
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-light">Thermal Trace explores a new paradigm of fashion presentation by removing visual spectacle and foregrounding sensory engagement. Set in a secluded environment untouched by human intervention, this XR installation uses thermal detection to reveal camouflaged figures—merging body heat, environmental awareness, and spatial interaction. The project invites viewers to become active participants, shifting the role of the audience from passive observer to discoverer.</p>
            
            <ProjectMetadata projectType="Personal Project" projectCategory="XR Contents & Exhibition Design" teamType="Solo Project" duration="8 weeks" />
          </div>

          {/* Line */} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Approach Section with Interactive Image */}
          <div className="rounded-lg bg-transparent">
            {/* Interactive Image Slice */}
            <div className="w-full h-auto mb-40">
              <ImageSliceInteraction baseImage="/lovable-uploads/b4f192b1-54ab-437f-8dad-74993331f176.png" overlayImage="/lovable-uploads/585a63af-fb48-41d5-82bf-62bc652eff56.png" />
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-8">
                <h2 className="text-2xl font-light md:text-xl text-white whitespace-nowrap min-w-8">
                  →
                </h2>
                <p className="text-sm leading-relaxed text-gray-700 font-light md:text-sm">Hover over the image and move your mouse from left to right.</p>
              </div>
            </div>
            
            <div className=""> 
              <h2 className="text-2xl font-light text-gray-300 md:text-xl min-w-[200px] mb-8">Approach</h2>
              <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">The work reimagines the runway as a perceptual landscape rather than a stage. Models and viewers alike are disguised to dissolve the boundary between object and subject. Physical presence becomes the primary interface, with proximity and body temperature guiding interaction. Mixed reality overlays augment the scene, constructing a layered exhibition space that blends tangible matter with ephemeral perception. This approach fosters new ways of engaging with space, narrative, and the concept of visibility.</p>
            </div>
          </div>

          {/* Line */} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Process Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-2xl font-light mb-12 md:text-xl text-gray-300">Process</h2>
            <ProcessGrid steps={processSteps} />
          </div>

          {/* Preliminary Research */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent">
              <h2 className="text-2xl font-light mb-8 text-gray-300 md:text-xl">Preliminary Research</h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">Research into thermal detection technology and alternative fashion presentation methods revealed the potential for creating invisible interactions. Studies of camouflage techniques, thermal imaging capabilities, and XR spatial design informed the conceptual framework. The investigation explored how heat signatures could become a new language for fashion discovery, moving beyond traditional visual consumption to embodied sensing.</p>
            </div>
          </div>

          {/* Line */} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Idea Development */}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-40 mb-40">
              <h2 className="text-2xl font-light md:text-xl text-gray-300 whitespace-nowrap min-w-[200px] mb-40">
                Idea Development
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">This project reframes fashion not as something to be seen, but as something to be discovered through thermal detection. Rather than offering a passive visual display, it invites the audience to detect hidden figures through subtle thermal cues—heat traces, environmental temperature shifts, and proximity sensing. The XR installation creates a reward structure based on thermal awareness, shifting the focus from spectacle to sensing. Viewers become thermal explorers, engaging with camouflaged presence through detection rather than simply seeing.</p>
            </div>

            {/*Art Works*/}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
              <div className="rounded-lg bg-transparent">
                <h2 className="text-2xl font-light mb-40 text-gray-300 md:text-xl">Art Works</h2>
              </div>
            </div>

            {/* Poster Images */}
            <div className="w-full">
              <img src="/lovable-uploads/31568277-b7f9-4571-80b7-33c38ee874f8.png" className="w-full h-auto mb-40" />
            </div>

            <div className="w-full">
              <img className="w-full h-auto mb-40" src="/lovable-uploads/3acaab47-3d89-4589-92c7-2be3cf679ffa.png" />
            </div>

            <div className="w-full">
              <img className="w-full h-auto mb-40" src="/lovable-uploads/2d907dcd-422c-4ace-856b-a3b65d53ab17.png" />
            </div>

            {/* Line */} 
            <div className="w-full h-px my-40 bg-gray-500/50"></div>

            {/*Spatial Design*/}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
              <div className="rounded-lg bg-transparent">
                <h2 className="text-2xl font-light mb-40 text-gray-300 md:text-xl">Transformable stage</h2>
              </div>
            </div>           

            {/* TT Slider - keeping original images */}
            <div className="w-full mb-40">
              <Carousel className="w-full bg-black" setApi={setSecondApi} opts={{
              loop: true
            }}>
                <CarouselContent>
                  {secondSliderImages.map((image, index) => <CarouselItem key={index}>
                      <div className="relative w-full">
                        <AspectRatio ratio={16 / 9} className="w-full">
                          <img src={image} alt={`Slider image ${index + 1}`} className="w-full h-full object-cover" />
                        </AspectRatio>
                      </div>
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white hover:bg-white/10 w-12 h-12" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white hover:bg-white/10 w-12 h-12" />
              </Carousel>

              {/* Bar-shaped indicators below the slider */}
              <div className="flex justify-center space-x-2 mt-6">
                {secondSliderImages.map((_, index) => <div key={index} className={`w-6 h-0.5 cursor-pointer transition-all duration-300 ${secondCurrent === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`} onClick={() => secondApi?.scrollTo(index)} />)}
              </div>
            </div>  

            {/* Spatial Design */}
            <div className="rounded-lg bg-transparent">
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-40 mb-40">
                <h2 className="text-2xl font-light md:text-xl text-gray-300 whitespace-nowrap min-w-[200px] mb-40">
                  Spatial Design
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">Set across natural landscapes designed for camouflage—such as islands, forests, and coastal zones—the experience is structured as a responsive terrain. Each space reacts dynamically to the viewer's position and thermal presence, enabled by a real-time XR sensing system. The traditional runway dissolves into an interactive field that tests visibility, form, and presence. Modular environments are choreographed to evoke narrative tension and guide movement through atmospheric shifts. The space itself becomes the interface, framing the act of seeing as an embodied process.</p>
              </div>
            </div>

            <div className="w-full">
              <img className="w-full h-auto mb-40" src="/lovable-uploads/ee33591e-e9b0-4e8e-a3f0-181d426fdff8.png" />
            </div>

            {/* Line */} 
            <div className="w-full h-px my-40 bg-gray-500/50"></div>

            {/*Exhibition Design*/}

            {/* Exhibition Design Section with Interactive Image */}
            <div className="rounded-lg bg-transparent">
              {/* Interactive Image Slice2 */}
              <div className="w-full h-auto mb-40">
                <ImageSliceInteraction baseImage="/lovable-uploads/673d5687-9173-4d58-8caa-854189586015.png" overlayImage="/lovable-uploads/c5531ed2-75f4-45bd-bcb2-af267986f73a.png" />
                <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-8">
                  <h2 className="text-2xl font-light md:text-xl text-white whitespace-nowrap min-w-8">
                    →
                  </h2>
                  <p className="text-sm leading-relaxed text-gray-700 font-light md:text-sm">Hover over the image and move your mouse from left to right.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
                <div className="rounded-lg bg-transparent">
                  <h2 className="text-2xl font-light mb-40 text-gray-300 md:text-xl">Exhibition Design</h2>
                </div>
              </div>              
            </div>
          </div>
        </ProjectContent>
      
        {/* Navigation */}
        <div className="pb-60 flex items-center justify-center">
          <Link to="/project/project-4" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-lg font-medium">
            <span>Next project</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      {/* Enhanced iframe with better styling and visual elements - Updated with black background */}
        <div 
                ref={iframeAnimation.ref}
                className={`w-full my-10 transition-all duration-1000 delay-700 ${
                  iframeAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                  <div className="p-4 bg-opacity-60 flex justify-between items-center bg-black">
                    <h3 className="text-lg font-medium text-white flex items-center">
                      <span>Hidden Objects - Interactive Demo</span>
                    </h3>
                    <div className="text-gray-400 text-sm px-[240px]">Press 'X' Key to activate with Full-screen Mode</div>
                  </div>
                  <div className="w-full relative">
                    <AspectRatio ratio={16 / 9}>
                      <iframe src="https://lucent-banoffee-a50286.netlify.app" title="Hidden Objects WebGL Demo" className="w-full h-full border-0 bg-black" allowFullScreen />
                    </AspectRatio>
                  </div>
                </div>
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
    </ProjectLayout>
  );
};

export default ThermalTraceProjectDetail;
