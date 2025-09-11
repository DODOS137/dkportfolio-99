import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import YouTube from 'react-youtube';
import { invisibleProjectData } from '@/data/invisibleProject';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import BackToTopButton from '@/components/BackToTopButton';
import ProjectNavigation from './shared/ProjectNavigation';
import { ScrollArea } from "@/components/ui/scroll-area"; // ✅ 추가

const InvisibleProjectDetail = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const project = invisibleProjectData;



  // First spatial slider images (new images)
  const firstSliderImages = ["/lovable-uploads/b3851ebc-35db-4397-8f5e-e5286275ac0d.png", "/lovable-uploads/8f303355-f7f8-417f-a4e4-fa9109e312db.png", "/lovable-uploads/89363d60-1e48-438d-aef9-e1f5b6c4d7df.png", "/lovable-uploads/1c29e559-8fb5-43b8-85cb-bbe881e4b5b5.png", "/lovable-uploads/663f86d2-c014-4d12-bc43-879d35aa70b2.png"];

  // Second slider images (original images)
  const secondSliderImages = ["/lovable-uploads/1226e7bd-a3b6-4ca8-a21a-f9fe6b747eba.png", "/lovable-uploads/b98a6c0c-ecf1-4cd1-8425-1d5a82e848ad.png", "/lovable-uploads/ea8daafc-845b-416a-87fd-526d63257efd.png", "/lovable-uploads/7dbae072-a951-477f-8d90-a4cd262da27a.png", "/lovable-uploads/67404269-7e30-45dd-b380-5c5c9d441ea5.png"];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [secondApi, setSecondApi] = useState<CarouselApi>();
  const [secondCurrent, setSecondCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!secondApi) {
      return;
    }
    setSecondCurrent(secondApi.selectedScrollSnap());
    secondApi.on("select", () => {
      setSecondCurrent(secondApi.selectedScrollSnap());
    });
  }, [secondApi]);

  return (
    <ScrollArea className="h-screen w-screen overflow-auto"> {/* ✅ 추가 */}
   
      <div className="project-scroll min-h-screen bg-black text-white">

      
      
      {/* Fixed Navigation */}
      <ProjectNavigation backText="Back to work" />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={heroRef.ref} className={`text-center max-w-4xl px-4 md:px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-light mb-4 md:mb-6 tracking-wider" data-lovable-editable="true">
            {project.heroTitle}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-400 font-light tracking-wide" data-lovable-editable="true">
            Scientific Virtual Reality Content
          </p>
          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm text-gray-500 tracking-widest">
            <span data-lovable-editable="true">{project.heroYear}</span>
            <span>•</span>
            <span data-lovable-editable="true">{project.heroClient}</span>
            <span>•</span>
            <span data-lovable-editable="true">{project.heroRole}</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20">
        {/* First Image */}
        <div className="w-full h-auto pb-20 md:pb-40">
          <AspectRatio ratio={16 / 9} className="w-full h-auto">
            <ImageWithLoading src={project.images[0]} alt={`${project.title} - Image 1`} className="w-full h-full object-contain" data-lovable-editable="true" />
          </AspectRatio>
        </div>

        {/* Shared Container */}
        <div className="max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[250px] z-10 ">
          {/* Project Description */}
          <div className="">
            <div className="rounded-lg bg-transparent ">
              <h2 data-lovable-editable="true" className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-light">{project.title}</h2>
              <p data-lovable-editable="true" className="text-base md:text-base lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">{project.mainDescription}</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 text-sm">
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">project type</h3>
                  <p data-lovable-editable="true" className="text-white font-light">{project.projectType}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">Project category</h3>
                  <p data-lovable-editable="true" className="text-white font-light">VR Contents Design</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">ROLE</h3>
                  <div>
                    <p data-lovable-editable="true" className="text-white font-normal">{project.teamType}</p>
                  </div>  
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2" data-lovable-editable="true">DURATION</h3>
                  <p data-lovable-editable="true" className="text-white font-light">{project.duration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* YouTube Video Player */}
          {project.videoId && <div className="">
              <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-gray500/50">
                <AspectRatio ratio={16 / 9} className="w-full">
                  <YouTube videoId={project.videoId} opts={{
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
              }} className="w-full h-full" iframeClassName="w-full h-full border-0" />
                </AspectRatio>
              </div>
            </div>}


