
import React from 'react';
import { Mail, Phone, Linkedin, Instagram, Youtube } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Navbar from '@/components/Navbar';

const Contacts = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <main className="pt-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto mt-16">
          <h1 className="text-4xl font-bold text-white mb-8">Contacts</h1>
          
          <div className="bg-[#111] rounded-xl p-6 md:p-8 shadow-lg border border-gray-800">
            <div className="text-white space-y-6">
              {/* Email Contact */}
              <div className="flex items-center space-x-4 hover:bg-[#222] p-3 rounded-lg transition-all">
                <div className="bg-white p-3 rounded-full">
                  <Mail className="text-black" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:dohyon18@gmail.com" className="text-white hover:text-gray-300 transition-colors font-medium">dohyon18@gmail.com</a>
                </div>
              </div>
              
              {/* Phone Contact */}
              <div className="flex items-center space-x-4 hover:bg-[#222] p-3 rounded-lg transition-all">
                <div className="bg-white p-3 rounded-full">
                  <Phone className="text-black" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a href="tel:+447587458797" className="text-white hover:text-gray-300 transition-colors font-medium">+44 (0) 7587-458797</a>
                </div>
              </div>
              
              {/* LinkedIn Contact */}
              <div className="flex items-center space-x-4 hover:bg-[#222] p-3 rounded-lg transition-all">
                <div className="bg-white p-3 rounded-full">
                  <Linkedin className="text-black" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/dohyun-kim-028221343" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors font-medium">linkedin.com/in/dohyun-kim</a>
                </div>
              </div>
              
              {/* Instagram Contact */}
              <div className="flex items-center space-x-4 hover:bg-[#222] p-3 rounded-lg transition-all">
                <div className="bg-white p-3 rounded-full">
                  <Instagram className="text-black" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Instagram</p>
                  <a href="https://www.instagram.com/donn_kkim" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors font-medium">@donn_kkim</a>
                </div>
              </div>
              
              {/* YouTube Contact */}
              <div className="flex items-center space-x-4 hover:bg-[#222] p-3 rounded-lg transition-all">
                <div className="bg-white p-3 rounded-full">
                  <Youtube className="text-black" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">YouTube</p>
                  <a href="https://www.youtube.com/channel/UCwwt3iNyM7nuIx_XbXiqlqw" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors font-medium">Do Hyun Kim - YouTube</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="container mx-auto px-6">
              <h1 className="text-4xl md:text-6xl font-light mb-8 text-center text-white">Get In Touch</h1>
              <p className="text-xl text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contacts;
