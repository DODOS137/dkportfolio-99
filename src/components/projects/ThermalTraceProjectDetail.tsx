import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import ImageSliceInteraction from '@/components/ImageSliceInteraction';
import { thermalTraceProjectData } from '@/data/thermalTraceProject';
const ThermalTraceProjectDetail = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const project = thermalTraceProjectData;
  return <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
        <Link to="/work" className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to work
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={heroRef.ref} className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider">
            Thermal Trace
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            XR & Exhibition Design
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
            <span>2023</span>
            <span>•</span>
            <span>Personal Project</span>
            <span>•</span>
            <span>Mixed Reality & Exhibition Designer</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="">
        {/* First Image */}
        <div className="max-w-[1540px] mx-auto px-[250px] z-10">
          <img src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" />
        </div>

        {/* Shared Container */}
        <div className="max-w-[1540px] mx-auto px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-40">
            <h2 className="text-2xl md:text-3xl mb-8 text-white font-light">
              Thermal Trace
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-light">Thermal Trace explores a new paradigm of fashion presentation by removing visual spectacle and foregrounding sensory engagement. Set in a secluded environment untouched by human intervention, this XR installation uses thermal detection to reveal camouflaged figures—merging body heat, environmental awareness, and spatial interaction. The project invites viewers to become active participants, shifting the role of the audience from passive observer to discoverer.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">project type</h3>
                <p className="text-white">Personal Project</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">Project category</h3>
                <p className="text-white">XR Contents & Exhibition Design</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">team</h3>
                <p className="text-white">Solo Project</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">DURATION</h3>
                <p className="text-white">8 weeks</p>
              </div>
            </div>
          </div>

          {/* Line */} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Approach Section with Interactive Image */}
          <div className="rounded-lg bg-transparent">
            {/* Interactive Image Slice */}
            <div className="w-full h-auto mb-40">
              <ImageSliceInteraction baseImage="/lovable-uploads/b4f192b1-54ab-437f-8dad-74993331f176.png" overlayImage="/lovable-uploads/585a63af-fb48-41d5-82bf-62bc652eff56.png" />
              <h2 className="text-2xl font-light text-center md:text-sm text-gray-700 mt-8">Hover over the image and move your mouse from left to right.</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Ideation Phase</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">Brainstorming</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Concept Sketching</p>
                </div>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Analysis</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">Stage Environment Research</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Precedent Study</p>
                </div>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Design Development</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">Idea Development</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Spatial Design</p>
                  <p className="text-gray-400 text-sm leading-relaxed">User Interaction</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Exhibition Design</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preliminary Research */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent">
              <h2 className="text-2xl font-light mb-8 text-gray-300 md:text-xl">Preliminary Research</h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">A preliminary survey conducted with 56 participants supported the conceptual direction of this project. 78% responded positively to questions suggesting that fashion shows should move beyond conventional viewing formats and explore new experiential approaches. Notably, 40% of respondents (22 individuals) identified as either fashion designers or professionals in the fashion industry—reinforcing the relevance of this investigation within the design field.</p>
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
              <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">This project reframes fashion not as something to be seen, but as something to be discovered. Rather than offering a passive visual display, it invites the audience to detect hidden figures through subtle cues—heat traces, minor movement, and spatial proximity. This process establishes a reward structure based on attention, shifting the focus from spectacle to perception. Viewers are no longer spectators, but agents of discovery, engaging with presence through sensing rather than simply seeing.</p>
            </div>


            {/*Art Works*/}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent">
              <h2 className="text-2xl font-light mb-8 text-gray-300 md:text-xl">Art Works</h2>
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
              <h2 className="text-2xl font-light mb-40 text-gray-300 md:text-xl">Spatial Design</h2>
            </div>
            </div>            

            
            
          </div>
        </div>
      
        {/* Navigation */}
        <div className="pb-60 flex items-center justify-center">
          <Link to="/project/project-4" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-lg font-medium">
            <span>Next project</span>
            <ArrowRight className="w-5 h-5" />
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
    </div>;
};
export default ThermalTraceProjectDetail;