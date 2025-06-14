import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import YouTube from 'react-youtube';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { whispersProjectData } from '@/data/whispersProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import BackToTopButton from '@/components/BackToTopButton';
import { ScrollArea } from "@/components/ui/scroll-area"; // ✅ 추가

const WhispersProjectDetail = () => {
  const project = whispersProjectData;
  const heroRef = useScrollAnimation();
  const videoOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0
    }
  };
  return (
    <ScrollArea className="h-screen w-screen overflow-auto"> {/* ✅ 추가 */}
    <ProjectLayout>
      {/* Fixed Navigation */}
      <ProjectNavigation backText="Back to work" />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={heroRef.ref} className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider">
            {project.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            An Immersive Exhibition Platform Led by Sound
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
        <div className="max-w-[1540px] mx-auto z-10">
          <img alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" src="/lovable-uploads/801c52bc-cbaa-4c2f-a6ec-6d86c1a70034.png" />
        </div>

        {/* Shared Container */}
        <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-20 md:mt-40">
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-light">
              {project.title}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
              An immersive sound based exhibition that amplifies the unheard voices of endangered marine life. By spotlighting the often-overlooked species dwelling beneath rocks or on the ocean floor, the project reframes ocean conservation narratives and invites audiences to engage through sensory storytelling.
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

         {/* Client Section */}
          <div className="rounded-lg bg-transparent">
            <div className="mb-8 mt-20 md:mt-40"> 
              <h2 className="text-xl md:text-2xl font-light text-gray-300 min-w-[200px] mb-6 md:mb-8">Client</h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-300">
                UNESCO IOC (Intergovernmental Oceanographic Commission), in collaboration with The Ocean Agency and Woods Hole Oceanographic Institution
              </p>
            </div>
          </div>
        
          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* YouTube Video Section */}
          <div className="my-20 md:my-40">
            <AspectRatio ratio={16 / 9}>
              <YouTube videoId="zqz3Owz0K3o" opts={videoOpts} className="w-full h-full" />
            </AspectRatio>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>
            
          {/* Approach Section */}
          <div className="rounded-lg bg-transparent">
            <div className="mb-8"> 
              <h2 className="text-xl md:text-2xl font-light text-gray-300 min-w-[200px] mb-6 md:mb-8">Approach</h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
                Instead of relying on traditional data visualisation or scientific display, the project uses immersive design as an emotional trigger. It explores new ways to communicate marine biodiversity loss, shifting the focus toward sound as a storytelling medium. Visitors are encouraged to pause, listen, and emotionally reconnect with the life forms that often go unnoticed.
              </p>
            </div>
            
            {/*Project Purpose*/}
            <div className=""> 
              <h2 className="text-xl md:text-2xl font-light text-gray-300 min-w-[200px] mb-6 md:mb-8">Project Purpose</h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
                In alignment with the UN Ocean Decade (2021–2030), the project addresses the global communication gap in ocean awareness. Despite its planetary significance, the ocean remains underrepresented in education and policy. This exhibition reframes that disconnect through interactive design, making invisible marine life more visible—emotionally, sonically, and spatially.
              </p>
            </div>

            {/*Development Strategy*/}
            <div className="mt-8"> 
              <h2 className="text-xl md:text-2xl font-light text-gray-300 min-w-[200px] mb-6 md:mb-8">Development Strategy</h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
                Design research focused on species that inhabit hidden marine zones, particularly sub-rock environments. Rather than prioritising well-known marine mammals, the project shifts attention to invertebrates and bottom-dwellers whose acoustic signals are biologically rich but rarely studied. A hybrid strategy of immersive audio, AR interaction, and tactile exhibition components forms the foundation of the storytelling.
              </p>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Process Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-xl md:text-2xl font-light mb-8 md:mb-12 text-gray-300">Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-20 md:mb-40">
              <div className="aspect-square bg-black rounded-lg p-4 md:p-8 flex flex-col text-center border border-white">
                <h3 className="text-lg md:text-xl font-light text-white mb-2 md:mb-4"> Ideation Phase</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Brainstorming</p>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Concept Sketching</p>
                </div>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-4 md:p-8 flex flex-col text-center border border-white">
                <h3 className="text-lg md:text-xl font-light text-white mb-2 md:mb-4">Analysis</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Precedent Study </p>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Contemporary Ocean Issues & Marine Species Research</p>
                </div>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-4 md:p-8 flex flex-col text-center border border-white">
                <h3 className="text-lg md:text-xl font-light text-white mb-2 md:mb-4">Design Development</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Idea Development</p>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Product Design</p>
                   <p className="text-gray-400 text-xs md:text-sm leading-relaxed">AR Appication Development</p>
                   <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Spatial Design</p>
                   <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Exhibtion Design</p>
                </div>
              </div>
            </div>
          </div>


          {/*Preliminary Research*/}
          <div className=""> 
            <h2 className="text-xl md:text-2xl font-light text-gray-300 min-w-[200px] mb-6 md:mb-8">Preliminary Research</h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
              To better understand public perception of marine biodiversity, a preliminary survey was conducted with 108 participants. The findings revealed that 91% (98) had only experienced exhibitions that rely predominantly on visual stimuli—similar to conventional museum or gallery formats. When asked about the types of marine species they were most familiar with, 87% (94) mentioned iconic endangered mammals such as whales and dolphins, indicating that public awareness remains concentrated on a narrow range of charismatic megafauna. These results informed the direction of this project, which seeks to expand public understanding by highlighting lesser-known species through sound, rather than sight. 
            </p>
          </div>



          
          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Idea Development Section */}
 
            {/*Development Image1*/}     
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/a0b20d87-ef7c-4183-9209-6abb798b0f65.png" />
          </div>           
          
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Idea Development
              </h2>
              <p className="text-base md:text-lg lg:text-xl font-light text-gray-400">Sound is treated not just as data but as a narrative layer. Scientific studies revealing the bioacoustics of marine invertebrates were used to frame the emotional tone of the exhibition. The project highlights how sonic signals from these animals reveal behavioural patterns and ecosystem health. These acoustic ecologies become a channel to foster empathy and reframe conservation dialogue. While marine mammals like whales and dolphins receive outsized attention due to their intelligence and emotional expressiveness, lesser-known species—particularly invertebrates and bottom-dwellers—remain largely excluded from both public empathy and conservation priorities. This project aims to redress that imbalance by amplifying the voices of species that are hidden, both physically and culturally, from mainstream awareness.</p>
            </div>
          </div>
          
         {/*Development Image2*/}        
          <div className="w-full">
            <img className="w-full h-full" src="/lovable-uploads/d53ecd82-9cb2-41d8-b1bf-ea5c51b298d8.png" />
          </div>  
          {/*Development Image3*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/e1c62251-ce6b-45fe-87a1-7a85b8ee604f.png" />
          </div>   

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/*Product Design Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/web1920-whispers from the bottomfinal_대지 24.png" />
          </div>   

         <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Product Design
              </h2>
              <p className="text-base md:text-lg lg:text-xl font-light text-gray-400">Custom-designed headset stands emulate smoothed underwater rocks, integrating both audio hardware and tactile visuality. Each plinth invites solitary listening through high-resolution recordings of marine species. The subtlety of these soundscapes becomes a form of protest against the visual-centric bias of most exhibitions.
              </p>
              </div>
          </div>

          {/*Product Design Image2*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/web1920-whispers from the bottom_대지 12 사본.png" />
          </div>   

           {/*Product Design Image3*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/web1920-whispers from the bottom_대지 10.png" />
          </div>  

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

           {/*Spatial Design*/} 
        
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Spatial Design
              </h2>
              <p className="text-base md:text-lg lg:text-xl font-light text-gray-400">Exhibition modules are mobile and adaptable, enabling flexible installation across diverse locations. Ceiling-mounted wave-shaped metal fixtures and textured lighting elements simulate underwater ambience, enriching the overall spatial immersion.
              </p>
              </div>
          </div>

          {/*Spatial Design Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/web1920-whispers from the bottom_대지 12.png" />
          </div>   

           {/*Exhibition Design*/} 
        
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 ">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Exhibition Design
              </h2>
              <p className="text-base md:text-lg lg:text-xl font-light text-gray-400">The experience combines analog tactility with digital immersion. Visitors use AR-enabled displays to scan QR codes, triggering animated 3D models of species in motion. This integration of touch, sound, and vision deepens the emotional engagement, transforming passive observation into active reflection.
              </p>
              </div>
          </div>

          {/* Second YouTube Video Section */}
          <div className="my-20 md:my-40">
            <AspectRatio ratio={16 / 9}>
              <YouTube videoId="M0v75vAVitA" opts={videoOpts} className="w-full h-full" />
            </AspectRatio>
          </div>

          {/*Exhibition Design Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/bb4ee54e-1596-4bbf-aa4d-2fde56ed92dd.png" />
          </div> 
          
           {/*Exhibition Design Image2*/}       
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/18099fde-1b4b-4c1b-b9a3-776444f17c15.png" />
          </div>    

           {/*Exhibition Design Image3*/}       
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/f0ebae04-0162-4e48-8470-2fc716cc1f31.png" />
          </div>   

           {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>  

         {/*End Image*/}       
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/a522c24b-08cb-42ad-85ad-aacfd97ff5bc.png" />
          </div>            
          
          {/* Final Outcome */}
          <div className="rounded-lg bg-transparent">
            <div className="mb-40 md:mb-60"> 
              <h2 className="text-xl md:text-2xl font-light text-gray-300 min-w-[200px] mb-6 md:mb-8">Final Outcome</h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
                The project offers a contemplative space that fosters emotional storytelling. It challenges hierarchical species empathy and contributes to broader discourse on inclusive marine conservation, while also providing an efficient and scalable platform for delivering immersive exhibitions in diverse environments.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/*Navigation Section*/}
      <div className="pb-40 md:pb-60 flex items-center justify-center">
        <Link to="/project/project-5" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
          <span>Next project</span>
          <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
        </Link>
      </div>
      
      <BackToTopButton />
    </ProjectLayout>
    </ScrollArea>
  );
};
export default WhispersProjectDetail;
