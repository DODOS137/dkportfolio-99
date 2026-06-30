import React, { useEffect, useState } from 'react'; // ✅ UPDATED
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
// import YouTube from 'react-youtube'; // (미사용) 성능 최적화로 대체
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading'; 
import { whispersProjectData } from '@/data/whispersProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import BackToTopButton from '@/components/BackToTopButton';
import { ScrollArea } from "@/components/ui/scroll-area"; // ✅ 추가

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

const WhispersProjectDetail = () => {
  const project = whispersProjectData;
  const heroRef = useScrollAnimation();

  const [currentPosterSlide, setCurrentPosterSlide] = useState(0);

  const posterSlides = [
    {
      image: '/webimages/WFTB/WFB4-1.jpg',
      alt: 'Poster colour variation 1',
    },
    {
      image: '/webimages/WFTB/WFB4-2.jpg',
      alt: 'Poster colour variation 2',
    },
    {
      image: '/webimages/WFTB/WFB4-3.jpg',
      alt: 'Poster colour variation 3',
    },
  ];

  const videoOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPosterSlide((prev) => (prev + 1) % posterSlides.length);
    }, 900);

    return () => clearInterval(timer);
  }, [posterSlides.length]);

  /* ============================
     ✅ NEW: 이미지 LQIP + 지연 로딩 큐 + 스크롤 페이드 + content-visibility
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

      // LQIP/페이드 초기 상태만 부여
      img.classList.add('img-lqip', 'reveal-init');
    });

    // 보이면 decode → 클래스 토글 (JS 큐/1px 치환 없음)
    const decodeOnIdle = (img: HTMLImageElement) => {
      const run = () => {
        if (typeof (img as any).decode === 'function') {
          (img as any).decode().catch(() => {}).finally(() => {
            img.classList.remove('img-lqip');
            img.classList.add('reveal-show');
          });
        } else {
          const onLoad = () => {
            img.removeEventListener('load', onLoad);
            img.classList.remove('img-lqip');
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
        rootMargin: '200px 0px 200px 0px',
        threshold: 0.01
      }
    );
    textNodes.forEach((el) => textIO.observe(el));

    return () => {
      imgIO.disconnect();
      textIO.disconnect();
    };
  }, []); // ✅ NEW

  return (
    <ScrollArea className="h-screen w-screen overflow-auto"> {/* ✅ 추가 */}
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
              An Immersive Exhibition Platform Led by Sound
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
        <section className="cv-auto"> {/* ✅ NEW: content-visibility */}
          {/* First Image */}
          <div className="max-w-[1540px] mx-auto z-10">
            <img
              alt={`${project.title} - Image 1`}
              className="w-full h-auto object-contain"
              src="/webimages/WFTB/1.WFBCOVER1.jpg"
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
                  <p className="text-gray400 mb-4">Exhibtion Designer</p>

                  <p className="text-white mb-2">Tools</p>
                  <p>Adobe suite</p>
                  <p>Auto CAD</p>
                  <p>3DS MAX-Vray</p>
                  <p>Unity</p>
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
                    {project.title}
                  </h2>

                  {/* Location + Year */}
                  <p className="text-base md:text-base font-bold text-gray-500 mb-10">
                    2024 │ Exhibition Design │ Solo Project │ 12 weeks
                  </p>

                  {/* ✅ NEW: Image under location/year */}
                  <div className="w-full h-[400px] overflow-hidden flex items-center justify-center">
                    <img
                      src="/lovable-uploads/web1920-whispers from the bottom_대지 24 사본.png"
                      alt={project.title}
                      className="w-full h-full"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="text-base md:text-base text-gray-300 leading-relaxed font-Medium">
                    <p className="text-base md:text-base mb-2 text-white leading-relaxed font-Medium">
                      Client
                    </p>
                    <p className="text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                      UNESCO IOC (Intergovernmental Oceanographic Commission), in collaboration with The Ocean Agency and Woods Hole Oceanographic Institution.
                    </p>
                  </div>

                  <div className="mb-6 mt-6 md:mt-6"> 
                    <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                      The Brief
                    </h2>
                    <p className="text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                      Set in collaboration with UNESCO, The Ocean Agency and the UN Decade of Ocean Science for Sustainable Development (2021-2030), tasks students to explore the crucial intersection between the ocean and the climate.
                    </p>
                  </div>

                  <details className="mt-4 mb-6 rounded-lg border border-white/10 bg-black">
                    <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
                      Full Brief
                    </summary>

                    <div className="px-4 pb-4 pt-6 space-y-4">
                      <div>
                        <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                          1. Effectively communicating the ocean’s importance, to change existing perceptions and enhance public awareness and appreciation of ocean science.
                        </p>
                      </div>

                      <div>
                        <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                          2. Driving global recognition of the ocean’s vital role to inspire all nations to prioritise its inclusion in their national curriculum (as called for by UNESCO).
                        </p>
                      </div>

                      <div>
                        <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                          3. Inspiring tangible actions that reflect a newfound understanding and appreciation for the ocean’s importance and potential, among diverse audiences.
                        </p>
                      </div>

                      <div>
                        <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                          4. Engaging the next generation, to raise awareness of the ocean’s importance and/or inspire the next generation of ocean scientists
                        </p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>

            {/* 챌린지 Container */}
            <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] mt-20 md:mt-20">
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
                      The ocean is essential to climate stability and life on Earth, yet its role remains widely overlooked in public awareness, education, and everyday decision-making.
                    </p>
                  </div>

                  <div className="mb-6 mt-6 md:mt-6"> 
                    <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                      Propose 
                    </h2>
                    <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                      To challenge visual-first marine exhibitions by shifting attention from iconic ocean animals to hidden and overlooked marine species, using sound, touch, and AR to create a more sensory and accessible understanding of marine life.
                    </p>
                  </div>

                  <div className="mb-6 mt-6 md:mt-6"> 
                    <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                      Outputs
                    </h2>
                    <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                      A modular hybrid exhibition system including sound-based listening stations, AR triggers, tactile elements, spatial renders, graphic design, and a visitor flow that guides audiences from looking to listening and discovery.
                    </p>
                  </div>

                  <details className="mt-4 mb-6 rounded-lg border border-white/10 bg-black">
                    <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
                      Evidence
                    </summary>

                    <div className="px-4 pb-4 pt-6 space-y-4">
                      <div>
                        <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                          1. Public awareness was concentrated on iconic marine animals.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                          2. To better understand public perception of marine biodiversity, a preliminary survey was conducted with 108 participants. The findings revealed that 91% (98) had only experienced exhibitions that rely predominantly on visual stimuli—similar to conventional museum or gallery formats. When asked about the types of marine species they were most familiar with, 87% (94) mentioned iconic endangered mammals such as whales and dolphins, indicating that public awareness remains concentrated on a narrow range of charismatic megafauna. These results informed the direction of this project, which seeks to expand public understanding by highlighting lesser-known species through sound, rather than sight.
                        </p>
                      </div>
                    </div>
                  </details>
                </div>
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
                    Immersive sound-led exhibition amplifying overlooked marine life. Reframes ocean conservation through emotional and sensory storytelling.
                  </p>
                </div>
              </div>
              <AspectRatio ratio={16 / 9} className="rounded-lg border border-[#C7B299] overflow-hidden">
                <LiteYouTube
                  id="zqz3Owz0K3o"
                  title="Project video"
                  className="w-full h-full bg-transparent"
                />
              </AspectRatio>
            </div>

            {/*Line*/} 
            <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>

            {/*Render Images*/}   
            {/*Bridge Image1*/}        
            <div className="w-full">
              <img className="w-full h-full mb-4 md:mb-4" src="/webimages/WFTB/WFB8-1.jpg" />
            </div>
            {/*Product Design Image1*/}        
            <div className="w-full">
              <img className="w-full h-full mb-4 md:mb-4" src="/webimages/WFTB/WFB8-2.jpg" />
            </div>
            {/*Product Design Image2*/}        
            <div className="w-full">
              <img className="w-full h-full mb-4 md:mb-4" src="/webimages/WFTB/WFB9.jpg" />
            </div>  
            {/*Detail Image1*/}        
            <div className="w-full">
              <img className="w-full h-full mb-4 md:mb-4" src="/webimages/WFTB/WFB10.jpg" />
            </div> 
            {/*Exhibition Design Image2*/}       
            <div className="w-full">
              <img className="w-full h-full mb-4 md:mb-4" src="/webimages/WFTB/WFB13.jpg" />
            </div>    

            {/*Exhibition Design Image3*/}       
            <div className="w-full">
              <img className="w-full h-full mb-0 md:mb-0" src="/webimages/WFTB/WFB14.jpg" />
            </div>          

            {/*Line*/} 
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

            {/* 그래픽 디자인*/}
            {/*Poster Design Image1*/}        
            <div className="w-full">
              <img className="w-full h-full mb-4 md:mb-4" src="/webimages/WFTB/WFB4.jpg" />
            </div>

