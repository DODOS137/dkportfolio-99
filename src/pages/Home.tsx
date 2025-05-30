import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Slider, { autoAdvanceInterval } from '../components/Slider';
import SearchBox from '../components/SearchBox';
import { Button } from '../components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Create a separate component for the slider controls
const SliderIndicators = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 6;

  // This effect syncs with the auto-advancing slider in the Slider component
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalSlides);
    }, autoAdvanceInterval);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);
  return <div className="flex space-x-3">
      {Array.from({
      length: totalSlides
    }).map((_, index) => <div key={index} className={`h-2 w-2 rounded-full border border-white transition-all duration-500 ${currentIndex === index ? 'bg-white' : 'bg-transparent'}`} />)}
    </div>;
};
const Home = () => {
  const heroAnimation = useScrollAnimation<HTMLDivElement>();
  const sliderAnimation = useScrollAnimation<HTMLDivElement>();
  const introAnimation = useScrollAnimation<HTMLDivElement>();
  return <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div ref={heroAnimation.ref} className={`text-center z-10 transition-all duration-1500 ${heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h1 className="text-6xl md:text-8xl font-light tracking-wider text-white mb-6">
            DOHYUN KIM
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            VR & Spatial Design
          </p>
          <div className="flex gap-6 justify-center">
            <Link to="/work">
              <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 px-8 py-3">
                View Work
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 px-8 py-3">
                About Me
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div ref={introAnimation.ref} className={`transition-all duration-1500 delay-300 ${introAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-8 text-center">
              Creating Immersive
              <br />
              <span className="text-gray-400">Experiences</span>
            </h2>
            <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto leading-relaxed">
              Exploring the intersection of virtual reality, spatial design, and human interaction 
              through innovative digital experiences that challenge perception and inspire curiosity.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Slider */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
        </div>
      </section>

      {/* Search Section */}
      

      {/* Contact CTA */}
      <section className="py-20 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-light text-white mb-8">
            Let's Create Something
            <br />
            <span className="text-gray-400">Amazing Together</span>
          </h3>
          <Link to="/contacts">
            <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 px-12 py-4 text-lg">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>;
};
export default Home;