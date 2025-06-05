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
             <h2 className="text-2xl font-light text-center md:text-sm text-gray-700">Click and drag to rotate. Scroll to zoom.</h2>
            
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <p className="text-gray-400 text-sm leading-relaxed">Environment Research</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Narrative Flow Mapping</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Precedent Study</p>
                </div>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Design Development</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">Thermal Detection</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Spatial Design</p>
                  <p className="text-gray-400 text-sm leading-relaxed">User Interaction</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Exhibition Layout</p>
                </div>
              </div>
             
              
              {/* Preliminary Research – Survey Data */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
                <div className="rounded-lg bg-transparent  mt-40">
                  <h2 data-lovable-editable="true" className="text-2xl font-light mb-8 text-gray-300 md:text-xl">Preliminary Research</h2>
                  <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">A preliminary survey involving 56 participants supported the project’s underlying premise. 78% responded positively to the idea that fashion shows should explore new formats beyond traditional spectacle. Notably, 40% of respondents (22 individuals) identified themselves as fashion designers or industry professionals, underscoring the field’s appetite for more experimental modes of presentation.

                </p>
                </div>
              </div>


              
            </div>
          </div>

          {/* Line */} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Technology Section */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-2xl md:text-xl font-light text-gray-300 mb-8 min-w-[200px]">
                Technology
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light mb-40">
                The installation utilized thermal imaging cameras and computer vision algorithms to detect human body heat signatures in real-time. Custom software processed thermal data to reveal hidden figures through spatial mapping, creating an invisible layer of interaction between viewers and the exhibition space. The system responded to proximity and movement, generating dynamic visual feedback that transformed the traditional fashion runway into an immersive sensory experience.
              </p>
            </div>
          </div>

          {/* Line */} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Impact Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-2xl font-light md:text-xl text-gray-300 mb-8">
              Impact & Reception
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light mb-40">
              The project successfully challenged conventional exhibition formats, demonstrating how technology could enhance rather than overshadow human connection. Visitors reported a heightened sense of awareness and engagement, with many noting how the thermal interaction created moments of unexpected discovery. The work opened new possibilities for integrating invisible technologies into spatial design, influencing subsequent projects in interactive exhibition design.
            </p>
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