import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `أنت مساعد ذكي متخصص في مساعدة فناني النماذج ثلاثية الأبعاد الذين يستخدمون أداة لتحويل الصور إلى FBX. مهمتك هي تقديم نصائح موجزة ومفيدة حول الإضافات (plugins) مثل Mixamo وBlender Addons وUnity وUnreal Engine، ومفاهيم مثل التحريك (rigging) وإعادة بناء الشبكة (retopology). يجب أن تكون جميع ردودك باللغة العربية.`;

let chat: Chat | null = null;

function initializeChat(): Chat {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        },
    });
}

export async function getChatReply(message: string): Promise<string> {
  try {
    if (!chat) {
        chat = initializeChat();
    }
    
    const response = await chat.sendMessage({ message });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Reset chat on error in case the session is corrupted
    chat = null;
    throw new Error("Failed to get a reply from the AI assistant.");
  }
}

export function resetChat() {
    chat = null;
}