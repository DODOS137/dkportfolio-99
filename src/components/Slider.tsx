import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SliderControls from './SliderControls';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  videoId?: string;
}

// Use the same projects data as in the Work page
const projects: Project[] = [
  {
    id: "1",
    title: "Invisible",
    slug: "invisible-space-museum",
    description: "Virtual Reality Contents",
    imageUrl: "/lovable-uploads/eec176ba-ebab-43a9-bb78-e6f08c59771b.png"
  }, {
    id: "2",
    title: "Learn",
    slug: "learn",
    description: "Immersive Virtual Reality Experience",
    imageUrl: "/lovable-uploads/6a322fa7-6135-493f-849b-ca1ad98c7b86.png"
  }, {
    id: "3",
    title: "Thermal Trace",
    slug: "project-3",
    description: "XR & Exhibition Design",
    imageUrl: "/lovable-uploads/593420bb-8761-48fc-b4fc-4c74bd31769c.png"
  }, {
    id: "4",
    title: "Whispers from the Bottom",
    slug: "project-4",
    description: "Exhibition Design",
    imageUrl: "/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png"
  }, {
    id: "5",
    title: "Seoul Nature history Museum",
    slug: "project-5",
    description: "Brand Renewal and Spatial Design",
    imageUrl: "/lovable-uploads/4c29e171-4bbf-4092-854c-13bf32686e5e.png"
  }, {
    id: "6",
    title: "Island",
    slug: "project-6",
    description: "Public Space Design",
    imageUrl: "/lovable-uploads/e4ee8415-921a-44fe-bf59-82af2b5be394.png"
  }
];

// IMPORTANT: Defining these constants as exports so they can be imported by other components
export const slideTransitionDuration = 500; // Duration in ms
export const autoAdvanceInterval = 5000; // Time between auto-advances in ms

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Function to advance to the next slide
  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setSlideDirection('right');
      setCurrentIndex(prevIndex => (prevIndex + 1) % projects.length);

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection(null);
      }, slideTransitionDuration);
    }
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setSlideDirection('left');
      setCurrentIndex(prevIndex => (prevIndex - 1 + projects.length) % projects.length);

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection(null);
      }, slideTransitionDuration);
    }
  };

  // Function to go to a specific slide
  const goToSlide = (slideIndex: number) => {
    if (!isTransitioning && slideIndex !== currentIndex) {
      setIsTransitioning(true);
      setSlideDirection(slideIndex > currentIndex ? 'right' : 'left');
      setCurrentIndex(slideIndex);

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection(null);
      }, slideTransitionDuration);
    }
  };

  // Reset timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Auto-advance slides with proper cleanup
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set up new timer for auto-advance
    timerRef.current = setTimeout(() => {
      nextSlide();
    }, autoAdvanceInterval);

    // Cleanup on unmount or when currentIndex changes
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, isTransitioning]);

  // Improved slide class calculation for proper looping
  const getSlideClass = (index: number) => {
    // Current slide is fully visible
    if (index === currentIndex) {
      return 'opacity-100 z-10 translate-x-0';
    }

    // Handle the circular relationship for previous slide
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    if (index === prevIndex) {
      return 'opacity-0 z-0 -translate-x-full';
    }

    // Handle the circular relationship for next slide
    const nextIndex = (currentIndex + 1) % projects.length;
    if (index === nextIndex) {
      return 'opacity-0 z-0 translate-x-full';
    }

    // All other slides (positioned based on their relation to current slide)
    return index < currentIndex ? 'opacity-0 z-0 -translate-x-full' : 'opacity-0 z-0 translate-x-full';
  };
  
  return (
    <div className="flex flex-col w-full">
      {/* Mobile Slider - visible only on mobile */}
      <div className="relative w-full h-full md:hidden flex-grow">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-full relative bg-gray-400">
            {projects.map((project, index) => (
              <Link key={`mobile-${index}`} to={`/project/${project.slug}`} className={`absolute top-0 left-0 w-full h-full ${getSlideClass(index)} transition-all duration-${slideTransitionDuration} ease-in-out group`}>
                <div className="relative w-full h-full overflow-hidden flex justify-center items-center">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-4 transform -translate-y-0">
                        <h2 className="text-white text-xl font-bold">
                          {project.title}
                        </h2>
                        <p className="text-white text-sm mt-1">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Slider - hide on mobile */}
      <div className="relative w-full h-[calc(100vh-64px)] hidden md:block">
        {/* Main Slider */}
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-full relative bg-gray-400">
            {projects.map((project, index) => (
              <Link key={`desktop-${index}`} to={`/project/${project.slug}`} className={`absolute top-0 left-0 w-full h-full ${getSlideClass(index)} transition-all duration-${slideTransitionDuration} ease-in-out group`}>
                <div className="relative w-full h-full overflow-hidden flex justify-center items-center">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="slider-image w-1/2 h-1/2 md:w-full md:h-full object-contain md:object-cover" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-4 md:px-0 transform -translate-y-0">
                        <h2 className="text-white text-xl md:text-3xl font-bold md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                          {project.title}
                        </h2>
                        <p className="text-white text-sm md:text-lg mt-1 md:mt-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Show Indicators */}
        <div className="absolute bottom-4 left-4 z-10">
          <SliderControls 
            totalSlides={projects.length} 
            currentIndex={currentIndex} 
            goToSlide={goToSlide} 
            prevSlide={prevSlide} 
            nextSlide={nextSlide} 
          />
        </div>
      </div>

      {/* Thumbnail Images - visible on all screen sizes */}
      <div className="py-4 bg-black md:flex justify-center space-x-2 flex">
        {projects.map((project, index) => (
          <div 
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-16 h-12 border-2 cursor-pointer transition-all duration-300 ${currentIndex === index ? 'border-white opacity-100' : 'border-white/40 opacity-60'}`}
          >
            <img 
              src={project.imageUrl} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
