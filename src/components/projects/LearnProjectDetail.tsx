
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { learnProjectData } from '@/data/learnProject';
import ModelViewer from '@/components/ModelViewer';

const LearnProjectDetail = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const project = learnProjectData;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
        <Link to="/work" className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm tracking-wide">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to work page
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={heroRef.ref} className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${heroRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider">
            {project.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            {project.heroSubtitle}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
            <span>{project.heroYear}</span>
            <span>•</span>
            <span>MA Thesis</span>
            <span>•</span>
            <span>Virtual Reality Designer</span>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <div className="max-w-[1540px] mx-auto mb-32 px-6 relative z-10 md:px-[150px]">
        <div className="rounded-lg p-8 md:p-12 py-[50px] bg-transparent px-0">
          <h2 className="text-2xl md:text-3xl font-light mb-12 text-white">Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
              <h3 className="text-xl font-light text-white mb-4">Ideation Phase</h3>
              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-gray-400 text-sm leading-relaxed">Brainstorming</p>
                <p className="text-gray-400 text-sm leading-relaxed">Concept Sketching</p>
              </div>
            </div>

            <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
              <h3 className="text-xl font-light text-white mb-4">Analysis</h3>
              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-gray-400 text-sm leading-relaxed">Environment Research</p>
                <p className="text-gray-400 text-sm leading-relaxed">Narrative Flow Mapping</p>
                <p className="text-gray-400 text-sm leading-relaxed">Precedent Study</p>
              </div>
            </div>

            <div className="aspect-square bg-black rounded-lg p-8 flex flex-col text-center border border-white">
              <h3 className="text-xl font-light text-white mb-4">Design Development</h3>
              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-gray-400 text-sm leading-relaxed">Worldbuilding</p>
                <p className="text-gray-400 text-sm leading-relaxed">Character Design</p>
                <p className="text-gray-400 text-sm leading-relaxed">Scriptwriting & Storyboarding</p>
                <p className="text-gray-400 text-sm leading-relaxed">Level Design</p>
                <p className="text-gray-400 text-sm leading-relaxed">Spatial Design</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Character 3D Model Section */}
      <div className="max-w-[1540px] mx-auto px-6 md:px-[150px] z-10 relative mt-[-80px]">
        <ModelViewer 
          modelPath="https://sketchfab.com/3d-models/rx-056-character-demo-abc123" 
          title="Character 3D Model"
          isSketchfab={true}
        />
      </div>
    </div>
  );
};

export default LearnProjectDetail;
