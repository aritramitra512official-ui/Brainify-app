import { ScriptScene } from './types';

export const videoScript: ScriptScene[] = [
  {
    id: 'intro',
    startTime: 0,
    endTime: 12,
    title: 'Welcome to Brainify',
    subtitle: 'Where Creativity Meets AI & Tech',
    category: 'intro',
    narrative: "Hey guys! I'm absolutely thrilled to welcome you to Brainify! The world is changing faster than ever, and legacy education isn't keeping up. That's why we built the ultimate online platform dedicated exclusively to your masterclass path. We hold your hand through three high-income skills: artificial intelligence integration, data-driven digital marketing, and modern content creation.",
    visuals: {
      heading: 'Brainify Masterclass Platform',
      description: 'Your premium launchpad for high-income technical, marketing, and creative skills in the modern world.',
      accentColor: 'indigo',
      badgeText: 'ONLINE PLATFORM DEMO',
    }
  },
  {
    id: 'ai-path',
    startTime: 12,
    endTime: 24,
    title: 'Path 1: Artificial Intelligence',
    subtitle: 'Code, Automate, & Integrate LLMs',
    category: 'ai',
    narrative: "First up, let's look at the Artificial Intelligence path. Here, we don't just teach you how to write prompts. We deep-dive into full-stack integrations, teaching you exactly how to build smart agents, customize embeddings, and write server-side code using Google's powerful modern SDKs. It's time to build the future, not just watch it happen!",
    visuals: {
      heading: 'Next-Gen AI & LLM Systems',
      description: 'Build robust, server-side applications powered by Gemini models, function calling, and structured vector retrieval.',
      accentColor: 'violet',
      badgeText: 'PATH 1 // ADVANCED AI',
      aiFeature: {
        modelName: 'gemini-2.5-pro',
        tokensCount: 148200,
        codeSnippet: `import { GoogleGenAI } from '@google/genai';\nconst ai = new GoogleGenAI();\nconst response = await ai.models.generateContent({\n  model: 'gemini-2.5-pro',\n  contents: 'Optimize digital client pipeline...',\n});`,
        chatHistory: [
          { sender: 'user', text: 'How do I automate content categorization?' },
          { sender: 'model', text: 'Use structured model outputs with custom schemas to parse titles into tags.' }
        ]
      }
    }
  },
  {
    id: 'marketing-path',
    startTime: 24,
    endTime: 36,
    title: 'Path 2: Digital Marketing',
    subtitle: 'Scale Audiences with High conversion analytics',
    category: 'marketing',
    narrative: "Next, our legendary Digital Marketing track! You might have the best product or content, but if nobody sees it, it doesn't exist. We teach you how to master SEO, read audience graphs, optimize high-conversion landing pages, and analyze complex campaign analytics. Build a vibrant community and watch your metrics skyrocket!",
    visuals: {
      heading: 'Precision Growth & Copywriting',
      description: 'Acquire real clients, launch profitable campaigns, design high-converting landing pages, and scale organic reach.',
      accentColor: 'emerald',
      badgeText: 'PATH 2 // DIGITAL MARKETING',
      marketingFeature: {
        metricValue: '$14,250',
        metricLabel: 'Monthly Recurring Ad Value',
        metricsTrend: [1000, 1500, 3200, 4800, 8900, 14250],
        keywords: ['Conversion Rate Optimization', 'Funnel Analytics', 'A/B Testing', 'Cost-per-Acquisition'],
        campaigns: [
          { name: 'Launch Pipeline Alpha', status: 'active', reach: '48.2k', ctr: '4.8%' },
          { name: 'AI Copy Generation Test', status: 'active', reach: '124.9k', ctr: '6.2%' },
          { name: 'Social Newsletter Retro', status: 'paused', reach: '12.5k', ctr: '2.1%' }
        ]
      }
    }
  },
  {
    id: 'creative-path',
    startTime: 36,
    endTime: 48,
    title: 'Path 3: Modern Content Creation',
    subtitle: 'Cinematic Storytelling & Interactive Media',
    category: 'creative',
    narrative: "Finally, the Modern Content Creation path! Learn the art of high-impact script-writing, cinematic framing, multi-track audio, and interactive media designed for retention. We guide you step-by-step through our modern timeline sequencer, audio effects modeling, and visual asset exports to ensure your story stands out from the noise.",
    visuals: {
      heading: 'Engaging Multimedia Production',
      description: 'Master raw storytelling, color grading, sound engineering, dynamic visual elements, and video delivery pipelines.',
      accentColor: 'amber',
      badgeText: 'PATH 3 // CREATIVE SUITE',
      creativeFeature: {
        tracks: [
          { name: 'Primary Presenter Shot.mp4', type: 'video', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30', duration: '0:00 - 1:00' },
          { name: 'Background Lo-fi Beats.wav', type: 'audio', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', duration: '0:00 - 1:00' },
          { name: 'Motion Graphic LowerThird.overlay', type: 'effects', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', duration: '0:03 - 0:18' }
        ],
        waveformData: [12, 24, 18, 42, 60, 31, 22, 54, 75, 40, 20, 15, 33, 44, 12, 38, 55, 68, 80, 50, 22, 10, 45, 67, 30, 25, 48, 62],
        aspectRatio: '16:9 widescreen',
        exportFormats: ['MP4 (H.264)', 'MOV (ProRes)', 'WAV (Uncompressed)']
      }
    }
  },
  {
    id: 'cta',
    startTime: 48,
    endTime: 60,
    title: 'Transform Your Future',
    subtitle: 'Join Brainify Today',
    category: 'cta',
    narrative: "You don't need a legacy college degree to build a global business or lead premium engineering teams. You just need clear direction, high-value structured skills, and a passionate community. Take action today, select your path, and begin your journey. Visit Brainify right now and accelerate your growth. Let's do this together!",
    visuals: {
      heading: 'Unlock Absolute Creative Agency',
      description: 'Get instant lifetime access to all learning paths, private community forums, direct mentorship, and live weekly reviews.',
      accentColor: 'cyan',
      badgeText: 'JOIN BRAINIFY PLATFORM',
      ctaFeature: {
        perks: [
          '3 Masterclass Paths (AI, Marketing, Creation)',
          'Instant Access to Live Weekly Group Coaching',
          'Exclusive Discord Hub with 5,000+ Innovators',
          'Industry-Recognized Completion Certification'
        ],
        guarantee: '100% Satisfaction - Start Learning Instantly'
      }
    }
  }
];
