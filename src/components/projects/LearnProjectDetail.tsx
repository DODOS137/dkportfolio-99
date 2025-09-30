import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import ModelViewer from '@/components/ModelViewer';
import { learnProjectData } from '@/data/learnProject';
import YouTube from 'react-youtube';
import BackToTopButton from '@/components/BackToTopButton';
import ProjectNavigation from './shared/ProjectNavigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ScrollArea } from "@/components/ui/scroll-area";

const LearnProjectDetail = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const project = learnProjectData;

  // 데이터 검증
  if (!project || !project.images || project.images.length === 0) {
    return (
      <ScrollArea className="h-screen w-screen overflow-auto">
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light text-white mb-4">Project Not Found</h1>
            <Link to="/work" className="text-gray-400 hover:text-white transition-colors">
              Back to Work
            </Link>
          </div>
        </div>
      </ScrollArea>
    );
  }

  /* ============================
     ✅ 성능 힌트: preconnect/preload (헤드에 주입)
     - YouTube/ytimg에 미리 연결
     - LCP 이미지, YT 썸네일(가능 시) preload
     ============================ */
  useEffect(() => {
    const head = document.head;

    const addLink = (rel: string, href: string, extra: Record<string, string> = {}) => {
      const exists = Array.from(head.querySelectorAll<HTMLLinkElement>(`link[rel="${rel}"]`)).some(l => l.href === href || l.getAttribute('href') === href);
      if (exists) return;
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      Object.entries(extra).forEach(([k, v]) => link.setAttribute(k, v));
      head.appendChild(link);
    };

    // YouTube 성능 힌트
    addLink('preconnect', 'https://www.youtube.com', { crossorigin: '' });
    addLink('preconnect', 'https://i.ytimg.com', { crossorigin: '' });

    // LCP 후보(첫 이미지) preload (가능할 때만)
    const lcp = project.images?.[0];
    if (lcp) {
      addLink('preload', lcp, { as: 'image', imagesrcset: '', fetchpriority: 'high' });
    }

    // 페이지 내 임베드된 YouTube 썸네일을 추정(preload) – 영상 ID가 코드에 고정되어 있으므로 명시
    const ytThumb = 'https://i.ytimg.com/vi/aCJblmM9yzs/hqdefault.jpg';
    addLink('preload', ytThumb, { as: 'image' });
  }, [project.images]);

  // ✅ 이미지 LQIP/지연 로딩 + 텍스트 페이드 인 최적화
  useEffect(() => {
    // ScrollArea가 뷰포트일 수 있으므로 root 지정
    const scrollRoot =
      document.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]') ||
      document.querySelector<HTMLElement>('.h-screen.w-screen.overflow-auto') ||
      null;

    const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';

    const allImgs = Array.from(
      document.querySelectorAll<HTMLImageElement>('section img')
    );

    // LCP 후보(맨 위 이미지)는 즉시 로드
    const lcpImg = allImgs[0];
    if (lcpImg) {
      lcpImg.loading = 'eager';
      (lcpImg as any).fetchPriority = 'high';
      lcpImg.decoding = 'async';
    }

    // 나머지 이미지 → 공격적 지연 로딩 + LQIP + 근접 로딩 큐
    const lazyImgs = allImgs.slice(1);
    lazyImgs.forEach((img) => {
      if (img.dataset.lazyEnhanced === '1') return;
      img.dataset.lazyEnhanced = '1';

      const original = img.getAttribute('src');
      if (!original) return;

      img.setAttribute('data-src', original);
      img.setAttribute('src', transparentPixel);
      img.loading = 'lazy';
      img.decoding = 'async';
      (img as any).fetchPriority = 'low';

      img.classList.add('img-lqip', 'reveal-init');
    });

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
            img.classList.remove('img-lqip');
            img.classList.add('reveal-show');
            img.dataset.loaded = '1';
            inFlight--;
            processQueue();
          });
        };

        const ds = img.getAttribute('data-src');
        if (ds && img.src !== ds) img.src = ds;

        if (typeof (img as any).decode === 'function') {
          (img as any).decode().then(doReveal).catch(doReveal);
        } else {
          const onLoad = () => {
            img.removeEventListener('load', onLoad);
            doReveal();
          };
          img.addEventListener('load', onLoad);
        }
      }
    };

    const imgIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target as HTMLImageElement;
          if (entry.isIntersecting) {
            imgIO.unobserve(img);
            queue.push(img);
            processQueue();
          }
        });
      },
      {
        root: scrollRoot,
        rootMargin: '200px 0px',
        threshold: 0.05,
      }
    );
    lazyImgs.forEach((img) => imgIO.observe(img));

    // 텍스트 페이드 인
    const textNodes = document.querySelectorAll<HTMLElement>(
      'section h1, section h2, section h3, section h4, section h5, section h6, section p, section li, section summary, section blockquote, section figcaption, section td, section th'
    );
    textNodes.forEach((el) => el.classList.add('text-reveal-init'));

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
        threshold: 0.12,
      }
    );
    textNodes.forEach((el) => textIO.observe(el));

    return () => {
      imgIO.disconnect();
      textIO.disconnect();
    };
  }, []);

  return (
    <ScrollArea className="h-screen w-screen overflow-auto project-scroll">
      <React.Fragment>
        <BackToTopButton />
        <div className="min-h-screen bg-black text-white">
          {/* Fixed Navigation */}
          <ProjectNavigation backText="Back to work" />

          {/* Hero Section */}
          <section className="h-screen flex items-center justify-center relative overflow-hidden">
            <div
              ref={heroRef.ref}
              className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                heroRef.isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
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
            {/* First Image (LCP) */}
            {project.images[0] && (
              <div className="w-full">
                <img
                  src={project.images[0]}
                  alt={`${project.title} - Image 1`}
                  className="w-full h-auto object-contain"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>
            )}

 
            
            
            
            
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

      {/* ✅ NEW: Image under location/year */}
      <div className="w-full h-[400px] overflow-hidden flex items-center justify-center">
        <img
          src=""
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
   Set in a dystopian future where humans have vanished, this project followed the journey of three service robots as they continued to perform long-abandoned duties within a decaying library. The player took the role of FR Pro, one of the robots, gradually uncovering the fragments of human memory while learning to interpret empathy and emotion. The project investigated whether emotional understanding could emerge in non-human entities through narrative interaction and symbolic decision-making. Each robot had distinct roles, personalities, and limitations, framing a world where meaning persisted without its makers.
    </p>
       

    

       
       <div className="mb-6 mt-6 md:mt-6"> 
         <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
      The Brief
          </h2>
       <p className="text-base md:text-base lg:text-base leading-relaxed font-light text-gray-400">
        Create a short script for a VR linear narrative experience of up to 10 minutes. You can also
add a graph of your narrative (e.g., from Celtex to your submission, not compulsory). You will
illustrate the story through a VR storyboard in one of the available VR apps, suh as Open Brush or
similar. You must demonstrate through the storyboard that you integrated VR-related concepts
relevant to your story, such as interaction, embodiment, etc. You will be given examples of scripts
and VR storyboards in class. You will create a recording of your storyboard with a voiceover
presenting: the concept, interactive and navigation elements, etc. </p>
      </div>
    </div>
  </div>


                   
          {/*Line*/} 
          <div className="w-full h-px my-40 md:my-40 bg-transparent"></div>
           
         
         
  {/* Main Image with background plate like YouTube */}
<div className="my-40 md:my-40 relative">
  {/* 뒤 배경판: 유튜브 플레이어와 같은 16:9 크기 유지 */}
  <AspectRatio ratio={16 / 9}>
    <div className="absolute inset-0 w-full h-full bg-[#FF7F00] rounded-lg" /> {/* ✅ 판 */}
  </AspectRatio>

  {/* 앞 이미지: 같은 16:9 박스 안에 겹침 */}
  <AspectRatio ratio={16 / 9} className="relative z-10 rounded-lg border border-gray-800/50 overflow-hidden">
    <img
      src="/lovable-uploads/153d6e31-3d91-407b-913a-171c29388036.png"
      className="w-full h-full object-contain"
      loading="lazy"
      decoding="async"
      alt="Main Project Image"
    />
  </AspectRatio>
</div>       

         
{/* Main Image (with full-bleed colored plate behind) */}
<div className="my-40 md:my-40 relative">
  {/* 뒤 배경판: 뷰포트 가로 100%로 깔림 */}
  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[100vw]">
    <AspectRatio ratio={16 / 9}>
      <div className="w-full h-full bg-[#FF7F00]" /> {/* ← 여기 색상 변경 */}
    </AspectRatio>
  </div>

  {/* 앞 이미지: 배경판 위에 겹침 */}
  <AspectRatio ratio={16 / 9} className="relative z-10 rounded-lg border border-gray-transparent overflow-hidden">
    <img
      src="/lovable-uploads/153d6e31-3d91-407b-913a-171c29388036.png"
      className="w-full h-full object-contain"
      loading="lazy"
      decoding="async"
      alt=""
    />
  </AspectRatio>
</div>


          
          {/*Line*/} 
          <div className="w-full h-px my-40 md:my-40 bg-transparent"></div>


{/* Challenge Summary */}
<section aria-labelledby="car-title" className="mt-6 mb-6">
  <h2 id="car-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Summary</h2>

  <div className="grid md:grid-cols-3 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Challenge</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                      <li>Creation of an original VR storytelling format</li>
                      <li>Harmonising narrative, space, and interaction into one cohesive whole</li>
      </ul>
    </div>

    {/* Approach */}
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Approach</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                      <li>Building an original world ·story · characters  · spatial setting</li>
                      <li>Sketching interaction flows directly within VR environments</li>
                      <li>Scriptwriting tailored to narrative situations and emotional pacing</li>
      </ul>
    </div>

    {/* Result */}
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-3">Result</h3>
      <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                      <li>Immersive VR narrative centred on empathy and memory</li>
                      <li>Demonstrates emotional storytelling in VR</li>
      </ul>
    </div>
  </div>
</section>

{/* Challenge full text*/}    
<details className="mt-6 mb-6 rounded-lg border border-white/10 bg-black">
  <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
    Full text
  </summary>
  <div className="px-4 pb-6 pt-6 space-y-6">
    <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Approach</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                      The aim was to integrate all key components of VR content—character design, level design, narrative structure, and spatial interaction—into a unified experience. Emphasis was placed on the emotional potential of non-verbal storytelling and how spatial choreography could express moral and symbolic choices. Design decisions were grounded in research into emotional logic, human-object memory, and the aesthetic of decay.
                    </p>
    </div>

    <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Project Purpose</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                      This project set out to create an original VR storytelling experience exploring empathy in a post-human world. By following service robots in an abandoned library, the narrative asked whether meaning and emotional understanding could persist without their human creators.
                    </p>
    </div>

    <div>
      <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Development Strategy</h3>
      <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                      The project was developed through integrated worldbuilding, interaction design, and spatial storytelling. Distinct robot characters and moral decision points shaped the narrative arc. VR sketching tools enabled real-time storyboard testing, refining pacing and navigation early on. Spatial contrasts—light and shadow, architecture and decay, digital and analogue—were choreographed to guide attention and embed symbolic meaning. Together, these strategies built a cohesive, emotionally driven VR narrative.
                    </p>
    </div>

  </div>
</details>




    

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
                    <p className="text-gray-400 text-sm">Environment Research</p>
                    <p className="text-gray-400 text-sm">Narrative Flow Mapping</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                    <h3 className="text-white font-light mb-3">03 Development</h3>
                    <p className="text-gray-400 text-sm">World/Character/spatial/level design</p>
                    <p className="text-gray-400 text-sm">Scriptwriting & Storyboarding</p>
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
                        <td className="px-4 py-4">3D Assets,Characters,Space</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 font-light">Texturing</td>
                        <td className="px-4 py-4">Photoshop</td>
                        <td className="px-4 py-4">PBR material Maps</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 font-light">Lighting & Render</td>
                        <td className="px-4 py-4">V-Ray, Unity</td>
                        <td className="px-4 py-4">Spatial ambience, Real time renders</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 font-light">Interaction / VR</td>
                        <td className="px-4 py-4">Shape XR</td>
                        <td className="px-4 py-4">Environment, Interaction sketch</td>
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

              {/* Design Highlights */}
              <section id="design" className="mt-10">
                <h2 className="text-xl md:text-xl font-light text-gray-300 mb-6">Design Highlights</h2>
                <ul className="space-y-3 text-gray-300">
                  <li>• Virtual environment & worldbuilding.</li>
                  <li>• Three distinct robot characters.</li>
                  <li>• Original VR storytelling.</li>
                  <li>• VR sketching & 3D storyboards for pacing and navigation.</li>
                </ul>
                </section>



              {/* Line */}
              <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

    
         
         
         
         
         
              {/* World Image */}
              <div className="w-full">
                <AspectRatio ratio={16 / 9} className="w-full">
                  <img className="w-full h-full" src="/lovable-uploads/2234aeee-ea59-4284-b6f6-58ed4a4141c2.png" />
                </AspectRatio>
              </div>

              {/* Line */}
              <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>


          {/*World Text*/} 
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
          <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
          <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]"> Worldbuilding</h2>
          <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400"> Set in a distant dystopian future, the story took place in a world void of humans, where robots continued to perform their long-obsolete tasks with mechanical precision. These machines, bound to designated zones, preserved human knowledge in silence—echoes of a civilisation long gone.
                          The library acted as a symbolic setting for memory and ritual. Through environmental storytelling, the world posed existential questions: When creators vanish, does legacy remain? Can purpose emerge from repetition?
                        </p>
         </div>
         </div>


              {/* Line */}
              <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>


          {/*  Narrative ArcText*/} 
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
          <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
          <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Narrative Arc</h2>
          <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400"> The story followed three robots—FR Pro, RX-056, and LS1-07—as they managed their duties inside the abandoned library. The player, as FR Pro, learned indirectly about empathy by observing the others. A critical moment occurred when the group discovered a dying tree, prompting a moral choice: preserve it or preserve themselves. This symbolised post-human emotional logic—questioning whether machines could perform gestures of empathy without biological emotion. Through ritualistic action, sacrifice became a form of symbolic communication.
          </p>
         </div>
         </div>


            
         
         
         
         
         
         {/* Line */}
              <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>


         

              {/* Character Design Section */}
              <div className="rounded-lg bg-transparent">
                <div className="w-full">
                  <img
                    alt="RX-056 Character Design"
                    src="/lovable-uploads/b4ec2d65-81f7-4f6d-99be-3fcfc1b790ed.png"
                    className="w-full h-auto"
                  />
                </div>

                {/* Character Images */}
                <div className="w-full">
                  <img
                    alt="RX-056 Character Design"
                    src="/lovable-uploads/acc09a93-1341-41eb-b938-8bad8f514163.png"
                    className="w-full h-auto"
                  />
                  <img
                    alt="RX-056 Character Design"
                    src="/lovable-uploads/7a7449ff-c56f-4964-acd1-fcfdeae91b9c.png"
                    className="w-full h-auto"
                  />
                </div>

                {/* 3D Models */}
                <ErrorBoundary fallback={<div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">3D Model Viewer Unavailable</div>}>
                  <div className="relative overflow-hidden mb-8">
                    <div className="flex w-full">
                      <div className="w-1/2">
                        <ModelViewer modelPath="https://sketchfab.com/3d-models/rx056-b62d552b21b8446ebce9f71b85700aa0" isSketchfab={true} />
                      </div>
                      <div className="w-1/2">
                        <ModelViewer modelPath="https://sketchfab.com/3d-models/ls107-65e7ff25d71f4512829dfc88c5537add" isSketchfab={true} />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute top-0 left-0 w-full h-[100px] bg-black z-[999]" />
                    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[100px] bg-black z-[999]" />
                  </div>
                </ErrorBoundary>

                <h2 className="text-lg md:text-2xl font-light text-center text-xs md:text-sm text-gray-700">
                  Click and drag to rotate. Scroll to zoom.
                </h2>
              </div>



         

              {/* script 컨테이너1 */}
              <div className="w-full ">
                <img
                  alt="RX-056 Character Design"
                  className="w-full h-auto mt-20"
                  src="/lovable-uploads/4b01aa09-e408-4273-b96a-fe2ad51a3ec6.png"
                />
              </div>

              {/* script 컨테이너2 */}
              <div className="w-full flex justify-center mb-40">
                {/* 기준 이미지 컨테이너 */}
                <div className="relative w-full max-w-[1920px]">
                  {/* 배경 이미지 */}
                  <img
                    alt="RX-056 Character Frame"
                    className="w-full h-auto block"
                    src="/lovable-uploads/de229615-bd04-4ff5-bd7a-46eb6efc98b0.png"
                  />

                  {/* 유튜브 플레이어 */}
                  <div
                    className="absolute"
                    style={{
                      top: '18%',
                      left: '50%',
                      width: '65.1%',
                      aspectRatio: '1250 / 550',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl border border-white">
                      <ErrorBoundary fallback={<div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">Video Unavailable</div>}>
                        <YouTube
                          videoId="aCJblmM9yzs"
                          opts={{
                            width: '100%',
                            height: '100%',
                            playerVars: {
                              autoplay: 0,
                              controls: 1,
                              modestbranding: 1,
                              fs: 1,
                              origin: typeof window !== 'undefined' ? window.location.origin : '',
                            },
                          }}
                          className="w-full h-full"
                          iframeClassName="w-full h-full border-0"
                        />
                      </ErrorBoundary>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level Design Section (이미지 묶음) */}
              <div className="rounded-lg bg-transparent">
                <img className="w-full h-auto mb-20 md:mb-40" src="/lovable-uploads/bf2fe34d-0b83-4063-ac63-3dd0b7d5c8cd.png" />
                <div className="w-full">
                  <img alt="Planet A233 - VR Environment" className="w-full h-auto" src="/lovable-uploads/48a61eae-cd06-4f3a-b893-7a18d76443c9.png" />
                  <img alt="Planet A233 - VR Environment" src="/lovable-uploads/98c6f72e-e8ff-4a84-9966-5dba0fb2e7df.png" className="w-full h-auto mb-20 md:mb-40" />
                  <img alt="Planet A233 - VR Environment" className="w-full h-auto" src="/lovable-uploads/82ed2977-afd6-4043-881b-b523083b8a93.png" />
                  <img alt="Planet A233 - VR Environment" className="w-full h-auto mb-20 md:mb-40" src="/lovable-uploads/eb13ecfc-480b-4823-bb52-d408778963e9.png" />
                </div>
              </div>

              {/* Spatial Design Section */}
              <div className="w-full ">
                <img className="w-full h-auto mt-20 mb-40" src="/lovable-uploads/dbc61aac-d704-4f72-9df3-d77191c87385.png" />
              </div>

              <div className="rounded-lg bg-transparent">
                <div className="w-full">
                  <img className="w-full h-auto mb-20 md:mb-40" src="/lovable-uploads/d854924c-7721-45ce-94a3-9ab126ba6078.png" />
                </div>

                <div className="w-full">
                  <img className="w-full h-auto" src="/lovable-uploads/751b69f0-75d5-4aca-82d4-73ff52116e9d.png" />
                </div>
              </div>

              {/* Line */}
              <div className="w-full h-px my-20 md:my-40 bg-gray-500/50"></div>

              {/* Post-Project Section */}
              <div className="rounded-lg bg-transparent">
                <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-6 md:mb-8">
                  Post-Project Expansion
                </h2>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light mb-40 md:mb-60">
                  All core systems have been implemented, with cutscene animations currently in development to enhance narrative pacing and emotional peaks. Once completed, the project will be released as a fully playable experience, with the aim of gathering user feedback to inform future iterations and refinement.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="pb-40 md:pb-60 flex items-center justify-center">
              <Link
                to="/project/Seoul-Nature-history-Museum"
                className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium"
              >
                <span>Next project</span>
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
              </Link>
            </div>

            {/* Remaining Images */}
            {project.images.slice(1).map((image, index) => (
              <div key={index + 1} className="mb-20">
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
          </section>
        </div>

        {/* ✅ 전역 스타일: 이미지 LQIP + 텍스트 페이드 인 + content-visibility */}
        <style>{`
          /* 이미지 LQIP + 리빌 */
          .img-lqip { filter: blur(8px) saturate(0.9) brightness(0.98); transform: translateZ(0); transition: filter 420ms ease; }
          .reveal-init { opacity: 0; filter: blur(3px); transition: opacity 720ms ease-out, filter 720ms ease-out; }
          .reveal-show { opacity: 1; filter: blur(0); }

          /* 텍스트 페이드 인 */
          .text-reveal-init { opacity: 0; transform: translateY(6px); transition: opacity 540ms ease-out, transform 540ms ease-out; will-change: opacity, transform; }
          .text-reveal-show { opacity: 1; transform: translateY(0); }

          /* content-visibility: viewport 밖 렌더 비용 절감 + CLS 방지용 intrinsic size */
          .cv-auto { content-visibility: auto; contain-intrinsic-size: 1px 1000px; }

          @media (prefers-reduced-motion: reduce) {
            .reveal-init, .text-reveal-init { transition-duration: 1ms; filter: none; transform: none; }
          }
        `}</style>

        <BackToTopButton />
      </React.Fragment>
    </ScrollArea>
  );
};

export default LearnProjectDetail;
