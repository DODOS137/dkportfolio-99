import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area'; // ✅ 추가

const About = () => {
  return (
  <ScrollArea className="h-screen w-full"> {/* ✅ 스크롤 영역 전체 감싸기 */}
  <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <main className="pt-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto mt-40">
          <h1 className="text-5xl font-bold text-white mb-8">About</h1>
          <div className="text-white space-y-8">
            <div className="backdrop-blur-sm p-6 border border-black/10 bg-transparent rounded-md px-0 py-20">
              <h2 className="text-2xl font-semibold mb-8">Do Hyun Kim</h2>
              <p className="text-xl leading-relaxed py-[16px] font-light text-gray-400">I'm Dohyun Kim, a spatial and exhibition designer based in London.
I'm drawn to the moment when a space stops being a backdrop and starts being the story — when sound, light, or movement shifts how people perceive the world around them.
              </p>
                <p className="text-xl leading-relaxed py-[16px] font-light text-gray-400">My work moves between physical exhibitions and virtual environments, always asking the same question: what does it feel like to be inside this?
                </p>  
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold mb-8">Education</h3>
                <ul className="space-y-2">
                  <li className="text-large font-semibold mb-2">University of the Arts London</li>
                  <li className="">London College of Communication, London, United Kingdom</li>
                  <li>MA Virtual Reality</li>
                  <li className="text-large font-semibold mb-2 mt-4">Kookmin University</li>
                  <li>Seoul, Republic of Korea</li>
                  <li>BFA Spatial Design</li>
                </ul>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold mb-8">What I do</h3>
                <ul className="space-y-2">
                  <li>XR Exhibition Prototyping (XR / WebGL / Interactive)</li>
                  <li>Immersive Spatial Design & Visitor Journey Planning</li>
                  <li>3D Modelling, Texturing & Real-time Rendering</li>

                </ul>
              </div>
            </div>
            
            <div className="backdrop-blur-sm p-6 border border-black/10 bg-transparent rounded-md mt-16 px-0 my-0 py-[40px]">
              <h2 className="text-2xl font-semibold mb-8">Research Interests</h2>
              <p className="text-xl leading-relaxed font-light text-gray-400"> I take a human- and environment-centred approach to design, drawing inspiration from natural principles and everyday cognitive patterns. My work reinterprets these familiar elements through fresh perspectives, exploring how they can be applied in meaningful and practical contexts.
              </p>
              </div>
            
            <div className="backdrop-blur-sm p-6 border border-black/10 bg-transparent rounded-md px-0 py-0">
              <h2 className="text-2xl font-semibold mb-8">Design Direction</h2>
              <p className="text-xl leading-relaxed font-light text-gray-400">Work with shared experiences, using familiar objects and common emotions as reference points. This approach keeps design straightforward, recognisable, and practical for everyday use.
              </p>
              </div>
            
            <div className="mt-8 flex justify-center py-40">
              <Link to="/contacts">
                <Button variant="outline" className="border-white transition-colors text-black bg-white my-0">
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
</ScrollArea>
  );
};

    
export default About;
