
import React from 'react';
import Navbar from '../components/Navbar';
import { Mail, Phone, Linkedin, Instagram, Youtube } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contacts = () => {
  const titleAnimation = useScrollAnimation<HTMLHeadingElement>();
  const cardAnimation = useScrollAnimation<HTMLDivElement>();

  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "dohyon18@naver.com",
      link: "mailto:dohyon18@naver.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+44 (0) 7587-458797",
      link: "tel:+447587458797"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/dohyun-kim",
      link: "https://www.linkedin.com/in/dohyun-kim-028221343"
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@donn_kkim",
      link: "https://www.instagram.com/donn_kkim"
    },
    {
      icon: Youtube,
      label: "YouTube",
      value: "Do Hyun Kim - YouTube",
      link: "https://www.youtube.com/channel/UCwwt3iNyM7nuIx_XbXiqlqw"
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <main className="pt-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto mt-16">
          <h1 
            ref={titleAnimation.ref}
            className={`text-4xl font-bold text-white mb-8 transition-all duration-1000 ${
              titleAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            Contacts
          </h1>
          
          <div 
            ref={cardAnimation.ref}
            className={`bg-[#111] rounded-xl p-6 md:p-8 shadow-lg border border-gray-800 transition-all duration-1000 delay-300 ${
              cardAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-white space-y-6">
              {contacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div 
                    key={contact.label}
                    className={`flex items-center space-x-4 hover:bg-[#222] p-3 rounded-lg transition-all duration-300 ${
                      cardAnimation.isVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-10'
                    }`}
                    style={{
                      transitionDelay: cardAnimation.isVisible ? `${index * 100 + 600}ms` : '0ms'
                    }}
                  >
                    <div className="bg-white p-3 rounded-full">
                      <Icon className="text-black" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{contact.label}</p>
                      <a 
                        href={contact.link} 
                        target={contact.link.startsWith('http') ? "_blank" : undefined}
                        rel={contact.link.startsWith('http') ? "noopener noreferrer" : undefined}
                        className="text-white hover:text-gray-300 transition-colors font-medium"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contacts;
