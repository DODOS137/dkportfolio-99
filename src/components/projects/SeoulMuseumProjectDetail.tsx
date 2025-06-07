
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import YouTube from 'react-youtube';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import ModelViewer from '@/components/ModelViewer';
import { seoulMuseumProjectData } from '@/data/seoulMuseumProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import ProjectHero from './shared/ProjectHero';
import ProjectMetadata from './shared/ProjectMetadata';
import ProcessGrid from './shared/ProcessGrid';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SeoulMuseumProjectDetail = () => {
  const project = seoulMuseumProjectData;
  const processSteps = [{
    title: "Brand Analysis",
    items: ["Heritage Study & Identity Research"]
  }, {
    title: "Spatial Design",
    items: ["Wayfinding System", "Visitor Experience"]
  }, {
    title: "Implementation",
    items: ["Brand Integration", "Modern Design Principles"]
  }];
  const heroRef = useScrollAnimation();
  
  return (
    <ProjectLayout>
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
            {project.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            {project.heroSubtitle}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
            <span>2021</span>
            <span>•</span>
            <span>Bachelor's Graduation Project</span>
            <span>•</span>
            <span>Spatial Designer</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="">
        {/* First Image - Updated */}
        <div className="max-w-[1540px] mx-auto px-[250px] z-10">
          <img src="/lovable-uploads/c3196d4f-97a0-4a02-892e-907f32615c54.png" alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" />
        </div>

        {/* Shared Container */}
        <div className="max-w-[1540px] mx-auto px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-40">
            <h2 className="text-2xl md:text-3xl mb-8 text-white font-light">
              Seoul Natural History Museum
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-light">
            This project proposes a conceptual and spatial renewal of the Seodaemun Museum of Natural History, Korea's first public natural history museum. The redesign envisions a new identity—Seoul Natural History Museum—grounded in Korea's cultural relationship with nature, particularly from the perspective of traditional hunters. The project spans spatial reconfiguration, exhibition curation, branding, and product design.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">project type</h3>
                <p className="text-white">Bachelor's Graduation Project</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">Project category</h3>
                <p className="text-white">Spatial Design</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">team</h3>
                <p className="text-white">Solo Project</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">DURATION</h3>
                <p className="text-white">16 weeks</p>
              </div>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* YouTube Video Section */}
          <div className="rounded-lg bg-transparent mb-40">
            <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-transparent">
              <AspectRatio ratio={16 / 9} className="w-full">
                <YouTube videoId="8GEK3igRom0" opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 0,
                  controls: 1,
                  rel: 0,
                  showinfo: 0,
                  modestbranding: 1,
                  fs: 1,
                  cc_load_policy: 0,
                  iv_load_policy: 3,
                  autohide: 1,
                  disablekb: 0,
                  enablejsapi: 1,
                  origin: window.location.origin,
                  branding: 0,
                  color: 'white',
                  theme: 'dark'
                }
              }} className="w-full h-full" iframeClassName="w-full h-full border-0" />
              </AspectRatio>
            </div>
          </div>

          {/* Approach Section */}
          <div className="rounded-lg bg-transparent">
            <div className="mb-8"> 
              <h2 className="text-2xl font-light text-gray-300 md:text-xl min-w-[200px] mb-8">Approach</h2>
              <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
                Redefined the museum's identity by repositioning it through the lens of traditional Korean hunters. This narrative perspective shaped the exhibition tone, user experience, and spatial arrangement, bridging heritage interpretation with modern interaction design.
              </p>
            </div>
       
            {/*Development Strategy*/}
            <div className=""> 
              <h2 className="text-2xl font-light text-gray-300 md:text-xl min-w-[200px] mb-8">Development Strategy</h2>
              <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
                Moved away from passive, linear layouts towards participatory and immersive experiences. Reinterpreted outdated specimen-dense layouts with layered environmental cues, emphasising active visitor engagement. Reception, gift shop, and circulation were integrated with symbolic and narrative depth to enhance institutional coherence.
              </p>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Process Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-2xl font-light mb-12 md:text-xl text-gray-300">Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Site Selection</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">Brainstorming</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Concept Sketching</p>
                </div>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Analysis</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">On-site Survey & Research</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Context & Problem Analysis</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Precedent Study </p>
                </div>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Design Development</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">Brand Identity Redefinition</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Floor Plan Analysis & Design</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Spatial Design</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Product Design</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Exhibition Design</p>
                </div>
              </div>
            </div>
          </div>

          {/*Preliminary Research*/}
          <div className=""> 
            <h2 className="text-2xl font-light text-gray-300 md:text-xl min-w-[200px] mb-8">Preliminary Research</h2>
            <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
              A survey was conducted with 213 individuals who had previously visited the Seodaemun Museum of Natural History, either on-site or online. Among them, 32 participants had also experienced renowned natural history museums abroad. While the museum's collection of specimens was largely appreciated, 84% of respondents (179 people) highlighted the need for spatial and interior renewal.
              Critical feedback pointed to the building's outdated grey façade and lack of distinctive identity, often being compared to a generic municipal office rather than a museum. The results revealed a strong demand for architectural redefinition and experiential enhancement that aligns with contemporary expectations for cultural institutions.
            </p>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Site Selection Section */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-2xl md:text-xl font-light text-gray-300 mb-8 min-w-[200px]">
                Site Selection
              </h2>
            </div>
          </div>
          
          {/*Site Image*/}     
          <div className="w-full">
            <img src="/lovable-uploads/9c695e2f-9c58-47bf-970e-25734dd7ee11.png" className="w-full h-full mb-40" />
          </div>   

          {/*Site Image*/}     
          <div className="w-full">
            <img className="w-full h-full" src="/lovable-uploads/bf121cc4-1175-4554-aa01-dc803a73df3f.png" />
          </div>     

          {/* Context & Problem Analysis Section */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent mt-40 flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-2xl mb-8 md:text-xl font-light text-gray-300 min-w-[200px]">Context &amp; Problem Analysis</h2>
              <div>
                <h3 className="text-2xl font-light text-gray-300 md:text-xl min-w-[200px] mb-8">Overcrowded Specimen Displays</h3>
                <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
                  The museum's current taxonomic approach results in densely packed displays where the environmental context of each specimen is largely absent. This obstructs visitor perception and diminishes interpretive clarity. For example, African wildlife is presented in rigid photographic tableaux that feel disconnected from Korea's cultural and ecological context.
                </p>
              </div>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Character Design Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-2xl mb-8 font-light md:text-xl text-gray-300">Character Design</h2>
            
            <div className="w-full mb-32">
              <img alt="RX-056 Character Design" src="/lovable-uploads/b4ec2d65-81f7-4f6d-99be-3fcfc1b790ed.png" className="w-full h-auto mt-40" />
            </div>
      
            {/* Brand Identity Redefinition */}
            <div className="w-full mb-32">
              <img alt="RX-056 Character Design" src="/lovable-uploads/acc09a93-1341-41eb-b938-8bad8f514163.png" className="w-full h-auto mt-16 " />
              <img alt="RX-056 Character Design" src="/lovable-uploads/7a7449ff-c56f-4964-acd1-fcfdeae91b9c.png" className="w-full h-auto mt-40" />
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Scriptwriting & Storyboard Section */}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">  
              <h2 className="text-2xl font-light mb-8 md:text-xl text-gray-300 min-w-[200px]">Scriptwriting & Storyboard</h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-400 mb-40 font-light">
                Using VR drawing tools, 3D storyboards simulated first-person navigation and spatial flow, allowing refinement of emotional pacing and level logic early in development.
              </p>
            </div>

            <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-transparent">
              <AspectRatio ratio={16 / 9} className="w-full">
                <YouTube videoId="aCJblmM9yzs" opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 0,
                  controls: 1,
                  rel: 0,
                  showinfo: 0,
                  modestbranding: 1,
                  fs: 1,
                  cc_load_policy: 0,
                  iv_load_policy: 3,
                  autohide: 1,
                  disablekb: 0,
                  enablejsapi: 1,
                  origin: window.location.origin,
                  branding: 0,
                  color: 'white',
                  theme: 'dark'
                }
              }} className="w-full h-full" iframeClassName="w-full h-full border-0" />
              </AspectRatio>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Level Design Section */}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">  
              <h2 className="text-2xl font-light md:text-xl text-gray-300 mb-40">Level Design</h2>
            </div>

            <img className="w-full h-auto mb-40" src="/lovable-uploads/65cd8d34-72ad-46a9-b6a8-b54c3e74873a.png" />
          
            <div className="w-full ">
              <img alt="Planet A233 - VR Environment" className="w-full h-auto" src="/lovable-uploads/48a61eae-cd06-4f3a-b893-7a18d76443c9.png" />
              <img alt="Planet A233 - VR Environment" src="/lovable-uploads/98c6f72e-e8ff-4a84-9966-5dba0fb2e7df.png" className="w-full h-auto mb-40" />
              <img alt="Planet A233 - VR Environment" className="w-full h-auto" src="/lovable-uploads/82ed2977-afd6-4043-881b-b523083b8a93.png" />
              <img alt="Planet A233 - VR Environment" className="w-full h-auto mb-40" src="/lovable-uploads/eb13ecfc-480b-4823-bb52-d408778963e9.png" />
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>
      
          {/* Spatial Design Section */}
          <div className="rounded-lg bg-transparent">
            <div className="w-full">
              <img src="/lovable-uploads/69b4a2d4-fee6-44be-8e8a-60f3807f0117.png" className="w-full h-auto mb-40" />
            </div> 
            
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-40">
              <h2 className="text-2xl font-light md:text-xl text-gray-300 whitespace-nowrap min-w-[200px]">
                Spatial Design
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">Sunlight, shadow, and relic placement guide attention. The library is layered with visual contrasts: clinical architecture vs organic deterioration; digital interfaces vs paper records. These dichotomies build an interpretive landscape, where meaning is sensed more than spoken.</p>
            </div>
            
            <div className="w-full">
              <img className="w-full h-auto" src="/lovable-uploads/751b69f0-75d5-4aca-82d4-73ff52116e9d.png" />
            </div> 
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Post-Project Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-2xl font-light md:text-xl text-gray-300 mb-8">
              Post-Project Expansion
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light mb-60">All core systems have been implemented, with cutscene animations currently in development to enhance narrative pacing and emotional peaks. Once completed, the project will be released as a fully playable experience, with the aim of gathering user feedback to inform future iterations and refinement.
            </p>
          </div>
        </div>
      
        {/*Void*/}
        <div className="pb-60 flex items-center justify-center">
          <Link to="/project/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-lg font-medium">
            <span>Next project</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Remaining Images */}
        {project.images.slice(1).map((image, index) => (
          <div key={index + 1} className="mb-20">
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <ImageWithLoading src={image} alt={`${project.title} - Image ${index + 2}`} className="w-full h-full object-cover" />
              </AspectRatio>
            </div>
          </div>
        ))}
      </section>
    </ProjectLayout>
  );
};

export default SeoulMuseumProjectDetail;
