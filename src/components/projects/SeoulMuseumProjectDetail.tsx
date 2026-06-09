import React, { useEffect } from 'react'; // ✅ NEW
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
// import YouTube from 'react-youtube'; // (미사용) 성능 최적화로 대체
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { seoulMuseumProjectData } from '@/data/seoulMuseumProject';
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

const SeoulMuseumProjectDetail = () => {
  const project = seoulMuseumProjectData;
  const heroRef = useScrollAnimation();

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

// 이미지 관찰자: 스크롤 페이드 인 / 페이드 아웃
const imgIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const img = entry.target as HTMLImageElement;

      if (entry.isIntersecting) {
        decodeOnIdle(img);
        img.classList.remove('img-lqip');
        img.classList.add('reveal-show');
      } else {
        img.classList.remove('reveal-show');
      }
    });
  },
  {
    root: scrollRoot,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.15
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
            <span>Spatial & Exhibition Designer</span>
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
            src="/webimages/SNM/2.SNHMCOVER2.jpg"
            loading="eager"           // ✅ NEW
            fetchPriority="high"     // ✅ NEW
            decoding="async"         // ✅ NEW
          />
        </div>

  {/* Tools and roles */}
  <div className="relative">
  {/* 오른쪽 여백 sticky box */}
    <div className="hidden xl:block absolute right-8 top-0 bottom-0 z-50">
      <div className="sticky top-32 w-[170px]">
        <div className="border border-white/10 bg-black/70 backdrop-blur-sm p-3 text-xs text-gray-400 leading-relaxed">
          <p className="text-white mb-2">Role</p>
          <p className="text-gray-400 mb-4">Spatial & Exhibition Designer Designer</p>
        
          <p className="text-white mb-2">Tools</p>
          <p>Adobe suite</p>
          <p>Auto CAD</p>
          <p>3DS MAX-Vray</p>
          <p>Unreal Engine</p>
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
        />
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-6">
   <div className="text-base md:text-base text-gray-300 leading-relaxed font-Medium">
   <p className="text-base md:text-base mb-2 text-white leading-relaxed font-Medium">
      Institutional Collaboration
    </p>
     <p className="text-sm md:text-sm text-gray-400 leading-relaxed font-light">
     Seodaemun Museum of Natural History
      </p>
      </div>
    
       <div className="mb-6 mt-6 md:mt-6"> 
         <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
      The Brief
          </h2>
       <p className="text-sm md:text-sm text-gray-400 leading-relaxed font-light">
        Renew the museum’s outdated spatial and exhibition language while working within the existing architectural framework, and propose a distinctly Korean concept not previously introduced to the institution.
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
      An outdated museum identity and fragmented visitor experience weakened the museum’s cultural relevance.
      </p>
      </div>

        <div className="mb-6 mt-6 md:mt-6"> 
       <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
          Propose 
          </h2>
       <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        Transform the museum into a contemporary cultural landmark by integrating architectural renewal, immersive interiors, VR extension, and brand storytelling.
        </p>
        </div>
      
         <div className="mb-6 mt-6 md:mt-6"> 
         <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
         Outputs
          </h2>
       <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
       Façade renewal concept, spatial renders, VR museum, exhibition graphics, identity system, merchandise, and visitor-experience design assets.
       </p>
      </div>

     <details className="mt-4 mb-6 rounded-lg border border-white/10 bg-black">
      <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
         Evidence
       </summary>

        <div className="px-4 pb-4 pt-6 space-y-4">
       <div>
       <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        1. Research identified demand for a renewed museum experience with clearer Korean identity, stronger spatial engagement, and contemporary visual language.
      </p>
    </div>
    <div>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
        2. A survey was conducted with 213 individuals who had previously visited the Seodaemun Museum of Natural History, either on-site or online. Among them, 32 participants had also experienced renowned natural history museums abroad. While the museum's collection of specimens was largely appreciated, 84% of respondents (179 people) highlighted the need for spatial and interior renewal. Critical feedback pointed to the building's outdated grey façade and lack of distinctive identity, often being compared to a generic municipal office rather than a museum. In addition, 72% (153 people) felt that the exhibitions relied too heavily on static text and specimens, lacking engaging storytelling or interactive interpretation. 67% (142 people) expressed disappointment at the absence of digital media or interactive technologies such as AR and VR. 59% (126 people) noted insufficient accessibility and inclusivity, citing limited multilingual support and lack of tactile features for disabled visitors. Importantly, 64% (137 people) highlighted the absence of a uniquely Korean perspective, observing that the museum resembled a generic international format rather than reflecting local cultural identity. Finally, 71% (151 people) emphasized the need for stronger community and educational engagement, pointing out the lack of workshops, public programs, and collaborations with schools. The findings reveal a strong demand not only for architectural redefinition but also for narrative, technological, and cultural transformation that aligns with contemporary expectations for cultural institutions.
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
     VR Experenice Walkthrough
    </span>
     <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
      Immersive sound-led exhibition amplifying overlooked marine life. Reframes ocean conservation through emotional and sensory storytelling.
    </p>
  </div>
</div>
  <AspectRatio ratio={16 / 9} className="rounded-lg border border-[#F7931E] overflow-hidden">
      <LiteYouTube
        id="8GEK3igRom0"
        title="Project video"
        className="w-full h-full bg-transparent"
      />
    </AspectRatio>
  </div>

         {/*Line*/} 
          <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>

          {/*Render Images*/}   
          {/*Lobby Images*/}        
          <div className="w-full">
            <img className="w-full h-auto mb-8 md:mb-8" src="/webimages/SNM/SNM11.jpg" />
          </div>

           {/*Reception Desk Text 1*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-3">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Reception Desk</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The reception area presents the museum’s renewed identity through a three-storey vertical installation inspired by Korean folding screens and mountain landscapes.</p>
           </div>
           </div>

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

          {/*Lobby Images2*/}        
          <div className="w-full">
            <img className="w-full h-auto mb-8 md:mb-8" src="/webimages/SNM/SNM12.jpg" />
          </div>
          {/*Exhibition Hall*/}        
          <div className="w-full">
            <img className="w-full h-auto mb-8 md:mb-8" src="/webimages/SNM/SNM13.jpg" />
          </div>

           {/*Exhibition Hall comments*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-3">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Exhibition Hall</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The exhibition is divided into a Marine Zone on the first floor and a Terrestrial Zone on the upper levels. A vertical sculptural void connects the floors, linking immersive media, natural specimens, and historical artefacts into one continuous ecological journey.</p>
           </div>
           </div>

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

          {/*Exhibtion Hall 2*/}        
          <div className="w-full">
            <img className="w-full h-auto mb-8 md:mb-8" src="/webimages/SNM/SNM14.jpg" />
          </div>
          {/*Rest Area Image 1*/}       
          <div className="w-full">
            <img className="w-full h-auto mb-8 md:mb-8" src="/webimages/SNM/SNM15.jpg" />
          </div>    

           {/*2F Rest Area Text*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-3">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">2F Rest Area</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">A hunter’s study-inspired rest area displays personal collections, insects, and expedition artefacts. It creates a quiet observation point overlooking the vertical glass sculpture connecting all three floors.</p>
           </div>
           </div>

{/*Line*/} 
 <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

 {/* Process-1 */}
<div className="my-0 md:my-0 relative ">
   <div className="relative z-10">
    <p className="font-Medium mb-4">
    <span className="text-sm md:text-base text-gray-600">Context </span>
    <span className="ml-4 text-base md:text-base text-white">Narrative Arc + Korean Perspective </span>
    </p>
  </div>
</div>

           {/*Narrative*/}     
          <div className="w-full mb-4">
            <img className="w-full h-full" src="/webimages/SNM/SNM3.jpg" />
          </div>    

           {/*Narrative Arc text start*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-0">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[240px]">Narrative Arc</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">In late Joseon Korea, hunters viewed nature not merely as a means of survival, but as a realm of spiritual reverence. Animals were tracked with care and honoured as living beings, with tigers often referred to as San-gun, or “Mountain Lord.” This respect also extended to falconry, where Maekkun formed mutual relationships with wild hawks rather than claiming ownership.</p>
           </div>
           </div>

           {/*Narrative Arc text start2*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-0">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[240px]"></h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Rooted in this worldview, Through the Eyes of a Hunter reimagines the Seodaemun Museum of Natural History as a culturally grounded space. The project transforms static displays into an interpretive journey shaped by Korean perspectives on nature, coexistence, and memory.</p>
           </div>
           </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

         {/* Process-2 */}
         <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
         <span className="text-sm md:text-sm text-gray-600 font-Medium">
          Process
         </span>
         <div>
         <span className="text-base md:text-base text-white font-Medium">
          Site, Problem & Planning
         </span>
         <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
         The existing museum condition was analysed through site context, visitor feedback, spatial problems, and a renewed floor-plan strategy.
          </p>
         </div>
         </div>

          {/*Narrative Image 2*/}       
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM22.jpg" />
          </div>
          {/*전체 프로세스 다이어그램*/}       
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM21.jpg" />
          </div>  

           {/*Line*/} 
          <div className="w-full h-px my-10 md:my-20 bg-transparent"></div>

      {/* Site Section */}
      <div className="my-0 md:my-0 relative ">
      <div className="relative z-10">
      <p className="font-Medium mb-4">
      <span className="text-sm md:text-base text-gray-600">Process </span>
      <span className="ml-4 text-base md:text-base text-white">Site Selection </span>
      </p>
      </div>
      </div> 
          
      <div className="flex gap-10 items-start">
        <div className="w-[1106px] h-auto overflow-hidden">
          <img
            src="/webimages/SNM/SNM1.jpg"
            alt="Seoul Natural History Museum"
            className="w-[1106px] h-auto"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="w-full">
          <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3">
            Site Selection
          </h2>

          <p className="text-sm md:text-sm font-light text-gray-400 leading-relaxed mb-3">
            서울특별시 서대문구 연희로 32길 51 (연희동 서대문자연사 박물관)
          </p>

          <p className="text-sm md:text-sm font-light text-gray-400 leading-relaxed">
            51, Yeonhui-ro, 32-gil, Seodaemun-gu. Seoul, Republic of Korea
          </p>
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
          Spatial Design & Exhibition Planning
         </span>
         <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
         As visitors move from the Marine Hall to the upper Terrestrial Halls, the spatial textures gradually shift from smooth to coarse, reflecting how sea, river, and mountain environments shape stone differently. This erosion gradient becomes a visual language across the museum’s sculptural elements and built-in furniture, linking each ecological zone to a distinct material atmosphere.
         </p>
         </div>
         </div>

          {/*Problem Image2*/}        
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM2.jpg" />
          </div>
          {/*Problem Image3*/}        
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM2-1.jpg" />
          </div>
          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>
          {/*Floor Plan*/}        
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM4.jpg" />
          </div>
          {/*Line*/} 
          <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>
          {/*Floor Plan2*/}        
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM5.jpg" />
          </div> 
          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-20 bg-transparent"></div>
          {/*Exhibition Plan*/}        
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM6.jpg" />
          </div> 

           {/*Exhibition design & stands text 1*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-3">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Exhibition Design & stands</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">As visitors move from the Marine Hall to the upper Terrestrial Halls, the spatial textures gradually shift from smooth to coarse, reflecting how sea, river, and mountain environments shape stone differently. This erosion gradient becomes a visual language across the museum’s sculptural elements and built-in furniture, linking each ecological zone to a distinct material atmosphere.</p>
           </div>
           </div>

         {/*Line*/} 
          <div className="w-full h-px my-10 md:my-20 bg-transparent"></div>

         {/* Process-4*/}
         <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-4">
         <span className="text-sm md:text-sm text-gray-600 font-Medium">
          Process
         </span>
         <div>
         <span className="text-base md:text-base text-white font-Medium">
          Built-in Display Cases & Product Design
         </span>
         <p className="mt-4 mb-4 text-sm md:text-sm text-gray-400 leading-relaxed font-light">
         The museum experience extends into detailed display furniture, gift-shop products, and identity assets inspired by native Korean species.
         </p>
         </div>
         </div>
       
          {/*증빙 Images*/}        
          <div className="w-full">
            <img className="w-full h-full" src="/webimages/SNM/SNM7.jpg" />
          </div>  
          {/*증빙 Images 2*/}        
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM8.jpg" />
          </div> 

          {/*Line*/} 
          <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>

          {/*built-in Image 2*/}        
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM23.jpg" />
          </div>    

           {/*Built-in display cases Text 1*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-3">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Built-in display cases</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Visitors encounter a sequence of built-in wall cabinets, each dedicated to a specific theme—from preserved biological specimens to rare books and historical artifacts—creating layered moments of discovery throughout the exhibition.</p>
           </div>
           </div>

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-20 bg-transparent"></div>

          {/*built-in Image 2*/}       
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM16.jpg" />
          </div>  
          {/*Built-in 4*/}       
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM10.jpg" />
          </div>  

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-20 bg-transparent"></div>

          {/*Gift Shop Image*/}       
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM17.jpg" />
          </div>  

           {/*2F Gift Shop Text*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-3">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Gift Shop</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The gift shop concept features products inspired by native Korean species, reinforcing the museum’s identity. Items include collectible cards of endangered animals and resin-encased specimens of Korean insects.</p>
           </div>
           </div>

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-20 bg-transparent"></div>

          {/*Gift Shop Image 2*/}       
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM18.jpg" />
          </div>  

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-20 bg-transparent"></div>

          {/*Final Outcome image*/}       
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM19.jpg" />
          </div>  

          {/*Line*/} 
          <div className="w-full h-px my-10 md:my-20 bg-transparent"></div>
          
           {/*Final Outcome text 1*/}
           <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mb-3">
           <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
           <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Final Outcome</h2>
           <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Delivered a complete, testable museum experience encompassing space, identity, product, and narrative logic. With the support of Seodaemun Museum of Natural History, a seven-day solo exhibition was conducted within the museum, incorporating feedback from both visitors and staff. Structured for ongoing refinement, the work anticipates future feedback loops through public interaction and prototyping.</p>
           </div>
           </div>

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

          {/*End Image*/}       
          <div className="w-full">
            <img className="w-full h-full mb-0 md:mb-0" src="/webimages/SNM/SNM20.jpg" />
          </div>  

          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>
   
      </div>
      </section>
      
      {/*Navigation Section*/}
      <div className="pb-40 md:pb-60 flex items-center justify-center">
        <Link to="/project/learn" className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium">
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

 /* 이미지: 스크롤 페이드 인 / 페이드 아웃 */
.reveal-init {
  opacity: 0;
  transform: translateY(24px);
  filter: blur(6px);
  transition:
    opacity 900ms ease-out,
    transform 900ms ease-out,
    filter 900ms ease-out;
}

.reveal-show {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

        /* 이미지: '보일 때만' 미세 모션 */
        @keyframes microWiggle {
          0%   { transform: translate3d(0, 0,6px, 0) scale(1.001); }
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
