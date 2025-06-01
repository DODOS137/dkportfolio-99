import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import YouTube from 'react-youtube';
import { invisibleProjectData } from '@/data/invisibleProject';
const InvisibleProjectDetail = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const project = invisibleProjectData;
  return <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-6 md:py-8">
        <Link to="/work" className="inline-flex items-center gap-3 pl-2 pr-4 text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide">
          <ArrowLeft className="w-4 h-4" />
          <span data-lovable-editable="true">Back to work</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={heroRef.ref} className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider" data-lovable-editable="true">
            {project.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide" data-lovable-editable="true">
            {project.heroSubtitle}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
            <span data-lovable-editable="true">{project.heroYear}</span>
            <span>•</span>
            <span data-lovable-editable="true">{project.heroClient}</span>
            <span>•</span>
            <span data-lovable-editable="true">{project.heroRole}</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20">
        {/* First Image */}
        <div className="z-0 relative">
          <div className="w-full">
            <AspectRatio ratio={16 / 9} className="w-full">
              <ImageWithLoading src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-full object-cover" />
            </AspectRatio>
          </div>
        </div>

        {/* Shared Container */}
        <div className="max-w-[1540px] mx-auto px-6 md:px-[200px] z-10 relative -mt-[0%]">
          {/* Project Description */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">{project.title}</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">{project.mainDescription}</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">project type</h3>
                  <p className="text-white" data-lovable-editable="true">{project.projectType}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">Project category</h3>
                  <p className="text-white" data-lovable-editable="true">{project.projectCategory}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">team</h3>
                  <p className="text-white" data-lovable-editable="true">{project.teamType}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">DURATION</h3>
                  <p className="text-white" data-lovable-editable="true">{project.duration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* YouTube Video Player */}
          {project.videoId && <div className="mb-32">
              <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-transparent">
                <AspectRatio ratio={16 / 9} className="w-full">
                  <YouTube videoId={project.videoId} opts={{
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
            </div>}

          {/* Approach & Development */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Approach</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">{project.approach}</p>
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Development Strategy</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed" data-lovable-editable="true">{project.development}</p>
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Process</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                  <h3 className="text-xl font-light text-white mb-4" data-lovable-editable="true">Research Phase</h3>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Educational Psychology Research</p>
                  </div>
                </div>

                <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                  <h3 className="text-xl font-light text-white mb-4" data-lovable-editable="true">Design Development</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Learning Module Design</p>
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">VR Interface Development</p>
                  </div>
                </div>

                <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                  <h3 className="text-xl font-light text-white mb-4" data-lovable-editable="true">Testing & Iteration</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">User Testing</p>
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Assessment System</p>
                  </div>
                </div>
              </div>

              {/* Preliminary Research – Survey Data */}
              <div className="rounded-lg bg-transparent pt-[50px]">
                <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Preliminary Research</h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">An online and offline survey involving 306 participants was conducted to examine the limitations of traditional science exhibitions and gauge interest in immersive educational technologies. Results indicated that 73% (223) of respondents believed conventional science displays lacked engaging spatial formats and narrative clarity. Furthermore, 76% (233) expressed a desire for immersive VR-based experiences to better understand abstract scientific concepts. These insights informed the design rationale and validated the project's direction.</p>
              </div>
            </div>
          </div>

          {/* Worldbuilding + Image Section */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">
                Worldbuilding
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">
                Set on a fictional alien planet inhabited by an advanced civilisation. The player, as an interstellar explorer, uncovered abandoned structures, artefacts, and messages. Despite a lack of shared language, both species were assumed to understand the same laws of nature. The narrative explored how universal science transcended cultural boundaries.
              </p>

              {/* First image */}
              <div className="w-full">
                <AspectRatio ratio={16 / 9} className="w-full">
                  <img src="/lovable-uploads/3c3c9050-0741-450e-a164-f1dd5c4e7296.png" alt="Planet A233 - VR Environment" className="w-full h-full" data-lovable-editable="true" />
                </AspectRatio>
              </div>
            </div>
          </div>

          {/* Narrative Arc – The Explorer's Journey & Emotional Logic */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Narrative Arc – The Explorer's Journey</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true"> The experience followed a narrative arc centred around an unnamed interstellar explorer. Beginning with arrival on Planet A233, the user journeyed through a sequence of abandoned chambers, each corresponding to a universal scientific principle. The order of progression was intentionally designed to mirror an epistemological transformation—from perception to comprehension. As the user advanced, they transitioned from a sense of wonder and disorientation to clarity and resonance, ultimately recognising science as a shared, emotional, and symbolic language.</p>
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Emotional Logic</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed" data-lovable-editable="true">The spatial progression of the chambers was crafted not only to convey scientific ideas, but to evoke a coherent emotional rhythm. Gravity aimed to instil awe and tension through vast, distorted space. Light encouraged curiosity and wonder through refractive spectacle. Life evoked empathy through growth and unpredictability. Time concluded the experience with a quiet sense of introspection and impermanence. These emotional states were interwoven with the scientific themes, reinforcing understanding by making abstract concepts experientially felt.</p>
            </div>
            {/* Second 1-1Image */}
              <div className="w-full mb-8">
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/c1d66b75-3492-498c-b403-7745f0656549.png" />
                    </div>
          </div>

          {/* Video development + Image Section */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">
                Video Development
              </h2>

              {/* Second Image */}
              <div className="w-full mb-8">
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/8ef06019-dad8-43fc-b25b-4b7192935c0c.png" />
                    </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">Short video sequences functioned as interludes, each exploring a scientific theme (gravity, light, life, or time) through surreal, symbolic visuals. These videos presented abstract interpretations of cosmic phenomena, expanding the narrative and providing an emotional entry point to complex ideas.</p>
            </div>
          </div>

           {/* Level Design */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">
                Level Design
              </h2>

              {/* Thrid Image */}
              <div className="w-full mb-8">
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/90d8e758-d99e-406b-bcc3-23d3648c8a75.png" />
                      <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/8eae4ef3-ef38-42b5-aaf5-19fb1d3c1d40.png" />
              </div>
              
           </div>
          </div>

           {/* Spatial Design + Image Section */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">
                Spatial Design
              </h2>
                {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">Each chamber embodied its theme through interactive and environmental cues. Gravity: Distorted space, floating objects, and black hole shaders created tension and immersion. Light: Reflective surfaces and reactive illumination highlighted scientific properties. Life: Organic forms suggested biological evolution in an alien ecosystem. Time: Shifting architecture and transitions evoked temporal flow and cosmic cycles.</p>
                {/* 4th image */}
              <div className="w-full mb-8">
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/e12c5252-748d-4ba9-bad7-57ef8697a9a9.png" />
                    </div> 

               {/* Title */}
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">
                Full Playing Video
              </h2>
              
              {/* YouTube Video Player2 */}
              <div className="mb-8">
                  <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-transparent">
                    <AspectRatio ratio={16 / 9} className="w-full">
                      <YouTube videoId="KT0Cwy9s5n8" opts={{
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
                  {/* Title */}
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">
               Evaluation Summary
              </h2>
                 {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true"> The project was evaluated through a mixed-method study with 30 participants across varied age groups and educational backgrounds. Survey findings revealed that 67% found the VR experience helpful in understanding abstract scientific concepts, and the same percentage preferred it over traditional exhibitions for its immersive quality. Gravity (38%) and time (31%) were rated the most impactful scientific themes. Additionally, 67% reported increased interest in science after the VR experience, while 47% expressed excitement about exploring unfamiliar virtual spaces. However, learning effectiveness in such environments was more divided—30% found it effective, 35% neutral, and 35% ineffective—highlighting the need for further design refinement and user adaptation strategies.</p>
                
               </div>
             </div>
             
            
           

           {/* Evaluation Summary */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              
                {/* Description */}
              
               <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">
               Post-Project Expansion
              </h2>
                {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true"> To address limitations in interactivity, a simulation based on evolution was integrated into the experience. Users input variables that influenced how virtual organisms adapted within a bounded environment. This dynamic system enhanced educational engagement and thematic depth within the Life Chamber.</p>

               <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">
               The Ocean (2025)
              </h2>
                {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true"> A responsive virtual ocean simulated autonomous life evolution based on user input. Different environmental conditions triggered emergent behaviours, reinforcing scientific thinking through exploration and experimentation.</p>
              
              {/* 5th image */}
              <div className="w-full mb-8">
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/b4351222-63be-41f6-8fe3-5328dd307929.png" />
                    </div> 
               {/* 6th & 7th & 8th Image */}
              <div className="w-full mb-8">
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/ac448d28-2746-4138-aa1e-5f67ecd7b594.png" />
                      <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/d2e5e774-0ac8-4401-8261-ba9996691882.png" />
                         <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/d2e5e774-0ac8-4401-8261-ba9996691882.png" />
              </div>
             
            
            
            </div>
          </div>
        

          {/* Remaining Images */}
          {project.images.slice(1).map((image, index) => <div key={index + 1} className="mb-20">
              <div className="w-full">
                <AspectRatio ratio={16 / 9} className="w-full">
                  <ImageWithLoading src={image} alt={`${project.title} - Image ${index + 2}`} className="w-full h-full object-cover" />
                </AspectRatio>
              </div>
            </div>)}
        </div>
      </section>
    </div>;
};
export default InvisibleProjectDetail;