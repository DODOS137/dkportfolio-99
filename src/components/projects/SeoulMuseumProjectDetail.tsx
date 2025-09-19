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
        <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] z-10">        
          {/* Project Description */}
          <div className="rounded-lg bg-transparent mt-20 md:mt-40">
            <h2 className="text-xl md:text-xl lg:text-xl mb-6 md:mb-8 text-white font-light">
              Seoul Natural History Museum
            </h2>
            <p className="text-base md:text-base lg:text-base text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
            This project proposes a conceptual and spatial renewal of the Seodaemun Museum of Natural History, Korea's first public natural history museum. The redesign envisions a new identity—Seoul Natural History Museum—grounded in Korea's cultural relationship with nature, particularly from the perspective of traditional hunters. The project spans spatial reconfiguration, exhibition curation, branding, and product design.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-sm">
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">project type</h3>
                <p className="text-white">Bachelor's Graduation Project</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">Project category</h3>
                <p className="text-white">Spatial Design</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">team</h3>
                <p className="text-white">Solo Project</p>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase tracking-wider mb-2">DURATION</h3>
                <p className="text-white">16 weeks</p>
              </div>
            </div>
          </div>


  {/* Client Section */}
   {/* 반반 레이아웃 */}
   <div className="rounded-lg bg-transparent cv-auto"> {/* ✅ NEW */}
  <div className="mb-8 mt-20 md:mt-20 px-0"> 
    <h2 className="text-xl md:text-xl font-light text-white min-w-[200px] mb-6 md:mb-8">
      Client
    </h2>

    {/* 텍스트:로고 = 1fr : auto, 오른쪽 딱 붙이기 */}
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-start gap-0">
      {/* 텍스트 영역 */}
      <div className="min-w-0">
        <p className="text-base md:text-base lg:text-base leading-relaxed font-light text-gray-300">
         Seodaemun Museum of Natural Hisoty
        </p>
      </div>

      {/* 로고 영역 (우측 끝에 붙임) */}
      <div className="min-w-0 m-0 p-0 justify-self-end">
        <img
          src="/lovable-uploads/web1920-S.N-25.png"
          alt="UNESCO Logo"
          className="block m-0 w-auto max-h-28 md:max-h-32 object-contain border-0 ring-0 outline-none shadow-none"
          loading="lazy"        // ✅ NEW
          decoding="async"      // ✅ NEW
          fetchpriority="low"   // ✅ NEW
        />
      </div>
      
    </div>
   
    
    <div className="mb-8 mt-20 md:mt-20"> 
         <h2 className="text-xl md:text-xl font-light text-white min-w-[200px] mb-6 md:mb-8">
      The Brief
          </h2>
       <p className="text-base md:text-base lg:text-base leading-relaxed font-light text-gray-300">
       Design a spatial renewal strategy that increases visitor engagement through immersive storytelling and interactive media. The proposal should address outdated interiors, limited identity, and reposition the museum as a dynamic hub for science and culture.
      </p>
       
      </div>

     <details className="mt-8 mb-20 rounded-lg border border-white/10 bg-black">
      <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
         Full Brief
  </summary>
  <div className="px-4 pb-4 pt-6 space-y-8">
     <div>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
       (Developed as a bachelor’s graduation project, the work involved proposing a reverse brief to the Seodaemun Museum of Natural History. The project received institutional feedback, enabling design refinement based on real-world expectations for museum renewal.
         While not a direct commission, the project was conducted in dialogue with the museum, positioning the work within a professional framework of client-oriented research and feedback.)
       </p>
    </div>
     
     <div>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        1. Renewal – Redefine outdated spaces with a contemporary design language.
      </p>
    </div>

    <div>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        2. Interior & Circulation – Upgrade spatial flow and modernise interiors to enhance visitor comfort.
      </p>
    </div>

  </div>
</details>
 </div>
