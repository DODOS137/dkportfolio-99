import React, { useRef } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopButton = () => {
  const anchorRef = useRef<HTMLDivElement>(null);

  // 가장 가까운 스크롤 타겟 찾기: ScrollArea viewport > .project-scroll > window
  const getTarget = (): HTMLElement | Window => {
    if (typeof document === 'undefined') return window;

    // 1) 버튼 위치 기준으로 위로 올라가며 ScrollArea viewport 탐색
    const closestViewport = anchorRef.current?.closest<HTMLElement>('[data-radix-scroll-area-viewport]');
    if (closestViewport) return closestViewport;

    // 2) 문서 전역에서 첫 번째 ScrollArea viewport
    const anyViewport = document.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]');
    if (anyViewport) return anyViewport;

    // 3) 기존 컨테이너(.project-scroll) 폴백
    const projectScroll = document.querySelector<HTMLElement>('.project-scroll');
    if (projectScroll) return projectScroll;

    // 4) 마지막 폴백: window
    return window;
  };

  const scrollToTop = () => {
    const target = getTarget();
    if (target === window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      (target as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* closest() 탐색 기준점 */}
      <div ref={anchorRef} style={{ position: 'relative' }} />
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 inline-flex items-center gap-3 pl-4 pr-2 py-2 text-white hover:text-white transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide backdrop-blur-sm rounded border border-transparent hover:border-black bg-transparent"
      >
        <span className="text-white">Back to top</span>
        <ArrowUp className="w-4 h-4" />
      </button>
    </>
  );
};

export default BackToTopButton;
