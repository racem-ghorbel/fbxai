export enum ConversionStatus {
  Idle = 'idle',
  Uploading = 'uploading',
  Processing = 'processing',
  Ready = 'ready',
  Error = 'error',
}

export interface AppSettings {
  projectName: string;
  targetTriangles: number;
  usePbrMaterials: boolean;
  metallic: number;
  roughness: number;
  specular: number;
}

export interface TextureFile {
  name: string;
  url: string;
}

export interface GeneratedFiles {
  fbxUrl: string;
  gltfUrl: string;
  textures: TextureFile[];
  note?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}