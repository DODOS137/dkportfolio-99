import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
interface ProjectData {
  [key: string]: {
    title: string;
    subtitle: string;
    description: string;
    year: string;
    client: string;
    role: string;
    images: string[];
  };
}
const projectData: ProjectData = {
  "invisible-space-museum": {
    title: "Invisible",
    subtitle: "Scientific Virtual Reality Contents",
    description: "Immersive VR experience designed to make scientific knowledge more accessible to the general public. By translating complex principles into intuitive, interactive environments, the project lowers cognitive barriers and invites curiosity, engagement, and inclusive understanding of science.",
    year: "Solo Project, VR Design & Development Animation, Spatial & Environment Design",
    client: "MA Graduation Project",
    role: "Virtual Content Design & Development",
    images: ["/lovable-uploads/7c2c11ca-8167-4396-b2b1-e8bed16aa6c0.png"]
  },
  "learn": {
    title: "Learn",
    subtitle: "Immersive Virtual Reality Experience",
    description: "A groundbreaking educational platform that revolutionizes learning through immersive virtual reality technology.",
    year: "2023",
    client: "Educational Innovation Institute",
    role: "Lead VR Designer",
    images: ["/lovable-uploads/6a322fa7-6135-493f-849b-ca1ad98c7b86.png"]
  },
  "project-3": {
    title: "Thermal Trace",
    subtitle: "XR & Exhibition Design",
    description: "An innovative mixed reality installation exploring the invisible thermal patterns that surround us in everyday environments.",
    year: "2023",
    client: "Contemporary Art Museum",
    role: "XR Developer & Interaction Designer",
    images: ["/lovable-uploads/593420bb-8761-48fc-b4fc-4c74bd31769c.png"]
  },
  "project-4": {
    title: "Whispers from the Bottom",
    subtitle: "Exhibition Design",
    description: "An immersive exhibition exploring the hidden stories of ocean depths through interactive installations and spatial design.",
    year: "2022",
    client: "Marine Conservation Society",
    role: "Exhibition Designer & Creative Director",
    images: ["/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png"]
  },
  "project-5": {
    title: "Seoul Nature History Museum",
    subtitle: "Brand Renewal and Spatial Design",
    description: "A comprehensive rebranding and spatial redesign project that transformed Seoul's premier natural history institution into a modern, engaging cultural destination.",
    year: "2022",
    client: "Seoul Metropolitan Government",
    role: "Brand Designer & Spatial Architect",
    images: ["/lovable-uploads/4c29e171-4bbf-4092-854c-13bf32686e5e.png"]
  },
  "project-6": {
    title: "Island",
    subtitle: "Public Space Design",
    description: "A transformative public space intervention that reimagines urban islands as community gathering points and cultural catalysts.",
    year: "2022",
    client: "Urban Development Consortium",
    role: "Public Space Designer & Community Strategist",
    images: ["/lovable-uploads/e4ee8415-921a-44fe-bf59-82af2b5be394.png"]
  }
};
const ProjectDetail = () => {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const project = slug ? projectData[slug] : null;
  const heroRef = useScrollAnimation<HTMLDivElement>();
  if (!project) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-white mb-4" data-lovable-editable="true">Project Not Found</h1>
          <Link to="/work" className="text-gray-400 hover:text-white transition-colors" data-lovable-editable="true">
            ← Back to Work
          </Link>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
        <Link to="/work" className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide" data-lovable-editable="true">
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK TO WORK
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={heroRef.ref} className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider" data-lovable-editable="true">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide" data-lovable-editable="true">
            {project.subtitle}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
            <span data-lovable-editable="true">{project.year}</span>
            <span>•</span>
            <span data-lovable-editable="true">{project.client}</span>
            <span>•</span>
            <span data-lovable-editable="true">{project.role}</span>
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section className="pb-20">
        {/* First Image */}
        <div className="mb-20">
          <div className="w-full">
            <AspectRatio ratio={16 / 9} className="w-full">
              <ImageWithLoading src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-full object-cover" />
            </AspectRatio>
          </div>
        </div>

        {/* Project Description Text Box */}
        <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[200px]">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">
              {project.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">
              {project.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">Project type</h3>
                <p className="text-white" data-lovable-editable="true">{project.client}</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">project category</h3>
                <p className="text-white" data-lovable-editable="true">{project.role}</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">role</h3>
                <p className="text-white" data-lovable-editable="true">{project.year}</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">duration</h3>
                <p className="text-white" data-lovable-editable="true">16 weeks</p>
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
export default ProjectDetail;
