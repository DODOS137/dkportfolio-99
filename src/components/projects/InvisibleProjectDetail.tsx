import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import YouTube from "react-youtube";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageWithLoading from "@/components/ImageWithLoading";
import { invisibleProjectData } from "@/data/invisibleProject";
import ProjectLayout from "./shared/ProjectLayout";
import ProjectNavigation from "./shared/ProjectNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import BackToTopButton from "@/components/BackToTopButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { CarouselApi } from "embla-carousel-react";

const InvisibleProjectDetail = () => {
  const project = invisibleProjectData;
  const heroRef = useScrollAnimation<HTMLDivElement>();

  const videoOpts = {
    height: "100%",
    width: "100%",
    playerVars: { autoplay: 0, controls: 1, modestbranding: 1, rel: 0 },
  };

  const firstSliderImages = [
    "/lovable-uploads/b3851ebc-35db-4397-8f5e-e5286275ac0d.png",
    "/lovable-uploads/8f303355-f7f8-417f-a4e4-fa9109e312db.png",
    "/lovable-uploads/89363d60-1e48-438d-aef9-e1f5b6c4d7df.png",
    "/lovable-uploads/1c29e559-8fb5-43b8-85cb-bbe881e4b5b5.png",
    "/lovable-uploads/663f86d2-c014-4d12-bc43-879d35aa70b2.png",
  ];
  const secondSliderImages = [
    "/lovable-uploads/1226e7bd-a3b6-4ca8-a21a-f9fe6b747eba.png",
    "/lovable-uploads/b98a6c0c-ecf1-4cd1-8425-1d5a82e848ad.png",
    "/lovable-uploads/ea8daafc-845b-416a-87fd-526d63257efd.png",
    "/lovable-uploads/7dbae072-a951-477f-8d90-a4cd262da27a.png",
    "/lovable-uploads/67404269-7e30-45dd-b380-5c5c9d441ea5.png",
  ];

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [secondApi, setSecondApi] = useState<CarouselApi | null>(null);
  const [secondCurrent, setSecondCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!secondApi) return;
    setSecondCurrent(secondApi.selectedScrollSnap());
    secondApi.on("select", () => setSecondCurrent(secondApi.selectedScrollSnap()));
  }, [secondApi]);

  return (
    <ScrollArea className="h-screen w-screen overflow-auto">
      <ProjectLayout>
        <ProjectNavigation backText="Back to work" />

        {/* Hero */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <div
            ref={heroRef.ref}
            className={`text-center max-w-4xl px-6 transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              heroRef.isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider">{project.heroTitle}</h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">Scientific Virtual Reality Content</p>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 tracking-widest">
              <span>{project.heroYear}</span>
              <span>•</span>
              <span>{project.heroClient}</span>
              <span>•</span>
              <span>{project.heroRole}</span>
            </div>
          </div>
        </section>

        {/* Main */}
        <section>
          {/* First Image */}
          <div className="max-w-[1540px] mx-auto z-10">
            <AspectRatio ratio={16 / 9} className="w-full h-auto">
              <ImageWithLoading
                src={project.images?.[0]}
                alt={`${project.title} - Image 1`}
                className="w-full h-full object-contain"
              />
            </AspectRatio>
          </div>

          {/* Shared Container */}
          <div className="max-w-[1540px] mx-auto px-4 md:px-[250px] z-10">
            {/* Description */}
            <div className="rounded-lg bg-transparent mt-20 md:mt-20">
              <h2 className="text-xl md:text-xl lg:text-xl mb-8 md:mb-8 text-white font-light">{project.title}</h2>
              <p className="text-base md:text-base lg:text-base text-gray-300 leading-relaxed mb-6 md:mb-8 font-light">
                {project.mainDescription}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-sm">
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2">project type</h3>
                  <p className="text-white">{project.projectType}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2">Project category</h3>
                  <p className="text-white">VR Contents Design</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2">team</h3>
                  <p className="text-white">{project.teamType}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 uppercase tracking-wider mb-2">DURATION</h3>
                  <p className="text-white">{project.duration}</p>
                </div>
              </div>
            </div>

            {/* Video */}
            {project.videoId && (
              <div className="my-40 md:my-40">
                <AspectRatio ratio={16 / 9} className="rounded-lg border border-gray-500/50 overflow-hidden">
                  <YouTube videoId={project.videoId} opts={videoOpts} className="w-full h-full" />
                </AspectRatio>
              </div>
            )}

            {/* Line */}
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50" />

            {/* Summary */}
            <section aria-labelledby="sum-title" className="mt-8">
              <h2 id="sum-title" className="text-xl md:text-xl font-light text-gray-300 mb-8">
                Summary
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Challenge</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Conventional museum format</li>
                    <li>Abstract scientific concepts inaccessible</li>
                    <li>Weak emotional engagement</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Approach</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>VR-spatial storytelling</li>
                    <li>Four core themes: gravity · light · life · time</li>
                    <li>Symbolic + immersive spatial design</li>
                    <li>Intuitive interactions for accessibility</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Result</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>67% found VR more effective</li>
                    <li>Gravity & time most impactfu</li>
                    <li>Higher curiosity, mixed learning outcomes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Full text */}
            <details className="mt-8 mb-20 rounded-lg border border-white/10 bg-black">
              <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-400">Full text</summary>
              <div className="px-4 pb-4 pt-2 space-y-8">
                <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Approach</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                    The project focused on simplifying complex topics into accessible narratives and designing intuitive interaction models. Symbolism and abstraction were employed to visualise phenomena beyond everyday perception, while immersive environments provided an emotional framework to deepen connection and engagement. This design approach positioned science not only as knowledge to be learned, but as an experience to be felt.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Project Purpose</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                  The project sought to reimagine the communication of science in cultural institutions. Instead of presenting information as static content, the aim was to transform exhibitions into participatory experiences where knowledge emerges through interaction. By reframing scientific concepts as shared emotional and symbolic languages, the work highlights how immersive media can bridge gaps in public science education and broaden accessibility across different backgrounds
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Development Strategy</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                  Four universal scientific themes—gravity, light, life, and time—were selected as the foundation of the exhibition. Each theme was spatially embodied in a dedicated immersive environment, combining abstraction with sensory cues.
                  </p>
                </div>
                  <div>
                  <h3 className="text-sm font-light text-gray-300 mb-3">Final Outcome</h3>
                  <p className="text-sm leading-relaxed font-light text-gray-400">
                    A mixed-method study with 30 participants across varied age groups and educational backgrounds evaluated the project’s effectiveness. Findings showed that 67% considered the VR experience helpful in understanding abstract scientific concepts, and the same percentage preferred it over traditional exhibitions for its immersive qualities. Among the scientific themes, gravity (38%) and time (31%) were rated as most impactful. Additionally, 67% reported increased interest in science after the experience, and 47% expressed excitement about exploring unfamiliar virtual spaces. However, assessments of learning effectiveness were more divided: 30% found it effective, 35% neutral, and 35% ineffective. These results suggest strong potential for immersive design in science education, while also indicating the need for further refinement and adaptive learning strategies.
                  </p>
                </div>
              </div>
            </details>

            {/* Research */}
            <section id="research" aria-labelledby="research-title" className="mb-20">
              <h2 id="research-title" className="text-xl md:text-xl font-light text-gray-300 mb-6">Research</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">73%</p>
                  <p className="text-sm text-gray-400 mt-2">found displays lacked spatial clarity</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">76%</p>
                  <p className="text-sm text-gray-400 mt-2">preferred immersive VR-based learning</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl md:text-3xl font-light text-white">306</p>
                  <p className="text-sm text-gray-400 mt-2">participants surveyed</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-2xl md:text-xl font-light text-white">Validation</p>
                  <p className="text-sm text-gray-400 mt-2">Supports VR-first design direction</p>
                </div>
              </div>

              <details className="mt-8 rounded-lg border border-white/10 bg-black p-4">
                <summary className="cursor-pointer text-sm text-gray-400">Full findings</summary>
                <p className="mt-8 text-sm text-gray-400">
                 An online and offline survey involving 306 participants was conducted to examine the limitations of traditional science exhibitions and gauge interest in immersive educational technologies. Results indicated that 73% (223) of respondents believed conventional science displays lacked engaging spatial formats and narrative clarity. Furthermore, 76% (233) expressed a desire for immersive VR-based experiences to better understand abstract scientific concepts. These insights informed the design rationale and validated the project's direction.
                </p>
              </details>
            </section>

            {/* Process */}
            <section id="process" className="rounded-lg bg-black">
              <h2 className="text-xl md:text-xl font-light mb-8 md:mb-8 text-gray-300">Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-20">
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                  <h3 className="text-white font-light mb-3">01 Ideation</h3>
                  <p className="text-gray-400 text-sm">Brainstorming</p>
                  <p className="text-gray-400 text-sm">Concept sketches</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                  <h3 className="text-white font-light mb-3">02 Analysis</h3>
                  <p className="text-gray-400 text-sm">Context & precedents</p>
                  <p className="text-gray-400 text-sm">Narrative flow</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                  <h3 className="text-white font-light mb-3">03 Development</h3>
                  <p className="text-gray-400 text-sm">World/spatial/level design</p>
                  <p className="text-gray-400 text-sm">Video development</p>
                </div>
              </div>
            </section>

            {/* Tools & Roles */}
            <div className="mb-20 md:mb-20">
              <h2 className="text-xl md:text-xl font-light text-gray-300 mb-6 md:mb-8">Tools & Roles</h2>
              <div className="overflow-x-auto rounded-lg border border-white/10 bg-black">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-white/5 text-gray-300 uppercase text-sm tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Part</th>
                      <th className="px-4 py-3">Tools</th>
                      <th className="px-4 py-3">Outputs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="px-4 py-4 font-light">Modeling</td>
                      <td className="px-4 py-4">AutoCAD, 3ds Max</td>
                      <td className="px-4 py-4">3D Assets, Space</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Texturing</td>
                      <td className="px-4 py-4">Photoshop</td>
                      <td className="px-4 py-4">PBR materials</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Lighting & Render</td>
                      <td className="px-4 py-4">Unreal Engine, 3ds Max</td>
                      <td className="px-4 py-4">Spatial Real time renders</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Interaction / VR</td>
                      <td className="px-4 py-4">Unreal Engine</td>
                      <td className="px-4 py-4">VR Environment</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-light">Graphics</td>
                      <td className="px-4 py-4">Adobe Suite</td>
                      <td className="px-4 py-4">Art works</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Narrative/Spatial texts */}
            <div className="rounded-lg bg-transparent">
              <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-20 md:mt-40">
                <h2 className="text-xl md:text-xl font-light min-w-[200px] text-gray-300 whitespace-nowrap mb-4 md:mb-0">
                  Worldbuilding
                </h2>
                <p className="text-base md:text-base lg:text-base leading-relaxed text-gray-400 font-light">
                  Set on a fictional alien planet (A233) inhabited by an advanced civilisation. The player, as an interstellar
                  explorer, uncovered abandoned structures, artefacts, and messages. Despite a lack of shared language, both species
                  were assumed to understand the same laws of nature. The narrative explored how universal science transcended cultural
                  boundaries.
                </p>
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-20 md:mt-40">
                <h2 className="text-xl md:text-xl font-light text-gray-300 whitespace-nowrap min-w-[200px] mb-4 md:mb-0">
                  Narrative Arc
                </h2>
                <p className="text-base md:text-base lg:text-base leading-relaxed text-gray-400 font-light">
                  The experience followed a narrative arc centred around an unnamed interstellar explorer. Beginning with arrival on
                  Planet A233, the user journeyed through chambers tied to universal scientific principles, progressing from perception
                  to comprehension and recognition of science as a shared symbolic language.
                </p>
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-20 md:mt-40">
                <h2 className="text-xl md:text-xl font-light text-gray-300 whitespace-nowrap min-w-[200px] mb-4 md:mb-0">
                  Emotional Logic
                </h2>
                <p className="text-base md:text-base lg:text-base leading-relaxed text-gray-400 font-light">
                  Gravity instils awe and tension; Light encourages curiosity; Life evokes empathy; Time closes with reflective
                  calm—an emotional rhythm reinforcing the scientific themes.
                </p>
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-20 md:mt-40 mb-40">
                <h2 className="text-xl md:text-xl font-light text-gray-300 whitespace-nowrap min-w-[200px] mb-4 md:mb-0">
                  Spatial Design
                </h2>
                <p className="text-base md:text-base lg:text-base leading-relaxed text-gray-400 font-light">
                  Each chamber embodied its theme via interactive and environmental cues (distorted space/reflective surfaces/organic
                  growth/temporal transitions) to translate abstraction into felt experience.
                </p>
              </div>
            </div>

            {/* Evaluation Summary */}
            <h2 className="text-xl md:text-xl font-light text-gray-300 mt-16 md:mt-32">Final Outcome - Evaluation Summary</h2>
            <p className="text-base md:text-base lg:text-base leading-relaxed text-gray-400 font-light mt-6 md:mt-8">
              Mixed-method study (n=30): 67% said VR aided understanding; equal share preferred it over traditional exhibitions. Gravity
              (38%) and Time (31%) most impactful. 67% reported increased interest in science; learning effectiveness split—30%
              effective, 35% neutral, 35% ineffective—suggesting room for refinement.
            </p>

            {/* Lines + images/slider... (생략 없이 유지) */}
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50" />
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <img
                  alt="World overview"
                  className="w-full h-full object-contain"
                  src="/lovable-uploads/c300d72e-b010-4ff6-8648-016e4513b308.png"
                />
              </AspectRatio>
              <img
                alt="World secondary"
                className="w-full h-auto mt-20 md:mt-40"
                src="/lovable-uploads/e7d6a48f-e367-42e9-b5c1-67b383af035b.png"
              />
            </div>

            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50" />
            <div className="w-full">
              <img
                className="w-full h-auto"
                src="/lovable-uploads/c1d66b75-3492-498c-b403-7745f0656549.png"
                alt="Narrative DNA graphic"
              />
            </div>

            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50" />
            <div className="w-full">
              <img
                className="w-full h-auto"
                src="/lovable-uploads/8ef06019-dad8-43fc-b25b-4b7192935c0c.png"
                alt="Video development board"
              />
            </div>

            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50" />
            <div className="rounded-lg bg-transparent">
              <h2 className="text-xl md:text-xl font-light text-gray-300">Level Design</h2>
              <div className="w-full mb-6 md:mb-8">
                <img className="w-full h-auto" src="/lovable-uploads/90d8e758-d99e-406b-bcc3-23d3648c8a75.png" alt="Level design 1" />
                <img className="w-full h-auto" src="/lovable-uploads/de89b92f-0e81-40b4-9c85-3c26d7bce4dd.png" alt="Level design 2" />
              </div>
            </div>

            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50" />
            <div className="w-full mb-6 md:mb-8">
              <img className="w-full h-auto" src="/lovable-uploads/web1920-Space Museum_FLOOR1.png" alt="Floor plan" />
            </div>

            {/* Slider 1 */}
            <div className="w-full mb-20 md:mb-40">
              <Carousel className="w-full bg-black" setApi={setApi} opts={{ loop: true }}>
                <CarouselContent>
                  {firstSliderImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full">
                        <AspectRatio ratio={16 / 9} className="w-full">
                          <img src={image} alt={`Spatial slider ${index + 1}`} className="w-full h-full object-contain" />
                        </AspectRatio>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white hover:bg-white/10 w-8 h-8 md:w-12 md:h-12" />
                <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white hover:bg-white/10 w-8 h-8 md:w-12 md:h-12" />
              </Carousel>
              <div className="flex justify-center space-x-2 mt-4 md:mt-6">
                {firstSliderImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-6 h-0.5 cursor-pointer transition-all duration-300 ${
                      current === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
                    }`}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
            </div>

            {/* Full Playing Video */}
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50" />
            <h2 className="text-xl md:text-xl font-light text-gray-300 mb-6 md:mb-8">Full Playing Video</h2>
            <div className="mb-6 md:mb-8">
              <AspectRatio ratio={16 / 9} className="rounded-lg border border-gray-500/50 overflow-hidden">
                <YouTube videoId="KT0Cwy9s5n8" opts={videoOpts} className="w-full h-full" />
              </AspectRatio>
            </div>

            {/* Post-Project */}
            <div className="w-full h-px my-20 md:my-40 bg-gray-500/50" />
            <div className="rounded-lg bg-transparent">
              <h2 className="text-xl md:text-xl font-light text-gray-300">Post-Project Expansion</h2>
              <p className="text-base md:text-base lg:text-base leading-relaxed mb-20 md:mb-40 mt-6 md:mt-8 text-gray-400 font-light">
                To address limitations in interactivity, a simulation based on evolution was integrated into the experience. Users input
                variables that influenced how virtual organisms adapted within a bounded environment.
              </p>

              <h2 className="text-xl md:text-xl font-light mb-6 md:mb-8 text-gray-300">The Ocean (2025)</h2>
              <p className="text-base md:text-base lg:text-base leading-relaxed mb-6 md:mb-8 text-gray-400 font-light">
                Originally developed as a conceptual prototype in 2022, The Ocean explored autonomous evolution through interactive
                simulation...
              </p>
              <p className="text-base md:text-base lg:text-base leading-relaxed mb-6 md:mb-8 text-gray-400 font-light">
                The virtual creatures formed clusters akin to coral colonies, restructuring environments over time.
              </p>
              <p className="text-base md:text-base lg:text-base leading-relaxed mb-6 md:mb-8 text-gray-400 font-light">
                The exponential growth demonstrated how input-based ecosystems could reflect evolutionary processes.
              </p>

              <div className="w-full mb-6 md:mb-8">
                <img className="w-full h-auto" src="/lovable-uploads/b4351222-63be-41f6-8fe3-5328dd307929.png" alt="The Ocean 1" />
                <img
                  src="/lovable-uploads/e59b9231-29a1-4281-a51d-f6b88b3b2754.png"
                  className="w-full h-auto mb-20 md:mb-40"
                  alt="The Ocean 2"
                />
              </div>
            </div>

            {/* extra images */}
            <div className="w-full">
              <img className="w-full h-auto" src="/lovable-uploads/fa8b3919-07d8-4526-be0b-bc8fc17a65ad.png" alt="Ocean image 1" />
              <img className="w-full h-auto" src="/lovable-uploads/0e3392f5-3c64-49f8-8f2e-b596c7825eb9.png" alt="Ocean image 2" />
              <img
                src="/lovable-uploads/521c678d-b282-4234-b283-b5e10cc689b7.png"
                className="w-full h-auto mb-20 md:mb-40"
                alt="Ocean image 3"
              />
            </div>

            <div className="w-full">
              <img
                src="/lovable-uploads/4e61eb63-34b2-41a8-ba00-18c70125dd28.png"
                className="w-full h-auto mb-20 md:mb-40"
                alt="Ocean image 4"
              />
              <div className="rounded-lg bg-transparent">
                <p className="text-base md:text-base lg:text-base leading-relaxed text-gray-400 font-light mb-20 md:mb-40">
                  The virtual creatures (inspired by early organic matter) formed clusters akin to coral colonies...
                </p>
              </div>

              <div className="w-full">
                <img
                  src="/lovable-uploads/c98f26de-0fe3-414b-9b0e-704fe61c8d71.png"
                  className="w-full h-auto mb-20 md:mb-40"
                  alt="Ocean image 5"
                />
                <p className="text-base md:text-base lg:text-base leading-relaxed text-gray-400 font-light mb-20 md:mb-40">
                  The exponential growth demonstrated how input-based virtual ecosystems could reflect evolutionary processes...
                </p>
              </div>
            </div>

            {/* Slider 2 */}
            <div className="w-full mb-20 md:mb-40">
              <Carousel className="w-full bg-black" setApi={setSecondApi} opts={{ loop: true }}>
                <CarouselContent>
                  {secondSliderImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full">
                        <AspectRatio ratio={16 / 9} className="w-full">
                          <img src={image} alt={`Gallery slider ${index + 1}`} className="w-full h-full object-cover" />
                        </AspectRatio>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white hover:bg-white/10 w-8 h-8 md:w-12 md:h-12" />
                <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white hover:bg-white/10 w-8 h-8 md:w-12 md:h-12" />
              </Carousel>
              <div className="flex justify-center space-x-2 mt-4 md:mt-6">
                {secondSliderImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-6 h-0.5 cursor-pointer transition-all duration-300 ${
                      secondCurrent === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
                    }`}
                    onClick={() => secondApi?.scrollTo(index)}
                  />
                ))}
              </div>
            </div>

            {/* data images (optional) */}
            <div className="max-w-[1540px] mx-auto px-4 md:px-6 lg:px-[200px]">
              {(project.images || []).slice(1).map((image: string, index: number) => (
                <div key={index + 1} className="pb-20 md:pb-40">
                  <div className="w-full">
                    <AspectRatio ratio={16 / 9} className="w-full">
                      <ImageWithLoading
                        src={image}
                        alt={`${project.title} - Image ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="pb-40 md:pb-60 flex items-center justify-center">
          <Link
            to="/project/learn"
            className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md text-base md:text-lg font-medium"
          >
            <span>Next project</span>
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
          </Link>
        </div>

        {/* Back to top */}
        <BackToTopButton/>
      </ProjectLayout>
    </ScrollArea>
  );
};

export default InvisibleProjectDetail;
