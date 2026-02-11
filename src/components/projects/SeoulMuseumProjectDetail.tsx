import React, { useEffect } from 'react'; // ✅ NEW
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
// import YouTube from 'react-youtube'; // (미사용) 성능 최적화로 대체 ✅ NEW
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import ModelViewer from '@/components/ModelViewer';
import { seoulMuseumProjectData } from '@/data/seoulMuseumProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import ProjectHero from './shared/ProjectHero';
import ProjectMetadata from './shared/ProjectMetadata';
import ProcessGrid from './shared/ProcessGrid';
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
      <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" fetchPriority="low" />
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

const SeoulMuseumProjectDetail = () => {
  const project = seoulMuseumProjectData;
  const processSteps = [{
    title: "Brand Analysis",
    items: ["Heritage Study & Identity Research"]
  }, {
    title: "Spatial Design",
    items: ["Wayfinding System", "Visitor Experience"]
  }, {
    title: "Implementation",
    items: ["Brand Integration", "Modern Design Principles"]
  }];
  const heroRef = useScrollAnimation();

  /* ============================
     ✅ NEW: 이미지 LQIP + 지연 로딩 큐 + 스크롤 페이드 + content-visibility
     ============================ */
  useEffect(() => {
    // 🔧 ScrollArea는 자체 스크롤 컨테이너 → IO root를 그 뷰포트로 지정
    const scrollRoot =
      document.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]') // shadcn
      || document.querySelector<HTMLElement>('.h-screen.w-screen.overflow-auto')
      || null;

    // 투명 1x1 픽셀 (초기 네트워크 요청 차단용)
    const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';

    // 모든 이미지 수집
    const allImgs = Array.from(document.querySelectorAll<HTMLImageElement>('section img'));

    // LCP 후보(맨 위 큰 이미지)는 즉시 로드
    const lcpImg = allImgs[0];
    if (lcpImg) {
      lcpImg.loading = 'eager';
      (lcpImg as any).fetchPriority = 'high';
      lcpImg.decoding = 'async';
    }

    // 나머지 이미지는 공격적 지연 로딩 준비
    const lazyImgs = allImgs.slice(1);
    lazyImgs.forEach((img) => {
      if (img.dataset.lazyEnhanced === '1') return; // 중복 방지
      img.dataset.lazyEnhanced = '1';

      const originalSrc = img.getAttribute('src');
      if (!originalSrc) return;

      img.setAttribute('data-src', originalSrc);
      img.setAttribute('src', transparentPixel);
      img.loading = 'lazy';
      img.decoding = 'async';
      (img as any).fetchPriority = 'low';

      // LQIP 블러 + 페이드 초기 상태
      img.classList.add('img-lqip', 'reveal-init'); // 보일 때만 해제
    });

    /* ----------------------------
       🚀 PERF: 지연 로딩 큐 (동시 2개)
       ---------------------------- */
    const MAX_CONCURRENT = 2;
    const queue: HTMLImageElement[] = [];
    let inFlight = 0;

    const processQueue = () => {
      while (inFlight < MAX_CONCURRENT && queue.length) {
        const img = queue.shift()!;
        if (!img || img.dataset.loaded === '1') continue;

        inFlight++;
        const doReveal = () => {
          requestAnimationFrame(() => {
            img.classList.add('reveal-show');
            img.classList.add('play-wiggle'); // 보일 때만 모션 켬
            img.dataset.loaded = '1';
            inFlight--;
            processQueue();
          });
        };

        const ds = img.getAttribute('data-src');
        if (ds && img.src !== ds) img.src = ds;

        if (typeof (img as any).decode === 'function') {
          (img as any).decode().then(() => {
            img.classList.remove('img-lqip');
            doReveal();
          }).catch(() => {
            img.classList.remove('img-lqip');
            doReveal();
          });
        } else {
          const onLoad = () => {
            img.removeEventListener('load', onLoad);
            img.classList.remove('img-lqip');
            doReveal();
          };
          img.addEventListener('load', onLoad);
        }
      }
    };

    // 이미지 관찰자: 근접 시 큐에 추가
    const imgIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target as HTMLImageElement;
          if (entry.isIntersecting) {
            imgIO.unobserve(img);
            queue.push(img);
            processQueue();
          } else {
            img.classList.remove('play-wiggle');
          }
        });
      },
      {
        root: scrollRoot,
        rootMargin: '200px 0px',
        threshold: 0.05
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
            {project.heroSubtitle}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
            <span>2021</span>
            <span>•</span>
            <span>Bachelor's Graduation Project</span>
            <span>•</span>
            <span>Spatial Designer</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="cv-auto"> {/* ✅ NEW: content-visibility */}
        {/* First Image - Updated */}
        <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] z-10">
          <img
            alt={`${project.title} - Image 1`}
            className="w-full h-auto object-contain"
            src="/lovable-uploads/db58f1e0-0fea-4b68-953c-59d4580ad411.png"
            loading="eager"           // ✅ NEW
            fetchpriority="high"     // ✅ NEW
            decoding="async"         // ✅ NEW
          />
        </div>

      {/* Shared Container */}
       <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] mt-20 md:mt-20">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
    
       {/* Left Column */}
       <div>
       {/* Title */}
       <h2 className="text-xl md:text-xl font-bold text-white leading-tight mb-6">
       Seoul Natural History Museum
       </h2>

      {/* Location + Year */}
      <p className="text-base md:text-base font-bold text-gray-500 mb-10">
        2021 │ Spatial Design │ Solo Project │ 16 weeks
      </p>

      {/* ✅ NEW: Image under location/year */}
      <div className="w-full h-[400px] overflow-hidden flex items-center justify-center">
        <img
          src="/lovable-uploads/web1920-SeoulNatural-25.png"
          alt={project.title}
          className="w-full h-full"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-6">

   
    <p className="text-base md:text-base mb-2 text-white leading-relaxed font-Medium">
     BA Graduation Project
    </p>   
       
    <p className="text-base md:text-base text-gray-400 leading-relaxed font-light">
    This project proposes a conceptual and spatial renewal of the Seodaemun Museum of Natural History, Korea's first public natural history museum. The redesign envisions a new identity—Seoul Natural History Museum—grounded in Korea's cultural relationship with nature, particularly from the perspective of traditional hunters. The project spans spatial reconfiguration, exhibition curation, branding, and product design.
    </p>

       <p className="text-base md:text-base text-gray-400 leading-relaxed font-light">
    Initiated as a graduation project, the proposal was developed by requesting a brief from Seodaemun Museum of Natural History and receiving curatorial feedback during the process.
       </p>
       
    <div className="text-base md:text-base text-gray-300 leading-relaxed font-Medium">
   <p className="text-base md:text-base mb-2 text-white leading-relaxed font-Medium">
      Client
    </p>
     <p className="text-base md:text-base text-gray-400 leading-relaxed font-light">
     Seodaemun Museum of Natural History
     </p>
      </div>
    

       
       <div className="mb-6 mt-6 md:mt-6"> 
         <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
      The Brief
          </h2>
       <p className="text-base md:text-base lg:text-base leading-relaxed font-light text-gray-400">
        As one of Seoul’s earliest natural history museums, the institution has served the public for decades. However, much of its spatial layout and exhibition language remain rooted in traditional display methods, limiting its relevance to contemporary audiences.
       </p>
      </div>

     <details className="mt-4 mb-6 rounded-lg border border-white/10 bg-black">
      <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
         Full Brief
       </summary>

        <div className="px-4 pb-4 pt-6 space-y-4">
    <div>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        1. Propose a new, distinctly Korean concept not previously introduced.
      </p>
    </div>

    <div>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        2. Maximize the use of the existing spatial framework.
      </p>
    </div>


  </div>
