import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import YouTube from 'react-youtube';

interface ProjectData {
  [key: string]: {
    title: string;
    subtitle: string;
    description: string;
    year: string;
    client: string;
    role: string;
    images: string[];
    heroTitle: string;
    heroSubtitle: string;
    heroYear: string;
    heroClient: string;
    heroRole: string;
    mainDescription: string;
    projectType: string;
    projectCategory: string;
    teamType: string;
    duration: string;
    approach: string;
    development: string;
    videoId?: string;
  };
}
const projectData: ProjectData = {
  "invisible-space-museum": {
    title: "Invisible",
    subtitle: "Scientific Virtual Reality Contents",
    description: "Immersive VR experience designed to make scientific knowledge more accessible to the general public",
    year: "2024",
    client: "MA Graduation Project",
    role: "Virtual Reality Designer & Developer",
    images: ["/lovable-uploads/7c2c11ca-8167-4396-b2b1-e8bed16aa6c0.png"],
    heroTitle: "Invisible",
    heroSubtitle: "Scientific Virtual Reality Contents",
    heroYear: "2024",
    heroClient: "MA Graduation Project",
    heroRole: "Virtual Reality Designer & Developer",
    mainDescription: "Immersive VR experience designed to make scientific knowledge more accessible to the general public. By translating complex principles into intuitive, interactive environments, the project lowers cognitive barriers and invites curiosity, engagement, and inclusive understanding of science.",
    projectType: "MA Graduation Project",
    projectCategory: "VR Content Design",
    teamType: "Solo Project",
    duration: "16 weeks",
    approach: "Through research on existing museum formats and traditional science displays, the project identified key barriers to understanding and engagement. Focus was placed on selecting accessible scientific topics and intuitive interaction models to support broader comprehension across diverse audiences.",
    development: "Four fundamental scientific concepts—gravity, light, life, and time—served as the foundation. The spatial and narrative design aimed to enhance engagement, using symbolism and abstraction to visualise phenomena beyond human perception. Each concept was explored through immersive environments designed to deepen emotional and intellectual connection.",
    videoId: "7GC2R6GYUrw"
  },
  "learn": {
    title: "Learn",
    subtitle: "Immersive Virtual Reality Experience",
    description: "Educational VR platform for enhanced learning experiences",
    year: "2023",
    client: "Educational Technology Project",
    role: "VR Developer & UX Designer",
    images: ["/lovable-uploads/6a322fa7-6135-493f-849b-ca1ad98c7b86.png"],
    heroTitle: "Learn",
    heroSubtitle: "Immersive Virtual Reality Experience",
    heroYear: "2023",
    heroClient: "Educational Technology Project",
    heroRole: "VR Developer & UX Designer",
    mainDescription: "An innovative educational VR platform that transforms traditional learning methodologies through immersive virtual environments, enhancing student engagement and knowledge retention.",
    projectType: "Educational Technology Project",
    projectCategory: "VR Education Platform",
    teamType: "Collaborative Project",
    duration: "12 weeks",
    approach: "Research-driven approach focusing on educational psychology and learning effectiveness through virtual reality interfaces.",
    development: "Development centered on creating intuitive learning modules with progressive difficulty and interactive assessment systems."
  },
  "project-3": {
    title: "Thermal Trace",
    subtitle: "XR & Exhibition Design",
    description: "Interactive thermal visualization experience",
    year: "2023",
    client: "Science Museum Exhibition",
    role: "XR Designer",
    images: ["/lovable-uploads/593420bb-8761-48fc-b4fc-4c74bd31769c.png"],
    heroTitle: "Thermal Trace",
    heroSubtitle: "XR & Exhibition Design",
    heroYear: "2023",
    heroClient: "Science Museum Exhibition",
    heroRole: "XR Designer",
    mainDescription: "An interactive thermal visualization experience that combines augmented reality with physical exhibition elements to educate visitors about heat transfer and thermal dynamics.",
    projectType: "Science Museum Exhibition",
    projectCategory: "XR Exhibition Design",
    teamType: "Team Project",
    duration: "10 weeks",
    approach: "Integration of physical and digital elements to create seamless educational experiences.",
    development: "Focus on real-time thermal data visualization and user interaction design."
  },
  "project-4": {
    title: "Whispers from the Bottom",
    subtitle: "Exhibition Design",
    description: "Deep sea exploration exhibition experience",
    year: "2022",
    client: "Marine Science Center",
    role: "Exhibition Designer",
    images: ["/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png"],
    heroTitle: "Whispers from the Bottom",
    heroSubtitle: "Exhibition Design",
    heroYear: "2022",
    heroClient: "Marine Science Center",
    heroRole: "Exhibition Designer",
    mainDescription: "An immersive exhibition exploring the mysteries of deep sea environments and marine life through interactive displays and multimedia installations.",
    projectType: "Marine Science Center",
    projectCategory: "Exhibition Design",
    teamType: "Collaborative Project",
    duration: "14 weeks",
    approach: "Storytelling through environmental design and interactive media installations.",
    development: "Creation of atmospheric environments that simulate deep sea conditions and marine ecosystems."
  },
  "project-5": {
    title: "Seoul Nature History Museum",
    subtitle: "Brand Renewal and Spatial Design",
    description: "Complete brand and spatial redesign project",
    year: "2022",
    client: "Seoul Nature History Museum",
    role: "Brand & Spatial Designer",
    images: ["/lovable-uploads/4c29e171-4bbf-4092-854c-13bf32686e5e.png"],
    heroTitle: "Seoul Nature History Museum",
    heroSubtitle: "Brand Renewal and Spatial Design",
    heroYear: "2022",
    heroClient: "Seoul Nature History Museum",
    heroRole: "Brand & Spatial Designer",
    mainDescription: "Comprehensive brand renewal and spatial redesign for Seoul Nature History Museum, creating a modern identity that bridges natural heritage with contemporary design.",
    projectType: "Museum Renewal Project",
    projectCategory: "Brand & Spatial Design",
    teamType: "Design Team Lead",
    duration: "20 weeks",
    approach: "Holistic approach combining brand identity, wayfinding, and spatial experience design.",
    development: "Integration of traditional museum values with modern design principles and visitor experience optimization."
  },
  "project-6": {
    title: "Island",
    subtitle: "Public Space Design",
    description: "Urban public space intervention project",
    year: "2021",
    client: "City Planning Department",
    role: "Public Space Designer",
    images: ["/lovable-uploads/e4ee8415-921a-44fe-bf59-82af2b5be394.png"],
    heroTitle: "Island",
    heroSubtitle: "Public Space Design",
    heroYear: "2021",
    heroClient: "City Planning Department",
    heroRole: "Public Space Designer",
    mainDescription: "An innovative public space intervention that transforms underutilized urban areas into community gathering spaces through thoughtful design and sustainable materials.",
    projectType: "Urban Planning Project",
    projectCategory: "Public Space Design",
    teamType: "Community Collaborative",
    duration: "18 weeks",
    approach: "Community-centered design process with stakeholder engagement and sustainable development focus.",
    development: "Implementation of modular design elements that can adapt to different community needs and seasonal changes."
  }
};
const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string; }>();
  const project = slug ? projectData[slug] : null;
  const heroRef = useScrollAnimation<HTMLDivElement>();
  
  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-white mb-4">Project Not Found</h1>
          <Link to="/work" className="text-gray-400 hover:text-white transition-colors">
            Back to Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
        <Link to="/work" className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to work page
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
        <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[150px]">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white">
              {project.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
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
        </div>

        {/* YouTube Video Player - Only show for invisible-space-museum */}
        {slug === "invisible-space-museum" && project.videoId && (
          <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[200px]">
            <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
              <AspectRatio ratio={16 / 9} className="w-full">
                <YouTube 
                  videoId={project.videoId} 
                  opts={{
                    width: '100%',
                    height: '100%',
                    playerVars: {
                      autoplay: 0,
                      controls: 1,
                      rel: 0,
                      showinfo: 0,
                      modestbranding: 1,
                      fs: 1,
                      cc_load_policy: 0,
                      iv_load_policy: 3,
                      autohide: 1,
                      disablekb: 0,
                      enablejsapi: 1,
                      origin: window.location.origin,
                      branding: 0,
                      color: 'white',
                      theme: 'dark'
                    }
                  }} 
                  className="w-full h-full" 
                  iframeClassName="w-full h-full border-0" 
                />
              </AspectRatio>
            </div>
          </div>
        )}

        {/* Text Box Below YouTube */}
        <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[150px]">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white">Approach</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              {project.approach}
            </p>
            
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white">Development Strategy</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-16">
              {project.development}
            </p>
          
            {/* Process Section */}
            <h2 className="text-2xl md:text-3xl font-light mb-12 text-white">Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col justify-center items-center text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Ideation Phase</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Initial concept development and creative exploration
                </p>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col justify-center items-center text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Analysis</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Research and evaluation of requirements and constraints
                </p>
              </div>
              
              <div className="aspect-square bg-black rounded-lg p-8 flex flex-col justify-center items-center text-center border border-white">
                <h3 className="text-xl font-light text-white mb-4">Design Development</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Iterative design process and final implementation
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>

        {/* Remaining Images */}
        {project.images.slice(1).map((image, index) => (
          <div key={index + 1} className="mb-20">
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <ImageWithLoading src={image} alt={`${project.title} - Image ${index + 2}`} className="w-full h-full object-cover" />
              </AspectRatio>
            </div>
          </div>
        ))}
      </section>

      {/* Copy of Text Box - Moved to bottom */}
      <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[150px]">
        
      </div>
    </div>
  );
};

export default ProjectDetail;
