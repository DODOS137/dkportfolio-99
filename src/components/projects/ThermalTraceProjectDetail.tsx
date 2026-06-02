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
import { ScrollArea } from "@/components/ui/scroll-area"; // ✅ 추가


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
  return (
  <ScrollArea className="h-screen w-screen overflow-auto"> {/* ✅ 추가 */}  
    
  <ProjectLayout>
      <ProjectNavigation />

      <ProjectHero title={project.heroTitle} subtitle="Reimagining the Fashion Show Through XR" year="2022-2025" client="Personal Project" role="XR & Exhibition Designer" />

      <section className="">
        {/* First Image */}
        <div className="max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[250px] z-10">
          <img src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" />
        </div>




           {/* Shared Container */}
            <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] mt-20 md:mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
                {/* Left Column */}
                <div>
                  <h2 className="text-xl md:text-xl font-bold text-white leading-tight mb-6">
                    {project.title}
                  </h2>
                  <p className="text-base md:text-base font-bold text-gray-500 mb-10">
                    2022-2025 │ XR Contents & Exhibition Design │ Solo Project │ 8 weeks
                  </p>
        
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <p className="text-base md:text-base text-gray-400 leading-relaxed font-light">
                    A comprehensive project that developed an original storyline, character scripts, and overall planning for a VR content experience.
                  </p>

                  <div className="mb-6 mt-6 md:mt-6">
                    <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                      The Brief
                    </h2>
                    <p className="text-base md:text-base lg:text-base leading-relaxed font-light text-gray-400">
                      Design a fashion show environment that delivers a powerful and unprecedented spatial experience. The garments and the space must interact organically, and the setting should evoke a strong sense of novelty and intensity.
                      
                    </p>
                  </div>
                </div>
              </div>



              {/* Line */}
              <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

              


              {/* Main Image (full-bleed colored plate behind) */}
              <div className="my-40 md:my-40 relative">
                {/* 뒤 배경판 */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[100vw]">
                  <AspectRatio ratio={16 / 9}>
                    <div className="w-full h-full bg-[#0044FA]" />
                  </AspectRatio>
                </div>
                {/* 앞 이미지 */}
                <AspectRatio
                  ratio={16 / 9}
                  className="relative z-10 bg-[#0044FA] border-none overflow-hidden"
                >
              {/* Interactive Image 1 */}
             <div className="rounded-lg bg-transparent">
            <InteractiveImageSection baseImage="/lovable-uploads/b4f192b1-54ab-437f-8dad-74993331f176.png" overlayImage="/lovable-uploads/585a63af-fb48-41d5-82bf-62bc652eff56.png" />
             </div>
                </AspectRatio>
              </div>



          


          

              {/* Line */}
              <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>


              
              
  {/*Summary*/}
<section id="research" aria-labelledby="research-title" className="mt-6 mb-6">
  <h2 id="research-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Summary</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-xl md:text-xl font-light text-gray-300">Challenge</p>
      <p className="text-sm text-gray-400 mt-2">Traditional runway shows rely on passive viewing and fixed visual boundaries.</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-xl md:text-xl font-light text-gray-300">Evidence</p>
      <p className="text-sm text-gray-400 mt-2">Research showed demand for more experiential fashion formats.</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-xl md:text-xl font-light text-gray-300">Proposal</p>
      <p className="text-sm text-gray-400 mt-2">Shift the runway from visual spectacle to thermal sensing through body heat, proximity, and XR.</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-xl md:text-xl font-light text-gray-300">Outputs</p>
      <p className="text-sm text-gray-400 mt-2">XR runway concept, WebGL/VR prototype, thermal visual system, spatial stages, and campaign graphics.</p>
    </div>
  </div>

  <details className="mt-6 mb-6 rounded-lg border border-white/10 bg-black p-4">
    <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
    <p className="mt-6 text-sm text-gray-400">
      A preliminary survey conducted with 56 participants supported the conceptual direction of this project. 78% responded positively to questions suggesting that fashion shows should move beyond conventional viewing formats and explore new experiential approaches. Notably, 40% of respondents (22 individuals) identified as either fashion designers or professionals in the fashion industry—reinforcing the relevance of this investigation within the design field.
</p>
  </details>
</section>






{/* Design Highlights table */} 
<div className="mt-6 mb-6">
<h2 className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Design Highlights</h2>
  <div className="overflow-x-auto rounded-lg border border-white/10 bg-black">
    <table className="w-full text-left text-sm text-gray-400">
      <thead className="bg-white/5 text-gray-300 uppercase text-sm tracking-wider">
        <tr>
          <th className="px-4 py-3"></th>
          <th className="px-4 py-3">Impact</th>
          <th className="px-4 py-3">Output</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/10">
        <tr>
          <td className="px-4 py-4 font-light">Sensory Runway</td>
          <td className="px-4 py-4">Shifts fashion presentation from looking to sensing.</td>
          <td className="px-4 py-4">XR runway concept</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Thermal Interaction</td>
          <td className="px-4 py-4">Turns body heat and proximity into reveal cues.</td>
          <td className="px-4 py-4">Heat-responsive system</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Camouflage Performance</td>
          <td className="px-4 py-4">Dissolves the boundary between body, garment, and space.</td>
          <td className="px-4 py-4">Thermal reveal language</td>
        </tr>
       <tr>
          <td className="px-4 py-4 font-light">Adaptive Stage System</td>
          <td className="px-4 py-4">Tests visibility through exposure, obstruction, and distortion.</td>
          <td className="px-4 py-4">Versatile Stage System</td>
       </tr>
       <tr>
          <td className="px-4 py-4 font-light">Prototype Workflow</td>
          <td className="px-4 py-4">Connects 3D, Unity/WebGL, rendering, and graphics into a testable experience.</td>
          <td className="px-4 py-4">VR/WebGL prototype + visual assets</td>
       </tr>
 
      
      </tbody>
    </table>
  </div>
</div>



          
          
          
          


          
          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>




 
              
   


 

          {/* Art Works Images */}

            {/*Art works images1*/}     
          <div className="w-full ">
            <img className="w-full h-auto" src="/webimages/ThermalTrace/TT1.jpg" />
          </div>


            {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

            {/*idea development text start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Idea Development</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">This project reframes fashion as something discovered through thermal detection. Instead of passive display, it invites audiences to detect hidden figures via heat traces, temperature shifts, and proximity sensing.
           </p>
           </div>
           </div>

  
            {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>
  

              {/*Art works images2*/}     
          <div className="w-full">
            <img className="w-full h-full" src="/webimages/ThermalTrace/TT2.jpg" />
          </div> 

           {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

              {/*Art works images3*/}     
          <div className="w-full">
            <img className="w-full h-full" src="/webimages/ThermalTrace/TT3.jpg" />
          </div> 

  

           {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>
  
  
  

          <CarouselSection images={carouselImages} title="Transformable stage" />


       

              
              
           {/*space design text start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Spatial Design</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Set across natural landscapes designed for camouflage—such as islands, forests, and coastal zones—the experience is structured as a responsive terrain. Each space reacts dynamically to the viewer's position and thermal presence, enabled by a real-time XR sensing system. The traditional runway dissolves into an interactive field that tests visibility, form, and presence. Modular environments are choreographed to evoke narrative tension and guide movement through atmospheric shifts. The space itself becomes the interface, framing the act of seeing as an embodied process.
               </p>
           </div>
           </div>

           {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>
              


          {/* Spatial Design Image */}
          <div className="w-full">
            <img className="w-full h-auto" src="/webimages/ThermalTrace/TT4.jpg" />
          </div>




             {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>            

 




            {/* Exhibition Design Section with Interactive Image */}
          <div className="rounded-lg bg-transparent border-1 border-gray500 overflow-hidden">
            <InteractiveImageSection baseImage="/lovable-uploads/673d5687-9173-4d58-8caa-854189586015.png" overlayImage="/lovable-uploads/c5531ed2-75f4-45bd-bcb2-af267986f73a.png" />


             {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>   
              
              
           {/*exhibition design text start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Exhibition Design</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">XR reveals models beyond normal perception, challenging audiences to engage on a deeper sensory level. Instead of visual cues, viewers track models through body heat, focusing on delicate outlines and subtle movements.
           </p>
           </div>
           </div>

           {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>







              
          


          <InteractiveExperience src="https://lucent-banoffee-a50286.netlify.app" title="Thermal Trace Interactive Experience" description="Experience the thermal detection interface in real-time" />


           {/*Line*/}
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>


            {/*Final Outcome start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Final Outcome</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The project currently exists as a WebGL prototype and conceptual sketch that explores sensory experience through temperature-responsive visual data. Evolving this concept into an XR installation where a physical model’s body temperature triggers the visual transformation could extend its potential into real-world contexts. This approach presents opportunities for application across fashion shows, brand showcases, and sensory-based art installations, where digital aesthetics and physical presence converge.
           </p>
           </div>
           </div>

           {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>
            
            <div className="w-full">
            <img src="/webimages/ThermalTrace/TT6.jpg" className="w-full h-auto" />
          </div>
          

           {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>
            


 
            


            
            <div className="w-full">
            <img src="/webimages/ThermalTrace/TT5.jpg" className="w-full h-auto" />
          </div>
           </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>




              

       
        </div>
      
        {/* Navigation */}
        <div className="pb-40 md:pb-60 flex items-center justify-center mt-32 md:mt-52">
          <Link to="/project/invisible-space-museum" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
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
    </ProjectLayout>
    </ScrollArea>
  );
};

export default ThermalTraceProjectDetail;
