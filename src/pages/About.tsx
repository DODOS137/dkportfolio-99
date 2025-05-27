
import React from 'react';
import Navbar from '../components/Navbar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const titleAnimation = useScrollAnimation<HTMLHeadingElement>();
  const introAnimation = useScrollAnimation<HTMLDivElement>();
  const skillsAnimation = useScrollAnimation<HTMLDivElement>();
  const experienceAnimation = useScrollAnimation<HTMLDivElement>();
  const educationAnimation = useScrollAnimation<HTMLDivElement>();
  const contactAnimation = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <main className="pt-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto mt-16">
          <h1 
            ref={titleAnimation.ref}
            className={`text-4xl font-bold text-white mb-8 transition-all duration-1000 ${
              titleAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            About
          </h1>
          
          <div 
            ref={introAnimation.ref}
            className={`bg-[#111] rounded-xl p-6 md:p-8 shadow-lg border border-gray-800 mb-8 transition-all duration-1000 delay-300 ${
              introAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Do Hyun Kim</h2>
            <p className="text-gray-300 leading-relaxed">
              I am a designer passionate about exploring the intersection of technology and human experience. 
              My work spans across XR, interactive design, and spatial environments, always seeking to create 
              meaningful connections between people and digital spaces.
            </p>
          </div>

          <div 
            ref={skillsAnimation.ref}
            className={`bg-[#111] rounded-xl p-6 md:p-8 shadow-lg border border-gray-800 mb-8 transition-all duration-1000 delay-500 ${
              skillsAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Skills & Expertise</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "VR/AR Development",
                "Interactive Design",
                "Spatial Design", 
                "3D Modeling",
                "Unity Development",
                "User Experience Design"
              ].map((skill, index) => (
                <div 
                  key={skill}
                  className={`bg-[#222] p-3 rounded-lg text-gray-300 text-center transition-all duration-300 ${
                    skillsAnimation.isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: skillsAnimation.isVisible ? `${index * 100 + 700}ms` : '0ms'
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div 
            ref={experienceAnimation.ref}
            className={`bg-[#111] rounded-xl p-6 md:p-8 shadow-lg border border-gray-800 mb-8 transition-all duration-1000 delay-700 ${
              experienceAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Experience</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-gray-600 pl-4">
                <h4 className="text-white font-medium">XR Designer</h4>
                <p className="text-gray-400 text-sm">2022 - Present</p>
                <p className="text-gray-300 mt-2">
                  Creating immersive virtual reality experiences and interactive installations
                </p>
              </div>
            </div>
          </div>

          <div 
            ref={educationAnimation.ref}
            className={`bg-[#111] rounded-xl p-6 md:p-8 shadow-lg border border-gray-800 mb-8 transition-all duration-1000 delay-900 ${
              educationAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
            <div className="border-l-2 border-gray-600 pl-4">
              <h4 className="text-white font-medium">Design Studies</h4>
              <p className="text-gray-400 text-sm">University</p>
              <p className="text-gray-300 mt-2">
                Focused on digital media, interactive design, and human-computer interaction
              </p>
            </div>
          </div>

          <div 
            ref={contactAnimation.ref}
            className={`bg-[#111] rounded-xl p-6 md:p-8 shadow-lg border border-gray-800 transition-all duration-1000 delay-1100 ${
              contactAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Get In Touch</h3>
            <p className="text-gray-300">
              I'm always interested in collaborating on innovative projects that push the boundaries 
              of digital experience design.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
