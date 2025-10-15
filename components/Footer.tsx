
import React from 'react';

const nodeCodeExample = `
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function generateModel(imagePath) {
  const form = new FormData();
  form.append('name', 'My3DModel');
  form.append('target_triangles', 50000);
  form.append('images[]', fs.createReadStream(imagePath));

  const response = await fetch('https://your-app-url/api/generate-fbx', {
    method: 'POST',
    body: form
  });

  const result = await response.json();
  console.log(result);
  // { fbxUrl: '...', textures: [...] }
}

generateModel('./my-image.jpg');
`.trim();

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8 pb-12 text-sm text-gray-600 dark:text-gray-400">
      <div className="container mx-auto">
        <h3 className="text-lg font-bold text-center mb-6 text-gray-800 dark:text-gray-200">للمطورين: استخدام الواجهة البرمجية (API)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          {/* API Endpoints */}
          <div dir="ltr" className="space-y-4">
            <h4 className="font-bold text-gray-700 dark:text-gray-300">API Endpoints</h4>
            <div>
              <p className="font-mono font-semibold">POST /api/generate-fbx</p>
              <p className="text-xs">Generates a 3D model from images.</p>
              <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                <li><span className="font-semibold">images[]</span>: File (multiple)</li>
                <li><span className="font-semibold">name</span>: String</li>
                <li><span className="font-semibold">target_triangles</span>: Integer</li>
              </ul>
            </div>
            <div>
              <p className="font-mono font-semibold">POST /api/chat</p>
              <p className="text-xs">Interacts with the chat assistant.</p>
               <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                <li><span className="font-semibold">message</span>: String</li>
                {/* FIX: Corrected JSX syntax error by wrapping object notation in a string literal. */}
                <li><span className="font-semibold">context</span>: Array of {'{role, text}'}</li>
              </ul>
            </div>
          </div>
          
          {/* Node.js Example */}
          <div dir="ltr">
             <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Node.js Example</h4>
             <div className="bg-gray-900 rounded-md p-4 overflow-x-auto">
                 <pre><code className="text-xs text-gray-300 language-js">{nodeCodeExample}</code></pre>
             </div>
          </div>
        </div>
        <p className="text-center mt-8 text-xs">&copy; {new Date().getFullYear()} مولّد صور إلى FBX. تم إنشاؤه بواسطة الذكاء الاصطناعي.</p>
      </div>
    </footer>
  );
};

export default Footer;
