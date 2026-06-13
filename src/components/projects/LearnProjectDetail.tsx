import React, { useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
// import ModelViewer from '@/components/ModelViewer'; // ⬅ lazy 로 대체
import { learnProjectData } from '@/data/learnProject';
import BackToTopButton from '@/components/BackToTopButton';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ScrollArea } from "@/components/ui/scroll-area";

/* === 지연 로딩: 큰 의존성들 번들 분리 === */
const ModelViewer = React.lazy(() => import('@/components/ModelViewer'));

/* ============================
   경량 YouTube 썸네일 플레이어
   ============================ */
const LiteYouTube: React.FC<{ id: string; title?: string; className?: string }> = ({ id, title = 'YouTube video', className = '' }) => {
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`;
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const wrapper = e.currentTarget.parentElement as HTMLElement | null;
    if (!wrapper) return;
    wrapper.innerHTML =
      `<iframe title="${title}" src="${src}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;height:100%;border:0;"></iframe>`;
  };
  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      <img
        src={thumb}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        sizes="100vw"
      />
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

const LearnProjectDetail = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const project = learnProjectData;

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

  /* === 성능 힌트: preconnect/preload === */
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

    addLink('preconnect', 'https://www.youtube.com', { crossorigin: '' });
    addLink('preconnect', 'https://i.ytimg.com', { crossorigin: '' });

    const lcp = project.images?.[0];
    if (lcp) addLink('preload', lcp, { as: 'image', fetchpriority: 'high' });

    const ytThumb = 'https://i.ytimg.com/vi/aCJblmM9yzs/hqdefault.jpg';
    addLink('preload', ytThumb, { as: 'image' });
  }, [project.images]);

  // 이미지 LQIP/지연 로딩 + 텍스트 페이드 인
  useEffect(() => {
    const scrollRoot =
      document.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]') ||
      document.querySelector<HTMLElement>('.h-screen.w-screen.overflow-auto') ||
      null;

    const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';

    const allImgs = Array.from(document.querySelectorAll<HTMLImageElement>('section img'));

    const lcpImg = allImgs[0];
    if (lcpImg) {
      lcpImg.loading = 'eager';
      (lcpImg as any).fetchPriority = 'high';
      lcpImg.decoding = 'async';
    }

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
      { root: scrollRoot, rootMargin: '200px 0px', threshold: 0.05 }
    );
    lazyImgs.forEach((img) => imgIO.observe(img));

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
      { root: scrollRoot, rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    textNodes.forEach((el) => textIO.observe(el));

    return () => {
      imgIO.disconnect();
      textIO.disconnect();
    };
  }, []);

  return (
    <ScrollArea className="h-screen w-screen overflow-auto project-scroll">
      <ProjectLayout>
          {/* Fixed Navigation */}
          <ProjectNavigation backText="Back to work" />

          {/* Hero Section */}
          <section className="h-screen flex items-center justify-center relative overflow-hidden">
            <div
              ref={heroRef.ref}
              className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? 'opacity-100' : 'opacity-0'}`}
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
                  decoding="async"
                  fetchPriority="high"
                  sizes="100vw"
                />
              </div>
            )}

            {/* Shared Container */}
            <div className="relative max-w-[1540px] mx-auto px-4 md:px-[250px] mt-20 md:mt-20">
              {/* 오른쪽 여백 sticky box */}
              <div className="hidden xl:block absolute right-8 top-0 bottom-0 z-50">
                <div className="sticky top-32 w-[170px]">
                  <div className="border border-white/10 bg-black/70 backdrop-blur-sm p-3 text-xs text-gray-400 leading-relaxed">
                    <p className="text-white mb-2">Role</p>
                    <p className="text-gray-400 mb-4">Virtual Reality Designer</p>

                    <p className="text-white mb-2">Tools</p>
                    <p>Open Brush</p>
                    <p>Unity</p>
                    <p>3D Modelling</p>
                    <p>Sketchfab</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
                {/* Left Column */}
                <div>
                  <h2 className="text-xl md:text-xl font-bold text-white leading-tight mb-6">
                    {project.title}
                  </h2>
                  <p className="text-base md:text-base font-bold text-gray-500 mb-10">
                    2024 │ VR Content Design │ Solo Project │ 8 weeks
                  </p>
        
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <p className="text-base md:text-base text-gray-400 leading-relaxed font-light">
                    A comprehensive project that developed an original storyline, character scripts, and overall planning for a VR content experience.
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
                      presenting: the concept, interactive and navigation elements, etc.
                    </p>
                  </div>
                </div>
              </div>

              {/* Line */}
              <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

              {/* Main Image (full-bleed colored plate behind) */}
              <div className="my-40 md:my-40 relative">
                {/* 뒤 배경판 */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[100vw]">
                  <AspectRatio ratio={16 / 9}>
                    <div className="w-full h-full bg-[#FF7F00]" />
                  </AspectRatio>
                </div>
                {/* 앞 이미지 */}
                <AspectRatio
                  ratio={16 / 9}
                  className="relative z-10 bg-[#FF7F00] border-none overflow-hidden"
                >
                  <img
                    src="/webimages/Learn/LEARN1.jpg"
                    alt=""
                    className="block w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                    sizes="100vw"
                  />
                </AspectRatio>
              </div>

              {/* Line */}
              <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>



{/*Summary*/}
<section id="research" aria-labelledby="research-title" className="mt-6 mb-6">
  <h2 id="research-title" className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Summary</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-xl md:text-xl font-light text-gray-300">Challenge</p>
      <p className="text-sm text-gray-400 mt-2">Create an original VR storytelling format that unifies narrative, space, and interaction into one cohesive experience.</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-xl md:text-xl font-light text-gray-300">Approach</p>
      <p className="text-sm text-gray-400 mt-2">Built an original world, three robot characters, and a spatial narrative set in an abandoned library, with interaction flows developed directly in VR.</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-xl md:text-xl font-light text-gray-300">Result</p>
      <p className="text-sm text-gray-400 mt-2">Produced an immersive VR narrative centred on empathy, memory, and emotional learning through exploration.</p>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-xl md:text-xl font-light text-gray-300">Outputs</p>
      <p className="text-sm text-gray-400 mt-2">VR worldbuilding, character design, spatial renders, interaction sketches, level layouts, storyboards, and visual assets.</p>
    </div>
  </div>

  
</section>






{/* Design Highlights table */} 
<div className="mt-6 mb-6">
<h2 className="text-xl md:text-xl font-Medium text-gray-300 mb-6">Design Highlights</h2>
  <div className="overflow-x-auto rounded-lg border border-white/10 bg-black">
    <table className="w-full text-left text-sm text-gray-400">
      <thead className="bg-white/5 text-gray-300 uppercase text-sm tracking-wider">
        <tr>
          <th className="px-4 py-3"></th>
          <th className="px-4 py-3">Impact</th>
          <th className="px-4 py-3">Output</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/10">
        <tr>
          <td className="px-4 py-4 font-light">Worldbuilding</td>
          <td className="px-4 py-4">Establishes a coherent emotional setting for the VR narrative.</td>
          <td className="px-4 py-4">Abandoned library environment</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Character Narrative</td>
          <td className="px-4 py-4">Uses three robot characters to drive empathy and emotional learning.</td>
          <td className="px-4 py-4">Character Design</td>
        </tr>
        <tr>
          <td className="px-4 py-4 font-light">Spatial Storytelling</td>
          <td className="px-4 py-4">Organises narrative through movement, scene progression, and spatial pacing.</td>
          <td className="px-4 py-4">VR level journey</td>
        </tr>
       <tr>
          <td className="px-4 py-4 font-light">Interaction Design</td>
          <td className="px-4 py-4">Shapes participation through VR sketching, flow planning, and level logic.</td>
          <td className="px-4 py-4">Interaction sketches, level maps</td>
       </tr>
       <tr>
          <td className="px-4 py-4 font-light">Visual Production</td>
          <td className="px-4 py-4">Supports immersion with props, renders, and environmental details.</td>
          <td className="px-4 py-4">Assets, renders, graphics</td>
       </tr>
 
      
      </tbody>
    </table>
  </div>
</div>



          
          
          
          


          
          {/*Line*/} 
          <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>















               

              {/* World Image */}
              <div className="w-full">
                <AspectRatio ratio={16 / 9} className="w-full">
                  <img
                    className="w-full h-full"
                    src="/webimages/Learn/LEARN2.jpg"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    sizes="100vw"
                  />
                </AspectRatio>
              </div>

              {/* Line */}
              <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

              {/* World Text */}
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

              {/* Narrative Arc Text */}
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
                    src="/webimages/Learn/LEARN3.jpg"
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                    sizes="100vw"
                  />
                </div>

                <div className="w-full">
                  <img
                    alt="RX-056 Character Design"
                    src="/webimages/Learn/LEARN4.jpg"
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                    sizes="100vw"
                  />
                  <img
                    alt="RX-056 Character Design"
                    src="/webimages/Learn/LEARN5.jpg"
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                    sizes="100vw"
                  />
                </div>

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
              </div>

              {/* Line */}
              <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>
            

              {/* YouTube Video Section */}
              <div className="mt-40 md:mt-40 relative">
                 <AspectRatio ratio={16 / 9} className="relative z-10 rounded-lg border border-gray-800/50 overflow-hidden">
                  <LiteYouTube
                    id="aCJblmM9yzs"
                    title="Project video"
                    className="w-full h-full bg-transparent"
                  />
                </AspectRatio>
              </div>

              {/* Line */}
              <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

              {/* Scriptwriting & Storyboard Text */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
                <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
                  <h2 className="text-sm md:text-sm font-Medium text-gray-300  min-w-[200px]">Scriptwriting & Storyboard</h2>
                  <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400"> Using VR drawing tools, 3D storyboards simulated first-person navigation and spatial flow, allowing refinement of emotional pacing and level logic early in development.
                  </p>
                </div>
              </div>

              {/* Line */}
              <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

              {/* Level Design Section */}
              <div className="w-full">
                <img className="w-full h-full" src="/webimages/Learn/LEARN6.jpg" alt="" loading="lazy" decoding="async" sizes="100vw" />
              </div>
              <div className="w-full">
                <img className="w-full h-full" src="/webimages/Learn/LEARN7.jpg" alt="" loading="lazy" decoding="async" sizes="100vw" />
              </div>

              {/* Line */}
              <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>

              <div className="w-full">
                <img className="w-full h-full" src="/webimages/Learn/LEARN8.jpg" alt="" loading="lazy" decoding="async" sizes="100vw" />
              </div>
              <div className="w-full">
                <img className="w-full h-full" src="/webimages/Learn/LEARN9.jpg" alt="" loading="lazy" decoding="async" sizes="100vw" />
              </div>

              {/* Line */}
              <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

              {/* Spatial Design Image1 */}
              <div className="w-full ">
                <img className="w-full h-auto" src="/webimages/Learn/LEARN10.jpg" alt="" loading="lazy" decoding="async" sizes="100vw" />
              </div>

              {/* Line */}
              <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

              {/* Spatial Design Text */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
                <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
                  <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Spatial Design</h2>
                  <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">Sunlight, shadow, and artifact placement guide the viewer’s attention. The library unfolds through layered contrasts: precise architectural order against organic decay, and digital interfaces against paper records. These tensions shape an interpretive landscape where meaning is felt rather than explained.
                  </p>
                </div>
              </div>

              {/* Line */}
              <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

              {/* Spatial Design Images */}
                <div className="w-full">
                  <img className="w-full h-auto" src="/webimages/Learn/LEARN11.jpg" alt="" loading="lazy" decoding="async" sizes="100vw" />
                </div>

                {/* Line */}
                <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>

                <div className="w-full">
                  <img className="w-full h-auto" src="/webimages/Learn/LEARN12.jpg" alt="" loading="lazy" decoding="async" sizes="100vw" />
                </div>
              

                <div className="w-full">
                  <img className="w-full h-auto" src="/webimages/Learn/LEARN13.jpg" alt="" loading="lazy" decoding="async" sizes="100vw" />
                
              </div>

              {/* Line */}
              <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

             {/* Final Outcome Text */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
                <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
                  <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Final Outcome</h2>
                  <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">The project presents an interactive VR storytelling game that transforms learning into a narrative journey. By merging emotional storytelling with interactive design, it bridges the boundaries between play and education, turning abstract ideas into embodied understanding. The system can be further developed into an immersive learning platform that reinterprets classic fairy tales, allowing users to navigate story worlds where narrative choices and actions foster experiential understanding of values and concepts.
                  </p>
                </div>
              </div>

              {/* Line */}
              <div className="w-full h-px my-5 md:my-5 bg-transparent"></div>

              {/* Post-Project Section Text */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
                <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16">
                  <h2 className="text-sm md:text-sm font-Medium text-gray-300 mb-3 min-w-[200px]">Post-Project Expansion</h2>
                  <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400"> All core systems have been implemented, with cutscene animations currently in development to enhance narrative pacing and emotional peaks. Once completed, the project will be released as a fully playable experience, with the aim of gathering user feedback to inform future iterations and refinement.
                  </p>
                </div>
              </div>

              {/* Line */}
              <div className="w-full h-px my-10 md:my-10 bg-transparent"></div>

              <div className="w-full">
                <img className="w-full h-auto" src="/webimages/Learn/LEARN14.jpg" alt="" loading="lazy" decoding="async" sizes="100vw" />
              </div>





              {/* Line */}
              <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

              {/* Navigation */}
              <div className="pb-40 md:pb-60 flex items-center justify-center">
                <Link
                  to="/project/Whispers-from-the-Bottom"
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
            </div>
          </section>

        {/* 전역 스타일: 이미지 LQIP + 텍스트 페이드 인 + content-visibility */}
        <style>{`
          .img-lqip { filter: blur(8px) saturate(0.9) brightness(0.98); transform: translateZ(0); transition: filter 420ms ease; }
          .reveal-init { opacity: 0; filter: blur(3px); transition: opacity 720ms ease-out, filter 720ms ease-out; }
          .reveal-show { opacity: 1; filter: blur(0); }
          .text-reveal-init { opacity: 0; transform: translateY(6px); transition: opacity 540ms ease-out, transform 540ms ease-out; will-change: opacity, transform; }
          .text-reveal-show { opacity: 1; transform: translateY(0); }
          .cv-auto { content-visibility: auto; contain-intrinsic-size: 1px 1000px; }
          @media (prefers-reduced-motion: reduce) {
            .reveal-init, .text-reveal-init { transition-duration: 1ms; filter: none; transform: none; }
          }
        `}</style>

        <BackToTopButton />
      </ProjectLayout>
    </ScrollArea>
  );
};

export default LearnProjectDetail;
