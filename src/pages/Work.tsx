
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
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

const projects: Project[] = [
  {
    id: "1",
    title: "Invisible",
    slug: "invisible-space-museum",
    description: "Virtual Reality Contents",
    category: "VR/AR",
    imageUrl: "/lovable-uploads/eec176ba-ebab-43a9-bb78-e6f08c59771b.png"
  },
  {
    id: "2",
    title: "Learn",
    slug: "learn",
    description: "Immersive Virtual Reality Experience",
    category: "VR/AR",
    imageUrl: "/lovable-uploads/6a322fa7-6135-493f-849b-ca1ad98c7b86.png"
  },
  {
    id: "3",
    title: "Thermal Trace",
    slug: "project-3",
    description: "XR & Exhibition Design",
    category: "XR",
    imageUrl: "/lovable-uploads/593420bb-8761-48fc-b4fc-4c74bd31769c.png"
  },
  {
    id: "4",
    title: "Whispers from the Bottom",
    slug: "project-4",
    description: "Exhibition Design",
    category: "Exhibition",
    imageUrl: "/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png"
  },
  {
    id: "5",
    title: "Seoul Nature history Museum",
    slug: "project-5",
    description: "Brand Renewal and Spatial Design",
    category: "Branding",
    imageUrl: "/lovable-uploads/4c29e171-4bbf-4092-854c-13bf32686e5e.png"
  },
  {
    id: "6",
    title: "Island",
    slug: "project-6",
    description: "Public Space Design",
    category: "Spatial",
    imageUrl: "/lovable-uploads/e4ee8415-921a-44fe-bf59-82af2b5be394.png"
  }
];

const Work = () => {
  const headerAnimation = useScrollAnimation<HTMLDivElement>();
  const projectAnimations = projects.map(() => useScrollAnimation<HTMLDivElement>());

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section - 더 미니멀하고 세련된 스타일 */}
      <section className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={headerAnimation.ref}
            className={`transition-all duration-1000 ${
              headerAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <h1 className="text-4xl md:text-6xl font-light mb-4">
                  Work
                </h1>
                <p className="text-lg text-gray-400 max-w-md">
                  A curated selection of our latest projects exploring digital experiences and spatial design.
                </p>
              </div>
              <div className="text-sm text-gray-500 mt-8 md:mt-0">
                ({projects.length} projects)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid - RESN 스타일의 레이아웃 */}
      <section className="pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-0">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={projectAnimations[index].ref}
                className={`group border-t border-gray-800 transition-all duration-700 ${
                  projectAnimations[index].isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link to={`/project/${project.slug}`}>
                  <div className="py-8 md:py-12 hover:bg-gray-900/30 transition-all duration-500 cursor-pointer">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
                      {/* Project Number */}
                      <div className="md:col-span-1">
                        <span className="text-sm text-gray-500 font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Project Info */}
                      <div className="md:col-span-6">
                        <div className="mb-2">
                          <span className="text-xs text-gray-500 uppercase tracking-wider">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-light mb-2 group-hover:text-gray-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base">
                          {project.description}
                        </p>
                      </div>

                      {/* Project Image */}
                      <div className="md:col-span-5">
                        <div className="relative overflow-hidden bg-gray-900 aspect-[4/3] rounded-lg">
                          {project.imageUrl && (
                            <img 
                              src={project.imageUrl} 
                              alt={project.title} 
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                            />
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="py-16 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-light mb-6">
                Let's Create Together
              </h2>
              <p className="text-gray-400 mb-8">
                Ready to bring your vision to life? We're always excited to explore new possibilities and push creative boundaries.
              </p>
              <Link to="/contacts">
                <button className="group relative overflow-hidden bg-white text-black px-8 py-3 transition-all duration-300 hover:bg-gray-100">
                  <span className="relative z-10">Start a Project</span>
                </button>
              </Link>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-light mb-2">Services</h3>
                <div className="text-sm text-gray-400 space-y-1">
                  <div>Virtual & Augmented Reality</div>
                  <div>Exhibition Design</div>
                  <div>Spatial Design</div>
                  <div>Brand Identity</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-light mb-2">Recognition</h3>
                <div className="text-sm text-gray-400 space-y-1">
                  <div>International Museum Association</div>
                  <div>Digital Arts Awards</div>
                  <div>Design Excellence Recognition</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
