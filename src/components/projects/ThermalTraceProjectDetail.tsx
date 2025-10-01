import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { thermalTraceProjectData } from '@/data/thermalTraceProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import BackToTopButton from '@/components/BackToTopButton';
import { ScrollArea } from "@/components/ui/scroll-area";
import InteractiveImageSection from './thermal-trace/InteractiveImageSection';
import CarouselSection from './thermal-trace/CarouselSection';
import ContentSection from './thermal-trace/ContentSection';
import InteractiveExperience from './thermal-trace/InteractiveExperience';

/* ============================
   Whispers와 동일: LiteYouTube 컴포넌트 (형식 유지, Thermal은 사용 안함)
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

const ThermalTraceProjectDetail = () => {
  const project = thermalTraceProjectData;
  const heroRef = useScrollAnimation();

  /* ============================
     Whispers와 동일: 이미지 LQIP + 스크롤 페이드 + content-visibility
     ============================ */
  useEffect(() => {
    const scrollRoot =
      document.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]')
      || document.querySelector<HTMLElement>('.h-screen.w-screen.overflow-auto')
      || null;

    const allImgs = Array.from(
      document.querySelectorAll<HTMLImageElement>('section img')
    );

    // LCP
    const lcpImg = allImgs[0];
    if (lcpImg) {
      lcpImg.loading = 'eager';
      (lcpImg as any).fetchPriority = 'high';
      lcpImg.decoding = 'async';
      if (!lcpImg.hasAttribute('sizes')) {
        lcpImg.setAttribute('sizes', '(min-width:1024px) 1540px, 100vw');
      }
    }

    // lazy + LQIP
    const lazyImgs = allImgs.slice(1);
    lazyImgs.forEach((img) => {
      if (img.dataset.lazyEnhanced === '1') return;
      img.dataset.lazyEnhanced = '1';
      img.loading = 'lazy';
      img.decoding = 'async';
      (img as any).fetchPriority = 'low';
      if (!img.hasAttribute('sizes')) img.setAttribute('sizes', '100vw');
      img.classList.add('img-lqip', 'reveal-init');
    });

    const decodeOnIdle = (img: HTMLImageElement) => {
      const run = () => {
        if (typeof (img as any).decode === 'function') {
          (img as any).decode().catch(() => {}).finally(() => {
            img.classList.remove('img-lqip');
            img.classList.add('reveal-show', 'play-wiggle');
          });
        } else {
          const onLoad = () => {
            img.removeEventListener('load', onLoad);
            img.classList.remove('img-lqip');
            img.classList.add('reveal-show', 'play-wiggle');
          };
          img.addEventListener('load', onLoad);
        }
      };
      (window as any).requestIdleCallback ? (window as any).requestIdleCallback(run, { timeout: 500 }) : run();
    };

    const imgIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target as HTMLImageElement;
          if (entry.isIntersecting) {
            imgIO.unobserve(img);
            decodeOnIdle(img);
          } else {
            img.classList.remove('play-wiggle');
          }
        });
      },
      { root: scrollRoot, rootMargin: '600px 0px', threshold: 0.05 }
    );
    lazyImgs.forEach((img) => imgIO.observe(img));

    // 텍스트 페이드
    const textNodes = document.querySelectorAll<HTMLElement>(
      'section h1, section h2, section h3, section h4, section h5, section h6, section p, section li, section summary, section blockquote, section figcaption, section td, section th'
    );
    textNodes.forEach((el) => {
      if (!el.classList.contains('text-reveal-init')) el.classList.add('text-reveal-init');
    });

    const textIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.add('text-reveal-show');
          else el.classList.remove('text-reveal-show');
        });
      },
      { root: scrollRoot, rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
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
        {/* 상단 네비 (Whispers와 동일) */}
        <ProjectNavigation backText="Back to work" />

        {/* Hero Section (Whispers와 동일) */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <div
            ref={heroRef.ref}
            className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider">
              {project.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
              Reimagining the Fashion Show Through XR
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
              <span>2022–2025</span>
              <span>•</span>
              <span>Personal Project</span>
              <span>•</span>
              <span>XR & Exhibition Designer</span>
            </div>
          </div>
        </section>

        {/* Main Content (Whispers 컨테이너/구조 동일) */}
        <section className="cv-auto">
          {/* First Image (LCP) */}
          <div className="max-w-[1540px] mx-auto z-10">
            <img
              alt={`${project.title} - Image 1`}
              className="w-full h-auto object-contain"
              src={project.images?.[0] ?? '/lovable-uploads/b4f192b1-54ab-437f-8dad-74993331f176.png'}
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>

          {/* Shared Container: 좌/우 2열 */}
          <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] mt-20 md:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
              {/* Left */}
              <div>
                <h2 className="text-xl md:text-xl font-bold text-white leading-tight mb-6">
                  {project.title}
                </h2>
                <p className="text-base md:text-base font-bold text-gray-500 mb-10">
                  2022–2025 │ XR Contents & Exhibition Design │ Solo Project │ 8 weeks
                </p>

                {/* Thermal: 서브 이미지 */}
                <div className="w-full h-[400px] overflow-hidden flex items-center justify-center">
                  <img
                    src="/lovable-uploads/673d5687-9173-4d58-8caa-854189586015.png"
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Right */}
              <div className="space-y-6">
                <p className="text-base md:text-base text-gray-400 leading-relaxed font-light">
                  An experimental runway/exhibition system where proximity and body heat drive mixed-reality interactions.
                </p>

                <div className="text-base md:text-base text-gray-300 leading-relaxed font-Medium">
                  <p className="text-base md:text-base mb-2 text-white leading-relaxed font-Medium">
                    Role
                  </p>
                  <p className="text-base md:text-base text-gray-400 leading-relaxed font-light">
                    XR & Exhibition Design · Solo
                  </p>
                </div>

                <div className="mb-6 mt-6 md:mt-6">
                  <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                    The Brief
                  </h2>
                  <p className="text-base md:text-base lg:text-base leading-relaxed font-light text-gray-400">
                    Design a fashion show environment that delivers unprecedented spatial experience.
                    Garments and space must interact organically to evoke novelty and intensity.
                  </p>
                </div>

                <details className="mt-4 mb-6 rounded-lg border border-white/10 bg-black">
                  <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
                    Full Brief
                  </summary>
                  <div className="px-4 pb-4 pt-6 space-y-4 text-sm text-gray-400">
                    <p>• Transform the passive runway into an interactive interface.</p>
                    <p>• Use thermal cues (proximity / body heat / environment) as primary interaction.</p>
                    <p>• Layer MR visuals to reveal hidden presence and dissolve object/subject boundaries.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Line */}
          <div className="w-full h-px my-40 md:my-40 bg-transparent"></div>

          {/* Media Section 1 (Whispers 형식 유지: 배경판 + 16:9) → Thermal은 인터랙티브 이미지 삽입 */}
          <div className="my-40 md:my-40 relative">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[100vw]">
              <AspectRatio ratio={16 / 9}>
                <div className="w-full h-full bg-[#0044FA]" />
              </AspectRatio>
            </div>

            <AspectRatio ratio={16 / 9} className="relative z-10 rounded-lg border border-gray-800/50 overflow-hidden">
              <InteractiveImageSection
                baseImage="/lovable-uploads/b4f192b1-54ab-437f-8dad-74993331f176.png"
                overlayImage="/lovable-uploads/585a63af-fb48-41d5-82bf-62bc652eff56.png"
              />
            </AspectRatio>
          </div>

          {/* Line */}
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

          {/* Summary (Whispers 카드 레이아웃 동일) */}
          <section aria-labelledby="car-title" className="mt-6 mb-6">
            <h2 id="car-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Summary</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Challenge</h3>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Passive runway experience</li>
                  <li>Rigid object/subject boundary</li>
                  <li>Bias toward seeing hides non-visual presence</li>
                  <li>Stage treated as set, not interface</li>
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Approach</h3>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Thermal interaction (proximity / body heat / ambient)</li>
                  <li>Camouflage to dissolve boundaries</li>
                  <li>MR layering of tangible + ephemeral</li>
                  <li>Discovery loop: sense → explore → reveal</li>
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Result</h3>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Audience shifts to explorer</li>
                  <li>Sensing over spectacle</li>
                  <li>Space as interface</li>
                  <li>New runway format</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Full text (Whispers 동일) */}
          <details className="mt-6 mb-6 rounded-lg border border-white/10 bg-black">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
              Full text
            </summary>
            <div className="px-4 pb-6 pt-6 space-y-6">
              <div>
                <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Approach</h3>
                <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                  Runway reframed as a perceptual landscape. Presence becomes interface; thermal cues guide interaction.
                  MR overlays blend matter and perception, enabling layered discovery.
                </p>
              </div>
              <div>
                <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Project Purpose</h3>
                <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                  Dissolve object/subject boundaries and expand fashion from spectacle to lived, sensed experience.
                </p>
              </div>
              <div>
                <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Development Strategy</h3>
                <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                  Thermal interfaces + responsive terrains (islands, forests, coasts) + MR reveal systems.
                </p>
              </div>
            </div>
          </details>

          {/* Research (Whispers 동일 카드 + details) */}
          <section id="research" aria-labelledby="research-title" className="mt-6 mb-6">
            <h2 id="research-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Research</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-3xl md:text-3xl font-light text-white">78%</p>
                <p className="text-sm text-gray-400 mt-2">call for experiential formats</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-3xl md:text-3xl font-light text-white">40%</p>
                <p className="text-sm text-gray-400 mt-2">fashion designers / industry</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-3xl md:text-3xl font-light text-white">56</p>
                <p className="text-sm text-gray-400 mt-2">participants surveyed</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-2xl md:text-xl font-light text-white">Insight</p>
                <p className="text-sm text-gray-400 mt-2">need creative runway formats</p>
              </div>
            </div>

            <details className="mt-6 mb-6 rounded-lg border border-white/10 bg-black p-4">
              <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
              <p className="mt-6 text-sm text-gray-400">
                Preliminary survey supported the direction: strong demand for immersive, interactive formats beyond passive viewing.
              </p>
            </details>
          </section>

          {/* Process (Whispers 동일) */}
          <section id="process" className="rounded-lg bg-black mt-6 mb-6">
            <h2 className="text-xl md:text-xl font-Medium mb-6 text-gray-300">Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                <h3 className="text-white font-light mb-3">01 Ideation</h3>
                <p className="text-gray-400 text-sm">Brainstorming</p>
                <p className="text-gray-400 text-sm">Concept sketches</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                <h3 className="text-white font-light mb-3">02 Analysis</h3>
                <p className="text-gray-400 text-sm">Precedents</p>
                <p className="text-gray-400 text-sm">Stage environment research</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                <h3 className="text-white font-light mb-3">03 Development</h3>
                <p className="text-gray-400 text-sm">Spatial & interaction design</p>
                <p className="text-gray-400 text-sm">Exhibition build</p>
              </div>
            </div>
          </section>

          {/* Tools & Roles (Whispers 동일 테이블) */}
          <div className="mt-6 mb-6">
            <h2 className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Tools & Roles</h2>
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-black">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-white/5 text-gray-300 uppercase text-sm tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Part</th>
                    <th className="px-4 py-3">Tools</th>
                    <th className="px-4 py-3">Outputs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-4 py-4 font-light">Modeling</td>
                    <td className="px-4 py-4">AutoCAD, 3ds Max</td>
                    <td className="px-4 py-4">Stage</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-light">Texturing</td>
                    <td className="px-4 py-4">Photoshop</td>
                    <td className="px-4 py-4">PBR materials</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-light">Lighting & Render</td>
                    <td className="px-4 py-4">V-Ray, Unity</td>
                    <td className="px-4 py-4">Spatial real-time renders</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-light">Interaction / VR</td>
                    <td className="px-4 py-4">Unity</td>
                    <td className="px-4 py-4">VR prototype</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-light">Graphics</td>
                    <td className="px-4 py-4">Adobe Suite</td>
                    <td className="px-4 py-4">Art works</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Design Highlights (Whispers 동일) */}
          <section id="design" className="mt-6 mb-6">
            <h2 className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Design Highlights</h2>
            <ul className="space-y-3 text-gray-400">
              <li>• Thermal UX: proximity/body-heat driven interactions.</li>
              <li>• Camouflage performance blurring object/subject.</li>
              <li>• Modular environments for narrative tension.</li>
              <li>• Space-as-interface: navigate by sensing.</li>
              <li>• Visibility stress-test.</li>
            </ul>
          </section>

          {/* Line */}
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

          {/* Graphic / Spatial Images (Whispers처럼 단순 이미지 시퀀스) */}
          <div className="w-full mb-4">
            <img className="w-full h-full" src="/lovable-uploads/ee33591e-e9b0-4e8e-a3f0-181d426fdff8.png" />
          </div>
          <div className="w-full">
            <img className="w-full h-full" src="/lovable-uploads/115e4ef3-f572-4222-9101-3e140a672d1c.png" />
          </div>
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/fd54a2e9-da0e-4967-89dc-aa0c028ad12a.png" />
          </div>

          {/* Idea Development (Whispers 형식의 텍스트 블록) */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Idea Development</h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                Fashion reframed as something to be discovered through thermal detection. Viewers become thermal explorers,
                uncovering hidden presence via subtle heat traces and proximity sensing.
              </p>
            </div>
          </div>

          {/* Line */}
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

          {/* Media Section 2 (Whispers의 AR APP 섹션 위치 재사용 → Thermal 전용 인터랙티브 링크) */}
          <div className="mt-40 mb-20 md:mt-40 relative">
            <div className="absolute inset-0 -top-2 -left-2 -right-2 -bottom-2 bg-[#000A42] z-0" />
            <AspectRatio ratio={16 / 9} className="relative z-10 rounded-lg border border-gray-800/50 overflow-hidden">
              <InteractiveExperience
                src="https://lucent-banoffee-a50286.netlify.app"
                title="Thermal Trace Interactive Experience"
                description="Experience the thermal detection interface in real-time"
              />
            </AspectRatio>
          </div>

          {/* Post Project Direction (Whispers의 ContentSection 포맷 유지) */}
          <div className="max-w-[1540px] mx-auto px-4 md:px-[250px]">
            <ContentSection title="Post Project Direction">
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">
                Expanding to a public interactive XR installation with headset + sensor interface to gather qualitative feedback
                and refine sensory engagement before full deployment.
              </p>
            </ContentSection>
          </div>

          {/* End Image */}
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/0ad6ae30-d45d-4de3-9d47-59c2ac18a0b0.png" />
          </div>
        </section>

        {/* Navigation (Whispers와 동일) */}
        <div className="pb-40 md:pb-60 flex items-center justify-center">
          <Link to="/project/Learn" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
            <span>Next project</span>
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
          </Link>
        </div>

        <BackToTopButton />

        {/* ============================
            Whispers와 동일: 전용 스타일
           ============================ */}
        <style>{`
          .img-lqip { filter: blur(8px) saturate(0.9) brightness(0.98); transform: translateZ(0); transition: filter 420ms ease; }
          .img-lqip.reveal-show { filter: blur(4px); }

          .reveal-init { opacity: 0; filter: blur(3px); transition: opacity 720ms ease-out, filter 720ms ease-out; }
          .reveal-show { opacity: 1; filter: blur(0); }

          @keyframes microWiggle {
            0%   { transform: translate3d(0, 0.6px, 0) scale(1.001); }
            50%  { transform: translate3d(0, -0.6px, 0) scale(1.004); }
            100% { transform: translate3d(0, 0.6px, 0) scale(1.001); }
          }
          .play-wiggle { animation: microWiggle 7s ease-in-out infinite; will-change: transform; }

          .text-reveal-init { opacity: 0; transform: translateY(6px); transition: opacity 540ms ease-out, transform 540ms ease-out; will-change: opacity, transform; }
          .text-reveal-show { opacity: 1; transform: translateY(0); }

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

export default ThermalTraceProjectDetail;

