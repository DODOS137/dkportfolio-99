import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { thermalTraceProjectData } from "@/data/thermalTraceProject";
import ProjectLayout from "./shared/ProjectLayout";
import ProjectNavigation from "./shared/ProjectNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InteractiveImageSection from "./thermal-trace/InteractiveImageSection";
import CarouselSection from "./thermal-trace/CarouselSection";
import InteractiveExperience from "./thermal-trace/InteractiveExperience";
import BackToTopButton from "@/components/BackToTopButton";
import { ScrollArea } from "@/components/ui/scroll-area";

const ThermalTraceProjectDetail = () => {
  const project = thermalTraceProjectData;
  const heroRef = useScrollAnimation();

  const carouselImages = [
    "/webimages/ThermalTrace/TT-S1.jpg",
    "/webimages/ThermalTrace/TT-S2.jpg",
    "/webimages/ThermalTrace/TT-S3.jpg",
  ];

  /* ============================
     기준코드 유지: 가벼운 이미지 페이드 + 지연 로딩 + content-visibility
     ============================ */
  useEffect(() => {
    const scrollRoot =
      document.querySelector<HTMLElement>(
        "[data-radix-scroll-area-viewport]",
      ) ||
      document.querySelector<HTMLElement>(".h-screen.w-screen.overflow-auto") ||
      null;

    const allImgs = Array.from(
      document.querySelectorAll<HTMLImageElement>("section img"),
    );

    const lcpImg = allImgs[0];
    if (lcpImg) {
      lcpImg.loading = "eager";
      (lcpImg as any).fetchPriority = "high";
      lcpImg.decoding = "async";
      if (!lcpImg.hasAttribute("sizes")) {
        lcpImg.setAttribute("sizes", "(min-width:1024px) 1540px, 100vw");
      }
    }

    const lazyImgs = allImgs.slice(1);
    lazyImgs.forEach((img) => {
      if (img.dataset.lazyEnhanced === "1") return;
      img.dataset.lazyEnhanced = "1";

      img.loading = "lazy";
      img.decoding = "async";
      (img as any).fetchPriority = "low";
      if (!img.hasAttribute("sizes")) {
        img.setAttribute("sizes", "100vw");
      }

      img.classList.add("reveal-init");
    });

    const decodeOnIdle = (img: HTMLImageElement) => {
      const run = () => {
        if (typeof (img as any).decode === "function") {
          (img as any)
            .decode()
            .catch(() => {})
            .finally(() => {
              img.classList.add("reveal-show");
            });
        } else {
          const onLoad = () => {
            img.removeEventListener("load", onLoad);
            img.classList.add("reveal-show");
          };
          img.addEventListener("load", onLoad);
        }
      };
      (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback(run, { timeout: 500 })
        : run();
    };

    const imgIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target as HTMLImageElement;

          if (entry.isIntersecting) {
            decodeOnIdle(img);
            img.classList.add("reveal-show");
          } else {
            img.classList.remove("reveal-show");
          }
        });
      },
      {
        root: scrollRoot,
        rootMargin: "300px 0px 300px 0px",
        threshold: 0.01,
      },
    );

    lazyImgs.forEach((img) => imgIO.observe(img));

    const textNodes = document.querySelectorAll<HTMLElement>(
      "section h1, section h2, section h3, section h4, section h5, section h6, section p, section li, section summary, section blockquote, section figcaption, section td, section th",
    );

    textNodes.forEach((el) => {
      if (!el.classList.contains("text-reveal-init")) {
        el.classList.add("text-reveal-init");
      }
    });

    const textIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.add("text-reveal-show");
          else el.classList.remove("text-reveal-show");
        });
      },
      {
        root: scrollRoot,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    textNodes.forEach((el) => textIO.observe(el));

    return () => {
      imgIO.disconnect();
      textIO.disconnect();
    };
  }, []);

  return (
    <ScrollArea className="h-screen w-screen overflow-auto">
      <ProjectLayout>
        {/* Fixed Navigation */}
        <ProjectNavigation backText="Back to work" />

        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <div
            ref={heroRef.ref}
            className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider">
              {project.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
              Reimagining the Fashion Show Through XR
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
              <span>2022-2025</span>
              <span>•</span>
              <span>Personal Project</span>
              <span>•</span>
              <span>XR & Exhibition Designer</span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="cv-auto">
          {/* First Image */}
          <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] z-10">
            <img
              alt={`${project.title} - Image 1`}
              className="w-full h-auto object-contain"
              src="/webimages/ThermalTrace/3.WEBCOVER1.jpg"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          {/* Tools and roles */}
          <div className="relative">
            {/* 오른쪽 여백 sticky box */}
            <div className="hidden xl:block absolute right-8 top-0 bottom-0 z-50">
              <div className="sticky top-32 w-[170px]">
                <div className="border border-white/10 bg-black/70 backdrop-blur-sm p-3 text-xs text-gray-400 leading-relaxed">
                  <p className="text-white mb-2">Role</p>
                  <p className="text-gray-400 mb-4">Hybrid Exhibition Designer</p>

                  <p className="text-white mb-2">Tools</p>
                  <p>Adobe Suite</p> 
                  <p>Unity/WebGL</p>
                  <p>3DS MAX-Vray</p>
                </div>
              </div>
            </div>

            {/* Shared Container */}
            <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] mt-20 md:mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
                {/* Left Column */}
                <div>
                  <h2 className="text-xl md:text-xl font-bold text-white leading-tight mb-6">
                    {project.title}
                  </h2>

                  <p className="text-base md:text-base font-bold text-gray-500 mb-10">
                    2022,2025 │ XR Contents & Exhibition Design │ Solo Project │
                    8 weeks, 12 weeks
                  </p>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="text-base md:text-base text-gray-300 leading-relaxed font-Medium">
                    <p className="text-base md:text-base mb-2 text-white leading-relaxed font-Medium">
                      Project Type
                    </p>
                    <p className="text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                      Personal Project
                    </p>
                  </div>

                  <div className="mb-6 mt-6 md:mt-6">
                    <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                      The Brief
                    </h2>
                    <p className="text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                      Design a fashion show environment that delivers a powerful
                      and unprecedented spatial experience. The garments and the
                      space must interact organically, and the setting should
                      evoke a strong sense of novelty and intensity.
                    </p>
                  </div>
                </div>
              </div>
            </div>


          {/* Line */}
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

            

            {/* Challenge Container */}
            <div className="max-w-[1540px] mx-auto px-4 md:px-[250px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
                <div className="hidden md:block" />

                <div className="space-y-6">
                  <div className="mb-6 mt-6 md:mt-6">
                    <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                      Challenge
                    </h2>
                    <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                    Traditional runway shows rely on passive viewing and fixed visual boundaries.
                    </p>
                  </div>

                  <div className="mb-6 mt-6 md:mt-6">
                    <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                      Propose
                    </h2>
                    <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                      Shift the runway from visual spectacle to thermal sensing
                      through body heat, proximity, and XR.
                    </p>
                  </div>

                  <div className="mb-6 mt-6 md:mt-6">
                    <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                      Outputs
                    </h2>
                    <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                      XR runway concept, WebGL/VR prototype, thermal visual
                      system, spatial stages, and graphics.
                    </p>
                  </div>

                  <details className="mt-4 mb-6 rounded-lg border border-white/10 bg-black">
                    <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
                      Evidence
                    </summary>

                    <div className="px-4 pb-4 pt-6 space-y-4">
                      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                        Research showed demand for more experiential fashion formats. A preliminary survey conducted with 56 participants
                        supported the conceptual direction of this project. 78%
                        responded positively to questions suggesting that
                        fashion shows should move beyond conventional viewing
                        formats and explore new experiential approaches.
                        Notably, 40% of respondents identified as either fashion
                        designers or professionals in the fashion industry,
                        reinforcing the relevance of this investigation within
                        the design field.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>

          {/* Line */}
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>




            <div className="max-w-[1540px] mx-auto px-4 md:px-[250px]">
            {/* 중요: 영상 없음. 기준코드의 LiteYouTube 대신 겹쳐진 이미지 인터랙션 유지 */}
            <div className="my-0 md:my-0 relative">
              <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
                <span className="text-sm md:text-sm text-gray-600 font-Medium">
                  Project Overview
                </span>
                <div>
                  <span className="text-base md:text-base text-white font-Medium">
                   Interaction Prototype & Outcome
                  </span>
                  <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                 The project reframes fashion as something discovered through thermal detection. Instead of passive display, it invites audiences to detect hidden figures through heat traces, temperature shifts, and proximity sensing. A visual design language derived from body-temperature colour gradients informs the garments, spatial atmosphere, and interactive experience.
                  </p>
                </div>
              </div>



       
              
              
              {/* 중요: iframe 프로토타입 컴포넌트 유지 */}
              <InteractiveExperience
                src="https://lucent-banoffee-a50286.netlify.app"
                title="Thermal Trace Interactive Experience"
                description="Experience the thermal detection interface in real-time"
              />



               {/* Line */}
               <div className="w-full h-px my-2 md:my-2 bg-transparent"></div>


               {/*익스비션이미지 */}
               <div className="w-full">
                <img
                  src="/webimages/ThermalTrace/TT2.jpg"
                  className="w-full h-auto"
                 />
                </div>
              


   
              <AspectRatio
                  ratio={16 / 9}
                  className="relative z-10 bg-black overflow-hidden"
                >
                  <div className="border border-transparent bg-transparent">
                    <InteractiveImageSection
                      baseImage="/webimages/ThermalTrace/TT1-2.jpg"
                      overlayImage="/webimages/ThermalTrace/TT1-1.jpg"
                    />
                  </div>
                </AspectRatio>




            {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>




            {/* Art Works Images */}
            {/* 포스터이미지 */}
            <div className="w-full">
              <img
                className="w-full h-auto"
                src="/webimages/ThermalTrace/TT3.jpg"
              />
            </div>
    
               {/* 포스터이미지2 */}
              <div className="w-full">
              <img
                className="w-full h-full"
                src="/webimages/ThermalTrace/TT1.jpg"
              />
            </div>

              {/* 포스터이미지3 */}
              <div className="w-full">
              <img
                className="w-full h-full"
                src="/webimages/ThermalTrace/TT3-1.jpg"
              />
            </div>



             {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>




              

 


         {/* Process-1 */}
         
         <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
         <span className="text-sm md:text-sm text-gray-600 font-Medium">
          Context
         </span>
         <div>
         <span className="text-base md:text-base text-white font-Medium">
          Concept
         </span>
         <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
       The concept positions fashion as a hidden presence revealed through the audience’s body, movement, and proximity. Space becomes a sensing interface, transforming viewing into an act of detection and discovery.
          </p>
         </div>
         </div>
    
         {/*컨셉 이미지 */}
         <div className="w-full">
                <img
                  src="/webimages/ThermalTrace/TT7.jpg"
                  className="w-full h-auto"
                />
              </div>


            {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>
              
 
            {/* Process-2 */}
            <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
            <span className="text-sm md:text-sm text-gray-600 font-Medium">
            Process
            </span>
            <div>
            <span className="text-base md:text-base text-white font-Medium">
            Spatial Design
            </span>
            <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
            Camouflage-inspired landscapes become a responsive XR terrain, reacting to the viewer’s position and thermal presence. Built from simple modular arrangements, the runway can be flexibly transformed through layout, colour, and concept, adapting the space to different fashion narratives.
            </p>
            </div>
            </div>

            {/* 슬라이더 */}
            <CarouselSection
              images={carouselImages}
              title="Transformable stage"
            />


            {/* 공간이미지 1*/}
            <div className="w-full">
              <img
                className="w-full h-auto"
                src="/webimages/ThermalTrace/TT4.jpg"
              />
            </div>

            {/* 공간이미지 2*/}
            <div className="w-full">
              <img
                className="w-full h-auto" 
                src="/webimages/ThermalTrace/TT4-1.jpg"
              />
            </div>

              {/* Line */}
              <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>


              {/* 옥스포드 전시이미지 */}
              <div className="w-full mb-4">
                <img
                  src="/webimages/ThermalTrace/TT6.jpg"
                  className="w-full h-auto"
                />
              </div>

 

              
  
             {/* Exhibition Design text */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-4">
                <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">

                  <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                    XR reveals models beyond normal perception, challenging
                    audiences to engage on a deeper sensory level. Instead of
                    visual cues, viewers track models through body heat,
                    focusing on delicate outlines and subtle movements.
                  </p>
                </div>
              </div>
              
              {/* Exhibition Design text2 */}
               <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-4">
                <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">

                 <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                    The project currently exists as a WebGL prototype and
                    conceptual sketch that explores sensory experience through
                    temperature-responsive visual data. Evolving this concept
                    into an XR installation where a physical model&apos;s body
                    temperature triggers the visual transformation could extend
                    its potential into real-world contexts. This approach
                    presents opportunities for application across fashion shows,
                    brand showcases, and sensory-based art installations, where
                    digital aesthetics and physical presence converge.
                  </p>
                </div>
              </div>





              
              
              
              
              
              {/* Exhibition Design Section with Interactive Image: 겹쳐진 이미지 유지 */}
            <div className="bg-transparent border-1 border-gray500 overflow-hidden">
              <InteractiveImageSection
                baseImage="/webimages/ThermalTrace/TT2-1.jpg"
                overlayImage="/webimages/ThermalTrace/TT2-2.jpg"
              />

 


      




            



















            </div>
            </div>
            </div>
        </section>

        {/* Navigation Section */}
        <div className="pb-40 md:pb-60 flex items-center justify-center mt-32 md:mt-52">
          <Link
            to="/project/invisible-space-museum"
            className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium"
          >
            <span>Next project</span>
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
          </Link>
        </div>

        <BackToTopButton />

        {/* ============================
            기준코드 유지: 전용 스타일
            ============================ */}
        <style>{`
          .reveal-init {
            opacity: 0;
            transform: translateY(16px);
            transition:
              opacity 700ms ease-out,
              transform 700ms ease-out;
            will-change: opacity, transform;
          }

          .reveal-show {
            opacity: 1;
            transform: translateY(0);
          }

          .play-wiggle {
            animation: none !important;
          }

          .text-reveal-init { opacity: 0; transform: translateY(6px); transition: opacity 540ms ease-out, transform 540ms ease-out; will-change: opacity, transform; }
          .text-reveal-show { opacity: 1; transform: translateY(0); }

          .cv-auto { content-visibility: auto; contain-intrinsic-size: 1px 1000px; }

          @media (prefers-reduced-motion: reduce) {
            .play-wiggle { animation: none !important; }
            .reveal-init, .text-reveal-init { transition-duration: 1ms; transform: none; }
          }
        `}</style>
      </ProjectLayout>
    </ScrollArea>
  );
};

export default ThermalTraceProjectDetail;
