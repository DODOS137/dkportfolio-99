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
  };
}
const projectData: ProjectData = {
  "invisible-space-museum": {
    title: "static text",
    subtitle: "static text",
    description: "static text",
    year: "static text",
    client: "static text",
    role: "static text",
    images: ["/lovable-uploads/7c2c11ca-8167-4396-b2b1-e8bed16aa6c0.png"]
  },
  "learn": {
    title: "static text",
    subtitle: "static text",
    description: "static text",
    year: "static text",
    client: "static text",
    role: "static text",
    images: ["/lovable-uploads/6a322fa7-6135-493f-849b-ca1ad98c7b86.png"]
  },
  "project-3": {
    title: "static text",
    subtitle: "static text",
    description: "static text",
    year: "static text",
    client: "static text",
    role: "static text",
    images: ["/lovable-uploads/593420bb-8761-48fc-b4fc-4c74bd31769c.png"]
  },
  "project-4": {
    title: "static text",
    subtitle: "static text",
    description: "static text",
    year: "static text",
    client: "static text",
    role: "static text",
    images: ["/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png"]
  },
  "project-5": {
    title: "static text",
    subtitle: "static text",
    description: "static text",
    year: "static text",
    client: "static text",
    role: "static text",
    images: ["/lovable-uploads/4c29e171-4bbf-4092-854c-13bf32686e5e.png"]
  },
  "project-6": {
    title: "static text",
    subtitle: "static text",
    description: "static text",
    year: "static text",
    client: "static text",
    role: "static text",
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
          <h1 className="text-4xl font-light text-white mb-4" data-lovable-editable="true">static text</h1>
          <Link to="/work" className="text-gray-400 hover:text-white transition-colors" data-lovable-editable="true">
            static text
          </Link>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
        <Link to="/work" className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide" data-lovable-editable="true">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to work page
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={heroRef.ref} className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider" data-lovable-editable="true">Invisible</h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide" data-lovable-editable="true">Scientific Virtual Reality Contents</p>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
            <span data-lovable-editable="true">2024</span>
            <span>•</span>
            <span data-lovable-editable="true">MA Graduation Project</span>
            <span>•</span>
            <span data-lovable-editable="true">Virtual Reality Designer &amp; Developer</span>
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
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Invisible</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">Immersive VR experience designed to make scientific knowledge more accessible to the general public. By translating complex principles into intuitive, interactive environments, the project lowers cognitive barriers and invites curiosity, engagement, and inclusive understanding of science.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">project type</h3>
                <p className="text-white" data-lovable-editable="true">MA Graduation Project</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">Project category</h3>
                <p className="text-white" data-lovable-editable="true">VR Content Design</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">static text</h3>
                <p className="text-white" data-lovable-editable="true">Solo Project</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">DURATION</h3>
                <p className="text-white" data-lovable-editable="true">16 weeks</p>
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Video Player */}
        <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[200px]">
          <div className="w-full">
            <AspectRatio ratio={16 / 9} className="w-full">
              <YouTube videoId="7GC2R6GYUrw" opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 0,
                controls: 1,
                rel: 0,
                showinfo: 0,
                modestbranding: 1
              }
            }} className="w-full h-full" />
            </AspectRatio>
          </div>
        </div>

        {/* Text Box Below YouTube */}
        <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[150px]">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Approach</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">Through research on existing museum formats and traditional science displays, the project identified key barriers to understanding and engagement. Focus was placed on selecting accessible scientific topics and intuitive interaction models to support broader comprehension across diverse audiences.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
              <div>
                
                
              </div>
              <div>
                
                
              </div>
              <div>
                
                
              </div>
              <div>
                
                
              </div>
            </div>
          </div>
        </div>

        {/* Copy of Text Box - Moved to bottom */}
        <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[150px]">
          <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white" data-lovable-editable="true">Development Strategy</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" data-lovable-editable="true">Four fundamental scientific concepts—gravity, light, life, and time—served as the foundation. The spatial and narrative design aimed to enhance engagement, using symbolism and abstraction to visualise phenomena beyond human perception. Each concept was explored through immersive environments designed to deepen emotional and intellectual connection.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
              
              
              
              
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