
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { thermalTraceProjectData } from '@/data/thermalTraceProject';
import BackToTopButton from '@/components/BackToTopButton';

const ThermalTraceProjectDetail = () => {
  console.log("ThermalTraceProjectDetail rendering...");
  
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const project = thermalTraceProjectData;

  console.log("Project data loaded:", project);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-6 md:py-8">
        <Link to="/work" className="inline-flex items-center gap-3 pl-2 pr-4 text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to work</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          ref={heroRef.ref} 
          className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            heroRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
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

      {/* Content Section */}
      <section className="pb-20">
        {/* First Image */}
        <div className="w-full h-auto">
          <AspectRatio ratio={16 / 9} className="w-full h-auto">
            <ImageWithLoading 
              src={project.images[0]} 
              alt={`${project.title} - Hero Image`} 
              className="w-full h-full object-contain" 
            />
          </AspectRatio>
        </div>

        {/* Project Description Container */}
        <div className="max-w-[1540px] mx-auto px-6 md:px-[200px] z-10 relative">
          
          {/* Project Description */}
          <div className="mb-32 pt-20">
            <div className="rounded-lg py-[50px] bg-transparent">
              <h2 className="text-2xl md:text-3xl mb-8 text-white font-light">{project.title}</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8 md:text-xl font-light">
                {project.mainDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2">Project Type</h3>
                  <p className="text-white font-light">{project.projectType}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2">Category</h3>
                  <p className="text-white font-light">{project.projectCategory}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2">Team</h3>
                  <p className="text-white font-light">{project.teamType}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2">Duration</h3>
                  <p className="text-white font-light">{project.duration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Approach & Development */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              <div className="mb-12">
                <h2 className="text-2xl md:text-xl text-white font-light mb-8">Approach</h2>
                <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
                  {project.approach}
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl md:text-xl text-white font-light mb-8">Development Strategy</h2>
                <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
                  {project.development}
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-32">
            <div className="rounded-lg py-[50px] bg-transparent">
              <h2 className="text-2xl md:text-xl text-white font-light mb-8">Technology Stack</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-light text-white mb-4">AR Framework</h3>
                  <p className="text-gray-400 text-sm">Unity3D with ARCore/ARKit integration for cross-platform augmented reality experiences</p>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-light text-white mb-4">Thermal Imaging</h3>
                  <p className="text-gray-400 text-sm">FLIR thermal cameras with custom SDK integration for real-time data capture</p>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-light text-white mb-4">Data Processing</h3>
                  <p className="text-gray-400 text-sm">Machine learning algorithms for thermal pattern recognition and visualization</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Navigation */}
      <div className="pb-40 flex items-center justify-center">
        <Link 
          to="/project/project-4" 
          className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-lg font-medium"
        >
          <span>Next project</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
};

export default ThermalTraceProjectDetail;
