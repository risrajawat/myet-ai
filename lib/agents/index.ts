'use server';

import { mockArticles, NewsArticle } from '@/lib/mock-data';
import { generateText } from 'ai';
import { primaryModel } from '@/lib/ai';

// Helper to simulate network delay for mock fallback
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const hasGroqKey = !!process.env.GROQ_API_KEY;

// 1. Personalization Agent
export async function getPersonalizedNews(interests: string[]): Promise<NewsArticle[]> {
  await delay(800);
  if (!interests || interests.length === 0) return mockArticles;
  return mockArticles.filter(article => 
    article.tags.some(tag => interests.map(i => i.toLowerCase()).includes(tag.toLowerCase()))
  );
}

// 2. Summarizer Agent
export async function generateBriefing(articleContent: string) {
  if (hasGroqKey) {
     try {
       const { text } = await generateText({
         model: primaryModel,
         prompt: `Analyze the following news article and extract a professional executive briefing. 
         Return STRICTLY valid JSON ONLY. Do not use markdown backticks. The JSON must exactly match this structure:
         {
           "summary": "A 2-3 sentence executive summary of the article",
           "keyPoints": ["point 1", "point 2", "point 3"],
           "impact": "The broader industry or global impact",
           "futureOutlook": "A prediction on what happens next"
         }
         
         ARTICLE:
         ${articleContent}`
       });
       
       const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
       return JSON.parse(cleanJson);
     } catch (e) {
       console.error("Groq Briefing Error, falling back to mock:", e);
     }
  }

  // Fallback
  await delay(1500); 
  return {
    summary: "This article outlines a significant development in the respective industry, featuring strategic shifts and a focus on long-term efficiency and scaling while mitigating systemic risks.",
    keyPoints: [
      "Major disruption noted in traditional operational frameworks.",
      "Strategic investments accelerating rapid market shifts.",
      "Regulatory and infrastructural challenges remain the primary bottlenecks."
    ],
    impact: "Ripple effects are expected across global supply chains and competitive landscapes over the next 18 months.",
    futureOutlook: "Expect widespread adoption of these new paradigms, leading to major efficiency gains and potential workforce restructuring."
  };
}

// 3. Timeline Agent
export async function generateStoryArc(articleContent: string) {
  if (hasGroqKey) {
     try {
       const { text } = await generateText({
         model: primaryModel,
         prompt: `Infer a plausible 4-step historical timeline that led to the events in this article.
         Return STRICTLY valid JSON ONLY. Do not use markdown backticks. The JSON must exactly match this structure:
         {
           "timeline": [
             {
               "date": "Relative date like '3 Years Ago'",
               "event": "Short description of event",
               "sentiment": "positive" or "negative" or "neutral"
             }
           ]
         }
         
         ARTICLE:
         ${articleContent}`
       });
       
       const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
       return JSON.parse(cleanJson).timeline;
     } catch (e) {
       console.error("Groq Timeline Error, falling back to mock:", e);
     }
  }

  // Fallback
  await delay(1200);
  return [
    { date: "3 Years Ago", event: "Initial market indicators suggest strong structural shifts ahead.", sentiment: "positive" },
    { date: "1 Year Ago", event: "Industry faces unexpected bottlenecks and supply chain friction.", sentiment: "negative" },
    { date: "6 Months Ago", event: "Early prototypes and strategic partnerships are established.", sentiment: "neutral" },
    { date: "Today", event: "Major breakthrough announced, disrupting traditional legacy systems.", sentiment: "positive" },
  ];
}

// 4. Video Script Agent
export async function generateVideoScript(articleContent: string) {
  if (hasGroqKey) {
     try {
       const { text } = await generateText({
         model: primaryModel,
         prompt: `Convert this news article into an engaging, cinematic video script concept.
         Return STRICTLY valid JSON ONLY. Do not use markdown backticks. The JSON must exactly match this structure:
         {
           "title": "A catchy YouTube-style title",
           "description": "Short 1 sentence hook",
           "videoPrompt": "A Midjourney-style image prompt for the visuals",
           "duration": "1:24"
         }
         
         ARTICLE:
         ${articleContent}`
       });
       
       const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
       return JSON.parse(cleanJson);
     } catch (e) {
       console.error("Groq Video Script Error, fallback:", e);
     }
  }

  // Fallback
  await delay(2000);
  return {
    title: "Market Disruption: The Next Big Shift",
    description: "An AI generated visualization of the transition rapidly affecting the global economy.",
    videoPrompt: "Cinematic, glowing data streams converging around an abstract globe, deep blue and electric crimson lighting, 8k resolution, photorealistic",
    duration: "1:15"
  };
}

// 5. Translation Agent
export async function translateText(text: string, targetLanguage: string = "Hindi") {
  if (hasGroqKey) {
     try {
       const { text: translated } = await generateText({
         model: primaryModel,
         prompt: `Translate the following text into professional ${targetLanguage}:\n\n${text}`
       });
       return translated;
     } catch (e) {
       console.error("Groq Translation Error, fallback:", e);
     }
  }

  // Fallback
  await delay(1000);
  return "यह लेख संबंधित उद्योग में एक महत्वपूर्ण विकास को रेखांकित करता है, जिसमें रणनीतिक बदलाव और लंबी अवधि की दक्षता पर ध्यान केंद्रित किया गया है।";
}
