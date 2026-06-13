import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { invisibleProjectData } from '@/data/invisibleProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import BackToTopButton from '@/components/BackToTopButton';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { CarouselApi } from "embla-carousel-react";

/* ============================
   ✅ NEW: 경량 YouTube (썸네일 → 클릭 시 iframe 로드)
   ============================ */
const LiteYouTube: React.FC<{ id: string; title?: string; className?: string }> = ({ id, title = 'YouTube video', className = '' }) => {
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`;
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const wrapper = (e.currentTarget.parentElement as HTMLElement);
    if (!wrapper) return;
    wrapper.innerHTML = `<iframe title="${title}" src="${src}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;height:100%;border:0;"></iframe>`;
  };
  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
      <button
        onClick={onClick}
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        aria-label="Play video"
      >
        <span className="inline-flex items-center justify-center rounded-full border border-white/70 px-5 py-2 text-xs tracking-widest text-white/90 backdrop-blur-sm bg-white/10">
          ▶ PLAY
        </span>
      </button>
    </div>
  );
};

const InvisibleProjectDetail = () => {
  const project = invisibleProjectData;
  const heroRef = useScrollAnimation<HTMLDivElement>();

  const secondSliderImages = [
    "/lovable-uploads/1226e7bd-a3b6-4ca8-a21a-f9fe6b747eba.png",
    "/lovable-uploads/b98a6c0c-ecf1-4cd1-8425-1d5a82e848ad.png",
    "/lovable-uploads/ea8daafc-845b-416a-87fd-526d63257efd.png",
    "/lovable-uploads/7dbae072-a951-477f-8d90-a4cd262da27a.png",
    "/lovable-uploads/67404269-7e30-45dd-b380-5c5c9d441ea5.png",
  ];

  const [secondApi, setSecondApi] = useState<CarouselApi | null>(null);
  const [secondCurrent, setSecondCurrent] = useState(0);

  useEffect(() => {
    if (!secondApi) return;
    setSecondCurrent(secondApi.selectedScrollSnap());
    secondApi.on("select", () => setSecondCurrent(secondApi.selectedScrollSnap()));
  }, [secondApi]);

  /* ============================
     ✅ FIX: 가벼운 이미지 페이드 + 지연 로딩 + content-visibility
     ============================ */
  useEffect(() => {
    // 🔧 FIX: ScrollArea는 자체 스크롤 컨테이너 → IO root를 그 뷰포트로 지정
    const scrollRoot =
      document.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]') // shadcn
      || document.querySelector<HTMLElement>('.h-screen.w-screen.overflow-auto')
      || null;

    // 모든 섹션 내 이미지 수집
    const allImgs = Array.from(
      document.querySelectorAll<HTMLImageElement>('section img')
    );

    // LCP 후보(맨 위 큰 이미지)는 즉시/고우선 로드
    const lcpImg = allImgs[0];
    if (lcpImg) {
      lcpImg.loading = 'eager';
      (lcpImg as any).fetchPriority = 'high';
      lcpImg.decoding = 'async';
      // 컨테이너 최대폭 기준 힌트
      if (!lcpImg.hasAttribute('sizes')) {
        lcpImg.setAttribute('sizes', '(min-width:1024px) 1540px, 100vw');
      }
    }

    // 나머지 이미지는 native lazy + LQIP 효과만 (src는 건드리지 않음)
    const lazyImgs = allImgs.slice(1);
    lazyImgs.forEach((img) => {
      if (img.dataset.lazyEnhanced === '1') return; // 중복 방지
      img.dataset.lazyEnhanced = '1';

      // 브라우저 네이티브 힌트
      img.loading = 'lazy';
      img.decoding = 'async';
      (img as any).fetchPriority = 'low';
      if (!img.hasAttribute('sizes')) {
        img.setAttribute('sizes', '100vw'); // 안전 기본값
      }

      // 페이드 초기 상태만 부여
      img.classList.add('reveal-init');
    });

    // 보이면 decode → 클래스 토글 (JS 큐/1px 치환 없음)
    const decodeOnIdle = (img: HTMLImageElement) => {
      const run = () => {
        if (typeof (img as any).decode === 'function') {
          (img as any).decode().catch(() => {}).finally(() => {
            img.classList.add('reveal-show');
          });
        } else {
          const onLoad = () => {
            img.removeEventListener('load', onLoad);
            img.classList.add('reveal-show');
          };
          img.addEventListener('load', onLoad);
        }
      };
      (window as any).requestIdleCallback ? (window as any).requestIdleCallback(run, { timeout: 500 }) : run();
    };

    // 이미지 관찰자: 스크롤 페이드 인 / 페이드 아웃
    const imgIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target as HTMLImageElement;

          if (entry.isIntersecting) {
            decodeOnIdle(img);
            img.classList.add('reveal-show');
          } else {
            img.classList.remove('reveal-show');
          }
        });
      },
      {
        root: scrollRoot,
        rootMargin: '300px 0px 300px 0px',
        threshold: 0.01
      }
    );

    lazyImgs.forEach((img) => imgIO.observe(img));

    // 텍스트 노드: 스크롤 페이드 인/아웃
    const textNodes = document.querySelectorAll<HTMLElement>(
      'section h1, section h2, section h3, section h4, section h5, section h6, section p, section li, section summary, section blockquote, section figcaption, section td, section th'
    );
    textNodes.forEach((el) => {
      if (!el.classList.contains('text-reveal-init')) {
        el.classList.add('text-reveal-init');
      }
    });

    const textIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.add('text-reveal-show');
          else el.classList.remove('text-reveal-show');
        });
      },
      {
        root: scrollRoot,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12
      }
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
        <div ref={heroRef.ref} className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider">
            {project.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            Scientific Virtual Reality Content
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

      {/* Main Content */}
      <section className="cv-auto">
        {/* First Image */}
        <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] z-10">
          <AspectRatio ratio={16 / 9} className="w-full h-auto">
            <ImageWithLoading
              src={project.images?.[0]}
              alt={`${project.title} - Image 1`}
              className="w-full h-full object-contain"
            />
          </AspectRatio>
        </div>

  {/* Tools and roles */}
  <div className="relative">
  {/* 오른쪽 여백 sticky box */}
    <div className="hidden xl:block absolute right-8 top-0 bottom-0 z-50">
      <div className="sticky top-32 w-[170px]">
        <div className="border border-white/10 bg-black/70 backdrop-blur-sm p-3 text-xs text-gray-400 leading-relaxed">
          <p className="text-white mb-2">Role</p>
          <p className="text-gray-400 mb-4">VR Content Designer</p>

          <p className="text-white mb-2">Tools</p>
          <p>Unreal Engine</p>
          <p>3DS MAX</p>
          <p>Adobe Suite</p>
          <p>AI Video Workflow</p>
       </div>
      </div>
    </div>

      {/* Shared Container */}
       <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] mt-20 md:mt-20">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

       {/* Left Column */}
       <div>
       {/* Title */}
       <h2 className="text-xl md:text-xl font-bold text-white leading-tight mb-6">
       Invisible
       </h2>

      {/* Location + Year */}
      <p className="text-base md:text-base font-bold text-gray-500 mb-10">
        2024 │ VR Content Design │ Solo Project │ 16 weeks
      </p>
    </div>

    {/* Right Column */}
    <div className="space-y-6">
   <div className="text-base md:text-base text-gray-300 leading-relaxed font-Medium">
       <div className="mb-6 mt-6 md:mt-6"> 
         <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
      The Brief
          </h2>
       <p className="text-sm md:text-sm text-gray-400 leading-relaxed font-light">
        Create an XR product underpinned by the research and critical analysis within the thesis. The final major project and supplementary design materials represent the culmination of research abilities, personal interests, and career development.
      </p>
      </div>

  </div>
  </div>
  </div>
  </div>

      {/*Line*/} 
      <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

      {/* 챌린지 Container */}
       <div className="max-w-[1540px] mx-auto px-4 md:px-[250px]">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

       {/* Empty Left Column */}
        <div className="hidden md:block" />   
       {/* Right Column */}
       <div className="space-y-6">
       <div className="mb-6 mt-6 md:mt-6"> 
       <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
         Challenge
          </h2>
       <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        Abstract scientific concepts are often difficult to understand through conventional museum displays.
      </p>
      </div>

        <div className="mb-6 mt-6 md:mt-6"> 
       <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
          Propose 
          </h2>
       <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
       Immersive Educational Science Content Production for Museums and Learning Institutions.
        </p>
        </div>

         <div className="mb-6 mt-6 md:mt-6"> 
         <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
         Outputs
          </h2>
       <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        VR environment, AI-generated science videos, spatial renders, thematic chambers, narrative flow, and interactive learning prototype.
       </p>
      </div>

     <details className="mt-4 mb-6 rounded-lg border border-white/10 bg-black">
      <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
         Evidence
       </summary>

        <div className="px-4 pb-4 pt-6 space-y-4">
       <div>
       <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        1. Research showed that visitors preferred immersive VR-based learning and clearer spatial explanations.
      </p>
    </div>
    <div>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        2. An online and offline survey involving 306 participants was conducted to examine the limitations of traditional science exhibitions and gauge interest in immersive educational technologies. Results indicated that 73% of respondents believed conventional science displays lacked engaging spatial formats and narrative clarity, while 76% expressed a desire for immersive VR-based experiences to better understand abstract scientific concepts. These insights informed the design rationale and validated the project's direction.
      </p>
    </div>
   </div>
   </details>

   </div>  {/* 여기서 wrapper 닫기 */}        

   </div>
   </div> 
  </div>

 {/*Line*/} 
 <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

<div className="max-w-[1540px] mx-auto px-4 md:px-[250px]">          
{/* YouTube Video Section */}
<div className="my-0 md:my-0 relative">
{/* Content */}
 <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
  <span className="text-sm md:text-sm text-gray-600 font-Medium">
    Project Overview
  </span>
  <div>
    <span className="text-base md:text-base text-white font-Medium">
     Project Video
    </span>
     <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
      Immersive VR experience designed to make scientific knowledge more accessible to the general public. By translating complex principles into intuitive, interactive environments, the project lowers cognitive barriers and invites curiosity, engagement, and inclusive understanding of science.
      </p>
  </div>
</div>
  <AspectRatio ratio={16 / 9} className="rounded-lg border border-[#AE0200] overflow-hidden">
      <LiteYouTube
        id={project.videoId}
        title="Project video"
        className="w-full h-full bg-transparent"
      />
    </AspectRatio>
  </div>

         {/*Line*/} 
          <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>



          {/* Space Images */}
          <div className="w-full mb-10 md:mb-10">
            <img className="w-full h-auto" src="/webimages/Invisible/INV8.jpg" alt="Space render 1" />
          </div>

          <div className="w-full mb-10 md:mb-10">
            <img className="w-full h-auto" src="/webimages/Invisible/INV9.jpg" alt="Space render 2" />
          </div>

          <div className="w-full mb-10 md:mb-10">
            <img className="w-full h-auto" src="/webimages/Invisible/INV10.jpg" alt="Space render 3" />
          </div>

          <div className="w-full">
            <img className="w-full h-auto" src="/webimages/Invisible/INV11.jpg" alt="Space render 4" />
          </div>






         {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

          {/* Context */}
          <div className="my-0 md:my-0 relative ">
            <div className="relative z-10">
              <p className="font-Medium mb-4">
                <span className="text-sm md:text-base text-gray-600">Context </span>
                <span className="ml-4 text-base md:text-base text-white">Narrative Arc + Worldbuilding  </span>
              </p>
            </div>
          </div>
   
          {/* Context image1 */}
             <div className="w-full">
            <img className="w-full h-auto" src="/webimages/Invisible/INV1-1.jpg" alt="Space render 4" />
          </div>
             {/* Context image2 */}
             <div className="w-full">
            <img className="w-full h-auto" src="/webimages/Invisible/INV1-2.jpg" alt="Space render 4" />
          </div>

         {/*Line*/} 
          <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>

             {/*Worldbuilding text*/}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-8">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Worldbuilding</h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                Set on the fictional alien planet A233, the project follows an explorer discovering abandoned artefacts and messages. Without a shared language, science becomes a universal language connecting two civilisations.
              </p>
            </div>
          </div>

             {/* Worldbuilding Image 1 */}
          <div className="w-full">   
            <img
              alt="World secondary"
              className="w-full h-auto mb-10 md:mb-10"
              src="/webimages/Invisible/INV2.jpg"
            />
          </div>
   

          {/* Worldbuilding Image 2 */}
          <div className="w-full">
            <AspectRatio ratio={16 / 9} className="w-full">
              <img
                alt="World overview"
                className="w-full h-full object-contain"
                src="/webimages/Invisible/INV1.jpg"
              />
            </AspectRatio>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>


          {/*Narrative Arc text start*/}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-3">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Narrative Arc</h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                The experience follows an unnamed interstellar explorer through abandoned chambers on Planet A233, each representing a universal scientific principle. The journey moves from perception to comprehension, turning wonder and disorientation into clarity and resonance.
              </p>
            </div>
          </div>

          {/*Narrative Arc text start2*/}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-8">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]"></h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                Scientific ideas are conveyed through emotional rhythm: gravity creates tension, light sparks curiosity, life evokes empathy, and time ends the journey with introspection.</p>
            </div>
          </div>



          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

          {/* Process */}
          <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
            <span className="text-sm md:text-sm text-gray-600 font-Medium">
              Process
            </span>
            <div>
              <span className="text-base md:text-base text-white font-Medium">
                Video Development
              </span>
              <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                Each chamber embodied its theme via interactive and environmental cues (distorted space/reflective surfaces/organic growth/temporal transitions) to translate abstraction into felt experience.
            </p>
            </div>
          </div>   
     
   
             {/* Video Development Image */}
          <div className="w-full">
            <img
              className="w-full h-auto"
              src="/webimages/Invisible/INV3.jpg"
              alt="Video development board"
            />
          </div>



          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

          {/* Process */}
          <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
            <span className="text-sm md:text-sm text-gray-600 font-Medium">
              Process
            </span>
            <div>
              <span className="text-base md:text-base text-white font-Medium">
                Spatial Design & Planning
              </span>
              <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                The VR environment was structured as a sequence of symbolic chambers where spatial atmosphere, scientific principle, and interaction logic are developed together.
              </p>
            </div>
          </div>

          {/*Space text start*/}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-3">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]"></h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Each chamber expresses its theme through spatial and interactive cues.</p>
            </div>
          </div>

          {/*Space text 1*/}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-10">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]"></h2>
              <ul className="text-sm md:text-sm lg:text-sm font-light text-gray-400 space-y-2">    
                <li>• Gravity: Distorted space, floating objects, and black hole shaders created tension and immersion.</li>
                <li>• Light: Reflective surfaces and reactive illumination revealed scientific qualities.</li>
                <li>• Life: Organic forms suggested biological evolution in an alien ecosystem.</li>
                <li>• Time: Shifting architecture and transitions evoked temporal flow and cosmic cycles.</li>
              </ul>
            </div> 
          </div>


          {/* Exterior Image */}
          <div className="w-full mb-10">
            <img className="w-full h-auto" src="/webimages/Invisible/INV5.jpg" alt="Exterior render" />
          </div>

   

          {/* Floor Plan Image */}
          <div className="w-full">
            <img className="w-full h-auto" src="/webimages/Invisible/INV4.jpg" alt="Floor plan" />
          </div>




          {/*Line*/} 
          <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>

          {/* Development Evidence Image 1 */}
          <div className="w-full mb-10 md:mb-10">
            <img className="w-full h-auto" src="/webimages/Invisible/INV6.jpg" alt="Development evidence 1" />
          </div>

          {/* Development Evidence Image 2 */}
          <div className="w-full">
            <img className="w-full h-auto" src="/webimages/Invisible/INV7.jpg" alt="Development evidence 2" />
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-20 bg-transparent"></div>





          {/* Full playing Video Section */}
          <div className="my-0 md:my-0 relative">
            <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
              <span className="text-sm md:text-sm text-gray-600 font-Medium">
                Project Video
              </span>
              <div>
                <span className="text-base md:text-base text-white font-Medium">
                  Full Playthrough Video
                </span>
              </div>
            </div>

            <AspectRatio ratio={16 / 9} className="rounded-lg border border-[#AE0200] overflow-hidden">
              <LiteYouTube
                id="KT0Cwy9s5n8"
                title="Full playthrough video"
                className="w-full h-full bg-transparent" 
              />
            </AspectRatio>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

          {/*Final Outcome text start*/}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Final Outcome</h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                The project transforms scientific concepts into participatory and immersive storytelling experiences. It moves beyond exhibition display to propose a new way of communicating scientific complexity through emotional engagement. The framework can be expanded as a VR learning platform for science and natural history museums, offering a scalable model for institutions that aim to integrate immersive education and research-based exhibitions.
              </p>
            </div> 
          </div>


          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>



          {/* Process */}
          <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
            <span className="text-sm md:text-sm text-gray-600 font-Medium">
              Process
            </span>
            <div>
              <span className="text-base md:text-base text-white font-Medium">
                Post-Project Direction
              </span>
              <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                The initial VR prototype offered limited interaction beyond spatial exploration. The Ocean extends this as a post-project concept, proposing a future system where user-entered data could generate autonomous evolutionary behaviours.
              </p>
            </div>
          </div>



   

          {/* Ocean Web Image */}
          <div className="w-full">
            <img className="w-full h-full" src="/webimages/Invisible/INV12.jpg" alt="The Ocean overview" />
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

 

          {/*The Ocean text start*/}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-10">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">The Ocean (2025)</h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                A responsive virtual ocean simulates autonomous life evolution based on user input. Different environmental conditions trigger emergent behaviours, reinforcing scientific thinking through exploration and experimentation.
              </p>
            </div> 
          </div>

          {/* extra images */}
          <div className="w-full">
            <img className="w-full h-auto" src="/webimages/Invisible/INV13.jpg" alt="Ocean image 1" />
            <img className="w-full h-auto" src="/webimages/Invisible/INV14.jpg" alt="Ocean image 2" />
            <img
              src="/webimages/Invisible/INV15.jpg"
              className="w-full h-auto mb-20 md:mb-40"
              alt="Ocean image 3"
            />
          </div>

          <div className="w-full">
            <img
              src="/webimages/Invisible/INV16.jpg"
              className="w-full h-auto mb-20 md:mb-20"
              alt="Ocean image 4"
            />

            <div className="w-full">
              <img
                src="/webimages/Invisible/INV17.jpg"
                className="w-full h-auto mb-20 md:mb-20"
                alt="Ocean image 5"
              />
            </div>
          </div>

          {/* Slider */}
          <div className="w-full">
            <Carousel className="w-full bg-black" setApi={setSecondApi} opts={{ loop: true }}>
              <CarouselContent>
                {secondSliderImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full">
                      <AspectRatio ratio={16 / 9} className="w-full">
                        <img src={image} alt={`Gallery slider ${index + 1}`} className="w-full h-full object-cover" />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white hover:bg-white/10 w-8 h-8 md:w-12 md:h-12" />
              <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white hover:bg-white/10 w-8 h-8 md:w-12 md:h-12" />
            </Carousel>
            <div className="flex justify-center space-x-2 mt-4 md:mt-6">
              {secondSliderImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-0.5 cursor-pointer transition-all duration-300 ${
                    secondCurrent === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
                  }`}
                  onClick={() => secondApi?.scrollTo(index)}
                />
              ))}
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

          {/* data images (optional) */}
          <div className="max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[200px]">
            {(project.images || []).slice(1).map((image: string, index: number) => (
              <div key={index + 1} className="pb-20 md:pb-40">
                <div className="w-full">
                  <AspectRatio ratio={16 / 9} className="w-full">
                    <ImageWithLoading
                      src={image}
                      alt={`${project.title} - Image ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              </div>
            ))}
          </div>

 

    
      </div>
      </section>

      {/*Navigation Section*/}
      <div className="pb-40 md:pb-60 flex items-center justify-center">
        <Link to="/project/Seoul-Nature-History-Museum" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
          <span>Next project</span>
          <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
        </Link>
      </div>

      <BackToTopButton />

      {/* ============================
          ✅ NEW: 전용 스타일 (LQIP + 페이드 + content-visibility + 근접재생 모션)
          ============================ */}
      <style>{`
        /* 이미지: 가벼운 스크롤 페이드 인 / 페이드 아웃
           ✅ 버벅임 원인이던 filter: blur() 제거
           ✅ 무한 흔들림 animation 제거 */
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

        /* 텍스트: 페이드 인/아웃 */
        .text-reveal-init { opacity: 0; transform: translateY(6px); transition: opacity 540ms ease-out, transform 540ms ease-out; will-change: opacity, transform; }
        .text-reveal-show { opacity: 1; transform: translateY(0); }

        /* content-visibility: viewport 밖 렌더 비용 절감 + CLS 방지용 intrinsic size */
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
export default InvisibleProjectDetail;
