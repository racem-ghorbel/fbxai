
import React from 'react';
import Card from './Card';
import { BlenderIcon, MixamoIcon, UnrealIcon, UnityIcon } from './icons/Icons';

const plugins = [
  {
    name: 'Mixamo',
    description: 'منصة مجانية للتحريك التلقائي (auto-rigging) ومكتبة ضخمة من الرسوم المتحركة.',
    Icon: MixamoIcon,
    url: 'https://www.mixamo.com'
  },
  {
    name: 'Blender Addons',
    description: 'إضافات قوية لتحسين سير العمل مثل إعادة بناء الشبكة (retopology) وتوزيع المواد.',
    Icon: BlenderIcon,
    url: 'https://www.blender.org/download/releases/'
  },
  {
    name: 'Unity Engine',
    description: 'محرك ألعاب شهير ومتكامل لاستيراد النماذج وتطوير الألعاب والتطبيقات التفاعلية.',
    Icon: UnityIcon,
    url: 'https://unity.com/'
  },
  {
    name: 'Unreal Engine',
    description: 'محرك ألعاب متقدم يوفر رسوميات واقعية وأدوات قوية للمطورين والفنانين.',
    Icon: UnrealIcon,
    url: 'https://www.unrealengine.com/'
  },
];

const PluginsPanel: React.FC = () => {
  return (
    <Card title="إضافات وأدوات مقترحة">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plugins.map((plugin) => (
          <a key={plugin.name} href={plugin.url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
            <div className="flex items-center gap-4">
              <plugin.Icon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600">{plugin.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{plugin.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
};

export default PluginsPanel;