</div>

          {/* YouTube Video Section */}
          <div className="rounded-lg bg-transparent mb-40 mt-40 md:mb-40">
            <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-transparent">
              <AspectRatio ratio={16 / 9} className="w-full">
                {/* <YouTube videoId="8GEK3igRom0" ... />  */} {/* ✅ REPLACED */}
                <LiteYouTube id="8GEK3igRom0" title="Seoul Museum Project Video" /> {/* ✅ NEW */}
              </AspectRatio>
            </div>
          </div>

         {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-black"></div>
          
          {/* Summary */}
            <section aria-labelledby="sum-title" className="mt-8">
              <h2 id="sum-title" className="text-xl md:text-xl font-light text-gray-300 mb-8">
                Summary
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Challenge</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Outdated façade & interiors</li>
                    <li>Weak cultural identity</li>
                    <li>Limited visitor engagement</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Approach</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Contemporary landmark façade</li>
                    <li>Spatial renewal & circulation upgrade</li>
                    <li>Immersive storytelling + interactive media</li>
                    
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Result</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Repositioned as cultural landmark</li>
                    <li>Enhanced visitor experience</li>
                    <li>Alignment with modern expectations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Full text */}
            <details className="mt-8 mb-20 rounded-lg border border-white/10 bg-black">
              <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">Full text</summary>
              <div className="px-4 pb-4 mt-6 space-y-8">
                <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Approach</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                    Redefined the museum's identity by repositioning it through the lens of traditional Korean hunters. This narrative perspective shaped the exhibition tone, user experience, and spatial arrangement, bridging heritage interpretation with modern interaction design.</p>
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
            <section id="research" aria-labelledby="research-title" className="mb-20">
              <h2 id="research-title" className="text-xl md:text-xl font-light text-gray-300 mb-6">Research</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">84%</p>
                  <p className="text-sm text-gray-400 mt-2">demand renewal</p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">213</p>
                  <p className="text-sm text-gray-400 mt-2">participants surveyed</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-2xl md:text-xl font-light text-white">Insight</p>
                  <p className="text-sm text-gray-400 mt-2">Need for architectural redefinition and experiential enhancement
                  </p>
                </div>
              </div>

              <details className="mt-8 rounded-lg border border-white/10 bg-black p-4">
                <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
                <p className="mt-8 text-sm text-gray-400">
                A survey was conducted with 213 individuals who had previously visited the Seodaemun Museum of Natural History, either on-site or online. Among them, 32 participants had also experienced renowned natural history museums abroad. While the museum's collection of specimens was largely appreciated, 84% of respondents (179 people) highlighted the need for spatial and interior renewal. Critical feedback pointed to the building's outdated grey façade and lack of distinctive identity, often being compared to a generic municipal office rather than a museum. The results revealed a strong demand for architectural redefinition and experiential enhancement that aligns with contemporary expectations for cultural institutions.
                </p>
              </details>
            </section>

            {/* Process */}
            <section id="process" className="rounded-lg bg-black">
              <h2 className="text-xl md:text-xl font-light mb-8 md:mb-8 text-gray-300">Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-20">
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                  <h3 className="text-white font-light mb-3">01 Ideation</h3>
                  <p className="text-gray-400 text-sm">Brainstorming</p>
                  <p className="text-gray-400 text-sm">Concept sketches</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                  <h3 className="text-white font-light mb-3">02 Analysis</h3>
                  <p className="text-gray-400 text-sm">Context & Problem Analysis</p>
                  <p className="text-gray-400 text-sm">Context & precedents</p>
                  
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                  <h3 className="text-white font-light mb-3">03 Development</h3>
                  <p className="text-gray-400 text-sm">Brand identity redefinition</p>
                  <p className="text-gray-400 text-sm">Spatial / Product / Exhibition design</p>
                
                </div>
              </div>
            </section>

            {/* Tools & Roles */}
            <div className="mb-20 md:mb-20">
              <h2 className="text-xl md:text-xl font-light text-gray-300 mb-6 md:mb-8">Tools & Roles</h2>
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
                      <td className="px-4 py-4">3D Assets, Space, Product </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Texturing</td>
                      <td className="px-4 py-4">Photoshop</td>
                      <td className="px-4 py-4">PBR materials</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Lighting & Render</td>
                      <td className="px-4 py-4">V-Ray</td>
                      <td className="px-4 py-4">Spatial ambience renders</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Interaction / VR</td>
                      <td className="px-4 py-4">Unreal Engine</td>
                      <td className="px-4 py-4">VR Environment</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Graphics</td>
                      <td className="px-4 py-4">Adobe Suite, Runway AI</td>
                      <td className="px-4 py-4">Exhibition panels, accessibility assets</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

    {/* Design Highlights */}       
    <section id="design" className="mt-10">
  <h2 className="text-xl md:text-xl font-light text-gray-300 mb-6">Design Highlights</h2>
  <ul className="space-y-3 text-gray-300">
    <li>• Identity: Rebranded through hunter’s worldview.</li>
    <li>• Space: From static to immersive, participatory layouts.</li>
    <li>• Narrative: Respectful coexistence with nature as storyline.</li>
   
  </ul>

  <details className="mt-8 rounded-lg border border-white/10 bg-black p-4">
    <summary className="cursor-pointer text-sm text-gray-400">Full text</summary>
    <div className="mt-8 space-y-4 text-sm text-gray-400">

              {/*idea development text start*/}
            
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
               Site Selection
              </h2>
            </div>
          </div>
      
      
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Problem Analysis
              </h2>
             <div className="flex flex-col space-y-6 md:space-y-8 ">
            <div>
              <h3 className="text-sm md:text-sm lg:text-sm font-light mb-6 md:mb-8 min-w-[200px] text-gray-400">
               Overcrowded Specimen Displays
               </h3>
              <p className="text-sm md:text-sm lg:text-sm leading-relaxed text-gray-400 font-light">The museum's densely classified displays obscure environmental context and hinder engagement, presenting specimens in ways misaligned with local sensibilities.</p>

              <h3 className="text-sm md:text-sm lg:text-sm font-light mb-6 md:mb-8 min-w-[200px] text-gray-400">
               Passive Viewing Format
               </h3>
              <p className="text-sm md:text-sm lg:text-sm leading-relaxed text-gray-400 font-light">The exhibition's linear layout limits engagement, reducing the experience to passive viewing with little interaction or depth.
              </p>

              <h3 className="text-sm md:text-sm lg:text-sm font-light mb-6 md:mb-8 min-w-[200px] text-gray-400">
               Lack of Identity in Spatial Elements
               </h3>
              <p className="text-sm md:text-sm lg:text-sm leading-relaxed text-gray-400 font-light">The space lacks visual cohesion, with outdated elements creating a bland, institutional feel that weakens cultural resonance.
              </p>
              </div>
             </div>
          
            </div>
          </div>
        
             <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                Narrative Arc
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">In late Joseon Korea, hunters viewed nature not merely as a means of survival, but as a realm of spiritual reverence—tracking animals with care and honoring their lives, often referring to tigers as San-gun, or "Mountain Lord." This ethos of respect extended to falconry, where Maekkun formed mutual bonds with wild hawks, never claiming ownership and accepting their release with grace. Rooted in this worldview, the project Through the Eyes of a Hunter reimagines the Seodaemun Museum of Natural History as a culturally grounded space, transforming static displays into an interpretive journey shaped by Korean perspectives on nature, coexistence, and memory.
              </p>
              </div>
          </div>

            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
              Spatial & Exhibition

              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">As visitors ascend from the Marine Hall to the upper Terrestrial Halls, the exhibition textures gradually shift—becoming coarser to reflect how stone is shaped by different environments: the sea smooths, rivers carve, and mountains fracture. This erosion gradient is embedded into the museum's spatial and sculptural design, using stone as a visual language to express the distinct ecological logic of each zone.
              </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                 Final Outcome
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Delivered a complete, testable museum experience encompassing space, identity, product, and narrative logic. The project is structured for future feedback loops through public interaction and prototyping.
              </p>
              </div>
            </div>

             </div>  
             </details>
           </section>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-black"></div>

          {/*Site Image*/}     
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/6738a528-de77-4edc-b034-3e77c4fc50d0.png" />
          </div>   

          {/*Site Image*/}     
          <div className="w-full">
            <img className="w-full h-full" src="/lovable-uploads/b198fa56-2b47-4b29-8cde-90478a687f5b.png" />
          </div>     

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-20 bg-black"></div>

          {/* Narrative */}
          <div className="w-full">
            <img className="w-full h-full" src="/lovable-uploads/51157240-a9c5-460b-aa6c-d0dff38ae86e.png" />
          </div> 

                

          {/* Floor Plan */}
          <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/158cf471-6a66-466d-b78a-90eb5b9cb682.png" />
            <img className="w-full h-auto" src="/lovable-uploads/fa2525e7-6df4-4a9d-91bf-2fa5260afc6d.png" />
          </div>

          {/*Exhibtion Plan*/}
          <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/11615802-b3be-45ae-b796-562156a2ffe9.png" />
             </div>


          {/* Spatial Design */}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16">  
              <h2 className="text-xl md:text-2xl font-light mb-6 md:mb-8 text-gray-300 min-w-[200px]">Spatial Design</h2>
             </div>
         </div>

          {/*Lobby Images*/}
          <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/2d5ad0c5-c648-41c4-952f-2bf356a1bbe1.png" />
              </div>

          <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/2c1579d8-8849-44ef-b82b-60f0a459098c.png" />
              </div>

         {/*Lobby comments*/}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40 mt-20 md:mt-40">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 whitespace-nowrap min-w-[200px]">
                Reception Desk 
              </h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">The reception area introduces visitors to the museum's renewed identity through a vertical sculptural installation that spans all three floors. Behind the desk, a folding-screen-inspired frame and mountain-shaped artwork evoke Korean cultural and geographic heritage—establishing a strong sense of place upon entry.
              </p>
              </div>
          </div>

          {/*Exhibtion Hall*/}
           <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/6c195957-4548-4480-b204-fa616c83621b.png" />
              </div>

          <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/8c62ae91-46c3-431b-a691-98c542349817.png" />
              </div>

         {/*Exhibition Hall comments*/}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40 mt-20 md:mt-40">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 whitespace-nowrap min-w-[200px]">
                Exhibition Hall
              </h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">The exhibition unfolds across two ecological zones: the first floor (Marine Zone) draws inspiration from ocean currents, with immersive media and fluid spatial divisions that evoke the rhythm of the sea; while the second and third floors (Terrestrial Zone) explore land-based habitats through layered displays that combine natural specimens with historical artefacts, such as traditional hunting tools. A vertical sculptural void connects all levels, symbolising the continuous flow of ecological systems throughout the museum.
              </p>
              </div>
          </div>

           {/*Built-in 1*/}
           <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/9e5c0006-1fbb-47e2-893e-76d4cdffe825.png" />
              </div>
         
            {/*Built-in comments*/}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40 mt-20 md:mt-40">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 whitespace-nowrap min-w-[200px]">Built-in wall cabinets</h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">Visitors encounter a sequence of built-in wall cabinets, each dedicated to a specific theme—from preserved biological specimens to rare books and historical artifacts—creating layered moments of discovery throughout the exhibition.</p>
              </div>
          </div>
          
           {/*Built-in 2*/}
           <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/3fa7a7e0-8840-409c-b7c5-025bcb4d027c.png" />
              </div>

           {/*Rest Area Image 1*/}
           <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/5f5ce678-d608-42a9-a4e1-a57984d5eed2.png" />
              </div>

          {/*Rest Area Image 2*/}
           <div className="w-full mb-20 md:mb-40">
            <img className="w-full h-auto " src="/lovable-uploads/dcb3ac8b-0b01-4f13-8341-e02e026d5c46.png" />
              </div>

          {/*RA comments*/}
          <div className="rounded-lg bg-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-20 md:mb-40 mt-20 md:mt-40">
              <h2 className="text-xl md:text-2xl font-light text-gray-300 whitespace-nowrap min-w-[200px]">2F Rest Area </h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">A rest zone designed as a hunter's study, filled with personal collections, insects, and field objects gathered during expeditions. The space invites quiet observation while offering an elevated view of the vertical glass sculpture that links all three floors.
              </p>
              </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

          {/* Product Design Section */}
          <div className="rounded-lg bg-transparent">
            
            <img className="w-full h-auto mb-20 md:mb-40" src="/lovable-uploads/755af641-478b-42de-aedb-1022955dc03a.png" />
            <div className="w-full ">
              <img className="w-full h-auto" src="/lovable-uploads/9af82104-3de4-45be-bda6-313f88f638df.png" />
              <img className="w-full h-auto" src="/lovable-uploads/479a25d0-1252-4373-9a77-ab53ba200abc.png" />
              
            </div>
          </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

            {/*End Image */}
           <div className="w-full mb-40 md:mb-40">
            <img src="/lovable-uploads/12162067-822b-4528-a213-d6d12bf4ecc2.png" className="w-full h-auto mb-40 md:mb-0" />
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
