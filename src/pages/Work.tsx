
import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithLoading from '@/components/ImageWithLoading';

const Work = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
        <Link 
          to="/" 
          className="text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide"
        >
          back home
        </Link>
      </nav>

      {/* Main Content */}
      <main className="pt-20 md:pt-32">
        {/* Project 1 - Invisible */}
        <section className="mb-20 md:mb-32">
          <div className="block md:hidden px-6">
            <Link to="/project/invisible-space-museum" className="block">
              <div className="aspect-square mb-4 overflow-hidden">
                <ImageWithLoading 
                  src="/lovable-uploads/dd05d902-8937-42b8-bb1e-c6ad7461546b.png"
                  alt="Invisible"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-light">Invisible</h2>
                <p className="text-gray-400 text-sm">Virtual Reality Contents</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center px-8 lg:px-16">
            <div className="w-1/2 pr-12">
              <Link to="/project/invisible-space-museum" className="block group">
                <h2 className="text-4xl lg:text-6xl font-light mb-4 group-hover:text-gray-300 transition-colors duration-700">
                  Invisible
                </h2>
                <p className="text-gray-400 text-lg lg:text-xl">
                  Virtual Reality Contents
                </p>
              </Link>
            </div>
            <div className="w-1/2">
              <Link to="/project/invisible-space-museum" className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithLoading 
                    src="/lovable-uploads/dd05d902-8937-42b8-bb1e-c6ad7461546b.png"
                    alt="Invisible"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Project 2 - Learn */}
        <section className="mb-20 md:mb-32">
          <div className="block md:hidden px-6">
            <Link to="/project/learn" className="block">
              <div className="aspect-square mb-4 overflow-hidden">
                <ImageWithLoading 
                  src="/lovable-uploads/0395cfdd-35e7-4e15-a634-3eab92516d24.png"
                  alt="Learn"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-light">Learn</h2>
                <p className="text-gray-400 text-sm">Immersive Virtual Reality Experience</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center px-8 lg:px-16">
            <div className="w-1/2">
              <Link to="/project/learn" className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithLoading 
                    src="/lovable-uploads/0395cfdd-35e7-4e15-a634-3eab92516d24.png"
                    alt="Learn"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Link>
            </div>
            <div className="w-1/2 pl-12">
              <Link to="/project/learn" className="block group">
                <h2 className="text-4xl lg:text-6xl font-light mb-4 group-hover:text-gray-300 transition-colors duration-700">
                  Learn
                </h2>
                <p className="text-gray-400 text-lg lg:text-xl">
                  Immersive Virtual Reality Experience
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Project 3 - Thermal Trace */}
        <section className="mb-20 md:mb-32">
          <div className="block md:hidden px-6">
            <Link to="/project/project-3" className="block">
              <div className="aspect-square mb-4 overflow-hidden">
                <ImageWithLoading 
                  src="/lovable-uploads/503ce5b5-0a40-48ae-bcf3-09b2ece8efde.png"
                  alt="Thermal Trace"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-light">Thermal Trace</h2>
                <p className="text-gray-400 text-sm">XR & Exhibition Design</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center px-8 lg:px-16">
            <div className="w-1/2 pr-12">
              <Link to="/project/project-3" className="block group">
                <h2 className="text-4xl lg:text-6xl font-light mb-4 group-hover:text-gray-300 transition-colors duration-700">
                  Thermal Trace
                </h2>
                <p className="text-gray-400 text-lg lg:text-xl">
                  XR & Exhibition Design
                </p>
              </Link>
            </div>
            <div className="w-1/2">
              <Link to="/project/project-3" className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithLoading 
                    src="/lovable-uploads/503ce5b5-0a40-48ae-bcf3-09b2ece8efde.png"
                    alt="Thermal Trace"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Project 4 - Whispers from the Bottom */}
        <section className="mb-20 md:mb-32">
          <div className="block md:hidden px-6">
            <Link to="/project/project-4" className="block">
              <div className="aspect-square mb-4 overflow-hidden">
                <ImageWithLoading 
                  src="/lovable-uploads/89fa6153-0435-48f8-9cc7-7d4eacde6883.png"
                  alt="Whispers from the Bottom"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-light">Whispers from the Bottom</h2>
                <p className="text-gray-400 text-sm">Exhibition Design</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center px-8 lg:px-16">
            <div className="w-1/2">
              <Link to="/project/project-4" className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithLoading 
                    src="/lovable-uploads/89fa6153-0435-48f8-9cc7-7d4eacde6883.png"
                    alt="Whispers from the Bottom"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Link>
            </div>
            <div className="w-1/2 pl-12">
              <Link to="/project/project-4" className="block group">
                <h2 className="text-4xl lg:text-6xl font-light mb-4 group-hover:text-gray-300 transition-colors duration-700">
                  Whispers from the Bottom
                </h2>
                <p className="text-gray-400 text-lg lg:text-xl">
                  Exhibition Design
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Project 5 - Seoul Nature History Museum */}
        <section className="mb-20 md:mb-32">
          <div className="block md:hidden px-6">
            <Link to="/project/project-5" className="block">
              <div className="aspect-square mb-4 overflow-hidden">
                <ImageWithLoading 
                  src="/lovable-uploads/5c528cdd-4520-4f67-8841-ca136c06d4c8.png"
                  alt="Seoul Nature History Museum"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-light">Seoul Nature History Museum</h2>
                <p className="text-gray-400 text-sm">Brand Renewal and Spatial Design</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center px-8 lg:px-16">
            <div className="w-1/2 pr-12">
              <Link to="/project/project-5" className="block group">
                <h2 className="text-4xl lg:text-6xl font-light mb-4 group-hover:text-gray-300 transition-colors duration-700">
                  Seoul Nature History Museum
                </h2>
                <p className="text-gray-400 text-lg lg:text-xl">
                  Brand Renewal and Spatial Design
                </p>
              </Link>
            </div>
            <div className="w-1/2">
              <Link to="/project/project-5" className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithLoading 
                    src="/lovable-uploads/5c528cdd-4520-4f67-8841-ca136c06d4c8.png"
                    alt="Seoul Nature History Museum"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Project 6 - Island */}
        <section className="mb-20 md:mb-32">
          <div className="block md:hidden px-6">
            <Link to="/project/project-6" className="block">
              <div className="aspect-square mb-4 overflow-hidden">
                <ImageWithLoading 
                  src="/lovable-uploads/ffd0a76e-2666-4bdf-a327-e4ccee348ffe.png"
                  alt="Island"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-light">Island</h2>
                <p className="text-gray-400 text-sm">Public Space Design</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center px-8 lg:px-16">
            <div className="w-1/2">
              <Link to="/project/project-6" className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithLoading 
                    src="/lovable-uploads/ffd0a76e-2666-4bdf-a327-e4ccee348ffe.png"
                    alt="Island"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Link>
            </div>
            <div className="w-1/2 pl-12">
              <Link to="/project/project-6" className="block group">
                <h2 className="text-4xl lg:text-6xl font-light mb-4 group-hover:text-gray-300 transition-colors duration-700">
                  Island
                </h2>
                <p className="text-gray-400 text-lg lg:text-xl">
                  Public Space Design
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Work;
