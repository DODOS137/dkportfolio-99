
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ModelViewerPlaceholderProps {
  modelPath: string;
  title?: string;
  isSketchfab?: boolean;
}

const ModelViewerPlaceholder = ({
  modelPath,
  title,
  isSketchfab = false
}: ModelViewerPlaceholderProps) => {
  console.log("ModelViewerPlaceholder rendered:", { modelPath, title, isSketchfab });

  return (
    <div className="w-full my-10">
      {title && <h3 className="text-white text-xl mb-4">{title}</h3>}
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-600">
        <AspectRatio ratio={16 / 9}>
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎮</span>
              </div>
              <p className="text-sm">3D Model Viewer</p>
              <p className="text-xs mt-1">Temporarily disabled for debugging</p>
              {isSketchfab && <p className="text-xs text-blue-400">Sketchfab Model</p>}
            </div>
          </div>
        </AspectRatio>
      </div>
      <p className="text-gray-400 text-sm mt-2">Model path: {modelPath}</p>
    </div>
  );
};

export default ModelViewerPlaceholder;
