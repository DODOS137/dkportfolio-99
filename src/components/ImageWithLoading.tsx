import React, { useState } from 'react';
interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
}
const ImageWithLoading: React.FC<ImageWithLoadingProps> = ({
  src,
  alt,
  className = "",
  lazy = true
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const handleLoad = () => {
    setIsLoading(false);
  };
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  return <div className={`relative ${className}`}>
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>}
      
      {hasError ? <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500">
          <span>Failed to load image</span>
        </div> : <img src={src} alt={alt} loading={lazy ? "lazy" : "eager"} onLoad={handleLoad} onError={handleError} className="" />}
    </div>;
};
export default ImageWithLoading;