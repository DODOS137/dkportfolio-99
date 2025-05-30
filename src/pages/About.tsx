import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
const About = () => {
  return <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <main className="pt-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto mt-16">
          <h1 className="text-5xl font-bold text-white mb-8">About</h1>
          <div className="text-white space-y-8">
            <div className="backdrop-blur-sm p-6 border border-black/10 bg-transparent rounded-md px-0">
              <h2 className="text-2xl font-semibold mb-4">Do Hyun Kim</h2>
              <p className="text-xl leading-relaxed py-[15px]">A passionate designer specializing in spatial design and VR/XR technologies. Continuously exploring how VR and XR can expand human experiences and create new forms of engagement within physical spaces. Committed to investigating the potential and effectiveness of immersive technologies across various environments, from gaming to exhibitions. Focused on pushing the boundaries of physical space to unlock new possibilities for interaction and presence.</p>
              <p className="text-xl leading-relaxed py-[14px]"> I enjoy working within teams and exchanging ideas with people from diverse backgrounds. I find energy and inspiration in listening to others, exploring different perspectives on a shared goal, and openly discussing those ideas together.</p>
              <p className="text-xl leading-relaxed py-[15px]"> What I value most in collaboration is finding the balance between creative vision and practical feasibility. I believe that thoughtful discussion around how an idea can be realistically implemented is just as important as the idea itself, and I see this process as essential to meaningful, effective design.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <ul className="space-y-2">
                  <li className="text-large font-semibold mb-2">University of the Arts London</li>
                  <li>London College of Communication, London, United Kingdom</li>
                  <li>MA Virtual Reality</li>
                  <li className="text-large font-semibold mb-2">Kookmin University</li>
                  <li>Seoul, Republic of Korea</li>
                  <li>BA Spatial Design</li>
                </ul>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold mb-2">What I do</h3>
                <ul className="space-y-2">
                  <li>Spatial Design</li>
                  <li>Virtual Reality Design & Development </li>
                  
                  <li>Exhibition Design</li>
                </ul>
              </div>
            </div>
            
            <div className="backdrop-blur-sm p-6 border border-black/10 bg-transparent rounded-md px-0">
              <h2 className="text-2xl font-semibold mb-4">Research Interests</h2>
              <p className="text-xl leading-relaxed"> I take a human and environment centred approach to design, drawing inspiration from the fundamental principles found in nature and the patterns of human thinking we encounter in everyday life. I aim to reframe these familiar elements through fresh and diverse perspectives, exploring how they can be meaningfully applied to real-world contexts.</p>
            </div>
            
            <div className="backdrop-blur-sm p-6 border border-black/10 bg-transparent rounded-md px-0">
              <h2 className="text-2xl font-semibold mb-4">Design Direction</h2>
              <p className="text-xl leading-relaxed"> Focusing on content that reflects common experiences—objects we frequently see or emotions we often feel—I strive to create work that feels both relatable and impactful. I believe that when design is rooted in what people already understand and connect with, it becomes more intuitive, accessible, and relevant in daily life.</p>
            </div>
            
            <div className="mt-8 flex justify-center">
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