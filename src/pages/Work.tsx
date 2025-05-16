
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
  return <div className="min-h-screen bg-black overflow-y-auto">
      <Navbar />
      <main className="pt-24 md:pt-16 px-4 md:px-8 pb-16">
        <div className="max-w-5xl mx-auto mt-8 md:mt-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">Work</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {projects.map((project) => (
              <Link 
                key={project.id} 
                to={`/project/${project.slug}`}
                className="bg-[#333] aspect-video flex items-center justify-center group relative overflow-hidden hover:bg-[#444] transition-colors duration-300 border border-white"
              >
                {project.imageUrl && (
                  <div className="absolute inset-0 opacity-80 group-hover:opacity-50 transition-opacity">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center flex-col space-y-2 p-4 z-10">
                  <p className="text-white text-center text-lg md:text-xl font-medium">{project.title}</p>
                  <p className="text-gray-300 text-center text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>;
};

export default Work;
