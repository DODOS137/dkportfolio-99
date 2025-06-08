
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import YouTube from 'react-youtube';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { whispersProjectData } from '@/data/whispersProject';
import ProjectLayout from './shared/ProjectLayout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import BackToTopButton from '@/components/BackToTopButton';

const WhispersProjectDetail = () => {
  const project = whispersProjectData;
  const heroRef = useScrollAnimation();

  return (
    <ProjectLayout>
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
            <span>{project.heroClient}</span>
            <span>•</span>
            <span>{project.heroRole}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="">
        {/* First Image */}
        <div className="max-w-[1540px] mx-auto z-10">
          <img alt={`${project.title} - Image 1`} className="w-full h-auto object-contain" src="/lovable-uploads/f5da6b7e-1ade-4051-a7da-9278562e07dd.png" />
        </div>

        {/* Shared Container */}
        <div className="max-w-[1540px] mx-auto px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-40">
            <h2 className="text-2xl md:text-3xl mb-8 text-white font-light">
              {project.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-light">
              {project.mainDescription}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">project type</h3>
                <p className="text-white">{project.projectType}</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">Project category</h3>
                <p className="text-white">{project.projectCategory}</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">team</h3>
                <p className="text-white">{project.teamType}</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">DURATION</h3>
                <p className="text-white">{project.duration}</p>
              </div>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Approach Section */}
          <div className="rounded-lg bg-transparent">
            <div className="mb-8"> 
              <h2 className="text-2xl font-light text-gray-300 md:text-xl min-w-[200px] mb-8">Approach</h2>
              <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
                {project.approach}
              </p>
            </div>
       
            {/*Development Strategy*/}
            <div className=""> 
              <h2 className="text-2xl font-light text-gray-300 md:text-xl min-w-[200px] mb-8">Development Strategy</h2>
              <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
                {project.development}
              </p>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Process Section */}
          <div className="rounded-lg bg-transparent">
            <h2 className="text-2xl font-light mb-12 md:text-xl text-gray-300">Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Research</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">Marine Ecosystem Study</p>
                </div>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Environmental Design</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">Atmospheric Creation</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Immersive Environments</p>
                </div>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Interactive Media</h3>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm leading-relaxed">Multimedia Installation</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Deep Sea Simulation</p>
                </div>
              </div>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-40 bg-gray-500/50"></div>

          {/* Final Outcome */}
          <div className="rounded-lg bg-transparent">
            <div className="mb-40"> 
              <h2 className="text-2xl font-light text-gray-300 md:text-xl min-w-[200px] mb-8">Final Outcome</h2>
              <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
                An immersive exhibition that successfully translates the mysteries of deep sea environments into tangible experiences through interactive displays and multimedia installations, creating a profound connection between visitors and marine ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/*Navigation Section*/}
      <div className="pb-60 flex items-center justify-center">
        <Link to="/project/project-5" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-lg font-medium">
          <span>Next project</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
      
      <BackToTopButton />
    </ProjectLayout>
  );
};

export default WhispersProjectDetail;
