import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import SettingsPanel from './components/SettingsPanel';
import StatusBar from './components/StatusBar';
import ModelPreview from './components/ModelPreview';
import DownloadArea from './components/DownloadArea';
import ChatAssistant from './components/ChatAssistant';
import PluginsPanel from './components/PluginsPanel';
import Footer from './components/Footer';
import { getChatReply, resetChat } from './services/geminiService';
import { processImagesToFbx } from './services/mockApiService';
import { AppSettings, ChatMessage, ConversionStatus, GeneratedFiles } from './types';

type Theme = 'light' | 'dark';

const INITIAL_SETTINGS: AppSettings = {
  projectName: 'My3DModel',
  targetTriangles: 50000,
  usePbrMaterials: false,
  metallic: 0.5,
  roughness: 0.5,
  specular: 0.5,
};

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
    {
        role: 'assistant',
        text: 'أهلاً بك! أنا مساعدك في عالم النمذجة ثلاثية الأبعاد. كيف يمكنني مساعدتك اليوم في ما يخص الإضافات، التحريك، أو إعادة بناء الشبكة؟',
    }
]

function App() {
  const [images, setImages] = useState<File[]>([]);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [status, setStatus] = useState<ConversionStatus>(ConversionStatus.Idle);
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFiles | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleReset = useCallback(() => {
    setImages([]);
    setSettings(INITIAL_SETTINGS);
    setStatus(ConversionStatus.Idle);
    setGeneratedFiles(null);
    setChatMessages(INITIAL_CHAT_MESSAGES);
    resetChat();
  }, []);

  const handleStartConversion = useCallback(async () => {
    if (images.length === 0) {
      alert('الرجاء رفع صورة واحدة على الأقل.');
      return;
    }
    setGeneratedFiles(null);
    try {
      const files = await processImagesToFbx(images, settings, setStatus);
      setGeneratedFiles(files);
    } catch (error) {
      console.error('Conversion failed:', error);
      // The status is already set to Error inside the service
    }
  }, [images, settings]);

  const handleSendMessage = useCallback(async (message: string) => {
      const newMessages: ChatMessage[] = [...chatMessages, { role: 'user', text: message }];
      setChatMessages(newMessages);
      setIsChatLoading(true);

      try {
          const reply = await getChatReply(message);
          setChatMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      } catch (error) {
          console.error("Chat error:", error);
          setChatMessages(prev => [...prev, { role: 'assistant', text: 'عذراً، حدث خطأ أثناء التواصل مع المساعد. الرجاء التأكد من اتصالك بالإنترنت والمحاولة مرة أخرى.' }]);
      } finally {
          setIsChatLoading(false);
      }
  }, [chatMessages]);


  const canStart = images.length > 0 && settings.projectName.trim() !== '';
  const showResults = status === ConversionStatus.Ready && generatedFiles;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100" dir="rtl">
      <Header theme={theme} onToggleTheme={handleThemeToggle} />
      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main content column */}
          <div className="lg:col-span-2 space-y-8">
            <StatusBar status={status} />
            <ImageUploader images={images} setImages={setImages} status={status} />
            <SettingsPanel
              settings={settings}
              setSettings={setSettings}
              onStartConversion={handleStartConversion}
              onReset={handleReset}
              status={status}
              canStart={canStart}
            />
            {showResults && (
              <>
                <ModelPreview gltfUrl={generatedFiles.gltfUrl} projectName={settings.projectName} />
                <DownloadArea files={generatedFiles} settings={settings} />
              </>
            )}
            <PluginsPanel />
          </div>
          {/* Chat assistant column */}
          <div className="lg:col-span-1">
            <ChatAssistant 
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              isLoading={isChatLoading}
            />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;