</details>

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
      <div className="w-full h-full bg-[#F7931E]" />
    </AspectRatio>
  </div>

  <AspectRatio ratio={16 / 9} className="relative z-10 rounded-lg border border-gray-800/50 overflow-hidden">
    <LiteYouTube
      id="8GEK3igRom0" 
      title="Seoul Museum Project Video"
      className="w-full h-full bg-transparent"  
    />
  </AspectRatio>
</div>
          
         {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-black"></div>

{/* Summary */}
<section aria-labelledby="sum-title" className="mt-6 mb-6">
  <h2 id="sum-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">
    Summary
  </h2>
  <div className="grid md:grid-cols-3 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Challenge</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
         <li>Outdated façade & interiors</li>
         <li>Weak cultural identity</li>
         <li>Limited visitor engagement</li>
      </ul>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Approach</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                    <li>Contemporary landmark façade</li>
                    <li>Spatial renewal & circulation upgrade</li>
                    <li>Immersive storytelling + interactive media</li>
     
      </ul>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Result</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                    <li>Repositioned as cultural landmark</li>
                    <li>Enhanced visitor experience</li>
                    <li>Alignment with modern expectations</li>
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
      Redefined the museum's identity by repositioning it through the lens of traditional Korean hunters. This narrative perspective shaped the exhibition tone, user experience, and spatial arrangement, bridging heritage interpretation with modern interaction design.
      </p>
    </div>
    <div>
      <h3 className="text-sm font-light text-gray-300 mb-3">Project Purpose</h3>
      <p className="text-sm leading-relaxed font-light text-gray-400">
     The museum’s collection is valued, yet its outdated grey façade, obsolete interiors, and weak identity limit its appeal—often compared to a municipal office rather than a cultural institution. A renewal strategy is proposed: redefine the façade with a contemporary landmark identity, update interiors for better circulation and engagement, and integrate immersive storytelling and interactive media. These changes would reposition the museum as a dynamic cultural space aligned with modern expectations.
     </p>
    </div>
    <div>
      <h3 className="text-sm font-light text-gray-300 mb-3">Development Strategy</h3>
      <p className="text-sm leading-relaxed font-light text-gray-400">
Moved away from passive, linear layouts towards participatory and immersive experiences. Reinterpreted outdated specimen-dense layouts with layered environmental cues, emphasising active visitor engagement. Reception, gift shop, and circulation were integrated with symbolic and narrative depth to enhance institutional coherence.
     </p>
    </div>
   
  </div>
</details>

{/* Research */}
<section id="research" aria-labelledby="research-title" className="mt-6 mb-6">
  <h2 id="research-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Research</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">84%</p>
      <p className="text-sm text-gray-400 mt-2">demand renewal</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">64%</p>
      <p className="text-sm text-gray-400 mt-2">lacked a uniquely Korean perspective</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">213</p>
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
     A survey was conducted with 213 individuals who had previously visited the Seodaemun Museum of Natural History, either on-site or online. Among them, 32 participants had also experienced renowned natural history museums abroad. While the museum's collection of specimens was largely appreciated, 84% of respondents (179 people) highlighted the need for spatial and interior renewal. Critical feedback pointed to the building's outdated grey façade and lack of distinctive identity, often being compared to a generic municipal office rather than a museum.
    </p>

   <p className="mt-3 text-sm text-gray-400">
    In addition, 72% (153 people) felt that the exhibitions relied too heavily on static text and specimens, lacking engaging storytelling or interactive interpretation. 67% (142 people) expressed disappointment at the absence of digital media or interactive technologies such as AR and VR. 59% (126 people) noted insufficient accessibility and inclusivity, citing limited multilingual support and lack of tactile features for disabled visitors. Importantly, 64% (137 people) highlighted the absence of a uniquely Korean perspective, observing that the museum resembled a generic international format rather than reflecting local cultural identity. Finally, 71% (151 people) emphasized the need for stronger community and educational engagement, pointing out the lack of workshops, public programs, and collaborations with schools.
   </p>

   <p className="mt-3 text-sm text-gray-400">
    The findings reveal a strong demand not only for architectural redefinition but also for narrative, technological, and cultural transformation that aligns with contemporary expectations for cultural institutions.
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
      <p className="text-gray-400 text-sm">Context & Problem Analysis</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">03 Development</h3>
      <p className="text-gray-400 text-sm">Brand identity redefinition</p>
      <p className="text-gray-400 text-sm">Spatial / Product / Exhibition design</p>
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
          <td className="px-4 py-4">AutoCAD, 3ds Max, Blender</td>
          <td className="px-4 py-4">3D Product images, Space</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Texturing</td>
          <td className="px-4 py-4">Photoshop</td>
          <td className="px-4 py-4">PBR material maps</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Lighting & Rendering</td>
          <td className="px-4 py-4">V-Ray</td>
          <td className="px-4 py-4">Spatial image renders</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">VR Museum</td>
          <td className="px-4 py-4">Unreal Engine</td>
          <td className="px-4 py-4">Spatial real-time renders</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Graphics</td>
          <td className="px-4 py-4">Adobe Suite</td>
          <td className="px-4 py-4">Exhibition panels, accessibility assets, Artworks</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

{/* Design Highlights */}       
<section id="design" className="mt-6 mb-6">
  <h2 className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Design Highlights</h2>
  <ul className="space-y-3 text-gray-400">
    <li>• Identity: Rebranded through hunter’s worldview.</li>
    <li>• Space: From static to immersive, participatory layouts.</li>
    <li>• Narrative: Respectful coexistence with nature as storyline.</li>
  </ul>
</section>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-black"></div>

          {/*Site Image*/}     
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-20" src="/webimages/SNM/SNM1.jpg" loading="lazy" decoding="async" fetchPriority="low" />
          </div>   
         
           {/*Site Selection text start*/}

           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Site Selection</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">서울특별시 서대문구 연희로 32길 51 (연희동 서대문자연사 박물관)</p>
           </div> 
           </div> 
           {/* Line */}
            <div className="w-full h-px mb-3 md:mb-3 bg-gray-black" />
         
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]"></h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">51, Yeonhui-ro, 32-gil, Seodaemun-gu. Seoul, Republic of Korea</p>
           </div> 
           </div>

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

          {/*Problem Image2*/}     
          <div className="w-full">
            <img className="w-full h-full" src="/webimages/SNM/SNM2.jpg" loading="lazy" decoding="async" fetchPriority="low" />
          </div>     

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

          {/*Problem Text*/} 
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
              <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">
                Problem Analysis
              </h2>
             <div className="flex flex-col space-y-4 md:space-y-4 ">
            <div>
              <h3 className="text-sm md:text-sm lg:text-sm font-light mb-3 md:mb-3 min-w-[200px] text-gray-300">
               Overcrowded Specimen Displays
               </h3>
              <p className="text-sm md:text-sm lg:text-sm leading-relaxed text-gray-400 font-light mb-4 md:mb-4">The museum's densely classified displays obscure environmental context and hinder engagement, presenting specimens in ways misaligned with local sensibilities.</p>

              <h3 className="text-sm md:text-sm lg:text-sm font-light mb-3 md:mb-3 min-w-[200px] text-gray-300">
               Passive Viewing Format
               </h3>
              <p className="text-sm md:text-sm lg:text-sm leading-relaxed text-gray-400 font-light mb-4 md:mb-4">The exhibition's linear layout limits engagement, reducing the experience to passive viewing with little interaction or depth.
              </p>

              <h3 className="text-sm md:text-sm lg:text-sm font-light mb-3 md:mb-3 min-w-[200px] text-gray-300">
               Lack of Identity in Spatial Elements
               </h3>
              <p className="text-sm md:text-sm lg:text-sm leading-relaxed text-gray-400 font-light">The space lacks visual cohesion, with outdated elements creating a bland, institutional feel that weakens cultural resonance.
              </p>
              </div>
             </div>
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>
          
          {/* Narrative */}
          <div className="w-full">
            <img className="w-full h-full" src="/webimages/SNM/SNM3.jpg" loading="lazy" decoding="async" fetchPriority="low" />
          </div> 

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

           {/*Narrative Arc text start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]"> Narrative Arc</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">In late Joseon Korea, hunters viewed nature not merely as a means of survival, but as a realm of spiritual reverence—tracking animals with care and honoring their lives, often referring to tigers as San-gun, or "Mountain Lord." This ethos of respect extended to falconry, where Maekkun formed mutual bonds with wild hawks, never claiming ownership and accepting their release with grace. Rooted in this worldview, the project Through the Eyes of a Hunter reimagines the Seodaemun Museum of Natural History as a culturally grounded space, transforming static displays into an interpretive journey shaped by Korean perspectives on nature, coexistence, and memory.
           </p>
           </div> 
           </div> 

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

          {/* Floor Plan */}
            <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM4.jpg" loading="lazy" decoding="async" fetchPriority="low" />
             </div>

          {/*Line*/} 
          <div className="w-full h-px my-5 md:my-5 bg-black"></div>

          {/* Floor Plan2 */}
            <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM5.jpg" loading="lazy" decoding="async" fetchPriority="low" />
             </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-black"></div>

          {/*Exhibition Plan*/}
          <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM6.jpg" loading="lazy" decoding="async" fetchPriority="low" />
             </div>

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

            {/*Spatial & Exhibition text 1*/}
           <div className="mb-3 flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Spatial & Exhibition Design</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">As visitors ascend from the Marine Hall to the upper Terrestrial Halls, the exhibition textures gradually shift—becoming coarser to reflect how stone is shaped by different environments: the sea smooths, rivers carve, and mountains fracture. This erosion gradient is embedded into the museum's spatial and sculptural design, using stone as a visual language to express the distinct ecological logic of each zone.
           </p>
           </div> 
           </div> 

           {/*Spatial & Exhibition text 2*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]"></h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The project involved iterative testing and feedback to refine the spatial atmosphere, while custom built-in furniture was modeled to reflect the museum’s identity and reinforce its relationship with the surrounding space.
           </p>
           </div> 
           </div> 

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

          {/*증빙 Images*/}
          <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM7.jpg" loading="lazy" decoding="async" fetchPriority="low" />
              </div>

          {/*Line*/} 
          <div className="w-full h-px my-5 md:my-5 bg-black"></div>

          {/*증빙 Images 2*/}
          <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM8.jpg" loading="lazy" decoding="async" fetchPriority="low" />
              </div>

           {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

           {/*Built-in display cases Text 1*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Built-in display cases</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Visitors encounter a sequence of built-in wall cabinets, each dedicated to a specific theme—from preserved biological specimens to rare books and historical artifacts—creating layered moments of discovery throughout the exhibition.
           </p>
           </div> 
           </div> 

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

           {/*Built-in 1*/}
           <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM9.jpg" loading="lazy" decoding="async" fetchPriority="low" />
           </div>

          {/*Line*/} 
          <div className="w-full h-px my-5 md:my-5 bg-black"></div>

           {/*Built-in 2*/}
           <div className="w-full">
           <img className="w-full h-auto " src="/webimages/SNM/SNM10.jpg" loading="lazy" decoding="async" fetchPriority="low" />
           </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-black"></div>

          {/*Lobby Images*/}
          <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM11.jpg" loading="lazy" decoding="async" fetchPriority="low" />
              </div>

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

           {/*Reception Desk Text 1*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Reception Desk</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The reception area introduces visitors to the museum's renewed identity through a vertical sculptural installation that spans all three floors. Behind the desk, a folding-screen-inspired frame and mountain-shaped artwork evoke Korean cultural and geographic heritage—establishing a strong sense of place upon entry.
           </p>
           </div> 
           </div> 

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

         {/*Lobby Images2*/}
          <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM12.jpg" loading="lazy" decoding="async" fetchPriority="low" />
              </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-20 bg-black"></div>

          {/*Exhibition Hall*/}
           <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM13.jpg" loading="lazy" decoding="async" fetchPriority="low" />
              </div>

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

          {/*Exhibition Hall comments*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]"> Exhibition Hall</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The exhibition unfolds across two ecological zones: the first floor (Marine Zone) draws inspiration from ocean currents, with immersive media and fluid spatial divisions that evoke the rhythm of the sea; while the second and third floors (Terrestrial Zone) explore land-based habitats through layered displays that combine natural specimens with historical artefacts, such as traditional hunting tools. A vertical sculptural void connects all levels, symbolising the continuous flow of ecological systems throughout the museum.
              </p>
           </div> 
           </div> 

           {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

          {/*Exhibtion Hall 2*/} 
            <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM14.jpg" loading="lazy" decoding="async" fetchPriority="low" />
              </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-20 bg-black"></div>

           {/*Rest Area Image 1*/}
           <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM15.jpg" loading="lazy" decoding="async" fetchPriority="low" />
              </div>

           {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

           {/*2F Rest Area Text*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]"> 2F Rest Area</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">A rest area styled as a hunter’s study, showcasing personal collections, insects, and expedition artifacts. The space encourages quiet observation and offers an elevated view of the vertical glass sculpture linking all three floors.
           </p>
           </div> 
           </div> 

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

            {/*Rest Area Image 2*/}
           <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM16.jpg" loading="lazy" decoding="async" fetchPriority="low" />
              </div>

           {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-black"></div>

          {/* Product Design Section */}
          <div className="rounded-lg bg-transparent">
            <img className="w-full h-auto" src="/webimages/SNM/SNM17.jpg" loading="lazy" decoding="async" fetchPriority="low" />

           {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>
            
            {/*2F Gift Shop Text*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Gift Shop</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The gift shop concept features products inspired by native Korean species, reinforcing the museum’s identity. Items include collectible cards of endangered animals and resin-encased specimens of Korean insects.
           </p>
           </div> 
           </div>   

           {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>
             
              <div className="w-full ">
 
              <img className="w-full h-auto" src="/webimages/SNM/SNM18.jpg" loading="lazy" decoding="async" fetchPriority="low" />
            </div>
          </div>

           {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-black"></div>

          {/*Final Outcome image*/}
          <div className="w-full">
            <img className="w-full h-auto " src="/webimages/SNM/SNM19.jpg" loading="lazy" decoding="async" fetchPriority="low" />
              </div>

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>

            {/*Final Outcome Text*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Final Outcome</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Delivered a complete, testable museum experience encompassing space, identity, product, and narrative logic. With the support of Seodaemun Museum of Natural History, a seven-day solo exhibition was conducted within the museum, incorporating feedback from both visitors and staff. Structured for ongoing refinement, the work anticipates future feedback loops through public interaction and prototyping.
           </p>
           </div> 
           </div>   

           {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-black"></div>      

          {/*End Image */}
           <div className="w-full mb-40 md:mb-40">
            <img src="/webimages/SNM/SNM20.jpg" className="w-full h-auto mb-40 md:mb-0" loading="lazy" decoding="async" fetchPriority="low" />
              </div>
          
        </div>
      </section>
      
      {/*Navigation Section*/}
      <div className="pb-40 md:pb-60 flex items-center justify-center mt-40 ">
        <Link to="/project/Whispers-from-the-Bottom" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
          <span>Next project</span>
          <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
        </Link>
      </div>
      
      {/* Remaining Images */}
      {project.images.slice(1).map((image, index) => <div key={index + 1} className="mb-20">
          <div className="w-full">
            <AspectRatio ratio={16 / 9} className="w-full">
              <ImageWithLoading src={image} alt={`${project.title} - Image ${index + 2}`} className="w-full h-full object-cover" />
            </AspectRatio>
          </div>
        </div>)}
        
      <BackToTopButton />

      {/* ============================
          ✅ NEW: 전용 스타일 (LQIP + 페이드 + content-visibility + 근접재생 모션)
          ============================ */}
      <style>{`
        /* LQIP 블러 상태 */
        .img-lqip { filter: blur(8px) saturate(0.9) brightness(0.98); transform: translateZ(0); transition: filter 420ms ease; }
        .img-lqip.reveal-show { filter: blur(4px); }

        /* 이미지: 스크롤 페이드 */
        .reveal-init { opacity: 0; filter: blur(3px); transition: opacity 720ms ease-out, filter 720ms ease-out; }
        .reveal-show { opacity: 1; filter: blur(0); }

        /* 이미지: '보일 때만' 미세 모션 */
        @keyframes microWiggle {
          0%   { transform: translate3d(0, 0.6px, 0) scale(1.001); }
          50%  { transform: translate3d(0, -0.6px, 0) scale(1.004); }
          100% { transform: translate3d(0, 0.6px, 0) scale(1.001); }
        }
        .play-wiggle { animation: microWiggle 7s ease-in-out infinite; will-change: transform; }

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

export default SeoulMuseumProjectDetail;
