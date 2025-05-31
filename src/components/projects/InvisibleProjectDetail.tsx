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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
        <Link
          to="/work"
          className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span data-lovable-editable="true">Back to work page</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div
          ref={heroRef.ref}
          className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider" data-lovable-editable="false">
            {project.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide" data-lovable-editable="false">
            {project.heroSubtitle}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
            <span data-lovable-editable="false">{project.heroYear}</span>
            <span data-lovable-editable="false">•</span>
            <span data-lovable-editable="false">{project.heroClient}</span>
            <span data-lovable-editable="false">•</span>
            <span data-lovable-editable="false">{project.heroRole}</span>
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section className="pb-20">
        {/* First Image */}
        <div className="mb-20">
          <div className="w-full">
            <AspectRatio ratio={16 / 9} className="w-full">
              <ImageWithLoading
                src={project.images[0]}
                alt={`${project.title} - Image 1`}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>

        {/* Project Description Text Box */}
        <div className="max-w-[1540px] mx-auto mb-32 px-6 md:px-[150px]">
          <div className="relative z-10 bg-transparent py-0 px-0">
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="false">
              {project.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">
              {project.mainDescription}
            </p>

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
        {project.videoId && (
          <div className="max-w-[1540px] mx-auto mb-32 px-6 md:px-[150px] relative z-10" data-lovable-editable="false">
            <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-transparent">
              <AspectRatio ratio={16 / 9} className="w-full">
                <YouTube
                  videoId={project.videoId}
                  opts={{
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
                      theme: 'dark',
                    },
                  }}
                  className="w-full h-full"
                  iframeClassName="w-full h-full border-0"
                />
              </AspectRatio>
            </div>
          </div>
        )}

        {/* Approach and Development Strategy */}
        <div className="max-w-[1540px] mx-auto mb-32 px-6 md:px-[150px]" data-lovable-editable="false">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Approach</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">
              {project.approach}
            </p>

            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Development Strategy</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed" data-lovable-editable="true">
              {project.development}
            </p>
          </div>
        </div>

        {/* Process Section */}
        <div className="max-w-[1540px] mx-auto mb-32 px-6 md:px-[150px]" data-lovable-editable="false">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <h2 className="text-2xl md:text-3xl font-light mb-12 text-white" data-lovable-editable="true">Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Cards... */}
              {/* (Card content omitted for brevity) */}
            </div>

            {/* Preliminary Research */}
            <div className="max-w-[1540px] mx-auto mb-32 px-6 md:px-[150px] relative z-10" data-lovable-editable="true">
              <div className="rounded-lg p-8 md:p-12 bg-transparent py-[50px] px-0">
                <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">
                  Preliminary Research
                </h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">
                  {project.approach}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Remaining Images */}
        {project.images.slice(1).map((image, index) => (
          <div key={index + 1} className="mb-20">
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <ImageWithLoading
                  src={image}
                  alt={`${project.title} - Image ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default InvisibleProjectDetail;
