import { streamText } from 'ai';
import { primaryModel } from '@/lib/ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, articleContext } = await req.json();

  const systemPrompt = `You are the MyET AI News Assistant. You answer questions strictly based on the provided article context. 
  Keep your answers highly professional, concise, and analytical. Do not hallucinate.

  ARTICLE CONTEXT:
  ${articleContext}
  `;

  // Start a streaming text response using Groq
  const stream = await streamText({
    model: primaryModel,
    system: systemPrompt,
    messages: messages,
  });

  return stream.toTextStreamResponse();
}
