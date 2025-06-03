import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

      {/* Images Section */}
      <section className="pb-20" data-lovable-editable="true">
        {/* First Image */}
        <div className="mb-20">
          <div className="w-full">
            <img src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" data-lovable-editable="true" />
          </div>
        </div>

        {/* Project Description Text Box */}
        <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[150px]">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <h2 className="text-2xl md:text-3xl mb-8 text-white font-light">
              {project.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
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
        </div>

        {/* Approach and Development Strategy */}
        <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[150px]">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <img alt="Planet A233 - VR Environment" data-lovable-editable="true" src="/lovable-uploads/153d6e31-3d91-407b-913a-171c29388036.png" className="w-full h-auto pb-8" />
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16"> 
            <h2 className="text-2xl font-light mb-8  md:text-xl text-gray-500">Approach</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              The aim was to integrate all key components of VR content—character design, level design, narrative structure, and spatial interaction—into a unified experience. Emphasis was placed on the emotional potential of non-verbal storytelling and how spatial choreography could express moral and symbolic choices. Design decisions were grounded in research into emotional logic, human-object memory, and the aesthetic of decay.
            </p>
          </div>
        </div>
        </div>

        {/* Process Section - Separate Container */}
        <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[150px]">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <h2 className="text-2xl font-light mb-12 md:text-xl text-gray-500">Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
        </div>

        {/* Shared Container */}
        <div className="max-w-[1540px] mx-auto px-6 md:px-[200px] z-10 relative -mt-[0%]">
          {/* Worldbuilding + Image Section */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">
                Worldbuilding
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">
               Set in a distant dystopian future, the story took place in a world void of humans, where robots continued to perform their long-obsolete tasks with mechanical precision. These machines, bound to designated zones, preserved human knowledge in silence—echoes of a civilisation long gone.

  The library acted as a symbolic setting for memory and ritual. Through environmental storytelling, the world posed existential questions: When creators vanish, does legacy remain? Can purpose emerge from repetition? 
              </p>

              {/* world image */}
              <div className="w-full">
                <AspectRatio ratio={16 / 9} className="w-full">
                  <img alt="Planet A233 - VR Environment" className="w-full h-full" data-lovable-editable="true" src="/lovable-uploads/1482eec7-ab0c-4bf5-8d36-c7b0a10c5b1b.png" />
                </AspectRatio>
              </div>
            </div>
          </div>

          {/* Narrative Concept & Logic */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Narrative Concept & Logic</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true"> The story followed three robots—FR Pro, RX-056, and LS1-07—as they managed their duties inside the abandoned library. The player, as FR Pro, learned indirectly about empathy by observing the others. A critical moment occurred when the group discovered a dying tree, prompting a moral choice: preserve it or preserve themselves. This symbolised post-human emotional logic—questioning whether machines could perform gestures of empathy without biological emotion. Through ritualistic action, sacrifice became a form of symbolic communication.
              </p>
            </div>
          </div>

          {/* Character Design */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              <h2 data-lovable-editable="true" className="text-2xl md:text-3xl mb-8 text-white font-light">Character Design</h2>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-2" data-lovable-editable="true">• FR Pro (Player)</p> 
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">A passive cleaning robot with minimal initiative, performing support tasks.
              </p>

              <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-2" data-lovable-editable="true">• RX-056</p> 
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">A humanoid archival robot that displayed thoughts via facial screen and built understanding through books.
              </p> 
              
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-2" data-lovable-editable="true">• LS1-07</p> 
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">An AI-driven commander capable of speech, managing logistics and group decisions.
              </p>
        
              {/* RX-056 Image */}
              <div className="w-full mb-32">
                <img alt="RX-056 Character Design" data-lovable-editable="true" src="/lovable-uploads/3a76d550-d6d3-4963-9dd6-538d92cd779e.png" className="w-full h-auto mb-8" />
                <img alt="RX-056 Character Design" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/af70df56-7b0b-4eb6-b02a-535d5e7bab82.png" />
              </div>

             {/* RX-056 LS1-07 3D Model */}
             <div className="relative overflow-hidden">
               <div className="flex w-full">
                 <div className="w-1/2">
                   <ModelViewer modelPath="https://sketchfab.com/3d-models/rx056-b62d552b21b8446ebce9f71b85700aa0" isSketchfab={true} />
                 </div>
                 <div className="w-1/2">
                   <ModelViewer modelPath="https://sketchfab.com/3d-models/ls107-65e7ff25d71f4512829dfc88c5537add" isSketchfab={true} />
                 </div>
               </div>
               {/* 인터페이스 가리기 */}
               <div className="pointer-events-none absolute top-0 left-0 w-full h-[100px] bg-black z-[999]" />
               <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[100px] bg-black z-[999]" />
             </div>
              
              {/* RX-056 3D Model indicator */}
              <div className="mb-32">
                <div className="rounded-lg bg-transparent py-0">
                  <h2 data-lovable-editable="true" className="text-2xl mb-8 text-gray-400 font-light text-center md:text-sm">Click and drag to rotate. Scroll to zoom.</h2>
                </div>
              </div>

              {/* Scriptwriting & Storyboard */}
              <div className="mb-32">
                <div className="rounded-lg py-[50px] bg-transparent">
                  <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Scriptwriting & Storyboard</h2>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true"> Using VR drawing tools, 3D storyboards simulated first-person navigation and spatial flow, allowing refinement of emotional pacing and level logic early in development.
                  </p>

                  {/* YouTube Video */}
              <div className="mb-0">
                <div className="rounded-lg py-[50px] bg-transparent">
                  <div className="w-full max-w-4xl mx-auto">
                    <YouTube videoId="aCJblmM9yzs" opts={{
                        width: '100%',
                        height: '400',
                        playerVars: {
                          autoplay: 0
                        }
                      }} className="w-full" />
                  </div>
                </div>
              </div>
                  
                </div>
              </div>

              {/* Level Design */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Level Design</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true"> The player navigated through interconnected zones, uncovering narrative fragments and artefacts that unlocked the core event.
              </p>
              {/* Level design Images */}
              <div className="w-full mb-8">
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/48a61eae-cd06-4f3a-b893-7a18d76443c9.png" />
                <img alt="Planet A233 - VR Environment" className="w-full h-auto" data-lovable-editable="true" src="/lovable-uploads/d4995d22-3bdd-4625-a6dd-1b2a9fdf6d2f.png" />
              </div>
              
            </div>
             </div>


              
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
      </section>
    </div>;
};
export default LearnProjectDetail;