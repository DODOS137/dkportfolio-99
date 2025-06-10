
import React from 'react';

interface ImageGalleryProps {
  images: string[];
  title?: string;
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  return (
    <>
      {title && (
        <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
          <div className="rounded-lg bg-transparent">
            <h2 className="text-2xl font-light mb-40 text-gray-300 md:text-xl">{title}</h2>
          </div>
        </div>
      )}
      
      {images.map((image, index) => (
        <div key={index} className="w-full">
          <img 
            src={index === 0 ? "/lovable-uploads/ace0408c-15ac-4dfd-92a5-ef10e0b20d70.png" : image} 
            className="w-full h-auto mb-40" 
            alt={`Gallery image ${index + 1}`}
            data-lovable-editable="true"
          />
        </div>
      ))}
    </>
  );
};

export default ImageGallery;
