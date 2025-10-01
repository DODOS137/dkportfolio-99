import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { thermalTraceProjectData } from '@/data/thermalTraceProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import ProjectHero from './shared/ProjectHero';
// import ProjectContent from './shared/ProjectContent'; // ❌ 미사용 → 제거
import ProjectMetadata from './shared/ProjectMetadata';
// import ProcessGrid from './shared/ProcessGrid'; // ❌ 미사용 → 제거
import InteractiveImageSection from './thermal-trace/InteractiveImageSection';
import CarouselSection from './thermal-trace/CarouselSection';
import ContentSection from './thermal-trace/ContentSection';
import InteractiveExperience from './thermal-trace/InteractiveExperience';
import BackToTopButton from '@/components/BackToTopButton';
import { ScrollArea } from "@/components/ui/scroll-area";

const ThermalTraceProjectDetail = () => {
  const project = thermalTraceProjectData;

  // 앞선 4개 프로젝트와 동일한 컨테이너 규격
  const CONTAINER = "max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[250px] z-10";

  // Sample images for the spatial design carousel
  const carouselImages = [
    "/lovable-uploads/46b8ed4c-230a-45eb-8e27-124bea094c92.png",
    "/lovable-uploads/f421ff4d-3ede-4f79-b712-89e44b679c75.png",
    "/lovable-uploads/0ad6ae30-d45d-4de3-9d47-59c2ac18a0b0.png"
  ];

  // Art work images
  const artWorkImages = [
    "/lovable-uploads/31568277-b7f9-4571-80b7-33c38ee874f8.png",
    "/lovable-uploads/3acaab47-3d89-4589-92c7-2be3cf679ffa.png",
    "/lovable-uploads/2d907dcd-422c-4ace-856b-a3b65d53ab17.png"
  ];

  // Process steps data
  const processSteps = [
    { title: "Ideation Phase", items: ["Brainstorming", "Concept Sketching"] },
    { title: "Analysis", items: ["Stage Environment Research", "Precedent Study"] },
    { title: "Design Development", items: ["Idea Development", "Spatial Design", "User Interaction", "Exhibition Design"] }
  ];

  // ✅ 이미지 로딩 최적화 + 텍스트 페이드 인
  useEffect(() => {
    const scrollRoot =
      document.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]') ||
      document.querySelector<HTMLElement>('.h-screen.w-screen.overflow-auto') ||
      null;

    const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';

    const allImgs = Array.from(document.querySelectorAll<HTMLImageElement>('section img'));

    // LCP 후보 → 즉시 로드
    const lcpImg = allImgs[0];
    if (lcpImg) {
      lcpImg.loading = 'eager';
      // (lcpImg as any).fetchPriority = 'high'; // 타입 에러 나면 주석 유지
      lcpImg.decoding = 'async';
    }

    // 나머지는 LQIP + aggressive lazy
    const lazyImgs = allImgs.slice(1);
    lazyImgs.forEach((img) => {
      if (img.dataset.lazyEnhanced === '1') return;
      img.dataset.lazyEnhanced = '1';

      const originalSrc = img.getAttribute('src');
      if (!originalSrc) return;

      img.setAttribute('data-src', originalSrc);
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
        <ProjectNavigation />

        <ProjectHero
          title={project.heroTitle}
          subtitle="Reimaging the Fashion Show Through XR"
          year="2022–2025"   // ✅ 숫자 뺄셈 방지: 문자열로
          client="Personal Project"
          role="XR & Exhibition Designer"
        />

        {/* ===== 메인 콘텐츠 (간격/규격 통일) ===== */}
        <section className="cv-auto">
          {/* First Image (LCP) */}
          <div className={CONTAINER}>
            <img
              src={project.images[0]}
              alt={`${project.title} - Image 1`}
              className="w-full h-auto object-contain"
              loading="eager"
              // fetchPriority="high" // ❌ 타입 에러 우려 → 제거
              decoding="async"
              sizes="100vw"
            />
          </div>

          {/* Shared Container */}
          <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] mt-20 md:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
              {/* Left Column */}
              <div>
                <h2 className="text-xl md:text-xl font-bold text-white leading-tight mb-6">
                  {project.title}
                </h2>
                <p className="text-base md:text-base font-bold text-gray-500 mb-10">
                  2022–2025 │ XR Contents & Exhibition Design │ Solo Project │ 8 weeks
                </p>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <p className="text-base md:text-base text-gray-400 leading-relaxed font-light">
                  An exhibition design project developed in 2022 as a self-initiated extension of undergraduate coursework.
                </p>

                <div className="mb-6 mt-6 md:mt-6">
                  <h2 className="text-base md:text-base font-Medium text-white min-w-[200px] mb-2 md:mb-2">
                    The Brief
                  </h2>
                  <p className="text-base md:text-base lg:text-base leading-relaxed font-light text-gray-400">
                    Design a fashion show environment that delivers a powerful and unprecedented spatial experience. The garments and the space must interact organically, and the setting should evoke a strong sense of novelty and intensity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Image 1 (with colored plate behind) */}
          <div className={`${CONTAINER} relative my-20`}>
            {/* 뒤 배경판 */}
            <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden pointer-events-none">
              <AspectRatio ratio={16 / 9}>
                <div className="w-full h-full bg-[#000078]" />
              </AspectRatio>
            </div>

            {/* 실제 인터랙티브 이미지 */}
            <div className="relative z-10 rounded-xl overflow-hidden">
              <InteractiveImageSection
                baseImage="/lovable-uploads/b4f192b1-54ab-437f-8dad-74993331f176.png"
                overlayImage="/lovable-uploads/585a63af-fb48-41d5-82bf-62bc652eff56.png"
              />
            </div>
          </div>

          {/* Divider */}
          <div className={`${CONTAINER} w-full h-px my-20 md:my-40 bg-gray-500/50`} />

          {/* Summary */}
          <div className={CONTAINER}>
            <section aria-labelledby="sum-title" className="mt-8">
              <h2 id="sum-title" className="text-xl md:text-xl font-light text-gray-300 mb-8">
                Summary
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Challenge</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Passive runway experience</li>
                    <li>Rigid object/subject boundary limits narrative and agency</li>
                    <li>Bias toward “seeing” hides non-visual presence and environment</li>
                    <li>Stage treated as set, not as an interactive spatial interface</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Approach</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Thermal interaction: proximity, body heat, environmental temperature (heat traces)</li>
                    <li>Camouflage for models and viewers to dissolve boundaries</li>
                    <li>Mixed-reality layering combining material space with ephemeral signals</li>
                    <li>Discovery loop: sense → explore → reveal</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Result</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Audience shifts from viewer to explorer</li>
                    <li>Paradigm moves from spectacle to sensing</li>
                    <li>Space functions as the interface, uniting visible/invisible cues</li>
                    <li>New runway format that tests visibility, presence, and form</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Full text */}
          <div className={CONTAINER}>
            <details className="mt-8 mb-20 rounded-lg border border-white/10 bg-black">
              <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">Full text</summary>
              <div className="px-4 pb-4 mt-6 space-y-8">
                <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Approach</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                    The work reimagines the runway as a perceptual landscape rather than a stage. Models and viewers alike are disguised to dissolve the boundary between object and subject. Physical presence becomes the primary interface, with proximity and body temperature guiding interaction. Mixed reality overlays augment the scene, constructing a layered exhibition space that blends tangible matter with ephemeral perception. This approach fosters new ways of engaging with space, narrative, and the concept of visibility.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Project Purpose</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                    This project reimagines the runway as a perceptual landscape rather than a stage. Boundaries between model and audience dissolve, with physical presence, distance, and body heat driving interaction. Mixed reality overlays merge matter and perception, expanding fashion into an experience to be lived rather than seen
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Development Strategy</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                    Fashion is reframed as a medium to be discovered, not displayed. Through thermal detection and environmental response, audiences become thermal explorers, uncovering hidden presence. XR terrains—forests, islands, coastal zones—react in real time, testing visibility and concealment. The strategy layers thermal interfaces, responsive environments, and mixed reality to build a flexible, scalable exhibition format.
                  </p>
                </div>
              </div>
            </details>
          </div>

          {/* Research */}
          <div className={CONTAINER}>
            <section id="research" aria-labelledby="research-title" className="mb-20">
              <h2 id="research-title" className="text-xl md:text-xl font-light text-gray-300 mb-6">Research</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">78%</p>
                  <p className="text-sm text-gray-400 mt-2">call for experiential formats</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">40%</p>
                  <p className="text-sm text-gray-400 mt-2">fashion designers / industry</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">56</p>
                  <p className="text-sm text-gray-400 mt-2">participants surveyed</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-2xl md:text-xl font-light text-white">Immersion Demand</p>
                  <p className="text-sm text-gray-400 mt-2">beyond conventional runway formats</p>
                </div>
              </div>

              <details className="mt-8 rounded-lg border border-white/10 bg-black p-4">
                <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
                <p className="mt-8 text-sm text-gray-400">
                  A preliminary survey conducted with 56 participants supported the conceptual direction of this project. 78% responded positively to questions suggesting that fashion shows should move beyond conventional viewing formats and explore new experiential approaches. Notably, 40% of respondents (22 individuals) identified as either fashion designers or professionals in the fashion industry—reinforcing the relevance of this investigation within the design field.
                </p>
              </details>
            </section>
          </div>

          {/* Process */}
          <div className={CONTAINER}>
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
                  <p className="text-gray-400 text-sm">Context & precedents</p>
                  <p className="text-gray-400 text-sm">Stage Environment Research</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                  <h3 className="text-white font-light mb-3">03 Development</h3>
                  <p className="text-gray-400 text-sm">Spatial/level design</p>
                  <p className="text-gray-400 text-sm">User Interactiont</p>
                </div>
              </div>
            </section>
          </div>

          {/* Tools & Roles */}
          <div className={`${CONTAINER} mb-20 md:mb-20`}>
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
                    <td className="px-4 py-4">Stage</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-light">Texturing</td>
                    <td className="px-4 py-4">Photoshop</td>
                    <td className="px-4 py-4">PBR materials</td>
                  </tr>
                    <tr>
                    <td className="px-4 py-4 font-light">Lighting & Render</td>
                    <td className="px-4 py-4">Unity, 3ds Max</td>
                    <td className="px-4 py-4">Spatial Real time renders</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-light">Interaction / VR</td>
                    <td className="px-4 py-4">Unity</td>
                    <td className="px-4 py-4">VR Exhibition Prototype</td>
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
          <div className={CONTAINER}>
            <section id="design" className="mt-10">
              <h2 className="text-xl md:text-xl font-light text-gray-300 mb-6">Design Highlights</h2>
              <ul className="space-y-3 text-gray-300">
                <li>• Thermal UX: interactions driven by body heat.</li>
                <li>• Camouflage performance to blur object/subject roles.</li>
                <li>• Modular environments for adaptive narrative tension.</li>
                <li>• Space-as-interface: audience navigates through sensing, not just sight.</li>
                <li>• Visibility stress-test: challenges how presence and form are perceived.</li>
              </ul>

              <details className="mt-8 rounded-lg border border-white/10 bg-black p-4">
                <summary className="cursor-pointer text-sm text-gray-400">Full text</summary>
                <div className="mt-8 space-y-4 text-sm text-gray-400">
                  {/* idea development text start */}
                  <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
                    <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
                      <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                        Idea Development
                      </h2>
                      <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                        This project reframes fashion not as something to be seen, but as something to be discovered through thermal detection. Rather than offering a passive visual display, it invites the audience to detect hidden figures through subtle thermal cues—heat traces, environmental temperature shifts, and proximity sensing. The XR installation creates a reward structure based on thermal awareness, shifting the focus from spectacle to sensing. Viewers become thermal explorers, engaging with camouflaged presence through detection rather than simply seeing.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
                    <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
                      <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                        Spatial Design
                      </h2>
                      <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                        Set across natural landscapes designed for camouflage—such as islands, forests, and coastal zones—the experience is structured as a responsive terrain. Each space reacts dynamically to the viewer's position and thermal presence, enabled by a real-time XR sensing system. The traditional runway dissolves into an interactive field that tests visibility, form, and presence. Modular environments are choreographed to evoke narrative tension and guide movement through atmospheric shifts. The space itself becomes the interface, framing the act of seeing as an embodied process.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
                    <div className="rounded-lg bg-transparent flex flex-col md:flex-row md:items-start md:space-x-16 mb-6 md:mb-8">
                      <h2 className="text-sm md:text-sm font-light text-gray-300 mb-6 md:mb-8 min-w-[200px]">
                        Exhibition Design
                      </h2>
                      <p className="text-sm md:text-sm lg:text-sm font-light text-gray-400">
                        Set across natural landscapes designed for camouflage—such as islands, forests, and coastal zones—the experience is structured as a responsive terrain. Each space reacts dynamically to the viewer's position and thermal presence, enabled by a real-time XR sensing system. The traditional runway dissolves into an interactive field that tests visibility, form, and presence. Modular environments are choreographed to evoke narrative tension and guide movement through atmospheric shifts. The space itself becomes the interface, framing the act of seeing as an embodied process.
                      </p>
                    </div>
                  </div>
                </div>
              </details>
            </section>
          </div>

          {/* Divider */}
          <div className={`${CONTAINER} w-full h-px my-20 md:my-40 bg-gray-500/50`} />

          {/* Art Works Images */}
          <div className={CONTAINER}>
            <div className="w-full">
              <img
                className="w-full h-auto mb-40"
                alt="Art Work 1"
                data-lovable-editable="true"
                src="/lovable-uploads/1cab7e45-c7f3-4090-8efa-30b83bd90f54.png"
                loading="lazy"
                decoding="async"
                sizes="100vw"
              />
            </div>

            <div className="w-full">
              <img
                src="/lovable-uploads/3acaab47-3d89-4589-92c7-2be3cf679ffa.png"
                className="w-full h-auto mb-40"
                alt="Art Work 2"
                data-lovable-editable="true"
                loading="lazy"
                decoding="async"
                sizes="100vw"
              />
            </div>

            <div className="w-full">
              <img
                className="w-full h-auto mb-40"
                alt="Art Work 3"
                data-lovable-editable="true"
                src="/lovable-uploads/71597544-19d7-483c-81c4-82bf7b521859.png"
                loading="lazy"
                decoding="async"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Divider */}
          <div className={`${CONTAINER} w-full h-px my-20 md:my-40 bg-gray-500/50`} />

          <div className={CONTAINER}>
            <CarouselSection images={carouselImages} title="Transformable stage" />
          </div>

          {/* Spatial Design Image */}
          <div className={CONTAINER}>
            <div className="w-full">
              <img
                className="w-full h-auto mb-20 md:mb-40"
                src="/lovable-uploads/ee33591e-e9b0-4e8e-a3f0-181d426fdff8.png"
                alt=""
                loading="lazy"
                decoding="async"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Divider */}
          <div className={`${CONTAINER} w-full h-px my-20 md:my-40 bg-gray-500/50`} />

          {/* Exhibition Design Image */}
          <div className={CONTAINER}>
            <div className="w-full">
              <img
                className="w-full h-auto mt-20 mb-40"
                src="/lovable-uploads/115e4ef3-f572-4222-9101-3e140a672d1c.png"
                alt=""
                loading="lazy"
                decoding="async"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Exhibition Design Section with Interactive Image */}
          <div className={`${CONTAINER} rounded-lg bg-transparent overflow-hidden`}>
            <InteractiveImageSection
              baseImage="/lovable-uploads/673d5687-9173-4d58-8caa-854189586015.png"
              overlayImage="/lovable-uploads/c5531ed2-75f4-45bd-bcb2-af267986f73a.png"
            />

            <InteractiveExperience
              src="https://lucent-banoffee-a50286.netlify.app"
              title="Thermal Trace Interactive Experience"
              description="Experience the thermal detection interface in real-time"
            />

            <div className="w-full">
              <img
                src="/lovable-uploads/fd54a2e9-da0e-4967-89dc-aa0c028ad12a.png"
                className="w-full h-auto mb-20 md:mb-40 mt-20 md:mt-40"
                alt=""
                loading="lazy"
                decoding="async"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Divider */}
          <div className={`${CONTAINER} w-full h-px my-20 md:my-40 bg-gray-500/50`} />

          <div className={CONTAINER}>
            <ContentSection title="Post Project Direction">
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 font-light">
                The project will be expanded into an interactive XR installation accessible via headset and sensor interface. A public showcase is planned to gather qualitative user feedback, assess perception thresholds, and refine sensory engagement techniques prior to full deployment.
              </p>
            </ContentSection>
          </div>

          {/* Navigation (일관된 하단 간격) */}
          <div className="pb-40 md:pb-60 flex items-center justify-center mt-32 md:mt-52">
            <Link
              to="/project/Learn"
              className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium"
            >
              <span>Next project</span>
              <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
            </Link>
          </div>

          {/* Remaining Images */}
          <div className={CONTAINER}>
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

        <BackToTopButton />

        {/* ✅ 전용 스타일: LQIP + 이미지/텍스트 페이드 인 + content-visibility */}
        <style>{`
          .img-lqip { filter: blur(8px) saturate(0.9) brightness(0.98); transform: translateZ(0); transition: filter 420ms ease; }
          .reveal-init { opacity: 0; filter: blur(3px); transition: opacity 720ms ease-out, filter 720ms ease-out; }
          .reveal-show { opacity: 1; filter: blur(0); }

          .text-reveal-init { opacity: 0; transform: translateY(6px); transition: opacity 540ms ease-out, transform 540ms ease-out; will-change: opacity, transform; }
          .text-reveal-show { opacity: 1; transform: translateY(0); }

          /* viewport 밖 렌더 비용 절감 */
          .cv-auto { content-visibility: auto; contain-intrinsic-size: 1px 1000px; }

          @media (prefers-reduced-motion: reduce) {
            .reveal-init, .text-reveal-init { transition-duration: 1ms; filter: none; transform: none; }
          }
        `}</style>
      </ProjectLayout>
    </ScrollArea>
  );
};

export default ThermalTraceProjectDetail;

