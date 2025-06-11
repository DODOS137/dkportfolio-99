
import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ModelProps {
  modelPath: string;
}

function Model({ modelPath }: ModelProps) {
  const [error, setError] = useState<Error | null>(null);

  const ModelContent = useCallback(() => {
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
  }, [modelPath]);

  const FallbackCube = () => {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    );
  };

  return (
    <React.Fragment>
      {error ? <FallbackCube /> : <ModelContent />}
    </React.Fragment>
  );
}

interface ModelViewerProps {
  modelPath: string;
  title?: string;
  isSketchfab?: boolean;
}

const ModelViewer = ({ modelPath, title, isSketchfab = false }: ModelViewerProps) => {
  console.log("ModelViewer rendering with path:", modelPath);

  const getSketchfabEmbedUrl = useCallback((url: string) => {
    // Extract model ID from various Sketchfab URL formats
    let modelId = '';

    // Handle direct model ID (32 character hex string)
    if (/^[a-f0-9]{32}$/.test(url)) {
      modelId = url;
    }
    // Handle 3d-models URL format: extract ID after the last dash
    else if (url.includes('3d-models/')) {
      const match = url.match(/3d-models\/[^\/]*-([a-f0-9]{32})(?:\/|$)/);
      if (match) {
        modelId = match[1];
      }
    }
    // Handle other Sketchfab URL formats
    else if (url.includes('sketchfab.com/models/')) {
      const match = url.match(/models\/([a-f0-9]{32})/);
      if (match) {
        modelId = match[1];
      }
    }

    console.log("Extracted model ID:", modelId);
    
    if (modelId) {
      return `https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_theme=dark&ui_controls=0&ui_infos=0&ui_stop=0&ui_watermark=0&ui_hint=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0`;
    }
    
    return url;
  }, []);

  if (isSketchfab) {
    const embedUrl = getSketchfabEmbedUrl(modelPath);
    console.log("Using embed URL:", embedUrl);
    
    return (
      <div className="w-full my-10">
        {title && <h3 className="text-white text-xl mb-4">{title}</h3>}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <AspectRatio ratio={1 / 1}>
            <iframe 
              title={title || "3D Model Viewer"} 
              className="w-full h-full border-0" 
              src={embedUrl} 
              allowFullScreen 
              allow="autoplay; fullscreen; xr-spatial-tracking" 
              loading="lazy"
              onError={() => console.error("Sketchfab iframe failed to load")}
            />
          </AspectRatio>
        </div>
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
