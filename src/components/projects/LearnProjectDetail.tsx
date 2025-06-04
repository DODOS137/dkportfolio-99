import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import ModelViewer from '@/components/ModelViewer';
import { learnProjectData } from '@/data/learnProject';
import YouTube from 'react-youtube';
const LearnProjectDetail = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const project = learnProjectData;
  return <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
        <Link to="/work" className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to work
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
            <span>MA Thesis</span>
            <span>•</span>
            <span>Virtual Reality Designer</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="">
        {/* First Image */}
        <div className="w-full">
          <img src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" />
        </div>

        {/* Shared Container */}
        <div className="max-w-[1540px] mx-auto  px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-40">
            <h2 className="text-2xl md:text-3xl mb-8 text-white font-light">
              {project.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-light">
              Set in a dystopian future where humans have vanished, this project followed the journey of three service robots as they continued to perform long-abandoned duties within a decaying library. The player took the role of FR Pro, one of the robots, gradually uncovering the fragments of human memory while learning to interpret empathy and emotion. The project investigated whether emotional understanding could emerge in non-human entities through narrative interaction and symbolic decision-making. Each robot had distinct roles, personalities, and limitations, framing a world where meaning persisted without its makers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">project type</h3>
                <p className="text-white">MA Thesis</p>
                <p className="text-white">(Design Immersive Experience)</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">Project category</h3>
                <p className="text-white">VR Content Design</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">team</h3>
                <p className="text-white">Solo Project</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">DURATION</h3>
                <p className="text-white">8 weeks</p>
              </div>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Approach Section */}
          <div className="rounded-lg bg-transparent">
            <img alt="Planet A233 - VR Environment" src="/lovable-uploads/153d6e31-3d91-407b-913a-171c29388036.png" className="w-full h-auto mb-40" />
            <div className=""> 
              <h2 className="text-2xl font-light text-gray-300 md:text-xl min-w-[200px] mb-8">Approach</h2>
              <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
                The aim was to integrate all key components of VR content—character design, level design, narrative structure, and spatial interaction—into a unified experience. Emphasis was placed on the emotional potential of non-verbal storytelling and how spatial choreography could express moral and symbolic choices. Design decisions were grounded in research into emotional logic, human-object memory, and the aesthetic of decay.
              </p>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Process Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-2xl font-light mb-12 md:text-xl text-gray-300">Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Ideation Phase</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">Brainstorming</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Concept Sketching</p>
                </div>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Analysis</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">Environment Research</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Narrative Flow Mapping</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Precedent Study </p>
                </div>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Design Development</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">Worldbuilding</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Character Design</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Scriptwriting & Storyboarding</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Level Design</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Spatial Design</p>
                </div>
              </div>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Worldbuilding Section */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-2xl md:text-xl font-light text-gray-300 mb-8 min-w-[200px]">
                Worldbuilding
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light mb-40">
                Set in a distant dystopian future, the story took place in a world void of humans, where robots continued to perform their long-obsolete tasks with mechanical precision. These machines, bound to designated zones, preserved human knowledge in silence—echoes of a civilisation long gone.

                The library acted as a symbolic setting for memory and ritual. Through environmental storytelling, the world posed existential questions: When creators vanish, does legacy remain? Can purpose emerge from repetition? 
              </p>
            </div>
          </div>
          
          {/*world Image*/}     
          <div className="w-full">
            <AspectRatio ratio={16 / 9} className="w-full">
              <img alt="Planet A233 - VR Environment" className="w-full h-full" src="/lovable-uploads/2234aeee-ea59-4284-b6f6-58ed4a4141c2.png" />
            </AspectRatio>
          </div>          

          {/* Narrative Concept Section */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent mt-40 flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-2xl mb-8 md:text-xl font-light text-gray-300 min-w-[200px]">Narrative Concept & Logic</h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
                The story followed three robots—FR Pro, RX-056, and LS1-07—as they managed their duties inside the abandoned library. The player, as FR Pro, learned indirectly about empathy by observing the others. A critical moment occurred when the group discovered a dying tree, prompting a moral choice: preserve it or preserve themselves. This symbolised post-human emotional logic—questioning whether machines could perform gestures of empathy without biological emotion. Through ritualistic action, sacrifice became a form of symbolic communication.
              </p>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Character Design Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-2xl mb-8 font-light md:text-xl text-gray-300">Character Design</h2>
            
             <div className="w-full mb-32">
              <img alt="RX-056 Character Design" src="/lovable-uploads/b4ec2d65-81f7-4f6d-99be-3fcfc1b790ed.png" className="w-full h-auto mt-40" />
              </div>
      
            {/* Character Images */}
            <div className="w-full mb-32">
              <img alt="RX-056 Character Design" src="/lovable-uploads/acc09a93-1341-41eb-b938-8bad8f514163.png" className="w-full h-auto mt-16 " />
              <img alt="RX-056 Character Design" src="/lovable-uploads/7a7449ff-c56f-4964-acd1-fcfdeae91b9c.png" className="w-full h-auto mt-40" />
            </div>

            {/* 3D Models */}
            <div className="relative overflow-hidden mb-8">
              <div className="flex w-full">
                <div className="w-1/2">
                  <ModelViewer modelPath="https://sketchfab.com/3d-models/rx056-b62d552b21b8446ebce9f71b85700aa0" isSketchfab={true} />
                </div>
                <div className="w-1/2">
                  <ModelViewer modelPath="https://sketchfab.com/3d-models/ls107-65e7ff25d71f4512829dfc88c5537add" isSketchfab={true} />
                </div>
              </div>
              <div className="pointer-events-none absolute top-0 left-0 w-full h-[100px] bg-black z-[999]" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[100px] bg-black z-[999]" />
            </div>
            
            <h2 className="text-2xl font-light text-center md:text-sm text-gray-700">Click and drag to rotate. Scroll to zoom.</h2>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Scriptwriting & Storyboard Section */}
         
        
          <div className="rounded-lg bg-transparent">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">  
            <h2 className="text-2xl font-light mb-8 md:text-xl text-gray-300 min-w-[200px]">Scriptwriting & Storyboard</h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-400 mb-40 font-light">
              Using VR drawing tools, 3D storyboards simulated first-person navigation and spatial flow, allowing refinement of emotional pacing and level logic early in development.
            </p>
          </div>

            <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-transparent">
              <AspectRatio ratio={16 / 9} className="w-full">
                <YouTube videoId="aCJblmM9yzs" opts={{
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
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Level Design Section */}
         
          
         
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">  
            
            <h2 className="text-2xl font-light md:text-xl text-gray-300 ">Level Design</h2>
            
          </div>

            <img alt="Planet A233 - VR Environment" className="w-full h-auto mb-40" src="/lovable-uploads/65cd8d34-72ad-46a9-b6a8-b54c3e74873a.png" />
          
            
            <div className="w-full ">
              <img alt="Planet A233 - VR Environment" className="w-full h-auto" src="/lovable-uploads/48a61eae-cd06-4f3a-b893-7a18d76443c9.png" />
              <img alt="Planet A233 - VR Environment" src="/lovable-uploads/98c6f72e-e8ff-4a84-9966-5dba0fb2e7df.png" className="w-full h-auto mb-40" />
              <img alt="Planet A233 - VR Environment" className="w-full h-auto" src="/lovable-uploads/82ed2977-afd6-4043-881b-b523083b8a93.png" />
              <img alt="Planet A233 - VR Environment" className="w-full h-auto mb-40" src="/lovable-uploads/eb13ecfc-480b-4823-bb52-d408778963e9.png" />
               </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>
      
          {/* Spatial Design Section */}
          <div className="rounded-lg bg-transparent">
            <div className="w-full">
              <img alt="Planet A233 - VR Environment" src="/lovable-uploads/69b4a2d4-fee6-44be-8e8a-60f3807f0117.png" className="w-full h-auto mb-40" />
            </div> 
            
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-40">
              <h2 className="text-2xl font-light md:text-xl text-gray-300 whitespace-nowrap min-w-[200px]">
                Spatial Design
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
                Each location reinforces narrative through design—guiding player decisions and pacing through spatial sequencing.
              </p>
            </div>
            
            <div className="w-full">
              <img alt="Planet A233 - VR Environment" className="w-full h-auto" src="/lovable-uploads/751b69f0-75d5-4aca-82d4-73ff52116e9d.png" />
            </div> 
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Post-Project Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-2xl font-light md:text-xl text-gray-300 mb-8">
              Post-Project Expansion
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light mb-40">
              To address limitations in interactivity, a simulation based on evolution was integrated into the experience. Users input variables that influenced how virtual organisms adapted within a bounded environment. This dynamic system enhanced educational engagement and thematic depth within the Life Chamber.
            </p>
          </div>
        </div>
      
        {/*Void*/}
        <div className="pb-60 flex items-center justify-center">
          <Link to="/project/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-lg font-medium">
            <span>Next project</span>
            <ArrowRight className="w-5 h-5" />
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
    </div>;
};
export default LearnProjectDetail;