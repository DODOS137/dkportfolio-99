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
    challenge: string;
    solution: string;
    result: string;
    year: string;
    client: string;
    role: string;
    images: string[];
    videoId?: string;
  };
}
const projectData: ProjectData = {
  "invisible-space-museum": {
    title: "Invisible",
    subtitle: "Scientific Virtual Reality Contents",
    description: "Immersive VR experience designed to make scientific knowledge more accessible to the general public. By translating complex principles into intuitive, interactive environments, the project lowers cognitive barriers and invites curiosity, engagement, and inclusive understanding of science.",
    challenge: "Making complex scientific concepts accessible to general audiences",
    solution: "Developed intuitive VR environments that translate abstract principles into interactive experiences",
    result: "Enhanced public engagement with science through immersive technology",
    year: "2024",
    client: "Virtual Reality Design",
    role: "VR Developer & Experience Designer",
    images: ["/lovable-uploads/b0dfe25f-e5d6-43e8-9b65-25b4fb983640.png"]
  },
  "learn": {
    title: "Learn",
    subtitle: "Immersive Virtual Reality Experience",
    description: "A groundbreaking educational platform that revolutionizes learning through immersive virtual reality technology.",
    challenge: "Traditional learning methods lack engagement and retention",
    solution: "Created immersive VR learning environments that enhance educational experiences",
    result: "Improved learning outcomes and student engagement through VR technology",
    year: "2023",
    client: "Educational Innovation Institute",
    role: "Lead VR Designer",
    images: ["/lovable-uploads/6a322fa7-6135-493f-849b-ca1ad98c7b86.png"]
  },
  "project-3": {
    title: "Thermal Trace",
    subtitle: "XR & Exhibition Design",
    description: "An innovative mixed reality installation exploring the invisible thermal patterns that surround us in everyday environments.",
    challenge: "Visualizing invisible thermal data in an engaging way",
    solution: "Developed mixed reality installations that make thermal patterns visible and interactive",
    result: "Created new perspectives on environmental awareness through XR technology",
    year: "2023",
    client: "Contemporary Art Museum",
    role: "XR Developer & Interaction Designer",
    images: ["/lovable-uploads/593420bb-8761-48fc-b4fc-4c74bd31769c.png"]
  },
  "project-4": {
    title: "Whispers from the Bottom",
    subtitle: "Exhibition Design",
    description: "An immersive exhibition exploring the hidden stories of ocean depths through interactive installations and spatial design.",
    challenge: "Communicating the urgency of ocean conservation to diverse audiences",
    solution: "Designed immersive installations that emotionally connect visitors with ocean stories",
    result: "Increased awareness and engagement with marine conservation issues",
    year: "2022",
    client: "Marine Conservation Society",
    role: "Exhibition Designer & Creative Director",
    images: ["/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png"]
  },
  "project-5": {
    title: "Seoul Nature History Museum",
    subtitle: "Brand Renewal and Spatial Design",
    description: "A comprehensive rebranding and spatial redesign project that transformed Seoul's premier natural history institution into a modern, engaging cultural destination.",
    challenge: "Modernizing a traditional museum while preserving its educational mission",
    solution: "Comprehensive rebranding and spatial redesign with contemporary design principles",
    result: "Successfully transformed the museum into a modern cultural destination with increased visitor engagement",
    year: "2022",
    client: "Seoul Metropolitan Government",
    role: "Brand Designer & Spatial Architect",
    images: ["/lovable-uploads/4c29e171-4bbf-4092-854c-13bf32686e5e.png"]
  },
  "project-6": {
    title: "Island",
    subtitle: "Public Space Design",
    description: "A transformative public space intervention that reimagines urban islands as community gathering points and cultural catalysts.",
    challenge: "Revitalizing underutilized urban spaces for community engagement",
    solution: "Designed public space interventions that transform urban islands into community hubs",
    result: "Created vibrant community gathering spaces that serve as cultural catalysts",
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
  const contentRef = useScrollAnimation<HTMLDivElement>();
  const imageRefs = [useScrollAnimation<HTMLDivElement>(), useScrollAnimation<HTMLDivElement>(), useScrollAnimation<HTMLDivElement>()];
  if (!project) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-white mb-4">Project Not Found</h1>
          <Link to="/work" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Work
          </Link>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
        <Link to="/work" className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide">
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK TO WORK
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={heroRef.ref} className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            {project.subtitle}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
            <span>{project.year}</span>
            <span>•</span>
            <span>{project.client}</span>
            <span>•</span>
            <span>{project.role}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-4 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div ref={contentRef.ref} className={`transition-all duration-[2500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${contentRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
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

        {/* Project Description Text Box - Moved here after first image */}
        <div className="mx-auto mb-32 px-6 md:px-8 relative z-10" style={{
        maxWidth: '1540px'
      }}>
          <div className="rounded-lg p-8 md:p-12 bg-black py-[50px] px-[200px]">
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white">
              {project.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              {project.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">Project type</h3>
                <p className="text-white">{project.client}</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">project categoty</h3>
                <p className="text-white">{project.role}</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">role</h3>
                <p className="text-white">{project.year}</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">duration</h3>
                <p className="text-white">{project.subtitle}</p>
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

      {/* Next Project Section */}
      <section className="py-32 px-6 md:px-8 border-t border-gray-800">
        
      </section>
    </div>;
};
export default ProjectDetail;
