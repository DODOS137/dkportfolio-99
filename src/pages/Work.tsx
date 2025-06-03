
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight, Grid, Layers } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  imageUrl?: string;
  videoId?: string;
  koreanDescription?: string;
}

const projects: Project[] = [{
  id: "1",
  title: "Invisible",
  slug: "invisible-space-museum",
  description: "Virtual Reality Contents",
  category: "VR/AR",
  imageUrl: "/lovable-uploads/eec176ba-ebab-43a9-bb78-e6f08c59771b.png"
}, {
  id: "2",
  title: "Learn",
  slug: "learn",
  description: "Immersive Virtual Reality Experience",
  category: "VR/AR",
  imageUrl: "/lovable-uploads/6a322fa7-6135-493f-849b-ca1ad98c7b86.png"
}, {
  id: "3",
  title: "Thermal Trace",
  slug: "project-3",
  description: "XR & Exhibition Design",
  category: "XR",
  imageUrl: "/lovable-uploads/593420bb-8761-48fc-b4fc-4c74bd31769c.png"
}, {
  id: "4",
  title: "Whispers from the Bottom",
  slug: "project-4",
  description: "Exhibition Design",
  category: "Exhibition",
  imageUrl: "/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png"
}, {
  id: "5",
  title: "Seoul Nature history Museum",
  slug: "project-5",
  description: "Brand Renewal and Spatial Design",
  category: "Branding",
  imageUrl: "/lovable-uploads/4c29e171-4bbf-4092-854c-13bf32686e5e.png"
}, {
  id: "6",
  title: "Island",
  slug: "project-6",
  description: "Public Space Design",
  category: "Spatial",
  imageUrl: "/lovable-uploads/e4ee8415-921a-44fe-bf59-82af2b5be394.png"
}];

const Work = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'slider' | 'panel'>('slider');
  const headerAnimation = useScrollAnimation<HTMLDivElement>();

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-20 pb-8 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={headerAnimation.ref} 
            className={`transition-all duration-[2500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              headerAnimation.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-center">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                VIEW ALL PROJECTS
              </p>
              <h1 className="text-3xl md:text-5xl font-light">
               WORK
              </h1>
              
              {/* View Toggle */}
              <div className="flex justify-center mt-8 space-x-4">
                <button 
                  onClick={() => setViewMode('slider')} 
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                    viewMode === 'slider' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span className="text-sm">Slider</span>
                </button>
                <button 
                  onClick={() => setViewMode('panel')} 
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                    viewMode === 'panel' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span className="text-sm">Panel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {viewMode === 'slider' ? (
        /* Main Slider section */
        <section className="relative h-[calc(100vh-200px)] overflow-hidden">
          <div className="relative w-full h-full">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`absolute inset-0 transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                  index === currentSlide 
                    ? 'opacity-100 z-10' 
                    : 'opacity-0 z-0'
                }`}
              >
                <Link to={`/project/${project.slug}`} className="block w-full h-full group">
                  <div className="relative w-full h-full">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-[4000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-8">
                        <span className="text-sm text-gray-300 uppercase tracking-wider block mb-4">
                          {project.category}
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-wide">
                          {project.title}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Previous Project Button - Left */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-50">
            <button onClick={prevSlide} className="text-left hover:opacity-70 transition-opacity p-4">
              <div className="text-sm tracking-wide opacity-60">Previous</div>
            </button>
          </div>

          {/* Next Project Button - Right */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50">
            <button onClick={nextSlide} className="text-right hover:opacity-70 transition-opacity p-4">
              <div className="text-sm tracking-wide opacity-60">Next</div>
            </button>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex items-center gap-8">
              <button onClick={prevSlide} className="p-2 hover:opacity-70 transition-opacity" aria-label="Previous project">
                <ChevronLeft size={24} />
              </button>
              
              <div className="w-16 h-px bg-white/50 relative">
                <div 
                  className="h-full bg-white transition-all duration-300" 
                  style={{
                    width: `${((currentSlide + 1) / projects.length) * 100}%`
                  }} 
                />
              </div>
              
              <button onClick={nextSlide} className="p-2 hover:opacity-70 transition-opacity" aria-label="Next project">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          {/* Slide Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <span className="font-mono">
              {String(currentSlide + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </section>
      ) : (
        /* Panel View */
        <section className="py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className="opacity-100 translate-y-0"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link 
                    to={`/project/${project.slug}`} 
                    className="group relative overflow-hidden bg-gray-900 rounded-lg transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:transform hover:scale-105 block"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-xs text-gray-300 uppercase tracking-wider block mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-light text-white mb-2 group-hover:text-gray-200 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Project Number */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Navigation */}
      <section className="py-8 px-4 md:px-8 bg-black bg-opacity-80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              {viewMode === 'slider' ? 'Use arrow keys or click to navigate' : 'Click on any project to view details'}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
