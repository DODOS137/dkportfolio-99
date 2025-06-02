
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ModelProps {
  modelPath: string;
}

function Model({ modelPath }: ModelProps) {
  const { scene } = useGLTF(modelPath);
  console.log("Model loaded successfully:", modelPath);
  
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
}

function FallbackModel() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff69b4" />
    </mesh>
  );
}

function LoadingModel() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#0066ff" wireframe />
    </mesh>
  );
}

interface ModelViewerProps {
  modelPath: string;
  title?: string;
  isSketchfab?: boolean;
}

const ModelViewer = ({ modelPath, title, isSketchfab = false }: ModelViewerProps) => {
  const [modelError, setModelError] = useState(false);
  
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
        <p className="text-gray-400 text-sm mt-2">클릭하고 드래그하여 회전하세요. 스크롤로 확대/축소할 수 있습니다.</p>
      </div>
    );
  }
  
  return (
    <div className="w-full my-10">
      {title && <h3 className="text-white text-xl mb-4">{title}</h3>}
      <div className="bg-black rounded-lg overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            
            <Suspense fallback={<LoadingModel />}>
              {modelError ? (
                <FallbackModel />
              ) : (
                <Model 
                  modelPath={modelPath} 
                />
              )}
              <Environment preset="city" />
            </Suspense>
            
            <OrbitControls 
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              minDistance={2}
              maxDistance={10}
            />
          </Canvas>
        </AspectRatio>
      </div>
        <p className="text-red-400 text-sm mt-2">Try it later :( </p>
      )}
    </div>
  );
};

// Preload the model for better performance
useGLTF.preload('/lovable-uploads/Rx056.glb');

export default ModelViewer;
