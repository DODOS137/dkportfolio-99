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
    description: "An immersive virtual reality experience that transforms the traditional museum visit into an extraordinary journey through space and time.",
    challenge: "Creating an engaging and educational VR experience that makes complex astronomical concepts accessible to visitors of all ages while maintaining scientific accuracy.",
    solution: "Developed a comprehensive VR environment featuring interactive stellar formations, planetary systems, and cosmic phenomena with intuitive navigation and real-time educational overlays.",
    result: "Successfully enhanced visitor engagement by 300% and received recognition from the International Museum Association for innovative digital experiences.",
    year: "2024",
    client: "Virtual Reality Design",
    role: "VR Developer & Experience Designer",
    images: ["/lovable-uploads/b0dfe25f-e5d6-43e8-9b65-25b4fb983640.png"]
  },
  "learn": {
    title: "Learn",
    subtitle: "Immersive Virtual Reality Experience",
    description: "A groundbreaking educational platform that revolutionizes learning through immersive virtual reality technology.",
    challenge: "Bridging the gap between traditional education methods and modern technology to create engaging learning experiences.",
    solution: "Designed an intuitive VR learning environment with interactive modules, real-time feedback, and personalized learning paths.",
    result: "Improved learning retention rates by 85% and expanded accessibility to remote education programs worldwide.",
    year: "2023",
    client: "Educational Innovation Institute",
    role: "Lead VR Designer",
    images: ["/lovable-uploads/6a322fa7-6135-493f-849b-ca1ad98c7b86.png"]
  },
  "project-3": {
    title: "Thermal Trace",
    subtitle: "XR & Exhibition Design",
    description: "An innovative mixed reality installation exploring the invisible thermal patterns that surround us in everyday environments.",
    challenge: "Making invisible thermal data visible and meaningful to general audiences while creating an engaging interactive experience.",
    solution: "Created a mixed reality system combining thermal imaging, spatial computing, and interactive design to reveal hidden thermal signatures.",
    result: "Featured in 15 international exhibitions and recognized as a breakthrough in environmental awareness technology.",
    year: "2023",
    client: "Contemporary Art Museum",
    role: "XR Developer & Interaction Designer",
    images: ["/lovable-uploads/593420bb-8761-48fc-b4fc-4c74bd31769c.png"]
  },
  "project-4": {
    title: "Whispers from the Bottom",
    subtitle: "Exhibition Design",
    description: "An immersive exhibition exploring the hidden stories of ocean depths through interactive installations and spatial design.",
    challenge: "Creating an emotional connection between visitors and the largely unseen underwater world while addressing environmental concerns.",
    solution: "Developed a multi-sensory exhibition space with interactive soundscapes, projection mapping, and tactile installations.",
    result: "Attracted over 500,000 visitors and raised significant awareness about ocean conservation efforts.",
    year: "2022",
    client: "Marine Conservation Society",
    role: "Exhibition Designer & Creative Director",
    images: ["/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png"]
  },
  "project-5": {
    title: "Seoul Nature History Museum",
    subtitle: "Brand Renewal and Spatial Design",
    description: "A comprehensive rebranding and spatial redesign project that transformed Seoul's premier natural history institution into a modern, engaging cultural destination.",
    challenge: "Modernizing a traditional institution while preserving its educational mission and cultural significance in Korean society.",
    solution: "Created a cohesive brand identity and spatial experience that seamlessly blends traditional Korean aesthetics with contemporary design principles.",
    result: "Increased annual visitors by 250% and established the museum as a leading cultural landmark in Seoul.",
    year: "2022",
    client: "Seoul Metropolitan Government",
    role: "Brand Designer & Spatial Architect",
    images: ["/lovable-uploads/4c29e171-4bbf-4092-854c-13bf32686e5e.png"]
  },
  "project-6": {
    title: "Island",
    subtitle: "Public Space Design",
    description: "A transformative public space intervention that reimagines urban islands as community gathering points and cultural catalysts.",
    challenge: "Revitalizing underutilized urban spaces while fostering community engagement and cultural exchange in dense metropolitan areas.",
    solution: "Designed modular, sustainable installations that adapt to different community needs while maintaining aesthetic cohesion and functional flexibility.",
    result: "Implemented in 12 cities across Asia, creating vibrant community hubs that serve over 100,000 residents daily.",
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
            {/* Project Description Text Box */}
            <div className="max-w-4xl mx-auto mb-32">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-light mb-8 text-white">
                  {project.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                  <div>
                    <h3 className="text-gray-400 uppercase tracking-wider mb-2">CLIENT</h3>
                    <p className="text-white">{project.client}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 uppercase tracking-wider mb-2">ROLE</h3>
                    <p className="text-white">{project.role}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 uppercase tracking-wider mb-2">DATE</h3>
                    <p className="text-white">{project.year}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section className="pb-20">
        {project.images.map((image, index) => <div key={index} className="mb-20">
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <ImageWithLoading src={image} alt={`${project.title} - Image ${index + 1}`} className="w-full h-full object-cover" />
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
