import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight, Grid, Layers } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

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
const projects: Project[] = [{
  id: "1",
  title: "Invisible",
  slug: "invisible-space-museum",
  description: "Virtual Reality Contents",
  category: "VR/AR",
  imageUrl: "/lovable-uploads/eec176ba-ebab-43a9-bb78-e6f08c59771b.png"
}, {
  id: "2",
  title: "Learn",
  slug: "learn",
  description: "Immersive Virtual Reality Experience",
  category: "VR/AR",
  imageUrl: "/lovable-uploads/6a322fa7-6135-493f-849b-ca1ad98c7b86.png"
}, {
  id: "3",
  title: "Thermal Trace",
  slug: "project-3",
  description: "XR & Exhibition Design",
  category: "XR",
  imageUrl: "/lovable-uploads/593420bb-8761-48fc-b4fc-4c74bd31769c.png"
}, {
  id: "4",
  title: "Whispers from the Bottom",
  slug: "project-4",
  description: "Exhibition Design",
  category: "Exhibition",
  imageUrl: "/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png"
}, {
  id: "5",
  title: "Seoul Nature history Museum",
  slug: "project-5",
  description: "Brand Renewal and Spatial Design",
  category: "Branding",
  imageUrl: "/lovable-uploads/4c29e171-4bbf-4092-854c-13bf32686e5e.png"
}, {
  id: "6",
  title: "Island",
  slug: "project-6",
  description: "Public Space Design",
  category: "Spatial",
  imageUrl: "/lovable-uploads/e4ee8415-921a-44fe-bf59-82af2b5be394.png"
}];

