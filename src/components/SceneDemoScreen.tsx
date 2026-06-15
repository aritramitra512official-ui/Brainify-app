import React from 'react';
import { ScriptScene } from '../types';
import { Terminal, Code2, Users, Database, Sparkles, Send } from 'lucide-react';

interface SceneDemoScreenProps {
  scene: ScriptScene;
  isPlaying: boolean;
  currentTime: number;
}

export const SceneDemoScreen: React.FC<SceneDemoScreenProps> = ({ scene, isPlaying, currentTime }) => {
  const visuals = scene.visuals;

  const renderDemoContent = () => {
    switch (scene.category) {
      case 'intro':
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center select-none">
            <div className="relative mb-6">
              <div className="absolute -inset-1 rounded-full bg-indigo-500/20 blur-xl animate-pulse"></div>
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-indigo-500/10">
                <Sparkles className="w-8 h-8 font-bold" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold font-sans tracking-tight text-slate-100 max-w-md select-text">
              Brainify Online Masterclass
            </h2>
            <p className="text-sm text-indigo-300 font-mono tracking-wider uppercase mt-1">
              Pathways to High-Value Modern Talents
            </p>
            
            <div className="grid grid-cols-3 gap-3 w-emerald mt-6 w-full max-w-md">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col items-center text-center">
                <span className="w-2 h-2 rounded-full bg-violet-400 mb-2"></span>
                <span className="text-[10px] font-semibold text-slate-400 font-mono uppercase">AI & LLMs</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col items-center text-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mb-2"></span>
                <span className="text-[10px] font-semibold text-slate-400 font-mono uppercase">Marketing</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col items-center text-center">
                <span className="w-2 h-2 rounded-full bg-amber-400 mb-2"></span>
                <span className="text-[10px] font-semibold text-slate-400 font-mono uppercase">Creative</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-sm mt-6">
              Empowering self-made entrepreneurs, builders, and content directors globally setup over high-leverage vectors.
            </p>
          </div>
        );

      case 'ai':
        const ai = visuals.aiFeature;
        if (!ai) return null;
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 h-full">
            {/* Left side: Chat/Terminal emulator */}
            <div className="col-span-1 lg:col-span-6 bg-slate-950 rounded-xl border border-slate-800/80 overflow-hidden flex flex-col h-full shadow-inner">
              <div className="border-b border-slate-800/70 bg-slate-900/40 px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  <span className="text-[10px] font-mono text-slate-400 ml-1.5 font-semibold">Gemini API Terminal</span>
                </div>
                <span className="bg-violet-900/30 text-violet-400 text-[9px] px-2 py-0.5 rounded font-mono font-medium border border-violet-500/10">
                  {ai.modelName}
                </span>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs font-sans min-h-[140px]">
                {ai.chatHistory.map((item, idx) => (
                  <div key={idx} className={`flex flex-col ${item.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] font-mono text-slate-500 mb-0.5 uppercase">
                      {item.sender === 'user' ? 'Client Request' : 'Smart Model'}
                    </span>
                    <div className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                      item.sender === 'user' 
                        ? 'bg-slate-905 border border-slate-800 text-slate-200' 
                        : 'bg-violet-500/10 border border-violet-500/20 text-violet-200'
                    }`}>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat simulated input */}
              <div className="border-t border-slate-800/70 bg-slate-900/20 p-2 flex items-center gap-2">
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>How to orchestrate multiple tools?</span>
                  <Send className="w-3.5 h-3.5 text-slate-500 hover:text-slate-300 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Right side: Modern TypeScript integration */}
            <div className="col-span-1 lg:col-span-6 bg-slate-950 rounded-xl border border-slate-800/80 overflow-hidden flex flex-col h-full">
              <div className="border-b border-slate-800/70 bg-slate-900/40 px-3 py-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-[10px] font-mono text-slate-300 font-semibold">server/gemini.ts</span>
              </div>
              <div className="flex-1 p-3 font-mono text-[9px] leading-relaxed text-slate-300 overflow-x-auto select-text whitespace-pre bg-slate-950/40 text-left">
                {ai.codeSnippet}
              </div>
              <div className="bg-slate-900/35 border-t border-slate-800/60 p-2 px-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>UTF-8</span>
                <span>Tokens: {ai.tokensCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        );

      case 'marketing':
        const marketing = visuals.marketingFeature;
        if (!marketing) return null;
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 h-full">
            {/* Top stats or Left metrics */}
            <div className="col-span-1 lg:col-span-4 bg-slate-950 rounded-xl border border-slate-800/80 p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">Conversion Performance</span>
                <h3 className="text-3xl font-bold font-sans tracking-tight text-emerald-400 mt-1 select-text">
                  {marketing.metricValue}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{marketing.metricLabel}</p>
              </div>

              {/* Sparklines metric style panel */}
              <div className="mt-4 flex items-end gap-1 h-14 bg-slate-900/30 p-2 rounded border border-slate-800">
                {marketing.metricsTrend.map((val, idx) => {
                  const max = Math.max(...marketing.metricsTrend);
                  const pctHeight = (val / max) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-emerald-500/80 rounded-t-sm hover:bg-emerald-400 transition-all duration-300"
                        style={{ height: `${pctHeight}%` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Campaign analytics panel */}
            <div className="col-span-1 lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800/80 overflow-hidden flex flex-col justify-between">
              <div className="border-b border-slate-800/70 bg-slate-900/40 px-3 py-2 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-300 font-semibold">Optimized Funnel Channels</span>
                <span className="text-[9px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">Live Syncing</span>
              </div>
              <div className="flex-1 divide-y divide-slate-800/60 bg-slate-950/30 overflow-y-auto">
                {marketing.campaigns.map((cam, idx) => (
                  <div key={idx} className="p-2.5 px-3 flex items-center justify-between hover:bg-slate-900/20 transition-all">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${cam.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`}></span>
                      <span className="text-xs font-sans text-slate-200 font-medium">{cam.name}</span>
                    </div>
                    <div className="flex gap-4 text-[11px] font-mono">
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase">Reach</span>
                        <span className="text-slate-300">{cam.reach}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase">CTR</span>
                        <span className="text-emerald-400 font-bold">{cam.ctr}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Keywords Tagging cloud */}
              <div className="p-2 bg-slate-900/20 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                {marketing.keywords.map((kw, i) => (
                  <span key={i} className="text-[9px] bg-slate-850 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-sans">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'creative':
        const creative = visuals.creativeFeature;
        if (!creative) return null;
        return (
          <div className="p-4 h-full flex flex-col justify-between gap-4">
            {/* Multi-Track Sequencer View */}
            <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800/80 p-3 overflow-hidden flex flex-col justify-between shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-2 mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">Timeline Multi-Track Suite</span>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
                  Aspect: {creative.aspectRatio}
                </span>
              </div>

              {/* Tracks List */}
              <div className="space-y-2 flex-1 overflow-y-auto min-h-[120px]">
                {creative.tracks.map((tr, idx) => (
                  <div key={idx} className={`border rounded-lg p-2 flex items-center justify-between text-xs ${tr.color}`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span className="font-medium truncate max-w-xs">{tr.name}</span>
                    </div>
                    <span className="text-[10px] font-mono opacity-80">{tr.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Audio waveform representation */}
            <div className="h-16 bg-slate-950 rounded-xl border border-slate-800/80 p-3 flex items-center justify-between gap-4 select-none">
              <div className="flex-1 flex items-end gap-[2px] h-full justify-center">
                {creative.waveformData.map((ht, idx) => (
                  <div 
                    key={idx} 
                    className="flex-1 bg-amber-500/65 rounded-t-sm hover:bg-amber-400 transition-all"
                    style={{ height: `${ht}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex flex-col text-right font-mono text-[9px]">
                <span className="text-slate-500">Codec Output</span>
                {creative.exportFormats.map((f, idx) => (
                  <span key={idx} className="text-amber-400 font-semibold">{f}</span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cta':
        const cta = visuals.ctaFeature;
        if (!cta) return null;
        return (
          <div className="flex flex-col justify-center h-full p-6 text-center select-none bg-gradient-to-b from-slate-950 to-slate-900">
            <h2 className="text-2xl font-bold font-sans tracking-tight text-slate-100 max-w-md mx-auto select-text">
              Launch Your Career Path
            </h2>
            <p className="text-xs text-cyan-400 font-mono uppercase tracking-wider mt-1.5">
              Limited Lifetime Premium Licenses Available
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto w-full select-text text-left">
              {cta.perks.map((p, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800/80 p-2.5 rounded-xl flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-[10px] font-bold mt-0.5">✓</span>
                  <span className="text-xs text-slate-300 font-medium leading-relaxed">{p}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 text-[10px] font-mono text-slate-500 max-w-sm mx-auto uppercase tracking-wide">
              🔒 {cta.guarantee}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl border border-white/10 h-[380px] overflow-hidden flex flex-col justify-between shadow-2xl relative">
      {/* Decorative Browser Bar */}
      <div className="border-b border-white/5 bg-black/40 backdrop-blur-md px-5 py-3.5 flex items-center justify-between relative shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-white/10 border border-white/5"></span>
          <span className="w-3 h-3 rounded-full bg-white/10 border border-white/5"></span>
          <span className="w-3 h-3 rounded-full bg-white/10 border border-white/5"></span>
          <div className="bg-black/60 border border-white/10 rounded px-3 py-0.5 text-[10px] font-mono text-slate-400 ml-3 flex items-center gap-1 cursor-not-allowed">
            <span className="text-emerald-500 font-bold">https://</span>
            <span>brainify.edu/courses/active-demo</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? 'bg-indigo-400 animate-ping' : 'bg-slate-500'}`}></span>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
            {scene.category} View
          </span>
        </div>
      </div>

      {/* Main Sandbox Interactive content */}
      <div className="flex-1 overflow-hidden relative bg-[#050505]/30">
        {renderDemoContent()}
      </div>
    </div>
  );
};
