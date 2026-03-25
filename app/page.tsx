'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, TrendingUp, Building2, Globe, Cpu, Zap, ArrowRight } from 'lucide-react';
import { NewsArticle } from '@/lib/mock-data';
import { getPersonalizedNews } from '@/lib/agents';
import Link from 'next/link';

const TOPICS = [
  { id: 'ai', label: 'Artifical Intelligence', icon: BrainCircuit },
  { id: 'startups', label: 'Startups', icon: Zap },
  { id: 'stocks', label: 'Stock Market', icon: TrendingUp },
  { id: 'economy', label: 'Economy', icon: Building2 },
  { id: 'tech', label: 'Technology', icon: Cpu },
  { id: 'global', label: 'Global', icon: Globe },
];

export default function Home() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState<{name: string, email: string} | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Load saved preferences on initial mount
  useEffect(() => {
    setIsMounted(true);
    const savedPrefs = localStorage.getItem('myet-preferences');
    const savedProfile = localStorage.getItem('myet-profile');
    
    if (savedProfile && savedPrefs) {
      try {
        setUserProfile(JSON.parse(savedProfile));
        setSelectedTopics(JSON.parse(savedPrefs));
        setIsOnboarding(false);
      } catch (e) {
        setIsOnboarding(true);
      }
    } else {
      setIsOnboarding(true);
    }
  }, []);

  // Save preferences whenever they change
  useEffect(() => {
    if (isMounted && !isOnboarding) {
      localStorage.setItem('myet-preferences', JSON.stringify(selectedTopics));
    }
  }, [selectedTopics, isMounted, isOnboarding]);

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || selectedTopics.length === 0) return;
    
    const profile = { name, email };
    setUserProfile(profile);
    localStorage.setItem('myet-profile', JSON.stringify(profile));
    localStorage.setItem('myet-preferences', JSON.stringify(selectedTopics));
    setIsOnboarding(false);
  };

  // Fetch articles based on personalization
  useEffect(() => {
    async function fetchNews() {
      if (selectedTopics.length === 0) return;
      
      const cacheKey = `myet-feed-${selectedTopics.join('-')}`;
      const cached = sessionStorage.getItem(cacheKey);
      
      if (cached) {
        setArticles(JSON.parse(cached));
        setIsLoading(false); // Fix: Remove loading skeleton on cache hit!
        return;
      }

      setIsLoading(true);
      try {
        const personalizedArticles = await getPersonalizedNews(selectedTopics);
        setArticles(personalizedArticles);
        if (personalizedArticles.length > 0) {
          sessionStorage.setItem(cacheKey, JSON.stringify(personalizedArticles));
        }
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!isOnboarding && isMounted) {
      fetchNews();
    }
  }, [selectedTopics, isOnboarding, isMounted]);

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  if (!isMounted) return null;

  if (isOnboarding) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 w-full h-full relative">
        <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="glass rounded-3xl p-8 md:p-10 max-w-xl w-full border border-white/10 shadow-2xl relative overflow-hidden z-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <h1 className="text-3xl font-bold mb-2 text-white">Welcome to MyET AI</h1>
          <p className="text-gray-400 text-sm mb-8">Create your profile and start your interactive news journey.</p>
          
          <form onSubmit={handleOnboardSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Full Name</label>
                <input required type="text" value={name} onChange={e=>setName(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-gray-600" placeholder="Rishabh Singh" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Email Address</label>
                <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-gray-600" placeholder="rishabh@example.com" />
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                Select Your Interests
                {selectedTopics.length === 0 && <span className="text-brand-500 animate-pulse">Select at least 1</span>}
              </label>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map(topic => {
                  const Icon = topic.icon;
                  const isSelected = selectedTopics.includes(topic.id);
                  return (
                    <button type="button" key={topic.id} onClick={() => toggleTopic(topic.id)} className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${isSelected ? 'bg-brand-500/20 border-brand-500 text-brand-500 shadow-[0_0_10px_rgba(255,51,102,0.2)]' : 'bg-transparent border-white/10 text-gray-400 hover:text-white glass-hover'}`}>
                       <Icon size={12} className={`inline mr-2 ${isSelected ? 'text-brand-500' : 'text-gray-500'}`} />{topic.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <button type="submit" disabled={!name || !email || selectedTopics.length === 0} className="w-full py-4 mt-8 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:hover:bg-brand-500 text-white font-bold rounded-xl transition flex justify-center items-center gap-2 group shadow-lg shadow-brand-500/25">
              Build My Newsroom <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header section */}
      <section className="flex flex-col gap-4 relative">
        <div className="flex justify-between items-start">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            {userProfile ? `Welcome back, ${userProfile.name.split(' ')[0]}` : 'Your Personalized'}<br/>
            <span className="text-brand-500">Newsroom</span>
          </motion.h1>
          
          {userProfile && (
            <button 
              onClick={() => { localStorage.clear(); window.location.reload(); }}
              className="text-xs text-gray-400 hover:text-white transition-colors px-4 py-2 border border-white/10 glass rounded-full hover:bg-white/5 active:scale-95 flex items-center gap-2"
            >
              Logout
            </button>
          )}
        </div>
        {!userProfile && (
          <>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg max-w-2xl"
            >
              Select topics that matter to you. Our Personalization Agent will curate the most impactful stories tailored to your interests.
            </motion.p>
            
            {/* Interests Selector */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 mt-4"
            >
              {TOPICS.map((topic) => {
                const isSelected = selectedTopics.includes(topic.id);
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => toggleTopic(topic.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                      isSelected 
                        ? 'border-brand-500 bg-brand-500/10 text-brand-500 shadow-[0_0_10px_rgba(255,51,102,0.2)]'
                        : 'border-border glass glass-hover text-gray-300'
                    }`}
                  >
                    <Icon size={16} className={isSelected ? "text-brand-500" : "text-gray-400"} />
                    {topic.label}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </section>

      {/* Feed Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Zap className="text-brand-500" size={20} />
            Top Stories
          </h2>
          <span className="text-sm text-gray-400">{articles.length} articles</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
               <div key={i} className="glass rounded-2xl h-[400px] animate-pulse">
                 <div className="h-48 bg-white/5 rounded-t-2xl"></div>
                 <div className="p-6 space-y-4">
                   <div className="h-4 bg-white/10 rounded w-1/3"></div>
                   <div className="h-6 bg-white/10 rounded w-full"></div>
                   <div className="h-6 bg-white/10 rounded w-5/6"></div>
                 </div>
               </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {articles.map((article) => (
              <motion.div
                key={article.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95, y: 20 },
                  show: { opacity: 1, scale: 1, y: 0 }
                }}
                className="group glass rounded-2xl overflow-hidden glass-hover flex flex-col h-full border border-border/50 hover:border-brand-500/30"
              >
                {/* Image Header */}
                <div className="h-48 w-full relative overflow-hidden bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
                  <img 
                    src={`https://picsum.photos/seed/${article.id}/800/600`} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                    {article.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] uppercase font-bold tracking-wider text-gray-200 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 relative">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span className="font-medium text-brand-500">{article.source}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 leading-tight group-hover:text-brand-500 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                    {article.summary}
                  </p>

                  <Link 
                    href={`/article/${article.id}`}
                    className="flex items-center gap-2 text-sm font-semibold text-white group/btn mt-auto"
                  >
                    Open Navigator
                    <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center group-hover/btn:bg-brand-500 group-hover/btn:border-brand-500 group-hover/btn:text-white transition-all text-gray-400">
                      <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
            
            {articles.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-500 glass rounded-2xl border-dashed">
                <BrainCircuit size={48} className="mb-4 opacity-50" />
                <p className="text-lg">No articles found matching your interests.</p>
                <button onClick={() => setSelectedTopics([])} className="mt-4 text-brand-500 hover:underline">
                  Clear filters
                </button>
              </div>
            )}
          </motion.div>
        )}
      </section>
    </div>
  );
}
