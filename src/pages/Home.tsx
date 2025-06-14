import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ScrollArea } from '@/components/ui/scroll-area'; // ✅ 스크롤 영역 임포트

const Home = () => {
  const heroAnimation = useScrollAnimation<HTMLDivElement>();
  const introAnimation = useScrollAnimation<HTMLDivElement>();

  return (
    <ScrollArea className="h-screen"> {/* ✅ 전체를 ScrollArea로 감쌈 */}
      <div className="min-h-screen bg-black overflow-hidden">
        <Navbar />

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div ref={heroAnimation.ref} className={`text-center z-10 transition-all duration-1500 ${heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h1 className="text-6xl md:text-8xl font-light tracking-wider text-white mb-20">
              DOHYUN KIM
            </h1>
            
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
        <section className="py-40 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div ref={introAnimation.ref} className={`transition-all duration-1500 delay-300 ${introAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <h2 className="text-4xl md:text-6xl font-light text-white mb-20 text-center">
                Creating Immersive
                <br />
                <span className="text-gray-400">Experiences</span>
              </h2>
              <p className="text-lg text-center max-w-2xl mx-auto leading-relaxed text-gray-400 font-light">
                Exploring the intersection of virtual reality, spatial design, and human interaction 
                through innovative digital experiences that challenge perception and inspire curiosity.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-40 px-4 md:px-8 border-t border-black">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-light text-white mb-20">
              Let's Create Something
              <br />
              <span className="text-gray-400">Together</span>
            </h3>
            <Link to="/contacts">
              <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 px-12 py-4 text-lg">
                Get In Touch
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </ScrollArea>
  );
};

export default Home;
