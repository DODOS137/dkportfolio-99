import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { islandProjectData } from '@/data/islandProject';
import BackToTopButton from '@/components/BackToTopButton';
import ProjectLayout from './shared/ProjectLayout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
const IslandProjectDetail = () => {
  const project = islandProjectData;
  const heroRef = useScrollAnimation();
  return <ProjectLayout>
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
        <Link to="/work" className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to work page
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
        <div className="max-w-[1540px] mx-auto px-[250px] z-10">
          <img alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" src={project.images[0]} />
        </div>

        {/* Shared Container */}
        <div className="max-w-[1540px] mx-auto px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-40">
            <h2 className="text-2xl md:text-3xl mb-8 text-white font-light">
              {project.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-light">
              This project reimagines the Shinjeong Submersible Bridge as a public space inspired by the logic of island perimeter trails (Dulle-gil). Rather than serving only as a connection point, the redesigned bridge proposes a spatial and narrative experience shaped by natural rhythms and erosion, embedding the temporal and ecological logic of island environments into an urban site. The result is a hybrid infrastructure that mirrors the identity of an island within the city.{project.mainDescription}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
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
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/*cover Image*/} 
          <div className="w-full mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/f71e877e-a998-4cda-a3e2-d771de451638.png" />
          </div>          
          
          {/* Approach Section */}
          <div className="rounded-lg bg-transparent">
            <div className="mb-8"> 
              <h2 className="text-2xl font-light text-gray-300 md:text-xl min-w-[200px] mb-8">Approach</h2>
              <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
               Island trails, or Dulle-gil, develop organically along the contours of the land. The project began with an analysis of So-Mae-Mul Island’s trail system, identifying how natural topography, erosion, and local behaviour inform its path. This understanding was then abstracted into a spatial framework for the urban bridge. The trail becomes not just a route, but a metaphor for temporality, memory, and environmental engagement.
              </p>
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
                    <p className="text-gray-400 text-sm leading-relaxed">Brain Storming</p>
                    <p className="text-gray-400 text-sm leading-relaxed">Concept sketching</p>
                  </div>
                </div>
                
                <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                  <h3 className="text-xl font-light text-white mb-4">Analysis</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-sm leading-relaxed"> Structural Function Review of the Existing Bridg</p>
                    <p className="text-gray-400 text-sm leading-relaxed">Assessment of Existing Bridge Use and Design Logic</p>
                  </div>
                </div>
                
                <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                  <h3 className="text-xl font-light text-white mb-4">Design Development</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-sm leading-relaxed">Build New Concept</p>
                    <p className="text-gray-400 text-sm leading-relaxed">Spatial Design</p>
                  </div>
                </div>
              </div>
            </div>

            {/*Line*/} 
            <div className="w-full h-px my-40 bg-gray-500/50"></div>

 
          {/* Site Section */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-2xl md:text-xl font-light text-gray-300 mb-8 min-w-[200px]">
                Site Selection
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light mb-40">
               The project is located at Anyangcheon Stream, part of Seoul’s Dulle-gil Route 6. As an urban corridor between Seoul and Gyeonggi, the stream is both a physical boundary and a shared recreational zone. The Shinjeong Submersible Bridge, with its low elevation and seasonal flooding, presents a compelling opportunity to reinterpret the identity of an island within a metropolitan setting. 
              </p>
            </div>
          </div>
            
            
            
            
            
            
            
            {/*site Image*/} 
            <div className="w-full">
              <img className="w-full h-auto " src="/lovable-uploads/0f705058-38cd-42f8-b003-60abbd2176db.png" />
           </div>            
            
         
            
           {/*site Image 2*/} 
            <div className="w-full mb-40">
              <img className="w-full h-auto " src="/lovable-uploads/8285a269-25a6-4332-a937-76ca7910159d.png" />
           </div>  
            
            
           {/*site Image 3*/} 
            <div className="w-full mb-40">
              <img className="w-full h-auto " src="/lovable-uploads/2d5ad0c5-c648-41c4-952f-2bf356a1bbe1.png" />
           </div>  


           {/*Line*/} 
            <div className="w-full h-px my-40 bg-gray-500/50"></div>


        
            
            
            {/*Line*/} 
            <div className="w-full h-px my-40 bg-gray-500/50"></div>
            
            
            
            
            {/* Final Outcome */}
            <div className="rounded-lg bg-transparent">
              <div className="mb-40"> 
                <h2 className="text-2xl font-light text-gray-300 md:text-xl min-w-[200px] mb-8">Final Outcome</h2>
                <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
                  Delivered a comprehensive public space intervention that successfully transforms underutilized urban areas into vibrant community gathering spaces through thoughtful design and sustainable materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/*Navigation Section*/}
      <div className="pb-60 flex items-center justify-center">
        <Link to="/project/invisible-space-museum" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-lg font-medium">
          <span>Next project</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
      
      <BackToTopButton />
    </ProjectLayout>;
};
export default IslandProjectDetail;