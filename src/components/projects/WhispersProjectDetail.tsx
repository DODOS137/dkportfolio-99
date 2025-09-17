import React, { useEffect } from 'react'; // ✅ NEW
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import YouTube from 'react-youtube';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageWithLoading from '@/components/ImageWithLoading';
import { whispersProjectData } from '@/data/whispersProject';
import ProjectLayout from './shared/ProjectLayout';
import ProjectNavigation from './shared/ProjectNavigation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import BackToTopButton from '@/components/BackToTopButton';
import { ScrollArea } from "@/components/ui/scroll-area"; // ✅ 추가

/* ============================
   ✅ NEW: 경량 YouTube 컴포넌트
   - 썸네일만 먼저 렌더 → 클릭 시 iframe 로드
   ============================ */
const LiteYouTube: React.FC<{ id: string; title?: string; className?: string }> = ({ id, title = 'YouTube video', className = '' }) => {
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`;
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const wrapper = (e.currentTarget.parentElement as HTMLElement);
    if (!wrapper) return;
    // iframe 삽입
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

  // ✅ 이미지 마이크로 모션 + 스크롤 페이드 인/아웃
  useEffect(() => {
    const imgs = document.querySelectorAll<HTMLImageElement>('section img');
    imgs.forEach((el) => el.classList.add('reveal-init', 'micro-wiggle'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('reveal-show');
          else entry.target.classList.remove('reveal-show');
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );
    imgs.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ScrollArea className="h-screen w-screen overflow-auto">
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
        <section className="cv-auto"> {/* ✅ NEW: content-visibility로 뷰포트 밖 렌더 비용 절감 */}
          {/* First Image (LCP 후보) */}
          <div className="max-w-[1540px] mx-auto z-10">
            <img
              alt={`${project.title} - Image 1`}
              className="w-full h-auto object-contain"
              src="/lovable-uploads/801c52bc-cbaa-4c2f-a6ec-6d86c1a70034.png"
              loading="eager"                // ✅ NEW
              fetchpriority="high"          // ✅ NEW (Chrome 지원)
              decoding="async"              // ✅ NEW
            />
          </div>

          {/* Shared Container */}
          <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] z-10">
            {/* Project Description */}
            <div className="rounded-lg bg-transparent mt-20 md:mt-20">
              <h2 className="text-xl md:text-xl lg:text-xl mb-8 md:mb-8 text-white font-light">
                {project.title}
              </h2>
              <p className="text-base md:text-base lg:text-base text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
                Immersive sound-led exhibition amplifying overlooked marine life. Reframes ocean conservation through emotional and sensory storytelling.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-sm">
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2">project type</h3>
                  <p className="text-white">{project.projectType}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2">Project category</h3>
                  <p className="text-white">{project.projectCategory}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2">team</h3>
                  <p className="text-white">{project.teamType}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2">DURATION</h3>
                  <p className="text-white">{project.duration}</p>
                </div>
              </div>
            </div>

            {/* Client Section */}
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
                      UNESCO IOC (Intergovernmental Oceanographic Commission),
                      in collaboration with The Ocean Agency and Woods Hole Oceanographic Institution
                    </p>
                  </div>

                  {/* 로고 영역 (우측 끝에 붙임) */}
                  <div className="min-w-0 m-0 p-0 justify-self-end">
                    <img
                      src="/lovable-uploads/web1920-whispers from the bottom_대지 24 사본.png"
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
                    Set in collaboration with UNESCO, The Ocean Agency and the UN Decade of Ocean Science for Sustainable Development (2021-2030), tasks students to explore the crucial intersection between the ocean and the climate.
                  </p>
                </div>

                <details className="mt-8 mb-20 rounded-lg border border-white/10 bg-black">
                  <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
                    Full Brief
                  </summary>
                  <div className="px-4 pb-4 pt-6 space-y-8">
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

            {/* YouTube Video Section (경량 버전으로 교체) */}
            <div className="my-40 md:my-40 relative cv-auto"> {/* ✅ NEW */}
              <AspectRatio ratio={16 / 9} className="rounded-lg border border-gray-500/50 overflow-hidden">
                {/* <YouTube ... /> 대신 썸네일 → 클릭 시 로드 */}
                <LiteYouTube id="zqz3Owz0K3o" title="Project video" /> {/* ✅ NEW */}
              </AspectRatio>
            </div>

            {/*Line*/}
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

            {/* Challenge Summary */}
            <section aria-labelledby="car-title" className="mt-8 cv-auto"> {/* ✅ NEW */}
              <h2 id="car-title" className="text-xl md:text-xl font-light text-gray-300 mb-8">Summary</h2>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Challenge',
                    items: [
                      'Gaps in public understanding of ocean ecosystems',
                      'Overemphasis on iconic large marine species',
                      'Overlooked bottom-dwelling and invertebrate life',
                      'Reliance on visual-only formats',
                    ],
                  },
                  {
                    title: 'Approach',
                    items: [
                      'Sound-driven storytelling',
                      'Immersive design for emotional impact',
                      'Hybrid: AR triggers + tactile modules',
                      'Focus on sub-rock invertebrates',
                    ],
                  },
                  {
                    title: 'Result',
                    items: [
                      'Pause · listen · empathize',
                      'Invisible made visible (emotional · sonic · spatial)',
                      'Scalable, mobile exhibition system',
                    ],
                  },
                ].map((card) => (
                  <div key={card.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">{card.title}</h3>
                    <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                      {card.items.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Challenge full text*/}
            <details className="mt-8 mb-20 rounded-lg border border-white/10 bg-black cv-auto"> {/* ✅ NEW */}
              <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">
                Full text
              </summary>
              <div className="px-4 pb-4 pt-6 space-y-8">
                <div>
                  <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Approach</h3>
                  <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                    Instead of relying on traditional data visualisation or scientific display, the project uses immersive design as an emotional trigger. It explores new ways to communicate marine biodiversity loss, shifting the focus toward sound as a storytelling medium. Visitors are encouraged to pause, listen, and emotionally reconnect with the life forms that often go unnoticed.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Project Purpose</h3>
                  <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                    In alignment with the UN Ocean Decade (2021–2030), the project addresses the global communication gap in ocean awareness. Despite its planetary significance, the ocean remains underrepresented in education and policy. This exhibition reframes that disconnect through interactive design, making invisible marine life more visible—emotionally, sonically, and spatially.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Development Strategy</h3>
                  <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                    Design research focused on species that inhabit hidden marine zones, particularly sub-rock environments. Rather than prioritising well-known marine mammals, the project shifts attention to invertebrates and bottom-dwellers whose acoustic signals are biologically rich but rarely studied. A hybrid strategy of immersive audio, AR interaction, and tactile exhibition components forms the foundation of the storytelling.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm md:text-sm font-light text-gray-300 mb-3">Final Outcome</h3>
                  <p className="text-sm md:text-sm leading-relaxed font-light text-gray-400">
                    The project offers a contemplative space that fosters emotional storytelling. It challenges hierarchical species empathy and contributes to broader discourse on inclusive marine conservation, while also providing an efficient and scalable platform for delivering immersive exhibitions in diverse environments.
                  </p>
                </div>
              </div>
            </details>

            {/*Research*/}
            <section id="research" aria-labelledby="research-title" className="mb-20 cv-auto"> {/* ✅ NEW */}
              <h2 id="research-title" className="text-xl md:text-xl font-light text-gray-300 mb-6">Research</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: '91%', label: 'only visual-centric exhibitions experienced' },
                  { value: '87%', label: 'most familiar with whales/dolphins' },
                  { value: '108', label: 'participants surveyed' },
                  { value: 'Insight', label: 'Public knowledge centred on a few iconic species' },
                ].map(({ value, label }) => (
                  <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-3xl md:text-3xl font-light text-white">{value}</p>
                    <p className="text-sm text-gray-400 mt-2">{label}</p>
                  </div>
                ))}
              </div>

              <details className="mt-8 rounded-lg border border-white/10 bg-black p-4">
                <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
                <p className="mt-8 text-sm text-gray-400">
                  To better understand public perception of marine biodiversity, a preliminary survey was conducted with 108 participants. The findings revealed that 91% (98) had only experienced exhibitions that rely predominantly on visual stimuli—similar to conventional museum or gallery formats. When asked about the types of marine species they were most familiar with, 87% (94) mentioned iconic endangered mammals such as whales and dolphins, indicating that public awareness remains concentrated on a narrow range of charismatic megafauna. These results informed the direction of this project, which seeks to expand public understanding by highlighting lesser-known species through sound, rather than sight.
                </p>
              </details>
            </section>

            {/* Process Section */}
            <section id="process" className="rounded-lg bg-black cv-auto"> {/* ✅ NEW */}
              <h2 className="text-xl md:text-xl font-light mb-8 md:mb-8 text-gray-300">Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-20">
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
            <div className="mb-20 md:mb-20 cv-auto"> {/* ✅ NEW */}
              <h2 className="text-xl md:text-xl font-light text-gray-300 mb-6 md:mb-8">
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
            <section id="design" className="mt-10 cv-auto"> {/* ✅ NEW */}
              <h2 className="text-xl md:text-xl font-light text-gray-300 mb-6">Design Highlights</h2>
              <ul className="space-y-3 text-gray-300">
                <li>• Sound as narrative; bioacoustics drive empathy.</li>
                <li>• Rock-like plinths for solitary listening.</li>
                <li>• Flexible exhibition format designed for scalability and adaptability across contexts.</li>
                <li>• AR scans trigger species; touch + sound + vision combined.</li>
              </ul>

              <details className="mt-8 rounded-lg border border-white/10 bg-black p-4">
                <summary className="cursor-pointer text-sm text-gray-400">Full text</summary>
                <div className="mt-8 space-y-4 text-sm text-gray-400">
                  {/* 이하 내용 동일 (생략) */}
                  {/* ... */}
                </div>
              </details>
            </section>

            {/* 구간 구분 라인 */}
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

            {/* 이하 모든 이미지는 lazy + async (반복) */}
            <div className="w-full">
              <img className="w-full h-full" src="/lovable-uploads/a0b20d87-ef7c-4183-9209-6abb798b0f65.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>
            <div className="w-full">
              <img className="w-full h-full" src="/lovable-uploads/web1920-whispers from the bottom_대지 17.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>
            <div className="w-full">
              <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/web1920-whispers from the bottom_대지 19.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>
            <div className="w-full">
              <img className="w-full h-full mb-10 md:mb-10" src="/lovable-uploads/web1920-whispers from the bottom_대지 13-26.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>
            <div className="w-full">
              <img className="w-full h-full mb-10 md:mb-10" src="/lovable-uploads/web1920-whispers from the bottom-27.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>
            <div className="w-full">
              <img className="w-full h-full mb-10 md:mb-10" src="/lovable-uploads/web1920-whispers from the bottom-28.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>
            <div className="w-full">
              <img className="w-full h-full mb-0 md:mb-0" src="/lovable-uploads/web1920-whispers from the bottom-29.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>

            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

            {/* AR APP YouTube Section (Lite) */}
            <div className="my-40 md:my-40 relative cv-auto">
              <AspectRatio ratio={16 / 9} className="rounded-lg border border-gray-500/50 overflow-hidden">
                <LiteYouTube id="M0v75vAVitA" title="AR App video" /> {/* ✅ NEW */}
              </AspectRatio>
            </div>

            {/* 나머지 이미지들도 동일하게 lazy */}
            <div className="w-full">
              <img className="w-full h-full mb-8 md:mb-8" src="/lovable-uploads/web1920-whispers from the bottom_대지 10 사본.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>
            <div className="w-full">
              <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/web1920-whispers from the bottom1_대지 12.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>

            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

            <div className="w-full">
              <img className="w-full h-full mb-10 md:mb-10" src="/lovable-uploads/33_1.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>
            <div className="w-full">
              <img className="w-full h-full mb-10 md:mb-10" src="/lovable-uploads/web1920-whispers from the bottom_대지 10-31.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>
            <div className="w-full">
              <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/web1920-whispers from the bottom_대지 10 사본 2.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>
            <div className="w-full">
              <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/18099fde-1b4b-4c1b-b9a3-776444f17c15.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>
            <div className="w-full">
              <img className="w-full h-full mb-20 md:mb-20" src="/lovable-uploads/f0ebae04-0162-4e48-8470-2fc716cc1f31.png" loading="lazy" decoding="async" fetchpriority="low" />
            </div>

            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

            <div className="w-full">
              <img className="w-full h-full mb-20 md:mb-40" src="/lovable-uploads/a522c24b-08cb-42ad-85ad-aacfd97ff5bc.png" loading="lazy" decoding="async" fetchpriority="low" />
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

        {/* ✅ NEW: 전용 스타일 (마이크로 모션/페이드 + content-visibility 보정) */}
        <style>{`
          .reveal-init { opacity: 0; filter: blur(3px); transition: opacity 900ms ease-out, filter 900ms ease-out; }
          .reveal-show { opacity: 1; filter: blur(0); }
          @keyframes microWiggle { 0%{transform:translate3d(0,1px,0) scale(1.002)} 50%{transform:translate3d(0,-1px,0) scale(1.006)} 100%{transform:translate3d(0,1px,0) scale(1.002)} }
          .micro-wiggle { animation: microWiggle 7s ease-in-out infinite; will-change: transform; }

          /* ✅ content-visibility: auto + intrinsic size로 CLS 방지 */
          .cv-auto { content-visibility: auto; contain-intrinsic-size: 1px 1000px; }

          @media (prefers-reduced-motion: reduce) {
            .micro-wiggle { animation: none !important; }
            .reveal-init { transition-duration: 1ms; filter: none; }
          }
        `}</style>
      </ProjectLayout>
    </ScrollArea>
  );
};

export default WhispersProjectDetail;
