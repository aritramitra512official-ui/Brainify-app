import React, { useState, useEffect, useRef } from 'react';
import { videoScript } from './videoScript';
import { VideoState, ScriptScene } from './types';
import { CharacterPresenter } from './components/CharacterPresenter';
import { SceneDemoScreen } from './components/SceneDemoScreen';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Code2, 
  TrendingUp, 
  Sliders, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  UserCheck,
  Zap,
  Award,
  HelpCircle,
  Clock
} from 'lucide-react';

const DURATION = 60; // 60 seconds total

export default function App() {
  const [state, setState] = useState<VideoState>({
    currentTime: 0,
    isPlaying: false,
    playbackSpeed: 1,
    isMuted: false,
    voiceVolume: 0.8,
    autoSpeak: true,
    activeSceneId: 'intro',
    selectedVoiceName: '',
  });

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Load voices for narration selector
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Auto-select a premium-sounding voice if possible
        const preferred = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) || 
                        voices.find(v => v.name.includes('Natural')) ||
                        voices.find(v => v.lang.startsWith('en')) ||
                        voices[0];
        
        if (preferred) {
          setState(prev => ({ ...prev, selectedVoiceName: preferred.name }));
        }
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const currentSceneIndex = videoScript.findIndex(
    s => state.currentTime >= s.startTime && state.currentTime < s.endTime
  );
  const currentScene = videoScript[currentSceneIndex !== -1 ? currentSceneIndex : 0];

  // Sync state.activeSceneId
  useEffect(() => {
    if (currentScene && currentScene.id !== state.activeSceneId) {
      setState(prev => ({ ...prev, activeSceneId: currentScene.id }));
    }
  }, [currentScene, state.activeSceneId]);

  // Frame animation loop to keep precise time synchronization
  const animate = (time: number) => {
    if (previousTimeRef.current !== null) {
      const delta = (time - previousTimeRef.current) / 1000; // in seconds
      
      setState(prev => {
        if (!prev.isPlaying) return prev;
        
        const nextTime = prev.currentTime + delta * prev.playbackSpeed;
        if (nextTime >= DURATION) {
          // Reset to beginning upon completion
          if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
          }
          return { ...prev, currentTime: 0, isPlaying: false };
        }
        return { ...prev, currentTime: nextTime };
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (state.isPlaying) {
      previousTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      previousTimeRef.current = null;
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [state.isPlaying, state.playbackSpeed]);

  const togglePlayback = () => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setState(prev => ({ ...prev, currentTime: 0, isPlaying: false }));
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickedSeconds = (clickX / rect.width) * DURATION;
    
    // Stop speaking during quick-seeking
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setState(prev => ({ ...prev, currentTime: Math.max(0, Math.min(DURATION, clickedSeconds)) }));
  };

  // Skip straight to a specific masterclass educational track
  const skipToScene = (sceneId: string) => {
    const target = videoScript.find(s => s.id === sceneId);
    if (target) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setState(prev => ({ ...prev, currentTime: target.startTime, isPlaying: true }));
    }
  };

  // Visual background depending on category
  const themeAccentStyle = () => {
    switch (currentScene.category) {
      case 'intro': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'ai': return 'text-violet-400 bg-violet-500/10 border-violet-500/20';
      case 'marketing': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'creative': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'cta': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-10">
      
      {/* Upper Navigation & Brand */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg text-white">
              B
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-white uppercase flex items-center gap-1.5">
                Brainify Explainer Studio
              </span>
              <span className="text-[10px] font-mono text-slate-500 block uppercase font-medium">
                Designed for: aritramitra512official
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1.5 bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1.5 rounded-full font-mono font-medium">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              1-Min Promo Standard
            </span>
            <a 
              href="https://brainify.edu" 
              target="_blank" 
              rel="noreferrer"
              className="px-5 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:bg-slate-200 transition-all flex items-center gap-1.5"
            >
              Brainify Main App
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Studio Arena */}
      <main className="max-w-7xl mx-auto px-4 mt-8 flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Interactive Sandbox: Stage & Playback controller */}
        <section className="col-span-1 xl:col-span-8 space-y-5">
          
          {/* Active Sandbox Platform Demo */}
          <div className="relative">
            {/* Visual Screen frame wrapper */}
            <SceneDemoScreen 
              scene={currentScene} 
              isPlaying={state.isPlaying} 
              currentTime={state.currentTime} 
            />

            {/* Presenter Absolute HUD Positioning */}
            <div className="absolute right-6 bottom-4 z-40">
              <CharacterPresenter 
                scene={currentScene}
                isPlaying={state.isPlaying}
                currentTime={state.currentTime}
                voiceVolume={state.isMuted ? 0 : state.voiceVolume}
                autoSpeak={state.autoSpeak}
                selectedVoiceName={state.selectedVoiceName}
              />
            </div>
          </div>

          {/* Master Video Progress Controller */}
          <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl shadow-xl space-y-4">
            
            {/* Interactive Timeline track */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                <span className="font-semibold text-slate-300">VIDEO SEQUENCER TIMELINE</span>
                <span className="text-indigo-400 font-bold">
                  {Math.floor(state.currentTime).toString().padStart(2, '0')}s / 60s
                </span>
              </div>

              {/* Multi-scene visualized bar */}
              <div 
                onClick={handleTimelineClick}
                className="h-3.5 w-full bg-slate-950 rounded-lg relative overflow-hidden cursor-pointer border border-slate-800 flex"
              >
                {videoScript.map((sc, index) => {
                  const widthPct = ((sc.endTime - sc.startTime) / DURATION) * 100;
                  const isActive = state.currentTime >= sc.startTime && state.currentTime < sc.endTime;
                  return (
                    <div 
                      key={sc.id}
                      className={`h-full border-r border-slate-950/30 transition-colors relative`}
                      style={{ width: `${widthPct}%` }}
                    >
                      <div className={`h-full w-full ${
                        isActive 
                          ? 'bg-indigo-600/40' 
                          : 'bg-slate-800 hover:bg-slate-700/60'
                      }`} />
                    </div>
                  );
                })}

                {/* Vertical Cursor Indicator */}
                <div 
                  className="absolute top-0 bottom-0 w-[3px] bg-red-400 shadow-xl transition-all duration-75 pointer-events-none"
                  style={{ left: `${(state.currentTime / DURATION) * 100}%` }}
                />
              </div>

              {/* Mini Segment Identifiers */}
              <div className="grid grid-cols-5 text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center pt-1.5">
                {videoScript.map(sc => (
                  <button 
                    key={sc.id} 
                    onClick={() => skipToScene(sc.id)}
                    className={`hover:text-slate-200 transition text-center truncate ${
                      state.activeSceneId === sc.id ? 'text-indigo-400 font-bold' : ''
                    }`}
                  >
                    {sc.id.split('-')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Playback Controls and HUD */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1 border-t border-slate-800/50">
              
              {/* Primary Transport Buttons */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={togglePlayback}
                  className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white p-3 rounded-full shadow-lg shadow-indigo-600/10 transition-all flex items-center justify-center"
                  title={state.isPlaying ? 'Pause Demo' : 'Play Animated Video'}
                >
                  {state.isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                </button>

                <button 
                  onClick={handleReset}
                  className="bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 p-3 rounded-full transition-all flex items-center justify-center"
                  title="Rewind to start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Mute/Voice Control */}
                <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <button 
                    onClick={() => setState(prev => ({ ...prev, isMuted: !prev.isMuted }))}
                    className="text-slate-400 hover:text-slate-200 transition"
                  >
                    {state.isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={state.voiceVolume}
                    disabled={state.isMuted}
                    onChange={(e) => setState(prev => ({ ...prev, voiceVolume: parseFloat(e.target.value) }))}
                    className="w-16 accent-indigo-500 h-1 rounded cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-500">VOICE</span>
                </div>
              </div>

              {/* TTS Synthesis Options */}
              <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-xl border border-slate-850">
                <div className="flex items-center gap-2 px-1">
                  <input 
                    type="checkbox" 
                    id="autoSpeak" 
                    checked={state.autoSpeak} 
                    onChange={(e) => setState(prev => ({ ...prev, autoSpeak: e.target.checked }))}
                    className="rounded border-slate-800 bg-slate-900 text-indigo-600 focus:ring-0 cursor-pointer h-3.5 w-3.5"
                  />
                  <label htmlFor="autoSpeak" className="text-[10px] font-mono font-medium text-slate-400 cursor-pointer">
                    AI VOICE READOUT
                  </label>
                </div>

                {state.autoSpeak && availableVoices.length > 0 && (
                  <select 
                    value={state.selectedVoiceName}
                    onChange={(e) => setState(prev => ({ ...prev, selectedVoiceName: e.target.value }))}
                    className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 rounded px-2 py-1 focus:ring-0 max-w-[150px] md:max-w-[200px]"
                  >
                    {availableVoices.map(voice => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Speed Selector */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800 self-end">
                {[1, 1.25, 1.5].map(sp => (
                  <button
                    key={sp}
                    onClick={() => setState(prev => ({ ...prev, playbackSpeed: sp }))}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded transition ${
                      state.playbackSpeed === sp 
                        ? 'bg-indigo-600 font-bold text-white' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {sp}x
                  </button>
                ))}
              </div>

            </div>

          </div>

          {/* Educational Sandbox Path Explanatory Cards */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
            <h3 className="text-sm font-bold tracking-tight text-white mb-3">
              Explore Brainify Masterclass Channels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div 
                onClick={() => skipToScene('ai-path')}
                className="bg-white/[0.03] border border-white/10 hover:border-violet-500/40 p-3.5 rounded-xl cursor-pointer transition group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded bg-violet-500/10 flex items-center justify-center text-violet-400">
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-violet-400 transition">AI Path</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Deep-dive into full-stack integrations, building smart LLM agents, and deploying server services.
                </p>
              </div>

              <div 
                onClick={() => skipToScene('marketing-path')}
                className="bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 p-3.5 rounded-xl cursor-pointer transition group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition">Digital Marketing</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  SEO algorithms, funnel layouts, organic community building and viral campaigns metrics.
                </p>
              </div>

              <div 
                onClick={() => skipToScene('creative-path')}
                className="bg-white/[0.03] border border-white/10 hover:border-amber-500/40 p-3.5 rounded-xl cursor-pointer transition group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Sliders className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition">Content Direction</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Cinematic storyboarding, multi-track audio engineering, and timeline sequencers.
                </p>
              </div>
            </div>
          </div>

        </section>

        {/* Right Panel: Interactive Narrative Storyboard HUD */}
        <section className="col-span-1 xl:col-span-4 space-y-5">
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            
            <div className="mb-4">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border font-semibold tracking-wider mr-2 ${themeAccentStyle()}`}>
                {currentScene.category.toUpperCase()} SEGMENT
              </span>
              <span className="text-xs font-mono text-slate-500">
                {currentScene.startTime}s - {currentScene.endTime}s
              </span>
            </div>

            <div className="space-y-1 select-text">
              <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Active Scene Name</span>
              <h2 className="text-lg font-bold font-sans tracking-tight text-white">
                {currentScene.title}
              </h2>
              <p className="text-xs text-indigo-400 font-medium">
                {currentScene.subtitle}
              </p>
            </div>

            <div className="mt-4 bg-slate-950 border border-slate-800/80 rounded-xl p-4.5 min-h-[160px] flex flex-col justify-between relative selection:bg-indigo-600/50">
              <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-mono text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-805">
                <span>Script Reader</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans select-text italic">
                "{currentScene.narrative}"
              </p>
              
              <div className="mt-4 pt-3 border-t border-slate-800/50 flex justify-between items-center text-[10px] font-mono text-indigo-400">
                <span>Presenter: aritramitrax007</span>
                <span>Category: {currentScene.category}</span>
              </div>
            </div>

          </div>

          {/* Sequence Storyboard Index List */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300 font-sans">FULL EXPLAINER STORYBOARD</span>
              <span className="text-[10px] font-mono text-slate-500">5 SECTIONS / 60S</span>
            </div>

            <div className="space-y-2">
              {videoScript.map((sc, idx) => {
                const isSelected = state.activeSceneId === sc.id;
                return (
                  <div 
                    key={sc.id}
                    onClick={() => skipToScene(sc.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected 
                        ? 'bg-slate-950 border-indigo-500/50 shadow-md shadow-indigo-500/5' 
                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="truncate max-w-[140px] md:max-w-xs">
                        <span className={`text-xs block font-medium truncate ${isSelected ? 'text-indigo-400' : 'text-slate-300'}`}>
                          {sc.title}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">
                          {sc.category} segment
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-850">
                      {sc.startTime}s - {sc.endTime}s
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Value Highlights Panel */}
          <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-300 font-sans tracking-wide uppercase">Brainify Ecosystem Perks</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">🚀</span>
                <p>Expert-led sequences detailing real Gemini orchestration instead of shallow prompt engineering templates.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">📈</span>
                <p>Real and verified growth analytics systems covering user conversion and metric auditing tracks.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">🎥</span>
                <p>Interactive cinematic tool demos mirroring premium multimedia sequences directly.</p>
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* Bottom Micro-Ticker */}
      <footer className="py-6 mt-12 bg-white/5 border-t border-white/5 flex items-center justify-center">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-4 text-center">
          <span>500+ Video Lessons</span>
          <span>Exclusive AI Tools</span>
          <span>Certified Mentorship</span>
          <span>Global Student Community</span>
        </div>
      </footer>

    </div>
  );
}
