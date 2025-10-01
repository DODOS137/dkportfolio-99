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
              <div className="w-full h-px my-40 md:my-40 bg-transparent"></div>

              


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
              <div className="w-full h-px my-40 md:my-40 bg-transparent"></div>

 
              
{/* Challenge Summary */}
<section aria-labelledby="car-title" className="mt-6 mb-6">
  <h2 id="car-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Summary</h2>

  <div className="grid md:grid-cols-3 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Challenge</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
        <li>Gaps in public understanding of ocean ecosystems</li>
        <li>Overemphasis on iconic large marine species</li>
        <li>Overlooked bottom-dwelling and invertebrate life</li>
        <li>Reliance on visual-only formats</li>
      </ul>
    </div>

    {/* Approach */}
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Approach</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
        <li>Sound-driven storytelling</li>
        <li>Immersive design for emotional impact</li>
        <li>Hybrid: AR triggers + tactile modules</li>
        <li>Focus on sub-rock invertebrates</li>
      </ul>
    </div>

    {/* Result */}
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Result</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
        <li>Pause · listen · empathize</li>
        <li>Invisible made visible (emotional · sonic · spatial)</li>
        <li>Scalable, mobile exhibition system</li>
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
        The project offers a contemplative space that fosters emotional storytelling. It challenges hierarchical species empathy and contributes to broader discourse on inclusive marine conservation, while also providing an efficient and scalable platform for delivering immersive exhibitions in diverse environments.
      </p>
    </div>
  </div>
</details>

{/*Research*/}
<section id="research" aria-labelledby="research-title" className="mt-6 mb-6">
  <h2 id="research-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Research</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">91%</p>
      <p className="text-sm text-gray-400 mt-2">only visual-centric exhibitions experienced</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">87%</p>
      <p className="text-sm text-gray-400 mt-2">most familiar with whales/dolphins</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">108</p>
      <p className="text-sm text-gray-400 mt-2">participants surveyed</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-2xl md:text-xl font-light text-white">Insight</p>
      <p className="text-sm text-gray-400 mt-2">Public knowledge centred on a few iconic species</p>
    </div>
  </div>

  <details className="mt-6 mb-6 rounded-lg border border-white/10 bg-black p-4">
    <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
    <p className="mt-6 text-sm text-gray-400">
      To better understand public perception of marine biodiversity, a preliminary survey was conducted with 108 participants. The findings revealed that 91% (98) had only experienced exhibitions that rely predominantly on visual stimuli—similar to conventional museum or gallery formats. When asked about the types of marine species they were most familiar with, 87% (94) mentioned iconic endangered mammals such as whales and dolphins, indicating that public awareness remains concentrated on a narrow range of charismatic megafauna. These results informed the direction of this project, which seeks to expand public understanding by highlighting lesser-known species through sound, rather than sight. 
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
          <td className="px-4 py-4">Exhibition modules, Space </td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Texturing</td>
          <td className="px-4 py-4">Substance Painter, Photoshop</td>
          <td className="px-4 py-4">PBR stone/metal material maps</td>
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
<section id="design" className="mt-6 mb-6">
  <h2 className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Design Highlights</h2>
  <ul className="space-y-3 text-gray-400">
    <li>• Sound as narrative; bioacoustics drive empathy.</li>
    <li>• Rock-like plinths for solitary listening.</li>
    <li>• Flexible exhibition format designed for scalability and adaptability across contexts.</li>
    <li>• AR scans trigger species; touch + sound + vision combined.</li>
  </ul>
</section>
           


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
          <Link to="/project/Learn" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
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
