
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
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
  const headerAnimation = useScrollAnimation<HTMLDivElement>();
  const projectAnimations = projects.map(() => useScrollAnimation<HTMLDivElement>());

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div 
            ref={headerAnimation.ref}
            className={`transition-all duration-1500 ${
              headerAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6">
              Selected
              <br />
              <span className="text-gray-400">Works</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
              A collection of immersive experiences, spatial designs, and virtual reality projects 
              that explore the boundaries of digital interaction and human perception.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={projectAnimations[index].ref}
                className={`group transition-all duration-1500 ${
                  projectAnimations[index].isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Link to={`/project/${project.slug}`}>
                  <div className="relative overflow-hidden bg-gray-900 aspect-[4/3] rounded-lg">
                    {project.imageUrl && (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-end p-6 md:p-8">
                      <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <h3 className="text-2xl md:text-3xl font-light mb-2">{project.title}</h3>
                        <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
            Interested in Collaboration?
          </h2>
          <Link to="/contacts">
            <button className="border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 rounded">
              Let's Talk
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Work;
