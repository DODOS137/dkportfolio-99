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

      <ProjectHero title={project.heroTitle} subtitle="Reimaging the Fashion Show Through XR" year={project.heroYear} client="Personal Project" role="XR & Exhibition Designer" />

      <section className="">
        {/* First Image */}
        <div className="max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[250px] z-10">
          <img src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" />
        </div>

        <div className="max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-20 mb-40 md:mt-20 mb-40">
            <h2 className="text-xl md:text-xl lg:text-xl mb-6 md:mb-8 text-white font-light">
              Thermal Trace
            </h2>
            <p className="text-base md:text-base lg:text-base text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
              Thermal Trace explores a new paradigm of fashion presentation by removing visual spectacle and foregrounding sensory engagement. Set in a secluded environment untouched by human intervention, this XR installation uses thermal detection to reveal camouflaged figures—merging body heat, environmental awareness, and spatial interaction. The project invites viewers to become active participants, shifting the role of the audience from passive observer to discoverer.
            </p>
            
            <ProjectMetadata projectType="Personal Project" projectCategory="XR Contents & Exhibition Design" teamType="Solo Project" duration="8 weeks" />
          </div>

           {/* Interactive Image 1 */}
          <div className="rounded-lg bg-transparent">
            <InteractiveImageSection baseImage="/lovable-uploads/b4f192b1-54ab-437f-8dad-74993331f176.png" overlayImage="/lovable-uploads/585a63af-fb48-41d5-82bf-62bc652eff56.png" />
             </div>
          

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

           {/* Summary */}
            <section aria-labelledby="sum-title" className="mt-8">
              <h2 id="sum-title" className="text-xl md:text-xl font-light text-gray-300 mb-8">
                Summary
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Challenge</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Passive runway experience</li>
                    <li>Rigid object/subject boundary limits narrative and agency</li>
                    <li>Bias toward “seeing” hides non-visual presence and environment</li>
                    <li>Stage treated as set, not as an interactive spatial interface</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Approach</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Thermal interaction: proximity, body heat, environmental temperature (heat traces)</li>
                    <li>Camouflage for models and viewers to dissolve boundaries</li>
                    <li>Mixed-reality layering combining material space with ephemeral signals</li>
                    <li>Discovery loop: sense → explore → reveal</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Result</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Audience shifts from viewer to explorer</li>
                    <li>Paradigm moves from spectacle to sensing</li>
                    <li>Space functions as the interface, uniting visible/invisible cues</li>
                    <li>New runway format that tests visibility, presence, and form</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Full text */}
            <details className="mt-8 mb-20 rounded-lg border border-white/10 bg-black">
              <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">Full text</summary>
              <div className="px-4 pb-4 mt-6 space-y-8">
                <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Approach</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                    The work reimagines the runway as a perceptual landscape rather than a stage. Models and viewers alike are disguised to dissolve the boundary between object and subject. Physical presence becomes the primary interface, with proximity and body temperature guiding interaction. Mixed reality overlays augment the scene, constructing a layered exhibition space that blends tangible matter with ephemeral perception. This approach fosters new ways of engaging with space, narrative, and the concept of visibility.</p>
                </div>
                <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Project Purpose</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                  The project sought to reimagine the communication of science in cultural institutions. Instead of presenting information as static content, the aim was to transform exhibitions into participatory experiences where knowledge emerges through interaction. By reframing scientific concepts as shared emotional and symbolic languages, the work highlights how immersive media can bridge gaps in public science education and broaden accessibility across different backgrounds
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Development Strategy</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                  Four universal scientific themes—gravity, light, life, and time—were selected as the foundation of the exhibition. Each theme was spatially embodied in a dedicated immersive environment, combining abstraction with sensory cues.
                  </p>
                </div>
                  <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Final Outcome</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                    A mixed-method study with 30 participants across varied age groups and educational backgrounds evaluated the project’s effectiveness. Findings showed that 67% considered the VR experience helpful in understanding abstract scientific concepts, and the same percentage preferred it over traditional exhibitions for its immersive qualities. Among the scientific themes, gravity (38%) and time (31%) were rated as most impactful. Additionally, 67% reported increased interest in science after the experience, and 47% expressed excitement about exploring unfamiliar virtual spaces. However, assessments of learning effectiveness were more divided: 30% found it effective, 35% neutral, and 35% ineffective. These results suggest strong potential for immersive design in science education, while also indicating the need for further refinement and adaptive learning strategies.
                  </p>
                </div>
              </div>
            </details>

          {/* Research */}
            <section id="research" aria-labelledby="research-title" className="mb-20">
              <h2 id="research-title" className="text-xl md:text-xl font-light text-gray-300 mb-6">Research</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">73%</p>
                  <p className="text-sm text-gray-400 mt-2">found displays lacked spatial clarity</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">76%</p>
                  <p className="text-sm text-gray-400 mt-2">preferred immersive VR-based learning</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">306</p>
                  <p className="text-sm text-gray-400 mt-2">participants surveyed</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-2xl md:text-xl font-light text-white">Immersion Demand</p>
                  <p className="text-sm text-gray-400 mt-2">VR-based immersive experiences</p>
                </div>
              </div>

              <details className="mt-8 rounded-lg border border-white/10 bg-black p-4">
                <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
                <p className="mt-8 text-sm text-gray-400">
                 A preliminary survey conducted with 56 participants supported the conceptual direction of this project. 78% responded positively to questions suggesting that fashion shows should move beyond conventional viewing formats and explore new experiential approaches. Notably, 40% of respondents (22 individuals) identified as either fashion designers or professionals in the fashion industry—reinforcing the relevance of this investigation within the design field.
              </p>
              </details>
            </section>

            {/* Process */}
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
                  <p className="text-gray-400 text-sm">Context & precedents</p>
                  <p className="text-gray-400 text-sm">Stage Environment Research</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                  <h3 className="text-white font-light mb-3">03 Development</h3>
                  <p className="text-gray-400 text-sm">Spatial/level design</p>
                  <p className="text-gray-400 text-sm">User Interactiont</p>
                </div>
              </div>
            </section>

              {/* Tools & Roles */}
            <div className="mb-20 md:mb-20">
              <h2 className="text-xl md:text-xl font-light text-gray-300 mb-6 md:mb-8">Tools & Roles</h2>
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
                      <td className="px-4 py-4">Stage</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Texturing</td>
                      <td className="px-4 py-4">Photoshop</td>
                      <td className="px-4 py-4">PBR materials</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Lighting & Render</td>
                      <td className="px-4 py-4">Unity, 3ds Max</td>
                      <td className="px-4 py-4">Spatial Real time renders</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Interaction / VR</td>
                      <td className="px-4 py-4">Unity</td>
                      <td className="px-4 py-4">VR Exhibition Prototype</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Graphics</td>
                      <td className="px-4 py-4">Adobe Suite</td>
                      <td className="px-4 py-4">Art works</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

    {/* Design Highlights */}       
    <section id="design" className="mt-10">
  <h2 className="text-xl md:text-xl font-light text-gray-300 mb-6">Design Highlights</h2>
  <ul className="space-y-3 text-gray-300">
    <li>• Thermal UX: interactions driven by body heat.</li>
    <li>• Camouflage performance to blur object/subject roles.</li>
    <li>• Modular environments for adaptive narrative tension.</li>
    <li>• Space-as-interface: audience navigates through sensing, not just sight.</li>
    <li>• Visibility stress-test: challenges how presence and form are perceived.</li>
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
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">This project reframes fashion not as something to be seen, but as something to be discovered through thermal detection. Rather than offering a passive visual display, it invites the audience to detect hidden figures through subtle thermal cues—heat traces, environmental temperature shifts, and proximity sensing. The XR installation creates a reward structure based on thermal awareness, shifting the focus from spectacle to sensing. Viewers become thermal explorers, engaging with camouflaged presence through detection rather than simply seeing.
                </p>
            </div>
          </div>
        
             <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
               Spatial Design
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Set across natural landscapes designed for camouflage—such as islands, forests, and coastal zones—the experience is structured as a responsive terrain. Each space reacts dynamically to the viewer's position and thermal presence, enabled by a real-time XR sensing system. The traditional runway dissolves into an interactive field that tests visibility, form, and presence. Modular environments are choreographed to evoke narrative tension and guide movement through atmospheric shifts. The space itself becomes the interface, framing the act of seeing as an embodied process.
               </p>
              </div>
          </div>

            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Exhibition Design
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Set across natural landscapes designed for camouflage—such as islands, forests, and coastal zones—the experience is structured as a responsive terrain. Each space reacts dynamically to the viewer's position and thermal presence, enabled by a real-time XR sensing system. The traditional runway dissolves into an interactive field that tests visibility, form, and presence. Modular environments are choreographed to evoke narrative tension and guide movement through atmospheric shifts. The space itself becomes the interface, framing the act of seeing as an embodied process.
                </p>
              </div>
            </div>

            

     

         
             </div>  
             </details>
           </section>


          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

 



          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>



          {/* Art Works Images */}

           <div className="w-full">
            <img className="w-full h-auto mb-40" alt="Art Work 1" data-lovable-editable="true" src="/lovable-uploads/1cab7e45-c7f3-4090-8efa-30b83bd90f54.png" />
          </div>
          
          <div className="w-full">
            <img src="/lovable-uploads/3acaab47-3d89-4589-92c7-2be3cf679ffa.png" className="w-full h-auto mb-40" alt="Art Work 2" data-lovable-editable="true" />
          </div>
          
          <div className="w-full">
            <img className="w-full h-auto mb-40" alt="Art Work 3" data-lovable-editable="true" src="/lovable-uploads/71597544-19d7-483c-81c4-82bf7b521859.png" />
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          <CarouselSection images={carouselImages} title="Transformable stage" />


          {/* Spatial Design Image */}

          <div className="w-full">
            <img className="w-full h-auto mb-20 md:mb-40" src="/lovable-uploads/ee33591e-e9b0-4e8e-a3f0-181d426fdff8.png" />
          </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Exhibition Design Image */}
          <div className="w-full ">
            <img className="w-full h-auto mt-20 mb-40" src="/lovable-uploads/115e4ef3-f572-4222-9101-3e140a672d1c.png" />
          </div>
          
          {/* Exhibition Design Section with Interactive Image */}
          <div className="rounded-lg bg-transparent border-1 border-gray500 overflow-hidden">
            <InteractiveImageSection baseImage="/lovable-uploads/673d5687-9173-4d58-8caa-854189586015.png" overlayImage="/lovable-uploads/c5531ed2-75f4-45bd-bcb2-af267986f73a.png" />



          <InteractiveExperience src="https://lucent-banoffee-a50286.netlify.app" title="Thermal Trace Interactive Experience" description="Experience the thermal detection interface in real-time" />

          <div className="w-full">
            <img src="/lovable-uploads/fd54a2e9-da0e-4967-89dc-aa0c028ad12a.png" className="w-full h-auto mb-20 md:mb-40 mt-20 md:mt-40" />
          </div>
           </div>

          {/* Line */} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          <ContentSection title="Post Project Direction">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">
              The project will be expanded into an interactive XR installation accessible via headset and sensor interface. A public showcase is planned to gather qualitative user feedback, assess perception thresholds, and refine sensory engagement techniques prior to full deployment.
            </p>
          </ContentSection>
        </div>
      
        {/* Navigation */}
        <div className="pb-40 md:pb-60 flex items-center justify-center mt-32 md:mt-52">
          <Link to="/project/Seoul-Natural-history-Museum" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
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
