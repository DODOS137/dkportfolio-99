
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

  const getSketchfabEmbedUrl = (url: string) => {
    // Extract model ID from various Sketchfab URL formats
    let modelId = '';
    
    // Handle direct model ID
    if (/^[a-f0-9]{32}$/.test(url)) {
      modelId = url;
    }
    // Handle full URL formats
    else if (url.includes('sketchfab.com')) {
      const match = url.match(/\/([a-f0-9]{32})/);
      if (match) {
        modelId = match[1];
      }
    }
    
    console.log("Extracted model ID:", modelId);
    
    if (modelId) {
      return `https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_theme=dark`;
    }
    
    return url;
  };
  
  if (isSketchfab) {
    const embedUrl = getSketchfabEmbedUrl(modelPath);
    console.log("Using embed URL:", embedUrl);
    
    return (
      <div className="w-full my-10">
        {title && <h3 className="text-white text-xl mb-4">{title}</h3>}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
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
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
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