{/* Poster Slider + Side Image */}
<div className="w-full flex items-start justify-start gap-6 mb-4">
  {/* Left: Poster Slider */}
  <div className="w-[70%]">
    <img
      src={posterSlides[currentPosterSlide].image}
      alt={posterSlides[currentPosterSlide].alt}
      className="block w-full h-auto"
      loading="lazy"
      decoding="async"
    />
  </div>

  {/* Right: Side Image */}
  <div className="w-full">
    <img
      src="/webimages/WFTB/WFB4-4.jpg"
      alt="Poster side visual"
      className="block w-full h-auto"
      loading="lazy"
      decoding="async"
    />
  </div>
</div>

            {/*Poster Design Image3*/}        
            <div className="w-full">
              <img className="w-full h-full" src="/webimages/WFTB/WFB4-5.jpg" />
            </div>
 
             
             
             
             
             
             {/*Line*/} 
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

            {/* Process-1 */}
            <div className="my-0 md:my-0 relative ">
              <div className="relative z-10">
                <p className="font-Medium mb-4">
                  <span className="text-sm md:text-base text-gray-600">Context </span>
                  <span className="ml-4 text-base md:text-base text-white">Ocean Awareness Gap + Hybrid Exhibition </span>
                </p>
              </div>
            </div>

            {/*Development Image1*/}     
            <div className="w-full mb-4">
              <img className="w-full h-full" src="/webimages/WFTB/WFB1.jpg" />
            </div>    

            {/*Development Image2*/}        
            <div className="w-full">
              <img className="w-full h-full" src="/webimages/WFTB/WFB3.jpg" />
            </div>  

            {/*Development Image3*/}     
            <div className="w-full mb-0">
              <img className="w-full h-full" src="/webimages/WFTB/WFB1-3.jpg" />
            </div> 

            {/* GIF Section */}
            {/* GIF Board */}
            <div className="w-full bg-[#907A56] p-[60px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="w-full aspect-[9/16] overflow-hidden">
                  <img
                    src="/webimages/WFTBGIF1.gif"
                    alt="Process GIF 1"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="w-full aspect-[9/16] overflow-hidden">
                  <img
                    src="/webimages/WFTBGIF2-1.gif"
                    alt="Process GIF 2"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="w-full aspect-[9/16] overflow-hidden">
                  <img
                    src="/webimages/WFTBGIF3-1.gif"
                    alt="Process GIF 3"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/*Line*/} 
            <div className="w-full h-px my-10 md:my-20 bg-transparent"></div>

            {/* Process-3*/}
            <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
              <span className="text-sm md:text-sm text-gray-600 font-Medium">
                Process
              </span>
              <div>
                <span className="text-base md:text-base text-white font-Medium">
                  Spatial Design & 3D Modelling
                </span>
                <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                  Rock-like listening modules combine headphones, QR/AR access, and tactile interaction, while layered ceiling elements use wave metal, glass, light, and reflection to simulate an underwater atmosphere.
                </p>
              </div>
            </div>

            {/*Process Rendering Image1*/}        
            <div className="w-full">
              <img className="w-full h-full mb-0 md:mb-0" src="/webimages/WFTB/WFB5.jpg" />
            </div>
            {/*Line*/} 
            <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>
            {/*Process Rendering Image2*/}        
            <div className="w-full">
              <img className="w-full h-full mb-0 md:mb-0" src="/webimages/WFTB/WFB6.jpg" />
            </div>
            {/*Line*/} 
            <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>
            {/*Spatial Design Process Image1*/}        
            <div className="w-full">
              <img className="w-full h-full mb-0 md:mb-0" src="/webimages/WFTB/WFB7.jpg" />
            </div> 

            {/*Line*/} 
            <div className="w-full h-px my-10 md:my-20 bg-transparent"></div>

            {/*End Image*/}       
            <div className="w-full">
              <img className="w-full h-full mb-0 md:mb-0" src="/webimages/WFTB/WFB17.jpg" />
            </div>  

            {/*Line*/} 
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>
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
          /* LQIP: 무거운 blur/filter 제거 */
          .img-lqip { transform: translateZ(0); }

          /* 이미지: 가벼운 스크롤 페이드 인 / 페이드 아웃 */
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

          /* 이미지 흔들림 제거: 큰 이미지/GIF 많은 페이지에서 스크롤 버벅임 방지 */
          .play-wiggle { animation: none !important; }

          /* 텍스트: 페이드 인/아웃 */
          .text-reveal-init { opacity: 0; transform: translateY(6px); transition: opacity 540ms ease-out, transform 540ms ease-out; will-change: opacity, transform; }
          .text-reveal-show { opacity: 1; transform: translateY(0); }

          /* content-visibility: viewport 밖 렌더 비용 절감 + CLS 방지용 intrinsic size */
          .cv-auto { content-visibility: auto; contain-intrinsic-size: 1px 1000px; }

          @media (prefers-reduced-motion: reduce) {
            .play-wiggle { animation: none !important; }
            .reveal-init, .text-reveal-init { transition-duration: 1ms; filter: none; transform: none; }
          }
        `}</style>
      </ProjectLayout>
    </ScrollArea>
  );
};

export default WhispersProjectDetail;
