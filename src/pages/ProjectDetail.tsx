import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

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
    images: [
      "/lovable-uploads/eec176ba-ebab-43a9-bb78-e6f08c59771b.png"
    ]
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
    images: [
      "/lovable-uploads/6a322fa7-6135-493f-849b-ca1ad98c7b86.png"
    ]
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
    images: [
      "/lovable-uploads/593420bb-8761-48fc-b4fc-4c74bd31769c.png"
    ]
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
    images: [
      "/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png"
    ]
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
    images: [
      "/lovable-uploads/4c29e171-4bbf-4092-854c-13bf32686e5e.png"
    ]
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
    images: [
      "/lovable-uploads/e4ee8415-921a-44fe-bf59-82af2b5be394.png"
    ]
  }
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectData[slug] : null;
  const [isLoaded, setIsLoaded] = useState(false);

  const heroAnimation = useScrollAnimation<HTMLDivElement>();
  const contentAnimation = useScrollAnimation<HTMLDivElement>();
  
  // 스태거 애니메이션을 위한 refs
  const titleAnimation = useStaggerAnimation<HTMLHeadingElement>(0);
  const subtitleAnimation = useStaggerAnimation<HTMLParagraphElement>(1);
  const metaAnimation = useStaggerAnimation<HTMLDivElement>(2);

  useEffect(() => {
    // 페이지 로드 후 인트로 애니메이션 시작
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-white mb-4">Project Not Found</h1>
          <Link to="/work" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 배경 페이드인 */}
      <div className={`fixed inset-0 bg-black transition-opacity duration-500 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`} />
      
      <div className="relative z-10">
        {/* Fixed Navigation - 미니멀 스타일 */}
        <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
          <Link 
            to="/work" 
            className="group inline-flex items-center text-white/80 hover:text-white transition-all duration-500 ease-out text-sm tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-4 h-4 mr-3 transition-transform duration-300 group-hover:-translate-x-1" />
            Return
          </Link>
        </nav>

        {/* Hero Section - 과학적 감성의 인트로 */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <div className="text-center max-w-5xl px-6">
            {/* 메인 타이틀 - 블러에서 선명하게 */}
            <h1 
              ref={titleAnimation.ref}
              className={`text-6xl md:text-8xl lg:text-9xl font-extralight mb-8 tracking-[0.05em] transition-all duration-[800ms] ease-out ${
                titleAnimation.isVisible 
                  ? 'opacity-100 scale-100 blur-0 translate-y-0' 
                  : 'opacity-0 scale-[0.98] blur-sm translate-y-8'
              }`}
            >
              {project.title}
            </h1>
            
            {/* 서브타이틀 - 스태거 */}
            <p 
              ref={subtitleAnimation.ref}
              className={`text-xl md:text-2xl text-gray-400 font-light tracking-[0.1em] mb-16 transition-all duration-600 ease-out ${
                subtitleAnimation.isVisible 
                  ? 'opacity-90 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {project.subtitle}
            </p>
            
            {/* 메타 정보 - 더 늦은 스태거 */}
            <div 
              ref={metaAnimation.ref}
              className={`flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-[0.3em] uppercase transition-all duration-600 ease-out ${
                metaAnimation.isVisible 
                  ? 'opacity-80 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <span>{project.year}</span>
              <span className="text-gray-700">•</span>
              <span>{project.client}</span>
              <span className="text-gray-700">•</span>
              <span>{project.role}</span>
            </div>
          </div>
        </section>

        {/* Main Content - 섹션 간 부드러운 전환 */}
        <section className="py-24 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div 
              ref={contentAnimation.ref}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                contentAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
            >
              {/* Overview */}
              <div>
                <h2 className="text-3xl font-light mb-8 tracking-[0.1em] text-gray-200">Overview</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>
              
              {/* Details */}
              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-light mb-4 text-gray-400 tracking-[0.15em] uppercase text-sm">Challenge</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-light mb-4 text-gray-400 tracking-[0.15em] uppercase text-sm">Solution</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-light mb-4 text-gray-400 tracking-[0.15em] uppercase text-sm">Result</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Images Section - 유기적 등장 */}
        <section className="pb-24">
          {project.images.map((image, index) => {
            const imageAnimation = useScrollAnimation<HTMLDivElement>();
            return (
              <div 
                key={index}
                ref={imageAnimation.ref}
                className={`mb-24 transition-all duration-[1000ms] ease-out ${
                  imageAnimation.isVisible 
                    ? 'opacity-100 scale-100 blur-0' 
                    : 'opacity-0 scale-105 blur-[3px]'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="w-full h-screen relative overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${project.title} - Visual ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </div>
            );
          })}
        </section>

        {/* Next Project Section - 미니멀 CTA */}
        <section className="py-32 px-6 md:px-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-12 tracking-[0.1em] text-gray-200">Continue Exploring</h2>
            <Link 
              to="/work"
              className="group inline-block relative overflow-hidden"
            >
              <div className="border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-500 ease-out px-12 py-4 text-sm tracking-[0.3em] uppercase">
                <span className="relative z-10">View All Projects</span>
                <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetail;
