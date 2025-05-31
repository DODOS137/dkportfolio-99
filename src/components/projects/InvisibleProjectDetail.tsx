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
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">
                  An online and offline survey involving over 300 participants was conducted to examine the limitations of traditional science exhibitions and gauge interest in immersive educational technologies. Results indicated that 73% of respondents believed conventional science displays lacked engaging spatial formats and narrative clarity. Furthermore, 76% expressed a desire for immersive VR-based experiences to better understand abstract scientific concepts. These insights informed the design rationale and validated the project's direction.
                </p>
              </div>
            </div>
          </div>

         {/* Worldbuilding + Image Section */}
<div className="mb-32">
  <div className="rounded-lg py-[50px] bg-transparent">
    <h2
      className="text-2xl md:text-3xl font-light mb-8 text-white"
      data-lovable-editable="true"
    >
      Worldbuilding
    </h2>
    <p
      className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
      data-lovable-editable="true"
    >
      Set on a fictional alien planet inhabited by an advanced civilisation. The player, as an interstellar explorer, uncovered abandoned structures, artefacts, and messages. Despite a lack of shared language, both species were assumed to understand the same laws of nature. The narrative explored how universal science transcended cultural boundaries.
    </p>

    {/* Image directly below content and inside the same wrapper */}
    <div className="w-full">
      <AspectRatio ratio={16 / 9} className="w-full">
        <img
          src="/lovable-uploads/3c3c9050-0741-450e-a164-f1dd5c4e7296.png"
          alt="Planet A233 - VR Environment"
          className="w-full h-full object-cover"
          data-lovable-editable="true"
        />
      </AspectRatio>
    </div>
  </div>
</div>

          {/* Narrative Arc – The Explorer’s Journey &Emotional Logic */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Narrative Arc – The Explorer’s Journey</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true"> The experience followed a narrative arc centred around an unnamed interstellar explorer. Beginning with arrival on Planet A233, the user journeyed through a sequence of abandoned chambers, each corresponding to a universal scientific principle. The order of progression was intentionally designed to mirror an epistemological transformation—from perception to comprehension. As the user advanced, they transitioned from a sense of wonder and disorientation to clarity and resonance, ultimately recognising science as a shared, emotional, and symbolic language.</p>
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Emotional Logic</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed" data-lovable-editable="true">The spatial progression of the chambers was crafted not only to convey scientific ideas, but to evoke a coherent emotional rhythm. Gravity aimed to instil awe and tension through vast, distorted space. Light encouraged curiosity and wonder through refractive spectacle. Life evoked empathy through growth and unpredictability. Time concluded the experience with a quiet sense of introspection and impermanence. These emotional states were interwoven with the scientific themes, reinforcing understanding by making abstract concepts experientially felt.</p>
            </div>
          </div>

           {/* Videodevelopment + Image Section */}
<div className="mb-32">
  {/* Image directly below content and inside the same wrapper */}
    <div className="w-full">
      <AspectRatio ratio={16 / 9} className="w-full">
        <img
          src="/lovable-uploads/3c3c9050-0741-450e-a164-f1dd5c4e7296.png"
          alt="Planet A233 - VR Environment"
          className="w-full h-full object-cover"
          data-lovable-editable="true"
        />
      </AspectRatio>
    </div>
  <div className="rounded-lg py-[50px] bg-transparent">
    <h2
      className="text-2xl md:text-3xl font-light mb-8 text-white"
      data-lovable-editable="true"
    >
      Worldbuilding
    </h2>
    <p
      className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
      data-lovable-editable="true"
    >
      Set on a fictional alien planet inhabited by an advanced civilisation. The player, as an interstellar explorer, uncovered abandoned structures, artefacts, and messages. Despite a lack of shared language, both species were assumed to understand the same laws of nature. The narrative explored how universal science transcended cultural boundaries.
    </p>

    
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