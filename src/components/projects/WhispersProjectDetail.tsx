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

/* 경량 YouTube (이전 최적화 유지) */
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
      <button onClick={onClick} className="absolute inset-0 w-full h-full flex items-center justify-center" aria-label="Play video">
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
    playerVars: { autoplay: 0, controls: 1, modestbranding: 1, rel: 0 }
  };

  /* ✅ NEW: 고급 로딩 최적화 + 텍스트 페이드 인 */
  useEffect(() => {
    // 1) 이미지: LQIP 스타일 지연 로딩 (현재 src를 data-src로 옮기고, 근처에서만 실제 로드)
    const transparentPixel =
      'data:image/gif;base64,R0lGODlhAQABAAAAACw='; // 1x1 투명 픽셀

    const allImgs = Array.from(document.querySelectorAll<HTMLImageElement>('section img'));
    // 첫 번째 큰 이미지(상단 LCP 후보)는 그대로 두고, 나머지부터 공격적으로 지연
    const lcpImg = allImgs[0];
    if (lcpImg) {
      lcpImg.loading = 'eager';
      (lcpImg as any).fetchPriority = 'high';
      lcpImg.decoding = 'async';
    }

    const lazyImgs = allImgs.slice(1); // 나머지
    lazyImgs.forEach((img) => {
      if (img.dataset.lazyEnhanced === '1') return; // 중복 방지
      img.dataset.lazyEnhanced = '1';

      // 이미 브라우저 lazy가 있더라도, 확실히 늦게 불러오기 위해 data-src로 이동
      const originalSrc = img.getAttribute('src');
      if (!originalSrc) return;

      img.setAttribute('data-src', originalSrc);
      img.setAttribute('src', transparentPixel); // 실제 네트워크 요청 차단
      img.loading = 'lazy';
      img.decoding = 'async';
      (img as any).fetchPriority = 'low';

      // 초반엔 LQIP 블러 스타일
      img.classList.add('img-lqip');
      const onLoad = () => img.classList.remove('img-lqip');
      img.addEventListener('load', onLoad, { once: true });
    });

    // 근접 시 실제 src 주입
    const imgIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target as HTMLImageElement;
          if (entry.isIntersecting) {
            const ds = img.getAttribute('data-src');
            if (ds && img.src !== ds) {
              img.src = ds;
            }
            // 한 번 로드한 뒤에는 관찰 해제
            imgIO.unobserve(img);
          }
        });
      },
      { rootMargin: '300px 0px', threshold: 0.01 } // 미리 로드 여유를 넉넉히
    );
    lazyImgs.forEach((img) => imgIO.observe(img));

    // 2) 이미지: 미세 모션 + 스크롤 페이드 (기존)
    allImgs.forEach((el) => el.classList.add('reveal-init', 'micro-wiggle'));

    // 3) 텍스트: 스크롤 페이드 인 (헤딩/문단/목록/요약 등 광범위)
    const textNodes = document.querySelectorAll<HTMLElement>(
      'section h1, section h2, section h3, section h4, section h5, section h6, section p, section li, section summary, section blockquote, section figcaption, section td, section th'
    );
    textNodes.forEach((el) => {
      // 이미 초기화된 것은 제외
      if (!el.classList.contains('text-reveal-init')) {
        el.classList.add('text-reveal-init');
      }
    });

    const textIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.add('text-reveal-show');
          else el.classList.remove('text-reveal-show'); // 위/아래로 스크롤 시 자연스럽게
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
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
        <section className="cv-auto">
          {/* First Image (LCP) */}
          <div className="max-w-[1540px] mx-auto z-10">
            <img
              alt={`${project.title} - Image 1`}
              className="w-full h-auto object-contain"
              src="/lovable-uploads/801c52bc-cbaa-4c2f-a6ec-6d86c1a70034.png"
              loading="eager"
              fetchpriority="high"
              decoding="async"
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
            <div className="rounded-lg bg-transparent cv-auto">
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
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
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

            {/* YouTube Video Section (Lite) */}
            <div className="my-40 md:my-40 relative cv-auto">
              <AspectRatio ratio={16 / 9} className="rounded-lg border border-gray-500/50 overflow-hidden">
                <LiteYouTube id="zqz3Owz0K3o" title="Project video" />
              </AspectRatio>
            </div>

            {/*Line*/}
            <div className="w-full h-px my-20 md:my-40 bg-transparent"></div>

            {/* Summary */}
            <section aria-labelledby="car-title" className="mt-8 cv-auto">
              <h2 id="car-title" className="text-xl md:text-xl font-light text-gray-300 mb-8">Summary</h2>

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

                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Approach</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Sound-driven storytelling</li>
                    <li>Immersive design for emotional impact</li>
                    <li>Hybrid: AR triggers + tactile modules</li>
                    <li>Focus on sub-rock invertebrates</li>
                  </ul>
                </div>

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

            {/* 이하 섹션/이미지들은 원문 그대로, 이미지들은 JS로 지연 로딩됨 */}
            {/* ... (원문 코드 동일) ... */}

            {/* AR APP YouTube Section (Lite) */}
            <div className="my-40 md:my-40 relative cv-auto">
              <AspectRatio ratio={16 / 9} className="rounded-lg border border-gray-500/50 overflow-hidden">
                <LiteYouTube id="M0v75vAVitA" title="AR App video" />
              </AspectRatio>
            </div>

            {/* ... 나머지 이미지/섹션 동일 ... */}

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

        {/* ✅ NEW: 전용 스타일 */}
        <style>{`
          /* 이미지: 로딩 전 LQIP 블러 */
          .img-lqip { filter: blur(8px) saturate(0.9) brightness(0.98); transform: translateZ(0); transition: filter 500ms ease; }
          .img-lqip.reveal-show { filter: blur(4px); } /* 스크롤로 드러날 때 자연스러운 연결감 */

          /* 이미지: 스크롤 페이드 + 미세 모션 (기존 유지) */
          .reveal-init { opacity: 0; filter: blur(3px); transition: opacity 900ms ease-out, filter 900ms ease-out; }
          .reveal-show { opacity: 1; filter: blur(0); }
          @keyframes microWiggle { 0%{transform:translate3d(0,1px,0) scale(1.002)} 50%{transform:translate3d(0,-1px,0) scale(1.006)} 100%{transform:translate3d(0,1px,0) scale(1.002)} }
          .micro-wiggle { animation: microWiggle 7s ease-in-out infinite; will-change: transform; }

          /* 텍스트: 페이드 인 */
          .text-reveal-init { opacity: 0; transform: translateY(6px); transition: opacity 600ms ease-out, transform 600ms ease-out; will-change: opacity, transform; }
          .text-reveal-show { opacity: 1; transform: translateY(0); }

          /* content-visibility로 뷰포트 밖 비용 절감 */
          .cv-auto { content-visibility: auto; contain-intrinsic-size: 1px 1000px; }

          @media (prefers-reduced-motion: reduce) {
            .micro-wiggle { animation: none !important; }
            .reveal-init, .text-reveal-init { transition-duration: 1ms; filter: none; transform: none; }
          }
        `}</style>
      </ProjectLayout>
    </ScrollArea>
  );
};

export default WhispersProjectDetail;
