import React from 'react';
import { AppSettings, ConversionStatus } from '../types';
import Card from './Card';
import { ResetIcon } from './icons/Icons';

interface SettingsPanelProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  onStartConversion: () => void;
  onReset: () => void;
  status: ConversionStatus;
  canStart: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  setSettings,
  onStartConversion,
  onReset,
  status,
  canStart,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isFloat = ['metallic', 'roughness', 'specular'].includes(name);
    setSettings(prev => ({ 
      ...prev, 
      [name]: isFloat ? parseFloat(value) : parseInt(value, 10) 
    }));
  };

  const isProcessing = status === ConversionStatus.Processing || status === ConversionStatus.Uploading;

  return (
    <Card title="2. ضبط الإعدادات والبدء">
      <div className="space-y-6">
        {/* Project Name */}
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            اسم المشروع
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={settings.projectName}
            onChange={handleInputChange}
            disabled={isProcessing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            placeholder="e.g., Character_Model"
          />
        </div>

        {/* Target Triangles */}
        <div>
          <label htmlFor="targetTriangles" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            عدد المثلثات المستهدف: <span className="font-bold text-blue-600">{settings.targetTriangles.toLocaleString()}</span>
          </label>
          <input
            type="range"
            id="targetTriangles"
            name="targetTriangles"
            min="1000"
            max="100000"
            step="1000"
            value={settings.targetTriangles}
            onChange={handleSliderChange}
            disabled={isProcessing}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
          />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="usePbrMaterials"
                    name="usePbrMaterials"
                    checked={settings.usePbrMaterials}
                    onChange={handleInputChange}
                    disabled={isProcessing}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="usePbrMaterials" className="mr-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    استخدام مواد PBR متقدمة
                </label>
            </div>

            {settings.usePbrMaterials && (
                <div className="space-y-4 pl-2 border-r-2 border-blue-500 pr-4">
                    {/* Metallic */}
                    <div>
                        <label htmlFor="metallic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            معدني (Metallic): <span className="font-bold text-blue-600">{settings.metallic.toFixed(2)}</span>
                        </label>
                        <input type="range" id="metallic" name="metallic" min="0" max="1" step="0.01" value={settings.metallic} onChange={handleSliderChange} disabled={isProcessing} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"/>
                    </div>
                     {/* Roughness */}
                     <div>
                        <label htmlFor="roughness" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            خشونة (Roughness): <span className="font-bold text-blue-600">{settings.roughness.toFixed(2)}</span>
                        </label>
                        <input type="range" id="roughness" name="roughness" min="0" max="1" step="0.01" value={settings.roughness} onChange={handleSliderChange} disabled={isProcessing} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"/>
                    </div>
                     {/* Specular */}
                     <div>
                        <label htmlFor="specular" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            انعكاس (Specular): <span className="font-bold text-blue-600">{settings.specular.toFixed(2)}</span>
                        </label>
                        <input type="range" id="specular" name="specular" min="0" max="1" step="0.01" value={settings.specular} onChange={handleSliderChange} disabled={isProcessing} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"/>
                    </div>
                </div>
            )}
        </div>


        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={onStartConversion}
            disabled={!canStart || isProcessing}
            className="flex-grow px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
          >
            {isProcessing ? 'جاري المعالجة...' : 'ابدأ التحويل'}
          </button>
          <button
            onClick={onReset}
            disabled={isProcessing}
            title="إعادة تعيين"
            className="p-3 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            <ResetIcon />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default SettingsPanel;