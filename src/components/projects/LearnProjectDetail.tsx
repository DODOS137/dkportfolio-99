import React, { useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { learnProjectData } from '@/data/learnProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import BackToTopButton from '@/components/BackToTopButton';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ScrollArea } from "@/components/ui/scroll-area";

/* ============================
   ✅ 360도 / Sketchfab 모델뷰어 지연 로딩
   ============================ */
const ModelViewer = React.lazy(() => import('@/components/ModelViewer'));

/* ============================
   ✅ YouTube Auto Play + Loop
   ============================ */
const LiteYouTube: React.FC<{ id: string; title?: string; className?: string }> = ({
  id,
  title = 'YouTube video',
  className = '',
}) => {
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&modestbranding=1&rel=0&controls=1`;

  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      <iframe
        title={title}
        src={src}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
};

const LearnProjectDetail = () => {
  const project = learnProjectData;
  const heroRef = useScrollAnimation();

  /* ============================
     ✅ 기준코드 방식: 이미지 페이드 + 지연 로딩 + content-visibility
     ============================ */
  useEffect(() => {
    // ScrollArea는 자체 스크롤 컨테이너 → IO root를 그 뷰포트로 지정
    const scrollRoot =
      document.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]')
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
      if (!lcpImg.hasAttribute('sizes')) {
        lcpImg.setAttribute('sizes', '(min-width:1024px) 1540px, 100vw');
      }
    }

    // 나머지 이미지는 native lazy + fade 효과만
    const lazyImgs = allImgs.slice(1);
    lazyImgs.forEach((img) => {
      if (img.dataset.lazyEnhanced === '1') return;
      img.dataset.lazyEnhanced = '1';

      img.loading = 'lazy';
      img.decoding = 'async';
      (img as any).fetchPriority = 'low';
      if (!img.hasAttribute('sizes')) {
        img.setAttribute('sizes', '100vw');
      }

      img.classList.add('reveal-init');
    });

    // 보이면 decode → 클래스 토글
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
      (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback(run, { timeout: 500 })
        : run();
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
              {project.heroSubtitle}
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
              <span>{project.heroYear}</span>
              <span>•</span>
              <span>MA Thesis</span>
              <span>•</span>
              <span>Virtual Reality Designer</span>
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
              src={project.images[0]}
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
                  <p className="text-gray-400 mb-4">VR Designer</p>

                  <p className="text-white mb-2">Tools</p>
                  <p>Open Brush</p>
                  <p>Unity</p>
                  <p>3DS MAX</p>
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
                    2024 │ VR Content Design │ Solo Project │ 8 weeks
                  </p>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                      The Brief
                    </h2>
                    <p className="text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                      Create a short script for a VR linear narrative experience of up to 10 minutes, then illustrate the story through a VR storyboard using Open Brush or a similar tool. The project needed to demonstrate VR-related concepts such as interaction, embodiment, navigation, spatial storytelling, and emotional pacing.
                    </p>
                  </div>

                  <details className="mt-4 mb-6 rounded-lg border border-white/10 bg-black">
                    <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
                      Full Brief
                    </summary>

                    <div className="px-4 pb-4 pt-6 space-y-4">
                      <div>
                        <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                          1. Develop an original VR story concept, including narrative structure, characters, and spatial progression.
                        </p>
                      </div>

                      <div>
                        <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                          2. Produce a VR storyboard and recording that explains the concept, interaction logic, navigation, and immersive experience design.
                        </p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>

            {/* Line */}
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
                      Create an original VR storytelling format that unifies narrative, space, and interaction into one cohesive experience.
                    </p>
                  </div>

                  <div className="mb-6 mt-6 md:mt-6">
                    <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                      Propose
                    </h2>
                    <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                      Original VR Content Creation and Asset Development
                    </p>
                  </div>

                  <div className="mb-6 mt-6 md:mt-6">
                    <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                      Outputs
                    </h2>
                    <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                      Worldbuilding, character design, spatial renders, interaction sketches, level layouts, storyboards, 360-degree model viewing, and visual production assets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Line */}
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

          {/* ✅ Container fixed: 아래 섹션도 기준코드와 같은 좌우 여백 적용 */}
          <div className="max-w-[1540px] mx-auto px-4 md:px-[250px]">
            {/* Spatial Design Image1 */}
            <div className="w-full">
              <img className="w-full h-auto" src="/webimages/Learn/LEARN14.jpg" />
            </div>



            {/* Spatial Design Image2 */}
            <div className="w-full">
              <img className="w-full h-auto" src="/webimages/Learn/LEARN11.jpg" />
            </div>



            {/* Spatial Design Image3 */}
            <div className="w-full">
              <img className="w-full h-auto" src="/webimages/Learn/LEARN10.jpg" />
            </div>


              {/* detail Image1 */}
            <div className="w-full">
              <img className="w-full h-auto" src="/webimages/Learn/LEARN12.jpg" />
            </div>
             {/* detail Image2 */}
            <div className="w-full">
              <img className="w-full h-auto" src="/webimages/Learn/LEARN13.jpg" />
            </div>




             

            {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

    
             
             {/* Content */}
              <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
                <span className="text-sm md:text-sm text-gray-600 font-Medium">
                  Process
                </span>
                <div>
                  <span className="text-base md:text-base text-white font-Medium">
                   Narrative Arc + Worldbuilding
                  </span>
                  <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                    Set in a distant future where humans have disappeared, this original VR story follows three robots maintaining an abandoned library with mechanical precision. Through spatial exploration, the library becomes a symbolic space for memory, ritual, and lost purpose. When the robots discover a dying tree, the narrative introduces a moral choice between self-preservation and sacrifice, turning empathy into the emotional core of the experience.
                  </p>
                </div>
              </div>

             {/* world building Image1 */}
            <div className="w-full">
              <img className="w-full h-auto" src="/webimages/Learn/LEARN2.jpg" />
            </div>

     





    

            {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>
          </div>

          <div className="max-w-[1540px] mx-auto px-4 md:px-[250px]">
            {/* YouTube Video Section */}
            <div className="my-0 md:my-0 relative">
              {/* Content */}
              <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
                <span className="text-sm md:text-sm text-gray-600 font-Medium">
                  Process
                </span>
                <div>
                  <span className="text-base md:text-base text-white font-Medium">
                    Storyboarding
                  </span>
                  <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                    The project presents an original VR story set in an abandoned library where three robots confront memory, empathy, and sacrifice through spatial exploration.
                  </p>
                </div>
              </div>

              <AspectRatio ratio={16 / 9} className="border border-transparent overflow-hidden">
                <LiteYouTube
                  id="aCJblmM9yzs"
                  title="Project video"
                  className="w-full h-full bg-transparent"
                />
              </AspectRatio>
            </div>

            {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

            {/* Process-2 */}
            <div className="my-0 md:my-0 relative">
              <div className="relative z-10">
                <p className="font-Medium mb-4">
                  <span className="text-sm md:text-base text-gray-600">Process </span>
                  <span className="ml-4 text-base md:text-base text-white">Character Design + 360° Model Viewing</span>
                </p>
              </div>
            </div>

            {/* Character Design Images */}
            <div className="w-full">
              <img className="w-full h-full" src="/webimages/Learn/LEARN3.jpg" />
            </div>

            <div className="w-full">
              <img className="w-full h-full" src="/webimages/Learn/LEARN4.jpg" />
            </div>

            <div className="w-full mb-4">
              <img className="w-full h-full" src="/webimages/Learn/LEARN5.jpg" />
            </div>

            {/* 360 Model Viewer */}
            <ErrorBoundary fallback={<div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">3D Model Viewer Unavailable</div>}>
              <div className="relative overflow-hidden">
                <div className="flex w-full">
                  <div className="w-1/2">
                    <Suspense fallback={<div className="w-full h-64 bg-gray-900/60" />}>
                      <ModelViewer modelPath="https://sketchfab.com/3d-models/rx056-b62d552b21b8446ebce9f71b85700aa0" isSketchfab={true} />
                    </Suspense>
                  </div>
                  <div className="w-1/2">
                    <Suspense fallback={<div className="w-full h-64 bg-gray-900/60" />}>
                      <ModelViewer modelPath="https://sketchfab.com/3d-models/ls107-65e7ff25d71f4512829dfc88c5537add" isSketchfab={true} />
                    </Suspense>
                  </div>
                </div>
                <div className="pointer-events-none absolute top-0 left-0 w-full h-[100px] bg-black z-[999]" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[100px] bg-black z-[999]" />
              </div>
            </ErrorBoundary>

            <h2 className="text-xs md:text-sm font-light text-center text-gray-700">
              Click and drag to rotate. Scroll to zoom.
            </h2>

            {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

            {/* Process-3 */}
            <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
              <span className="text-sm md:text-sm text-gray-600 font-Medium">
                Process
              </span>
              <div>
                <span className="text-base md:text-base text-white font-Medium">
                  Spatial Design
                </span>
                <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
                  Sunlight, shadow, and artefact placement guide the viewer’s attention. The library unfolds through layered contrasts between architectural order, organic decay, digital interfaces, and paper records.
                </p>
              </div>
            </div>

            {/* Level Design Section */}
            <div className="w-full">
              <img className="w-full h-full" src="/webimages/Learn/LEARN6.jpg" />
            </div>

            <div className="w-full">
              <img className="w-full h-full" src="/webimages/Learn/LEARN7.jpg" />
            </div>

            {/* Line */}
            <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>

            <div className="w-full">
              <img className="w-full h-full" src="/webimages/Learn/LEARN8.jpg" />
            </div>

            <div className="w-full">
              <img className="w-full h-full" src="/webimages/Learn/LEARN9.jpg" />
            </div>





            {/* Line */}
            <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

            {/* Final Outcome text */}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-3">
              <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
                <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Final Outcome</h2>
                <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                  The project presents an interactive VR storytelling game that transforms learning into a narrative journey. By merging emotional storytelling with interaction design, it bridges play and education, turning abstract ideas into embodied understanding.
                </p>
              </div>
            </div>

            {/* Line */}
            <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>

            {/* Post-Project Section Text */}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-3">
              <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
                <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Post-Project Expansion</h2>
                <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                  Core systems have been implemented, with cutscene animations in development to strengthen narrative pacing and emotional peaks. Once completed, the project can be released as a playable experience and refined through user feedback.
                </p>
              </div>
            </div>

            {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>
          </div>
        </section>

        {/*Navigation Section*/}
        <div className="pb-40 md:pb-60 flex items-center justify-center">
          <Link to="/project/Whispers-from-the-Bottom" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
            <span>Next project</span>
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
          </Link>
        </div>

        <BackToTopButton />

        {/* ============================
            ✅ 기준코드 전용 스타일
            ============================ */}
        <style>{`
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

export default LearnProjectDetail;
