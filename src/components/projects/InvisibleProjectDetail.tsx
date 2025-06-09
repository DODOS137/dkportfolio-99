
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { invisibleProjectData } from '@/data/invisibleProject';
import YouTube from 'react-youtube';
import BackToTopButton from '@/components/BackToTopButton';
import ProjectNavigation from './shared/ProjectNavigation';
import PageLoader from '@/components/PageLoader';
import { usePageLoading } from '@/hooks/usePageLoading';

const InvisibleProjectDetail = () => {
  const { isLoading } = usePageLoading();
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const project = invisibleProjectData;

  if (isLoading) {
    return <PageLoader isVisible={isLoading} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <ProjectNavigation backText="Back to work" />

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
            <span>{project.heroYear}</span>
            <span>•</span>
            <span>{project.heroClient}</span>
            <span>•</span>
            <span>{project.heroRole}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="">
        {/* First Image */}
        <div className="w-full">
          <img src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" />
        </div>

        {/* Shared Container */}
        <div className="max-w-[1540px] mx-auto px-4 md:px-8 lg:px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-20 md:mt-40">
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-light">
              {project.title}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
              {project.mainDescription}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-sm">
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">project type</h3>
                <p className="text-white">{project.projectType}</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">Project category</h3>
                <p className="text-white">{project.projectCategory}</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">team</h3>
                <p className="text-white">{project.teamType}</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">DURATION</h3>
                <p className="text-white">{project.duration}</p>
              </div>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Approach Section */}
          <div className="rounded-lg bg-transparent">
            <div className="mb-8"> 
              <h2 className="text-xl md:text-2xl font-light text-gray-300 min-w-[200px] mb-6 md:mb-8">Approach</h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
                The project investigates how spatial and structural invisibility can be designed as an integral part of the museum experience. Rather than treating exhibits as standalone objects, it reimagines the entire building as a site where visibility and concealment coexist. This approach questions what it means to "see" a museum and challenges the assumption that all cultural experiences must be visual.
              </p>
            </div>

            {/*Line*/} 
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

            {/* Process Section */}
            <div className="rounded-lg bg-transparent">
              <h2 className="text-xl md:text-2xl font-light mb-8 md:mb-12 text-gray-300">Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-20 md:mb-40">
                <div className="aspect-square bg-black rounded-lg p-4 md:p-8 flex flex-col text-center border border-white">
                  <h3 className="text-lg md:text-xl font-light text-white mb-2 md:mb-4">Site & Context Research</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Site Analysis</p>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Historical Research</p>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Conceptual Framework Development</p>
                  </div>
                </div>
                
                <div className="aspect-square bg-black rounded-lg p-4 md:p-8 flex flex-col text-center border border-white">
                  <h3 className="text-lg md:text-xl font-light text-white mb-2 md:mb-4">Spatial Strategy</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Programmatic Planning</p>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Circulation Design</p>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Exhibition Layout</p>
                  </div>
                </div>
                
                <div className="aspect-square bg-black rounded-lg p-4 md:p-8 flex flex-col text-center border border-white">
                  <h3 className="text-lg md:text-xl font-light text-white mb-2 md:mb-4">Material Studies</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Transparency Research</p>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Structural Integration</p>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Environmental Performance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* YouTube Video Section */}
            <div className="mb-20 md:mb-40">
              <AspectRatio ratio={16 / 9}>
                <YouTube
                  videoId="HIbnI8AjTW0"
                  opts={{
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
                  }}
                  className="w-full h-full"
                  iframeClassName="w-full h-full border-0"
                />
              </AspectRatio>
            </div>

            {/* Site & Context Section */}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
              <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40">
                <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                  Site & Context
                </h2>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">
                  Located at the former East-West Berlin border, this site carries layers of historical invisibility and division. The museum concept transforms this charged context into a framework for understanding how physical and political barriers shape collective memory. The architecture becomes a medium for exploring the tension between what is revealed and what remains hidden.
                </p>
              </div>
            </div>
            
            {/*site Image*/} 
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <img className="w-full h-full" src="/lovable-uploads/72418785-a3a0-49a4-a660-7ab2507d9d4e.png" />
              </AspectRatio>
            </div>            
            
            {/*Line*/} 
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

            {/* Design Features */}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-20 md:mt-40 rounded-lg bg-transparent">
              <h2 className="text-xl md:text-2xl mb-6 md:mb-8 font-light text-gray-300 min-w-[200px]">
                Design Features
              </h2>
              <div className="flex flex-col space-y-6 md:space-y-8">
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-light mb-3 md:mb-4 min-w-[200px] text-gray-300">
                    Structural Transparency
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">The building envelope employs selective transparency, where glass panels can shift between opaque and clear states, allowing visitors to glimpse interior spaces while maintaining curatorial control over visual access.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-light mb-3 md:mb-4 min-w-[200px] text-gray-300">
                    Underground Circulation
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">Primary circulation moves below grade, connecting exhibition spaces through a network that references historical tunnels while creating moments of emergence into daylight.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-light mb-3 md:mb-4 min-w-[200px] text-gray-300">
                    Adaptive Galleries
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">Exhibition spaces can be reconfigured to hide or reveal artifacts through moveable walls and floor systems, making the act of discovery central to the visitor experience.
                  </p>
                </div>
              </div>
            </div>            
            
            {/*Design Image*/} 
            <div className="w-full">
              <img className="w-full h-auto mt-20 md:mt-40" src="/lovable-uploads/cbfb3e9b-06d3-4b40-afaa-1a83c1cd9eac.png" />
           </div>  

            {/*Design Image 2*/} 
            <div className="w-full mb-20 md:mb-40">
              <img className="w-full h-auto" src="/lovable-uploads/1f4a9e12-61ea-471e-9f9e-eb1d89cfb4e2.png" />
           </div> 

           {/*Line*/} 
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>
            
            {/* Material Studies */}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
              <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40">
                <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                  Material Studies
                </h2>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">
                  The material palette emphasizes gradations of opacity and reflection. Electrochromic glass, perforated metal panels, and translucent concrete create layers of visual filtering that change throughout the day. These materials become active participants in the museum's narrative, shifting between states of visibility and concealment.
                </p>
              </div>
            </div>
            
            {/*Material Image*/} 
            <div className="w-full">
              <img className="w-full h-auto" src="/lovable-uploads/a9f90b7f-ba67-48b4-8091-b5356856ec97.png" />
           </div>            
            
            {/*Material Image 2*/} 
            <div className="w-full mb-20 md:mb-40">
              <img className="w-full h-auto" src="/lovable-uploads/6e64316a-8fab-478d-8b4f-656581a9118d.png" />
           </div>  

           {/*Line*/} 
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>
            
            {/* Final Outcome */}
            <div className="rounded-lg bg-transparent">
              <div className="mb-20 md:mb-40"> 
                <h2 className="text-xl md:text-2xl font-light text-gray-300 min-w-[200px] mb-6 md:mb-8">Final Outcome</h2>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
                  The Invisible Space Museum represents a new typology for cultural institutions—one that prioritizes process over product and questions over answers. By designing invisibility as an architectural strategy, the project creates space for reflection on the politics of visibility and the role of memory in contemporary culture. The museum becomes a place where what cannot be seen is just as important as what is revealed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/*Navigation Section*/}
      <div className="pb-40 md:pb-60 flex items-center justify-center">
        <Link to="/project/learn" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
          <span>Next project</span>
          <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
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
      
      <BackToTopButton />
    </div>
  );
};

export default InvisibleProjectDetail;
