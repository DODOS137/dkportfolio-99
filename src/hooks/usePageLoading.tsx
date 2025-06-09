
import { useState, useEffect } from 'react';

export const usePageLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // 이미지 로딩 완료를 감지하는 로직
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      // 이미지가 없는 경우 최소 시간 후 로딩 완료
      return () => clearTimeout(timer);
    }

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        setTimeout(() => {
          setIsLoading(false);
        }, 800); // 최소 800ms 후 로딩 완료
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.addEventListener('load', checkAllLoaded);
        img.addEventListener('error', checkAllLoaded);
      }
    });

    return () => {
      clearTimeout(timer);
      images.forEach((img) => {
        img.removeEventListener('load', checkAllLoaded);
        img.removeEventListener('error', checkAllLoaded);
      });
    };
  }, []);

  return { isLoading };
};
