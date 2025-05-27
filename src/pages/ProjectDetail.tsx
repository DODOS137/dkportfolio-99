import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import YouTube from 'react-youtube';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import ModelViewer from '../components/ModelViewer';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  imageUrl?: string;
  secondaryImageUrl?: string;
  videoId?: string; // Added videoId field for YouTube videos
  koreanDescription?: string; // Added field for Korean description
}

const projects: Project[] = [{
  id: "1",
  title: "Invisible Space Museum",
  slug: "invisible-space-museum",
  description: "An interactive digital museum experience",
  fullDescription: "This project is designed as an educational VR experience aimed at helping the general public better understand scientific exhibitions. By presenting complex scientific principles in an intuitive and immersive virtual environment, the content lowers the barrier of entry that many people feel toward science. Through interactive visuals and storytelling, the project seeks to spark curiosity, enhance engagement, and promote more accessible scientific thinking.",
  imageUrl: "/lovable-uploads/a8602589-d1a5-4884-ac8c-6eec67fbc1e7.png",
  videoId: "7GC2R6GYUrw" // Added videoId for the Invisible Space Museum project
}, {
  id: "2",
  title: "Learn",
  slug: "learn",
  description: "Educational platform for creative professionals",
  fullDescription: "This project centers around three robot characters who serve as the main protagonists, unfolding a narrative set in a vast library after the collapse of human civilization. The story explores themes of memory, knowledge preservation, and the search for meaning in a world without humans. This work involves a comprehensive VR content development process, covering multiple aspects such as detailed level design to create an immersive environment, character design that brings the robots' personalities and roles to life, and storytelling that drives the emotional and conceptual depth of the experience. In addition, spatial design plays a key role in shaping the atmosphere and guiding the user's journey through the virtual world, ensuring that every element contributes to the overall narrative and engagement.",
  imageUrl: "/lovable-uploads/4fcab175-0d46-4c3f-ba8a-9acac1b7a88b.png"
}, {
  id: "3",
  title: "Project 3",
  slug: "project-3",
  description: "Innovative digital solution for modern problems",
  fullDescription: "This project proposes a new paradigm by introducing a stage where hidden objects can be revealed through body heat detection technology. By allowing the audience to interact with the environment using their own presence and movement, the project presents an innovative approach to spatial interaction and redefines how viewers engage with space. Instead of relying on conventional visual cues or interfaces, the system responds to the audience's physical proximity and body temperature, creating a dynamic and intuitive form of communication between the user and the environment. This interactive mechanism not only enhances audience participation but also encourages exploration, curiosity, and personal interpretation. Through this sensory-based engagement, the project opens up new possibilities for experiential design, offering a fresh perspective on how technology can deepen emotional and spatial connections in performance and exhibition settings.",
  imageUrl: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=1974&auto=format&fit=crop"
}, {
  id: "4",
  title: "Project 4",
  slug: "project-4",
  description: "Cutting-edge technology implementation",
  fullDescription: "This project focuses on the subtle and often unheard sounds of endangered marine species that live on the ocean floor or hide beneath rocks. These creatures are typically overlooked due to their remote habitats and the inaudibility of their presence in everyday human experience. By highlighting their acoustic environment, the project aims to give these species a stronger voice and presence within the context of an exhibition. It utilizes technologies such as augmented reality (AR) and immersive, spatial sound design to create a deeply engaging sensory experience. Through the combination of visual and auditory storytelling, the installation invites audiences to reflect on the fragility of marine ecosystems and the urgent need for conservation. The project ultimately seeks to shift perception, encouraging empathy for these hidden lives and fostering a deeper connection between visitors and the natural world.",
  imageUrl: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=1936&auto=format&fit=crop",
  videoId: "zqz3Owz0K3o" // Added videoId for the requested YouTube video
}, {
  id: "5",
  title: "Seoul Natural History Museum",
  slug: "project-5",
  description: "Brand Renewal and Environmental Design",
  fullDescription: "The Seodaemun Museum of Natural History is dedicated to preserving, researching, and showcasing geological and biological records related to Korea's regional environment. It holds historical significance as the first natural history museum in South Korea founded by a public institution.\nThis project rebrands and redesigns the museum by infusing it with elements of traditional Korean aesthetics. By reinterpreting its existing identity and harmonizing traditional motifs with modern design sensibilities, the project aims to offer a more engaging and immersive experience for visitors. With a holistic approach—encompassing visual identity, spatial design, and content planning—it enhances the museum's distinct character while deepening emotional connection with its audience.",
  imageUrl: "/lovable-uploads/bbf61a99-9742-401e-9e18-fa7cdb1b4023.png",
  videoId: "8GEK3igRom0",
  secondaryImageUrl: "/lovable-uploads/64773a01-61f1-46bc-8953-87f1a74a756a.png" // Added project info image
}, {
  id: "6",
  title: "Island",
  slug: "project-6",
  description: "Public Space Design",
  fullDescription: " This project reimagines a bridge as a public space that captures the unique characteristics of an island. By redesigning the bridge, the project aims to bring the diverse and natural beauty of the island into the urban landscape, allowing city dwellers to experience the island's essence within the city environment. The design blends functionality with the island's distinctive features, creating a space that not only connects locations but also serves as a reflection of the island's identity, fostering a deeper connection between nature, architecture, and the urban community.",
  imageUrl: "/lovable-uploads/f342cf60-f298-4b69-9a4e-73b0cef98ef7.png"
}];

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string; }>();
  const project = projects.find(p => p.slug === slug);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Animation hooks for different sections
  const headerAnimation = useScrollAnimation<HTMLDivElement>();
  const mainImageAnimation = useScrollAnimation<HTMLDivElement>();
  const titleAnimation = useScrollAnimation<HTMLDivElement>();
  const videoAnimation = useScrollAnimation<HTMLDivElement>();
  const iframeAnimation = useScrollAnimation<HTMLDivElement>();

  // Form setup for editable content
  const form = useForm({
    defaultValues: {
      fullDescription: project?.fullDescription || ""
    }
  });

  // Handle scroll events to show/hide the scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle edit toggle
  const toggleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setEditedDescription(project?.fullDescription || "");
      setIsEditing(true);
    }
  };

  // Handle save changes
  const handleSave = (data: { fullDescription: string; }) => {
    setEditedDescription(data.fullDescription);
    setIsEditing(false);
    // In a real app, you would save this to a database
    console.log("Saved description:", data.fullDescription);
  };

  // YouTube video options
  const videoOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  };

  if (!project) {
    return <div className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-16 px-4 md:px-8 max-w-5xl mx-auto mt-16">
          <Link to="/work" className="inline-flex items-center text-white mb-8">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Work
          </Link>
          <h1 className="text-4xl font-bold text-white">Project not found</h1>
        </div>
      </div>;
  }

  return <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-16 px-4 md:px-8 pb-16">
        <div className="max-w-full mx-auto mt-16">
          <div 
            ref={headerAnimation.ref}
            className={`flex justify-between items-center mb-8 transition-all duration-1000 ${
              headerAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <Link to="/work" className="inline-flex items-center text-white">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Work
            </Link>
          </div>
          
          {/* Image display based on project slug */}
          {project.slug === "project-4" ? <div 
              ref={mainImageAnimation.ref}
              className={`w-full mb-8 transition-all duration-1000 delay-300 ${
                mainImageAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <img alt={project.title} className="w-full h-auto object-contain" src="/lovable-uploads/f5e98b7a-3e8e-452b-b528-71d91c2e803c.png" />
            </div> : project.slug === "project-3" ? <>
          <div 
            ref={mainImageAnimation.ref}
            className={`w-full mb-8 relative transition-all duration-1000 delay-300 ${
              mainImageAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <img alt={project.title} className="w-full h-auto object-contain" src="/lovable-uploads/3634679f-46de-467c-8d1d-e5d3132056ab.png" />
          </div>
          
          <div 
            ref={titleAnimation.ref}
            className={`w-full mb-8 flex justify-center transition-all duration-1000 delay-500 ${
              titleAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-[80%] prose prose-invert max-w-none rounded-3xl py-[30px] px-0">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">Thermal Trace</h1>
              {isEditing ? <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
                    <FormField control={form.control} name="fullDescription" defaultValue={project.fullDescription} render={({
                    field
                  }) => <FormItem>
                        <FormControl>
                          <Textarea className="min-h-40 bg-gray-800 text-white" {...field} />
                        </FormControl>
                      </FormItem>} />
                    <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                      저장
                    </Button>
                  </form>
                </Form> : <div>{editedDescription || project.fullDescription}</div>}
            </div>
          </div>
          
          {/* Enhanced iframe with better styling and visual elements - Updated with black background */}
          <div 
            ref={iframeAnimation.ref}
            className={`w-full my-10 transition-all duration-1000 delay-700 ${
              iframeAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
              <div className="p-4 bg-opacity-60 flex justify-between items-center bg-black">
                <h3 className="text-lg font-medium text-white flex items-center">
                  <span>Hidden Objects - Interactive Demo</span>
                </h3>
                <div className="text-gray-400 text-sm px-[240px]">Press 'X' Key to activate with Full-screen Mode</div>
              </div>
              <div className="w-full relative">
                <AspectRatio ratio={16 / 9}>
                  <iframe src="https://lucent-banoffee-a50286.netlify.app" title="Hidden Objects WebGL Demo" className="w-full h-full border-0 bg-black" allowFullScreen />
                </AspectRatio>
              </div>
            </div>
          </div>
          
          {/* Remaining images with animations */}
          <div 
            ref={mainImageAnimation.ref}
            className={`w-full my-10 transition-all duration-1000 delay-900 ${
              mainImageAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <img alt="Project Information" className="w-full h-auto object-contain" src="/lovable-uploads/1b613fef-975b-4b55-b372-66e232aa794c.png" />
          </div>

          <div 
            ref={mainImageAnimation.ref}
            className={`w-full my-10 transition-all duration-1000 delay-1100 ${
              mainImageAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <img alt="Project Detail 1" className="w-full h-auto object-contain" src="/lovable-uploads/e8ffa199-e316-4075-a0cf-b1b72a4f690b.png" />
          </div>

          <div 
            ref={mainImageAnimation.ref}
            className={`w-full my-10 transition-all duration-1000 delay-1200 ${
              mainImageAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <img alt="Project Detail 2" className="w-full h-auto object-contain" src="/lovable-uploads/0fff2e7a-bb91-47ff-a4e4-330f0f83ea65.png" />
          </div>

          <div 
            ref={mainImageAnimation.ref}
            className={`w-full my-10 transition-all duration-1000 delay-1300 ${
              mainImageAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <img alt="Project Detail 3" className="w-full h-auto object-contain" src="/lovable-uploads/2e88ca9a-43c9-4595-ad90-8844c661d086.png" />
          </div>

          <div 
            ref={mainImageAnimation.ref}
            className={`w-full my-10 transition-all duration-1000 delay-1400 ${
              mainImageAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <img alt="Project Detail 4" className="w-full h-auto object-contain" src="/lovable-uploads/f3f4863e-6fbd-4b74-bf8b-e692ad885122.png" />
          </div>

          <div 
            ref={mainImageAnimation.ref}
            className={`w-full my-10 transition-all duration-1000 delay-1500 ${
              mainImageAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <img alt="Project Detail 5" className="w-full h-auto object-contain" src="/lovable-uploads/07fecdb4-4b8b-4abe-b343-32c0b6550356.png" />
          </div>

          <div 
            ref={mainImageAnimation.ref}
            className={`w-full my-10 transition-all duration-1000 delay-1600 ${
              mainImageAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <img alt="Project Detail 6" className="w-full h-auto object-contain" src="/lovable-uploads/6d619edc-0aeb-4cee-88da-2dc1ba2973a5.png" />
          </div>

          <div 
            ref={mainImageAnimation.ref}
            className={`w-full my-10 transition-all duration-1000 delay-1700 ${
              mainImageAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <img alt="Project Detail 7" className="w-full h-auto object-contain" src="/lovable-uploads/7483a1cd-91ca-4b71-9f9e-e32acd16486f.png" />
          </div>

          <div 
            ref={mainImageAnimation.ref}
            className={`w-full my-10 transition-all duration-1000 delay-1800 ${
              mainImageAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <img alt="Project Detail 8" className="w-full h-auto object-contain" src="/lovable-uploads/5273fb9e-048e-4e4e-8214-6276275e875e.png" />
          </div>

          <div 
            ref={mainImageAnimation.ref}
            className={`w-full my-10 transition-all duration-1000 delay-1900 ${
              mainImageAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <img alt="Thermal Imaging Examples" className="w-full h-auto object-contain" src="/lovable-uploads/645da221-f684-4beb-b134-4a7719207e38.png" />
          </div>

          <div 
            ref={mainImageAnimation.ref}
            className={`w-full my-10 transition-all duration-1000 delay-2000 ${
              mainImageAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <img alt="Thermal Hand Print" className="w-full h-auto object-contain" src="/lovable-uploads/862f9e58-2ec9-4bfc-b764-90f995e32dfd.png" />
          </div>
        </div>
      </main>

      {/* Back to Work button at the bottom */}
      <div className="mt-16 mb-8 flex justify-center">
        <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-black">
          <Link to="/work" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Work
          </Link>
        </Button>
      </div>

      {/* "Top" floating button */}
      {showScrollToTop && <Button onClick={scrollToTop} className="fixed bottom-8 right-8 rounded-full w-12 h-12 bg-white/30 backdrop-blur-sm hover:bg-white/60 text-white flex items-center justify-center shadow-lg transition-all z-50" aria-label="Scroll to top">
          <ArrowUp className="h-5 w-5" />
        </Button>}
    </div>;
};

export default ProjectDetail;
