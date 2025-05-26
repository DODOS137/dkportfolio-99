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
  imageUrl: "/lovable-uploads/6a322fa7-6135-493f-849b-ca1ad98c7b86.png"
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
              <img src="/lovable-uploads/8f1ac9c4-a3f8-4eed-93d3-859b298cea4d.png" alt={project.title} className="w-full h-auto object-contain" />
            </div> : project.slug === "project-3" ? <>
          <div className="w-full mb-8 relative">
            <img src="/lovable-uploads/593420bb-8761-48fc-b4fc-4c74bd31769c.png" alt={project.title} className="w-full h-auto object-contain" />
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
            <img src="/lovable-uploads/1fb09718-c420-4de4-87fc-14efe41aa711.png" alt="Project Information" className="w-full h-auto object-contain" />
          </div>

          {/* IMAGE SECTION 3: Project Detail 1 */}
          <div className="w-full my-10">
            <img alt="Project Detail 1" className="w-full h-auto object-contain" src="/lovable-uploads/40711394-3ec4-4a63-b98d-3a59882383cc.png" />
          </div>

          {/* IMAGE SECTION 4: Project Detail 2 */}
          <div className="w-full my-10">
            <img alt="Project Detail 2" className="w-full h-auto object-contain" src="/lovable-uploads/b4be558a-6e57-41d5-b7ff-4df1cae97923.png" />
          </div>

          {/* IMAGE SECTION 5: Project Detail 3 */}
          <div className="w-full my-10">
            <img alt="Project Detail 3" className="w-full h-auto object-contain" src="/lovable-uploads/b5c01922-cad3-4341-af67-b84a24191175.png" />
          </div>

          {/* IMAGE SECTION 6: Project Detail 4 */}
          <div className="w-full my-10">
            <img alt="Project Detail 4" className="w-full h-auto object-contain" src="/lovable-uploads/2acad0fc-8ea3-4cce-9805-708bcb3dde3b.png" />
          </div>

          {/* IMAGE SECTION 7: Project Detail 5 */}
          <div className="w-full my-10">
            <img alt="Project Detail 5" className="w-full h-auto object-contain" src="/lovable-uploads/60f4e28b-ec3b-4789-a8f2-2de9c8c3afa7.png" />
          </div>

          {/* IMAGE SECTION 8: Project Detail 6 */}
          <div className="w-full my-10">
            <img alt="Project Detail 6" className="w-full h-auto object-contain" src="/lovable-uploads/754153ec-8716-40c2-a499-40e5afb19803.png" />
          </div>

          {/* IMAGE SECTION 9: Project Detail 7 */}
          <div className="w-full my-10">
            <img alt="Project Detail 7" className="w-full h-auto object-contain" src="/lovable-uploads/3e247063-e599-4542-b6f4-48027625ef69.png" />
          </div>

          {/* IMAGE SECTION 10: Project Detail 8 */}
          <div className="w-full my-10">
            <img alt="Project Detail 8" className="w-full h-auto object-contain" src="/lovable-uploads/aadab6a8-16af-4f84-86bc-f2e9a8bef4fa.png" />
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
                <img alt="Process" className="w-full h-auto object-contain" src="/lovable-uploads/64e7f6d7-e42a-4b44-8578-e9ee380d189c.png" />
              </div>
              
              {/* Image section 4 - Worldbuilding */}
              <div className="w-full my-10">
                <img alt="Worldbuilding - Environmental Setting" className="w-full h-auto object-contain" src="/lovable-uploads/f48414eb-0843-41ca-a7ac-24b47a777836.png" />
              </div>
              
              {/* Image section 5 - Planet A233 */}
              <div className="w-full my-10">
                <img alt="Planet A233 Concept" className="w-full h-auto object-contain" src="/lovable-uploads/05fad3eb-0a1c-422a-9051-d5c0a07429d2.png" />
              </div>
              
              {/* Image section 6 - Story Concept */}
              <div className="w-full my-10">
                <img alt="Story Concept & Emotional Logic" className="w-full h-auto object-contain" src="/lovable-uploads/ac90b8d0-9933-4710-a8c2-c64c26d5d156.png" />
              </div>
              
              {/* Image section 7 - Video Development */}
              <div className="w-full my-10">
                <img alt="Video Development Concepts" className="w-full h-auto object-contain" src="/lovable-uploads/910bd54b-f2a9-4c14-a7eb-1e2fa388c89b.png" />
              </div>
              
              {/* Image section 8 - Video Series Description */}
              <div className="w-full my-10">
                <img alt="Video Series Description" className="w-full h-auto object-contain" src="/lovable-uploads/545ba2c3-6a0b-4830-a809-d49443554558.png" />
              </div>
              
              {/* Image section 9 - Level Design */}
              <div className="w-full my-10">
                <img alt="Level Design Layout" className="w-full h-auto object-contain" src="/lovable-uploads/e7b78a92-6b91-4114-92c1-c07f74422417.png" />
              </div>
              
              {/* Image section 10 - User Journey */}
              <div className="w-full my-10">
                <img alt="User Journey Flow" className="w-full h-auto object-contain" src="/lovable-uploads/6409b477-6bda-473d-aa60-8768f29cb1cb.png" />
              </div>
              
              {/* Image section 11 - Spatial Design */}
              <div className="w-full my-10">
                <img alt="Spatial Design Concepts" className="w-full h-auto object-contain" src="/lovable-uploads/fdbf9b1f-d044-4c35-b65e-e702cd3cb8d3.png" />
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
                <img alt="Post-Project Direction - Interactive Elements" className="w-full h-auto object-contain" src="/lovable-uploads/a96a1fbb-7e20-4e12-83dd-8b2908b357fe.png" />
              </div>
              
              {/* NEW: Image section 14 - Interactive Evolution Concept */}
              <div className="w-full my-10">
                <img alt="Interactive Evolution Concept Visualization" className="w-full h-auto object-contain" src="/lovable-uploads/f6086651-deb6-4878-bcb1-bfa446e03f6b.png" />
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
                <img alt="Project Type and Info" className="w-full h-auto object-contain" src="/lovable-uploads/7ef87db2-c0b5-4b14-9c44-a02673bbfa89.png" />
              </div>
              
              {/* Image section 2 - Process */}
              <div className="w-full my-10">
                <img alt="Project Process" className="w-full h-auto object-contain" src="/lovable-uploads/9377c794-5dfd-4cbc-95c1-924950254356.png" />
              </div>
              
              {/* Image section 3 - Worldbuilding */}
              <div className="w-full my-10">
                <img alt="Worldbuilding - Environmental Setting" className="w-full h-auto object-contain" src="/lovable-uploads/db878cb6-21bb-45ed-bb18-f32fc6f63ec0.png" />
              </div>
              
              {/* Image section 4 - Story Concept */}
              <div className="w-full my-10">
                <img alt="Story Concept and Plot" className="w-full h-auto object-contain" src="/lovable-uploads/33404ace-d96d-4d85-ad0e-9528701598b0.png" />
              </div>
              
              {/* Image section 5 - Character Design */}
              <div className="w-full my-10">
                <img alt="Character Design Details" className="w-full h-auto object-contain" src="/lovable-uploads/21467fb9-09f2-4077-a2c1-0d8a7c478c55.png" />
              </div>
              
              {/* Image section 6 - Robot Models */}
              <div className="w-full my-10">
                <img alt="Robot Character Models" className="w-full h-auto object-contain" src="/lovable-uploads/c408582f-77b8-472b-a63a-0044aae0b097.png" />
              </div>
              
              {/* First 3D model viewer */}
              <ModelViewer modelPath="https://sketchfab.com/models/ad41a20fb4cb43b5afefa525ddc60ea3/embed" title="Interactive 3D Robot Model" isSketchfab={true} />
             
              {/* Image section 8 - Robot Specs Detail */}
              <div className="w-full my-10">
                <img alt="Robot LS1-07 Specifications" className="w-full h-auto object-contain" src="/lovable-uploads/5b3058a3-7730-40e1-a279-239b5c762def.png" />
              </div>
              
              {/* Use the exact URL provided by the user for the second model */}
              <ModelViewer modelPath="https://sketchfab.com/models/65e7ff25d71f4512829dfc88c5537add/embed" title="Interactive LS1-07 Robot Model" isSketchfab={true} />
              
              {/* Image section 9 - 3D Storyboard Development */}
              <div className="w-full my-10">
                <img alt="3D Storyboard Development" className="w-full h-auto object-contain" src="/lovable-uploads/c3c01f35-32e6-4184-8b0f-4981a9e12657.png" />
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
                <img alt="Level Design Layout" className="w-full h-auto object-contain" src="/lovable-uploads/05b3cbcd-f9ff-4e49-a6c9-332c83271abc.png" />
              </div>
              
              {/* NEW: Image section 11 - Artifacts Detail */}
              <div className="w-full my-10">
                <img alt="Artifact Details and Interactive Elements" className="w-full h-auto object-contain" src="/lovable-uploads/e7e6311d-ad0e-492f-bc55-6f702900d494.png" />
              </div>
              
              {/* NEW: Image section 12 - Player Journey */}
              <div className="w-full my-10">
                <img alt="Player Journey and Narrative Flow" className="w-full h-auto object-contain" src="/lovable-uploads/139ca29f-9912-4258-8381-65443de63395.png" />
              </div>
              
              {/* NEW: Image section 13 - Final Concept */}
              <div className="w-full my-10">
                <img alt="Final Concept Images - Library Environment" className="w-full h-auto object-contain" src="/lovable-uploads/19f88eb1-55fc-447c-9910-a8acad4cdcfe.png" />
              </div>
              
              {/* NEW: Image section 14 - Main Hall & Tree */}
              <div className="w-full my-10">
                <img alt="Main Hall & Tree - Library Environment" className="w-full h-auto object-contain" src="/lovable-uploads/ccda885d-f430-43ba-8966-4adb619d47a2.png" />
              </div>
              
              {/* NEW: Image section 15 - Library Main Hall */}
              <div className="w-full my-10">
                <img alt="Library Main Hall with Robot Character" className="w-full h-auto object-contain" src="/lovable-uploads/923720d8-1f64-4936-9a07-71bedb9d4a0e.png" />
              </div>
              
              {/* NEW: Image section 16 - Overhead View */}
              <div className="w-full my-10">
                <img alt="Overhead View of Library with Robot Character" className="w-full h-auto object-contain" src="/lovable-uploads/38be711f-81bc-4f86-8fd3-eea0c5226c1a.png" />
              </div>
              
              {/* NEW: Image section 17 - Post-Project Direction */}
              <div className="w-full my-10">
                <img alt="Post-Project Direction - Interactive Elements" className="w-full h-auto object-contain" src="/lovable-uploads/2cc04897-cb27-46d1-92b6-76c95a2afbcd.png" />
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
                <img alt="Project Information" className="w-full h-auto object-contain" src="/lovable-uploads/f68f467d-89bb-4679-94d1-e354aaa0d733.png" />
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
                <img alt="Project Type Information" className="w-full h-auto object-contain" src="/lovable-uploads/9a0882e4-d74a-4b2d-869e-c62d9aabe300.png" />
              </div>
              
              {/* Image section 3 - Process */}
              <div className="w-full my-10">
                <img alt="Process" className="w-full h-auto object-contain" src="/lovable-uploads/6b64d68c-5c7f-44ff-8622-f0a536eddaa6.png" />
              </div>
              
              {/* Image section 4 - Idea Development */}
              <div className="w-full my-10">
                <img alt="Idea Development" className="w-full h-auto object-contain" src="/lovable-uploads/9a130e34-16ea-4c25-869f-3a31c96c1c5f.png" />
              </div>
              
              {/* Image section 5 - Core Concept */}
              <div className="w-full my-10">
                <img alt="Core Concept" className="w-full h-auto object-contain" src="/lovable-uploads/18bece01-dc05-40e1-8bba-f7de8b355ea2.png" />
              </div>
              
              {/* Image section 6 - Product Design */}
              <div className="w-full my-10">
                <img alt="Product Design" className="w-full h-auto object-contain" src="/lovable-uploads/2b8b452b-5418-4a76-9c5f-fcc4cad9ac4a.png" />
              </div>
              
              {/* Image section 7 - Exhibition Elements */}
              <div className="w-full my-10">
                <img alt="Exhibition Elements" className="w-full h-auto object-contain" src="/lovable-uploads/5d9a94d9-6f1a-4eb3-ae3b-56fd0282a40f.png" />
              </div>
              
              {/* Image section 8 - Exhibition Design */}
              <div className="w-full my-10">
                <img alt="Exhibition Design" className="w-full h-auto object-contain" src="/lovable-uploads/3af7f241-2740-4378-b6cd-dd07d9f895d2.png" />
              </div>
              
              {/* Image section 9 - Visitor Experience */}
              <div className="w-full my-10">
                <img alt="Visitor Experience" className="w-full h-auto object-contain" src="/lovable-uploads/984cf579-cf4a-498b-8582-3b1fdd8f7770.png" />
              </div>
              
              {/* Image section 10 - AR Application Development */}
              <div className="w-full my-10">
                <img alt="AR Application Development" className="w-full h-auto object-contain" src="/lovable-uploads/588ea4f9-132e-4501-a34a-0d7fdad203ac.png" />
              </div>
              
              {/* Second YouTube video player - 80% width */}
              <div className="w-full my-10 flex justify-center">
                <div className="w-[80%]">
                  <AspectRatio ratio={16 / 9} className="bg-gray-900 overflow-hidden rounded-lg">
                    <YouTube videoId="M0v75vAVitA" opts={videoOptions} className="w-full h-full" />
                  </AspectRatio>
                </div>
              </div>
              
              {/* NEW: Image section 11 - Exhibition & Spatial Design */}
              <div className="w-full my-10">
                <img alt="Exhibition & Spatial Design" className="w-full h-auto object-contain" src="/lovable-uploads/681ca87f-74f0-4b9d-af44-6cbdce8a303a.png" />
              </div>
              
              {/* NEW: Image section 12 - Exhibition with Water Ceiling */}
              <div className="w-full my-10">
                <img alt="Exhibition with Water Ceiling" className="w-full h-auto object-contain" src="/lovable-uploads/55685a01-35c0-482d-8ee8-9306f497bf3a.png" />
              </div>
              
              {/* NEW: Image section 13 - Night Exhibition View */}
              <div className="w-full my-10">
                <img alt="Night Exhibition View" className="w-full h-auto object-contain" src="/lovable-uploads/1ae50321-4db0-40a9-b5f4-2d05876f82a9.png" />
              </div>
              
              {/* NEW: Image section 14 - Rock Character */}
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