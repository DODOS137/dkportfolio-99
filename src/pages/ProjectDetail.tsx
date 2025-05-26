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
  imageUrl: "/lovable-uploads/4c29e171-4bbf-4092-854c-13bf32686e5e.png",
  videoId: "8GEK3igRom0",
  secondaryImageUrl: "/lovable-uploads/64773a01-61f1-46bc-8953-87f1a74a756a.png" // Added project info image
}, {
  id: "6",
  title: "Island",
  slug: "project-6",
  description: "Public Space Design",
  fullDescription: " This project reimagines a bridge as a public space that captures the unique characteristics of an island. By redesigning the bridge, the project aims to bring the diverse and natural beauty of the island into the urban landscape, allowing city dwellers to experience the island's essence within the city environment. The design blends functionality with the island's distinctive features, creating a space that not only connects locations but also serves as a reflection of the island's identity, fostering a deeper connection between nature, architecture, and the urban community.",
  imageUrl: "/lovable-uploads/e4ee8415-921a-44fe-bf59-82af2b5be394.png"
}];
const ProjectDetail = () => {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const project = projects.find(p => p.slug === slug);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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
  const handleSave = (data: {
    fullDescription: string;
  }) => {
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
          <div className="flex justify-between items-center mb-8">
            <Link to="/work" className="inline-flex items-center text-white">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Work
            </Link>
          </div>
          
          {/* Image display based on project slug */}
          {project.slug === "project-4" ? <div className="w-full mb-8">
              <img alt={project.title} className="w-full h-auto object-contain" src="/lovable-uploads/f5e98b7a-3e8e-452b-b528-71d91c2e803c.png" />
            </div> : project.slug === "project-3" ? <>
          <div className="w-full mb-8 relative">
            <img alt={project.title} className="w-full h-auto object-contain" src="/lovable-uploads/3634679f-46de-467c-8d1d-e5d3132056ab.png" />
          </div>
          
          <div className="w-full mb-8 flex justify-center">
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
          <div className="w-full my-10">
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
          
          {/* IMAGE SECTION 2: Project Information */}
          <div className="w-full my-10">
            <img alt="Project Information" className="w-full h-auto object-contain" src="/lovable-uploads/1b613fef-975b-4b55-b372-66e232aa794c.png" />
          </div>

          {/* IMAGE SECTION 3: Project Detail 1 */}
          <div className="w-full my-10">
            <img alt="Project Detail 1" className="w-full h-auto object-contain" src="/lovable-uploads/e8ffa199-e316-4075-a0cf-b1b72a4f690b.png" />
          </div>

          {/* IMAGE SECTION 4: Project Detail 2 */}
          <div className="w-full my-10">
            <img alt="Project Detail 2" className="w-full h-auto object-contain" src="/lovable-uploads/0fff2e7a-bb91-47ff-a4e4-330f0f83ea65.png" />
          </div>

          {/* IMAGE SECTION 5: Project Detail 3 */}
          <div className="w-full my-10">
            <img alt="Project Detail 3" className="w-full h-auto object-contain" src="/lovable-uploads/2e88ca9a-43c9-4595-ad90-8844c661d086.png" />
          </div>

          {/* IMAGE SECTION 6: Project Detail 4 */}
          <div className="w-full my-10">
            <img alt="Project Detail 4" className="w-full h-auto object-contain" src="/lovable-uploads/f3f4863e-6fbd-4b74-bf8b-e692ad885122.png" />
          </div>

          {/* IMAGE SECTION 7: Project Detail 5 */}
          <div className="w-full my-10">
            <img alt="Project Detail 5" className="w-full h-auto object-contain" src="/lovable-uploads/07fecdb4-4b8b-4abe-b343-32c0b6550356.png" />
          </div>

          {/* IMAGE SECTION 8: Project Detail 6 */}
          <div className="w-full my-10">
            <img alt="Project Detail 6" className="w-full h-auto object-contain" src="/lovable-uploads/6d619edc-0aeb-4cee-88da-2dc1ba2973a5.png" />
          </div>

          {/* IMAGE SECTION 9: Project Detail 7 */}
          <div className="w-full my-10">
            <img alt="Project Detail 7" className="w-full h-auto object-contain" src="/lovable-uploads/7483a1cd-91ca-4b71-9f9e-e32acd16486f.png" />
          </div>

          {/* IMAGE SECTION 10: Project Detail 8 */}
          <div className="w-full my-10">
            <img alt="Project Detail 8" className="w-full h-auto object-contain" src="/lovable-uploads/5273fb9e-048e-4e4e-8214-6276275e875e.png" />
          </div>

          {/* IMAGE SECTION 11: Thermal Imaging Examples */}
          <div className="w-full my-10">
            <img alt="Thermal Imaging Examples" className="w-full h-auto object-contain" src="/lovable-uploads/645da221-f684-4beb-b134-4a7719207e38.png" />
          </div>

          {/* IMAGE SECTION 12: Thermal Hand Print */}
          <div className="w-full my-10">
            <img alt="Thermal Hand Print" className="w-full h-auto object-contain" src="/lovable-uploads/862f9e58-2ec9-4bfc-b764-90f995e32dfd.png" />
          </div>
        </> : project.imageUrl && <div className="w-full mb-8 relative">
              <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-contain" />
              <div className="absolute inset-0 flex items-center"></div>
            </div>}
          
          {/* Title and description moved between image and video */}
          {project.slug === "invisible-space-museum" && <>
              <div className="w-full mb-8 flex justify-center">
                <div className="w-[80%] prose prose-invert max-w-none rounded-3xl py-[30px] px-0">
                  <h1 className="text-2xl md:text-4xl font-bold mb-4">Invisible</h1>
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
                    </Form> : <div className="rounded-xl">{editedDescription || project.fullDescription}</div>}
                </div>
              </div>
              
              {/* YouTube Video Section for Invisible Space Museum project - 80% width */}
              <div className="w-full mb-10 flex justify-center">
                <div className="w-[80%]">
                  <AspectRatio ratio={16 / 9} className="bg-gray-900 overflow-hidden rounded-lg">
                    <YouTube videoId="7GC2R6GYUrw" opts={videoOptions} className="w-full h-full" />
                  </AspectRatio>
                </div>
              </div>
              
              {/* Image section 1 - Project Type */}
              <div className="w-full my-10">
                <img alt="Project Type" className="w-full h-auto object-contain" src="/lovable-uploads/830169e7-f56e-4013-bc24-20cc8dea565a.png" />
              </div>
              
              {/* Image section 2 - Approach */}
              <div className="w-full my-10">
                <img alt="Approach" className="w-full h-auto object-contain" src="/lovable-uploads/0e65880f-681f-4793-ba4d-19e5629eb0e2.png" />
              </div>
              
              {/* Image section 3 - Process */}
              <div className="w-full my-10">
                <img alt="Process" className="w-full h-auto object-contain" src="/lovable-uploads/8fdff91b-0c06-4880-a3db-4d7fb68ee73f.png" />
              </div>
              
              {/* Image section 4 - Worldbuilding */}
              <div className="w-full my-10">
                <img alt="Worldbuilding - Environmental Setting" className="w-full h-auto object-contain" src="/lovable-uploads/f48414eb-0843-41ca-a7ac-24b47a777836.png" />
              </div>
              
              {/* NEW: Added images section 5 - First new image */}
              <div className="w-full my-10">
                <img alt="New Content Section 1" className="w-full h-auto object-contain" src="/lovable-uploads/d5cb75e1-942e-4d74-8082-bf5c5207be53.png" />
              </div>
              
              {/* NEW: Added images section 6 - Second new image */}
              <div className="w-full my-10">
                <img alt="New Content Section 2" className="w-full h-auto object-contain" src="/lovable-uploads/842728d8-09f4-4f7b-b613-e2bb6e05f8ea.png" />
              </div>
              
              {/* Image section 5 - Planet A233 (renumbered) */}
              <div className="w-full my-10">
                <img alt="Planet A233 Concept" className="w-full h-auto object-contain" src="/lovable-uploads/c1df1907-4ef4-4741-9a7b-70e2e6f116c2.png" />
              </div>
              
              {/* Image section 6 - Story Concept */}
              <div className="w-full my-10">
                <img alt="Story Concept & Emotional Logic" className="w-full h-auto object-contain" src="/lovable-uploads/9cc70901-2022-4a5e-939b-f88c02068fbd.png" />
              </div>
              
              {/* Image section 7 - Video Development */}
              <div className="w-full my-10">
                <img alt="Video Development Concepts" className="w-full h-auto object-contain" src="/lovable-uploads/d6d1407b-b465-46d5-ad71-b79279e3e479.png" />
              </div>
              
              {/* Image section 8 - Video Series Description */}
              <div className="w-full my-10">
                <img alt="Video Series Description" className="w-full h-auto object-contain" src="/lovable-uploads/6b40ece8-e7f0-4396-8628-8c6d8227f381.png" />
              </div>
              
              {/* Image section 9 - Level Design */}
              <div className="w-full my-10">
                <img alt="Level Design Layout" className="w-full h-auto object-contain" src="/lovable-uploads/46d677f1-ba48-4f02-92e5-0132203af2a6.png" />
              </div>
              
              {/* Image section 10 - User Journey */}
              <div className="w-full my-10">
                <img alt="User Journey Flow" className="w-full h-auto object-contain" src="/lovable-uploads/a38bd9ef-9d6b-4ad3-b69b-2c40242a3ab6.png" />
              </div>
              
              {/* Image section 11 - Spatial Design */}
              <div className="w-full my-10">
                <img alt="Spatial Design Concepts" className="w-full h-auto object-contain" src="/lovable-uploads/9ee86b31-9b14-4fa1-b6ee-712e724b253d.png" />
              </div>
              
              {/* NEW: Additional YouTube Video Section */}
              <div className="w-full my-10">
                <div className="w-full">
                  <AspectRatio ratio={16 / 9} className="bg-gray-900 overflow-hidden rounded-lg">
                    <YouTube videoId="KT0Cwy9s5n8" opts={videoOptions} className="w-full h-full" />
                  </AspectRatio>
                </div>
              </div>
              
              {/* NEW: Image section 13 - Post-Project Direction */}
              <div className="w-full my-10">
                <img alt="Post-Project Direction - Interactive Elements" className="w-full h-auto object-contain" src="/lovable-uploads/d647163e-b29b-4e71-a2ff-79b820669d03.png" />
              </div>
              
              {/* NEW: Image section 14 - Interactive Evolution Concept */}
              <div className="w-full my-10">
                <img alt="Interactive Evolution Concept Visualization" className="w-full h-auto object-contain" src="/lovable-uploads/6d5f6371-aafb-4c95-b8f5-a8f175252cdd.png" />
              </div>
            </>}
          
          {project.slug === "project-5" && <>
              {/* Updated to match Project 1's styling */}
              <div className="w-full mb-8 flex justify-center">
                <div className="w-[80%] prose prose-invert max-w-none rounded-3xl py-[30px] px-0">
                  <h1 className="text-2xl md:text-4xl font-bold mb-4">{project.title}</h1>
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
              
              {/* YouTube Video Section - 80% width */}
              <div className="w-full mb-10 flex justify-center">
                <div className="w-[80%]">
                  <AspectRatio ratio={16 / 9} className="bg-gray-900 overflow-hidden rounded-lg">
                    <YouTube videoId={project.videoId} opts={videoOptions} className="w-full h-full" />
                  </AspectRatio>
                </div>
              </div>
            </>}
            
          {/* Updated learn project to use the same styling as project-1 (Invisible Space Museum) */}
          {project.slug === "learn" && <>
              <div className="w-full mb-8 flex justify-center">
                <div className="w-[80%] prose prose-invert max-w-none rounded-3xl py-[30px] px-0">
                  <h1 className="text-2xl md:text-4xl font-bold mb-4">{project.title}</h1>
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
                    </Form> : <div className="px-0 py-[30px]">{editedDescription || project.fullDescription}</div>}
                </div>
              </div>
              
              {/* Image section 1 - Project Type & Info */}
              <div className="w-full my-10">
                <img alt="Project Type and Info" className="w-full h-auto object-contain" src="/lovable-uploads/ee98462a-374d-43f3-a2d0-b5fb8586168c.png" />
              </div>
              
              {/* Image section 2 - Process */}
              <div className="w-full my-10">
                <img alt="Project Process" className="w-full h-auto object-contain" src="/lovable-uploads/ee67012e-a3de-4434-8756-5470505cbb8a.png" />
              </div>
              
              {/* Image section 3 - Worldbuilding */}
              <div className="w-full my-10">
                <img alt="Worldbuilding - Environmental Setting" className="w-full h-auto object-contain" src="/lovable-uploads/0b2cbece-79ee-49e4-bc1c-f90424c9fe5e.png" />
              </div>
              
              {/* Image section 4 - Story Concept */}
              <div className="w-full my-10">
                <img alt="Story Concept and Plot" className="w-full h-auto object-contain" src="/lovable-uploads/62a5f9bc-5c64-46ae-8980-0dcbecb672d1.png" />
              </div>
              
              {/* Image section 5 - Character Design */}
              <div className="w-full my-10">
                <img alt="Character Design Details" className="w-full h-auto object-contain" src="/lovable-uploads/d2d3c84c-160f-4977-880f-9327f2f7ea65.png" />
              </div>
              
              {/* Image section 6 - Robot Models */}
              <div className="w-full my-10">
                <img alt="Robot Character Models" className="w-full h-auto object-contain" src="/lovable-uploads/b767949b-4ac8-4b07-9640-136fafd0f7bf.png" />
              </div>
              
              {/* First 3D model viewer */}
              <ModelViewer modelPath="https://sketchfab.com/models/ad41a20fb4cb43b5afefa525ddc60ea3/embed" title="Interactive 3D Robot Model" isSketchfab={true} />
             
              {/* Image section 8 - Robot Specs Detail */}
              <div className="w-full my-10">
                <img alt="Robot LS1-07 Specifications" className="w-full h-auto object-contain" src="/lovable-uploads/faabefcf-ae80-4f2a-900c-362fd79bada3.png" />
              </div>
              
              {/* Use the exact URL provided by the user for the second model */}
              <ModelViewer modelPath="https://sketchfab.com/models/65e7ff25d71f4512829dfc88c5537add/embed" title="Interactive LS1-07 Robot Model" isSketchfab={true} />
              
              {/* Image section 9 - 3D Storyboard Development */}
              <div className="w-full my-10">
                <img alt="3D Storyboard Development" className="w-full h-auto object-contain" src="/lovable-uploads/f7ea833d-1dc8-4fff-93ef-07b4f1ffb216.png" />
              </div>

              {/* YouTube Video Section - 80% width */}
              <div className="w-full my-10 flex justify-center">
                <div className="w-[80%]">
                  <AspectRatio ratio={16 / 9} className="bg-gray-900 overflow-hidden rounded-lg">
                    <YouTube videoId="aCJblmM9yzs" opts={videoOptions} className="w-full h-full" />
                  </AspectRatio>
                </div>
              </div>
              
              {/* NEW: Image section 10 - Level Design */}
              <div className="w-full my-10">
                <img alt="Level Design Layout" className="w-full h-auto object-contain" src="/lovable-uploads/6485fafb-6f4c-4df2-8a30-92f56459c08a.png" />
              </div>
              
              {/* NEW: Image section 11 - Artifacts Detail */}
              <div className="w-full my-10">
                <img alt="Artifact Details and Interactive Elements" className="w-full h-auto object-contain" src="/lovable-uploads/e04a0522-d5ea-4f6a-9740-e0ca5aa5950d.png" />
              </div>
              
              {/* NEW: Image section 12 - Player Journey */}
              <div className="w-full my-10">
                <img alt="Player Journey and Narrative Flow" className="w-full h-auto object-contain" src="/lovable-uploads/2dc3125e-e870-4936-86cd-a25499ead211.png" />
              </div>
              
              {/* NEW: Image section 13 - Final Concept */}
              <div className="w-full my-10">
                <img alt="Final Concept Images - Library Environment" className="w-full h-auto object-contain" src="/lovable-uploads/dc6fba69-3787-487e-888d-b6f2bf8a2c85.png" />
              </div>
              
              {/* NEW: Image section 14 - Main Hall & Tree */}
              <div className="w-full my-10">
                <img alt="Main Hall & Tree - Library Environment" className="w-full h-auto object-contain" src="/lovable-uploads/e5626698-6af1-4e23-aa9e-be7bfc49805d.png" />
              </div>
              
              {/* NEW: Image section 15 - Library Main Hall */}
              <div className="w-full my-10">
                <img alt="Library Main Hall with Robot Character" className="w-full h-auto object-contain" src="/lovable-uploads/802f356a-55d0-48dd-907f-cbcb66816631.png" />
              </div>
              
              {/* NEW: Image section 16 - Overhead View */}
              <div className="w-full my-10">
                <img alt="Overhead View of Library with Robot Character" className="w-full h-auto object-contain" src="/lovable-uploads/5e27fff7-daec-4102-a528-2f7a98573f9a.png" />
              </div>
              
              {/* NEW: Image section 17 - Post-Project Direction */}
              <div className="w-full my-10">
                <img alt="Post-Project Direction - Interactive Elements" className="w-full h-auto object-contain" src="/lovable-uploads/eea5ad47-07fb-49ed-8394-90d23f4dcef3.png" />
              </div>
            </>}
          
          {project.slug === "project-6" && <>
              {/* Move text description right after the main image */}
              <div className="w-full mb-8 flex justify-center">
                <div className="w-[80%] prose prose-invert max-w-none rounded-3xl py-[30px] px-0">
                  <h1 className="text-2xl md:text-4xl font-bold mb-4">{project.title}</h1>
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
              
              {/* Image section 1 - Project Overview */}
              <div className="w-full my-10">
                <img alt="Project Overview" className="w-full h-auto object-contain" src="/lovable-uploads/2b2603e2-436b-473e-8a0b-b492246d33d9.png" />
              </div>
              
              {/* Image section 2 - Approach */}
              <div className="w-full my-10">
                <img alt="Project Approach" className="w-full h-auto object-contain" src="/lovable-uploads/2ad0f781-5bed-4642-8316-6caca0952f3d.png" />
              </div>
              
              {/* Image section 3 - Site Selection */}
              <div className="w-full my-10">
                <img alt="Site Selection" className="w-full h-auto object-contain" src="/lovable-uploads/a172e8d9-00d6-4b41-ac4e-a54dbfa9386f.png" />
              </div>
              
              {/* Image section 4 - Bridge Analysis */}
              <div className="w-full my-10">
                <img alt="Bridge Analysis" className="w-full h-auto object-contain" src="/lovable-uploads/79518ec9-03d9-43fd-91a2-f0093064f858.png" />
              </div>
              
              {/* Image section 5 - Environmental Context */}
              <div className="w-full my-10">
                <img alt="Environmental Context" className="w-full h-auto object-contain" src="/lovable-uploads/878c5f93-e2c2-484e-8701-9673796885d9.png" />
              </div>
              
              {/* Image section 6 - Concept Design */}
              <div className="w-full my-10">
                <img alt="Concept Design" className="w-full h-auto object-contain" src="/lovable-uploads/959cc7ed-1026-44d6-b91f-dc2af37e47bb.png" />
              </div>
              
              {/* Image section 7 - Spatial Design */}
              <div className="w-full my-10">
                <img alt="Spatial Design" className="w-full h-auto object-contain" src="/lovable-uploads/c032f8c1-ea99-4106-9f55-0359f923d3fe.png" />
              </div>
              
              {/* Image section 8 - Bridge Structure */}
              <div className="w-full my-10">
                <img alt="Bridge Structure" className="w-full h-auto object-contain" src="/lovable-uploads/9204c7d5-567a-49d6-bed7-2119949f553d.png" />
              </div>
              
              {/* Image section 9 - Surface Exposure */}
              <div className="w-full my-10">
                <img alt="Surface Exposure According to Rainfall" className="w-full h-auto object-contain" src="/lovable-uploads/aa565580-dbc1-4e11-a31f-e11f85c9a5c2.png" />
              </div>
              
              {/* Image section 10 - Final Concept Image 1 */}
              <div className="w-full my-10">
                <img alt="Final Concept View 1" className="w-full h-auto object-contain" src="/lovable-uploads/1368610e-96c5-47b6-a7e2-66e23ebf5c00.png" />
              </div>
              
              {/* Image section 11 - Final Concept Image 2 */}
              <div className="w-full my-10">
                <img alt="Final Concept Rainy Condition" className="w-full h-auto object-contain" src="/lovable-uploads/c965f215-8575-4d1f-b055-1f1fec8d9cd6.png" />
              </div>
              
              {/* Image section 12 - Final Concept Image 3 */}
              <div className="w-full my-10">
                <img alt="Final Concept View 2" className="w-full h-auto object-contain" src="/lovable-uploads/773d9087-a073-430f-8510-1fdc452c034d.png" />
              </div>
            </>}
          
          {project.slug === "project-5" && <>
              {/* Image section 1 - Project info image section - Added below video */}
              <div className="w-full my-10">
                <img alt="Project Information" className="w-full h-auto object-contain" src="/lovable-uploads/4897af92-1df8-42ae-b92f-85594849ca2a.png" />
              </div>
              
              {/* Add third image section - Project 5 detailed mockup */}
              <div className="w-full my-10">
                <img alt="Project Details" className="w-full h-auto object-contain" src="/lovable-uploads/5469078d-c9df-443d-b9f0-4eab1a57cfbf.png" />
              </div>
              
              {/* Image section 4 - Site Selection */}
              <div className="w-full my-10">
                <img alt="Site Selection" className="w-full h-auto object-contain" src="/lovable-uploads/bcd77b77-5980-4b25-8c77-668dc97cf557.png" />
              </div>
              
              {/* Image section 5 - Context & Problem Analysis */}
              <div className="w-full my-10">
                <img alt="Context & Problem Analysis" className="w-full h-auto object-contain" src="/lovable-uploads/b4236ac5-2c03-4dfa-a337-b06457754639.png" />
              </div>
              
              {/* Image section 6 - New Museum Perspective */}
              <div className="w-full my-10">
                <img alt="New Museum Perspective" className="w-full h-auto object-contain" src="/lovable-uploads/10edf164-4c9f-4915-a779-5bb928aeed8b.png" />
              </div>
              
              {/* Image section 7 - Floor Plan / Spatial Design */}
              <div className="w-full my-10">
                <img alt="Floor Plan and Spatial Design" className="w-full h-auto object-contain" src="/lovable-uploads/543f4a31-e026-4287-93b1-9d97726ffd62.png" />
              </div>
              
              {/* Image section 8 - Material Board */}
              <div className="w-full my-10">
                <img alt="Material Board" className="w-full h-auto object-contain" src="/lovable-uploads/ef80e3a5-8484-4a70-8096-237b2bd5f7be.png" />
              </div>
              
              {/* Image section 9 - Exhibition Planning and Design */}
              <div className="w-full my-10">
                <img alt="Exhibition Planning and Design" className="w-full h-auto object-contain" src="/lovable-uploads/f5645ceb-bc9c-4f26-a391-bd5a5799b169.png" />
              </div>
              
              {/* Image section 10 & 11 - Final Concept Images */}
              <div className="w-full my-10">
                <img alt="Final Concept Images - Reception Desk" className="w-full h-auto object-contain mb-10" src="/lovable-uploads/bd60915c-2633-49d1-aff4-fdf44bef9f66.png" />
              </div>
              
              {/* Image section 11 - 1F Exhibition Hall - Marine Zone */}
              <div className="w-full my-10">
                <img alt="1F Exhibition Hall - Marine Zone" className="w-full h-auto object-contain mb-6" src="/lovable-uploads/c92c8656-cfbf-484d-a548-dcdc5975ff0d.png" />
                <div className="mt-4 text-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
              
              {/* Image section 12 - 2F-3F Exhibition Halls - Terrestrial Zone */}
              <div className="w-full my-10">
                <img alt="2F-3F Exhibition Halls - Terrestrial Zone" className="w-full h-auto object-contain" src="/lovable-uploads/8ce3a4d6-f250-4f97-9fe8-86a67a09329c.png" />
              </div>
              
              {/* Image section 13 - Specimens in Wall Cabinets */}
              <div className="w-full my-10">
                <img alt="Specimens in Wall Cabinets" className="w-full h-auto object-contain mb-6" src="/lovable-uploads/da6dd76b-4ca9-48ee-99cc-a74ca3ef0efe.png" />
                <div className="mt-4 text-white"></div>
              </div>
              
              {/* Image section 14 - 2F Rest Area */}
              <div className="w-full my-10">
                <img alt="2F Rest Area" className="w-full h-auto object-contain mb-6" src="/lovable-uploads/d054f8ad-225d-4b31-b3c9-29d1e14a99cc.png" />
                <div className="mt-4 text-white"></div>
              </div>
              
              {/* Image section 15 - Gift Shop */}
              <div className="w-full my-10">
                <img alt="Gift Shop of the Seoul Natural History Museum" className="w-full h-auto object-contain mb-6" src="/lovable-uploads/7952248b-ea8e-49b6-94c5-09efb48a1b30.png" />
                <div className="mt-4 text-white"></div>
              </div>
              
              {/* Image section 16 - Product Design */}
              <div className="w-full my-10">
                <img alt="Product Design - Museum Souvenirs" className="w-full h-auto object-contain mb-6" src="/lovable-uploads/32ccef84-5518-4014-913e-2e08022c55da.png" />
                <div className="mt-4 text-white"></div>
              </div>
              
              {/* Image section 17 - Product Design Reflecting Brand Identity */}
              <div className="w-full my-10">
                <img alt="Product Design Reflecting Brand Identity" className="w-full h-auto object-contain mb-6" src="/lovable-uploads/8047ad6f-738d-475e-8def-43aa9c1f9167.png" />
                <div className="mt-4 text-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
              
              {/* NEW: Image section 18 - Museum Products Showcase */}
              <div className="w-full my-10">
                <img alt="Museum Products Showcase - Character and Gift Items" className="w-full h-auto object-contain mb-6" src="/lovable-uploads/43a439cc-4d86-4b77-8fc7-f8baec95dec2.png" />
                <div className="mt-4 text-white"></div>
              </div>
            </>}
          
          {/* Updated all remaining projects to use the consistent text box design */}
          {project.slug !== "project-5" && project.slug !== "invisible-space-museum" && project.slug !== "project-3" && project.slug !== "learn" && project.slug !== "project-6" && <div className="w-full mb-8 flex justify-center">
              <div className="w-[80%] prose prose-invert max-w-none rounded-3xl py-[30px] px-0">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">{project.slug === "project-4" ? "Whispers from the bottom" : project.title}</h1>
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
            </div>}
          
          {/* YouTube Video Section - Show for project-4 right after the text description - 80% width */}
          {project.slug === "project-4" && <div className="w-full mb-10 flex justify-center">
              <div className="w-[80%]">
                <AspectRatio ratio={16 / 9} className="bg-gray-900 overflow-hidden rounded-lg">
                  <YouTube videoId="zqz3Owz0K3o" opts={videoOptions} className="w-full h-full" />
                </AspectRatio>
              </div>
            </div>}
          
          {/* New Image sections for Project 4 - Added below YouTube video */}
          {project.slug === "project-4" && <>
              {/* Image section 2 - Project Type */}
              <div className="w-full my-10">
                <img alt="Project Type Information" className="w-full h-auto object-contain" src="/lovable-uploads/a918e484-ffb3-4333-aad6-298cc5115817.png" />
              </div>
              
              {/* Image section 3 - Process */}
              <div className="w-full my-10">
                <img alt="Process" className="w-full h-auto object-contain" src="/lovable-uploads/52f04aaf-cf6e-4d61-8843-4267bae3cd53.png" />
              </div>
              
              {/* Image section 4 - Idea Development */}
              <div className="w-full my-10">
                <img alt="Idea Development" className="w-full h-auto object-contain" src="/lovable-uploads/8be7c53f-ac5e-4eed-b1e6-e86be32c61b3.png" />
              </div>
              
              {/* Image section 5 - Core Concept */}
              <div className="w-full my-10">
                <img alt="Core Concept" className="w-full h-auto object-contain" src="/lovable-uploads/08abb890-949a-453c-8bb9-aec8041c644b.png" />
              </div>
              
              {/* Image section 6 - Product Design */}
              <div className="w-full my-10">
                <img alt="Product Design" className="w-full h-auto object-contain" src="/lovable-uploads/2cc0c152-340f-4498-b61e-7b4c763c6cab.png" />
              </div>
              
              {/* Image section 7 - Exhibition Elements */}
              <div className="w-full my-10">
                <img alt="Exhibition Elements" className="w-full h-auto object-contain" src="/lovable-uploads/34d0c9da-7b32-4f52-ab04-30e131e9e593.png" />
              </div>
              
              {/* Image section 8 - Exhibition Design */}
              <div className="w-full my-10">
                <img alt="Exhibition Design" className="w-full h-auto object-contain" src="/lovable-uploads/41427da5-7488-46e2-8e9f-fc76c5262231.png" />
              </div>
              
              {/* Image section 9 - Visitor Experience */}
              <div className="w-full my-10">
                <img alt="Visitor Experience" className="w-full h-auto object-contain" src="/lovable-uploads/69dfc52c-6ef6-4269-ad4b-6a328fbdaf8f.png" />
              </div>
              
              {/* Image section 10 - AR Application Development */}
              <div className="w-full my-10">
                <img alt="AR Application Development" className="w-full h-auto object-contain" src="/lovable-uploads/49981d61-d12b-4075-8adb-0d7a3cef07d3.png" />
              </div>
              
              {/* NEW: Image section 11 - AR Application Interface */}
              <div className="w-full my-10">
                <img alt="AR Application Interface and QR Code Demo" className="w-full h-auto object-contain" src="/lovable-uploads/ebbb9da1-9475-4283-8749-c5bc0b05e75f.png" />
              </div>
              
              {/* Second YouTube video player - 80% width */}
              <div className="w-full my-10 flex justify-center">
                <div className="w-[80%]">
                  <AspectRatio ratio={16 / 9} className="bg-gray-900 overflow-hidden rounded-lg">
                    <YouTube videoId="M0v75vAVitA" opts={videoOptions} className="w-full h-full" />
                  </AspectRatio>
                </div>
              </div>
              
              {/* Image section 12 - Exhibition & Spatial Design */}
              <div className="w-full my-10">
                <img alt="Exhibition & Spatial Design" className="w-full h-auto object-contain" src="/lovable-uploads/659d541c-b696-4743-9fd5-3d08901b9e62.png" />
              </div>
              
              {/* Image section 13 - Exhibition with Water Ceiling */}
              <div className="w-full my-10">
                <img alt="Exhibition with Water Ceiling" className="w-full h-auto object-contain" src="/lovable-uploads/ca5fbebb-09f1-4dbc-9a98-a698a1ccb18a.png" />
              </div>
              
              {/* Image section 14 - Night Exhibition View */}
              <div className="w-full my-10">
                <img alt="Night Exhibition View" className="w-full h-auto object-contain" src="/lovable-uploads/9094c1d8-95be-4d73-a8f3-c3bc882b729c.png" />
              </div>
              
              {/* Image section 15 - Rock Character */}
              <div className="w-full my-10">
                <img alt="Rock Character Design" className="w-full h-auto object-contain" src="/lovable-uploads/b5a559ed-b9a5-45a4-8c87-16a5d3072ec7.png" />
              </div>
            </>}
          
          {/* Back to Work button at the bottom */}
          <div className="mt-16 mb-8 flex justify-center">
            <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              <Link to="/work" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Work
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* "Top" floating button */}
      {showScrollToTop && <Button onClick={scrollToTop} className="fixed bottom-8 right-8 rounded-full w-12 h-12 bg-white/30 backdrop-blur-sm hover:bg-white/60 text-white flex items-center justify-center shadow-lg transition-all z-50" aria-label="Scroll to top">
          <ArrowUp className="h-5 w-5" />
        </Button>}
    </div>;
};
export default ProjectDetail;