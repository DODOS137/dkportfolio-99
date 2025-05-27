
import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -100px 0px' } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};
