
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  videoId?: string;
  koreanDescription?: string; // Added for consistency
}

const projects: Project[] = [
  {
    id: "1",
    title: "Invisible",
    slug: "invisible-space-museum",
    description: "Virtual Reality Contents",
    imageUrl: "/lovable-uploads/eec176ba-ebab-43a9-bb78-e6f08c59771b.png"
  },
  {
    id: "2",
    title: "Learn",
    slug: "learn",
    description: "Immersive Virtual Reality Experience",
    imageUrl: "/lovable-uploads/6a322fa7-6135-493f-849b-ca1ad98c7b86.png"
  },
  {
    id: "3",
    title: "Thermal Trace",
    slug: "project-3",
    description: "XR & Exhibition Design",
    imageUrl: "/lovable-uploads/593420bb-8761-48fc-b4fc-4c74bd31769c.png"
  },
  {
    id: "4",
    title: "Whispers from the Bottom",
    slug: "project-4",
    description: "Exhibition Design",
    imageUrl: "/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png"
  },
  {
    id: "5",
    title: "Seoul Nature history Museum",
    slug: "project-5",
    description: "Brand Renewal and Spatial Design",
    imageUrl: "/lovable-uploads/4c29e171-4bbf-4092-854c-13bf32686e5e.png"
  },
  {
    id: "6",
    title: "Island",
    slug: "project-6",
    description: "Public Space Design",
    imageUrl: "/lovable-uploads/e4ee8415-921a-44fe-bf59-82af2b5be394.png"
  }
];

const Work = () => {
  const titleAnimation = useScrollAnimation<HTMLHeadingElement>();
  const gridAnimation = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-black overflow-y-auto">
      <Navbar />
      <main className="pt-20 md:pt-24 px-4 md:px-8 pb-16">
        <div className="max-w-5xl mx-auto mt-4 md:mt-8">
          <h1 
            ref={titleAnimation.ref}
            className={`text-2xl md:text-4xl font-bold text-white mb-4 md:mb-8 transition-all duration-1000 ${
              titleAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            Work
          </h1>
          <div 
            ref={gridAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 transition-all duration-1000 delay-300 ${
              gridAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            {projects.map((project, index) => (
              <Link 
                key={project.id} 
                to={`/project/${project.slug}`}
                className={`bg-[#333] aspect-video flex items-center justify-center group relative overflow-hidden hover:bg-[#444] transition-all duration-300 border border-white/80 ${
                  gridAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: gridAnimation.isVisible ? `${index * 100 + 500}ms` : '0ms'
                }}
              >
                {project.imageUrl && (
                  <div className="absolute inset-0 opacity-70 group-hover:opacity-40 transition-opacity">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center flex-col space-y-1 md:space-y-2 p-4 z-10">
                  <p className="text-white text-center text-base md:text-xl font-medium">{project.title}</p>
                  <p className="text-gray-300 text-center text-xs md:text-sm group-hover:opacity-100 transition-opacity">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Work;
