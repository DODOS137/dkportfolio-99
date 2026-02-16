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

      <ProjectHero title={project.heroTitle} subtitle="Reimaging the Fashion Show Through XR" year="2022-2025" client="Personal Project" role="XR & Exhibition Designer" />

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

 
              
{/* Challenge Summary */}
<section aria-labelledby="car-title" className="mt-6 mb-6">
  <h2 id="car-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Summary</h2>

  <div className="grid md:grid-cols-3 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Challenge</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                    <li>Passive runway experience</li>
                    <li>Rigid object/subject boundary limits narrative and agency</li>
                    <li>Bias toward “seeing” hides non-visual presence and environment</li>
                    <li>Stage treated as set, not as an interactive spatial interface</li>
      </ul>
    </div>

    {/* Approach */}
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Approach</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                    <li>Thermal interaction: proximity, body heat, environmental temperature (heat traces)</li>
                    <li>Camouflage for models and viewers to dissolve boundaries</li>
                    <li>Mixed-reality layering combining material space with ephemeral signals</li>
                    <li>Discovery loop: sense → explore → reveal</li>
      </ul>
    </div>

    {/* Result */}
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Result</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                    <li>Audience shifts from viewer to explorer</li>
                    <li>Paradigm moves from spectacle to sensing</li>
                    <li>Space functions as the interface, uniting visible/invisible cues</li>
                    <li>New runway format that tests visibility, presence, and form</li>
      </ul>
    </div>
  </div>
</section>

{/* Challenge full text*/}    
<details className="mt-6 mb-6 rounded-lg border border-white/10 bg-black">
  <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
    Full text
  </summary>
  <div className="px-4 pb-6 pt-6 space-y-6">
    <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Approach</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
      The work reimagines the runway as a perceptual landscape rather than a stage. Models and viewers alike are disguised to dissolve the boundary between object and subject. Physical presence becomes the primary interface, with proximity and body temperature guiding interaction. Mixed reality overlays augment the scene, constructing a layered exhibition space that blends tangible matter with ephemeral perception. This approach fosters new ways of engaging with space, narrative, and the concept of visibility.
      </p>
    </div>

    <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Project Purpose</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                  This project reimagines the runway as a perceptual landscape rather than a stage. Boundaries between model and audience dissolve, with physical presence, distance, and body heat driving interaction. Mixed reality overlays merge matter and perception, expanding fashion into an experience to be lived rather than seen
                  </p>
    </div>

    <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Development Strategy</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                  Fashion is reframed as a medium to be discovered, not displayed. Through thermal detection and environmental response, audiences become thermal explorers, uncovering hidden presence. XR terrains—forests, islands, coastal zones—react in real time, testing visibility and concealment. The strategy layers thermal interfaces, responsive environments, and mixed reality to build a flexible, scalable exhibition format.
                  </p>
    </div>

  
  </div>
</details>

{/*Research*/}
<section id="research" aria-labelledby="research-title" className="mt-6 mb-6">
  <h2 id="research-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Research</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">78%</p>
      <p className="text-sm text-gray-400 mt-2">call for experiential formats</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">40%</p>
      <p className="text-sm text-gray-400 mt-2">fashion designers / industry</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">56</p>
      <p className="text-sm text-gray-400 mt-2">participants surveyed</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-2xl md:text-xl font-light text-white">Insight</p>
      <p className="text-sm text-gray-400 mt-2">need creative runway formats</p>
    </div>
  </div>

  <details className="mt-6 mb-6 rounded-lg border border-white/10 bg-black p-4">
    <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
    <p className="mt-6 text-sm text-gray-400">
                 A preliminary survey conducted with 56 participants supported the conceptual direction of this project. 78% responded positively to questions suggesting that fashion shows should move beyond conventional viewing formats and explore new experiential approaches. Notably, 40% of respondents (22 individuals) identified as either fashion designers or professionals in the fashion industry—reinforcing the relevance of this investigation within the design field.
              </p>
  </details>
</section>

{/* Process Section */}
<section id="process" className="rounded-lg bg-black mt-6 mb-6">
  <h2 className="text-xl md:text-xl font-Medium mb-6 text-gray-300">Process</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">01 Ideation</h3>
      <p className="text-gray-400 text-sm">Brainstorming</p>
      <p className="text-gray-400 text-sm">Concept sketches</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">02 Analysis</h3>
      <p className="text-gray-400 text-sm">Context & precedents</p>
      <p className="text-gray-400 text-sm">Stage Environment Research</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">03 Development</h3>
      <p className="text-gray-400 text-sm">Spatial/level design</p>
      <p className="text-gray-400 text-sm">User Interaction</p>
    </div>
  </div>
</section>

{/* Tools & Roles Table */}
<div className="mt-6 mb-6">
  <h2 className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Tools & Roles</h2>
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
          <td className="px-4 py-4">stage</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Texturing</td>
          <td className="px-4 py-4">Photoshop</td>
          <td className="px-4 py-4">PBR material maps</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Lighting & Rendering</td>
          <td className="px-4 py-4">Unity, V-Ray</td>
          <td className="px-4 py-4">Spatial real-time renders</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Interaction / VR</td>
          <td className="px-4 py-4">Unity</td>
          <td className="px-4 py-4">Exhibition Prototype</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Graphics</td>
          <td className="px-4 py-4">Adobe Suite </td>
          <td className="px-4 py-4">Artworks</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

{/* Design Highlights */}       
<section id="design" className="mt-6 mb-6">
  <h2 className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Design Highlights</h2>
  <ul className="space-y-3 text-gray-400">
    <li>• Thermal UX: interactions driven by body heat.</li>
    <li>• Camouflage performance to blur object/subject roles.</li>
    <li>• Modular environments for adaptive narrative tension.</li>
    <li>• Space-as-interface: audience navigates through sensing, not just sight.</li>
    <li>• Visibility stress-test: challenges how presence and form are perceived.</li>
  </ul>
</section>
           


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
          

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>


 
            


            
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
