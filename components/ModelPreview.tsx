import React, { useState } from 'react';
import Card from './Card';

// Add TypeScript definitions for the <model-viewer> custom element
// Using module augmentation for better scoping and to avoid global namespace pollution
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'shadow-intensity'?: string;
        'environment-image'?: string;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}

interface ModelPreviewProps {
  gltfUrl?: string;
  projectName: string;
}

const ModelPreview: React.FC<ModelPreviewProps> = ({ gltfUrl, projectName }) => {
  const [cameraControls, setCameraControls] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [environment, setEnvironment] = useState(true);
  const [showAnnotation, setShowAnnotation] = useState(true);

  return (
    <Card title="3. معاينة النموذج التفاعلية">
      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
        {gltfUrl ? (
          <model-viewer
            src={gltfUrl}
            alt={`معاينة لـ ${projectName}`}
            camera-controls={cameraControls}
            auto-rotate={autoRotate}
            environment-image={environment ? 'neutral' : 'none'}
            shadow-intensity={environment ? "1" : "0"}
            style={{ width: '100%', height: '100%' }}
          >
            {showAnnotation && (
                 <button 
                    slot="hotspot-1" 
                    data-position="0 0.5m 0" 
                    data-normal="0 1 0" 
                    className="bg-white/90 dark:bg-gray-800/90 rounded-full w-5 h-5 flex items-center justify-center text-blue-600 text-sm font-bold border border-blue-300"
                 >
                    <div className="p-2 bg-white dark:bg-gray-800 text-black dark:text-white text-xs rounded-md shadow-lg hidden">
                        هذه هي النقطة المحورية للنموذج. يمكنك إضافة ملاحظات هنا.
                    </div>
                 </button>
            )}
          </model-viewer>
        ) : (
          <p className="text-gray-500">لا توجد معاينة متاحة</p>
        )}
      </div>

       {/* Control Panel */}
      <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={cameraControls} onChange={() => setCameraControls(v => !v)} className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500/50"/>
          <span className="text-gray-700 dark:text-gray-300">أدوات التحكم</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={autoRotate} onChange={() => setAutoRotate(v => !v)} className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500/50"/>
          <span className="text-gray-700 dark:text-gray-300">دوران تلقائي</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={environment} onChange={() => setEnvironment(v => !v)} className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500/50"/>
          <span className="text-gray-700 dark:text-gray-300">إضاءة البيئة</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={showAnnotation} onChange={() => setShowAnnotation(v => !v)} className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500/50"/>
          <span className="text-gray-700 dark:text-gray-300">إظهار الملاحظات</span>
        </label>
      </div>

      <p className="text-xs text-center text-gray-500 mt-2">اسحب للتكبير والتدوير. هذه معاينة بتنسيق GLB/glTF.</p>
    </Card>
  );
};

export default ModelPreview;