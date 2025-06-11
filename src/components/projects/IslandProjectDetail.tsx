import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { islandProjectData } from '@/data/islandProject';
import BackToTopButton from '@/components/BackToTopButton';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CarouselSection from './thermal-trace/CarouselSection';

const IslandProjectDetail = () => {
  const project = islandProjectData;
  const heroRef = useScrollAnimation();
  const designImages = ["/lovable-uploads/cc640d0e-7bb1-4ea8-b171-757739c2b705.png", "/lovable-uploads/9c279e6e-b470-4233-b49d-65827db89700.png", "/lovable-uploads/aececcad-74e8-4d74-8f56-a9f2e24e27eb.png"];

  return <ProjectLayout>
      {/* Fixed Navigation */}
      <ProjectNavigation backText="Back to work page" />

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
            <span>2019</span>
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
          <img alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" src={project.images[0]} />
        </div>

        {/* Shared Container */}
        <div className="max-w-[1540px] mx-auto px-4 md:px-8 lg:px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-20 md:mt-40">
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-light">
              {project.title}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
              This project reimagines the Shinjeong Submersible Bridge as a public space inspired by the logic of island perimeter trails (Dulle-gil). Rather than serving only as a connection point, the redesigned bridge proposes a spatial and narrative experience shaped by natural rhythms and erosion, embedding the temporal and ecological logic of island environments into an urban site. The result is a hybrid infrastructure that mirrors the identity of an island within the city.{project.mainDescription}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-sm">
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">project type</h3>
                <p className="text-white">Bachelor's Thesis</p>
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

          {/*cover Image*/} 
          <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto" src="/lovable-uploads/f71e877e-a998-4cda-a3e2-d771de451638.png" />
          </div>          
          
          {/* Approach Section */}
          <div className="rounded-lg bg-transparent">
            <div className="mb-6 md:mb-8"> 
              <h2 className="text-xl md:text-2xl font-light text-gray-300 min-w-[200px] mb-6 md:mb-8">Approach</h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400">
               Island trails, or Dulle-gil, develop organically along the contours of the land. The project began with an analysis of So-Mae-Mul Island's trail system, identifying how natural topography, erosion, and local behaviour inform its path. This understanding was then abstracted into a spatial framework for the urban bridge. The trail becomes not just a route, but a metaphor for temporality, memory, and environmental engagement.
              </p>
            </div>

            {/*Line*/} 
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

            {/* Process Section */}
            <div className="rounded-lg bg-transparent">
              <h2 className="text-xl md:text-2xl font-light mb-8 md:mb-12 text-gray-300">Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-20 md:mb-40">
                <div className="aspect-square bg-black rounded-lg p-4 md:p-8 flex flex-col text-center border border-white">
                  <h3 className="text-lg md:text-xl font-light text-white mb-2 md:mb-4">Site Selection</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Brain Storming</p>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Concept sketching</p>
                  </div>
                </div>
                
                <div className="aspect-square bg-black rounded-lg p-4 md:p-8 flex flex-col text-center border border-white">
                  <h3 className="text-lg md:text-xl font-light text-white mb-2 md:mb-4">Analysis</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed"> Structural Function Review of the Existing Bridg</p>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Assessment of Existing Bridge Use and Design Logic</p>
                  </div>
                </div>
                
                <div className="aspect-square bg-black rounded-lg p-4 md:p-8 flex flex-col text-center border border-white">
                  <h3 className="text-lg md:text-xl font-light text-white mb-2 md:mb-4">Design Development</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Build New Concept</p>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Spatial Design</p>
                  </div>
                </div>
              </div>
            </div>

            {/*Line*/} 
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

 
          {/* Site Section */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Site Selection
              </h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light mb-20 md:mb-40">
               The project is located at Anyangcheon Stream, part of Seoul's Dulle-gil Route 6. As an urban corridor between Seoul and Gyeonggi, the stream is both a physical boundary and a shared recreational zone. The Shinjeong Submersible Bridge, with its low elevation and seasonal flooding, presents a compelling opportunity to reinterpret the identity of an island within a metropolitan setting. 
              </p>
            </div>
          </div>
            
            {/*site Image*/} 
            <div className="w-full">
              <img className="w-full h-auto" src="/lovable-uploads/bb36f6fe-2681-4b41-8be2-63f4c4f3fa17.png" />
           </div>            
            
           {/*site Image 2*/} 
            <div className="w-full mb-20 md:mb-40">
              <img className="w-full h-auto" src="/lovable-uploads/2a3370e6-9b65-4915-8a4e-6b4fd2c94622.png" />
           </div>  

           {/*Line*/} 
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>            
            
           {/* Design */}
         <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-20 md:mt-40 rounded-lg bg-transparent">

         {/* 왼쪽: h2 제목 */}
          <h2 className="text-xl md:text-2xl mb-6 md:mb-8 font-light text-gray-300 min-w-[200px]">
         Design Features & Development
            </h2>

            {/* 오른쪽: h3 + p 세트들을 세로로 나열 */}
              <div className="flex flex-col space-y-6 md:space-y-8">

           {/* 첫 블록 */}
           <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-light mb-3 md:mb-4 min-w-[200px] text-gray-300">
           1. Submersible Infrastructure
          </h3>
         <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">The bridge accepts periodic flooding, allowing it to transform in appearance and accessibility. This responsiveness echoes the fluid boundary between land and sea on actual islands.
         </p>
         </div>

         {/* 두 번째 블록 */}
          <div>
         <h3 className="text-lg md:text-xl lg:text-2xl font-light mb-3 md:mb-4 min-w-[200px] text-gray-300">
         2. Material Abrasivity
        </h3>
         <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">The walking surface employs texture gradients that reference stone erosion—polished by water, fractured by exposure—visually expressing geological time.
         </p>
         </div>

         {/* 세 번째 블록 */}
           <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-light mb-3 md:mb-4 min-w-[200px] text-gray-300">
          3. Topographic Translation
           </h3>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">Railings and edges emulate coastal landforms, turning safety elements into sculptural gestures that evoke island terrain.
          </p>
          </div>

          {/* 네 번째 블록 */}
           <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-light mb-3 md:mb-4 min-w-[200px] text-gray-300">
          4. Environmental Interactivity
           </h3>
           <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">Seasonal water levels control what parts of the bridge remain visible, encouraging repeat visits and creating a dynamic, responsive experience.
           </p>
           </div> 
              
          </div>
        </div>           
            
            {/*Design Image 1*/} 
            <div className="w-full">
              <img className="w-full h-auto mt-20 md:mt-40" src="/lovable-uploads/3bbed700-bdfa-4934-beda-8b1fdeeabee1.png" />
           </div>  

            {/*Design Image 2*/} 
            <div className="w-full mb-20 md:mb-40">
              <img className="w-full h-auto" src="/lovable-uploads/dfaf1402-bf06-4646-9785-a2ad750fcee7.png" />
           </div> 

           {/*Line*/} 
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

            {/*Design Image 3*/} 
            <div className="w-full">
              <img className="w-full h-auto mt-20 md:mt-40" src="/lovable-uploads/2d293875-daaa-4359-b2a5-8df430ecb4b1.png" />
           </div>  

            {/*Design Image 4*/} 
            <div className="w-full mb-20 md:mb-40">
              <img src="/lovable-uploads/6a470e16-2864-4cce-a936-ae10a67d2d06.png" className="w-full h-auto mt-20 md:mt-40" />
           </div> 


            {/*Design Image 5*/} 
            <div className="w-full mb-20 md:mb-40">
              <img src="/lovable-uploads/6a470e16-2864-4cce-a936-ae10a67d2d06.png" className="w-full h-auto mt-20 md:mt-40" />
           </div> 

            
            {/* Design Carousel Section */}
            <CarouselSection images={designImages} title="Design Development" />
            
            {/*Line*/} 
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>
            
            {/* Final Outcome */}
            <div className="rounded-lg bg-transparent">
              <div className="mb-20 md:mb-40"> 
                <h2 className="text-xl md:text-2xl font-light text-gray-300 min-w-[200px] mb-6 md:mb-8">Final Outcome</h2>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-gray-400 mb-12 md:mb-20">
                  This project challenges the notion of bridges as merely functional. By translating the spatial and narrative logic of island trails into an urban site, it proposes an experiential infrastructure—where users engage with temporality, nature, and memory through design. The result is a small-scale yet conceptually expansive public space that encourages contemplation of place, change, and the unseen rhythms of water.
                </p>
              </div>
            </div>
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
    </ProjectLayout>;
};

export default IslandProjectDetail;
