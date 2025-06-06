
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '@/components/ui/carousel';

interface CarouselSectionProps {
  images: string[];
  title: string;
}

const CarouselSection = ({ images, title }: CarouselSectionProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
        <div className="rounded-lg bg-transparent">
          <h2 className="text-2xl font-light mb-40 text-gray-300 md:text-xl">{title}</h2>
        </div>
      </div>

      <div className="w-full mb-40">
        <Carousel className="w-full bg-black" setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full">
                  <AspectRatio ratio={16 / 9} className="w-full">
                    <img src={image} alt={`Slider image ${index + 1}`} className="w-full h-full object-cover" />
                  </AspectRatio>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white hover:bg-white/10 w-12 h-12" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white hover:bg-white/10 w-12 h-12" />
        </Carousel>

        <div className="flex justify-center space-x-2 mt-6">
          {images.map((_, index) => (
            <div 
              key={index} 
              className={`w-6 h-0.5 cursor-pointer transition-all duration-300 ${current === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`} 
              onClick={() => api?.scrollTo(index)} 
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CarouselSection;
