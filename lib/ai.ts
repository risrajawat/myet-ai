import { createGroq } from '@ai-sdk/groq';

// Use the official Groq provider perfectly tuned for their API quirks
export const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || '',
});

// Using Groq's official fully-supported model for structured JSON outputs
export const primaryModel = groq('llama-3.1-8b-instant');
