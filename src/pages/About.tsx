import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
const About = () => {
  return <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <main className="pt-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto mt-40">
          <h1 className="text-5xl font-bold text-white mb-8">About</h1>
          <div className="text-white space-y-8">
            <div className="backdrop-blur-sm p-6 border border-black/10 bg-transparent rounded-md px-0 py-20">
              <h2 className="text-2xl font-semibold mb-8">Do Hyun Kim</h2>
              <p className="text-xl leading-relaxed py-[16px] font-light text-gray-400">Designer specialising in spatial design and immersive technologies, particularly VR/XR. Work explores how virtual environments can expand human experience and create new forms of engagement within physical space. Committed to investigating the practical and emotional potential of immersive tools across contexts—ranging from exhibitions and education to gaming.
              </p>
                <p className="text-xl leading-relaxed py-[16px] font-light text-gray-400">Collaborative by nature, I thrive in multidisciplinary teams where ideas are challenged, tested, and refined. I value dialogue that balances creative ambition with technical feasibility, believing that strong design emerges through clear thinking, shared goals, and critical discussion.
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
                  <li>Spatial Design</li>
                  <li>Virtual Reality Design & Development </li>
                  
                  <li>Exhibition Design</li>
                </ul>
              </div>
            </div>
            
            <div className="backdrop-blur-sm p-6 border border-black/10 bg-transparent rounded-md mt-16 px-0 my-0 py-[40px]">
              <h2 className="text-2xl font-semibold mb-8">Research Interests</h2>
              <p className="text-xl leading-relaxed font-light text-gray-400"> I take a human- and environment-centred approach to design, drawing inspiration from the fundamental principles found in nature and the cognitive patterns we encounter in everyday life. I seek to reframe these familiar elements through fresh and diverse perspectives, exploring how they can be meaningfully applied within real-world contexts.
              </p>
              </div>
            
            <div className="backdrop-blur-sm p-6 border border-black/10 bg-transparent rounded-md px-0 py-0">
              <h2 className="text-2xl font-semibold mb-8">Design Direction</h2>
              <p className="text-xl leading-relaxed font-light text-gray-400">By focusing on content that reflects shared experiences—familiar objects or commonly felt emotions—I aim to create work that is both relatable and resonant. I believe that when design is grounded in what people already recognise and connect with, it becomes more intuitive, accessible, and meaningful in everyday life.
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
    </div>;
};
export default About;