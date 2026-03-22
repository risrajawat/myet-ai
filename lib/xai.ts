import { createOpenAI } from '@ai-sdk/openai';

// xAI provides an OpenAI-compatible API
// We create a custom provider instance pointing to api.x.ai
export const xai = createOpenAI({
  baseURL: 'https://api.x.ai/v1',
  apiKey: process.env.XAI_API_KEY || 'dummy_key_for_build', // Provide a fallback for build time
});

// We will use grok-2-latest as our primary model
export const primaryModel = xai('grok-2-latest');
