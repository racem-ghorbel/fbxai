
import React from 'react';
import { AppSettings, GeneratedFiles } from '../types';
import Card from './Card';
import { DownloadIcon, TextureIcon } from './icons/Icons';

interface DownloadAreaProps {
  files: GeneratedFiles;
  settings: AppSettings;
}

const DownloadArea: React.FC<DownloadAreaProps> = ({ files, settings }) => {
  return (
    <Card title="4. تحميل الملفات">
      <div className="space-y-6">
        {/* Main download buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={files.fbxUrl}
            download={`${settings.projectName}.fbx`}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            <DownloadIcon />
            <span>تحميل FBX</span>
          </a>
          {files.gltfUrl && (
            <a
              href={files.gltfUrl}
              download={`${settings.projectName}.glb`}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors"
            >
              <DownloadIcon />
              <span>تحميل GLB</span>
            </a>
          )}
        </div>

        {/* Texture files list */}
        {files.textures.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">ملفات المواد (Textures):</h4>
            <ul className="space-y-2">
              {files.textures.map((texture, index) => (
                <li key={index} className="bg-gray-100 dark:bg-gray-700 rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <TextureIcon className="w-5 h-5 text-gray-500"/>
                      <span className="font-mono text-sm">{texture.name}</span>
                  </div>
                  <a
                    href={texture.url}
                    download={texture.name}
                    className="text-sm text-blue-600 hover:underline font-semibold"
                  >
                    تحميل
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {files.note && <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-4">{files.note}</p>}
      </div>
    </Card>
  );
};

export default DownloadArea;