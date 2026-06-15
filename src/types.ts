export interface ScriptScene {
  id: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  title: string;
  subtitle: string;
  category: 'intro' | 'ai' | 'marketing' | 'creative' | 'cta';
  narrative: string; // The words spoken by the narrator
  visuals: {
    heading: string;
    description: string;
    accentColor: string; // Tailwind class like "emerald", "purple", "cyan", etc.
    badgeText: string;
    // Interactive elements to render
    aiFeature?: {
      codeSnippet: string;
      modelName: string;
      tokensCount: number;
      chatHistory: { sender: 'user' | 'model'; text: string }[];
    };
    marketingFeature?: {
      metricValue: string;
      metricLabel: string;
      metricsTrend: number[];
      keywords: string[];
      campaigns: { name: string; status: 'active' | 'paused'; reach: string; ctr: string }[];
    };
    creativeFeature?: {
      tracks: { name: string; type: 'video' | 'audio' | 'effects'; color: string; duration: string }[];
      waveformData: number[];
      aspectRatio: string;
      exportFormats: string[];
    };
    ctaFeature?: {
      perks: string[];
      guarantee: string;
    };
  };
}

export interface VideoState {
  currentTime: number;
  isPlaying: boolean;
  playbackSpeed: number;
  isMuted: boolean;
  voiceVolume: number; // 0 to 1
  autoSpeak: boolean; // Use Web Speech API
  activeSceneId: string;
  selectedVoiceName: string;
}
