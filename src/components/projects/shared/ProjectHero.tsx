
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ProjectHeroProps {
  title: string;
  subtitle: string;
  year: string;
  client: string;
  role: string;
}

const ProjectHero = ({ title, subtitle, year, client, role }: ProjectHeroProps) => {
  const heroRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        ref={heroRef.ref} 
        className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          heroRef.isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
          {subtitle}
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
          <span>{year}</span>
          <span>•</span>
          <span>{client}</span>
          <span>•</span>
          <span>{role}</span>
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
