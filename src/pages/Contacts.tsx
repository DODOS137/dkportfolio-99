
import React from 'react';
import ContactForm from '@/components/ContactForm';

const Contacts = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation spacing */}
      <div className="pt-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-light mb-8 text-center">Get In Touch</h1>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Use this form to request text changes or reach out for any other inquiries.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