const Work = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'slider' | 'panel'>('slider');
  const [isLoaded, setIsLoaded] = useState(false);
  
  const headerAnimation = useScrollAnimation<HTMLDivElement>();
  const titleAnimation = useStaggerAnimation<HTMLHeadingElement>(0);
  const subtitleAnimation = useStaggerAnimation<HTMLParagraphElement>(1);
  const toggleAnimation = useStaggerAnimation<HTMLDivElement>(2);

  useEffect(() => {
    // 페이지 로드 후 0.2초 delay로 인트로 애니메이션 시작
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 배경 페이드인 */}
      <div className={`fixed inset-0 bg-black transition-opacity duration-500 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`} />
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Header Section - 과학적 감성의 인트로 */}
        <section className="pt-20 pb-12 px-4 md:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              {/* 메인 타이틀 - 블러에서 선명하게 + 스케일 */}
              <h1 
                ref={titleAnimation.ref}
                className={`text-4xl md:text-6xl lg:text-7xl font-light mb-8 tracking-wider transition-all duration-[800ms] ease-out ${
                  titleAnimation.isVisible 
                    ? 'opacity-100 scale-100 blur-0 translate-y-0' 
                    : 'opacity-0 scale-[0.98] blur-sm translate-y-5'
                }`}
                style={{ transitionDelay: '0ms' }}
              >
                Work
              </h1>
              
              {/* 서브타이틀 - 스태거 애니메이션 */}
              <p 
                ref={subtitleAnimation.ref}
                className={`text-sm text-gray-400 uppercase tracking-[0.3em] mb-12 transition-all duration-600 ease-out ${
                  subtitleAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                Explore Digital Experiences
              </p>
              
              {/* View Toggle - 더 늦은 스태거 */}
              <div 
                ref={toggleAnimation.ref}
                className={`flex justify-center space-x-6 transition-all duration-600 ease-out ${
                  toggleAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <button 
                  onClick={() => setViewMode('slider')} 
                  className={`group flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-500 ease-out ${
                    viewMode === 'slider' 
                      ? 'bg-white/15 text-white backdrop-blur-sm' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300'
                  }`}
                >
                  <Layers className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm tracking-wide">Immersive</span>
                </button>
                <button 
                  onClick={() => setViewMode('panel')} 
                  className={`group flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-500 ease-out ${
                    viewMode === 'panel' 
                      ? 'bg-white/15 text-white backdrop-blur-sm' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300'
                  }`}
                >
                  <Grid className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm tracking-wide">Overview</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {viewMode === 'slider' ? (
          /* Immersive Slider Section */
          <section className="relative h-[calc(100vh-250px)] overflow-hidden">
            <div className="relative w-full h-full">
              {projects.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                    index === currentSlide 
                      ? 'opacity-100 z-10 scale-100' 
                      : 'opacity-0 z-0 scale-105'
                  }`}
                >
                  <Link to={`/project/${project.slug}`} className="block w-full h-full group">
                    <div className="relative w-full h-full">
                      {/* 이미지 - 블러에서 선명하게 + 서브틀 줌 */}
                      <div className="absolute inset-0 overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className={`w-full h-full object-cover transition-all duration-[1000ms] ease-out ${
                            index === currentSlide 
                              ? 'scale-100 blur-0' 
                              : 'scale-105 blur-[3px]'
                          } group-hover:scale-[1.02]`}
                          style={{ 
                            transitionDelay: index === currentSlide ? '200ms' : '0ms' 
                          }}
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                      </div>
                      
                      {/* 컨텐츠 - 유기적 등장 */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center px-8 max-w-4xl">
                          <span className={`text-xs text-gray-300 uppercase tracking-[0.4em] block mb-6 transition-all duration-600 ease-out ${
                            index === currentSlide 
                              ? 'opacity-80 translate-y-0' 
                              : 'opacity-0 translate-y-3'
                          }`}
                          style={{ transitionDelay: index === currentSlide ? '400ms' : '0ms' }}>
                            {project.category}
                          </span>
                          <h2 className={`text-5xl md:text-7xl lg:text-8xl font-extralight text-white mb-8 tracking-[0.05em] transition-all duration-800 ease-out ${
                            index === currentSlide 
                              ? 'opacity-100 translate-y-0 scale-100' 
                              : 'opacity-0 translate-y-8 scale-95'
                          }`}
                          style={{ transitionDelay: index === currentSlide ? '600ms' : '0ms' }}>
                            {project.title}
                          </h2>
                          <p className={`text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed transition-all duration-600 ease-out ${
                            index === currentSlide 
                              ? 'opacity-90 translate-y-0' 
                              : 'opacity-0 translate-y-5'
                          }`}
                          style={{ transitionDelay: index === currentSlide ? '800ms' : '0ms' }}>
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* 네비게이션 - 미니멀 스타일 */}
            <button 
              onClick={prevSlide} 
              className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/8 hover:bg-white/15 rounded-full flex items-center justify-center transition-all duration-500 ease-out backdrop-blur-md border border-white/10" 
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 text-white/80" />
            </button>

            <button 
              onClick={nextSlide} 
              className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/8 hover:bg-white/15 rounded-full flex items-center justify-center transition-all duration-500 ease-out backdrop-blur-md border border-white/10" 
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 text-white/80" />
            </button>

            {/* 인디케이터 - 유기적 스타일 */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
              {projects.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => goToSlide(index)} 
                  className="group relative"
                  aria-label={`Go to slide ${index + 1}`} 
                >
                  <div className={`w-12 h-0.5 rounded-full transition-all duration-500 ease-out ${
                    index === currentSlide 
                      ? 'bg-white scale-x-100' 
                      : 'bg-white/30 scale-x-75 group-hover:bg-white/50'
                  }`} />
                </button>
              ))}
            </div>

            {/* 카운터 */}
            <div className="absolute bottom-12 right-8 z-20 text-white/60 text-sm font-mono tracking-wider">
              <span className="text-white">{String(currentSlide + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(projects.length).padStart(2, '0')}</span>
            </div>
          </section>
        ) : (
          /* Panel Grid View */
          <section className="py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {projects.map((project, index) => {
                  const itemAnimation = useStaggerAnimation<HTMLDivElement>(index);
                  return (
                    <Link 
                      key={project.id} 
                      ref={itemAnimation.ref}
                      to={`/project/${project.slug}`} 
                      className={`group relative overflow-hidden bg-black/20 backdrop-blur-sm rounded-lg border border-white/5 transition-all duration-[800ms] ease-out hover:border-white/20 ${
                        itemAnimation.isVisible 
                          ? 'opacity-100 translate-y-0 scale-100 blur-0' 
                          : 'opacity-0 translate-y-8 scale-95 blur-sm'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-all duration-[1000ms] ease-out group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 ease-out"></div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <span className="text-xs text-gray-400 uppercase tracking-[0.3em] block mb-3">
                          {project.category}
                        </span>
                        <h3 className="text-xl md:text-2xl font-light text-white mb-3 group-hover:text-gray-200 transition-colors duration-500 ease-out tracking-wide">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed opacity-90">
                          {project.description}
                        </p>
                      </div>
                      
                      {/* 프로젝트 번호 */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/8 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
                        <span className="text-xs text-white/80 font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <section className="py-12 px-4 md:px-8 bg-black/50 backdrop-blur-sm border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 tracking-wide">
                {viewMode === 'slider' ? 'Navigate through immersive experiences' : 'Explore project collection'}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Work;
