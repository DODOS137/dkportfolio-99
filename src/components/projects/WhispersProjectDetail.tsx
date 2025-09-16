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
          <div className="rounded-lg bg-transparent mt-20 md:mt-20">
            <h2 className="text-xl md:text-xl lg:text-xl mb-8 md:mb-8 text-white font-light">
              {project.title}
            </h2>
            <p className="text-base md:text-base lg:text-base text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
             Immersive sound-led exhibition amplifying overlooked marine life. Reframes ocean conservation through emotional and sensory storytelling.
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
            <div className="mb-8 mt-20 md:mt-20"> 
              <h2 className="text-xl md:text-xl font-light text-white min-w-[200px] mb-6 md:mb-8">Client</h2>
              <p className="text-base md:text-base lg:text-base leading-relaxed font-light text-gray-300">
                UNESCO IOC (Intergovernmental Oceanographic Commission), in collaboration with The Ocean Agency and Woods Hole Oceanographic Institution
              </p>
            </div>
          </div>
        

          {/* YouTube Video Section */}
          <div className="my-40 md:my-40">
            <AspectRatio ratio={16 / 9} className="rounded-lg border border-gray-500/50 overflow-hidden">
              <YouTube videoId="zqz3Owz0K3o" opts={videoOpts} className="w-full h-full" />
            </AspectRatio>
          </div>          
          
          
          
          
          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>




         


    
     {/* Challenge Summary */}

    <section aria-labelledby="car-title" className="mt-8">
    <h2 id="car-title" className="text-xl md:text-xl font-light text-gray-300 mb-8">Summary</h2>

    <div className="grid md:grid-cols-3 gap-4">
   
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Challenge</h3>
      <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
        <li>Gaps in public understanding of ocean ecosystems</li>
        <li>Overemphasis on iconic large marine species</li>
        <li>Overlooked bottom-dwelling and invertebrate life</li>
        <li>Reliance on visual-only formats</li>
      </ul>
    </div>

    {/* Approach */}
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Approach</h3>
      <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
        <li>Sound-driven storytelling</li>
        <li>Immersive design for emotional impact</li>
        <li>Hybrid: AR triggers + tactile modules</li>
        <li>Focus on sub-rock invertebrates</li>
      </ul>
    </div>

    {/* Result */}
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Result</h3>
      <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
        <li>Pause · listen · empathize</li>
        <li>Invisible made visible (emotional · sonic · spatial)</li>
        <li>Scalable, mobile exhibition system</li>
      </ul>
    </div>
  </div>
</section>

      
          
   {/* Challenge full text*/}    
          <details className="mt-8 mb-20 rounded-lg border border-white/10 bg-black">
         <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
         Full text
  </summary>
  <div className="px-4 pb-4 pt-6 space-y-8">
    <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Approach</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        Instead of relying on traditional data visualisation or scientific display, the project uses immersive design as an emotional trigger. It explores new ways to communicate marine biodiversity loss, shifting the focus toward sound as a storytelling medium. Visitors are encouraged to pause, listen, and emotionally reconnect with the life forms that often go unnoticed.
      </p>
    </div>

    <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Project Purpose</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        In alignment with the UN Ocean Decade (2021–2030), the project addresses the global communication gap in ocean awareness. Despite its planetary significance, the ocean remains underrepresented in education and policy. This exhibition reframes that disconnect through interactive design, making invisible marine life more visible—emotionally, sonically, and spatially.
      </p>
    </div>

    <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Development Strategy</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        Design research focused on species that inhabit hidden marine zones, particularly sub-rock environments. Rather than prioritising well-known marine mammals, the project shifts attention to invertebrates and bottom-dwellers whose acoustic signals are biologically rich but rarely studied. A hybrid strategy of immersive audio, AR interaction, and tactile exhibition components forms the foundation of the storytelling.
      </p>
    </div>

     <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Final Outcome</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        The project offers a contemplative space that fosters emotional storytelling. It challenges hierarchical species empathy and contributes to broader discourse on inclusive marine conservation, while also providing an efficient and scalable platform for delivering immersive exhibitions in diverse environments.</p>
    </div>
  </div>
