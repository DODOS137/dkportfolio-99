import React, { useEffect } from 'react'; // ✅ NEW
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

  /* ============================
     ✅ NEW: 이미지 LQIP + 지연 로딩 큐 + 스크롤 페이드 + content-visibility
     ============================ */
  useEffect(() => {
    // 🔧 FIX: ScrollArea는 자체 스크롤 컨테이너 → IO root를 그 뷰포트로 지정
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
      img.classList.add('img-lqip', 'reveal-init'); // 🚀 PERF: micro-wiggle 기본 끔
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
            img.classList.add('play-wiggle'); // 🚀 PERF: 보일 때만 모션 켬
            img.dataset.loaded = '1';
            inFlight--;
            processQueue();
          });
        };

        const ds = img.getAttribute('data-src');
        if (ds && img.src !== ds) img.src = ds;

        // decode()로 메인 스레드 끊김 최소화
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

    // 이미지 관찰자: 근접 시 큐에 추가 (오프스크린은 애니메이션/디코딩 안 함)
    const imgIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target as HTMLImageElement;
          if (entry.isIntersecting) {
            imgIO.unobserve(img);
            queue.push(img);
            processQueue();
          } else {
            // 오프스크린 되면 미세 모션 중지
            img.classList.remove('play-wiggle');
          }
        });
      },
      {
        root: scrollRoot,
        rootMargin: '200px 0px', // 🚀 PERF: 과도한 프리로딩 완화
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
            src="/lovable-uploads/801c52bc-cbaa-4c2f-a6ec-6d86c1a70034.png"
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
    <p className="text-base md:text-base text-gray-400 leading-relaxed font-light">
    Immersive sound-led exhibition amplifying overlooked marine life. Reframes ocean conservation through emotional and sensory storytelling.
    </p>
       
    <div className="text-base md:text-base text-gray-300 leading-relaxed font-Medium">
   <p className="text-base md:text-base mb-2 text-white leading-relaxed font-Medium">
      Client
    </p>
     <p className="text-base md:text-base text-gray-400 leading-relaxed font-light">
     UNESCO IOC (Intergovernmental Oceanographic Commission), in collaboration with The Ocean Agency and Woods Hole Oceanographic Institution.
      </p>
      </div>
    

       
       <div className="mb-6 mt-6 md:mt-6"> 
         <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
      The Brief
          </h2>
       <p className="text-base md:text-base lg:text-base leading-relaxed font-light text-gray-400">
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
        1. Effectively communicating the ocean’s importance, to change existing perceptions and
 enhance public awareness and appreciation of ocean science.
      </p>
    </div>

    <div>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        2. Driving global recognition of the ocean’s vital role to inspire all nations to prioritise its
 inclusion in their national curriculum (as called for by UNESCO).
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




         {/*Line*/} 
          <div className="w-full h-px my-40 md:my-40 bg-transparent"></div>
         
 

    
          
          


        

{/* YouTube Video Section */}
<div className="my-40 md:my-40 relative">
  {/* ✅ NEW: 화면 가로 꽉차는 16:9 베이지 판 (플레이어 뒤, 같은 중심) */}
  <div
    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
    style={{ width: '100vw' }} // 화면 가로 꽉참
  >
    <AspectRatio ratio={16 / 9}>
      <div className="w-full h-full bg-[#EFE8DC]" />
    </AspectRatio>
  </div>

  {/* 기존 플레이어: 그대로 */}
  <AspectRatio ratio={16 / 9} className="relative z-10 rounded-lg border border-gray-800/50 overflow-hidden">
    <LiteYouTube id="zqz3Owz0K3o" title="Project video" />
  </AspectRatio>
</div>

     
          
          
          
          
          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>




         

    
     {/* Challenge Summary */}

    <section aria-labelledby="car-title" className="mt-8">
    <h2 id="car-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-4">Summary</h2>

    <div className="grid md:grid-cols-3 gap-4">
   
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Challenge</h3>
      <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
        <li>Gaps in public understanding of ocean ecosystems</li>
        <li>Overemphasis on iconic large marine species</li>
        <li>Overlooked bottom-dwelling and invertebrate life</li>
        <li>Reliance on visual-only formats</li>
      </ul>
    </div>

    {/* Approach */}
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Approach</h3>
      <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
        <li>Sound-driven storytelling</li>
        <li>Immersive design for emotional impact</li>
        <li>Hybrid: AR triggers + tactile modules</li>
        <li>Focus on sub-rock invertebrates</li>
      </ul>
    </div>

    {/* Result */}
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Result</h3>
      <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
        <li>Pause · listen · empathize</li>
        <li>Invisible made visible (emotional · sonic · spatial)</li>
        <li>Scalable, mobile exhibition system</li>
      </ul>
    </div>
  </div>
</section>

      
          
   {/* Challenge full text*/}    
          <details className="mt-6 mb-8 rounded-lg border border-white/10 bg-black">
         <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
         Full text
  </summary>
  <div className="px-4 pb-4 pt-6 space-y-4">
    <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-2">Approach</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        Instead of relying on traditional data visualisation or scientific display, the project uses immersive design as an emotional trigger. It explores new ways to communicate marine biodiversity loss, shifting the focus toward sound as a storytelling medium. Visitors are encouraged to pause, listen, and emotionally reconnect with the life forms that often go unnoticed.
      </p>
    </div>

    <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-2">Project Purpose</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        In alignment with the UN Ocean Decade (2021–2030), the project addresses the global communication gap in ocean awareness. Despite its planetary significance, the ocean remains underrepresented in education and policy. This exhibition reframes that disconnect through interactive design, making invisible marine life more visible—emotionally, sonically, and spatially.
      </p>
    </div>

    <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-2">Development Strategy</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        Design research focused on species that inhabit hidden marine zones, particularly sub-rock environments. Rather than prioritising well-known marine mammals, the project shifts attention to invertebrates and bottom-dwellers whose acoustic signals are biologically rich but rarely studied. A hybrid strategy of immersive audio, AR interaction, and tactile exhibition components forms the foundation of the storytelling.
      </p>
    </div>

     <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-2">Final Outcome</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        The project offers a contemplative space that fosters emotional storytelling. It challenges hierarchical species empathy and contributes to broader discourse on inclusive marine conservation, while also providing an efficient and scalable platform for delivering immersive exhibitions in diverse environments.</p>
    </div>
  </div>
</details>



         {/*Research*/}

         <section id="research" aria-labelledby="research-title" className="mb-8">
    <h2 id="research-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-4">Research</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">91%</p>
      <p className="text-sm text-gray-400 mt-2">only visual-centric exhibitions experienced</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">87%</p>
      <p className="text-sm text-gray-400 mt-2">most familiar with whales/dolphins</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
      <p className="text-3xl md:text-3xl font-light text-white">108</p>
      <p className="text-sm text-gray-400 mt-2">participants surveyed</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
      <p className="text-2xl md:text-xl font-light text-white">Insight</p>
      <p className="text-sm text-gray-400 mt-2">Public knowledge centred on a few iconic species</p>
    </div>
  </div>

  <details className="mt-6 rounded-lg border border-white/10 bg-black p-4">
    <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
    <p className="mt-8 text-sm text-gray-400">
     To better understand public perception of marine biodiversity, a preliminary survey was conducted with 108 participants. The findings revealed that 91% (98) had only experienced exhibitions that rely predominantly on visual stimuli—similar to conventional museum or gallery formats. When asked about the types of marine species they were most familiar with, 87% (94) mentioned iconic endangered mammals such as whales and dolphins, indicating that public awareness remains concentrated on a narrow range of charismatic megafauna. These results informed the direction of this project, which seeks to expand public understanding by highlighting lesser-known species through sound, rather than sight. 
    </p>
  </details>
</section>


          


          {/* Process Section */}

          <section id="process" className="rounded-lg bg-black">
     <h2 className="text-xl md:text-xl font-Medium mb-4 md:mb-4 text-gray-300">Process</h2>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-6">
  
      <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">01 Ideation</h3>
      <p className="text-gray-400 text-sm">Brainstorming</p>
      <p className="text-gray-400 text-sm">Concept sketches</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">02 Analysis</h3>
      <p className="text-gray-400 text-sm">Precedents</p>
      <p className="text-gray-400 text-sm">Ocean issues & species research</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-white font-light mb-3">03 Development</h3>
      <p className="text-gray-400 text-sm">Product & spatial design</p>
      <p className="text-gray-400 text-sm">AR application · Exhibition build</p>
    </div>
  </div>
</section>






          

         {/* Tools & Roles Table */}
       <div className="mb-8 md:mb-8">
       <h2 className="text-xl md:text-xl font-Medium text-gray-300 mb-4 md:mb-4">
       Tools & Roles
     </h2>
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
          <td className="px-4 py-4">Exhibition modules, Space </td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Texturing</td>
          <td className="px-4 py-4">Substance Painter, Photoshop</td>
          <td className="px-4 py-4">PBR stone/metal materials</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Lighting & Render</td>
          <td className="px-4 py-4"> V-Ray</td>
          <td className="px-4 py-4">Spatial ambience renders</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Interaction / AR</td>
          <td className="px-4 py-4">Unity (AR Foundation)</td>
          <td className="px-4 py-4">AR species animations, QR triggers</td>
        </tr>
    
        <tr>
          <td className="px-4 py-4 font-light">Graphics</td>
          <td className="px-4 py-4">Adobe Suite </td>
          <td className="px-4 py-4">Exhibition panels, accessibility assets</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

   
  {/* Design Highlights */}       
    <section id="design" className="mt-8">
  <h2 className="text-xl md:text-xl font-Medium text-gray-300 mb-4">Design Highlights</h2>
  <ul className="space-y-3 text-gray-400">
    <li>• Sound as narrative; bioacoustics drive empathy.</li>
    <li>• Rock-like plinths for solitary listening.</li>
    <li>• Flexible exhibition format designed for scalability and adaptability across contexts.</li>
    <li>• AR scans trigger species; touch + sound + vision combined.</li>
  </ul>

  <details className="mt-6 mb-8 rounded-lg border border-white/10 bg-black p-4">
   
     <summary className="cursor-pointer text-sm text-gray-400">Full text</summary>
    <div className="mt-8 space-y-4 text-sm text-gray-400">

      
  {/*idea development text start*/}
           
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-4 md:mb-4">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-4 md:mb-4 min-w-[200px]">
                Idea Development
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Sound is treated not just as data but as a narrative layer. Scientific studies revealing the bioacoustics of marine invertebrates were used to frame the emotional tone of the exhibition. The project highlights how sonic signals from these animals reveal behavioural patterns and ecosystem health. These acoustic ecologies become a channel to foster empathy and reframe conservation dialogue. While marine mammals like whales and dolphins receive outsized attention due to their intelligence and emotional expressiveness, lesser-known species—particularly invertebrates and bottom-dwellers—remain largely excluded from both public empathy and conservation priorities. This project aims to redress that imbalance by amplifying the voices of species that are hidden, both physically and culturally, from mainstream awareness.</p>
            </div>
          </div>
        
             <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex_col md:flex-row md:items-start md:space-x-16 mb-4 md:mb-4">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-4 md:mb-4 min-w-[200px]">
                Product Design
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Custom-designed headset stands emulate smoothed underwater rocks, integrating both audio hardware and tactile visuality. Each plinth invites solitary listening through high-resolution recordings of marine species. The subtlety of these soundscapes becomes a form of protest against the visual-centric bias of most exhibitions.
              </p>
              </div>
          </div>

           {/*Spatial Design Text*/} 
        
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-4 md:mb-4">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-4 md:mb-4 min-w-[200px]">
                Spatial Design
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Exhibition modules are mobile and adaptable, enabling flexible installation across diverse locations. Ceiling-mounted wave-shaped metal fixtures and textured lighting elements simulate underwater ambience, enriching the overall spatial immersion.
              </p>
              </div>
          </div>

          {/*Exhibition Design Text*/} 
        
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 ">
              <h2 className="text-sm md:text-sm font-light text-gray-300 mb-4 md:mb-4 min-w-[200px]">
                Exhibition Design
              </h2>
              <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The experience combines analog tactility with digital immersion. Visitors use AR-enabled displays to scan QR codes, triggering animated 3D models of species in motion. This integration of touch, sound, and vision deepens the emotional engagement, transforming passive observation into active reflection.
              </p>
              </div>
          </div>
      
    </div>
  </details>
</section>

          
          
          
          


          
          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

         
          
          
          
          {/* Graphic design images Section */}
 
            {/*Development Image1*/}     
          <div className="w-full mb-4">
            <img className="w-full h-full" src="/lovable-uploads/a0b20d87-ef7c-4183-9209-6abb798b0f65.png" />
          </div>           
          
        
         {/*Research Image2*/}        
          <div className="w-full">
            <img className="w-full h-full" src="/lovable-uploads/web1920-whispers from the bottom_대지 17.png" />
          </div>  
         
          {/*Research Image2-1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/web1920-whispers from the bottom_대지 19.png" />
          </div> 


   
          {/*Poster Design Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-4 md:mb-4" src="/lovable-uploads/web1920-whispers from the bottom-26.png" />
          </div>     


          



          {/*Graphic Design Image1-1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-6 md:mb-6" src="/lovable-uploads/web1920-whispers from the bottom-27.png" />
          </div>   

          {/*Graphic Design Image1-2*/}        
          <div className="w-full">
            <img className="w-full h-full mb-6 md:mb-6" src="/lovable-uploads/web1920-whispers from the bottom-28.png" />
          </div>   

           {/*Graphic Design Image1-3*/}        
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/lovable-uploads/web1920-whispers from the bottom-29.png" />
          </div>  


          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

          
           {/* AR APP YouTube Video Section */}
            <div className="mt-40 mb-10 md:mt-40 mb-10 relative">
            <AspectRatio ratio={16 / 9} className="rounded-lg border border-gray-800/50 overflow-hidden">
             {/* 유튜브 플레이어 */}
            {/* <YouTube videoId="M0v75vAVitA" opts={videoOpts} className="w-full h-full" /> */}
            <LiteYouTube id="M0v75vAVitA" title="AR App video" /> {/* ✅ NEW */}
           </AspectRatio>
           </div>

          {/*Process Rendering Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-8 md:mb-8" src="/lovable-uploads/web1920-whispers from the bottom-33.png" />
          </div>


                    
          {/*Spatial Design Process Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/web1920-whispers from the bottom1_대지 12.png" />
          </div>   




          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>  

       
          {/*Bridge Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-10 md:mb-10" src="/lovable-uploads/web1920-whispers from the bottom-34.png" />
          </div>

          

          {/*Product Design Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-10 md:mb-10" src="/lovable-uploads/web1920-whispers from the bottom_대지 10-31.png" />
          </div>

          {/*Product Design Image2*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/web1920-whispers from the bottom_대지 10 사본 2.png" />
          </div>  

          {/*Detail Image1*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/web1920-whispers from the bottom_대지 10 사본 3.png" />
          </div> 

          {/*Detail Image2*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/web1920-whispers from the bottom_대지 10 사본 4.png" />
          </div> 



          {/*Exhibition Design Image2*/}       
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/18099fde-1b4b-4c1b-b9a3-776444f17c15.png" />
          </div>    

          {/*Detail Image3*/}        
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/web1920-whispers from the bottom_대지 10 사본 5.png" />
          </div> 

           {/*Exhibition Design Image3*/}       
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/f0ebae04-0162-4e48-8470-2fc716cc1f31.png" />
          </div>   

       
          
          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>  

       
          
          
          {/*End Image*/}       
          <div className="w-full">
            <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/a522c24b-08cb-42ad-85ad-aacfd97ff5bc.png" />
          </div>            
            
        </div>
      </section>
      
      {/*Navigation Section*/}
      <div className="pb-40 md:pb-60 flex items-center justify-center">
        <Link to="/project/invisible-space-museum" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
          <span>Next project</span>
          <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
        </Link>
      </div>
      
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
export default WhispersProjectDetail;
