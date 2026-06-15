import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ScrollArea } from '@/components/ui/scroll-area';

const Home = () => {
  const heroAnimation = useScrollAnimation<HTMLDivElement>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const projectSlides = [
    {
      title: 'Project 1',
      image: '/webimages/Home/home-project-1.jpg',
      link: '/work',
    },
    {
      title: 'Project 2',
      image: '/webimages/Home/home-project-2.jpg',
      link: '/work',
    },
    {
      title: 'Project 3',
      image: '/webimages/Home/home-project-3.jpg',
      link: '/work',
    },
    {
      title: 'Project 4',
      image: '/webimages/Home/home-project-4.jpg',
      link: '/work',
    },
    {
      title: 'Project 5',
      image: '/webimages/Home/home-project-5.jpg',
      link: '/work',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projectSlides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [projectSlides.length]);

  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen bg-black overflow-hidden">
        <Navbar />

        {/* Home Main Section */}
        <section className="min-h-screen px-6 md:px-14 pt-20 md:pt-24 pb-10 relative">
          <div
            ref={heroAnimation.ref}
            className={`transition-all duration-1500 ${
              heroAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
            }`}
          >
            {/* Hero Text Box */}
            <div className="w-full bg-black px-1 md:px-1 py-6 md:py-7">
              <h1
                className="text-white font-light italic text-4xl md:text-6xl lg:text-7xl leading-[1.12] tracking-tight"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
              Hi, I&apos;m <span className="font-bold">Dohyun</span>! I design{' '}
               <span className="font-bold">immersive spaces</span> and{' '}
               <span className="font-bold">experiences</span>;
               <br />
                from exhibitions to virtual worlds.
            </h1>
            </div>

            {/* Transparent Button Layer */}
            <div className="flex justify-center">
              <div className="bg-black backdrop-blur-sm border border-transparent px-6 py-3 flex gap-5 justify-center">
                <Link to="/work">
                  <Button
                    variant="outline"
                    className="border-white/70 text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 px-8 py-2 text-xs md:text-sm"
                  >
                    View Work
                  </Button>
                </Link>

                <Link to="/about">
                  <Button
                    variant="outline"
                    className="border-white/70 text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 px-8 py-2 text-xs md:text-sm"
                  >
                    About Me
                  </Button>
                </Link>
              </div>
            </div>

            {/* Slider Indicator */}
            <div className="flex justify-center gap-[3px] mt-9 md:mt-10 mb-3">
              {projectSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`w-[2px] transition-all duration-300 ${
                    currentSlide === index
                      ? 'h-5 bg-white'
                      : 'h-3 bg-white/20 hover:bg-white/50'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            {/* Project Image Slider */}
            <div className="relative w-full overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {projectSlides.map((project, index) => (
                  <Link
                    key={index}
                    to={project.link}
                    className="min-w-full block group"
                  >
                    <div className="w-full h-[150px] md:h-[170px] lg:h-[185px] overflow-hidden bg-white/5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-45 grayscale group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Small Slide Number */}
            <div className="flex justify-center mt-4 text-white/40 text-xs tracking-[0.3em]">
              {String(currentSlide + 1).padStart(2, '0')} /{' '}
              {String(projectSlides.length).padStart(2, '0')}
            </div>
          </div>
        </section>
      </div>
    </ScrollArea>
  );
};

export default Home;
