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
import BackToTopButton from '@/components/BackToTopButton';
import { ScrollArea } from "@/components/ui/scroll-area"; // ✅ 추가

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
        <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] z-10">
          <img alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" src="/lovable-uploads/db58f1e0-0fea-4b68-953c-59d4580ad411.png" />
        </div>

        {/* Shared Container */} 
        <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-20 md:mt-40">
            <h2 className="text-xl md:text-xl lg:text-xl mb-6 md:mb-8 text-white font-light">
              Seoul Natural History Museum
            </h2>
            <p className="text-base md:text-base lg:text-base text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
            This project proposes a conceptual and spatial renewal of the Seodaemun Museum of Natural History, Korea's first public natural history museum. The redesign envisions a new identity—Seoul Natural History Museum—grounded in Korea's cultural relationship with nature, particularly from the perspective of traditional hunters. The project spans spatial reconfiguration, exhibition curation, branding, and product design.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-sm">
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

       

          {/* YouTube Video Section */}
          <div className="rounded-lg bg-transparent mb-40 mt-40 md:mb-40">
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


         {/*Line*/} 
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
                    <li>Outdated façade & interiors</li>
                    <li>Weak cultural identity</li>
                    <li>Limited visitor engagement</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Approach</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Contemporary landmark façade</li>
                    <li>Spatial renewal & circulation upgrade</li>
                    <li>Immersive storytelling + interactive media</li>
                    
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Result</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Repositioned as cultural landmark</li>
                    <li>Enhanced visitor experience</li>
                    <li>Alignment with modern expectations</li>
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
                    Redefined the museum's identity by repositioning it through the lens of traditional Korean hunters. This narrative perspective shaped the exhibition tone, user experience, and spatial arrangement, bridging heritage interpretation with modern interaction design.</p>
                </div>
                <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Project Purpose</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                 The museum’s collection is valued, yet its outdated grey façade, obsolete interiors, and weak identity limit its appeal—often compared to a municipal office rather than a cultural institution. A renewal strategy is proposed: redefine the façade with a contemporary landmark identity, update interiors for better circulation and engagement, and integrate immersive storytelling and interactive media. These changes would reposition the museum as a dynamic cultural space aligned with modern expectations.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Development Strategy</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                  Moved away from passive, linear layouts towards participatory and immersive experiences. Reinterpreted outdated specimen-dense layouts with layered environmental cues, emphasising active visitor engagement. Reception, gift shop, and circulation were integrated with symbolic and narrative depth to enhance institutional coherence.
                  </p>
                </div>
                  
              </div>
            </details>

            {/* Research */}
            <section id="research" aria-labelledby="research-title" className="mb-20">
              <h2 id="research-title" className="text-xl md:text-xl font-light text-gray-300 mb-6">Research</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">84%</p>
                  <p className="text-sm text-gray-400 mt-2">demand renewal</p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">213</p>
                  <p className="text-sm text-gray-400 mt-2">participants surveyed</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-2xl md:text-xl font-light text-white">Insight</p>
                  <p className="text-sm text-gray-400 mt-2">Need for architectural redefinition and experiential enhancement
                  </p>
                </div>
              </div>

              <details className="mt-8 rounded-lg border border-white/10 bg-black p-4">
                <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
                <p className="mt-8 text-sm text-gray-400">
                A survey was conducted with 213 individuals who had previously visited the Seodaemun Museum of Natural History, either on-site or online. Among them, 32 participants had also experienced renowned natural history museums abroad. While the museum's collection of specimens was largely appreciated, 84% of respondents (179 people) highlighted the need for spatial and interior renewal. Critical feedback pointed to the building's outdated grey façade and lack of distinctive identity, often being compared to a generic municipal office rather than a museum. The results revealed a strong demand for architectural redefinition and experiential enhancement that aligns with contemporary expectations for cultural institutions.
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
                  <p className="text-gray-400 text-sm">Context & Problem Analysis</p>
                  <p className="text-gray-400 text-sm">Context & precedents</p>
                  
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                  <h3 className="text-white font-light mb-3">03 Development</h3>
                  <p className="text-gray-400 text-sm">Brand identity redefinition</p>
                  <p className="text-gray-400 text-sm">Spatial / Product / Exhibition design</p>
                
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
                      <td className="px-4 py-4">3D Assets, Space, Product </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Texturing</td>
                      <td className="px-4 py-4">Photoshop</td>
                      <td className="px-4 py-4">PBR materials</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Lighting & Render</td>
                      <td className="px-4 py-4">V-Ray</td>
                      <td className="px-4 py-4">Spatial ambience renders</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Interaction / VR</td>
                      <td className="px-4 py-4">Unreal Engine</td>
                      <td className="px-4 py-4">VR Environment</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Graphics</td>
                      <td className="px-4 py-4">Adobe Suite, Runway AI</td>
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
    <li>• Identity: Rebranded through hunter’s worldview.</li>
    <li>• Space: From static to immersive, participatory layouts.</li>
    <li>• Narrative: Respectful coexistence with nature as storyline.</li>
   
  </ul>

  <details className="mt-8 rounded-lg border border-white/10 bg-black p-4">
    <summary className="cursor-pointer text-sm text-gray-400">Full text</summary>
    <div className="mt-8 space-y-4 text-sm text-gray-400">

              {/*idea development text start*/}
            
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
               Site Selection
              </h2>
            </div>
          </div>
      
      
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Problem Analysis
              </h2>
             <div className="flex flex-col space-y-6 md:space-y-8 ">
            <div>
              <h3 className="text-sm md:text-sm lg:text-sm font-light mb-6 md:mb-8 min-w-[200px] text-gray-400">
               Overcrowded Specimen Displays
               </h3>
              <p className="text-sm md:text-sm lg:text-sm leading-relaxed text-gray-400 font-light">The museum's densely classified displays obscure environmental context and hinder engagement, presenting specimens in ways misaligned with local sensibilities.</p>

              <h3 className="text-sm md:text-sm lg:text-sm font-light mb-6 md:mb-8 min-w-[200px] text-gray-400">
               Passive Viewing Format
               </h3>
              <p className="text-sm md:text-sm lg:text-sm leading-relaxed text-gray-400 font-light">The exhibition's linear layout limits engagement, reducing the experience to passive viewing with little interaction or depth.
              </p>

              <h3 className="text-sm md:text-sm lg:text-sm font-light mb-6 md:mb-8 min-w-[200px] text-gray-400">
               Lack of Identity in Spatial Elements
               </h3>
              <p className="text-sm md:text-sm lg:text-sm leading-relaxed text-gray-400 font-light">The space lacks visual cohesion, with outdated elements creating a bland, institutional feel that weakens cultural resonance.
              </p>
              </div>
             </div>
          
  
            </div>
          </div>
        
             <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Narrative Arc
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">In late Joseon Korea, hunters viewed nature not merely as a means of survival, but as a realm of spiritual reverence—tracking animals with care and honoring their lives, often referring to tigers as San-gun, or "Mountain Lord." This ethos of respect extended to falconry, where Maekkun formed mutual bonds with wild hawks, never claiming ownership and accepting their release with grace. Rooted in this worldview, the project Through the Eyes of a Hunter reimagines the Seodaemun Museum of Natural History as a culturally grounded space, transforming static displays into an interpretive journey shaped by Korean perspectives on nature, coexistence, and memory.
              </p>
              </div>
          </div>

            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
              Spatial & Exhibition

              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">As visitors ascend from the Marine Hall to the upper Terrestrial Halls, the exhibition textures gradually shift—becoming coarser to reflect how stone is shaped by different environments: the sea smooths, rivers carve, and mountains fracture. This erosion gradient is embedded into the museum's spatial and sculptural design, using stone as a visual language to express the distinct ecological logic of each zone.
              </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                 Final Outcome
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Delivered a complete, testable museum experience encompassing space, identity, product, and narrative logic. The project is structured for future feedback loops through public interaction and prototyping.
              </p>
              </div>
            </div>

     

               </div>  
             </details>
           </section>

          







          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>


          
          {/*Site Image*/}     
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/6738a528-de77-4edc-b034-3e77c4fc50d0.png" />
          </div>   

          {/*Site Image*/}     
          <div className="w-full">
            <img className="w-full h-full" src="/lovable-uploads/b198fa56-2b47-4b29-8cde-90478a687f5b.png" />
          </div>     

 

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Narrative */}

          <div className="w-full">
            <img className="w-full h-full" src="/lovable-uploads/51157240-a9c5-460b-aa6c-d0dff38ae86e.png" />
          </div> 



          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>          

          {/* Floor Plan */}
          <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/158cf471-6a66-466d-b78a-90eb5b9cb682.png" />
            <img className="w-full h-auto" src="/lovable-uploads/fa2525e7-6df4-4a9d-91bf-2fa5260afc6d.png" />
          </div>

          {/*Exhibtion Plan*/}
          <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/11615802-b3be-45ae-b796-562156a2ffe9.png" />
             </div>

 

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Spatial Design */}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">  
              <h2 className="text-xl md:text-2xl font-light mb-6 md:mb-8 text-gray-300 min-w-[200px]">Spatial Design</h2>
             </div>
         </div>

          {/*Lobby Images*/}

          <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/2d5ad0c5-c648-41c4-952f-2bf356a1bbe1.png" />
              </div>

          <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/2c1579d8-8849-44ef-b82b-60f0a459098c.png" />
              </div>

         {/*Lobby comments*/}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40 mt-20 md:mt-40">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 whitespace-nowrap min-w-[200px]">
                Reception Desk 
              </h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">The reception area introduces visitors to the museum's renewed identity through a vertical sculptural installation that spans all three floors. Behind the desk, a folding-screen-inspired frame and mountain-shaped artwork evoke Korean cultural and geographic heritage—establishing a strong sense of place upon entry.
              </p>
              </div>
          </div>

          {/*Exhibtion Hall*/}
           <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/6c195957-4548-4480-b204-fa616c83621b.png" />
              </div>

          <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/8c62ae91-46c3-431b-a691-98c542349817.png" />
              </div>

         {/*Exhibition Hall comments*/}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40 mt-20 md:mt-40">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 whitespace-nowrap min-w-[200px]">
                Exhibition Hall
              </h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">The exhibition unfolds across two ecological zones: the first floor (Marine Zone) draws inspiration from ocean currents, with immersive media and fluid spatial divisions that evoke the rhythm of the sea; while the second and third floors (Terrestrial Zone) explore land-based habitats through layered displays that combine natural specimens with historical artefacts, such as traditional hunting tools. A vertical sculptural void connects all levels, symbolising the continuous flow of ecological systems throughout the museum.
              </p>
              </div>
          </div>

           {/*Built-in 1*/}
           <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/9e5c0006-1fbb-47e2-893e-76d4cdffe825.png" />
              </div>
         
            {/*Built-in comments*/}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40 mt-20 md:mt-40">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 whitespace-nowrap min-w-[200px]">Built-in wall cabinets</h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">Visitors encounter a sequence of built-in wall cabinets, each dedicated to a specific theme—from preserved biological specimens to rare books and historical artifacts—creating layered moments of discovery throughout the exhibition.</p>
              </div>
          </div>
          
           {/*Built-in 2*/}
           <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/3fa7a7e0-8840-409c-b7c5-025bcb4d027c.png" />
              </div>

           {/*Rest Area Image 1*/}
           <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/5f5ce678-d608-42a9-a4e1-a57984d5eed2.png" />
              </div>

          {/*Rest Area Image 2*/}
           <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/dcb3ac8b-0b01-4f13-8341-e02e026d5c46.png" />
              </div>

          {/*RA comments*/}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40 mt-20 md:mt-40">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 whitespace-nowrap min-w-[200px]">2F Rest Area </h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">A rest zone designed as a hunter's study, filled with personal collections, insects, and field objects gathered during expeditions. The space invites quiet observation while offering an elevated view of the vertical glass sculpture that links all three floors.
              </p>
              </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Product Design Section */}
          <div className="rounded-lg bg-transparent">
            
            <img className="w-full h-auto mb-20 md:mb-40" src="/lovable-uploads/755af641-478b-42de-aedb-1022955dc03a.png" />
            <div className="w-full ">
              <img className="w-full h-auto" src="/lovable-uploads/9af82104-3de4-45be-bda6-313f88f638df.png" />
              <img className="w-full h-auto" src="/lovable-uploads/479a25d0-1252-4373-9a77-ab53ba200abc.png" />
              
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

 
          
            {/*End Image */}
           <div className="w-full mb-40 md:mb-40">
            <img src="/lovable-uploads/12162067-822b-4528-a213-d6d12bf4ecc2.png" className="w-full h-auto mb-40 md:mb-0" />
              </div>
          
        </div>
      </section>
      
      {/*Navigation Section*/}
      <div className="pb-40 md:pb-60 flex items-center justify-center mt-40 ">
        <Link to="/project/project-6" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
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
        
      <BackToTopButton />
    </ProjectLayout>
      </ScrollArea>
  );
};

     
export default SeoulMuseumProjectDetail;