</details>



         {/*Research*/}

         <section id="research" aria-labelledby="research-title" className="mb-20">
    <h2 id="research-title" className="text-xl md:text-xl font-light text-gray-300 mb-6">Research</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">91%</p>
      <p className="text-sm text-gray-400 mt-2">only visual-centric exhibitions experienced</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">87%</p>
      <p className="text-sm text-gray-400 mt-2">most familiar with whales/dolphins</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">108</p>
      <p className="text-sm text-gray-400 mt-2">participants surveyed</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
      <p className="text-2xl md:text-xl font-light text-white">Insight</p>
      <p className="text-sm text-gray-400 mt-2">Public knowledge centred on a few iconic species</p>
    </div>
  </div>

  <details className="mt-8 rounded-lg border border-white/10 bg-black p-4">
    <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
    <p className="mt-8 text-sm text-gray-400">
     To better understand public perception of marine biodiversity, a preliminary survey was conducted with 108 participants. The findings revealed that 91% (98) had only experienced exhibitions that rely predominantly on visual stimuli—similar to conventional museum or gallery formats. When asked about the types of marine species they were most familiar with, 87% (94) mentioned iconic endangered mammals such as whales and dolphins, indicating that public awareness remains concentrated on a narrow range of charismatic megafauna. These results informed the direction of this project, which seeks to expand public understanding by highlighting lesser-known species through sound, rather than sight. 
    </p>
  </details>
</section>


          


          {/* Process Section */}

          <section id="process" className="rounded-lg bg-black">
     <h2 className="text-xl md:text-xl font-light mb-8 md:mb-8 text-gray-300">Process</h2>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-20">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">01 Ideation</h3>
      <p className="text-gray-400 text-sm">Brainstorming</p>
      <p className="text-gray-400 text-sm">Concept sketches</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">02 Analysis</h3>
      <p className="text-gray-400 text-sm">Precedents</p>
      <p className="text-gray-400 text-sm">Ocean issues & species research</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">03 Development</h3>
      <p className="text-gray-400 text-sm">Product & spatial design</p>
      <p className="text-gray-400 text-sm">AR application · Exhibition build</p>
    </div>
  </div>
</section>






          

         {/* Tools & Roles Table */}
       <div className="mb-20 md:mb-20">
       <h2 className="text-xl md:text-xl font-light text-gray-300 mb-6 md:mb-8">
       Tools & Roles
     </h2>
       <div className="overflow-x-auto rounded-lg border border-white/10 bg-black">
      <table className="w-full text-left text-sm text-gray-400">
      <thead className="bg-white/5 text-gray-300 uppercase text-sm tracking-wider">
        <tr>
          <th className="px-4 py-3">Part</th>
          <th className="px-4 py-3">Tools</th>
          <th className="px-4 py-3">Outputs</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/10">
        <tr>
          <td className="px-4 py-4 font-light">Modeling</td>
          <td className="px-4 py-4">AutoCAD, 3ds Max</td>
          <td className="px-4 py-4">Exhibition modules, Space </td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Texturing</td>
          <td className="px-4 py-4">Substance Painter, Photoshop</td>
          <td className="px-4 py-4">PBR stone/metal materials</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Lighting & Render</td>
          <td className="px-4 py-4"> V-Ray</td>
          <td className="px-4 py-4">Spatial ambience renders</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Interaction / AR</td>
          <td className="px-4 py-4">Unity (AR Foundation)</td>
          <td className="px-4 py-4">AR species animations, QR triggers</td>
        </tr>
    
        <tr>
          <td className="px-4 py-4 font-light">Graphics</td>
          <td className="px-4 py-4">Adobe Suite </td>
          <td className="px-4 py-4">Exhibition panels, accessibility assets</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

   
  {/* Design Highlights */}       
    <section id="design" className="mt-10">
  <h2 className="text-xl md:text-xl font-light text-gray-300 mb-6">Design Highlights</h2>
  <ul className="space-y-3 text-gray-300">
    <li>• Sound as narrative; bioacoustics drive empathy.</li>
    <li>• Rock-like plinths for solitary listening.</li>
    <li>• Flexible exhibition format designed for scalability and adaptability across contexts.</li>
    <li>• AR scans trigger species; touch + sound + vision combined.</li>
  </ul>

  <details className="mt-8 rounded-lg border border-white/10 bg-black p-4">
    <summary className="cursor-pointer text-sm text-gray-400">Full text</summary>
    <div className="mt-8 space-y-4 text-sm text-gray-400">

              {/*idea development text start*/}
           
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Idea Development
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Sound is treated not just as data but as a narrative layer. Scientific studies revealing the bioacoustics of marine invertebrates were used to frame the emotional tone of the exhibition. The project highlights how sonic signals from these animals reveal behavioural patterns and ecosystem health. These acoustic ecologies become a channel to foster empathy and reframe conservation dialogue. While marine mammals like whales and dolphins receive outsized attention due to their intelligence and emotional expressiveness, lesser-known species—particularly invertebrates and bottom-dwellers—remain largely excluded from both public empathy and conservation priorities. This project aims to redress that imbalance by amplifying the voices of species that are hidden, both physically and culturally, from mainstream awareness.</p>
            </div>
          </div>
        
             <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Product Design
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Custom-designed headset stands emulate smoothed underwater rocks, integrating both audio hardware and tactile visuality. Each plinth invites solitary listening through high-resolution recordings of marine species. The subtlety of these soundscapes becomes a form of protest against the visual-centric bias of most exhibitions.
              </p>
              </div>
          </div>

           {/*Spatial Design Text*/} 
        
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Spatial Design
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Exhibition modules are mobile and adaptable, enabling flexible installation across diverse locations. Ceiling-mounted wave-shaped metal fixtures and textured lighting elements simulate underwater ambience, enriching the overall spatial immersion.
              </p>
              </div>
          </div>

          {/*Exhibition Design Text*/} 
        
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 ">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Exhibition Design
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The experience combines analog tactility with digital immersion. Visitors use AR-enabled displays to scan QR codes, triggering animated 3D models of species in motion. This integration of touch, sound, and vision deepens the emotional engagement, transforming passive observation into active reflection.
              </p>
              </div>
          </div>
      
    </div>
  </details>
