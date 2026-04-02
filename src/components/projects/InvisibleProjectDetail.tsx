import React, { useEffect, useState } from "react"; // ✅ NEW (useEffect already present)
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import YouTube from "react-youtube"; // (원본 유지, 아래에서 경량 컴포넌트로 대체)
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageWithLoading from "@/components/ImageWithLoading";
import { invisibleProjectData } from "@/data/invisibleProject";
import ProjectLayout from "./shared/ProjectLayout";
import ProjectNavigation from "./shared/ProjectNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import BackToTopButton from "@/components/BackToTopButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { CarouselApi } from "embla-carousel-react";

/* ============================
   ✅ NEW: 경량 YouTube 컴포넌트 (썸네일 → 클릭 시 iframe 로드)
   ============================ */
const LiteYouTube: React.FC<{ id: string; title?: string; className?: string }> = ({ id, title = "YouTube video", className = "" }) => {
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`;
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const wrapper = e.currentTarget.parentElement as HTMLElement | null;
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

  const videoOpts = {
    height: "100%",
    width: "100%",
    playerVars: { autoplay: 0, controls: 1, modestbranding: 1, rel: 0 },
  };

  const firstSliderImages = [
    "/lovable-uploads/b3851ebc-35db-4397-8f5e-e5286275ac0d.png",
    "/lovable-uploads/8f303355-f7f8-417f-a4e4-fa9109e312db.png",
    "/lovable-uploads/89363d60-1e48-438d-aef9-e1f5b6c4d7df.png",
    "/lovable-uploads/1c29e559-8fb5-43b8-85cb-bbe881e4b5b5.png",
    "/lovable-uploads/663f86d2-c014-4d12-bc43-879d35aa70b2.png",
  ];
  const secondSliderImages = [
    "/lovable-uploads/1226e7bd-a3b6-4ca8-a21a-f9fe6b747eba.png",
    "/lovable-uploads/b98a6c0c-ecf1-4cd1-8425-1d5a82e848ad.png",
    "/lovable-uploads/ea8daafc-845b-416a-87fd-526d63257efd.png",
    "/lovable-uploads/7dbae072-a951-477f-8d90-a4cd262da27a.png",
    "/lovable-uploads/67404269-7e30-45dd-b380-5c5c9d441ea5.png",
  ];

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [secondApi, setSecondApi] = useState<CarouselApi | null>(null);
  const [secondCurrent, setSecondCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!secondApi) return;
    setSecondCurrent(secondApi.selectedScrollSnap());
    secondApi.on("select", () => setSecondCurrent(secondApi.selectedScrollSnap()));
  }, [secondApi]);

  /* ============================
     ✅ 최적화 전용 useEffect (구조/내용 불변)
     - 1px 투명픽셀/JS 큐 제거 → 브라우저 네이티브 스케줄링 활용
     - LCP: eager + fetchpriority=high + sizes 힌트
     - 나머지: lazy + decode + sizes=100vw + 근접 프리로드
     - 텍스트/이미지 페이드 & 보일 때만 미세 모션 유지
     ============================ */
  useEffect(() => {
    // ScrollArea viewport를 IO root로 사용(shadcn)
    const scrollRoot =
      document.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]') ||
      document.querySelector<HTMLElement>('.h-screen.w-screen.overflow-auto') ||
      null;

    // 섹션 내 모든 이미지
    const allImgs = Array.from(
      document.querySelectorAll<HTMLImageElement>('section img')
    );

    // LCP 후보(가장 위 이미지): 즉시/고우선 + 반응형 힌트
    const lcpImg = allImgs[0];
    if (lcpImg) {
      lcpImg.loading = 'eager';
      (lcpImg as any).fetchPriority = 'high';
      lcpImg.decoding = 'async';
      if (!lcpImg.hasAttribute('sizes')) {
        lcpImg.setAttribute('sizes', '(min-width:1024px) 1540px, 100vw');
      }
    }

    // 나머지: 네이티브 lazy + decode + LQIP/페이드 클래스만 (src/경로는 그대로 유지)
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
      img.classList.add('img-lqip', 'reveal-init');
    });

    // 근접 시 decode → 표시 (큐/치환 없음)
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
      (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback(run, { timeout: 500 })
        : run();
    };

    const imgIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target as HTMLImageElement;
          if (entry.isIntersecting) {
            imgIO.unobserve(img);
            decodeOnIdle(img);
          } else {
            img.classList.remove('play-wiggle'); // 오프스크린 시 모션 중지
          }
        });
      },
      { root: scrollRoot, rootMargin: '600px 0px', threshold: 0.05 }
    );
    lazyImgs.forEach((img) => imgIO.observe(img));

    // 텍스트 페이드(내용 변경 없이 class만)
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
      { root: scrollRoot, rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    textNodes.forEach((el) => textIO.observe(el));

    return () => {
      imgIO.disconnect();
      textIO.disconnect();
    };
  }, []); // ✅ NEW

  return (
    <ScrollArea className="h-screen w-screen overflow-auto">
      <ProjectLayout>
        <ProjectNavigation backText="Back to work" />

        {/* Hero */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <div
            ref={heroRef.ref}
            className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              heroRef.isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider">{project.heroTitle}</h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">Scientific Virtual Reality Content</p>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
              <span>{project.heroYear}</span>
              <span>•</span>
              <span>{project.heroClient}</span>
              <span>•</span>
              <span>{project.heroRole}</span>
            </div>
          </div>
        </section>

        {/* Main */}
        <section className="cv-auto"> {/* ✅ NEW: content-visibility */}
          {/* First Image */}
          <div className="max-w-[1540px] mx-auto z-10">
            <AspectRatio ratio={16 / 9} className="w-full h-auto">
              <ImageWithLoading
                src={project.images?.[0]}
                alt={`${project.title} - Image 1`}
                className="w-full h-full object-contain"
              />
            </AspectRatio>
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

      {/* ✅ NEW: Image under location/year */}
   </div>

    {/* Right Column */}
    <div className="space-y-6">

    <div className="text-base md:text-base text-gray-300 leading-relaxed font-Medium">
   <p className="text-base md:text-base mb-2 text-white leading-relaxed font-Medium">
     MA Graduation Project
    </p>
     <p className="text-base md:text-base text-gray-400 leading-relaxed font-light">
     Immersive VR experience designed to make scientific knowledge more accessible to the general public. By translating complex principles into intuitive, interactive environments, the project lowers cognitive barriers and invites curiosity, engagement, and inclusive understanding of science.</p>
      </div>
    

       
       <div className="mb-6 mt-6 md:mt-6"> 
         <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
      The Brief
          </h2>
       <p className="text-base md:text-base lg:text-base leading-relaxed font-light text-gray-400">
        Create an XR product which is underpinned by the research and critical analysis within your thesis. The
final major project and the portfolio of supplementary design materials represent the culmination of
your research abilities. They should reflect your own interests and support your career development.
       </p>
      </div>

    </div>

  </div> 

         {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

           {/* YouTube Video Section */}
  <div className="my-40 md:my-40 relative"> {/* ✅ NEW: relative */} 
  <div
    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[100vw]"
  >
    <AspectRatio ratio={16 / 9}>
      <div className="w-full h-full bg-[#AE0200]" />
    </AspectRatio>
  </div>

  <AspectRatio ratio={16 / 9} className="relative z-10 rounded-lg border border-gray-800/50 overflow-hidden">
    <LiteYouTube
      id={project.videoId}
      title="Project video"
      className="w-full h-full bg-transparent"  
    />
  </AspectRatio>
</div>

            {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent" />

{/* Summary */}
<section aria-labelledby="sum-title" className="mt-6 mb-6">
  <h2 id="sum-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">
    Summary
  </h2>
  <div className="grid md:grid-cols-3 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Challenge</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
        <li>Conventional museum format</li>
        <li>Abstract scientific concepts inaccessible</li>
        <li>Weak emotional engagement</li>
      </ul>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Approach</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
        <li>VR-spatial storytelling</li>
        <li>Four core themes: gravity · light · life · time</li>
        <li>Symbolic + immersive spatial design</li>
        <li>Intuitive interactions for accessibility</li>
      </ul>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Result</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
        <li>67% found VR more effective</li>
        <li>Gravity & time most impactful</li>
        <li>Higher curiosity, mixed learning outcomes</li>
      </ul>
    </div>
  </div>
</section>

{/* Full text */}
<details className="mt-6 mb-6 rounded-lg border border-white/10 bg-black">
  <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">Full text</summary>
  <div className="px-4 pb-6 mt-6 space-y-6">
    <div>
      <h3 className="text-sm font-light text-gray-300 mb-3">Approach</h3>
      <p className="text-sm leading-relaxed font-light text-gray-400">
       The project focused on simplifying complex topics into accessible narratives and designing intuitive interaction models. Symbolism and abstraction were employed to visualise phenomena beyond everyday perception, while immersive environments provided an emotional framework to deepen connection and engagement. This design approach positioned science not only as knowledge to be learned, but as an experience to be felt.
    </p>
    </div>
    <div>
      <h3 className="text-sm font-light text-gray-300 mb-3">Project Purpose</h3>
      <p className="text-sm leading-relaxed font-light text-gray-400">
        The project sought to reimagine the communication of science in cultural institutions. Instead of presenting information as static content, the aim was to transform exhibitions into participatory experiences where knowledge emerges through interaction. By reframing scientific concepts as shared emotional and symbolic languages, the work highlights how immersive media can bridge gaps in public science education and broaden accessibility across different backgrounds.
      </p>
    </div>
    <div>
      <h3 className="text-sm font-light text-gray-300 mb-3">Development Strategy</h3>
      <p className="text-sm leading-relaxed font-light text-gray-400">
        Four universal scientific themes—gravity, light, life, and time—were selected as the foundation of the exhibition. Each theme was spatially embodied in a dedicated immersive environment, combining abstraction with sensory cues.
      </p>
    </div>
   
  </div>
</details>

{/* Research */}
<section id="research" aria-labelledby="research-title" className="mt-6 mb-6">
  <h2 id="research-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Research</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">73%</p>
      <p className="text-sm text-gray-400 mt-2">found displays lacked spatial clarity</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">76%</p>
      <p className="text-sm text-gray-400 mt-2">preferred immersive VR-based learning</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">306</p>
      <p className="text-sm text-gray-400 mt-2">participants surveyed</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-2xl md:text-xl font-light text-white">Insight</p>
      <p className="text-sm text-gray-400 mt-2">VR-based immersive experiences</p>
    </div>
  </div>

  <details className="mt-6 mb-6 rounded-lg border border-white/10 bg-black p-4">
    <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
    <p className="mt-6 text-sm text-gray-400">
      An online and offline survey involving 306 participants was conducted to examine the limitations of traditional science exhibitions and gauge interest in immersive educational technologies. Results indicated that 73% (223) of respondents believed conventional science displays lacked engaging spatial formats and narrative clarity. Furthermore, 76% (233) expressed a desire for immersive VR-based experiences to better understand abstract scientific concepts. These insights informed the design rationale and validated the project's direction.
    </p>
  </details>
</section>

{/* Process */}
<section id="process" className="rounded-lg bg-black mt-6 mb-6">
  <h2 className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Process</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">01 Ideation</h3>
      <p className="text-gray-400 text-sm">Brainstorming</p>
      <p className="text-gray-400 text-sm">Concept sketches</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">02 Analysis</h3>
      <p className="text-gray-400 text-sm">Context & precedents</p>
      <p className="text-gray-400 text-sm">Narrative flow</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">03 Development</h3>
      <p className="text-gray-400 text-sm">World/spatial/level design</p>
      <p className="text-gray-400 text-sm">Video development</p>
    </div>
  </div>
</section>

{/* Tools & Roles */}
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
          <td className="px-4 py-4">3D Assets, Space</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Texturing</td>
          <td className="px-4 py-4">Photoshop</td>
          <td className="px-4 py-4">PBR material maps</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Lighting & Rendering</td>
          <td className="px-4 py-4">Unreal Engine, 3ds Max</td>
          <td className="px-4 py-4">Spatial real-time renders</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Interaction / VR</td>
          <td className="px-4 py-4">Unreal Engine</td>
          <td className="px-4 py-4">VR Environment</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Graphics & Video</td>
          <td className="px-4 py-4">Adobe Suite, Runway AI</td>
          <td className="px-4 py-4">Artworks</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

{/* Design Highlights */}       
<section id="design" className="mt-6 mb-6">
  <h2 className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Design Highlights</h2>
  <ul className="space-y-3 text-gray-400">
    <li>• Virtual environment & worldbuilding.</li>
    <li>• Perceptual transformation from the explorer’s perspective.</li>
    <li>• Video production using AI generator.</li>
    <li>• Spatial design tailored to each chamber’s theme.</li>
    <li>• Chambers translate abstraction into felt space: distortion, reflection, growth, temporal shifts.</li>
  </ul>
</section>

          {/* Design Highlights table */} 
<div className="mt-6 mb-6">
  <div className="overflow-x-auto rounded-lg border border-white/10 bg-black">
    <table className="w-full text-left text-sm text-gray-400">
      <thead className="bg-white/5 text-gray-300 uppercase text-sm tracking-wider">
        <tr>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Indicator</th>
          <th className="px-4 py-3">Rationale / Data Source</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/10">
        <tr>
          <td className="px-4 py-4 font-light">Production</td>
          <td className="px-4 py-4">-70% Time Saved</td>
          <td className="px-4 py-4">Gen-AI Video Workflow: Produced a 3-minute high-fidelity AI video in ~7.5 hours (450 min); this represents a 70% reduction in lead time compared to traditional motion graphics production cycles for similar complexity.</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Accessibility</td>
          <td className="px-4 py-4">High Efficiency (Est.)</td>
          <td className="px-4 py-4">Knowledge Acquisition: Enhanced information retention and user convenience by transforming complex scientific data into an immersive VR/Video experience, reducing cognitive load for general audiences.</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Operational</td>
          <td className="px-4 py-4">Cost Efficiency (Est.)</td>
          <td className="px-4 py-4">Digital Showcasing: High-impact promotion and global distribution at a fraction of the cost (<5%) of physical pavilion construction, significantly reducing overhead for large-scale exhibitions.</td>
        </tr>
 
      
      </tbody>
    </table>
  </div>
</div>

          

            {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent" />
           
            {/* World buliding Image 1,2*/}
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <img
                  alt="World overview"
                  className="w-full h-full object-contain"
                  src="/webimages/Invisible/INV1.jpg"
                />
              </AspectRatio>
                   </div>

           {/* Line */}
            <div className="w-full h-px my-10 md:my-10 bg-transparent" />

           {/*Would building text start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Worldbuilding</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Set on a fictional alien planet(A233) inhabited by an advanced civilisation. The player, as an interstellar explorer, uncovered abandoned structures, artefacts, and messages. Despite a lack of shared language, both species were assumed to understand the same laws of nature. The narrative explored how universal science transcended cultural boundaries.
           </p>
           </div> 
           </div>

           <div className="w-full">   
              <img
                alt="World secondary"
                className="w-full h-auto mt-20 mb-20 md:mt-20 mb-20"
                src="/webimages/Invisible/INV2.jpg"
              />
            </div>

           {/*Narrative Arc text start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]"> Narrative Arc</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The experience followed a narrative arc centred around an unnamed interstellar explorer. Beginning with arrival on Planet A233, the user journeyed through a sequence of abandoned chambers, each corresponding to a universal scientific principle. The order of progression was intentionally designed to mirror an epistemological transformation—from perception to comprehension. As the user advanced, they transitioned from a sense of wonder and disorientation to clarity and resonance, ultimately recognising science as a shared, emotional, and symbolic language.
           </p>
           </div> 
           </div> 
          
           {/* Line */}
            <div className="w-full h-px mb-3 md:mb-3 bg-transparent" />

           {/*Narrative Arc text start2*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]"></h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The spatial progression of the chambers was crafted not only to convey scientific ideas, but to evoke a coherent emotional rhythm. Gravity aimed to instil awe and tension through vast, distorted space. Light encouraged curiosity and wonder through refractive spectacle. Life evoked empathy through growth and unpredictability. Time concluded the experience with a quiet sense of introspection and impermanence. These emotional states were interwoven with the scientific themes, reinforcing understanding by making abstract concepts experientially felt.
           </p>
           </div> 
           </div> 

            {/* Line */}
            <div className="w-full h-px my-4 md:my-4 bg-transparent" />

          {/*Vdieo Development text start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Video Development</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Each chamber embodied its theme via interactive and environmental cues (distorted space/reflective surfaces/organic growth/temporal transitions) to translate abstraction into felt experience.
            </p>
           </div> 
           </div>

            {/* Line */}
            <div className="w-full h-px my-10 md:my-10 bg-transparent" />

            {/* Video Development Image 1*/}
            <div className="w-full">
              <img
                className="w-full h-auto"
                src="/webimages/Invisible/INV3.jpg"
                alt="Video development board"
              />
            </div>

             {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent" />

            {/* Floor Plan Image 1*/}
             <div className="w-full mb-20 md:mb-20">
              <img className="w-full h-auto" src="/webimages/Invisible/INV4.jpg" alt="Floor plan" />
            </div>

           {/*Space text start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Spatial Design</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Each chamber expressed its theme through spatial and interactive cues.</p>
           </div> 
           </div>


             {/* Line */}
            <div className="w-full h-px my-1 md:my-1 bg-transparent" />


          
          {/*Space text 2*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
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





            

   


            {/* Line */}
            <div className="w-full h-px my-10 md:my-10 bg-transparent" />

            {/* Exterior Image 1*/}
             <div className="w-full">
              <img className="w-full h-auto" src="/webimages/Invisible/INV5.jpg" alt="Floor plan" />
            </div>

            {/* Line */}
            <div className="w-full h-px my-5 md:my-5 bg-transparent" />

            {/* 증빙컷 Image */}
             <div className="w-full mb-10 md:mb-10">
              <img className="w-full h-auto" src="/webimages/Invisible/INV6.jpg" alt="Floor plan" />
            </div>

            {/* 증빙컷 2*/}
             <div className="w-full">
              <img className="w-full h-auto" src="/webimages/Invisible/INV7.jpg" alt="Floor plan" />
            </div>

            {/* Line */}
            <div className="w-full h-px my-20 md:my-20 bg-transparent" />

             {/* Space Image 1*/}
             <div className="w-full mb-10 md:mb-10">
              <img className="w-full h-auto" src="/webimages/Invisible/INV8.jpg" alt="Floor plan" />
            </div>

            {/* Space Image 2*/}
             <div className="w-full mb-10 md:mb-10">
              <img className="w-full h-auto" src="/webimages/Invisible/INV9.jpg" alt="Floor plan" />
            </div>

             {/* Space Image 3*/}
             <div className="w-full mb-10 md:mb-10">
              <img className="w-full h-auto" src="/webimages/Invisible/INV10.jpg" alt="Floor plan" />
            </div>

            {/* Space Image 4*/}
             <div className="w-full">
              <img className="w-full h-auto" src="/webimages/Invisible/INV11.jpg" alt="Floor plan" />
            </div>
         
            {/* Line */}
            <div className="w-full h-px my-20 md:my-20 bg-transparent" />
 
            {/* Line */}
            <div className="w-full h-px my-20 md:my-20 bg-transparent" />

           {/* Full playing Video Section */}
<div className="my-40 md:my-40 relative"> {/* ✅ NEW: relative */}
  {/* ✅ 캡션 */}
  <p className="relative z-20 mb-4 md:mb-8 text-center text-white text-lg md:text-xl font-medium tracking-wide">
    Full playthrough Video
  </p>

  {/* ✅ FULL-BLEED 빨강판 (뷰포트 가로 100%) */}
  <div
    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[100vw]"
  >
    <AspectRatio ratio={16 / 9}>
      <div className="w-full h-full bg-[#AE0200]" />
    </AspectRatio>
  </div>

  {/* ✅ 플레이어 (위에 겹침) */}
  <AspectRatio ratio={16 / 9} className="relative z-10 rounded-lg border border-gray-800/50 overflow-hidden">
    <LiteYouTube
      id="KT0Cwy9s5n8"
      title="Project video"
      className="w-full h-full bg-transparent" 
    />
  </AspectRatio>
</div>

             {/* Line */}
            <div className="w-full h-px my-10 md:my-10 bg-transparent" />

            {/*Final Outcome text start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Final Outcome</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The project transforms scientific concepts into participatory and immersive storytelling experiences.
It moves beyond exhibition display to propose a new way of communicating scientific complexity through emotional engagement.
The framework can be expanded as a VR learning platform for science and natural history museums, offering a scalable model for institutions that aim to integrate immersive education and research-based exhibitions.
           </p>
           </div> 
           </div>

             {/* Line */}
            <div className="w-full h-px my-10 md:my-10 bg-transparent" />
          
           {/*Ocean Web Image1*/}        
          <div className="w-full">
            <img className="w-full h-full" src="/webimages/Invisible/INV12.jpg" />
          </div>

            {/* Line */}
            <div className="w-full h-px my-10 md:my-10 bg-transparent" />

            {/*Post-Project Direction text start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Post-Project Direction</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The initial prototype aimed for a VR experience but largely positioned the user as an observer, with limited interaction beyond spatial and visual exploration. Acknowledging this constraint, The Ocean is presented as a conceptual post-project exploration that outlines a responsive system in which user-entered data would drive autonomous evolutionary behaviours, informing the design of a future interactive build.
           </p>
           </div> 
           </div>

            {/* Line */}
            <div className="w-full h-px my-4 md:my-4 bg-transparent" />

           {/*The Ocean text start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">The Ocean(2025)</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400"> A responsive virtual ocean simulated autonomous life evolution based on user input. Different environmental conditions triggered emergent behaviours, reinforcing scientific thinking through exploration and experimentation.
           </p>
           </div> 
           </div>

            {/* Line */}
            <div className="w-full h-px my-10 md:my-10 bg-transparent" />

            {/* extra images */}
            <div className="w-full">
              <img className="w-full h-auto" src="/webimages/Invisible/INV13.jpg" />
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

            {/* Slider 2 */}
            <div className="w-full ">
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

          
          
            {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent" />

          

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

        {/* Navigation */}
        <div className="pb-40 md:pb-60 flex items-center justify-center">
          <Link
            to="/project/Seoul-Nature-History-Museum"
            className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium"
          >
            <span>Next project</span>
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
          </Link>
        </div>

        {/* Back to top */}
        <BackToTopButton/>

        {/* ============================
            ✅ NEW: 전용 스타일 (LQIP + 페이드 + content-visibility + 미세 모션)
            ============================ */}
        <style>{`
          /* 이미지 LQIP 블러 */
          .img-lqip { filter: blur(8px) saturate(0.9) brightness(0.98); transform: translateZ(0); transition: filter 420ms ease; }
          .img-lqip.reveal-show { filter: blur(4px); }

          /* 이미지 페이드 */
          .reveal-init { opacity: 0; filter: blur(3px); transition: opacity 720ms ease-out, filter 720ms ease-out; }
          .reveal-show { opacity: 1; filter: blur(0); }

          /* 텍스트 페이드 */
          .text-reveal-init { opacity: 0; transform: translateY(6px); transition: opacity 540ms ease-out, transform 540ms ease-out; will-change: opacity, transform; }
          .text-reveal-show { opacity: 1; transform: translateY(0); }

          /* 보일 때만 미세 모션 */
          @keyframes microWiggle {
            0%   { transform: translate3d(0, 0.6px, 0) scale(1.001); }
            50%  { transform: translate3d(0, -0.6px, 0) scale(1.004); }
            100% { transform: translate3d(0, 0.6px, 0) scale(1.001); }
          }
          .play-wiggle { animation: microWiggle 7s ease-in-out infinite; will-change: transform; }

          /* content-visibility로 오프스크린 렌더 비용 절감 */
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

export default InvisibleProjectDetail;
