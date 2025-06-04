import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import YouTube from 'react-youtube';
import { invisibleProjectData } from '@/data/invisibleProject';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import BackToTopButton from '@/components/BackToTopButton';
const InvisibleProjectDetail = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const project = invisibleProjectData;
  const sliderImages = ["/lovable-uploads/1226e7bd-a3b6-4ca8-a21a-f9fe6b747eba.png", "/lovable-uploads/b98a6c0c-ecf1-4cd1-8425-1d5a82e848ad.png", "/lovable-uploads/ea8daafc-845b-416a-87fd-526d63257efd.png", "/lovable-uploads/7dbae072-a951-477f-8d90-a4cd262da27a.png", "/lovable-uploads/67404269-7e30-45dd-b380-5c5c9d441ea5.png"];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
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
        <div className="w-full h-auto pb-40">
          <AspectRatio ratio={16 / 9} className="w-full h-auto">
            <ImageWithLoading src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-full object-contain" data-lovable-editable="true" />
          </AspectRatio>
        </div>

        {/* Shared Container */}
        <div className="max-w-[1540px] mx-auto px-6 md:px-[200px] z-10 relative -mt-[0%]">
          {/* Project Description */}
          <div className="">
            <div className="rounded-lg bg-transparent ">
              <h2 data-lovable-editable="true" className="text-2xl md:text-3xl mb-8 text-white font-light">{project.title}</h2>
              <p data-lovable-editable="true" className="text-lg text-gray-300 leading-relaxed mb-8 md:text-xl font-light">{project.mainDescription}</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">project type</h3>
                  <p data-lovable-editable="true" className="text-white font-light">{project.projectType}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">Project category</h3>
                  <p data-lovable-editable="true" className="text-white font-light">VR Contents Design</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">ROLE</h3>
                  <div>
                    <p data-lovable-editable="true" className="text-white font-normal">{project.teamType}</p>
                  </div>  
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">DURATION</h3>
                  <p data-lovable-editable="true" className="text-white font-light">{project.duration}</p>
                </div>
              </div>
            </div>
          </div>

         
          
          
          
          {/*Line*/} <div className="w-full h-px my-40 bg-gray-500/50"></div>

         
          
          
          
          
          {/* YouTube Video Player */}
          {project.videoId && <div className="">
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
          <div className="">
            <div className="rounded-lg bg-transparent ">
              {/* Approach Section */}
              <div className="">
                <h2 data-lovable-editable="true" className="text-2xl md:text-xl text-white font-light mb-8 mt-40">
                  Approach
                </h2>
                <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed font-light text-gray-400  mb-8">
                  {project.approach}
                </p>
              </div>

              {/* Development Strategy Section */}
              <div className="">
                <h2 data-lovable-editable="true" className="text-2xl md:text-xl text-white font-light mb-8">
                  Development Strategy
                </h2>
                <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
                  {project.development}
                </p>
              </div>
            </div>
          </div>



          {/*Line*/} <div className="w-full h-px my-40 bg-gray-500/50"></div>


          

          {/* Process Section */}
          <div className="">
            <div className="rounded-lg bg-transparent">
              <h2 data-lovable-editable="true" className="text-2xl mb-8 text-gray-300 font-light md:text-xl">Process</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                  <h3 className="text-xl font-light text-white mb-4" data-lovable-editable="true">Ideation Phase</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Brainstorming</p>
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Concept Sketching</p>
                  </div>
                </div>

                <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                  <h3 className="text-xl font-light text-white mb-4" data-lovable-editable="true">Analysis</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Context & Problem Analysis</p>
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Survey</p>
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Narrative Flow Mapping</p>
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Precedent Study </p>
                  </div>
                </div>

                <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                  <h3 className="text-xl font-light text-white mb-4" data-lovable-editable="true">Design Development</h3>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Worldbuilding</p>
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Video Development</p>
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Level Design</p>                                                                                                  
                    <p className="text-gray-400 text-sm leading-relaxed" data-lovable-editable="true">Spatial Design</p>          
                  </div>
                </div>
              </div>

              {/* Preliminary Research – Survey Data */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
                <div className="rounded-lg bg-transparent  mt-40">
                  <h2 data-lovable-editable="true" className="text-2xl font-light mb-8 text-gray-300 md:text-xl">Preliminary Research</h2>
                  <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">An online and offline survey involving 306 participants was conducted to examine the limitations of traditional science exhibitions and gauge interest in immersive educational technologies. Results indicated that 73% (223) of respondents believed conventional science displays lacked engaging spatial formats and narrative clarity. Furthermore, 76% (233) expressed a desire for immersive VR-based experiences to better understand abstract scientific concepts. These insights informed the design rationale and validated the project's direction.</p>
                </div>
              </div>
            </div>
          </div>


          
          {/*Line*/} <div className="w-full h-px my-40 bg-gray-500/50"></div>

          

          {/* Worldbuilding + Image Section */}
          <div className="">
            {/* world image */}
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <img src="/lovable-uploads/3c3c9050-0741-450e-a164-f1dd5c4e7296.png" alt="Planet A233 - VR Environment" data-lovable-editable="true" className="w-full h-full " />
              </AspectRatio>
            </div>

            {/* Worldbuilding*/}
            <div className="rounded-lg  bg-transparent">
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16  mt-40">
                <h2 className="text-2xl font-light min-w-[200px] md:text-xl text-gray-300 whitespace-nowrap" data-lovable-editable="true">
                  Worldbuilding
                </h2>
                <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
                  Set on a fictional alien planet inhabited by an advanced civilisation. The player, as an interstellar explorer, uncovered abandoned structures, artefacts, and messages. Despite a lack of shared language, both species were assumed to understand the same laws of nature. The narrative explored how universal science transcended cultural boundaries.
                </p>
              </div>
            </div>
          </div>


         {/*Line*/} <div className="w-full h-px my-40 bg-gray-500/50"></div>

          

          {/* Narrative Arc – The Explorer's Journey & Emotional Logic */}
          <div className="">
            {/* DNA Image */}
            <div className="w-full">
              <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/c1d66b75-3492-498c-b403-7745f0656549.png" />
            </div>

            <div className="rounded-lg bg-transparent ">
              {/* Section 1 */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-40">
                <h2 data-lovable-editable="true" className="text-2xl font-light md:text-xl text-gray-300 whitespace-nowrap min-w-[200px]">
                  Narrative Arc
                </h2>
                <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
                  The experience followed a narrative arc centred around an unnamed interstellar explorer. Beginning with arrival on Planet A233, the user journeyed through a sequence of abandoned chambers, each corresponding to a universal scientific principle. The order of progression was intentionally designed to mirror an epistemological transformation—from perception to comprehension. As the user advanced, they transitioned from a sense of wonder and disorientation to clarity and resonance, ultimately recognising science as a shared, emotional, and symbolic language.
                </p>
              </div>

              {/* Section 2 */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-8">
                <h2 data-lovable-editable="true" className="text-2xl font-light md:text-xl text-gray-300 whitespace-nowrap min-w-[200px]">
                  Emotional Logic
                </h2>
                <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
                  The spatial progression of the chambers was crafted not only to convey scientific ideas, but to evoke a coherent emotional rhythm. Gravity aimed to instil awe and tension through vast, distorted space. Light encouraged curiosity and wonder through refractive spectacle. Life evoked empathy through growth and unpredictability. Time concluded the experience with a quiet sense of introspection and impermanence. These emotional states were interwoven with the scientific themes, reinforcing understanding by making abstract concepts experientially felt.
                </p>
              </div>
            </div>
          </div>

          {/* Video development + Image Section */}
          <div className="">
            {/* Video Image */}
            <div className="w-full">
              <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/8ef06019-dad8-43fc-b25b-4b7192935c0c.png" />
            </div>

            {/* Video Development */}
            <div className="rounded-lg bg-transparent ">
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
                <h2 data-lovable-editable="true" className="text-2xl font-light md:text-xl text-gray-300 whitespace-nowrap min-w-[200px]">
                  Video Development
                </h2>
                <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
                  Short video sequences functioned as interludes, each exploring a scientific theme (gravity, light, life, or time) through surreal, symbolic visuals. These videos presented abstract interpretations of cosmic phenomena, expanding the narrative and providing an emotional entry point to complex ideas.
                </p>
              </div>
            </div>
          </div>

          {/* Level Design */}
          <div className="">
            <div className="rounded-lg bg-transparent">
              {/* Level Design */}
              <h2 data-lovable-editable="true" className="text-2xl font-light md:text-xl text-gray-300">
                Level Design
              </h2>

              {/* Level Design Image */}
              <div className="w-full mb-8">
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/90d8e758-d99e-406b-bcc3-23d3648c8a75.png" />
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/8eae4ef3-ef38-42b5-aaf5-19fb1d3c1d40.png" />
              </div>
            </div>
          </div>

          {/* Spatial Design + Image Section */}
          <div className="">
            <div className="rounded-lg bg-transparent">
              {/* Spatial Design image */}
              <div className="w-full mb-8">
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/e12c5252-748d-4ba9-bad7-57ef8697a9a9.png" />
              </div> 
              
              {/* Spatial Design */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16 ">
                <h2 data-lovable-editable="true" className="text-2xl font-light md:text-xl text-gray-300 whitespace-nowrap min-w-[200px]">
                  Spatial Design
                </h2>
                <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
                  Each chamber embodied its theme through interactive and environmental cues. Gravity: Distorted space, floating objects, and black hole shaders created tension and immersion. Light: Reflective surfaces and reactive illumination highlighted scientific properties. Life: Organic forms suggested biological evolution in an alien ecosystem. Time: Shifting architecture and transitions evoked temporal flow and cosmic cycles.
                </p>
              </div>

              {/* Title */}
              <h2 data-lovable-editable="true" className="text-2xl font-light md:text-xl text-gray-300">
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

              {/* Evaluation Summary */}
              <h2 data-lovable-editable="true" className="text-2xl font-light  md:text-xl text-gray-300">
                Evaluation Summary
              </h2>

              {/* Description */}
              <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed  text-gray-400 font-light"> The project was evaluated through a mixed-method study with 30 participants across varied age groups and educational backgrounds. Survey findings revealed that 67% found the VR experience helpful in understanding abstract scientific concepts, and the same percentage preferred it over traditional exhibitions for its immersive quality. Gravity (38%) and time (31%) were rated the most impactful scientific themes. Additionally, 67% reported increased interest in science after the VR experience, while 47% expressed excitement about exploring unfamiliar virtual spaces. However, learning effectiveness in such environments was more divided—30% found it effective, 35% neutral, and 35% ineffective—highlighting the need for further design refinement and user adaptation strategies.</p>
            </div>
          </div>

          {/* Post-Project */}
          <div className="">
            <div className="rounded-lg bg-transparent">
              {/* Title */}
              <h2 data-lovable-editable="true" className="text-2xl font-light md:text-xl text-gray-300">
                Post-Project Expansion
              </h2>

              {/* Description */}
              <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed mb-8 text-gray-400 font-light"> To address limitations in interactivity, a simulation based on evolution was integrated into the experience. Users input variables that influenced how virtual organisms adapted within a bounded environment. This dynamic system enhanced educational engagement and thematic depth within the Life Chamber.</p>

              <h2 data-lovable-editable="true" className="text-2xl font-light mb-8 md:text-xl text-gray-300">
                The Ocean (2025)
              </h2>
              {/* Description */}
              <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed mb-8 text-gray-400 font-light">Originally developed as a conceptual prototype in 2022, The Ocean explored autonomous evolution through interactive simulation. Users entered a liquid-metal (like virtual sea, where their input) commands and data generated living forms. These began as spheres and evolved through self-replication, mutation, and environmental adaptation. Each of the four zones (OCEAN A–D) responded differently depending on user behaviour. Some environments expanded exponentially through interaction, while others diminished due to inactivity. Over time, this created a dynamic ecology shaped by user engagement and emergent logic.</p>

              {/* 5th & 5-1 image */}
              <div className="w-full mb-8">
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/b4351222-63be-41f6-8fe3-5328dd307929.png" />
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/e59b9231-29a1-4281-a51d-f6b88b3b2754.png" />
              </div> 
            </div>
          </div>

          {/* 6th & 7th & 8th Image */}
          <div className="w-full ">
            <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/fa8b3919-07d8-4526-be0b-bc8fc17a65ad.png" />
            <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/0e3392f5-3c64-49f8-8f2e-b596c7825eb9.png" />
            <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/521c678d-b282-4234-b283-b5e10cc689b7.png" />
          </div>

          {/* 9th Image */}
          <div className="w-full ">
            <img alt="Planet A233 - VR Environment" data-lovable-editable="true" src="/lovable-uploads/4e61eb63-34b2-41a8-ba00-18c70125dd28.png" className="w-full h-auto pb-8" />
            <div className="rounded-lg  bg-transparent">
              <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
                The virtual creatures (visually inspired by early organic matter) formed clusters akin to coral colonies. As they proliferated, they merged, divided, and restructured their environments, resulting in uniquely generated spatial compositions across time. The system visualised life as a procedural and decentralised phenomenon, echoing evolutionary patterns found in Earth's primitive seas.
              </p>
            </div>

            {/* 10th Image */}
            <div className="w-full ">
              <img alt="Planet A233 - VR Environment" data-lovable-editable="true" src="/lovable-uploads/c98f26de-0fe3-414b-9b0e-704fe61c8d71.png" className="w-full h-auto pb-24" />
              <p data-lovable-editable="true" className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
                The exponential growth demonstrated how input-based virtual ecosystems could reflect evolutionary processes, offering a new spatial metaphor for understanding complexity, mutation, and environmental feedback.
              </p>
            </div>
          </div>

          {/* Custom Slider */}
          <div className="w-full">
            <Carousel className="w-full bg-black" setApi={setApi} opts={{
            loop: true
          }}>
              <CarouselContent>
                {sliderImages.map((image, index) => <CarouselItem key={index}>
                    <div className="relative w-full">
                      <AspectRatio ratio={16 / 9} className="w-full">
                        <img src={image} alt={`Slider image ${index + 1}`} className="w-full h-full object-cover" />
                      </AspectRatio>
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white hover:bg-white/10 w-12 h-12" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white hover:bg-white/10 w-12 h-12" />
            </Carousel>

            {/* Bar-shaped indicators below the slider */}
            <div className="flex justify-center space-x-2 mt-6">
              {sliderImages.map((_, index) => <div key={index} className={`w-6 h-0.5 cursor-pointer transition-all duration-300 ${current === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`} onClick={() => api?.scrollTo(index)} />)}
            </div>
          </div>
        </div>
      </section>

      {/*Void*/}
      <div className="pb-40 flex items-center justify-center">
        <Link to="/project/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-lg font-medium">
          <span>Next project</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Remaining Images */}
      <div className="max-w-[1540px] mx-auto px-6 md:px-[200px]">
        {project.images.slice(1).map((image, index) => <div key={index + 1} className="pb-40">
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <ImageWithLoading src={image} alt={`${project.title} - Image ${index + 2}`} className="w-full h-full object-cover" />
              </AspectRatio>
            </div>
          </div>)}
      </div>

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>;
};
export default InvisibleProjectDetail;