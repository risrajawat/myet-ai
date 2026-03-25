// @ts-nocheck
'use client';

import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BotMessageSquare, 
  FileText, 
  History, 
  PlaySquare, 
  ArrowLeft,
  Languages,
  Loader2,
  Send,
  Zap,
  Pause
} from 'lucide-react';
import Link from 'next/link';

// Lib imports
import { mockArticles, NewsArticle } from '@/lib/mock-data';
import { 
  generateBriefing, 
  generateStoryArc, 
  generateVideoScript, 
  translateText 
} from '@/lib/agents';

type TabType = 'briefing' | 'chat' | 'video' | 'timeline';

export default function ArticlePage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [activeTab, setActiveTab] = useState<TabType>('briefing');
  const [article, setArticle] = useState<NewsArticle | null>(null);
  
  // States for Agents
  const [briefing, setBriefing] = useState<any>(null);
  const [timeline, setTimeline] = useState<any>(null);
  const [videoScript, setVideoScript] = useState<any>(null);
  
  // Loading states
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    briefing: false,
    timeline: false,
    videoScript: false,
    translating: false
  });

  // Custom Robust Chat State
  const [messages, setMessages] = useState<{id: string, role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoGenerated, setIsVideoGenerated] = useState(false);
  const [videoProgressText, setVideoProgressText] = useState('');

  const handleGenerateVideo = async () => {
    setIsPlaying(true);
    const steps = [
      "Analyzing Article Story Arc...",
      "Generating AI Voiceover Script...",
      "Synthesizing Visual Assets...",
      "Rendering Final MP4..."
    ];
    for (const step of steps) {
      setVideoProgressText(step);
      await new Promise(r => setTimeout(r, 1500));
    }
    setIsVideoGenerated(true);

    // Play Free Native AI Voiceover!
    if ('speechSynthesis' in window && videoScript && article) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${videoScript.title}. ${videoScript.description}. Here is the full briefing: ${article.summary}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      const voices = window.speechSynthesis.getVoices();
      const englishVoices = voices.filter(v => v.lang.includes("en-US") || v.lang.includes("en-GB"));
      const bestVoice = englishVoices.find(v => v.name.includes("Samantha") || v.name.includes("Google") || v.name.includes("Daniel")) || englishVoices[0] || voices[0];
      
      if (bestVoice) utterance.voice = bestVoice;
      utterance.rate = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStopVideo = () => {
    setIsPlaying(false);
    setIsVideoGenerated(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Stop audio on unmount and tab switch
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (activeTab !== 'video') {
      handleStopVideo();
    }
  }, [activeTab]);

  // Fetch article on load
  useEffect(() => {
    // 1. Try finding it in the static Golden Mock Data
    let found = mockArticles.find(a => a.id === params.id);
    
    // 2. If it's a Live GNews article, retrieve it from the Session Storage Cache!
    if (!found) {
      const cacheKeys = Object.keys(sessionStorage).filter(k => k.startsWith('myet-feed-'));
      for (const key of cacheKeys) {
        const cachedStr = sessionStorage.getItem(key);
        if (cachedStr) {
          try {
            const cachedArticles = JSON.parse(cachedStr);
            found = cachedArticles.find((a: any) => a.id === params.id);
            if (found) break;
          } catch(e) {}
        }
      }
    }
    
    if (found) setArticle(found);
  }, [params.id]);

  // Load Briefing First
  useEffect(() => {
    if (article && !briefing && !loadingStates.briefing) {
      loadBriefing();
    }
  }, [article]);

  const loadBriefing = async () => {
    if (!article) return;
    setLoadingStates(p => ({ ...p, briefing: true }));
    try {
      const data = await generateBriefing(article.content);
      setBriefing(data);
    } catch (e) { console.error(e); }
    setLoadingStates(p => ({ ...p, briefing: false }));
  };

  const loadTimeline = async () => {
    if (!article || timeline) return;
    setLoadingStates(p => ({ ...p, timeline: true }));
    try {
      const data = await generateStoryArc(article.content);
      setTimeline(data);
    } catch (e) { console.error(e); }
    setLoadingStates(p => ({ ...p, timeline: false }));
  };

  const loadVideoScript = async () => {
    if (!article || videoScript) return;
    setLoadingStates(p => ({ ...p, videoScript: true }));
    try {
      const data = await generateVideoScript(article.content);
      setVideoScript(data);
    } catch (e) { console.error(e); }
    setLoadingStates(p => ({ ...p, videoScript: false }));
  };

  const translateBriefing = async (targetLanguage: string) => {
    if (!briefing || loadingStates.translating) return;
    setLoadingStates(p => ({ ...p, translating: true }));
    try {
      const translatedSummary = await translateText(briefing.summary, targetLanguage);
      setBriefing({ ...briefing, summary: translatedSummary });
    } catch (e) { console.error(e); }
    setLoadingStates(p => ({ ...p, translating: false }));
  };

  // Robust Custom Chat Submit (Hybrid API + Fallback)
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    
    const userMsg = input;
    setInput('');
    const newMessages = [...messages, { id: Date.now().toString(), role: 'user', content: userMsg }];
    setMessages(newMessages);
    
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          articleContext: article?.content
        })
      });

      if (!response.ok) throw new Error('API Error');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      const assistantId = Date.now().toString() + 'bot';
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);
      let currentText = '';

      while (!done && reader) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunkText = decoder.decode(value, { stream: true });
          currentText += chunkText;
          setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: currentText } : m));
        }
      }
    } catch (error) {
       console.error(error);
       setMessages(prev => [...prev, { 
         id: Date.now().toString() + 'err', 
         role: 'assistant', 
         content: "Error: Please make sure you have added GROQ_API_KEY inside the .env.local file and restarted the Next.js server." 
       }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChatQuickAction = (text: string) => {
    if (isTyping) return;
    setInput(text);
    setTimeout(() => {
      document.getElementById('chat-submit-btn')?.click();
    }, 50);
  };

  if (!article) return <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-brand-500" /></div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">
      {/* Read View (Left) */}
      <div className="lg:w-1/2 flex flex-col h-full overflow-y-auto pr-4 hidden-scrollbar relative">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 w-fit transition-colors group">
          <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center mr-3 group-hover:border-white transition-all">
            <ArrowLeft size={16} />
          </div>
          Back to Newsroom
        </Link>
        
        <div className="flex gap-2 mb-4">
          {article.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-brand-500/10 text-brand-500 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-500/20">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">{article.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 border-b border-border/50 pb-6">
          <span className="font-semibold text-white">{article.source}</span>
          <span>•</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          {article.content.split('\n\n').map((para, i) => (
            <p key={i} className="mb-6 leading-relaxed">{para}</p>
          ))}
        </div>
      </div>

      {/* Navigator Panel (Right) */}
      <div className="lg:w-1/2 flex flex-col h-[600px] lg:h-full glass rounded-3xl border border-border/50 overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-border/50 bg-black/40 backdrop-blur-md p-2">
          {[
            { id: 'briefing', label: 'Briefing', icon: FileText },
            { id: 'chat', label: 'Ask AI', icon: BotMessageSquare },
            { id: 'timeline', label: 'Story Arc', icon: History, onSelect: loadTimeline },
            { id: 'video', label: 'AI Video', icon: PlaySquare, onSelect: loadVideoScript },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as TabType);
                  if (tab.onSelect) tab.onSelect();
                }}
                className={`flex-1 py-3 px-2 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-all relative z-10 ${
                  isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute inset-0 bg-brand-500/20 border border-brand-500/30 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} className={isActive ? "text-brand-500 drop-shadow-[0_0_8px_rgba(255,51,102,0.8)]" : ""} />
                <span className="text-xs font-semibold">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto hidden-scrollbar p-6">
          <AnimatePresence mode="wait">
            {/* BRIEFING TAB */}
            {activeTab === 'briefing' && (
              <motion.div
                key="briefing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-brand-500 font-bold uppercase tracking-widest text-xs">
                    <Zap size={14} className="fill-current" /> AI Executive Summary
                  </div>
                  <div className="flex items-center gap-2">
                    {loadingStates.translating && <Loader2 size={14} className="animate-spin text-brand-500 mr-1" />}
                    <div className="flex items-center bg-black/40 border border-white/10 rounded-full p-1 h-8 shadow-inner">
                      <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider px-2 border-r border-white/10">
                        <Languages size={12} /> Translate
                      </span>
                      {['Hindi', 'Tamil', 'Telugu', 'Bengali'].map(lang => (
                        <button 
                          key={lang}
                          onClick={() => translateBriefing(lang)}
                          disabled={loadingStates.translating}
                          className="px-3 text-[11px] font-semibold text-gray-300 hover:text-brand-400 hover:bg-brand-500/10 rounded-full h-full transition disabled:opacity-50"
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {loadingStates.briefing ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-24 bg-white/5 rounded-xl"></div>
                    <div className="h-40 bg-white/5 rounded-xl"></div>
                    <div className="h-24 bg-white/5 rounded-xl"></div>
                  </div>
                ) : briefing ? (
                  <div className="space-y-6">
                    <div className="p-5 glass rounded-2xl bg-gradient-to-br from-brand-500/10 to-transparent border-l-4 border-l-brand-500">
                      <p className="text-lg leading-relaxed">{briefing.summary}</p>
                    </div>

                    <div>
                      <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-3">Key Takeaways</h3>
                      <ul className="space-y-3">
                        {briefing.keyPoints?.map((pt: string, i: number) => (
                          <li key={i} className="flex gap-3 text-gray-200 bg-white/5 p-3 rounded-xl">
                            <span className="text-brand-500 font-bold shrink-0">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass p-4 rounded-xl border border-white/5 bg-black/50">
                        <h3 className="text-accent text-xs font-bold uppercase tracking-wider mb-2">Broader Impact</h3>
                        <p className="text-sm text-gray-300">{briefing.impact}</p>
                      </div>
                      <div className="glass p-4 rounded-xl border border-white/5 bg-black/50">
                        <h3 className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">Future Outlook</h3>
                        <p className="text-sm text-gray-300">{briefing.futureOutlook}</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}

            {/* CHAT TAB */}
            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                 className="flex flex-col h-full"
              >
                <div className="flex-1 overflow-y-auto space-y-4 pb-4 hidden-scrollbar pr-2">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center">
                        <BotMessageSquare size={32} className="text-brand-500" />
                      </div>
                      <p>Ask anything about this article</p>
                      <div className="flex flex-wrap gap-2 justify-center mt-4">
                         <button onClick={() => handleChatQuickAction("Why is this important?")} className="px-3 py-1.5 rounded-full glass text-xs hover:text-white transition">Why is this important?</button>
                         <button onClick={() => handleChatQuickAction("Summarize the risks.")} className="px-3 py-1.5 rounded-full glass text-xs hover:text-white transition">Summarize the risks.</button>
                      </div>
                    </div>
                  )}

                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                         m.role === 'user' 
                          ? 'bg-brand-500 text-white rounded-br-none' 
                          : 'glass bg-surface/80 rounded-bl-none text-gray-200 border border-white/10'
                       }`}>
                         {m.content}
                         {m.role === 'assistant' && isTyping && m.id === messages[messages.length-1].id && (
                            <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-brand-500 animate-pulse" />
                         )}
                       </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleChatSubmit} className="relative mt-auto pt-4 border-t border-border/50">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a follow up question..."
                    disabled={isTyping}
                    className="w-full bg-black/50 border border-white/10 rounded-full py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white placeholder-gray-500 disabled:opacity-50"
                  />
                  <button id="chat-submit-btn" type="submit" disabled={!input || isTyping} className="absolute right-2 top-1/2 mt-[8px] -translate-y-1/2 w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white hover:bg-brand-600 disabled:opacity-50 disabled:hover:bg-brand-500 transition-colors">
                    {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />}
                  </button>
                </form>
              </motion.div>
            )}

            {/* TIMELINE TAB */}
            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-2 text-brand-500 font-bold uppercase tracking-widest text-xs mb-8">
                  <History size={14} /> Story Arc Tracker
                </div>

                {loadingStates.timeline ? (
                  <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-500" /></div>
                ) : timeline ? (
                  <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {timeline.map((item: any, i: number) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-6">
                        {/* Timeline dot */}
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow ${
                           item.sentiment === 'positive' ? 'bg-green-500' :
                           item.sentiment === 'negative' ? 'bg-red-500' :
                           'bg-brand-500'
                        }`}></div>
                        
                        {/* Card */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-4 rounded-xl border border-white/5">
                          <time className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">{item.date}</time>
                          <div className="text-sm font-medium text-gray-200">{item.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            )}

            {/* VIDEO TAB */}
            {activeTab === 'video' && (
              <motion.div
                key="video"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col items-center justify-center p-4"
              >
                <div className="w-full max-w-2xl aspect-video bg-black rounded-3xl overflow-hidden glass border border-white/10 relative shadow-2xl flex flex-col justify-between group">
                  {loadingStates.videoScript ? (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
                       <Loader2 className="animate-spin text-brand-500 mb-4" size={32} />
                       <span className="text-sm font-medium text-gray-300">Generating AI Video...</span>
                     </div>
                  ) : videoScript ? (
                    <>
                      {/* Video Player or Generation State */}
                      {isVideoGenerated ? (
                        <video 
                          src={
                            article?.id.includes('budget') || article?.id.includes('economy') || article?.id.includes('finance') ? '/budget.mp4' :
                            article?.id.includes('tech') || article?.id.includes('ai') ? '/tech.mp4' :
                            article?.id.includes('startup') ? '/startup.mp4' : '/budget.mp4'
                          } 
                          autoPlay 
                          loop 
                          muted 
                          className="absolute inset-0 z-0 w-full h-full object-cover opacity-60" 
                        />
                      ) : (
                        <div className={`absolute inset-0 z-0 opacity-50 mix-blend-screen transition-all duration-1000 ease-linear ${isPlaying ? 'scale-110 saturate-150 animate-pulse' : 'scale-105 group-hover:scale-100'}`}>
                           <div className="w-full h-full bg-gradient-to-br from-brand-600/40 to-blue-500/20 flex flex-col items-center justify-center text-center p-8">
                              {isPlaying ? (
                                 <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-brand-500 animate-spin mb-4 shadow-[0_0_15px_rgba(255,51,102,0.5)]" />
                              ) : (
                                 <PlaySquare size={48} className="text-white/50 mb-4" />
                              )}
                              <span className="text-xs font-mono text-white/80 font-bold uppercase border border-brand-500/30 bg-black/50 p-3 rounded-lg max-w-sm backdrop-blur-md transition-all duration-300">
                                 {isPlaying ? videoProgressText : "[Generative Video Prompt]"}
                                 {!isPlaying && <><br/><span className="text-white/40 font-normal">{videoScript.videoPrompt}</span></>}
                              </span>
                           </div>
                        </div>
                      )}
                      
                      {/* UI Overlay Top */}
                      <AnimatePresence>
                         {!isPlaying && (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10 flex justify-between items-start">
                                <div>
                                  <h2 className="text-xl font-bold text-white leading-tight drop-shadow-md">
                                    {videoScript.title}
                                  </h2>
                                  <p className="text-sm text-gray-300 mt-1 max-w-md line-clamp-2">{videoScript.description}</p>
                                </div>
                                <span className="px-3 py-1 bg-black/50 backdrop-blur rounded-full text-xs font-bold text-gray-300 border border-white/10">
                                  {videoScript.duration}
                                </span>
                             </motion.div>
                         )}
                      </AnimatePresence>

                      {/* UI Controls Bottom */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 z-10">
                          <div className="w-full bg-white/20 h-1.5 rounded-full mb-4 overflow-hidden relative">
                            {isPlaying && !isVideoGenerated && (
                                <motion.div 
                                  initial={{ width: "0%" }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 6, ease: "linear" }}
                                  className="h-full bg-brand-500 rounded-full shadow-[0_0_10px_rgba(255,51,102,0.8)]" 
                                />
                            )}
                            {isVideoGenerated && <div className="w-full h-full bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]" />}
                            {!isPlaying && <div className="w-0 h-full bg-brand-500 rounded-full" />}
                          </div>
                          <div className="flex items-center justify-between">
                            {!isVideoGenerated ? (
                              <button 
                                 onClick={handleGenerateVideo}
                                 disabled={isPlaying}
                                 className="flex items-center gap-2 px-6 py-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition shadow-[0_0_15px_rgba(255,51,102,0.3)]">
                                {isPlaying ? <><Loader2 size={16} className="animate-spin" /> Generating AI Video...</> : <><PlaySquare size={16} fill="currentColor" /> Generate Video</>}
                              </button>
                            ) : (
                              <button 
                                 onClick={handleStopVideo}
                                 className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition shadow-[0_0_15px_rgba(239,68,68,0.3)] cursor-pointer">
                                <Pause size={16} fill="currentColor" /> Stop Video
                              </button>
                            )}
                            <div className="flex gap-4 text-gray-400">
                               <button className="hover:text-white transition">HD</button>
                               <button className="hover:text-white transition">CC</button>
                            </div>
                         </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