</section>

          
          
          
          


          
          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Graphic design images Section */}
 
            {/*Development Image1*/}     
          <div className="w-full">
            <img className="w-full h-full" src="/lovable-uploads/a0b20d87-ef7c-4183-9209-6abb798b0f65.png" />
          </div>           
          
        
         {/*Research Image2*/}        
          <div className="w-full">
            <img className="w-full h-full" src="/lovable-uploads/web1920-whispers from the bottom_대지 17.png" />
          </div>  
         
          {/*Research Image2-1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/web1920-whispers from the bottom_대지 19.png" />
          </div> 


   
          {/*Poster Design Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-10 md:mb-10" src="/lovable-uploads/web1920-whispers from the bottom_대지 13-26.png" />
          </div>     


          



          {/*Graphic Design Image1-1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-10 md:mb-10" src="/lovable-uploads/web1920-whispers from the bottom-27.png" />
          </div>   

          {/*Graphic Design Image1-2*/}        
          <div className="w-full">
            <img className="w-full h-full mb-10 md:mb-10" src="/lovable-uploads/web1920-whispers from the bottom-28.png" />
          </div>   

           {/*Graphic Design Image1-3*/}        
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/lovable-uploads/web1920-whispers from the bottom-29.png" />
          </div>  


          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          
           {/* AR APP YouTube Video Section */}
            <div className="my-40 md:my-40 relative">
            <AspectRatio ratio={16 / 9} className="rounded-lg border border-gray-500/50 overflow-hidden">
             {/* 유튜브 플레이어 */}
            <YouTube videoId="M0v75vAVitA" opts={videoOpts} className="w-full h-full" />
           </AspectRatio>
           </div>

          {/*Process Rendering Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-8 md:mb-8" src="/lovable-uploads/web1920-whispers from the bottom_대지 10 사본.png" />
          </div>


          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>  
          

          {/*Product Design Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-10 md:mb-10" src="/lovable-uploads/web1920-whispers from the bottom_대지 10-31.png" />
          </div>

          {/*Product Design Image2*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/web1920-whispers from the bottom_대지 10 사본 2.png" />
          </div>  




          
          
          
          {/*Spatial Design Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/web1920-whispers from the bottom1_대지 12.png" />
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
          
          
        </div>
      </section>
      
      {/*Navigation Section*/}
      <div className="pb-40 md:pb-60 flex items-center justify-center">
        <Link to="/project/invisible-space-museum" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
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
