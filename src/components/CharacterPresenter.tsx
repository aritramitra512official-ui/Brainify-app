import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Code2, Play, Pause } from 'lucide-react';
import { ScriptScene } from '../types';

interface CharacterPresenterProps {
  scene: ScriptScene;
  isPlaying: boolean;
  currentTime: number;
  voiceVolume: number;
  autoSpeak: boolean;
  selectedVoiceName: string;
}

export const CharacterPresenter: React.FC<CharacterPresenterProps> = ({
  scene,
  isPlaying,
  currentTime,
  voiceVolume,
  autoSpeak,
  selectedVoiceName,
}) => {
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [avatarBubble, setAvatarBubble] = useState('');
  const [isMouthMoving, setIsMouthMoving] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSynth(window.speechSynthesis);
    }
  }, []);

  // Handle TTS and sync with video playback
  useEffect(() => {
    if (!synth || !autoSpeak) return;

    // Check if current narrative is already being read
    if (isPlaying) {
      synth.cancel(); // Stop prior speeches
      const sceneProgress = currentTime - scene.startTime;
      
      // Only start speaking if we are within the first 6 seconds of a scene or entering a new one
      if (sceneProgress >= 0 && sceneProgress < 10) {
        // Extract a shorter punchy subtitle/speech to speak via browser synth
        const speechText = scene.narrative;
        const ut = new SpeechSynthesisUtterance(speechText);
        
        // Find best matching voice
        const voices = synth.getVoices();
        const selectedVoice = voices.find(v => v.name === selectedVoiceName) || 
                             voices.find(v => v.lang.startsWith('en')) || 
                             null;
        
        if (selectedVoice) {
          ut.voice = selectedVoice;
        }

        ut.rate = 1.05; // Slightly faster for punchy delivery
        ut.volume = voiceVolume;

        ut.onstart = () => {
          setIsSpeaking(true);
          setIsMouthMoving(true);
        };

        ut.onend = () => {
          setIsSpeaking(false);
          setIsMouthMoving(false);
        };

        ut.onerror = () => {
          setIsSpeaking(false);
          setIsMouthMoving(false);
        };

        setUtterance(ut);
        synth.speak(ut);
      }
    } else {
      synth.cancel();
      setIsSpeaking(false);
      setIsMouthMoving(false);
    }

    return () => {
      synth.cancel();
    };
  }, [scene.id, isPlaying, autoSpeak, synth, selectedVoiceName, voiceVolume]);

  // Gentle bouncing/talking animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMouthMoving && isPlaying) {
      interval = setInterval(() => {
        setIsMouthMoving(prev => !prev);
      }, 150);
    } else {
      setIsMouthMoving(false);
    }
    return () => clearInterval(interval);
  }, [isMouthMoving, isPlaying]);

  // Subtitle/speech bubble text generator
  useEffect(() => {
    const text = scene.narrative;
    const words = text.split(' ');
    // Scroll through the words roughly based on scene duration (12 seconds)
    const sceneElapsed = currentTime - scene.startTime;
    const wordIndex = Math.floor((sceneElapsed / 12) * words.length);
    const startIdx = Math.max(0, wordIndex - 6);
    const endIdx = Math.min(words.length, wordIndex + 6);
    
    setAvatarBubble(words.slice(startIdx, endIdx).join(' '));
  }, [scene.narrative, currentTime, scene.startTime]);

  // Select current physical posture/expressions based on scene
  const getAvatarExpression = () => {
    switch (scene.category) {
      case 'intro':
        return 'scale-105 border-indigo-500/50 shadow-indigo-500/20';
      case 'ai':
        return 'scale-110 border-violet-500/50 shadow-violet-500/20';
      case 'marketing':
        return 'scale-105 border-emerald-500/50 shadow-emerald-500/20';
      case 'creative':
        return 'scale-110 border-amber-500/50 shadow-amber-500/20';
      case 'cta':
        return 'scale-105 -rotate-1 border-cyan-500/50 shadow-cyan-500/20';
      default:
        return 'scale-100 border-slate-700';
    }
  };

  // Avatar path uses the generated asset image from high-quality prompt
  const avatarImageSrc = "/src/assets/images/presenter_avatar_1781504537911.jpg";

  return (
    <div className="relative flex flex-col items-center">
      {/* Speech Bubble */}
      <div 
        className={`absolute -top-24 left-1/2 -translate-x-1/2 w-64 max-w-xs transition-all duration-300 z-30 ${
          isPlaying ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-1'
        }`}
      >
        <div className="bg-slate-900 border border-slate-800 text-xs px-3.5 py-2.5 rounded-2xl shadow-xl text-slate-100 text-center relative font-medium leading-relaxed">
          <p className="text-indigo-400 font-bold text-[10px] tracking-widest uppercase mb-1">
            Presenter: aritramitrax007
          </p>
          <p className="text-slate-200">
            "{avatarBubble || "Hey guys, welcome back to Brainify!"}"
          </p>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-slate-800 rotate-45"></div>
        </div>
      </div>

      {/* Modern Avatar Ring */}
      <div className="relative z-20 group">
        <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-pink-400 to-cyan-400 opacity-60 blur-md transition-all duration-500 ${
          isMouthMoving ? 'animate-pulse opacity-100 scale-105' : 'scale-100 opacity-40'
        }`}></div>
        
        <div className={`relative transition-all duration-500 h-28 w-28 rounded-full overflow-hidden border-3 shadow-2xl bg-slate-950 ${getAvatarExpression()}`}>
          <img 
            src={avatarImageSrc}
            alt="aritramitrax007 Brainify Host"
            className={`w-full h-full object-cover transition-all duration-500 ${
              isMouthMoving ? 'scale-105 filter brightness-110' : 'scale-100'
            }`}
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle Live Audio Waves overlaying the avatar */}
          {isMouthMoving && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-[2px] bg-slate-950/80 px-2 py-0.5 rounded-full border border-indigo-500/20">
              <span className="w-[2px] h-2 bg-indigo-400 animate-bounce" style={{ animationDelay: '0.1s' }}></span>
              <span className="w-[2px] h-3.5 bg-indigo-300 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-[2px] h-2.5 bg-indigo-400 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
            </div>
          )}
        </div>

        {/* Presenter Name Badge */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-slate-800 backdrop-blur-md text-[10px] px-2.5 py-0.5 rounded-full font-mono text-indigo-400 font-semibold tracking-wider flex items-center gap-1.5 shadow-lg whitespace-nowrap">
          <span className={`w-1.5 h-1.5 rounded-full ${isMouthMoving ? 'bg-indigo-400 animate-ping' : 'bg-slate-500'}`}></span>
          aritramitrax007
        </div>
      </div>
    </div>
  );
};
