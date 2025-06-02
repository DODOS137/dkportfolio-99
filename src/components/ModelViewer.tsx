
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ModelProps {
  modelPath: string;
}

function Model({ modelPath }: ModelProps) {
  const [error, setError] = useState<Error | null>(null);

  const ModelContent = () => {
    try {
      const { scene } = useGLTF(modelPath);
      
      useEffect(() => {
        console.log("Model loaded successfully:", modelPath);
      }, []);
      
      return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
    } catch (err) {
      console.error("Error in ModelContent:", err);
      setError(err instanceof Error ? err : new Error('Unknown error loading model'));
      return null;
    }
  };

  const FallbackCube = () => {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    );
  };

  return (
    <>
      {error ? <FallbackCube /> : <ModelContent />}
    </>
  );
}

interface ModelViewerProps {
  modelPath: string;
  title?: string;
  isSketchfab?: boolean;
}

const ModelViewer = ({ modelPath, title, isSketchfab = false }: ModelViewerProps) => {
  console.log("ModelViewer rendering with path:", modelPath);

  const getSketchfabModelId = (url: string) => {
    const modelsEmbedMatch = url.match(/models\/([^\/]+)\/embed/);
    if (modelsEmbedMatch) return modelsEmbedMatch[1];

    const modelsMatch = url.match(/models\/([^\/]+)/);
    if (modelsMatch) return modelsMatch[1];

    const tdModelsMatch = url.match(/3d-models\/.*-([a-f0-9]+)$/);
    if (tdModelsMatch) return tdModelsMatch[1];

    if (/^[a-f0-9]+$/.test(url)) return url;

    return url;
  };
  
  if (isSketchfab) {
    const modelId = getSketchfabModelId(modelPath);
    const embedUrl = modelPath.includes('/embed') ? modelPath : `https://sketchfab.com/models/${modelId}/embed`;
    
    return (
      <div className="w-full my-10">
        {title && <h3 className="text-white text-xl mb-4">{title}</h3>}
        <div className="bg-black rounded-lg overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <iframe 
              title={title || "3D Model Viewer"} 
              className="w-full h-full border-0" 
              src={embedUrl}
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              loading="lazy"
            />
          </AspectRatio>
        </div>
        <p className="text-gray-400 text-sm mt-2">Click and drag to rotate. Scroll to zoom.</p>
      </div>
    );
  }
  
  return (
    <div className="w-full my-10">
      {title && <h3 className="text-white text-xl mb-4">{title}</h3>}
      <div className="bg-black rounded-lg overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ alpha: false }}
            onCreated={({ gl, scene }) => {
              gl.setClearColor('#000000');
              scene.background = null;
            }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />
            <Suspense fallback={
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="blue" wireframe />
              </mesh>
            }>
              <Model modelPath={modelPath} />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Canvas>
        </AspectRatio>
      </div>
      <p className="text-gray-400 text-sm mt-2">Click and drag to rotate. Scroll to zoom.</p>
    </div>
  );
};

export default ModelViewer;
