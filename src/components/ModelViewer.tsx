
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ModelProps {
  modelPath: string;
}

function Model({ modelPath }: ModelProps) {
  try {
    const { scene } = useGLTF(modelPath);
    console.log('Model loaded successfully:', modelPath);

    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.color.set('#cccccc');
        child.material.metalness = 0.1;
        child.material.roughness = 0.6;
      }
    });

    return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
  } catch (error) {
    console.error('Error loading model:', error);
    return <FallbackModel />;
  }
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

  console.log('ModelViewer rendering with path:', modelPath);

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
    const embedUrl = modelPath.includes('/embed')
      ? modelPath
      : `https://sketchfab.com/models/${modelId}/embed`;

    return (
      <div className="w-full my-10">
        {title && <h3 className="text-white text-xl mb-4">{title}</h3>}
        <div className="bg-black rounded-lg overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <iframe
              title={title || '3D Model Viewer'}
              className="w-full h-full border-0"
              src={embedUrl}
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              loading="lazy"
            />
          </AspectRatio>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          클릭하고 드래그하여 회전하세요. 스크롤로 확대/축소할 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full my-10">
      {title && <h3 className="text-white text-xl mb-4">{title}</h3>}
      <div className="bg-black rounded-lg overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 10, 5]} intensity={2.5} />
            <pointLight position={[-10, -10, -5]} intensity={1.5} />

            <Suspense fallback={<LoadingModel />}>
              {modelError ? (
                <FallbackModel />
              ) : (
                <Model modelPath={modelPath} />
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
      <p className="text-gray-400 text-sm mt-2">
        클릭하고 드래그하여 회전하세요. 스크롤로 확대/축소할 수 있습니다.
      </p>
      {modelError && (
        <p className="text-red-400 text-sm mt-2">
          모델을 로드할 수 없습니다. 대체 모델을 표시합니다.
        </p>
      )}
    </div>
  );
};

// 미리 로드 (성능 향상)
useGLTF.preload('/lovable-uploads/Rx056.glb');

export default ModelViewer;
